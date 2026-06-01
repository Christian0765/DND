#!/usr/bin/env python3
"""
transform.py — generates sheet-1.html through sheet-4.html, sheet-template.html
from the draft character sheet design.
"""
import re

DRAFT = '/root/.claude/uploads/52484669-2103-4790-90ce-87f5f224a05f/03ccae0c-sheetredesigndraft.html'

with open(DRAFT, 'r', encoding='utf-8') as f:
    draft = f.read()

# ─────────────────────────────────────────────────────────────────
# A. Add CSS additions just before closing </style> of the first style block
# ─────────────────────────────────────────────────────────────────
CSS_ADDITIONS = """
/* ── SYNC STATUS ── */
.sync-status {
  font-family: 'Cinzel', serif;
  font-size: 0.52rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 3px 10px;
  border-radius: 2px;
  border: 1px solid;
}
.sync-status.ok { color: #5a9a3a; border-color: #5a9a3a; background: rgba(90,154,58,0.1); }
.sync-status.saving { color: var(--gold-light); border-color: var(--gold); background: rgba(154,112,0,0.1); }
.sync-status.error { color: var(--red); border-color: var(--red); background: rgba(122,21,21,0.1); }
.sync-status.offline { color: var(--border-light); border-color: var(--border); background: rgba(122,90,40,0.1); }
/* ── EDITABLE META INPUTS ── */
input.sheet-name {
  background: transparent; border: none; border-bottom: 1px dashed rgba(255,255,255,0.15);
  outline: none; width: 100%; color: inherit; font-family: 'Cinzel', serif;
  font-size: 2.6rem; font-weight: 900; letter-spacing: 0.04em; line-height: 1;
  text-shadow: 0 2px 24px rgb(var(--accent-rgb, 184,134,11) / 0.35);
}
input.sheet-name:focus { border-bottom-color: var(--accent); }
input.sheet-meta-val {
  background: transparent; border: none; border-bottom: 1px dashed rgba(255,255,255,0.1);
  outline: none; color: inherit; font-family: 'Cinzel', serif;
  font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em; width: 100%;
}
input.sheet-meta-val:focus { border-bottom-color: var(--accent); background: rgba(255,255,255,0.04); }
/* ── REST BANNERS ── */
.rest-banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px; font-family: 'Cinzel', serif;
  font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.1em;
  animation: slideDown 0.3s ease;
}
@keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:none; } }
.rest-banner-short { background: rgb(var(--accent-rgb)/0.15); color: var(--accent); border-bottom: 1px solid var(--accent); }
.rest-banner-long  { background: rgb(var(--success-rgb)/0.15); color: var(--success-color); border-bottom: 1px solid var(--success-color); }
.rest-banner button { background:none; border:none; cursor:pointer; color:inherit; font-size:0.8rem; opacity:0.6; }
.rest-banner button:hover { opacity:1; }
"""

# Find the first </style> and insert CSS before it
first_style_close = draft.index('</style>')
draft = draft[:first_style_close] + CSS_ADDITIONS + draft[first_style_close:]

# ─────────────────────────────────────────────────────────────────
# B. After <body>, insert hidden f-* input fields
# ─────────────────────────────────────────────────────────────────
HIDDEN_FIELDS = """
<!-- Hidden fields — bridge between Firestore and the interactive UI -->
<input type="hidden" id="f-name">
<input type="hidden" id="f-player">
<input type="hidden" id="f-class">
<input type="hidden" id="f-race">
<input type="hidden" id="f-bg">
<input type="hidden" id="f-align">
<input type="hidden" id="f-prof">
<input type="hidden" id="f-ac">
<input type="hidden" id="f-init">
<input type="hidden" id="f-speed">
<input type="hidden" id="f-curhp">
<input type="hidden" id="f-maxhp">
<input type="hidden" id="f-hd">
<input type="hidden" id="f-pp">
<input type="hidden" id="f-gold">
<input type="hidden" id="f-gold2">
<input type="hidden" id="f-carry">
<input type="hidden" id="f-str">  <input type="hidden" id="f-strmod">
<input type="hidden" id="f-dex">  <input type="hidden" id="f-dexmod">
<input type="hidden" id="f-con">  <input type="hidden" id="f-conmod">
<input type="hidden" id="f-int">  <input type="hidden" id="f-intmod">
<input type="hidden" id="f-wis">  <input type="hidden" id="f-wismod">
<input type="hidden" id="f-cha">  <input type="hidden" id="f-chamod">
<input type="hidden" id="f-traits">
<input type="hidden" id="f-ideals">
<input type="hidden" id="f-bonds">
<input type="hidden" id="f-flaws">
<input type="hidden" id="f-profs">
<input type="hidden" id="f-features">
<input type="hidden" id="f-notes">
<input type="hidden" id="f-backstory">
<input type="hidden" id="f-weapons">
<input type="hidden" id="f-equipment">
"""

