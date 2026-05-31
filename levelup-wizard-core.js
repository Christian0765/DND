// ============================================================
//  D&D 5e LEVEL-UP WIZARD — CORE LOGIC
//  Load order (add to index.html before </body>):
//    1. levelup-data-core.js      ← tables & LU_CLASS_DATA container
//    2. levelup-barbarian.js      ← class data files (one per class)
//    3. levelup-bard.js
//    4. levelup-cleric.js
//    5. levelup-druid.js
//    6. levelup-fighter.js
//    7. levelup-monk.js
//    8. levelup-paladin.js
//    9. levelup-ranger.js
//   10. levelup-rogue.js
//   11. levelup-sorcerer.js
//   12. levelup-warlock.js
//   13. levelup-wizard.js         ← NOTE: this is the wizard CLASS, not this file!
//   14. levelup-artificer.js
//   15. levelup-wizard-core.js    ← THIS file (must be last)
//
//  Depends on globals already in index.html:
//    db, currentCampaignId, escHtml(), showToast()
// ============================================================

// ── WIZARD STATE ─────────────────────────────────────────────

let _luWizard = {
  open: false,
  slot: null,
  charData: null,
  className: '',
  currentLevel: 0,
  newLevel: 0,
  step: 0,          // 0=confirm 1=hp 2=features 3=spells 4=asi 5=summary 6=subclass
  totalSteps: 0,
  hpRoll: null,
  hpChoice: 'average',    // 'average' | 'roll'
  dmHealthChoice: 'add',  // 'full' | 'add' | 'keep'  (set by DM, sent with offer)
  asiChoice: null,   // 'plus2' | 'plus11' | 'feat'
  asiStat1: 'str',
  asiStat2: 'str',
  featChoice: '',
  subclassChoice: '', // name of chosen subclass
  changes: [],
};

// ── HELPERS ──────────────────────────────────────────────────

function luModifier(score){
  return Math.floor((parseInt(score)||10 - 10) / 2);
}

function luCalculateCorrectHpMax(cls, level, conMod){
  const hd = LU_HIT_DIE[cls] || 8;
  const avg = Math.ceil(hd / 2) + 1;
  let total = hd + conMod; // level 1: max die
  for (let l = 2; l <= level; l++) total += avg + conMod;
  return total;
}

function luIsAsiLevel(cls, lvl){
  const key = (cls === 'fighter' || cls === 'rogue') ? cls : 'default';
  return (LU_ASI_LEVELS[key] || LU_ASI_LEVELS.default).includes(lvl);
}

function luIsSubclassLevel(cls, lvl){
  return LU_SUBCLASS_LEVEL[cls] === lvl;
}

function luHasSpells(cls){
  return LU_CASTER_TYPE[cls] !== null && LU_CASTER_TYPE[cls] !== undefined;
}

function luGetSlots(cls, lvl){
  const type = LU_CASTER_TYPE[cls];
  if (!type) return null;
  return LU_SPELL_SLOTS[type]?.[lvl] || null;
}

function luGetField(data, key){
  return data[`f-${key}`] || data[key] || '';
}

function _luFeatureIcon(name){
  const n = (name||'').toLowerCase();
  if (/attack|strike|weapon/.test(n))                                                     return '⚔️';
  if (/defense|armor|ward|shield|protection|abjur/.test(n))                               return '🛡️';
  if (/spell|magic|cantrip|ritual|evoc|conjur|illus|enchant|necro|divin|transmut/.test(n)) return '✨';
  if (/rage|berserker|frenzy/.test(n))                                                    return '💢';
  if (/archetype|tradition|subclass|college|path|circle|oath|patron|origin|conclave/.test(n)) return '🎭';
  if (/healing|lay on|smite/.test(n))                                                     return '💛';
  if (/movement|speed|dash/.test(n))                                                      return '💨';
  if (/sneak|cunning/.test(n))                                                            return '🗡️';
  if (/ki|stance|martial/.test(n))                                                        return '🥋';
  if (/recovery|surge|second wind|rest/.test(n))                                          return '🌙';
  if (/bardic|inspiration|song/.test(n))                                                  return '🎵';
  return '📜';
}

