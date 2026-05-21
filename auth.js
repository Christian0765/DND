// auth.js — Google Sign-In shared module
// Requires: firebase-auth-compat.js SDK + global `db` (set by each page after Firebase init)
(function () {

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Auth bar (index + sheets) */
    .auth-bar {
      max-width: 900px; margin: 0 auto 20px;
      background: linear-gradient(160deg, #1a0e04 0%, #0d0802 100%);
      border: 1px solid #7a5a28; border-radius: 3px;
      padding: 10px 18px;
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      font-family: 'Crimson Text', serif;
    }
    .auth-info {
      flex: 1; font-size: 0.82rem; color: #b08840; min-width: 160px;
    }
    .auth-info strong { color: #c4920a; }
    .auth-btn {
      font-family: 'Cinzel', serif; font-size: 0.55rem;
      text-transform: uppercase; letter-spacing: 0.12em;
      color: #c4920a; border: 1px solid #9a7000; border-radius: 2px;
      padding: 6px 14px; background: none; cursor: pointer;
      text-decoration: none; display: inline-block;
      transition: background 0.15s; white-space: nowrap;
    }
    .auth-btn:hover { background: rgba(154,112,0,0.15); }
    .auth-btn.ghost { color: #7a5a28; border-color: #7a5a28; }
    .auth-btn.ghost:hover { background: rgba(122,90,40,0.1); }
    .auth-btn.large { padding: 10px 24px; font-size: 0.65rem; }

    /* Sign-in overlay (sheet pages) */
    .auth-overlay {
      position: fixed; inset: 0; z-index: 9500;
      background: rgba(8,6,4,0.94);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Crimson Text', serif;
    }
    .auth-overlay-box {
      background: linear-gradient(160deg, #f7edd8 0%, #ecdcb5 100%);
      border: 2px solid #7a5a28; border-radius: 4px;
      padding: 36px 40px; max-width: 420px; width: 90%;
      text-align: center;
      box-shadow: 0 8px 60px rgba(0,0,0,0.8);
    }
    .auth-overlay-title {
      font-family: 'Cinzel', serif; font-size: 1.2rem; font-weight: 900;
      color: #7a1515; margin-bottom: 12px; letter-spacing: 0.05em;
    }
    .auth-overlay-sub {
      font-size: 0.9rem; color: #4a3520; line-height: 1.65;
      margin-bottom: 22px;
    }
    .auth-overlay-link { color: #9a7000; }

    /* Manage Players (DM panel) */
    #manage-players-list .mp-row {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 0; border-bottom: 1px dotted rgba(176,136,64,0.3);
    }
    #manage-players-list .mp-row:last-child { border-bottom: none; }
    #manage-players-list .mp-name { flex: 1; font-size: 0.8rem; color: #c4920a; }
    #manage-players-list .mp-email { font-size: 0.68rem; color: #7a5a28; flex: 1; }
    #manage-players-list .mp-badge {
      font-family: 'Cinzel', serif; font-size: 0.48rem; text-transform: uppercase;
      letter-spacing: 0.08em; padding: 2px 7px; border-radius: 2px;
      border: 1px solid #7a5a28; color: #b08840; white-space: nowrap;
    }
  `;
  document.head.appendChild(style);

  // --- State ---
  window.currentUser = null;
  window.currentCharId = null;
  let charUnsubscribe = null;
  let usersUnsubscribe = null;

  // --- Helpers ---
  function esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // --- Sign in / out ---
  window.signInWithGoogle = function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(err => {
      console.error('Sign-in error:', err);
      alert('Sign-in failed: ' + err.message);
    });
  };

  window.signOutGoogle = function () { firebase.auth().signOut(); };

  // --- Auth bar ---
  function updateAuthBar() {
    const bar = document.getElementById('auth-bar');
    if (!bar) return;
    const u = window.currentUser;
    const cid = window.currentCharId;
    if (!u) {
      bar.innerHTML = `
        <span class="auth-info">Sign in to link your character to your Google account</span>
        <button class="auth-btn" onclick="signInWithGoogle()">Sign in with Google</button>
      `;
    } else if (!cid) {
      bar.innerHTML = `
        <span class="auth-info">Signed in as <strong>${esc(u.displayName)}</strong> &middot; Awaiting DM assignment</span>
        <button class="auth-btn ghost" onclick="signOutGoogle()">Sign Out</button>
      `;
    } else if (cid === 'dm') {
      bar.innerHTML = `
        <span class="auth-info">Signed in as <strong>${esc(u.displayName)}</strong> &middot; DM</span>
        <button class="auth-btn ghost" onclick="signOutGoogle()">Sign Out</button>
      `;
    } else {
      const num = cid.replace('player', '');
      bar.innerHTML = `
        <span class="auth-info">Signed in as <strong>${esc(u.displayName)}</strong></span>
        <a href="sheet-${num}.html" class="auth-btn">Your Sheet &rarr;</a>
        <button class="auth-btn ghost" onclick="signOutGoogle()">Sign Out</button>
      `;
    }
  }

  // --- Sheet overlay gate ---
  function resolveSheetGate() {
    const overlay = document.getElementById('auth-overlay');
    if (!overlay) return;
    const u = window.currentUser;
    const cid = window.currentCharId;
    const thisId = window.SHEET_CHAR_ID;

    if (!u) {
      overlay.innerHTML = `<div class="auth-overlay-box">
        <div class="auth-overlay-title">Sign In Required</div>
        <p class="auth-overlay-sub">Sign in with your Google account to access your character sheet.</p>
        <button class="auth-btn large" onclick="signInWithGoogle()">Sign in with Google</button>
      </div>`;
      overlay.style.display = 'flex';
    } else if (!cid) {
      overlay.innerHTML = `<div class="auth-overlay-box">
        <div class="auth-overlay-title">Awaiting Assignment</div>
        <p class="auth-overlay-sub">Signed in as <strong>${esc(u.displayName)}</strong>.<br><br>Ask your DM to assign you a character — they can do this from the main party page.</p>
        <button class="auth-btn ghost" onclick="signOutGoogle()" style="margin-top:8px;">Sign Out</button>
      </div>`;
      overlay.style.display = 'flex';
    } else if (cid !== thisId) {
      const num = cid === 'dm' ? null : cid.replace('player', '');
      const link = num
        ? `<a href="sheet-${num}.html" class="auth-overlay-link">Sheet ${num}</a>`
        : 'the main page';
      overlay.innerHTML = `<div class="auth-overlay-box">
        <div class="auth-overlay-title">Wrong Sheet</div>
        <p class="auth-overlay-sub">This is not your character sheet. Your character is on ${link}.</p>
        <button class="auth-btn ghost" onclick="signOutGoogle()" style="margin-top:8px;">Sign Out</button>
      </div>`;
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';
    }
  }

  // --- DM: Manage Players ---
  function startManagePlayersListener() {
    const container = document.getElementById('manage-players-list');
    if (!container) return;
    if (usersUnsubscribe) usersUnsubscribe();
    usersUnsubscribe = db.collection('users').onSnapshot(snap => {
      if (snap.empty) {
        container.innerHTML = '<div style="font-size:0.76rem;color:#7a5a28;font-style:italic;">No players signed in yet.</div>';
        return;
      }
      const users = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
      container.innerHTML = users.map(u => {
        const assigned = u.charId || '';
        return `<div class="mp-row">
          <span class="mp-name">${esc(u.name || '—')}</span>
          <span class="mp-email">${esc(u.email || '')}</span>
          <select onchange="assignPlayer('${u.uid}',this.value)"
            style="font-family:'Cinzel',serif;font-size:0.52rem;background:rgba(255,255,255,0.05);border:1px solid #7a5a28;border-radius:2px;color:#b08840;padding:3px 6px;outline:none;">
            <option value="">— unassigned —</option>
            <option value="player1" ${assigned==='player1'?'selected':''}>Player 1</option>
            <option value="player2" ${assigned==='player2'?'selected':''}>Player 2</option>
            <option value="player3" ${assigned==='player3'?'selected':''}>Player 3</option>
            <option value="player4" ${assigned==='player4'?'selected':''}>Player 4</option>
            <option value="dm" ${assigned==='dm'?'selected':''}>DM</option>
          </select>
        </div>`;
      }).join('');
    });
  }

  window.assignPlayer = function (uid, charId) {
    if (!db) return;
    db.collection('users').doc(uid).set({ charId: charId || null }, { merge: true });
  };

  // --- Auth state machine ---
  function startAuth() {
    firebase.auth().onAuthStateChanged(user => {
      window.currentUser = user;
      if (charUnsubscribe) { charUnsubscribe(); charUnsubscribe = null; }

      if (user) {
        // Ensure user record exists
        db.collection('users').doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Listen for charId changes in real time
        charUnsubscribe = db.collection('users').doc(user.uid).onSnapshot(doc => {
          window.currentCharId = doc.exists ? (doc.data().charId || null) : null;
          updateAuthBar();
          resolveSheetGate();
        });
      } else {
        window.currentCharId = null;
        updateAuthBar();
        resolveSheetGate();
      }

      // Start manage-players listener when DM panel is open
      if (document.getElementById('manage-players-list')) startManagePlayersListener();
    });
  }

  // --- Shop: Buy buttons ---
  window.buyItem = async function (itemName, priceNum) {
    if (!window.currentUser) { alert('Sign in with Google to buy items.'); return; }
    if (!window.currentCharId || window.currentCharId === 'dm') {
      alert('Your character isn\'t linked yet. Ask the DM to assign you from the party page.'); return;
    }
    const charId = window.currentCharId;
    if (!confirm(`Buy "${itemName}" for ${priceNum} gp?`)) return;

    try {
      const docRef = db.collection('characters').doc(charId);
      const doc = await docRef.get();
      if (!doc.exists) { alert('Character not found in Firestore.'); return; }
      const data = doc.data();
      const gold = parseInt(data['f-gold'] || '0') || 0;

      if (gold < priceNum) {
        if (confirm(`You only have ${gold} gp, but ${itemName} costs ${priceNum} gp.\n\nStart a group purchase so others can chip in?`)) {
          openGroupPurchase(itemName, priceNum);
        }
        return;
      }

      const newGold = gold - priceNum;
      const equip = (data['f-equipment'] || '').trim();
      await docRef.set({
        'f-gold': String(newGold),
        'f-gold2': String(newGold),
        'f-equipment': equip ? equip + '\n' + itemName : itemName
      }, { merge: true });

      const btn = document.getElementById('buy-btn-' + slugify(itemName));
      if (btn) { btn.textContent = '✓ Bought'; btn.disabled = true; btn.style.color = '#5a9a3a'; btn.style.borderColor = '#5a9a3a'; }
    } catch (e) {
      alert('Purchase failed: ' + e.message);
    }
  };

  // --- Group Purchases ---
  async function openGroupPurchase(itemName, priceNum) {
    try {
      const snap = await db.collection('purchases')
        .where('itemName', '==', itemName).where('status', '==', 'open').limit(1).get();
      const purchaseId = snap.empty
        ? (await db.collection('purchases').add({
            itemName, itemPrice: priceNum, contributions: {}, status: 'open',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })).id
        : snap.docs[0].id;
      showGroupPurchasePanel(purchaseId, itemName, priceNum);
    } catch (e) {
      alert('Could not start group purchase: ' + e.message);
    }
  }

  function showGroupPurchasePanel(purchaseId, itemName, priceNum) {
    let panel = document.getElementById('gp-panel');
    if (panel) panel.remove();
    panel = document.createElement('div');
    panel.id = 'gp-panel';
    panel.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9100;background:linear-gradient(160deg,#f7edd8,#ecdcb5);border-top:2px solid #7a5a28;padding:16px 24px;font-family:\'Crimson Text\',serif;color:#1a1208;box-shadow:0 -6px 30px rgba(0,0,0,0.5);';
    panel.innerHTML = `
      <div style="max-width:640px;margin:0 auto;">
        <div style="font-family:'Cinzel',serif;font-size:0.76rem;color:#7a1515;margin-bottom:10px;font-weight:600;">
          Group Purchase &mdash; ${esc(itemName)} (${priceNum}&nbsp;gp)
        </div>
        <div id="gp-progress" style="margin-bottom:12px;"></div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="number" id="gp-amount" min="1" placeholder="Your contribution (gp)"
            style="font-family:'Crimson Text',serif;font-size:0.9rem;padding:5px 8px;border:1px solid #b08840;border-radius:2px;background:rgba(255,255,255,0.6);color:#1a1208;width:210px;">
          <button onclick="contributeGold('${purchaseId}','${esc(itemName)}',${priceNum})"
            style="font-family:'Cinzel',serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:0.1em;color:#c4920a;border:1px solid #9a7000;border-radius:2px;padding:7px 16px;background:none;cursor:pointer;">
            Contribute
          </button>
          <button onclick="document.getElementById('gp-panel').remove()"
            style="font-family:'Cinzel',serif;font-size:0.58rem;text-transform:uppercase;letter-spacing:0.1em;color:#7a5a28;border:1px solid #7a5a28;border-radius:2px;padding:7px 14px;background:none;cursor:pointer;">
            Cancel
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Live progress
    db.collection('purchases').doc(purchaseId).onSnapshot(doc => {
      if (!doc.exists) return;
      const d = doc.data();
      const total = Object.values(d.contributions || {}).reduce((a, b) => a + b, 0);
      const pct = Math.min(100, Math.round(total / priceNum * 100));
      const prog = document.getElementById('gp-progress');
      if (!prog) return;
      prog.innerHTML = `
        <div style="font-size:0.8rem;margin-bottom:5px;color:#4a3520;">
          Pooled: <strong>${total}&nbsp;gp</strong> of ${priceNum}&nbsp;gp (${pct}%)
        </div>
        <div style="background:rgba(0,0,0,0.1);border-radius:2px;height:9px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${pct>=100?'#285a18':'#9a7000'};transition:width 0.4s;border-radius:2px;"></div>
        </div>
        ${d.status==='fulfilled'?'<div style="color:#285a18;font-weight:bold;font-size:0.85rem;margin-top:6px;">&#10003; Purchase complete — item added to all contributors!</div>':''}
      `;
    });
  }

  window.contributeGold = async function (purchaseId, itemName, priceNum) {
    if (!window.currentCharId || window.currentCharId === 'dm') return;
    const charId = window.currentCharId;
    const amountEl = document.getElementById('gp-amount');
    const amount = parseInt(amountEl ? amountEl.value : '0') || 0;
    if (amount <= 0) { alert('Enter an amount greater than 0.'); return; }
    try {
      const charRef = db.collection('characters').doc(charId);
      const purchaseRef = db.collection('purchases').doc(purchaseId);
      let fulfilled = false;
      let finalContribs = {};

      await db.runTransaction(async tx => {
        const [charDoc, purchaseDoc] = await Promise.all([tx.get(charRef), tx.get(purchaseRef)]);
        if (!charDoc.exists || !purchaseDoc.exists) throw new Error('Document missing');
        const gold = parseInt(charDoc.data()['f-gold'] || '0') || 0;
        if (gold < amount) throw new Error(`Not enough gold — you have ${gold} gp`);
        const pData = purchaseDoc.data();
        if (pData.status !== 'open') throw new Error('This purchase is already closed');
        const contribs = { ...pData.contributions };
        contribs[charId] = (contribs[charId] || 0) + amount;
        const total = Object.values(contribs).reduce((a, b) => a + b, 0);
        fulfilled = total >= priceNum;
        finalContribs = contribs;
        tx.set(charRef, { 'f-gold': String(gold - amount), 'f-gold2': String(gold - amount) }, { merge: true });
        tx.set(purchaseRef, { contributions: contribs, status: fulfilled ? 'fulfilled' : 'open' }, { merge: true });
      });

      if (fulfilled) {
        await Promise.all(Object.keys(finalContribs).map(async cid => {
          const cDoc = await db.collection('characters').doc(cid).get();
          if (!cDoc.exists) return;
          const equip = (cDoc.data()['f-equipment'] || '').trim();
          await db.collection('characters').doc(cid).set({
            'f-equipment': equip ? equip + '\n' + itemName : itemName
          }, { merge: true });
        }));
      }

      if (amountEl) amountEl.value = '';
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  function slugify(s) { return (s || '').replace(/\W+/g, '-').toLowerCase(); }
  window._authSlugify = slugify;

  // --- Bootstrap ---
  function waitAndStart() {
    if (typeof firebase === 'undefined' || !firebase.auth || typeof db === 'undefined' || !db) {
      setTimeout(waitAndStart, 200); return;
    }
    startAuth();
  }
  waitAndStart();

})();