draft = draft.replace('<body>\n', '<body>\n' + HIDDEN_FIELDS, 1)

# ─────────────────────────────────────────────────────────────────
# C. Top bar — replace sync pill + add save button
# ─────────────────────────────────────────────────────────────────
draft = draft.replace(
    '<span class="sync-pill">Live ✓</span>',
    '<button class="quest-btn" onclick="saveToFirestore()">Save</button>\n    <span class="sync-status offline" id="sync-status">Connecting...</span>'
)

# ─────────────────────────────────────────────────────────────────
# D. Header — replace static name div with input
# ─────────────────────────────────────────────────────────────────
draft = draft.replace(
    '<div class="sheet-name">Dracula</div>',
    '<input class="sheet-name" id="sheet-name-input" placeholder="Character Name" oninput="document.getElementById(\'f-name\').value=this.value;saveToFirestore()">'
)

# ─────────────────────────────────────────────────────────────────
# E. Header meta — replace static .sheet-meta-grid with editable inputs
# ─────────────────────────────────────────────────────────────────
OLD_META_GRID = """  <div class="sheet-meta-grid">
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Class & Level</span>
      <span class="sheet-meta-val">Fighter 11</span>
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Race</span>
      <span class="sheet-meta-val">Dragonborn</span>
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Background</span>
      <span class="sheet-meta-val">Soldier</span>
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Alignment</span>
      <span class="sheet-meta-val">Chaotic Good</span>
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Player</span>
      <span class="sheet-meta-val">1</span>
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Prof. Bonus</span>
      <span class="sheet-meta-val" id="prof-bonus-display">+4</span>
    </div>
  </div>"""

NEW_META_GRID = """  <div class="sheet-meta-grid">
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Class & Level</span>
      <input class="sheet-meta-val" id="f-class" placeholder="Class &amp; Level" oninput="document.getElementById('f-class').value=this.value;updateProfBonus();updateSubtitle();saveToFirestore()">
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Race</span>
      <input class="sheet-meta-val" id="f-race" placeholder="Race" oninput="document.getElementById('f-race').value=this.value;updateSubtitle();saveToFirestore()">
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Background</span>
      <input class="sheet-meta-val" id="f-bg" placeholder="Background" oninput="document.getElementById('f-bg').value=this.value;saveToFirestore()">
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Alignment</span>
      <input class="sheet-meta-val" id="f-align" placeholder="Alignment" oninput="document.getElementById('f-align').value=this.value;updateSubtitle();saveToFirestore()">
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Player</span>
      <input class="sheet-meta-val" id="f-player" placeholder="Player" oninput="document.getElementById('f-player').value=this.value;saveToFirestore()">
    </div>
    <div class="sheet-meta-item">
      <span class="sheet-meta-label">Prof. Bonus</span>
      <span class="sheet-meta-val" id="prof-bonus-display">+2</span>
    </div>
  </div>"""

draft = draft.replace(OLD_META_GRID, NEW_META_GRID)

# ─────────────────────────────────────────────────────────────────
# F. Modify renderCharacterSheet() to set input values
# ─────────────────────────────────────────────────────────────────
OLD_RENDER = """  document.querySelectorAll('.sheet-meta-item').forEach(item => {
    const lbl = item.querySelector('.sheet-meta-label')?.textContent?.trim();
    const val = item.querySelector('.sheet-meta-val');
    if (lbl && val && metaMap[lbl] !== undefined && val.id !== 'prof-bonus-display') {
      val.textContent = metaMap[lbl];
    }
  });
  // Subtitle
  const sub = document.getElementById('sheet-subtitle');
  if (sub) sub.textContent = `${c.classLvl} · ${c.race} · ${c.align}`;

  // Character name
  const nameEl = document.querySelector('.sheet-name');
  if (nameEl) nameEl.textContent = c.name;"""

