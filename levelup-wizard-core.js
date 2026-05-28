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
  hpChoice: 'average', // 'average' | 'roll'
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
  let steps = [0,1,2]; // confirm, hp, features — always present
  if(luIsSubclassLevel(w.className, w.newLevel)) steps.push(6); // subclass picker
  if(luHasSpells(w.className)) steps.push(3);                   // spell slots
  if(luIsAsiLevel(w.className, w.newLevel)) steps.push(4);      // asi/feat
  steps.push(5); // summary always last
  w.totalSteps = steps.length;
  return steps;
}

// ── OPEN WIZARD ──────────────────────────────────────────────

async function openLevelUpWizard(slot){
  if (!currentCampaignId) return;
  try {
    const snap = await db.collection('campaigns').doc(currentCampaignId)
      .collection('characters').doc(slot).get();
    if (!snap.exists){ showToast('Character not found'); return; }
    const data = snap.data();

    // Strip trailing numbers from class field (e.g. "fighter 3" → "fighter")
    const cls = (luGetField(data,'class') || '').toLowerCase().trim().replace(/\s*\d+$/, '');
    const lvl = parseInt(luGetField(data,'level')) || 1;

    if (lvl >= 20){ showToast('Character is already max level (20)!'); return; }

    // Pre-populate subclass if already stored on the character sheet
    const existingSubclass = luGetField(data,'subclass') || luGetField(data,'archetype') || '';

    _luWizard = {
      open: true,
      slot,
      charData: data,
      className: cls,
      currentLevel: lvl,
      newLevel: lvl + 1,
      step: 0,
      hpRoll: null,
      hpChoice: 'average',
      asiChoice: null,
      asiStat1: 'str',
      asiStat2: 'str',
      featChoice: '',
      subclassChoice: existingSubclass,
      changes: [],
    };
    luDetermineSteps();
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
  const stepLabels = ['Confirm','Hit Points','Features','Spell Slots','ASI / Feat','Summary','Subclass'];
  const steps = luDetermineSteps();

  const stepIndicator = steps.map((s,i) => {
    const active = i === w.step ? 'lu-step-active' : (i < w.step ? 'lu-step-done' : '');
    return `<div class="lu-step-dot ${active}" title="${stepLabels[s]}">
      ${i < w.step ? '✓' : i+1}
    </div>`;
  }).join('<div class="lu-step-line"></div>');

  let bodyHtml = '';
  const currentStepIndex = steps[w.step];

  if(currentStepIndex === 0) bodyHtml = luStepConfirm();
  else if(currentStepIndex === 1) bodyHtml = luStepHp();
  else if(currentStepIndex === 2) bodyHtml = luStepFeatures();
  else if(currentStepIndex === 3) bodyHtml = luStepSpells();
  else if(currentStepIndex === 4) bodyHtml = luStepAsi();
  else if(currentStepIndex === 5) bodyHtml = luStepSummary();
  else if(currentStepIndex === 6) bodyHtml = luStepSubclass();

  const isLast = w.step === steps.length - 1;
  const isFirst = w.step === 0;

  const overlay = document.createElement('div');
  overlay.id = 'lu-modal-overlay';
  overlay.innerHTML = `
    <div class="lu-modal" role="dialog" aria-modal="true" aria-label="Level Up Wizard">
      <div class="lu-header">
        <div class="lu-title-row">
          <span class="lu-title-icon">⚔️</span>
          <div>
            <div class="lu-title">Level Up Wizard</div>
            <div class="lu-subtitle">${escHtml(luGetField(w.charData,'name') || 'Character')} — ${escHtml(w.className||'Unknown Class')}</div>
          </div>
          <button class="lu-close-btn" onclick="closeLuModal()" aria-label="Close">✕</button>
        </div>
        <div class="lu-steps">${stepIndicator}</div>
      </div>
      <div class="lu-body">${bodyHtml}</div>
      <div class="lu-footer">
        ${!isFirst ? `<button class="lu-btn lu-btn-ghost" onclick="luNavStep(-1)">← Back</button>` : `<div></div>`}
        <button class="lu-btn lu-btn-primary" onclick="${isLast ? 'luApplyLevelUp()' : 'luNavStep(1)'}">
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
  const profChange = profNew > profOld
    ? `<span class="lu-badge lu-badge-green">+1 Proficiency Bonus (now +${profNew})</span>` : '';
  const classData = LU_CLASS_DATA[w.className];

  return `
    <div class="lu-step-confirm">
      <div class="lu-level-display">
        <div class="lu-level-box lu-level-old">
          <div class="lu-level-num">${w.currentLevel}</div>
          <div class="lu-level-label">Current Level</div>
        </div>
        <div class="lu-level-arrow">→</div>
        <div class="lu-level-box lu-level-new">
          <div class="lu-level-num">${w.newLevel}</div>
          <div class="lu-level-label">New Level</div>
        </div>
      </div>
      <div class="lu-confirm-details">
        <div class="lu-detail-row">
          <span class="lu-detail-label">Class</span>
          <span class="lu-detail-val">${escHtml(w.className||'Unknown')}</span>
        </div>
        <div class="lu-detail-row">
          <span class="lu-detail-label">Proficiency Bonus</span>
          <span class="lu-detail-val">+${profOld} → +${profNew} ${profChange}</span>
        </div>
        <div class="lu-detail-row">
          <span class="lu-detail-label">Hit Die</span>
          <span class="lu-detail-val">d${LU_HIT_DIE[w.className]||8}</span>
        </div>
        ${!classData ? `<div class="lu-warning">⚠️ Class data not found for "${escHtml(w.className)}" — features won't display.</div>` : ''}
        ${luIsAsiLevel(w.className, w.newLevel) ? `<div class="lu-badge lu-badge-gold" style="margin-top:8px">⭐ ASI / Feat available at this level!</div>` : ''}
        ${luIsSubclassLevel(w.className, w.newLevel) ? `<div class="lu-badge lu-badge-gold" style="margin-top:8px">🎭 Subclass selection at this level!</div>` : ''}
      </div>
    </div>
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

  return `
    <div class="lu-step-hp">
      <p class="lu-step-desc">Roll your hit die or take the average HP increase.</p>
      <div class="lu-hp-options">
        <label class="lu-hp-option ${w.hpChoice==='average'?'lu-hp-selected':''}">
          <input type="radio" name="lu-hp" value="average" onchange="luSetHpChoice('average')"
            ${w.hpChoice==='average'?'checked':''}>
          <div class="lu-hp-option-body">
            <div class="lu-hp-option-title">Take Average</div>
            <div class="lu-hp-option-val">${avg} ${conStr} = <strong>+${totalAvg} HP</strong></div>
            <div class="lu-hp-option-sub">Consistent, reliable choice</div>
          </div>
        </label>
        <label class="lu-hp-option ${w.hpChoice==='roll'?'lu-hp-selected':''}">
          <input type="radio" name="lu-hp" value="roll" onchange="luSetHpChoice('roll')"
            ${w.hpChoice==='roll'?'checked':''}>
          <div class="lu-hp-option-body">
            <div class="lu-hp-option-title">Roll d${hd}</div>
            ${w.hpRoll !== null
              ? `<div class="lu-hp-option-val"><span id="lu-hp-roll-display">${w.hpRoll}</span> ${conStr} = <strong>+${totalRoll} HP</strong></div>`
              : `<div class="lu-hp-option-sub">Risk it for a higher result</div>`
            }
          </div>
        </label>
      </div>
      ${w.hpChoice === 'roll' ? `
        <button id="lu-roll-hp-btn" class="lu-btn lu-btn-roll">🎲 Roll d${hd}</button>
        <div class="lu-hp-manual-row">
          <span class="lu-hp-manual-label">Or enter result manually:</span>
          <input type="number" class="lu-hp-manual-input" min="1" max="${hd}"
            placeholder="1–${hd}" value="${w.hpRoll !== null ? w.hpRoll : ''}"
            onchange="_luWizard.hpRoll = Math.min(${hd}, Math.max(1, parseInt(this.value)||1)); _luWizard.hpChoice='roll'; renderLuModal();">
        </div>
      ` : ''}
      <div class="lu-hp-summary">
        <span>Current HP Max: <strong>${luGetField(w.charData,'maxhp')||'?'}</strong></span>
        <span>→ New HP Max: <strong>${parseInt(luGetField(w.charData,'maxhp')||0) + (w.hpChoice==='average' ? totalAvg : (totalRoll ?? '?'))}</strong></span>
      </div>
    </div>
  `;
}

function luStepFeatures(){
  const w = _luWizard;
  const features = luGetFeatures(w.className, w.newLevel, w.subclassChoice);
  const classData = LU_CLASS_DATA[w.className];

  return `
    <div class="lu-step-features">
      <p class="lu-step-desc">
        New features at <strong>${escHtml(w.className||'')}</strong> level <strong>${w.newLevel}</strong>
        ${w.subclassChoice ? `— <em>${escHtml(w.subclassChoice)}</em>` : ''}:
      </p>
      <ul class="lu-features-list">
        ${features.map(f => `<li class="lu-feature-item">
          <span class="lu-feature-bullet">⚡</span>
          <span>${escHtml(f)}</span>
        </li>`).join('')}
      </ul>
      ${!classData ? `<div class="lu-warning">⚠️ Class "${escHtml(w.className)}" not recognised — check that the character sheet class field matches a standard D&amp;D 5e class name exactly.</div>` : ''}
      ${classData && w.subclassChoice && !classData.subclasses?.[w.subclassChoice] ? `<div class="lu-info-box">ℹ️ Subclass "${escHtml(w.subclassChoice)}" not found in data — showing base class features only.</div>` : ''}
    </div>
  `;
}

function luStepSpells(){
  const w = _luWizard;
  const slots = luGetSlots(w.className, w.newLevel);
  if(!slots) return `<div class="lu-step-spells"><p>No spell slots for this class.</p></div>`;

  const warlockNote = w.className === 'warlock'
    ? `<div class="lu-info-box">⚡ Warlock uses Pact Magic — all slots are the same level and recover on a short rest.</div>`
    : '';

  const slotRows = slots.map((count, i) => {
    if(count === 0) return '';
    return `<tr>
      <td class="lu-slot-level">${i+1}${['st','nd','rd','th','th','th','th','th','th'][i]}</td>
      <td class="lu-slot-count">${'◆'.repeat(count)}<span class="lu-slot-num">${count}</span></td>
    </tr>`;
  }).filter(Boolean).join('');

  return `
    <div class="lu-step-spells">
      <p class="lu-step-desc">Your spell slot table at level <strong>${w.newLevel}</strong>:</p>
      ${warlockNote}
      <table class="lu-spell-table">
        <thead><tr><th>Slot Level</th><th>Slots</th></tr></thead>
        <tbody>${slotRows}</tbody>
      </table>
      <div class="lu-info-box" style="margin-top:12px">📖 Remember to choose new spells from your class spell list where applicable.</div>
    </div>
  `;
}

function luStepSubclass(){
  const w = _luWizard;
  const classData = LU_CLASS_DATA[w.className];
  const options = classData ? Object.keys(classData.subclasses || {}) : [];

  if(options.length === 0){
    return `<div class="lu-step-subclass">
      <p class="lu-step-desc">No subclass data found for <strong>${escHtml(w.className)}</strong>. Note your choice manually.</p>
    </div>`;
  }

  return `
    <div class="lu-step-subclass">
      <p class="lu-step-desc">Choose your <strong>${escHtml(w.className)}</strong> subclass archetype:</p>
      <div class="lu-subclass-list">
        ${options.map(name => {
          const selected = w.subclassChoice === name;
          // Show the level 3 (or subclass level) description from subclasses data
          const firstLevelFeatures = classData.subclasses[name]?.[LU_SUBCLASS_LEVEL[w.className]] || [];
          const preview = firstLevelFeatures[0] || '';
          return `
            <label class="lu-subclass-option ${selected ? 'lu-subclass-selected' : ''}">
              <input type="radio" name="lu-subclass" value="${escHtml(name)}"
                onchange="luSetSubclass('${escHtml(name).replace(/'/g,"\\'")}')">
              <div class="lu-subclass-body">
                <div class="lu-subclass-name">${escHtml(name)}</div>
                ${preview ? `<div class="lu-subclass-desc">${escHtml(preview)}</div>` : ''}
              </div>
              ${selected ? '<div class="lu-subclass-check">✓</div>' : ''}
            </label>`;
        }).join('')}
      </div>
    </div>
  `;
}

