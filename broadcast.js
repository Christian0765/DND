// broadcast.js — DM broadcast panel, shared by all pages
// Requires: Firebase SDK loaded + global `db` (firebase.firestore() instance)
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .bp {
      position: fixed; bottom: -100%; left: 0; right: 0;
      background: linear-gradient(160deg, #f7edd8 0%, #ecdcb5 100%);
      border-top: 3px double #7a5a28;
      box-shadow: 0 -8px 40px rgba(0,0,0,0.7);
      z-index: 9000;
      transition: bottom 0.4s ease;
      max-height: 70vh; overflow-y: auto;
      font-family: 'Crimson Text', serif;
      color: #1a1208;
    }
    .bp.open { bottom: 0; }
    .bp-inner { max-width: 900px; margin: 0 auto; padding: 18px 24px 22px; }
    .bp-header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #7a5a28; padding-bottom: 10px; margin-bottom: 14px;
    }
    .bp-title {
      font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 600;
      color: #7a1515; letter-spacing: 0.05em;
    }
    .bp-close {
      font-family: 'Cinzel', serif; font-size: 0.58rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: #7a5a28; background: none;
      border: 1px solid #7a5a28; border-radius: 2px; padding: 3px 10px;
      cursor: pointer; transition: background 0.15s;
    }
    .bp-close:hover { background: rgba(122,90,40,0.1); }
    .bp-body { font-size: 0.9rem; line-height: 1.7; }
    .bp-body img { max-width: 100%; border-radius: 3px; border: 1px solid #7a5a28; margin-top: 8px; display: block; }
    .bp-shop-item {
      padding: 7px 0; border-bottom: 1px dotted #b08840;
      display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: baseline;
    }
    .bp-shop-item:last-child { border-bottom: none; }
    .bp-shop-name { font-family: 'Cinzel', serif; font-size: 0.72rem; font-weight: 600; }
    .bp-shop-price { font-family: 'Cinzel', serif; font-size: 0.68rem; color: #9a7000; white-space: nowrap; }
    .bp-shop-desc { font-size: 0.78rem; color: #4a3520; font-style: italic; grid-column: 1 / -1; margin-top: -2px; }
    .bp-combat { text-align: center; padding: 20px 0; }
    .bp-combat-icon { font-size: 2.5rem; margin-bottom: 10px; }
    .bp-combat-msg { font-family: 'Cinzel', serif; font-size: 1.1rem; color: #7a1515; font-weight: 600; margin-bottom: 16px; }
    .bp-combat-link {
      display: inline-block; font-family: 'Cinzel', serif; font-size: 0.7rem;
      text-transform: uppercase; letter-spacing: 0.15em;
      color: #c4920a; border: 1px solid #9a7000; border-radius: 2px;
      padding: 8px 20px; text-decoration: none;
      transition: background 0.15s;
    }
    .bp-combat-link:hover { background: rgba(154,112,0,0.15); }

    /* Initiative reveal */
    .bp-init-list { padding: 4px 0; }
    .bp-init-row {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 0; border-bottom: 1px dotted #b08840;
      transition: opacity 0.4s ease;
    }
    .bp-init-row:last-child { border-bottom: none; }
    .bp-init-rank { font-family: 'Cinzel', serif; font-size: 0.6rem; color: #b08840; min-width: 20px; }
    .bp-init-name { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 600; color: #1a1208; flex: 1; }
    .bp-init-roll { font-family: 'Cinzel', serif; font-size: 1.6rem; font-weight: 900; color: #7a1515; min-width: 44px; text-align: right; }
    .bp-init-detail { font-size: 0.75rem; color: #7a5a28; font-style: italic; min-width: 60px; }

    /* Dice corner widget */
    .dice-corner {
      position: fixed; bottom: 80px; right: 20px;
      background: linear-gradient(160deg, #1a0e04 0%, #0d0802 100%);
      border: 2px solid #9a7000; border-radius: 6px;
      padding: 14px 20px; z-index: 8999;
      text-align: center; min-width: 90px;
      font-family: 'Cinzel', serif;
      box-shadow: 0 4px 20px rgba(0,0,0,0.8);
      animation: diceIn 0.3s ease;
    }
    @keyframes diceIn {
      from { transform: scale(0.4) rotate(-180deg); opacity: 0; }
      to   { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    .dc-type { font-size: 0.55rem; color: #b08840; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px; }
    .dc-num  { font-size: 2.8rem; font-weight: 900; color: #c4920a; line-height: 1; }
    .dc-mod  { font-size: 0.65rem; color: #7a5a28; margin-top: 2px; }
    .dc-by   { font-size: 0.58rem; color: #7a5a28; margin-top: 4px; border-top: 1px solid #2a1a06; padding-top: 4px; }
  `;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.id = 'broadcast-panel';
  panel.className = 'bp';
  panel.innerHTML = `
    <div class="bp-inner">
      <div class="bp-header">
        <span class="bp-title" id="bp-title">DM Announcement</span>
        <button class="bp-close" onclick="dismissBroadcast()">Dismiss ✕</button>
      </div>
      <div class="bp-body" id="bp-body"></div>
    </div>
  `;
  document.body.appendChild(panel);

  window.showBroadcast = function (data) {
    if (data.type === 'dice') {
      showDiceCorner(data);
      return;
    }

    document.getElementById('bp-title').textContent = data.title || 'DM Announcement';
    const body = document.getElementById('bp-body');

    if (data.type === 'text') {
      body.innerHTML = `<p>${(data.text || '').replace(/\n/g, '<br>')}</p>`;
    } else if (data.type === 'image') {
      body.innerHTML = `<img src="${data.imageUrl || ''}" alt="${data.title || 'Image'}">`;
    } else if (data.type === 'shop') {
      const lines = (data.shopItems || '').split('\n').filter(l => l.trim());
      const items = lines.map(line => {
        const colonIdx = line.indexOf(':');
        const dashIdx = line.indexOf(' - ');
        const name = colonIdx > -1 ? line.slice(0, colonIdx).trim() : line.trim();
        const afterColon = colonIdx > -1 ? line.slice(colonIdx + 1).trim() : '';
        const price = dashIdx > -1 ? afterColon.slice(0, afterColon.indexOf(' - ')).trim() : afterColon;
        const desc = dashIdx > -1 ? line.slice(line.indexOf(' - ') + 3).trim() : '';
        return `<div class="bp-shop-item">
          <span class="bp-shop-name">${name}</span>
          <span class="bp-shop-price">${price}</span>
          ${desc ? `<span class="bp-shop-desc">${desc}</span>` : ''}
        </div>`;
      }).join('');
      body.innerHTML = items || '<p>No items listed.</p>';
    } else if (data.type === 'combat') {
      body.innerHTML = `<div class="bp-combat">
        <div class="bp-combat-icon">⚔️</div>
        <div class="bp-combat-msg">${data.text || 'Combat has begun — prepare yourselves!'}</div>
        <a href="combat.html" class="bp-combat-link">⚔ Open Combat Screen →</a>
      </div>`;
    } else if (data.type === 'initiative') {
      renderInitiativeReveal(data, body);
    }

    document.getElementById('broadcast-panel').classList.add('open');
  };

  function showDiceCorner(data) {
    let w = document.getElementById('dice-corner-widget');
    if (w) w.remove();
    w = document.createElement('div');
    w.id = 'dice-corner-widget';
    w.className = 'dice-corner';
    const modStr = data.modifier && data.modifier !== 0
      ? (data.modifier > 0 ? ' + ' + data.modifier : ' − ' + Math.abs(data.modifier))
      : '';
    w.innerHTML = `
      <div class="dc-type">${data.dieType || 'd20'}</div>
      <div class="dc-num" id="dc-num">?</div>
      ${modStr ? `<div class="dc-mod">${modStr} = <strong>${data.total}</strong></div>` : ''}
      <div class="dc-by">${data.rolledBy || 'DM'}</div>
    `;
    document.body.appendChild(w);

    const el = document.getElementById('dc-num');
    const sides = parseInt((data.dieType || 'd20').replace('d', '')) || 20;
    let ticks = 0;
    const spin = setInterval(() => {
      el.textContent = Math.floor(Math.random() * sides) + 1;
      if (++ticks >= 18) {
        clearInterval(spin);
        el.textContent = data.result || data.total;
        el.style.color = data.result >= sides ? '#5a9a3a' : data.result <= 1 ? '#7a1515' : '#c4920a';
      }
    }, 80);
    setTimeout(() => { if (w && w.parentNode) w.remove(); }, 6000);
  }

  function renderInitiativeReveal(data, body) {
    const results = data.results || [];
    body.innerHTML = `<div class="bp-init-list">${
      results.map((r, i) =>
        `<div class="bp-init-row" id="bp-init-${i}" style="opacity:0">
           <span class="bp-init-rank">#${i + 1}</span>
           <span class="bp-init-name">${r.name}</span>
           <span class="bp-init-roll">—</span>
           <span class="bp-init-detail"></span>
         </div>`
      ).join('')
    }</div>`;

    results.forEach((r, i) => {
      setTimeout(() => {
        const row = document.getElementById('bp-init-' + i);
        if (!row) return;
        row.querySelector('.bp-init-roll').textContent = r.total;
        row.querySelector('.bp-init-detail').textContent = `(${r.roll} + ${r.modifier})`;
        row.style.opacity = '1';
      }, i * (data.revealMs || 600));
    });
  }

  window.hideBroadcast = function () {
    document.getElementById('broadcast-panel').classList.remove('open');
  };

  window.dismissBroadcast = function () {
    hideBroadcast();
  };

  // Poll until db is available (set by each page after Firebase init)
  function startListener() {
    if (typeof db === 'undefined' || !db) { setTimeout(startListener, 200); return; }
    db.collection('campaign').doc('broadcast').onSnapshot(doc => {
      if (!doc.exists) return;
      const d = doc.data();
      if (d.active) showBroadcast(d);
      else hideBroadcast();
    });
  }
  startListener();
})();