NEW_RENDER = """  document.querySelectorAll('.sheet-meta-item').forEach(item => {
    const lbl = item.querySelector('.sheet-meta-label')?.textContent?.trim();
    const val = item.querySelector('.sheet-meta-val');
    if (lbl && val && metaMap[lbl] !== undefined && val.id !== 'prof-bonus-display') {
      if (val.tagName === 'INPUT') val.value = metaMap[lbl];
      else val.textContent = metaMap[lbl];
    }
  });
  // Subtitle
  const sub = document.getElementById('sheet-subtitle');
  if (sub) sub.textContent = `${c.classLvl} · ${c.race} · ${c.align}`;

  // Character name
  const nameEl = document.getElementById('sheet-name-input');
  if (nameEl) nameEl.value = c.name;"""

draft = draft.replace(OLD_RENDER, NEW_RENDER)

# ─────────────────────────────────────────────────────────────────
# G. Modify updateProfBonus() to read from f-class input
# ─────────────────────────────────────────────────────────────────
draft = draft.replace(
    "  const classRaw = document.querySelector('.sheet-meta-val')?.textContent || '';",
    "  const classRaw = document.getElementById('f-class')?.value || document.querySelector('.sheet-meta-val')?.value || document.querySelector('.sheet-meta-val')?.textContent || '';"
)

# ─────────────────────────────────────────────────────────────────
# H. Modify getCharClass() to read from f-class input (same issue as updateProfBonus)
# ─────────────────────────────────────────────────────────────────
draft = draft.replace(
    "  const raw = document.querySelector('.sheet-meta-val')?.textContent || '';",
    "  const raw = document.getElementById('f-class')?.value || document.querySelector('.sheet-meta-val')?.value || document.querySelector('.sheet-meta-val')?.textContent || '';"
)

# ─────────────────────────────────────────────────────────────────
# J. Add populateCharacterFromFields() after the closing }; of CHARACTER object
# ─────────────────────────────────────────────────────────────────
POPULATE_FUNCTION = """
function populateCharacterFromFields() {
  CHARACTER.name      = document.getElementById('f-name')?.value      || CHARACTER.name;
  CHARACTER.classLvl  = document.getElementById('f-class')?.value     || CHARACTER.classLvl;
  CHARACTER.race      = document.getElementById('f-race')?.value      || CHARACTER.race;
  CHARACTER.bg        = document.getElementById('f-bg')?.value        || CHARACTER.bg;
  CHARACTER.align     = document.getElementById('f-align')?.value     || CHARACTER.align;
  CHARACTER.player    = document.getElementById('f-player')?.value    || CHARACTER.player;
  CHARACTER.profBonus = document.getElementById('f-prof')?.value      || CHARACTER.profBonus;
  CHARACTER.ac        = document.getElementById('f-ac')?.value        || CHARACTER.ac;
  CHARACTER.initiative= document.getElementById('f-init')?.value      || CHARACTER.initiative;
  CHARACTER.speed     = parseInt(document.getElementById('f-speed')?.value) || CHARACTER.speed;
  CHARACTER.curHp     = parseInt(document.getElementById('f-curhp')?.value) || 0;
  CHARACTER.maxHp     = parseInt(document.getElementById('f-maxhp')?.value) || 0;
  CHARACTER.hd        = document.getElementById('f-hd')?.value        || CHARACTER.hd;
  CHARACTER.pp        = parseInt(document.getElementById('f-pp')?.value) || CHARACTER.pp;
  CHARACTER.gold      = parseInt(document.getElementById('f-gold')?.value)  || 0;
  CHARACTER.gold2     = parseInt(document.getElementById('f-gold2')?.value) || 0;
  CHARACTER.carry     = parseInt(document.getElementById('f-carry')?.value) || CHARACTER.carry;
  ['str','dex','con','int','wis','cha'].forEach(ab => {
    const score = parseInt(document.getElementById('f-'+ab)?.value);
    const mod   = document.getElementById('f-'+ab+'mod')?.value;
    if (!isNaN(score)) CHARACTER[ab] = [score, mod || '+0'];
  });
  window.curHp = CHARACTER.curHp;
  window.maxHp = CHARACTER.maxHp;
}

"""