function _luParseFeature(f){
  const m = (f||'').match(/^([^(]+?)\s*\((.+)\)$/s);
  if (m) return { name: m[1].trim(), desc: m[2].trim() };
  return { name: f, desc: '' };
}

// ── FEATURE LOOKUP ───────────────────────────────────────────
// Returns the combined feature list for the current level:
// base class features + subclass features (if a subclass is chosen)

function luGetFeatures(cls, lvl, subclassName){
  const classData = LU_CLASS_DATA[cls];
  if (!classData) return ['No class data found for this class.'];

  const base = classData.baseFeatures?.[lvl] || [];

  // If no subclass yet chosen (pre-subclass levels) just return base
  if (!subclassName) return base.length ? base : ['No new class features at this level.'];

  const subFeatures = classData.subclasses?.[subclassName]?.[lvl] || [];

  // Filter out generic placeholder strings from base that the subclass replaces
  const placeholders = [
    'Archetype Feature','Path Feature','College Feature','Tradition Feature',
    'Circle Feature','Conclave Feature','Patron Feature','Origin Feature',
    'Oath Feature','Specialist Feature','Domain Feature',
  ];
  const filteredBase = subFeatures.length
    ? base.filter(f => !placeholders.includes(f))
    : base;

  const combined = [...filteredBase, ...subFeatures];
  return combined.length ? combined : ['No new features at this level.'];
}

// ── STEP MANAGEMENT ──────────────────────────────────────────

function luDetermineSteps(){
  const w = _luWizard;
  let steps = [0]; // confirm always first
  steps.push(1); // HP — always shown; content adapts to dmHealthChoice
  steps.push(2); // features
  if(luIsSubclassLevel(w.className, w.newLevel)) steps.push(6); // subclass picker
  if(luHasSpells(w.className)) steps.push(3);                   // spell slots
  if(luIsAsiLevel(w.className, w.newLevel)) steps.push(4);      // asi/feat
  steps.push(5); // summary always last
  w.totalSteps = steps.length;
  return steps;
}

// ── OPEN WIZARD ──────────────────────────────────────────────

// Shared helper: load char data and populate _luWizard state
async function _luLoadChar(slot){
  const snap = await db.collection('campaigns').doc(currentCampaignId)
    .collection('characters').doc(slot).get();
  if (!snap.exists){ showToast('Character not found'); return null; }
  const data = snap.data();

  const cls = (luGetField(data,'class') || '').toLowerCase().trim().replace(/\s*\d+$/, '');
  // Bug 1 fix: fall back to extracting level from class field if f-level is absent/zero
  const rawLevel = parseInt(luGetField(data,'level'));
  const levelFromClass = parseInt((luGetField(data,'class') || '').match(/\d+$/)?.[0]);
  const lvl = (rawLevel && rawLevel > 0) ? rawLevel : (levelFromClass || 1);

  if (lvl >= 20){ showToast('Character is already max level (20)!'); return null; }

  const existingSubclass = luGetField(data,'subclass') || luGetField(data,'archetype') || '';
  const dmHealthChoice = data.pendingLevelUp?.dmHealthChoice || 'add';
  _luWizard = {
    open: true, slot, charData: data, className: cls,
    currentLevel: lvl, newLevel: lvl + 1,
    step: 0, hpRoll: null, hpChoice: 'average', dmHealthChoice,
    asiChoice: null, asiStat1: 'str', asiStat2: 'str',
    featChoice: '', subclassChoice: existingSubclass, changes: [],
  };
  luDetermineSteps();
  return data;
}

// DM entry point — read-only review modal, sends offer to player
async function openLevelUpWizard(slot){
  if (!currentCampaignId) return;
  try {
    const data = await _luLoadChar(slot);
    if (!data) return;
    renderLuDMModal();
  } catch(e){
    console.error(e);
    showToast('Error loading character');
  }
}

// Player entry point — interactive wizard that applies the level up
async function openLevelUpWizardPlayer(slot){
  if (!currentCampaignId) return;
  try {
    const data = await _luLoadChar(slot);
    if (!data) return;
    renderLuModal();
  } catch(e){
    console.error(e);
    showToast('Error loading character');
  }
}

// ── MODAL RENDER ─────────────────────────────────────────────

function renderLuModal(){
  const existing = document.getElementById('lu-modal-overlay');
  if(existing) existing.remove();

  const w = _luWizard;
  const steps = luDetermineSteps();
  const stepLabels = ['Confirm','HP','Features','Spells','ASI','Summary','Subclass'];

  const stepIndicator = steps.map((s,i) => {
    const isDone = i < w.step;
    const isActive = i === w.step;
    const cls = isDone ? 'lup-step-dot lup-done' : isActive ? 'lup-step-dot lup-active' : 'lup-step-dot';
    return `<div class="${cls}" title="${stepLabels[s]||''}">${isDone ? '✓' : i+1}</div>`;
  }).join('<div class="lup-step-line"></div>');

  const currentStepIndex = steps[w.step];
  let bodyHtml = '';
  if(currentStepIndex === 0) bodyHtml = luStepConfirm();
  else if(currentStepIndex === 1) bodyHtml = luStepHp();
  else if(currentStepIndex === 2) bodyHtml = luStepFeatures();
  else if(currentStepIndex === 3) bodyHtml = luStepSpells();
  else if(currentStepIndex === 4) bodyHtml = luStepAsi();
  else if(currentStepIndex === 5) bodyHtml = luStepSummary();
  else if(currentStepIndex === 6) bodyHtml = luStepSubclass();

  const isLast  = w.step === steps.length - 1;
  const isFirst = w.step === 0;

  const classIcon = { fighter:'⚔️', barbarian:'🪓', paladin:'🛡️', ranger:'🏹', monk:'🥋',
    rogue:'🗡️', wizard:'📚', sorcerer:'🔮', warlock:'👁️', cleric:'⛪',
    druid:'🌿', bard:'🎵', artificer:'⚙️' }[w.className] || '⚔️';

  const overlay = document.createElement('div');
  overlay.id = 'lu-modal-overlay';
  overlay.innerHTML = `
    <div class="lup-modal" role="dialog" aria-modal="true" aria-label="Level Up Wizard">
      <div class="lup-header">
        <div class="lup-header-icon">${classIcon}</div>
        <div class="lup-header-text">
          <div class="lup-title">Level Up Wizard</div>
          <div class="lup-subtitle">${escHtml(luGetField(w.charData,'name')||'Character')} — ${escHtml(w.className||'Unknown')}</div>
        </div>
        <button class="lup-close" onclick="closeLuModal()" aria-label="Close">✕</button>
      </div>
      <div class="lup-steps">${stepIndicator}</div>
      <div class="lup-body">${bodyHtml}</div>
      <div class="lup-footer">
        ${!isFirst ? `<button class="lup-back-btn" onclick="luNavStep(-1)">← Back</button>` : '<div></div>'}
        <button class="lup-next-btn${isLast?' lup-apply':''}" onclick="${isLast ? 'luApplyLevelUp()' : 'luNavStep(1)'}">
          ${isLast ? '🎉 Apply Level Up' : 'Next →'}
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  if(currentStepIndex === 1){
    document.getElementById('lu-roll-hp-btn')?.addEventListener('click', luRollHp);
  }
}

// ── STEP RENDERERS ───────────────────────────────────────────

function luStepConfirm(){
  const w = _luWizard;
  const profOld = LU_PROF_BONUS[w.currentLevel] || 2;
  const profNew = LU_PROF_BONUS[w.newLevel] || 2;
  const classData = LU_CLASS_DATA[w.className];

  return `
    <div class="lup-level-banner">
      <div class="lup-level-block">
        <div class="lup-level-num lup-lvl-old">${w.currentLevel}</div>
        <div class="lup-level-label lup-lvl-old-label">Current</div>
      </div>
      <div class="lup-level-arrow">→</div>
      <div class="lup-level-block">
        <div class="lup-level-num lup-lvl-new">${w.newLevel}</div>
        <div class="lup-level-label lup-lvl-new-label">New Level</div>
      </div>
    </div>
    <div class="lup-detail-rows">
      <div class="lup-detail-row">
        <div class="lup-detail-label">Class</div>
        <div class="lup-detail-value">${escHtml(w.className||'Unknown')}</div>
      </div>
      <div class="lup-detail-row">
        <div class="lup-detail-label">Proficiency Bonus</div>
        <div class="lup-detail-value"><span class="lup-muted">+${profOld}</span> → +${profNew}</div>
      </div>
      <div class="lup-detail-row">
        <div class="lup-detail-label">Hit Die</div>
        <div class="lup-detail-value">d${LU_HIT_DIE[w.className]||8}</div>
      </div>
    </div>
    ${!classData ? `<div class="lup-warning-box" style="margin-top:10px;"><span>⚠️</span><div class="lup-warning-text">Class data not found for "${escHtml(w.className)}" — features won't display correctly.</div></div>` : ''}
    ${luIsAsiLevel(w.className, w.newLevel)     ? `<div class="lup-asi-badge"><span>⭐</span><span class="lup-asi-badge-text">ASI / Feat available at this level!</span></div>` : ''}
    ${luIsSubclassLevel(w.className, w.newLevel) ? `<div class="lup-asi-badge"><span>🎭</span><span class="lup-asi-badge-text">Subclass selection at this level!</span></div>` : ''}
  `;
}

function luStepHp(){
  const w = _luWizard;
  const hd = LU_HIT_DIE[w.className] || 8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const conStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const avg = Math.ceil(hd / 2) + 1;
  const totalAvg = avg + conMod;
  const totalRoll = w.hpRoll !== null ? (w.hpRoll + conMod) : null;
  const hpGain = w.hpChoice === 'roll' && totalRoll !== null ? totalRoll : totalAvg;
  const currentMaxHp = parseInt(luGetField(w.charData,'maxhp')||0);
  const currentHp    = parseInt(luGetField(w.charData,'hp')||0);
  const dmHC = w.dmHealthChoice || 'add';

  // What happens to current HP — shown under the summary bar
  const newMax = currentMaxHp + (w.hpChoice==='average' ? totalAvg : (totalRoll ?? '?'));
  let currentHpNote = '';
  if (dmHC === 'full') {
    const newMaxNum = typeof newMax === 'number' ? newMax : null;
    currentHpNote = `<div class="lup-warning-box" style="border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.07);margin-top:10px;">
      <span>💯</span>
      <div class="lup-warning-text">
        <strong style="color:#c9a84c;">Fully Healed</strong> — after levelling up your current HP will be set to your new max
        ${newMaxNum !== null ? `(<strong style="color:#f5e6c8;">${newMaxNum}</strong>)` : ''}.
      </div>
    </div>`;
  } else if (dmHC === 'add') {
    currentHpNote = `<div style="font-family:'Crimson Text',serif;font-size:13px;color:#6a5030;margin-top:8px;padding:0 2px;">
      ➕ Your current HP will also increase by the same amount.
    </div>`;
  } else {
    // keep
    currentHpNote = `<div class="lup-warning-box" style="border-color:rgba(201,168,76,0.4);background:rgba(201,168,76,0.07);margin-top:10px;">
      <span>🩹</span>
      <div class="lup-warning-text">
        <strong style="color:#c9a84c;">Staying Injured</strong> — your current HP stays at
        <strong style="color:#f5e6c8;">${currentHp}</strong> after levelling up.
      </div>
    </div>`;
  }

  return `
    <p class="lup-step-desc">Roll your hit die or take the average HP increase.</p>
    <div class="lup-hp-options">
      <div class="lup-hp-option${w.hpChoice==='average'?' lup-selected':''}" onclick="luSetHpChoice('average')">
        <div class="lup-radio-dot${w.hpChoice==='average'?' lup-radio-checked':''}"></div>
        <div>
          <div class="lup-hp-title">Take Average</div>
          <div class="lup-hp-value">${avg} ${conStr} = <strong>+${totalAvg} HP</strong></div>
          <div class="lup-hp-sub">Consistent, reliable choice</div>
        </div>
      </div>
      <div class="lup-hp-option${w.hpChoice==='roll'?' lup-selected':''}" onclick="luSetHpChoice('roll')">
        <div class="lup-radio-dot${w.hpChoice==='roll'?' lup-radio-checked':''}"></div>
        <div style="flex:1;">
          <div class="lup-hp-title">Roll d${hd}</div>
          ${w.hpRoll !== null
            ? `<div class="lup-hp-value" id="lu-hp-roll-val"><span id="lu-hp-roll-display">${w.hpRoll}</span> ${conStr} = <strong>+${totalRoll} HP</strong></div>`
            : `<div class="lup-hp-sub">Risk it for a higher result</div>`
          }
          ${w.hpChoice === 'roll' ? `
          <div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <button id="lu-roll-hp-btn" style="background:linear-gradient(135deg,#8b3a3a,#6b2e2e);border:1px solid rgba(201,168,76,.3);color:#f5e6c8;font-family:'Cinzel',serif;font-size:0.6rem;padding:7px 14px;cursor:pointer;border-radius:2px;letter-spacing:1px;">🎲 ${w.hpRoll !== null ? 'Reroll' : 'Roll'} d${hd}</button>
            <input type="number" id="lu-hp-manual-input" style="width:55px;background:#0a0800;border:1px solid #3a2c0e;color:#d4af37;font-family:'Cinzel',serif;font-size:0.85rem;padding:5px 8px;border-radius:2px;text-align:center;" min="1" max="${hd}" placeholder="1–${hd}" value="${w.hpRoll !== null ? w.hpRoll : ''}"
              oninput="luManualHpInput(this, ${hd})"
              onchange="luManualHpInput(this, ${hd})">
          </div>` : ''}
        </div>
      </div>
    </div>
    <div class="lup-hp-summary">
      <span>Current HP Max: <strong>${currentMaxHp||'?'}</strong></span>
      <span>→ New HP Max: <strong class="lu-hp-summary-new">${newMax}</strong></span>
    </div>
    ${currentHpNote}
  `;
}

function luStepFeatures(){
  const w = _luWizard;
  const features = luGetFeatures(w.className, w.newLevel, w.subclassChoice);
  const classData = LU_CLASS_DATA[w.className];
  const realFeatures = features.filter(f =>
    f !== 'No new class features at this level.' && f !== 'No new features at this level.'
  );

  const featHtml = realFeatures.length
    ? realFeatures.map(f => {
        const { name, desc } = _luParseFeature(f);
        return `<div class="lup-feature-item">
          <div class="lup-feature-icon">${_luFeatureIcon(name)}</div>
          <div>
            <div class="lup-feature-name">${escHtml(name)}</div>
            ${desc ? `<div class="lup-feature-desc">${escHtml(desc)}</div>` : ''}
          </div>
        </div>`;
      }).join('')
    : `<div style="font-family:'Crimson Text',serif;font-style:italic;color:#4a3820;font-size:14px;padding:8px 0;">No new class features at this level.</div>`;

  return `
    <div class="lup-section-label">New Features at ${escHtml(w.className||'')} Level ${w.newLevel}${w.subclassChoice ? ` — ${escHtml(w.subclassChoice)}` : ''}</div>
    <div class="lup-features-list">${featHtml}</div>
    ${!classData ? `<div class="lup-warning-box" style="margin-top:12px;"><span>⚠️</span><div class="lup-warning-text">Class "${escHtml(w.className)}" not recognised — check spelling.</div></div>` : ''}
    ${classData && w.subclassChoice && !classData.subclasses?.[w.subclassChoice] ? `<div class="lup-warning-box" style="margin-top:12px;"><span>ℹ️</span><div class="lup-warning-text">Subclass "${escHtml(w.subclassChoice)}" not found — showing base features only.</div></div>` : ''}
  `;
}

function luStepSpells(){
  const w = _luWizard;
  const slots = luGetSlots(w.className, w.newLevel);
  if(!slots) return `<p class="lup-step-desc">No spell slots for this class.</p>`;

  const warlockNote = w.className === 'warlock'
    ? `<div class="lup-warning-box" style="margin-bottom:14px;"><span>⚡</span><div class="lup-warning-text">Pact Magic — all slots are the same level and recover on a short rest.</div></div>` : '';

  const ordinals = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];
  const slotRows = slots.map((count, i) => {
    if(!count) return '';
    return `<tr>
      <td>${ordinals[i]||i+1+'th'}</td>
      <td><span class="lu-dm-slot-diamonds">${'◆'.repeat(Math.min(count,5))}${count>5?'+':''}</span><span class="lu-dm-slot-num">${count}</span></td>
    </tr>`;
  }).filter(Boolean).join('');

  return `
    <div class="lup-section-label">Spell Slots at Level ${w.newLevel}</div>
    ${warlockNote}
    <table class="lu-dm-spell-table">
      <thead><tr><th>Slot Level</th><th>Slots</th></tr></thead>
      <tbody>${slotRows}</tbody>
    </table>
    <div class="lup-warning-box" style="margin-top:14px;">
      <span>📖</span><div class="lup-warning-text">Remember to choose new spells from your class spell list where applicable.</div>
    </div>
  `;
}

function luStepSubclass(){
  const w = _luWizard;
  const classData = LU_CLASS_DATA[w.className];
  const options = classData ? Object.keys(classData.subclasses || {}) : [];

  if(options.length === 0){
    return `
      <div class="lup-section-label">Subclass Selection</div>
      <p class="lup-step-desc">No subclass data found for <strong>${escHtml(w.className)}</strong>. Note your choice manually.</p>
    `;
  }

  return `
    <div class="lup-section-label">Choose your ${escHtml(w.className)} Subclass</div>
    <div class="lup-subclass-list">
      ${options.map(name => {
        const selected = w.subclassChoice === name;
        const firstLevelFeatures = classData.subclasses[name]?.[LU_SUBCLASS_LEVEL[w.className]] || [];
        const preview = firstLevelFeatures[0] || '';
        const { name: fn, desc: fd } = preview ? _luParseFeature(preview) : { name:'', desc:'' };
        return `
          <div class="lup-subclass-option${selected?' lup-selected':''}" onclick="luSetSubclass('${escHtml(name).replace(/'/g,"\\'")}')">
            <div class="lup-radio-dot${selected?' lup-radio-checked':''}"></div>
            <div style="flex:1;">
              <div class="lup-subclass-name">${escHtml(name)}</div>
              ${fn ? `<div class="lup-subclass-preview">${escHtml(fn)}${fd ? ` — <em style="color:#4a3820;">${escHtml(fd.substring(0,80))}${fd.length>80?'…':''}</em>` : ''}</div>` : ''}
            </div>
            ${selected ? `<div style="color:#c9a84c;font-size:1.1rem;font-weight:700;flex-shrink:0;">✓</div>` : ''}
          </div>`;
      }).join('')}
    </div>
  `;
}

function luStepAsi(){
  const w = _luWizard;
  const stats = LU_STATS.map(s => {
    const val = parseInt(luGetField(w.charData, s)) || 10;
    return {key:s, name:LU_STAT_NAMES[s], val};
  });

  const statOpts1 = stats.map(s =>
    `<option value="${s.key}" ${w.asiStat1===s.key?'selected':''}>${s.name} (${s.val})</option>`
  ).join('');
  const statOpts2 = stats.map(s =>
    `<option value="${s.key}" ${w.asiStat2===s.key?'selected':''}>${s.name} (${s.val})</option>`
  ).join('');

  const featList = (typeof DND_FEAT_DATA !== 'undefined')
    ? DND_FEAT_DATA.getAll()
    : LU_FEATS.map(name => ({ name, prerequisite: null, desc: '' }));

  const featOptions = featList.map(f => {
    const prereq = f.prerequisite ? ` [Req: ${f.prerequisite}]` : '';
    return `<option value="${escHtml(f.name)}" ${w.featChoice===f.name?'selected':''}>${escHtml(f.name)}${escHtml(prereq)}</option>`;
  }).join('');

  return `
    <p class="lup-step-desc">Choose your Ability Score Improvement or Feat:</p>
    <div class="lup-asi-options">
      <div class="lup-asi-option${w.asiChoice==='plus2'?' lup-selected':''}" onclick="luSetAsi('plus2')">
        <div class="lup-radio-dot${w.asiChoice==='plus2'?' lup-radio-checked':''}"></div>
        <div class="lup-asi-body">
          <div class="lup-asi-title">+2 to One Stat</div>
          ${w.asiChoice === 'plus2' ? `
            <select class="lup-asi-select" id="lu-asi-stat1"
              onchange="event.stopPropagation(); _luWizard.asiStat1=this.value;">${statOpts1}</select>` : ''}
        </div>
      </div>
      <div class="lup-asi-option${w.asiChoice==='plus11'?' lup-selected':''}" onclick="luSetAsi('plus11')">
        <div class="lup-radio-dot${w.asiChoice==='plus11'?' lup-radio-checked':''}"></div>
        <div class="lup-asi-body">
          <div class="lup-asi-title">+1 to Two Stats</div>
          ${w.asiChoice === 'plus11' ? `
            <div class="lup-asi-pair">
              <select class="lup-asi-select" id="lu-asi-stat2a"
                onchange="event.stopPropagation(); _luWizard.asiStat1=this.value;">${statOpts1}</select>
              <select class="lup-asi-select" id="lu-asi-stat2b"
                onchange="event.stopPropagation(); _luWizard.asiStat2=this.value;">${statOpts2}</select>
            </div>` : ''}
        </div>
      </div>
      <div class="lup-asi-option${w.asiChoice==='feat'?' lup-selected':''}" onclick="luSetAsi('feat')">
        <div class="lup-radio-dot${w.asiChoice==='feat'?' lup-radio-checked':''}"></div>
        <div class="lup-asi-body">
          <div class="lup-asi-title">Take a Feat</div>
        </div>
      </div>
    </div>
    ${w.asiChoice === 'feat' ? `
      <div class="lu-asi-feat-picker">
        <select class="lup-asi-select" id="lu-asi-feat"
          onchange="event.stopPropagation(); luUpdateFeatDesc(this.value);">
          <option value="">— Choose feat —</option>
          ${featOptions}
        </select>
        <div id="lu-feat-desc-panel" class="lu-feat-desc${w.featChoice ? '' : ' lu-feat-desc-empty'}">
          ${w.featChoice && (typeof DND_FEAT_DATA !== 'undefined') && DND_FEAT_DATA[w.featChoice]
            ? `<div class="lu-feat-desc-name">${escHtml(DND_FEAT_DATA[w.featChoice].name)}</div>
               ${DND_FEAT_DATA[w.featChoice].prerequisite
                 ? `<div class="lu-feat-prereq">Prerequisite: ${escHtml(DND_FEAT_DATA[w.featChoice].prerequisite)}</div>`
                 : ''}
               <div class="lu-feat-desc-text">${escHtml(DND_FEAT_DATA[w.featChoice].desc)}</div>`
            : 'Select a feat to see its description.'
          }
        </div>
      </div>
    ` : ''}
  `;
}

function luStepSummary(){
  const w = _luWizard;
  const hd = LU_HIT_DIE[w.className]||8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const avg = Math.ceil(hd/2)+1;
  const hpGain = w.hpChoice==='roll' && w.hpRoll!==null ? w.hpRoll+conMod : avg+conMod;
  const profOld = LU_PROF_BONUS[w.currentLevel]||2;
  const profNew = LU_PROF_BONUS[w.newLevel]||2;
  const features = luGetFeatures(w.className, w.newLevel, w.subclassChoice);
  const steps = luDetermineSteps();
  const hasAsiStep = steps.includes(4);
  const hasSubclassStep = steps.includes(6);

  const asiWarning = hasAsiStep && !w.asiChoice
    ? `<div class="lup-warning-box" style="margin-bottom:10px;"><span>⚠️</span><div class="lup-warning-text">No ASI / Feat selected — go back to choose one.</div></div>` : '';
  const subclassWarning = hasSubclassStep && !w.subclassChoice
    ? `<div class="lup-warning-box" style="margin-bottom:10px;"><span>⚠️</span><div class="lup-warning-text">No subclass selected — go back to choose one.</div></div>` : '';

  const dmHC = w.dmHealthChoice || 'add';
  const items = [];
  items.push({ icon:'📈', text:`Level: <strong>${w.currentLevel} → ${w.newLevel}</strong>`, hl:true });
  const hpLabel = w.hpChoice==='average' ? 'average' : `rolled ${w.hpRoll}`;
  if (dmHC === 'full') {
    items.push({ icon:'❤️', text:`HP Max: <strong>+${hpGain}</strong> (${hpLabel}) · fully healed to new max`, hl:true });
  } else if (dmHC === 'add') {
    items.push({ icon:'❤️', text:`HP Max: <strong>+${hpGain}</strong> (${hpLabel}) · current HP also +${hpGain}`, hl:true });
  } else {
    items.push({ icon:'❤️', text:`HP Max: <strong>+${hpGain}</strong> (${hpLabel}) · current HP unchanged`, hl:true });
  }
  if (profNew > profOld) items.push({ icon:'🛡️', text:`Proficiency Bonus: <strong>+${profNew}</strong>`, hl:true });
  if (w.subclassChoice) items.push({ icon:'🎭', text:`Subclass: <strong>${escHtml(w.subclassChoice)}</strong>`, hl:true });

  features.filter(f => f !== 'No new features at this level.' && f !== 'No new class features at this level.').forEach(f => {
    const { name, desc } = _luParseFeature(f);
    items.push({ icon: _luFeatureIcon(name), text:`<strong>${escHtml(name)}</strong>${desc ? ` — ${escHtml(desc.substring(0,60))}${desc.length>60?'…':''}` : ''}`, hl:false });
  });

  if (w.asiChoice === 'plus2')  items.push({ icon:'⭐', text:`ASI: <strong>+2 ${LU_STAT_NAMES[w.asiStat1]}</strong>`, hl:true });
  else if (w.asiChoice === 'plus11') items.push({ icon:'⭐', text:`ASI: <strong>+1 ${LU_STAT_NAMES[w.asiStat1]}, +1 ${LU_STAT_NAMES[w.asiStat2]}</strong>`, hl:true });
  else if (w.asiChoice === 'feat' && w.featChoice) items.push({ icon:'⭐', text:`Feat: <strong>${escHtml(w.featChoice)}</strong>`, hl:true });

  return `
    <div class="lup-section-label">Review Changes</div>
    ${asiWarning}${subclassWarning}
    <div class="lup-summary-list">
      ${items.map(it => `<div class="lup-summary-item${it.hl?' lup-summary-highlight':''}">
        <div class="lup-summary-icon">${it.icon}</div>
        <div class="lup-summary-text">${it.text}</div>
      </div>`).join('')}
    </div>
    <div class="lup-warning-box" style="margin-top:14px;">
      <span>⚠️</span>
      <div class="lup-warning-text">Clicking "Apply Level Up" will update the character sheet in Firestore. This cannot be undone.</div>
    </div>
  `;
}

// ── INTERACTIONS ─────────────────────────────────────────────

function luNavStep(dir){
  const steps = luDetermineSteps();
  const w = _luWizard;
  const next = w.step + dir;
  if(next < 0 || next >= steps.length) return;

  if(steps[w.step] === 1 && dir === 1 && w.hpChoice === 'roll' && w.hpRoll === null){
    showToast('Please roll or enter a value before continuing.');
    return;
  }
  if(steps[w.step] === 4 && dir === 1 && !w.asiChoice){
    showToast('Please select an ASI / Feat option first.');
    return;
  }
  if(steps[w.step] === 6 && dir === 1 && !w.subclassChoice){
    showToast('Please select a subclass before continuing.');
    return;
  }

  w.step = next;
  renderLuModal();
}

function luSetHpChoice(val){
  _luWizard.hpChoice = val;
  if(val === 'average') _luWizard.hpRoll = null;
  renderLuModal();
}

function luRollHp(){
  const hd        = LU_HIT_DIE[_luWizard.className] || 8;
  const finalRoll = Math.floor(Math.random() * hd) + 1;
  const conMod    = luModifier(luGetField(_luWizard.charData, 'con'));

  const btn = document.getElementById('lu-roll-hp-btn');
  if (btn) { btn.disabled = true; btn.textContent = '…rolling…'; }

  luShowDiceAnimation(hd, finalRoll, () => {
    _luWizard.hpRoll   = finalRoll;
    _luWizard.hpChoice = 'roll';

    const display = document.getElementById('lu-hp-roll-display');
    if (display) {
      display.textContent = finalRoll;
      const manual = document.getElementById('lu-hp-manual-input');
      if (manual) manual.value = finalRoll;
      luPatchHpSummary();
      if (btn) { btn.disabled = false; btn.textContent = `🎲 Reroll d${hd}`; }
    } else {
      renderLuModal();
    }
  });
}

function luManualHpInput(input, hd) {
  const raw = parseInt(input.value);
  if (isNaN(raw)) return;

  const clamped          = Math.min(hd, Math.max(1, raw));
  _luWizard.hpRoll       = clamped;
  _luWizard.hpChoice     = 'roll';

  const display = document.getElementById('lu-hp-roll-display');
  if (display) {
    display.textContent = clamped;
    luPatchHpSummary();
  } else {
    renderLuModal();
  }
}

function luPatchHpSummary() {
  const w          = _luWizard;
  const hd         = LU_HIT_DIE[w.className] || 8;
  const conMod     = luModifier(luGetField(w.charData, 'con'));
  const conStr     = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const avg        = Math.ceil(hd / 2) + 1;
  const totalAvg   = avg + conMod;
  const totalRoll  = w.hpRoll !== null ? (w.hpRoll + conMod) : null;
  const currentMax = parseInt(luGetField(w.charData, 'maxhp') || 0);
  const newMax     = currentMax + (w.hpChoice === 'average' ? totalAvg : (totalRoll ?? 0));

  const summaryEl = document.querySelector('.lu-hp-summary-new');
  if (summaryEl) summaryEl.textContent = newMax;

  const rollValEl = document.getElementById('lu-hp-roll-val');
  if (rollValEl && w.hpRoll !== null) {
    rollValEl.innerHTML = `<span id="lu-hp-roll-display">${w.hpRoll}</span> ${conStr} = <strong>+${w.hpRoll + conMod} HP</strong>`;
  }
}

function luShowDiceAnimation(sides, finalResult, onComplete) {
  document.getElementById('lu-dice-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'lu-dice-overlay';
  overlay.innerHTML = `
    <div class="lu-dice-backdrop"></div>
    <div class="lu-dice-stage">
      <div class="lu-dice-label">d${sides}</div>
      <div class="lu-dice-face" id="lu-dice-face">?</div>
      <div class="lu-dice-result-label" id="lu-dice-result-label"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const face        = document.getElementById('lu-dice-face');
  const resultLabel = document.getElementById('lu-dice-result-label');
  luDiceStep(sides, finalResult, 0, 18, 10, onComplete, face, resultLabel);
}

function luDiceStep(sides, finalResult, tick, totalTicks, fastPhase, onComplete, face, resultLabel) {
  if (tick >= totalTicks) {
    face.textContent = finalResult;
    face.classList.remove('lu-dice-spinning');
    face.classList.add('lu-dice-landing');
    resultLabel.textContent = finalResult === sides
      ? '✨ Maximum roll!'
      : finalResult === 1
      ? '💀 Minimum...'
      : '';

    setTimeout(() => {
      const overlay = document.getElementById('lu-dice-overlay');
      if (overlay) {
        overlay.classList.add('lu-dice-fade-out');
        setTimeout(() => { overlay.remove(); onComplete(); }, 300);
      } else {
        onComplete();
      }
    }, 1200);
    return;
  }

  face.textContent = Math.floor(Math.random() * sides) + 1;
  face.classList.toggle('lu-dice-spinning', tick % 2 === 0);

  const delay = 55 + (tick >= fastPhase ? (tick - fastPhase) * 45 : 0);
  setTimeout(() => {
    luDiceStep(sides, finalResult, tick + 1, totalTicks, fastPhase, onComplete, face, resultLabel);
  }, delay);
}

function luSetAsi(val){
  if (_luWizard.asiChoice === val) return;
  if (val !== 'feat') _luWizard.featChoice = '';
  _luWizard.asiChoice = val;
  renderLuModal();
}

function luUpdateFeatDesc(featName) {
  _luWizard.featChoice = featName;
  const panel = document.getElementById('lu-feat-desc-panel');
  if (!panel) return;
  if (!featName || typeof DND_FEAT_DATA === 'undefined' || !DND_FEAT_DATA[featName]) {
    panel.className = 'lu-feat-desc lu-feat-desc-empty';
    panel.innerHTML = 'Select a feat to see its description.';
    return;
  }
  const f = DND_FEAT_DATA[featName];
  panel.className = 'lu-feat-desc';
  panel.innerHTML = `
    <div class="lu-feat-desc-name">${escHtml(f.name)}</div>
    ${f.prerequisite ? `<div class="lu-feat-prereq">Prerequisite: ${escHtml(f.prerequisite)}</div>` : ''}
    <div class="lu-feat-desc-text">${escHtml(f.desc)}</div>
  `;
}

function luSetSubclass(val){
  _luWizard.subclassChoice = val;
  renderLuModal();
}

function closeLuModal(){
  document.getElementById('lu-modal-overlay')?.remove();
}

// ── DM READ-ONLY REVIEW MODAL ─────────────────────────────────

function luDmHealthSection(){
  const w = _luWizard;
  const hd = LU_HIT_DIE[w.className] || 8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const avg = Math.ceil(hd / 2) + 1;
  const hpGain = avg + conMod;
  const fullHp = luCalculateCorrectHpMax(w.className, w.newLevel, conMod);
  const ch = w.dmHealthChoice || 'add';
  const opts = [
    { val:'full', icon:'💯', label:'Full Health',
      desc:`Player rolls d${hd} as normal — after levelling up their current HP is set to their new max (fully healed)` },
    { val:'add',  icon:'➕', label:'Add HP',
      desc:`Player rolls d${hd} as normal — both HP max and current HP increase by the roll (mid-combat level-up)` },
    { val:'keep', icon:'🩹', label:'Keep Current HP',
      desc:`Player rolls d${hd} as normal — HP max increases but current HP stays the same (character stays injured)` },
  ];
  return `
    <div class="lu-dm-health-section">
      <div class="lu-dm-health-title">❤️ Health on Level Up</div>
      <div class="lu-dm-health-options">
        ${opts.map(o => `
          <div class="lu-dm-health-option${ch===o.val?' lu-dm-health-selected':''}"
               onclick="luSetDmHealth('${o.val}')">
            <div class="lu-dm-health-icon">${o.icon}</div>
            <div>
              <div class="lu-dm-health-label">${o.label}</div>
              <div class="lu-dm-health-desc">${o.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function luSetDmHealth(val){
  _luWizard.dmHealthChoice = val;
  renderLuDMModal();
}

function renderLuDMModal(){
  const existing = document.getElementById('lu-modal-overlay');
  if (existing) existing.remove();
  const w = _luWizard;
  const charName = escHtml(luGetField(w.charData,'name') || 'Character');
  const overlay = document.createElement('div');
  overlay.id = 'lu-modal-overlay';
  overlay.innerHTML = `
    <div class="lu-dm-modal" role="dialog" aria-modal="true" aria-label="Level Up Review">
      <div class="lu-dm-header">
        <div class="lu-dm-eyebrow">DM Review</div>
        <div class="lu-dm-title">Level Up Review</div>
        <div class="lu-dm-subtitle">${charName} — ${escHtml(w.className||'Unknown')}</div>
        <button class="lu-dm-close" onclick="closeLuModal()" aria-label="Close">✕</button>
      </div>
      <div class="lu-dm-level-banner">
        <div class="lu-dm-level-block">
          <div class="lu-dm-level-num dm-old">${w.currentLevel}</div>
          <div class="lu-dm-level-label dm-old">Current</div>
        </div>
        <div class="lu-dm-level-arrow">→</div>
        <div class="lu-dm-level-block">
          <div class="lu-dm-level-num dm-new">${w.newLevel}</div>
          <div class="lu-dm-level-label dm-new">New Level</div>
        </div>
      </div>
      <div class="lu-dm-body">${luDMReviewBody()}</div>
      ${luDmHealthSection()}
      <div class="lu-dm-footer">
        <div class="lu-dm-footer-note">Player receives this offer and makes their own choices.</div>
        <button class="lu-dm-send-btn" id="lu-dm-send-btn" onclick="luSendLevelUp()">
          <span class="lu-dm-send-icon">📜</span>
          <span class="lu-dm-send-text">
            <span class="lu-dm-send-label">Send to Player</span>
            <span class="lu-dm-send-sub">${charName} will be notified</span>
          </span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function luDMReviewBody(){
  const w = _luWizard;
  const hd      = LU_HIT_DIE[w.className] || 8;
  const avg     = Math.ceil(hd / 2) + 1;
  const profOld = LU_PROF_BONUS[w.currentLevel] || 2;
  const profNew = LU_PROF_BONUS[w.newLevel] || 2;
  const features = luGetFeatures(w.className, w.newLevel, w.subclassChoice);
  const slots   = luGetSlots(w.className, w.newLevel);

  const realFeatures = features.filter(f =>
    f !== 'No new class features at this level.' && f !== 'No new features at this level.'
  );

  const featuresHtml = realFeatures.length
    ? realFeatures.map(f => {
        const { name, desc } = _luParseFeature(f);
        return `<div class="lu-dm-feature-item">
          <div class="lu-dm-feature-icon">${_luFeatureIcon(name)}</div>
          <div>
            <div class="lu-dm-feature-name">${escHtml(name)}</div>
            ${desc ? `<div class="lu-dm-feature-desc">${escHtml(desc)}</div>` : ''}
          </div>
        </div>`;
      }).join('')
    : `<div style="font-family:'Crimson Text',serif;font-style:italic;color:#4a3820;font-size:13px;">No new class features at this level.</div>`;

  const profSubText = profNew > profOld ? `now +${profNew}` : 'no change this level';

  const slotsHtml = slots ? (() => {
    const ordinals = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];
    const rows = slots.map((count, i) => {
      if (!count) return '';
      return `<tr>
        <td>${ordinals[i] || (i+1)+'th'}</td>
        <td><span class="lu-dm-slot-diamonds">${'◆'.repeat(Math.min(count,5))}${count>5?'+':''}</span><span class="lu-dm-slot-num">${count}</span></td>
      </tr>`;
    }).filter(Boolean).join('');
    return `<div class="lu-dm-section">
      <div class="lu-dm-section-label">Spell Slots at Level ${w.newLevel}</div>
      <table class="lu-dm-spell-table">
        <thead><tr><th>Slot Level</th><th>Slots</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  })() : '';

  const asiHtml = luIsAsiLevel(w.className, w.newLevel) ? `
    <div class="lu-dm-section">
      <div class="lu-dm-section-label">ASI / Feat</div>
      <div class="lu-dm-asi-block">
        <div class="lu-dm-asi-icon">⭐</div>
        <div>
          <div class="lu-dm-asi-title">Player will choose</div>
          <div class="lu-dm-asi-sub">+2 to one stat, +1 to two stats, or a feat</div>
        </div>
      </div>
    </div>` : '';

  const subclassHtml = luIsSubclassLevel(w.className, w.newLevel) ? `
    <div class="lu-dm-section">
      <div class="lu-dm-section-label">Subclass Selection</div>
      <div class="lu-dm-asi-block">
        <div class="lu-dm-asi-icon">🎭</div>
        <div>
          <div class="lu-dm-asi-title">Player will choose their archetype</div>
          <div class="lu-dm-asi-sub">${escHtml(w.className)} subclass selection at this level</div>
        </div>
      </div>
    </div>` : '';

  return `
    <div class="lu-dm-section">
      <div class="lu-dm-section-label">Stats</div>
      <div class="lu-dm-stats-grid">
        <div class="lu-dm-stat-card">
          <div class="lu-dm-stat-name">Hit Die</div>
          <div class="lu-dm-stat-value">d${hd}</div>
          <div class="lu-dm-stat-sub">avg +${avg}, max +${hd} (+CON mod)</div>
        </div>
        <div class="lu-dm-stat-card">
          <div class="lu-dm-stat-name">Proficiency Bonus</div>
          <div class="lu-dm-stat-value"><span class="dm-muted">+${profOld}</span> → <span class="dm-new-val">+${profNew}</span></div>
          <div class="lu-dm-stat-sub">${escHtml(profSubText)}</div>
        </div>
      </div>
    </div>

    <div class="lu-dm-section">
      <div class="lu-dm-section-label">New Features</div>
      <div class="lu-dm-features-list">${featuresHtml}</div>
    </div>

    ${slotsHtml}
    ${asiHtml}
    ${subclassHtml}
  `;
}

async function luSendLevelUp(){
  const w = _luWizard;
  const btn = document.getElementById('lu-dm-send-btn');
  if (btn){ btn.disabled = true; btn.style.opacity = '0.5'; btn.style.cursor = 'not-allowed'; }
  try {
    await db.collection('campaigns').doc(currentCampaignId)
      .collection('characters').doc(w.slot)
      .update({
        pendingLevelUp: {
          newLevel: w.newLevel,
          dmHealthChoice: w.dmHealthChoice || 'add',
          offeredAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
      });
    closeLuModal();
    showToast(`📨 Level up sent to ${luGetField(w.charData,'name')||'the player'}!`);
  } catch(e){
    console.error('Level up send error:', e);
    showToast('Error sending level up — check console.');
    if (btn){ btn.disabled = false; btn.style.opacity = ''; btn.style.cursor = ''; }
  }
}

// ── APPLY TO FIRESTORE ───────────────────────────────────────

async function luApplyLevelUp(){
  const w = _luWizard;
  const steps = luDetermineSteps();
  const hasAsiStep = steps.includes(4);
  const hasSubclassStep = steps.includes(6);

  if(hasAsiStep && !w.asiChoice){
    showToast('Please select an ASI / Feat before applying.');
    luNavStep(-1); return;
  }
  if(hasSubclassStep && !w.subclassChoice){
    showToast('Please select a subclass before applying.');
    luNavStep(-1); return;
  }

  const hd = LU_HIT_DIE[w.className]||8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const avg = Math.ceil(hd/2)+1;
  const currentMaxHp = parseInt(luGetField(w.charData,'maxhp')||0);
  const currentHp    = parseInt(luGetField(w.charData,'hp')||0);
  const profNew = LU_PROF_BONUS[w.newLevel]||2;
  const dmHC = w.dmHealthChoice || 'add';

  const updates = {
    'f-level':            String(w.newLevel),
    'f-proficiencybonus': String(profNew),
    'f-pb':               String(profNew),
  };

  const hpGain = w.hpChoice==='roll' && w.hpRoll!==null ? w.hpRoll + conMod : avg + conMod;
  const newMaxHp = currentMaxHp + hpGain;
  updates['f-maxhp'] = String(newMaxHp);

  if (dmHC === 'full') {
    // Roll for HP, then set current HP = new max (fully healed)
    updates['f-hp'] = String(newMaxHp);
  } else if (dmHC === 'add') {
    // Current HP increases by the same amount as max
    updates['f-hp'] = String(currentHp + hpGain);
  }
  // 'keep': f-maxhp updated above, f-hp intentionally not set (stays unchanged)

  // ASI stat bumps
  if(w.asiChoice === 'plus2'){
    const old = parseInt(luGetField(w.charData, w.asiStat1)||10);
    updates[`f-${w.asiStat1}`] = String(Math.min(20, old+2));
  } else if(w.asiChoice === 'plus11'){
    const old1 = parseInt(luGetField(w.charData, w.asiStat1)||10);
    const old2 = parseInt(luGetField(w.charData, w.asiStat2)||10);
    updates[`f-${w.asiStat1}`] = String(Math.min(20, old1+1));
    updates[`f-${w.asiStat2}`] = String(Math.min(20, old2+1));
  }

  // Feat
  if(w.asiChoice === 'feat' && w.featChoice){
    const existing = luGetField(w.charData,'feats') || luGetField(w.charData,'features') || '';
    const key = w.charData['f-feats'] !== undefined ? 'f-feats' : 'f-features';
    updates[key] = existing ? `${existing}\n${w.featChoice}` : w.featChoice;
  }

  // Subclass — write to f-subclass, f-archetype, or append to features
  if(w.subclassChoice){
    if(w.charData['f-subclass'] !== undefined){
      updates['f-subclass'] = w.subclassChoice;
    } else if(w.charData['f-archetype'] !== undefined){
      updates['f-archetype'] = w.subclassChoice;
    } else {
      const existingFeatures = luGetField(w.charData,'features') || luGetField(w.charData,'feats') || '';
      const key = w.charData['f-features'] !== undefined ? 'f-features' : 'f-feats';
      const line = `Subclass: ${w.subclassChoice}`;
      updates[key] = existingFeatures ? `${existingFeatures}\n${line}` : line;
    }
  }

  try {
    const btn = document.querySelector('.lu-btn-primary');
    if(btn){ btn.disabled = true; btn.textContent = 'Saving…'; }

    await db.collection('campaigns').doc(currentCampaignId)
      .collection('characters').doc(w.slot)
      .update({ ...updates, pendingLevelUp: firebase.firestore.FieldValue.delete() });

    document.getElementById('lu-offer-banner')?.remove();
    closeLuModal();
    showToast(`🎉 ${luGetField(w.charData,'name')||'Character'} is now level ${w.newLevel}!`);

    if(typeof loadPartyRoster === 'function') loadPartyRoster();
    if(typeof loadCharacterSheet === 'function') loadCharacterSheet(w.slot);
  } catch(err){
    console.error('Level up apply error:', err);
    showToast('Error saving level up — check console.');
    const btn = document.querySelector('.lu-btn-primary');
    if(btn){ btn.disabled = false; btn.textContent = '🎉 Apply Level Up'; }
  }
}

// ── INJECT STYLES ────────────────────────────────────────────

(function injectLuStyles(){
  if(document.getElementById('lu-styles')) return;
  const style = document.createElement('style');
  style.id = 'lu-styles';
  style.textContent = `
    #lu-modal-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,.75);
      display:flex; align-items:center; justify-content:center;
      z-index:9999; padding:16px; animation:luFadeIn .18s ease;
    }
    @keyframes luFadeIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }

    /* ─── PLAYER LEVEL-UP WIZARD ───────────────────────────────────── */
    .lup-modal {
      background:#0f0c07; border:1px solid #6b4f1a; border-radius:4px; overflow:hidden;
      box-shadow:0 0 0 1px #2a1f0a,0 30px 80px rgba(0,0,0,.9),inset 0 1px 0 rgba(201,168,76,.15);
      width:100%; max-width:520px; max-height:90vh; display:flex; flex-direction:column;
      font-family:'Crimson Text',Georgia,serif;
    }

    /* Header */
    .lup-header {
      background:linear-gradient(180deg,#1a1108 0%,#0f0c07 100%);
      border-bottom:1px solid #3a2c0e; padding:20px 24px 16px;
      position:relative; display:flex; align-items:center; gap:14px; flex-shrink:0;
    }
    .lup-header-icon { font-size:24px; filter:drop-shadow(0 0 6px rgba(201,168,76,.4)); }
    .lup-title { font-family:'Cinzel',serif; font-size:18px; font-weight:900; color:#f0d98a; letter-spacing:1px; line-height:1; text-shadow:0 0 30px rgba(201,168,76,.3); }
    .lup-subtitle { font-family:'Crimson Text',serif; font-style:italic; color:#6a5030; font-size:13px; margin-top:3px; }
    .lup-close { position:absolute; top:18px; right:20px; background:none; border:none; color:#3a2c0e; font-size:16px; cursor:pointer; transition:color .15s; }
    .lup-close:hover { color:#c9a84c; }

    /* Steps bar */
    .lup-steps { display:flex; align-items:center; padding:14px 24px; background:#0a0800; border-bottom:1px solid #1e1708; flex-shrink:0; }
    .lup-step-dot {
      width:30px; height:30px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-family:'Cinzel',serif; font-size:11px; font-weight:700;
      border:1px solid #2a2010; background:#13100a; color:#3a2c0e;
      flex-shrink:0; transition:all .2s;
    }
    .lup-step-dot.lup-done { background:#1a1608; border-color:#c9a84c; color:#c9a84c; font-size:13px; }
    .lup-step-dot.lup-active { background:linear-gradient(135deg,#c9a84c,#a8853e); border-color:#d4af37; color:#0a0800; box-shadow:0 0 16px rgba(201,168,76,.5); }
    .lup-step-line { flex:1; height:1px; background:#1e1708; }

    /* Body */
    .lup-body { padding:24px; overflow-y:auto; flex:1; }
    .lup-body::-webkit-scrollbar { width:4px; }
    .lup-body::-webkit-scrollbar-track { background:transparent; }
    .lup-body::-webkit-scrollbar-thumb { background:#2a1f0a; border-radius:2px; }

    .lup-step-desc { font-family:'Crimson Text',serif; font-size:15px; color:#7a6030; font-style:italic; margin-bottom:20px; line-height:1.4; }

    .lup-section-label { font-family:'Cinzel',serif; font-size:9px; letter-spacing:4px; text-transform:uppercase; color:#c9a84c; margin-bottom:14px; display:flex; align-items:center; gap:10px; }
    .lup-section-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,#3a2c0e,transparent); }

    /* Step 1 — Level banner */
    .lup-level-banner {
      background:linear-gradient(135deg,#1a0a00,#0a0800); border:1px solid #3a2c0e; border-radius:3px;
      padding:24px; display:flex; align-items:center; justify-content:center; gap:0;
      margin-bottom:16px; position:relative; overflow:hidden;
    }
    .lup-level-banner::before { content:'LEVEL UP'; position:absolute; font-family:'Cinzel',serif; font-size:60px; font-weight:900; color:rgba(201,168,76,.04); letter-spacing:6px; pointer-events:none; }
    .lup-level-block { text-align:center; padding:0 20px; }
    .lup-level-num { font-family:'Cinzel',serif; font-size:64px; font-weight:900; line-height:1; }
    .lup-lvl-old { color:#2a2010; }
    .lup-lvl-new { color:#f0d98a; text-shadow:0 0 30px rgba(240,217,138,.5),0 0 70px rgba(201,168,76,.25); animation:lupGlow 3s ease-in-out infinite; }
    @keyframes lupGlow {
      0%,100% { text-shadow:0 0 30px rgba(240,217,138,.4),0 0 70px rgba(201,168,76,.2); }
      50%      { text-shadow:0 0 55px rgba(240,217,138,.7),0 0 110px rgba(201,168,76,.4); }
    }
    .lup-level-label { font-family:'Cinzel',serif; font-size:8px; letter-spacing:3px; text-transform:uppercase; margin-top:4px; }
    .lup-lvl-old-label { color:#2a2010; }
    .lup-lvl-new-label { color:#8b6914; }
    .lup-level-arrow { font-size:24px; color:#c9a84c; opacity:.4; padding:0 6px; margin-bottom:18px; }

    /* Step 1 — Detail rows */
    .lup-detail-rows { display:flex; flex-direction:column; gap:6px; }
    .lup-detail-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:#13100a; border:1px solid #1e1708; border-radius:3px; }
    .lup-detail-label { font-family:'Cinzel',serif; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#4a3820; }
    .lup-detail-value { font-family:'Cinzel',serif; font-size:14px; font-weight:700; color:#d4af37; }
    .lup-muted { color:#2a2010; }

    /* Step 1 — ASI/Subclass badge */
    .lup-asi-badge { background:linear-gradient(135deg,#1a1000,#0f0c07); border:1px solid #c9a84c; border-radius:3px; padding:10px 14px; display:flex; align-items:center; gap:10px; margin-top:8px; }
    .lup-asi-badge-text { font-family:'Cinzel',serif; font-size:11px; font-weight:700; color:#f0d98a; letter-spacing:1px; }

    /* Step 2 — HP */
    .lup-hp-options { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
    .lup-hp-option { display:flex; align-items:flex-start; gap:14px; padding:14px 16px; background:#13100a; border:2px solid #2a2010; border-radius:3px; cursor:pointer; transition:all .15s; position:relative; }
    .lup-hp-option.lup-selected { border-color:#c9a84c; background:#1a1208; }
    .lup-hp-option.lup-selected::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,transparent); }
    .lup-radio-dot { width:18px; height:18px; border-radius:50%; border:2px solid #3a2c0e; flex-shrink:0; margin-top:2px; display:flex; align-items:center; justify-content:center; transition:all .15s; }
    .lup-radio-dot.lup-radio-checked { border-color:#c9a84c; background:#c9a84c; box-shadow:0 0 8px rgba(201,168,76,.4); }
    .lup-radio-dot.lup-radio-checked::after { content:''; width:6px; height:6px; border-radius:50%; background:#0a0800; display:block; }
    .lup-hp-title { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#d4af37; margin-bottom:4px; }
    .lup-hp-value { font-family:'Crimson Text',serif; font-size:15px; color:#f0d98a; font-weight:600; }
    .lup-hp-sub { font-family:'Crimson Text',serif; font-size:13px; color:#4a3820; font-style:italic; }
    .lup-hp-summary { display:flex; justify-content:space-between; padding:10px 14px; background:#0a0800; border:1px solid #1e1708; border-radius:3px; font-family:'Crimson Text',serif; font-size:14px; color:#6a5030; }
    .lup-hp-summary strong { color:#d4af37; }

    /* Step 3 — Features */
    .lup-features-list { display:flex; flex-direction:column; gap:0; }
    .lup-feature-item { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid #1a1408; }
    .lup-feature-item:last-child { border-bottom:none; }
    .lup-feature-icon { width:34px; height:34px; background:#13100a; border:1px solid #3a2c0e; border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
    .lup-feature-name { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#d4af37; margin-bottom:3px; }
    .lup-feature-desc { font-family:'Crimson Text',serif; font-size:13px; color:#5a4520; font-style:italic; line-height:1.4; }

    /* Step 4 — ASI */
    .lup-asi-options { display:flex; flex-direction:column; gap:10px; }
    .lup-asi-option { padding:14px 16px; background:#13100a; border:2px solid #2a2010; border-radius:3px; cursor:pointer; transition:all .15s; display:flex; align-items:flex-start; gap:14px; position:relative; }
    .lup-asi-option.lup-selected { border-color:#c9a84c; background:#1a1208; }
    .lup-asi-option.lup-selected::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,transparent); }
    .lup-asi-body { flex:1; }
    .lup-asi-title { font-family:'Cinzel',serif; font-size:12px; font-weight:700; color:#d4af37; margin-bottom:8px; letter-spacing:.5px; }
    .lup-asi-select { width:100%; background:#0a0800; border:1px solid #3a2c0e; color:#d4af37; font-family:'Cinzel',serif; font-size:12px; padding:8px 12px; border-radius:2px; appearance:none; cursor:pointer; }
    .lup-asi-select:focus { outline:none; border-color:#c9a84c; }
    .lup-asi-pair { display:flex; gap:8px; }
    .lup-asi-pair select { flex:1; }
    .lu-asi-feat-picker { padding:10px 14px 12px; background:rgba(0,0,0,.1); border-radius:0 0 6px 6px; border:2px solid #c9a84c; border-top:none; margin-top:-2px; }
    .lu-feat-desc {
      margin-top: 10px;
      padding: 10px 12px;
      background: rgba(0,0,0,0.15);
      border-radius: 6px;
      border-left: 2px solid rgba(201,168,76,0.35);
    }
    .lu-feat-desc-empty {
      color: rgba(245,230,200,0.4);
      font-style: italic;
      font-size: 12px;
    }
    .lu-feat-desc-name {
      font-family: 'Cinzel', serif;
      font-size: 12px;
      font-weight: 700;
      color: #c9a84c;
      margin-bottom: 4px;
    }
    .lu-feat-prereq {
      font-size: 11px;
      color: rgba(245,230,200,0.5);
      font-style: italic;
      margin-bottom: 6px;
    }
    .lu-feat-desc-text {
      font-family: 'Crimson Text', Georgia, serif;
      font-size: 13px;
      color: rgba(245,230,200,0.75);
      line-height: 1.5;
    }

    /* Subclass step */
    .lup-subclass-list { display:flex; flex-direction:column; gap:8px; }
    .lup-subclass-option { display:flex; align-items:flex-start; gap:12px; padding:12px 14px; background:#13100a; border:2px solid #2a2010; border-radius:3px; cursor:pointer; transition:all .15s; position:relative; }
    .lup-subclass-option.lup-selected { border-color:#c9a84c; background:#1a1208; }
    .lup-subclass-option.lup-selected::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,transparent); }
    .lup-subclass-name { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#d4af37; margin-bottom:3px; }
    .lup-subclass-preview { font-family:'Crimson Text',serif; font-size:12px; color:#5a4520; line-height:1.4; }

    /* Step 5 — Summary */
    .lup-summary-list { display:flex; flex-direction:column; gap:8px; margin-bottom:14px; }
    .lup-summary-item { display:flex; align-items:flex-start; gap:12px; padding:12px 14px; background:#13100a; border:1px solid #1e1708; border-left:3px solid #2a2010; border-radius:0 3px 3px 0; }
    .lup-summary-item.lup-summary-highlight { border-left-color:#c9a84c; }
    .lup-summary-icon { font-size:15px; flex-shrink:0; margin-top:1px; }
    .lup-summary-text { font-family:'Crimson Text',serif; font-size:15px; color:#a08040; line-height:1.3; }
    .lup-summary-text strong { color:#d4af37; font-weight:600; }

    /* Warning / info box */
    .lup-warning-box { background:#0f0c07; border:1px solid #2a2010; border-radius:3px; padding:12px 14px; display:flex; align-items:flex-start; gap:10px; }
    .lup-warning-text { font-family:'Crimson Text',serif; font-size:13px; color:#4a3820; font-style:italic; line-height:1.4; }

    /* Footer */
    .lup-footer { padding:16px 24px; background:#080601; border-top:1px solid #1e1708; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; }
    .lup-back-btn { background:none; border:1px solid #2a2010; color:#4a3820; font-family:'Cinzel',serif; font-size:10px; letter-spacing:2px; text-transform:uppercase; padding:10px 18px; cursor:pointer; border-radius:2px; transition:all .15s; }
    .lup-back-btn:hover { border-color:#6a5030; color:#8b6914; }
    .lup-next-btn {
      background:linear-gradient(135deg,#d4af37 0%,#c9a84c 40%,#a8853e 100%);
      border:none; color:#0a0800; font-family:'Cinzel',serif; font-size:11px; font-weight:700;
      letter-spacing:2px; text-transform:uppercase; padding:12px 24px;
      cursor:pointer; border-radius:2px; transition:all .2s;
      box-shadow:0 4px 16px rgba(201,168,76,.3),inset 0 1px 0 rgba(255,255,255,.2);
      position:relative; overflow:hidden;
    }
    .lup-next-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.12) 0%,transparent 60%); pointer-events:none; }
    .lup-next-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(201,168,76,.5),inset 0 1px 0 rgba(255,255,255,.25); filter:brightness(1.08); }
    .lup-next-btn:active { transform:translateY(0); }
    .lup-next-btn:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .lup-next-btn.lup-apply { font-size:10px; letter-spacing:1px; padding:12px 20px; }

    /* ─── DM REVIEW MODAL ─────────────────────────────────────────── */
    .lu-dm-modal {
      background:#0f0c07; border:1px solid #6b4f1a; border-radius:4px; overflow:hidden;
      box-shadow:0 0 0 1px #2a1f0a, 0 30px 80px rgba(0,0,0,.9), inset 0 1px 0 rgba(201,168,76,.15);
      width:100%; max-width:520px; max-height:90vh;
      display:flex; flex-direction:column;
      font-family:'Crimson Text',Georgia,serif;
    }
    .lu-dm-header {
      background:linear-gradient(180deg,#1a1108 0%,#0f0c07 100%);
      border-bottom:1px solid #3a2c0e; padding:22px 24px 18px; position:relative; flex-shrink:0;
    }
    .lu-dm-eyebrow {
      font-family:'Cinzel',serif; font-size:9px; letter-spacing:4px; text-transform:uppercase;
      color:#8b6914; margin-bottom:6px; display:flex; align-items:center; gap:8px;
    }
    .lu-dm-eyebrow::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,#3a2c0e,transparent); }
    .lu-dm-title {
      font-family:'Cinzel',serif; font-size:22px; font-weight:900; color:#f0d98a;
      letter-spacing:1px; line-height:1; text-shadow:0 0 40px rgba(201,168,76,.3);
    }
    .lu-dm-subtitle { font-family:'Crimson Text',serif; font-style:italic; color:#7a6030; font-size:14px; margin-top:4px; }
    .lu-dm-close {
      position:absolute; top:20px; right:20px; background:none; border:none;
      color:#4a3a1a; font-size:18px; cursor:pointer; transition:color .15s;
    }
    .lu-dm-close:hover { color:#c9a84c; }

    /* Level banner */
    .lu-dm-level-banner {
      background:linear-gradient(135deg,#1a0a00 0%,#0a0800 50%,#0d0500 100%);
      border-bottom:1px solid #3a2c0e; padding:28px 24px;
      display:flex; align-items:center; justify-content:center; gap:0;
      position:relative; overflow:hidden; flex-shrink:0;
    }
    .lu-dm-level-banner::before {
      content:'LEVEL UP'; position:absolute;
      font-family:'Cinzel',serif; font-size:80px; font-weight:900;
      color:rgba(201,168,76,.04); letter-spacing:8px; pointer-events:none; white-space:nowrap;
    }
    .lu-dm-level-block { text-align:center; padding:0 24px; }
    .lu-dm-level-num { font-family:'Cinzel',serif; font-size:72px; font-weight:900; line-height:1; }
    .lu-dm-level-num.dm-old { color:#3a2c0e; }
    .lu-dm-level-num.dm-new {
      color:#f0d98a;
      text-shadow:0 0 30px rgba(240,217,138,.4),0 0 80px rgba(201,168,76,.2);
      animation:luDmGlow 3s ease-in-out infinite;
    }
    @keyframes luDmGlow {
      0%,100% { text-shadow:0 0 30px rgba(240,217,138,.4),0 0 80px rgba(201,168,76,.2); }
      50%      { text-shadow:0 0 60px rgba(240,217,138,.7),0 0 120px rgba(201,168,76,.4); }
    }
    .lu-dm-level-label { font-family:'Cinzel',serif; font-size:9px; letter-spacing:3px; text-transform:uppercase; margin-top:4px; }
    .lu-dm-level-label.dm-old { color:#3a2c0e; }
    .lu-dm-level-label.dm-new { color:#8b6914; }
    .lu-dm-level-arrow { font-size:28px; color:#c9a84c; opacity:.5; padding:0 8px; margin-bottom:20px; }

    /* Body */
    .lu-dm-body { overflow-y:auto; flex:1; }
    .lu-dm-body::-webkit-scrollbar { width:4px; }
    .lu-dm-body::-webkit-scrollbar-track { background:transparent; }
    .lu-dm-body::-webkit-scrollbar-thumb { background:#2a1f0a; border-radius:2px; }

    .lu-dm-section { border-bottom:1px solid #1a1408; padding:20px 24px; }
    .lu-dm-section:last-child { border-bottom:none; }
    .lu-dm-section-label {
      font-family:'Cinzel',serif; font-size:9px; letter-spacing:4px; text-transform:uppercase;
      color:#c9a84c; margin-bottom:14px; display:flex; align-items:center; gap:10px;
    }
    .lu-dm-section-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,#3a2c0e 0%,transparent 100%); }

    /* Stats grid */
    .lu-dm-stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .lu-dm-stat-card {
      background:#13100a; border:1px solid #2a2010; border-radius:3px;
      padding:14px 16px; position:relative; overflow:hidden;
    }
    .lu-dm-stat-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,#c9a84c 0%,transparent 70%);
    }
    .lu-dm-stat-name { font-family:'Cinzel',serif; font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#5a4520; margin-bottom:6px; }
    .lu-dm-stat-value { font-family:'Cinzel',serif; font-size:16px; font-weight:700; color:#d4af37; }
    .lu-dm-stat-value .dm-muted { color:#3a2c0e; }
    .lu-dm-stat-value .dm-new-val { color:#f0d98a; }
    .lu-dm-stat-sub { font-family:'Crimson Text',serif; font-size:12px; color:#4a3820; margin-top:3px; font-style:italic; }

    /* Features */
    .lu-dm-features-list { display:flex; flex-direction:column; gap:0; }
    .lu-dm-feature-item { display:flex; align-items:flex-start; gap:14px; padding:12px 0; border-bottom:1px solid #1a1408; }
    .lu-dm-feature-item:last-child { border-bottom:none; }
    .lu-dm-feature-icon {
      width:34px; height:34px; background:#13100a; border:1px solid #3a2c0e; border-radius:3px;
      display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0;
    }
    .lu-dm-feature-name { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#d4af37; line-height:1.2; margin-bottom:3px; }
    .lu-dm-feature-desc { font-family:'Crimson Text',serif; font-size:13px; color:#6a5030; line-height:1.4; font-style:italic; }

    /* ASI / Subclass block */
    .lu-dm-asi-block { background:linear-gradient(135deg,#1a1000,#0f0c07); border:1px solid #3a2c0e; border-radius:3px; padding:16px; display:flex; align-items:center; gap:14px; }
    .lu-dm-asi-icon { font-size:28px; filter:drop-shadow(0 0 8px rgba(201,168,76,.5)); flex-shrink:0; }
    .lu-dm-asi-title { font-family:'Cinzel',serif; font-size:13px; font-weight:700; color:#f0d98a; margin-bottom:3px; }
    .lu-dm-asi-sub { font-family:'Crimson Text',serif; font-size:13px; color:#7a6030; font-style:italic; }

    /* Spell slots */
    .lu-dm-spell-table { width:100%; border-collapse:collapse; }
    .lu-dm-spell-table th {
      font-family:'Cinzel',serif; font-size:9px; letter-spacing:2px; text-transform:uppercase;
      color:#5a4520; text-align:left; padding:6px 0; border-bottom:1px solid #2a2010;
    }
    .lu-dm-spell-table td { padding:8px 0; color:#c9a84c; border-bottom:1px solid #1a1408; font-family:'Cinzel',serif; font-size:13px; }
    .lu-dm-spell-table tr:last-child td { border-bottom:none; }
    .lu-dm-slot-diamonds { letter-spacing:2px; color:#d4af37; }
    .lu-dm-slot-num { font-size:11px; color:#5a4520; margin-left:6px; }

    /* Health options (DM modal) */
    .lu-dm-health-section {
      padding:16px 24px; border-top:1px solid rgba(201,168,76,.12);
      background:rgba(0,0,0,.25); flex-shrink:0;
    }
    .lu-dm-health-title {
      font-family:'Cinzel',serif; font-size:9px; text-transform:uppercase;
      letter-spacing:3px; color:#8b6914; margin-bottom:10px;
    }
    .lu-dm-health-options { display:flex; flex-direction:column; gap:6px; }
    .lu-dm-health-option {
      display:flex; align-items:flex-start; gap:10px; padding:10px 12px;
      border:1px solid rgba(106,79,26,.4); border-radius:3px;
      cursor:pointer; transition:all .15s; background:rgba(255,255,255,.02);
    }
    .lu-dm-health-option:hover { border-color:rgba(201,168,76,.5); background:rgba(201,168,76,.05); }
    .lu-dm-health-selected { border-color:#c9a84c !important; background:rgba(201,168,76,.12) !important; }
    .lu-dm-health-icon { font-size:1.1rem; flex-shrink:0; margin-top:1px; }
    .lu-dm-health-label {
      font-family:'Cinzel',serif; font-size:10px; font-weight:700;
      color:#d4af37; margin-bottom:2px; letter-spacing:.5px;
    }
    .lu-dm-health-desc {
      font-family:'Crimson Text',serif; font-size:12px;
      color:rgba(212,175,55,.5); line-height:1.3;
    }

    /* Footer */
    .lu-dm-footer {
      padding:20px 24px; background:#080601; border-top:1px solid #1e1708;
      display:flex; align-items:center; justify-content:space-between; gap:16px; flex-shrink:0;
    }
    .lu-dm-footer-note { font-family:'Crimson Text',serif; font-style:italic; color:#3a2c0e; font-size:13px; line-height:1.4; }
    .lu-dm-send-btn {
      background:linear-gradient(135deg,#d4af37 0%,#c9a84c 40%,#a8853e 100%);
      border:none; color:#0a0800; font-family:'Cinzel',serif; cursor:pointer;
      border-radius:3px; position:relative; overflow:hidden; transition:all .2s;
      box-shadow:0 4px 20px rgba(201,168,76,.35),inset 0 1px 0 rgba(255,255,255,.2);
      display:flex; align-items:center; gap:12px; padding:12px 22px; flex-shrink:0;
    }
    .lu-dm-send-btn::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,255,255,.15) 0%,transparent 60%); pointer-events:none;
    }
    .lu-dm-send-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(201,168,76,.55),inset 0 1px 0 rgba(255,255,255,.25); filter:brightness(1.08); }
    .lu-dm-send-btn:active { transform:translateY(0); }
    .lu-dm-send-icon { font-size:18px; }
    .lu-dm-send-text { display:flex; flex-direction:column; align-items:flex-start; gap:2px; }
    .lu-dm-send-label { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; line-height:1; }
    .lu-dm-send-sub {
      font-family:'Crimson Text',serif; font-style:italic; font-size:11px;
      color:rgba(0,0,0,.45); font-weight:400; letter-spacing:0; text-transform:none;
    }

    /* LEVEL-UP OFFER BANNER (player side) */
    #lu-offer-banner { margin-bottom:16px; }
    .lu-offer-banner {
      background:linear-gradient(135deg,rgba(201,168,76,.18),rgba(201,168,76,.05));
      border:2px solid var(--gold,#c9a84c); border-radius:8px;
      padding:14px 18px; display:flex; align-items:center; gap:12px;
      font-family:'Cinzel',serif; font-size:.8rem; color:var(--gold-light,#e8c96c);
      animation:luPulse 2s ease-in-out infinite;
    }
    @keyframes luPulse {
      0%,100% { box-shadow:0 0 8px rgba(201,168,76,.3); }
      50%      { box-shadow:0 0 22px rgba(201,168,76,.55); }
    }
    .lu-offer-banner .lu-offer-text { flex:1; }
    .lu-offer-banner .lu-offer-btn {
      background:linear-gradient(135deg,var(--gold,#c9a84c),#a8853e);
      color:#1a1209; border:none; border-radius:6px; padding:7px 16px;
      font-family:'Cinzel',serif; font-size:.75rem; font-weight:600;
      cursor:pointer; white-space:nowrap; flex-shrink:0; letter-spacing:.04em;
    }
    .lu-offer-banner .lu-offer-btn:hover { filter:brightness(1.1); }

    /* ── DICE OVERLAY ── */
    #lu-dice-overlay { position:fixed; inset:0; z-index:10001; display:flex; align-items:center; justify-content:center; pointer-events:none; }
    .lu-dice-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.55); animation:luFadeIn .15s ease; }
    .lu-dice-stage { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; gap:12px; animation:luDiceAppear .15s ease; }
    @keyframes luDiceAppear { from{transform:scale(.5) translateY(30px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
    .lu-dice-label { font-family:'Cinzel',serif; font-size:14px; letter-spacing:4px; text-transform:uppercase; color:rgba(201,168,76,.6); }
    .lu-dice-face { width:120px; height:120px; background:linear-gradient(135deg,#1a1108,#0a0800); border:3px solid #c9a84c; border-radius:16px; display:flex; align-items:center; justify-content:center; font-family:'Cinzel',serif; font-size:64px; font-weight:900; color:#f0d98a; box-shadow:0 0 30px rgba(201,168,76,.3),inset 0 1px 0 rgba(201,168,76,.2); transition:transform .06s ease; }
    .lu-dice-face.lu-dice-spinning { transform:rotate(-8deg) scale(.95); color:rgba(240,217,138,.7); }
    .lu-dice-face.lu-dice-landing { animation:luDiceLand .3s ease forwards; color:#f0d98a; box-shadow:0 0 60px rgba(201,168,76,.6),inset 0 1px 0 rgba(201,168,76,.2); }
    @keyframes luDiceLand { 0%{transform:scale(1.3) rotate(3deg)} 40%{transform:scale(.9) rotate(-2deg)} 70%{transform:scale(1.1) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
    .lu-dice-result-label { font-family:'Cinzel',serif; font-size:13px; letter-spacing:2px; color:#c9a84c; min-height:20px; text-align:center; }
    .lu-dice-fade-out { animation:luDiceFadeOut .3s ease forwards; }
    @keyframes luDiceFadeOut { to{opacity:0;transform:scale(1.05)} }
  `;
  document.head.appendChild(style);
})();

console.log('[LevelUp Wizard] loaded — call openLevelUpWizard(slot) to open');