function luStepAsi(){
  const w = _luWizard;
  const stats = LU_STATS.map(s => {
    const val = parseInt(luGetField(w.charData, s)) || 10;
    return {key:s, name:LU_STAT_NAMES[s], val};
  });

  const statOptions = stats.map(s =>
    `<option value="${s.key}">${s.name} (${s.val})</option>`
  ).join('');

  const featOptions = LU_FEATS.map(f =>
    `<option value="${escHtml(f)}" ${w.featChoice===f?'selected':''}>${escHtml(f)}</option>`
  ).join('');

  return `
    <div class="lu-step-asi">
      <p class="lu-step-desc">Choose your Ability Score Improvement or Feat:</p>
      <div class="lu-asi-options">
        <label class="lu-asi-option ${w.asiChoice==='plus2'?'lu-asi-selected':''}">
          <input type="radio" name="lu-asi" value="plus2" onchange="luSetAsi('plus2')" ${w.asiChoice==='plus2'?'checked':''}>
          <div class="lu-asi-body">
            <div class="lu-asi-title">+2 to One Stat</div>
            <select class="lu-stat-select" id="lu-asi-stat1" onchange="_luWizard.asiStat1=this.value">
              ${statOptions}
            </select>
          </div>
        </label>
        <label class="lu-asi-option ${w.asiChoice==='plus11'?'lu-asi-selected':''}">
          <input type="radio" name="lu-asi" value="plus11" onchange="luSetAsi('plus11')" ${w.asiChoice==='plus11'?'checked':''}>
          <div class="lu-asi-body">
            <div class="lu-asi-title">+1 to Two Stats</div>
            <div class="lu-stat-pair">
              <select class="lu-stat-select" id="lu-asi-stat2a" onchange="_luWizard.asiStat1=this.value">${statOptions}</select>
              <select class="lu-stat-select" id="lu-asi-stat2b" onchange="_luWizard.asiStat2=this.value">${statOptions}</select>
            </div>
          </div>
        </label>
        <label class="lu-asi-option ${w.asiChoice==='feat'?'lu-asi-selected':''}">
          <input type="radio" name="lu-asi" value="feat" onchange="luSetAsi('feat')" ${w.asiChoice==='feat'?'checked':''}>
          <div class="lu-asi-body">
            <div class="lu-asi-title">Take a Feat</div>
            <select class="lu-stat-select" id="lu-asi-feat" onchange="_luWizard.featChoice=this.value">
              <option value="">— Choose feat —</option>
              ${featOptions}
            </select>
          </div>
        </label>
      </div>
    </div>
  `;
}