# Insert after the closing }; of the CHARACTER object (before function renderCharacterSheet)
draft = draft.replace(
    '};\n\nfunction renderCharacterSheet()',
    '};\n' + POPULATE_FUNCTION + 'function renderCharacterSheet()'
)

# ─────────────────────────────────────────────────────────────────
# K. Add rest functions before init section
# ─────────────────────────────────────────────────────────────────
REST_FUNCTIONS = """
// ── REST SYSTEM ───────────────────────────────────────────
function handleRest(type, restRef) {
  if (type === 'short') {
    CLASS_RESOURCES.forEach(r => {
      if (r.recover === 'Short rest' || r.recover === 'Short or Long rest') r.used = 0;
    });
    renderResources();
    syncAbilityChips();
    showShortRestModal();
  } else if (type === 'long') {
    CLASS_RESOURCES.forEach(r => { r.used = 0; });
    _activeConditions.clear();
    renderConditions();
    _exhaustion = Math.max(0, _exhaustion - 1);
    renderExhaustion();
    _hdSpent = Math.max(0, _hdSpent - Math.ceil(_hdTotal / 2));
    renderHitDice();
    curHp = maxHp;
    updateHp();
    renderSpellSlots();
    renderResources();
    syncAbilityChips();
    showLongRestNotification();
  }
  restRef.update({ acknowledged: firebase.firestore.FieldValue.arrayUnion(PLAYER_ID) });
}

function showShortRestModal() {
  const banner = document.createElement('div');
  banner.className = 'rest-banner rest-banner-short';
  banner.innerHTML = '<span>⏱ Short Rest — spend hit dice to recover HP</span><button onclick="this.parentElement.remove()">✕</button>';
  document.querySelector('.sheet-body')?.prepend(banner);
}

function showLongRestNotification() {
  const banner = document.createElement('div');
  banner.className = 'rest-banner rest-banner-long';
  banner.innerHTML = '<span>🌙 Long Rest — all resources restored, HP full</span><button onclick="this.parentElement.remove()">✕</button>';
  document.querySelector('.sheet-body')?.prepend(banner);
  setTimeout(() => banner.remove(), 8000);
}

"""

draft = draft.replace(
    '// Init — load saved cosmetics first so everything renders with correct colours',
    REST_FUNCTIONS + '// Init — load saved cosmetics first so everything renders with correct colours'
)

# ─────────────────────────────────────────────────────────────────
# L. Modify init section
# ─────────────────────────────────────────────────────────────────
OLD_INIT = """// Init — load saved cosmetics first so everything renders with correct colours
loadCosmetics();
renderCharacterSheet(); // populate all values from CHARACTER data object
renderItems();
renderHitDice();
renderConditions();
renderExhaustion();
renderAttunement();
renderResources();
renderProficiencies();
renderFeatures();
renderWeaponChips();
syncAbilityChips();
updateProfBonus();
updateHp();
applyDisplayMode();

// Set condition color variables from CONDITIONS defaults
CONDITIONS.forEach(c => {
  document.documentElement.style.setProperty(c.varName, c.default);
});

// Watch for class/level changes via MutationObserver on the first meta-val
(function() {
  const classEl = document.querySelector('.sheet-meta-val');
  if (!classEl) return;
  const obs = new MutationObserver(() => {
    updateProfBonus();
    renderSpellSlots();
    renderAbilityButtons();
    updateSubtitle();
  });
  obs.observe(classEl, { childList: true, characterData: true, subtree: true });
})();"""

