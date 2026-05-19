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
    .bp-combat-msg { font-family: 'Cinzel', serif; font-size: 1.1rem; color: #7a1515; font-weight: 600; }
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
      </div>`;
    }
    document.getElementById('broadcast-panel').classList.add('open');
  };

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