function luStepSummary(){
  const w = _luWizard;
  const hd = LU_HIT_DIE[w.className]||8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const avg = Math.ceil(hd/2)+1;
  const hpGain = w.hpChoice==='roll' && w.hpRoll!==null
    ? w.hpRoll + conMod
    : avg + conMod;
  const profOld = LU_PROF_BONUS[w.currentLevel]||2;
  const profNew = LU_PROF_BONUS[w.newLevel]||2;
  const features = luGetFeatures(w.className, w.newLevel, w.subclassChoice);

  const lines = [
    `📈 Level: ${w.currentLevel} → ${w.newLevel}`,
    `❤️ HP Max: +${hpGain} (${w.hpChoice==='average'?'average':'rolled '+w.hpRoll})`,
    profNew > profOld ? `🛡️ Proficiency Bonus: +${profOld} → +${profNew}` : null,
    w.subclassChoice ? `🎭 Subclass: ${w.subclassChoice}` : null,
    ...features.filter(f => f !== 'No new features at this level.').map(f => `⚡ ${f}`),
  ];

  if(w.asiChoice === 'plus2') lines.push(`⭐ ASI: +2 ${LU_STAT_NAMES[w.asiStat1]}`);
  else if(w.asiChoice === 'plus11') lines.push(`⭐ ASI: +1 ${LU_STAT_NAMES[w.asiStat1]}, +1 ${LU_STAT_NAMES[w.asiStat2]}`);
  else if(w.asiChoice === 'feat' && w.featChoice) lines.push(`⭐ Feat: ${w.featChoice}`);

  const steps = luDetermineSteps();
  const hasAsiStep = steps.includes(4);
  const hasSubclassStep = steps.includes(6);
  const asiWarning = hasAsiStep && !w.asiChoice
    ? `<div class="lu-warning">⚠️ No ASI / Feat selected. Go back to choose one.</div>` : '';
  const subclassWarning = hasSubclassStep && !w.subclassChoice
    ? `<div class="lu-warning">⚠️ No subclass selected. Go back to choose one.</div>` : '';

  return `
    <div class="lu-step-summary">
      <p class="lu-step-desc">Review your changes before applying:</p>
      ${asiWarning}
      ${subclassWarning}
      <ul class="lu-summary-list">
        ${lines.filter(Boolean).map(l => `<li>${escHtml(l)}</li>`).join('')}
      </ul>
      <div class="lu-info-box" style="margin-top:12px">✅ Clicking "Apply Level Up" will update the character sheet in Firestore. This cannot be undone.</div>
    </div>
  `;
}