NEW_INIT = """// Init — load saved cosmetics first so everything renders with correct colours
loadCosmetics();
renderCharacterSheet();
renderItems();
renderHitDice();
renderConditions();
renderExhaustion();
renderAttunement();
renderResources();
renderProficiencies();
renderFeatures();
renderWeaponChips();
syncAbilityChips();
updateProfBonus();
updateHp();
applyDisplayMode();

CONDITIONS.forEach(c => {
  document.documentElement.style.setProperty(c.varName, c.default);
});

(function() {
  const classEl = document.getElementById('f-class');
  if (!classEl) return;
  const obs = new MutationObserver(() => { updateProfBonus(); updateSubtitle(); });
  obs.observe(classEl, { attributes: true, characterData: true, subtree: true });
})();"""

draft = draft.replace(OLD_INIT, NEW_INIT)

# ─────────────────────────────────────────────────────────────────
# M. Firebase block template (PLAYER_ID_VALUE to be replaced per sheet)
# ─────────────────────────────────────────────────────────────────
FIREBASE_BLOCK = """
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script>
const PLAYER_ID = 'PLAYER_ID_VALUE';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const FIELDS = [
  'f-name','f-class','f-race','f-bg','f-align','f-player','f-prof',
  'f-ac','f-init','f-speed','f-curhp','f-maxhp','f-hd','f-pp','f-gold','f-carry',
  'f-str','f-strmod','f-dex','f-dexmod','f-con','f-conmod',
  'f-int','f-intmod','f-wis','f-wismod','f-cha','f-chamod',
  'f-traits','f-ideals','f-bonds','f-flaws','f-notes','f-gold2',
  'f-profs','f-features','f-backstory','f-weapons','f-equipment'
];

function setStatus(type, text) {
  const el = document.getElementById('sync-status');
  if (el) { el.className = 'sync-status ' + type; el.textContent = text; }
}

async function saveToFirestore() {
  setStatus('saving', 'Saving...');
  const data = {};
  FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value || '';
  });
  // Sync visible inputs to hidden fields before save
  const nameInp = document.getElementById('sheet-name-input');
  if (nameInp) data['f-name'] = nameInp.value || data['f-name'] || '';
  ['f-class','f-race','f-bg','f-align','f-player'].forEach(fid => {
    const vis = document.getElementById(fid);
    if (vis && vis.tagName === 'INPUT') data[fid] = vis.value || '';
  });
  try {
    await db.collection('characters').doc(PLAYER_ID).set(data, { merge: true });
    setStatus('ok', 'Saved ✓');
    setTimeout(() => setStatus('ok', 'Live ✓'), 2000);
  } catch (e) {
    setStatus('error', 'Save Failed');
  }
}

function loadFromFirestore() {
  setStatus('saving', 'Connecting...');
  db.collection('characters').doc(PLAYER_ID).onSnapshot(doc => {
    if (!doc.exists) { setStatus('ok', 'Ready'); return; }
    const data = doc.data();
    FIELDS.forEach(id => {
      if (data[id] !== undefined) {
        const el = document.getElementById(id);
        if (el) el.value = data[id];
      }
    });
    // Populate visible editable inputs in header
    const nameInp = document.getElementById('sheet-name-input');
    if (nameInp && data['f-name']) nameInp.value = data['f-name'];
    // Populate CHARACTER from fields and re-render
    populateCharacterFromFields();
    renderCharacterSheet();
    updateHp();
    setStatus('ok', 'Live ✓');
  }, () => setStatus('error', 'Connection error'));

  // Listen for DM-triggered rests
  db.collection('characters').doc(PLAYER_ID);
  const CAMPAIGN_ID_VAL = 'campaign1';
  try {
    db.collection('campaigns').doc(CAMPAIGN_ID_VAL)
      .collection('rest').doc('state')
      .onSnapshot(doc => {
        if (!doc.exists) return;
        const data = doc.data();
        if (!data.type) return;
        if (data.acknowledged?.includes(PLAYER_ID)) return;
        handleRest(data.type, doc.ref);
      });
  } catch(e) { /* rest system unavailable */ }
}

const FIELD_LABELS = {
  'f-name':'Character Name','f-class':'Class & Level','f-race':'Race',
  'f-bg':'Background','f-align':'Alignment','f-player':'Player',
  'f-prof':'Prof. Bonus','f-ac':'Armor Class','f-init':'Initiative',
  'f-speed':'Speed','f-curhp':'Current HP','f-maxhp':'Max HP',
  'f-hd':'Hit Dice','f-pp':'Passive Perception','f-gold':'Gold (GP)',
  'f-carry':'Carry Capacity','f-str':'STR','f-strmod':'STR Modifier',
  'f-dex':'DEX','f-dexmod':'DEX Modifier','f-con':'CON','f-conmod':'CON Modifier',
  'f-int':'INT','f-intmod':'INT Modifier','f-wis':'WIS','f-wismod':'WIS Modifier',
  'f-cha':'CHA','f-chamod':'CHA Modifier','f-traits':'Personality Traits',
  'f-ideals':'Ideals','f-bonds':'Bonds','f-flaws':'Flaws',
  'f-notes':'Session Notes','f-gold2':'Gold (Equipment)'
};
const HISTORY_KEY = 'edit-history-PLAYER_ID_VALUE';
const MAX_HISTORY = 100;

function recordEdit(fieldId, oldVal, newVal) {
  if (oldVal === newVal) return;
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  history.unshift({ ts: Date.now(), field: FIELD_LABELS[fieldId] || fieldId, from: oldVal, to: newVal });
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromFirestore();
});

let saveTimer;
FIELDS.forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    let oldValue;
    el.addEventListener('focus', () => { oldValue = el.value; });
    el.addEventListener('blur', () => { recordEdit(id, oldValue, el.value); });
    el.addEventListener('input', () => {
      setStatus('saving', 'Unsaved changes');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(saveToFirestore, 2000);
    });
  }
});
</script>
"""

# Insert FIREBASE_BLOCK right after </script> (the main script block close)
# The main </script> is at the end of the init section
draft = draft.replace('</script>\n<!-- ITEM MODAL -->', FIREBASE_BLOCK + '</script>\n<!-- ITEM MODAL -->', 1)

# Wait - actually we insert AFTER the first </script> that closes the main script block
# But we already moved it into the init section. Let me re-check.
# The structure is: </script> then <!-- ITEM MODAL -->
# We want to insert the Firebase block between them.
# The replace above puts FIREBASE_BLOCK before </script> which is wrong.
# Let's fix: insert AFTER the </script>
draft = draft.replace(
    FIREBASE_BLOCK + '</script>\n<!-- ITEM MODAL -->',
    '</script>\n' + FIREBASE_BLOCK + '\n<!-- ITEM MODAL -->'
)

# ─────────────────────────────────────────────────────────────────
# EMPTY CHARACTER object for blank sheets
# ─────────────────────────────────────────────────────────────────
DRACULA_CHARACTER = """const CHARACTER = {
  name:      'Ash',
  player:    '1',
  classLvl:  'Fighter 11',
  race:      'Dragonborn',
  bg:        'Soldier',
  align:     'Chaotic Good',
  profBonus: '+4',
  ac:        18,
  initiative:'+1',
  speed:     30,
  curHp:     125,
  maxHp:     125,
  hd:        '11d10',
  pp:        9,
  gold:      82,
  gold2:     0,
  carry:     330,
  // Ability scores [score, modifier]
  str:  [22, '+6'], dex: [13, '+1'], con: [10, '+0'],
  int:  [11, '+0'], wis: [8,  '−1'], cha: [18, '+4'],
  // Saving throws
  strSave: '+10', dexSave: '+1',  conSave: '+0',
  intSave: '+0',  wisSave: '−1',  chaSave: '+4',
  // Skills (proficient ones marked)
  skills: {
    Acrobatics:     { bonus: '+1',  prof: false },
    'Animal Handling': { bonus: '−1', prof: false },
    Arcana:         { bonus: '+0',  prof: false },
    Athletics:      { bonus: '+10', prof: true  },
    Deception:      { bonus: '+4',  prof: false },
    History:        { bonus: '+0',  prof: false },
    Insight:        { bonus: '−1',  prof: false },
    Intimidation:   { bonus: '+8',  prof: true  },
    Investigation:  { bonus: '+0',  prof: false },
    Medicine:       { bonus: '−1',  prof: false },
    Nature:         { bonus: '+0',  prof: false },
    Perception:     { bonus: '+3',  prof: true  },
    Performance:    { bonus: '+4',  prof: false },
    Persuasion:     { bonus: '+4',  prof: false },
    Religion:       { bonus: '+0',  prof: false },
    'Sleight of Hand': { bonus: '+1', prof: false },
    Stealth:        { bonus: '+1',  prof: false },
    Survival:       { bonus: '+3',  prof: true  },
  },
};"""