// ── INTERACTIONS ─────────────────────────────────────────────

function luNavStep(dir){
  const steps = luDetermineSteps();
  const w = _luWizard;
  const next = w.step + dir;
  if(next < 0 || next >= steps.length) return;

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
  const hd = LU_HIT_DIE[_luWizard.className]||8;
  const finalRoll = Math.floor(Math.random()*hd)+1;

  // Animate flickering numbers for ~1 second before settling
  let ticks = 0;
  const maxTicks = 14;
  const display = document.getElementById('lu-hp-roll-display');

  const interval = setInterval(() => {
    ticks++;
    const fakeRoll = Math.floor(Math.random()*hd)+1;
    if(display) display.textContent = fakeRoll;

    if(ticks >= maxTicks){
      clearInterval(interval);
      _luWizard.hpRoll = finalRoll;
      _luWizard.hpChoice = 'roll';
      renderLuModal();
    }
  }, 75);
}

function luSetAsi(val){
  _luWizard.asiChoice = val;
  renderLuModal();
}

function luSetSubclass(val){
  _luWizard.subclassChoice = val;
  renderLuModal();
}

function closeLuModal(){
  document.getElementById('lu-modal-overlay')?.remove();
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
  const hpGain = w.hpChoice==='roll' && w.hpRoll!==null
    ? w.hpRoll + conMod : avg + conMod;

  const currentMaxHp = parseInt(luGetField(w.charData,'maxhp')||0);
  const currentHp    = parseInt(luGetField(w.charData,'hp')||0);
  const profNew = LU_PROF_BONUS[w.newLevel]||2;

  const updates = {
    'f-level':           String(w.newLevel),
    'f-maxhp':           String(currentMaxHp + hpGain),
    'f-hp':              String(currentHp + hpGain),
    'f-proficiencybonus': String(profNew),
    'f-pb':              String(profNew),
  };

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
      .update(updates);

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

    .lu-modal {
      background: var(--parchment-dark, #1a1209);
      border: 2px solid var(--gold, #c9a84c);
      border-radius:12px; width:100%; max-width:520px;
      max-height:90vh; overflow:hidden;
      display:flex; flex-direction:column;
      font-family:'Crimson Text', Georgia, serif;
      box-shadow: 0 20px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(201,168,76,.3);
    }

    .lu-header {
      background: linear-gradient(135deg, rgba(201,168,76,.15), transparent);
      border-bottom: 1px solid var(--border, rgba(201,168,76,.3));
      padding:16px 20px 12px;
    }
    .lu-title-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
    .lu-title-icon { font-size:1.6rem; }
    .lu-title { font-family:'Cinzel',serif; color:var(--gold,#c9a84c); font-size:1.1rem; font-weight:700; }
    .lu-subtitle { color:var(--parchment,#f5e6c8); font-size:.9rem; opacity:.8; }
    .lu-close-btn {
      margin-left:auto; background:none; border:none;
      color:var(--parchment,#f5e6c8); font-size:1.1rem; cursor:pointer;
      opacity:.6; padding:4px 8px; border-radius:4px;
    }
    .lu-close-btn:hover { opacity:1; background:rgba(255,255,255,.1); }

    .lu-steps { display:flex; align-items:center; gap:0; }
    .lu-step-dot {
      width:28px; height:28px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
      font-size:.75rem; font-weight:700; font-family:'Cinzel',serif;
      background:rgba(201,168,76,.15); color:var(--parchment,#f5e6c8);
      border:1px solid rgba(201,168,76,.3); transition:all .2s; flex-shrink:0;
    }
    .lu-step-dot.lu-step-active {
      background:var(--gold,#c9a84c); color:#1a1209;
      box-shadow: 0 0 12px rgba(201,168,76,.5);
    }
    .lu-step-dot.lu-step-done { background:rgba(201,168,76,.3); color:var(--gold,#c9a84c); }
    .lu-step-line { flex:1; height:1px; background:rgba(201,168,76,.25); }

    .lu-body { flex:1; overflow-y:auto; padding:20px; }
    .lu-body::-webkit-scrollbar { width:6px; }
    .lu-body::-webkit-scrollbar-track { background:transparent; }
    .lu-body::-webkit-scrollbar-thumb { background:rgba(201,168,76,.3); border-radius:3px; }

    .lu-footer {
      padding:12px 20px; border-top:1px solid var(--border,rgba(201,168,76,.3));
      display:flex; justify-content:space-between; align-items:center;
      background:rgba(0,0,0,.2);
    }

    .lu-btn {
      padding:8px 20px; border-radius:6px; border:none; cursor:pointer;
      font-family:'Cinzel',serif; font-size:.85rem; font-weight:600;
      transition:all .15s; letter-spacing:.05em;
    }
    .lu-btn-primary {
      background: linear-gradient(135deg, var(--gold,#c9a84c), #a8853e);
      color:#1a1209; box-shadow: 0 2px 8px rgba(201,168,76,.3);
    }
    .lu-btn-primary:hover { filter:brightness(1.1); transform:translateY(-1px); }
    .lu-btn-primary:disabled { opacity:.5; cursor:not-allowed; transform:none; }
    .lu-btn-ghost { background:transparent; color:var(--parchment,#f5e6c8); border:1px solid rgba(201,168,76,.3); }
    .lu-btn-ghost:hover { background:rgba(201,168,76,.1); }
    .lu-btn-roll {
      background:linear-gradient(135deg,#8b3a3a,#6b2e2e);
      color:var(--parchment,#f5e6c8); border:1px solid rgba(201,168,76,.4);
      width:100%; margin-top:12px; padding:10px;
    }
    .lu-btn-roll:hover { filter:brightness(1.15); }

    .lu-step-desc { color:var(--parchment,#f5e6c8); margin:0 0 16px; opacity:.85; font-size:1rem; }

    /* CONFIRM */
    .lu-level-display { display:flex; align-items:center; justify-content:center; gap:20px; margin-bottom:20px; }
    .lu-level-box { text-align:center; padding:16px 24px; border-radius:8px; border:1px solid rgba(201,168,76,.3); }
    .lu-level-old { background:rgba(255,255,255,.04); }
    .lu-level-new { background:rgba(201,168,76,.12); border-color:var(--gold,#c9a84c); }
    .lu-level-num { font-family:'Cinzel',serif; font-size:2.5rem; font-weight:700; color:var(--gold,#c9a84c); line-height:1; }
    .lu-level-label { color:var(--parchment,#f5e6c8); font-size:.8rem; opacity:.7; margin-top:4px; }
    .lu-level-arrow { font-size:2rem; color:var(--gold,#c9a84c); opacity:.6; }
    .lu-confirm-details { display:flex; flex-direction:column; gap:8px; }
    .lu-detail-row { display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:rgba(255,255,255,.04); border-radius:4px; }
    .lu-detail-label { color:var(--parchment,#f5e6c8); opacity:.65; font-size:.9rem; }
    .lu-detail-val { color:var(--parchment,#f5e6c8); font-weight:600; }
    .lu-badge { display:inline-block; padding:4px 10px; border-radius:20px; font-size:.8rem; font-weight:600; }
    .lu-badge-green { background:rgba(80,200,80,.2); color:#6fdb6f; border:1px solid rgba(80,200,80,.3); }
    .lu-badge-gold { background:rgba(201,168,76,.2); color:var(--gold,#c9a84c); border:1px solid rgba(201,168,76,.3); }

    /* HP */
    .lu-hp-options { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; }
    .lu-hp-option { display:flex; align-items:flex-start; gap:12px; padding:12px; border-radius:8px; border:2px solid rgba(201,168,76,.2); cursor:pointer; transition:all .15s; }
    .lu-hp-option:hover { border-color:rgba(201,168,76,.4); background:rgba(201,168,76,.06); }
    .lu-hp-option input[type=radio] { margin-top:3px; accent-color:var(--gold,#c9a84c); }
    .lu-hp-selected { border-color:var(--gold,#c9a84c) !important; background:rgba(201,168,76,.1) !important; }
    .lu-hp-option-title { color:var(--gold,#c9a84c); font-weight:700; font-size:.95rem; margin-bottom:2px; }
    .lu-hp-option-val { color:var(--parchment,#f5e6c8); font-size:1rem; }
    .lu-hp-option-sub { color:var(--parchment,#f5e6c8); font-size:.8rem; opacity:.6; }
    .lu-hp-manual-row { display:flex; align-items:center; gap:10px; margin-top:8px; }
    .lu-hp-manual-label { color:var(--parchment,#f5e6c8); font-size:.85rem; opacity:.7; }
    .lu-hp-manual-input { width:70px; background:rgba(0,0,0,.4); color:var(--parchment,#f5e6c8); border:1px solid rgba(201,168,76,.3); border-radius:4px; padding:4px 8px; font-size:.9rem; text-align:center; }
    .lu-hp-summary { display:flex; justify-content:space-between; padding:10px 12px; background:rgba(255,255,255,.05); border-radius:6px; margin-top:12px; color:var(--parchment,#f5e6c8); font-size:.9rem; }

    /* FEATURES */
    .lu-features-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
    .lu-feature-item { display:flex; gap:10px; align-items:flex-start; padding:10px 12px; background:rgba(255,255,255,.04); border-radius:6px; border-left:3px solid var(--gold,#c9a84c); }
    .lu-feature-bullet { color:var(--gold,#c9a84c); flex-shrink:0; }
    .lu-feature-item span:last-child { color:var(--parchment,#f5e6c8); font-size:.95rem; line-height:1.4; }

    /* SPELLS */
    .lu-spell-table { width:100%; border-collapse:collapse; }
    .lu-spell-table th { color:var(--gold,#c9a84c); font-family:'Cinzel',serif; font-size:.8rem; text-align:left; padding:8px 12px; border-bottom:1px solid rgba(201,168,76,.3); }
    .lu-spell-table td { padding:8px 12px; color:var(--parchment,#f5e6c8); border-bottom:1px solid rgba(255,255,255,.06); }
    .lu-slot-level { font-weight:700; }
    .lu-slot-count { font-size:1rem; letter-spacing:3px; }
    .lu-slot-num { font-size:.8rem; opacity:.6; margin-left:6px; }

    /* ASI */
    .lu-asi-options { display:flex; flex-direction:column; gap:10px; }
    .lu-asi-option { display:flex; align-items:flex-start; gap:12px; padding:12px; border-radius:8px; border:2px solid rgba(201,168,76,.2); cursor:pointer; transition:all .15s; }
    .lu-asi-option:hover { border-color:rgba(201,168,76,.4); }
    .lu-asi-option input { margin-top:3px; accent-color:var(--gold,#c9a84c); }
    .lu-asi-selected { border-color:var(--gold,#c9a84c) !important; background:rgba(201,168,76,.1) !important; }
    .lu-asi-title { color:var(--gold,#c9a84c); font-weight:700; font-size:.95rem; margin-bottom:6px; }
    .lu-asi-body { flex:1; }
    .lu-stat-select { background:rgba(0,0,0,.4); color:var(--parchment,#f5e6c8); border:1px solid rgba(201,168,76,.3); border-radius:4px; padding:4px 8px; font-size:.9rem; width:100%; margin-top:4px; }
    .lu-stat-pair { display:flex; gap:8px; }
    .lu-stat-pair select { flex:1; }

    /* SUBCLASS */
    .lu-subclass-list { display:flex; flex-direction:column; gap:8px; }
    .lu-subclass-option { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border-radius:8px; border:2px solid rgba(201,168,76,.2); cursor:pointer; transition:all .15s; position:relative; }
    .lu-subclass-option:hover { border-color:rgba(201,168,76,.5); background:rgba(201,168,76,.06); }
    .lu-subclass-selected { border-color:var(--gold,#c9a84c) !important; background:rgba(201,168,76,.12) !important; }
    .lu-subclass-option input[type=radio] { position:absolute; opacity:0; pointer-events:none; }
    .lu-subclass-body { flex:1; }
    .lu-subclass-name { color:var(--gold,#c9a84c); font-weight:700; font-size:.95rem; margin-bottom:4px; font-family:'Cinzel',serif; }
    .lu-subclass-desc { color:var(--parchment,#f5e6c8); font-size:.875rem; line-height:1.5; opacity:.85; }
    .lu-subclass-check { color:var(--gold,#c9a84c); font-size:1.1rem; font-weight:700; flex-shrink:0; align-self:center; }

    /* SUMMARY */
    .lu-summary-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
    .lu-summary-list li { padding:8px 12px; background:rgba(255,255,255,.04); border-radius:6px; color:var(--parchment,#f5e6c8); font-size:.95rem; }

    /* SHARED */
    .lu-info-box { background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.25); border-radius:6px; padding:10px 12px; color:var(--parchment,#f5e6c8); font-size:.875rem; line-height:1.5; }
    .lu-warning { background:rgba(200,100,50,.15); border:1px solid rgba(200,100,50,.3); border-radius:6px; padding:10px 12px; color:#e8b090; font-size:.875rem; margin-bottom:12px; }
  `;
  document.head.appendChild(style);
})();

console.log('[LevelUp Wizard] loaded — call openLevelUpWizard(slot) to open');