EMPTY_CHARACTER = """const CHARACTER = {
  name: '', player: '', classLvl: '', race: '', bg: '', align: '',
  profBonus: '+2', ac: '', initiative: '', speed: 30,
  curHp: 0, maxHp: 0, hd: '', pp: 0, gold: 0, gold2: 0, carry: 0,
  str: [10, '+0'], dex: [10, '+0'], con: [10, '+0'],
  int: [10, '+0'], wis: [10, '+0'], cha: [10, '+0'],
  strSave: '+0', dexSave: '+0', conSave: '+0',
  intSave: '+0', wisSave: '+0', chaSave: '+0',
  skills: {
    Acrobatics: { bonus: '+0', prof: false }, 'Animal Handling': { bonus: '+0', prof: false },
    Arcana: { bonus: '+0', prof: false }, Athletics: { bonus: '+0', prof: false },
    Deception: { bonus: '+0', prof: false }, History: { bonus: '+0', prof: false },
    Insight: { bonus: '+0', prof: false }, Intimidation: { bonus: '+0', prof: false },
    Investigation: { bonus: '+0', prof: false }, Medicine: { bonus: '+0', prof: false },
    Nature: { bonus: '+0', prof: false }, Perception: { bonus: '+0', prof: false },
    Performance: { bonus: '+0', prof: false }, Persuasion: { bonus: '+0', prof: false },
    Religion: { bonus: '+0', prof: false }, 'Sleight of Hand': { bonus: '+0', prof: false },
    Stealth: { bonus: '+0', prof: false }, Survival: { bonus: '+0', prof: false },
  },
};"""

# ─────────────────────────────────────────────────────────────────
# Generate all 5 sheet variants
# ─────────────────────────────────────────────────────────────────

def make_sheet(base, player_id, title, use_dracula_character):
    html = base
    # Set title
    html = html.replace('<title>Dracula — Character Sheet</title>', f'<title>{title}</title>', 1)
    # Set PLAYER_ID in Firebase block
    html = html.replace('PLAYER_ID_VALUE', player_id)
    # Set CHARACTER object
    if not use_dracula_character:
        html = html.replace(DRACULA_CHARACTER, EMPTY_CHARACTER, 1)
    return html

# Sheet 1: Dracula, player1
sheet1 = make_sheet(draft, 'player1', 'Dracula — Character Sheet', use_dracula_character=True)
with open('/home/user/DND/sheet-1.html', 'w', encoding='utf-8') as f:
    f.write(sheet1)
print('Written sheet-1.html')

# Sheet 2: Blank, player2
sheet2 = make_sheet(draft, 'player2', 'Character Sheet — Player 2', use_dracula_character=False)
with open('/home/user/DND/sheet-2.html', 'w', encoding='utf-8') as f:
    f.write(sheet2)
print('Written sheet-2.html')

# Sheet 3: Blank, player3
sheet3 = make_sheet(draft, 'player3', 'Character Sheet — Player 3', use_dracula_character=False)
with open('/home/user/DND/sheet-3.html', 'w', encoding='utf-8') as f:
    f.write(sheet3)
print('Written sheet-3.html')

# Sheet 4: Blank, player4
sheet4 = make_sheet(draft, 'player4', 'Character Sheet — Player 4', use_dracula_character=False)
with open('/home/user/DND/sheet-4.html', 'w', encoding='utf-8') as f:
    f.write(sheet4)
print('Written sheet-4.html')

# Template: Blank, player1, template title
template = make_sheet(draft, 'player1', 'Character Sheet Template', use_dracula_character=False)
with open('/home/user/DND/sheet-template.html', 'w', encoding='utf-8') as f:
    f.write(template)
print('Written sheet-template.html')

print('All sheets generated successfully.')
