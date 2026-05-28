// ============================================================
//  D&D 5e LEVEL-UP WIZARD
//  Drop this <script> into index.html just before </body>
//  Depends on: Firebase (db, firebase), escHtml(), currentCampaignId
// ============================================================

// ── RULES DATA ──────────────────────────────────────────────

const LU_PROF_BONUS = [0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

const LU_ASI_LEVELS = {
  fighter:   [4,6,8,12,14,16,19],
  rogue:     [4,8,10,12,16,19],
  default:   [4,8,12,16,19]
};

// Spell slots table [level][slotTier 1-9]
const LU_SPELL_SLOTS = {
  full: [ // Wizard, Sorcerer, Druid, Cleric, Bard
    null,
    [2,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],
    [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],
    [4,3,3,0,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],
    [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],
    [4,3,3,3,2,0,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,0,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1],
    [4,3,3,3,3,1,1,1,1],
    [4,3,3,3,3,2,1,1,1],
    [4,3,3,3,3,2,2,1,1],
  ],
  half: [ // Paladin, Ranger
    null,null,
    [2,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],
    [4,3,0,0,0,0,0,0,0],
    [4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],
    [4,3,3,0,0,0,0,0,0],
    [4,3,3,0,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],
    [4,3,3,2,0,0,0,0,0],
    [4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],
    [4,3,3,3,2,0,0,0,0],
    [4,3,3,3,2,0,0,0,0],
  ],
  warlock: [
    null,
    [1,0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0],
    [0,2,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0],
    [0,0,0,2,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0],
    [0,0,0,0,2,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],
    [0,0,0,0,4,0,0,0,0],
    [0,0,0,0,4,0,0,0,0],
    [0,0,0,0,4,0,0,0,0],
    [0,0,0,0,4,0,0,0,0],
  ]
};

const LU_CASTER_TYPE = {
  wizard:'full', sorcerer:'full', druid:'full', cleric:'full', bard:'full',
  paladin:'half', ranger:'half',
  warlock:'warlock',
  fighter:null, barbarian:null, monk:null, rogue:null,
  artificer:'half'
};

const LU_HIT_DIE = {
  barbarian:12, fighter:10, paladin:10, ranger:10,
  bard:8, cleric:8, druid:8, monk:8, rogue:8, warlock:8,
  artificer:8, sorcerer:6, wizard:6
};

// Class features by level
const LU_CLASS_FEATURES = {
  barbarian: {
    1:['Rage (2/rest, +2 dmg)','Unarmored Defense (AC = 10 + DEX mod + CON mod)'],
    2:['Reckless Attack','Danger Sense (Adv on DEX saves vs seen effects)'],
    3:['Primal Path subclass','Primal Knowledge'],
    4:['ASI / Feat'],
    5:['Extra Attack','Fast Movement (+10 ft speed, unarmored)'],
    6:['Path Feature','Rage uses: 4'],
    7:['Feral Instinct (Adv on Initiative; act on surprise if raging)'],
    8:['ASI / Feat'],
    9:['Brutal Critical (1 extra die on crit)'],
    10:['Path Feature'],
    11:['Relentless Rage (DC 10+5 per use CON save to stay at 1 HP when dropped)'],
    12:['ASI / Feat','Rage uses: 5'],
    13:['Brutal Critical (2 extra dice)'],
    14:['Path Feature'],
    15:['Persistent Rage (rage only ends early if unconscious or you choose)'],
    16:['ASI / Feat','Rage uses: 6'],
    17:['Brutal Critical (3 extra dice)'],
    18:['Indomitable Might (use STR score instead of roll for STR checks if lower)'],
    19:['ASI / Feat'],
    20:['Primal Champion (+4 STR, +4 CON)'],
  },
  bard: {
    1:['Bardic Inspiration (d6, CHA mod/rest)','Spellcasting'],
    2:['Jack of All Trades','Song of Rest (d6)'],
    3:['Bard College subclass','Expertise (2 skills)'],
    4:['ASI / Feat'],
    5:['Bardic Inspiration: d8','Font of Inspiration (regain on short rest)'],
    6:['Countercharm','College Feature'],
    7:['No new class feature'],
    8:['ASI / Feat'],
    9:['Song of Rest: d8'],
    10:['Bardic Inspiration: d10','Expertise (2 more skills)','Magical Secrets (2 spells from any class)'],
    11:['No new class feature'],
    12:['ASI / Feat'],
    13:['Song of Rest: d10'],
    14:['Magical Secrets (2 more spells)','College Feature'],
    15:['Bardic Inspiration: d12'],
    16:['ASI / Feat'],
    17:['Song of Rest: d12'],
    18:['Magical Secrets (2 more spells)'],
    19:['ASI / Feat'],
    20:['Superior Inspiration (regain 1 Bardic Inspiration on Initiative if 0)'],
  },
  cleric: {
    1:['Divine Domain subclass','Domain Spells','Spellcasting'],
    2:['Channel Divinity (1/rest)','Domain Feature'],
    3:['No new class feature'],
    4:['ASI / Feat'],
    5:['Destroy Undead (CR 1/2)'],
    6:['Channel Divinity (2/rest)','Domain Feature'],
    7:['No new class feature'],
    8:['ASI / Feat','Destroy Undead (CR 1)','Domain Feature'],
    9:['No new class feature'],
    10:['Divine Intervention (roll ≤ cleric level to succeed)'],
    11:['Destroy Undead (CR 2)'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Destroy Undead (CR 3)'],
    15:['No new class feature'],
    16:['ASI / Feat'],
    17:['Destroy Undead (CR 4)','Domain Feature'],
    18:['Channel Divinity (3/rest)'],
    19:['ASI / Feat'],
    20:['Divine Intervention (auto-success)'],
  },
  druid: {
    1:['Druidic language','Spellcasting'],
    2:['Wild Shape (CR 1/4 no swim/fly)','Druid Circle subclass'],
    3:['No new class feature'],
    4:['ASI / Feat','Wild Shape: CR 1/2 (no fly)','Cantrip Versatility'],
    5:['No new class feature'],
    6:['Circle Feature'],
    7:['No new class feature'],
    8:['ASI / Feat','Wild Shape: CR 1'],
    9:['No new class feature'],
    10:['Circle Feature'],
    11:['No new class feature'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Circle Feature'],
    15:['No new class feature'],
    16:['ASI / Feat'],
    17:['No new class feature'],
    18:['Timeless Body (age 10× slower)','Beast Spells (cast while Wild Shaped)'],
    19:['ASI / Feat'],
    20:['Archdruid (unlimited Wild Shape)'],
  },
  fighter: {
    1:['Fighting Style','Second Wind (1d10+level HP, 1/rest)'],
    2:['Action Surge (1/rest)'],
    3:['Martial Archetype subclass'],
    4:['ASI / Feat'],
    5:['Extra Attack (2 attacks)'],
    6:['ASI / Feat'],
    7:['Archetype Feature'],
    8:['ASI / Feat'],
    9:['Indomitable (reroll failed save, 1/rest)'],
    10:['Archetype Feature'],
    11:['Extra Attack (3 attacks)'],
    12:['ASI / Feat'],
    13:['Indomitable (2/rest)'],
    14:['ASI / Feat'],
    15:['Archetype Feature'],
    16:['ASI / Feat'],
    17:['Action Surge (2/rest)','Indomitable (3/rest)'],
    18:['Archetype Feature'],
    19:['ASI / Feat'],
    20:['Extra Attack (4 attacks)'],
  },
  monk: {
    1:['Unarmored Defense (AC = 10 + DEX + WIS)','Martial Arts (d4)'],
    2:['Ki (2 points)','Unarmored Movement (+10 ft)','Dedicated Weapon'],
    3:['Monastic Tradition subclass','Deflect Missiles','Ki-Fueled Attack'],
    4:['ASI / Feat','Slow Fall','Quickened Healing'],
    5:['Extra Attack','Stunning Strike','Martial Arts: d6'],
    6:['Ki-Empowered Strikes (count as magical)','Tradition Feature','Focused Aim'],
    7:['Evasion','Stillness of Mind'],
    8:['ASI / Feat','Unarmored Movement: +15 ft'],
    9:['Unarmored Movement: walk on liquids/vertical surfaces'],
    10:['Purity of Body (immune disease/poison)','Martial Arts: d8'],
    11:['Tradition Feature'],
    12:['ASI / Feat'],
    13:['Tongue of Sun and Moon'],
    14:['Diamond Soul (proficiency in all saves)','Unarmored Movement: +20 ft'],
    15:['Timeless Body','Martial Arts: d10'],
    16:['ASI / Feat'],
    17:['Tradition Feature'],
    18:['Empty Body (invisible + resist all damage 4 Ki; astral project 8 Ki)'],
    19:['ASI / Feat','Unarmored Movement: +25 ft'],
    20:['Perfect Self (regain 4 Ki on Initiative if 0)','Martial Arts: d12'],
  },
  paladin: {
    1:['Divine Sense','Lay on Hands (5×level HP pool)'],
    2:['Fighting Style','Spellcasting','Divine Smite'],
    3:['Divine Health (immune disease)','Sacred Oath subclass','Oath Spells'],
    4:['ASI / Feat'],
    5:['Extra Attack'],
    6:['Aura of Protection (CHA mod to saves, 10 ft)'],
    7:['Oath Feature'],
    8:['ASI / Feat'],
    9:['No new class feature'],
    10:['Aura of Courage (immune frightened, 10 ft)'],
    11:['Improved Divine Smite (+1d8 radiant on all melee hits)'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Cleansing Touch (end spell on creature using action, CHA mod/rest)'],
    15:['Oath Feature'],
    16:['ASI / Feat'],
    17:['Aura of Protection/Courage expand to 30 ft'],
    18:['Oath Feature'],
    19:['ASI / Feat'],
    20:['Oath Feature (Sacred Oath capstone)'],
  },
  ranger: {
    1:["Favored Enemy (2 creature types, adv on Survival to track)",'Natural Explorer (1 terrain)'],
    2:['Fighting Style','Spellcasting'],
    3:['Ranger Conclave subclass','Primeval Awareness'],
    4:['ASI / Feat'],
    5:['Extra Attack'],
    6:['Favored Enemy (3rd type)','Natural Explorer (2nd terrain)','Fleet of Foot'],
    7:['Conclave Feature','Hide in Plain Sight'],
    8:['ASI / Feat','Natural Explorer (3rd terrain)','Land\'s Stride (no difficult terrain from non-magical plants)'],
    9:['No new class feature'],
    10:['Hide in Plain Sight: no need for materials','Favored Enemy (4th type)','Natural Explorer (4th terrain)'],
    11:['Conclave Feature'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Vanish (Hide as bonus action, can\'t be tracked nonmagically)'],
    15:['Conclave Feature'],
    16:['ASI / Feat'],
    17:['No new class feature'],
    18:['Feral Senses (no disadv vs invisible in 30 ft)'],
    19:['ASI / Feat'],
    20:['Foe Slayer (+WIS mod to attack OR damage vs favored enemy 1/turn)'],
  },
  rogue: {
    1:['Expertise (2 skills)','Sneak Attack (1d6)','Thieves\' Cant'],
    2:['Cunning Action (Dash/Disengage/Hide as bonus action)'],
    3:['Roguish Archetype subclass','Sneak Attack: 2d6'],
    4:['ASI / Feat'],
    5:['Uncanny Dodge (reaction to halve attack damage)','Sneak Attack: 3d6'],
    6:['Expertise (2 more skills)','Sneak Attack: 3d6'],
    7:['Evasion','Sneak Attack: 4d6'],
    8:['ASI / Feat','Sneak Attack: 4d6'],
    9:['Archetype Feature','Sneak Attack: 5d6'],
    10:['ASI / Feat','Sneak Attack: 5d6'],
    11:['Reliable Talent (treat skill rolls <10 as 10)','Sneak Attack: 6d6'],
    12:['ASI / Feat','Sneak Attack: 6d6'],
    13:['Archetype Feature','Sneak Attack: 7d6'],
    14:['Blindsense (aware of hidden creatures in 10 ft)','Sneak Attack: 7d6'],
    15:['Slippery Mind (WIS save proficiency)','Sneak Attack: 8d6'],
    16:['ASI / Feat','Sneak Attack: 8d6'],
    17:['Archetype Feature','Sneak Attack: 9d6'],
    18:['Elusive (attackers never have advantage on you)','Sneak Attack: 9d6'],
    19:['ASI / Feat','Sneak Attack: 10d6'],
    20:['Stroke of Luck (turn miss into hit OR failed ability check into 20, 1/rest)','Sneak Attack: 10d6'],
  },
  sorcerer: {
    1:['Sorcerous Origin subclass','Spellcasting','Sorcery Points: 2'],
    2:['Font of Magic (Flexible Casting — convert spell slots ↔ sorcery points)'],
    3:['Metamagic (choose 2)'],
    4:['ASI / Feat','Sorcery Points: 4'],
    5:['Sorcery Points: 5'],
    6:['Origin Feature','Sorcery Points: 6'],
    7:['Sorcery Points: 7'],
    8:['ASI / Feat','Sorcery Points: 8'],
    9:['Sorcery Points: 9'],
    10:['Metamagic (choose 1 more)','Sorcery Points: 10'],
    11:['Sorcery Points: 11'],
    12:['ASI / Feat','Sorcery Points: 12'],
    13:['Sorcery Points: 13'],
    14:['Origin Feature','Sorcery Points: 14'],
    15:['Sorcery Points: 15'],
    16:['ASI / Feat','Metamagic (choose 1 more)','Sorcery Points: 16'],
    17:['Sorcery Points: 17'],
    18:['Origin Feature','Sorcery Points: 18'],
    19:['ASI / Feat','Sorcery Points: 19'],
    20:['Sorcerous Restoration (regain 4 sorcery points on short rest)','Sorcery Points: 20'],
  },
  warlock: {
    1:['Otherworldly Patron subclass','Pact Magic (1 slot, rest on short rest)','Eldritch Invocations: 1'],
    2:['Eldritch Invocations: 2'],
    3:['Pact Boon','Eldritch Invocations: 2'],
    4:['ASI / Feat','Eldritch Invocations: 2'],
    5:['Eldritch Invocations: 3'],
    6:['Patron Feature','Eldritch Invocations: 3'],
    7:['Eldritch Invocations: 4'],
    8:['ASI / Feat','Eldritch Invocations: 4'],
    9:['Eldritch Invocations: 5'],
    10:['Patron Feature','Eldritch Invocations: 5'],
    11:['Mystic Arcanum (6th level spell, 1/rest)','Eldritch Invocations: 5'],
    12:['ASI / Feat','Eldritch Invocations: 6'],
    13:['Mystic Arcanum (7th level spell, 1/rest)','Eldritch Invocations: 6'],
    14:['Patron Feature','Eldritch Invocations: 6'],
    15:['Mystic Arcanum (8th level spell, 1/rest)','Eldritch Invocations: 7'],
    16:['ASI / Feat','Eldritch Invocations: 7'],
    17:['Mystic Arcanum (9th level spell, 1/rest)','Eldritch Invocations: 7'],
    18:['Eldritch Invocations: 8'],
    19:['ASI / Feat','Eldritch Invocations: 8'],
    20:['Eldritch Master (1 min ritual to regain all pact magic slots, 1/rest)','Eldritch Invocations: 8'],
  },
  wizard: {
    1:['Spellcasting (spellbook, ritual casting)','Arcane Recovery (short rest: recover spell slots up to half wizard level)'],
    2:['Arcane Tradition subclass'],
    3:['No new class feature'],
    4:['ASI / Feat','Cantrip Formulas'],
    5:['No new class feature'],
    6:['Tradition Feature'],
    7:['No new class feature'],
    8:['ASI / Feat'],
    9:['No new class feature'],
    10:['Tradition Feature'],
    11:['No new class feature'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Tradition Feature'],
    15:['No new class feature'],
    16:['ASI / Feat'],
    17:['No new class feature'],
    18:['Spell Mastery (cast chosen 1st & 2nd level spells at will)'],
    19:['ASI / Feat'],
    20:['Signature Spells (2 prepared 3rd-level spells, always prepared, free 1/rest each)'],
  },
  artificer: {
    1:['Magical Tinkering','Spellcasting'],
    2:['Infuse Item (2 infusions known, 2 infused items)'],
    3:['Artificer Specialist subclass','The Right Tool for the Job'],
    4:['ASI / Feat'],
    5:['Artificer Specialist Feature'],
    6:['Tool Expertise (double prof bonus with tool proficiencies)'],
    7:['Flash of Genius (add INT mod to failed ability check or save, INT mod/rest)'],
    8:['ASI / Feat','Infuse Item: 4 infusions, 4 items'],
    9:['Artificer Specialist Feature'],
    10:['Magic Item Adept (attune to 4 magic items; craft uncommon items at half cost)'],
    11:['Spell-Storing Item'],
    12:['ASI / Feat'],
    13:['No new class feature'],
    14:['Magic Item Savant (attune to 5 magic items; ignore class/race/spell/level requirements)'],
    15:['Artificer Specialist Feature'],
    16:['ASI / Feat'],
    17:['No new class feature'],
    18:['Magic Item Master (attune to 6 magic items)'],
    19:['ASI / Feat'],
    20:['Soul of Artifice (+1 to all saves per attuned magic item; use reaction to drop to 1 HP instead of 0)'],
  },
};

const LU_STATS = ['str','dex','con','int','wis','cha'];
const LU_STAT_NAMES = {str:'Strength',dex:'Dexterity',con:'Constitution',int:'Intelligence',wis:'Wisdom',cha:'Charisma'};

// ── COMMON FEATS LIST ────────────────────────────────────────
const LU_FEATS = [
  'Alert','Athlete','Actor','Charger','Crossbow Expert','Defensive Duelist',
  'Dual Wielder','Dungeon Delver','Durable','Elemental Adept','Grappler',
  'Great Weapon Master','Healer','Heavily Armored','Heavy Armor Master',
  'Inspiring Leader','Keen Mind','Lightly Armored','Linguist','Lucky',
  'Mage Slayer','Magic Initiate','Martial Adept','Medium Armor Master',
  'Mobile','Moderately Armored','Mounted Combatant','Observant',
  'Polearm Master','Resilient','Ritual Caster','Savage Attacker',
  'Sentinel','Sharpshooter','Shield Master','Skilled','Skulker',
  'Spell Sniper','Tavern Brawler','Tough','War Caster','Weapon Master',
];

// ── WIZARD STATE ─────────────────────────────────────────────

let _luWizard = {
  open: false,
  slot: null,
  charData: null,
  className: '',
  currentLevel: 0,
  newLevel: 0,
  step: 0,          // 0=confirm 1=hp 2=features 3=spells 4=asi 5=summary
  totalSteps: 0,
  hpRoll: null,
  hpChoice: 'average', // 'average' | 'roll'
  asiChoice: null,   // 'plus2' | 'plus11' | 'feat'
  asiStat1: 'str',
  asiStat2: 'str',
  featChoice: '',
  changes: [],       // summary strings
};

// ── HELPERS ──────────────────────────────────────────────────

function luModifier(score){
  return Math.floor((parseInt(score)||10 - 10) / 2);
}

function luIsAsiLevel(cls, lvl){
  const key = (cls === 'fighter' || cls === 'rogue') ? cls : 'default';
  return (LU_ASI_LEVELS[key] || LU_ASI_LEVELS.default).includes(lvl);
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

function luDetermineSteps(){
  const w = _luWizard;
  // Always: confirm(0), hp(1), features(2)
  let steps = [0,1,2];
  if(luHasSpells(w.className)) steps.push(3); // spells
  if(luIsAsiLevel(w.className, w.newLevel)) steps.push(4); // asi
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
    const cls = (luGetField(data,'class') || '').toLowerCase().trim();
    const lvl = parseInt(luGetField(data,'level')) || 1;

    if (lvl >= 20){ showToast('Character is already max level (20)!'); return; }

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
  const stepLabels = ['Confirm','Hit Points','Features','Spell Slots','ASI / Feat','Summary'];
  const steps = luDetermineSteps();

  // Build step indicator (only show steps that exist)
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

  // Bind HP roll button
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
        ${luIsAsiLevel(w.className, w.newLevel) ? `<div class="lu-badge lu-badge-gold" style="margin-top:8px">⭐ ASI / Feat available at this level!</div>` : ''}
      </div>
    </div>
  `;
}

function luStepHp(){
  const w = _luWizard;
  const hd = LU_HIT_DIE[w.className] || 8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const conStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const avg = Math.ceil(hd / 2) + 1; // average = ceil(die/2) + 1 per 5e rules
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
              ? `<div class="lu-hp-option-val">${w.hpRoll} ${conStr} = <strong>+${totalRoll} HP</strong></div>`
              : `<div class="lu-hp-option-sub">Risk it for a higher result</div>`
            }
          </div>
        </label>
      </div>
      ${w.hpChoice === 'roll'
        ? `<button id="lu-roll-hp-btn" class="lu-btn lu-btn-roll">🎲 Roll d${hd}</button>`
        : ''}
      <div class="lu-hp-summary">
        <span>Current HP Max: <strong>${luGetField(w.charData,'maxhp')||'?'}</strong></span>
        <span>→ New HP Max: <strong>${parseInt(luGetField(w.charData,'maxhp')||0) + (w.hpChoice==='average' ? totalAvg : (totalRoll ?? '?'))}</strong></span>
      </div>
    </div>
  `;
}

function luStepFeatures(){
  const w = _luWizard;
  const features = LU_CLASS_FEATURES[w.className]?.[w.newLevel] || ['No new class features at this level.'];
  return `
    <div class="lu-step-features">
      <p class="lu-step-desc">New features gained at <strong>${escHtml(w.className||'')}</strong> level <strong>${w.newLevel}</strong>:</p>
      <ul class="lu-features-list">
        ${features.map(f => `<li class="lu-feature-item">
          <span class="lu-feature-bullet">⚡</span>
          <span>${escHtml(f)}</span>
        </li>`).join('')}
      </ul>
      ${w.className === '' || !LU_CLASS_FEATURES[w.className]
        ? `<div class="lu-warning">⚠️ Class "${escHtml(w.className)}" not recognised — check the character sheet class field matches a standard D&amp;D 5e class name.</div>`
        : ''}
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
  const features = LU_CLASS_FEATURES[w.className]?.[w.newLevel] || [];

  const lines = [
    `📈 Level: ${w.currentLevel} → ${w.newLevel}`,
    `❤️ HP Max: +${hpGain} (${w.hpChoice==='average'?'average':'rolled '+w.hpRoll})`,
    profNew > profOld ? `🛡️ Proficiency Bonus: +${profOld} → +${profNew}` : null,
    ...features.map(f => `⚡ ${f}`),
  ];

  if(w.asiChoice === 'plus2') lines.push(`⭐ ASI: +2 ${LU_STAT_NAMES[w.asiStat1]}`);
  else if(w.asiChoice === 'plus11') lines.push(`⭐ ASI: +1 ${LU_STAT_NAMES[w.asiStat1]}, +1 ${LU_STAT_NAMES[w.asiStat2]}`);
  else if(w.asiChoice === 'feat' && w.featChoice) lines.push(`⭐ Feat: ${w.featChoice}`);

  const steps = luDetermineSteps();
  const hasAsiStep = steps.includes(4);
  const asiWarning = hasAsiStep && !w.asiChoice
    ? `<div class="lu-warning">⚠️ No ASI / Feat selected. Go back to choose one.</div>` : '';

  return `
    <div class="lu-step-summary">
      <p class="lu-step-desc">Review your changes before applying:</p>
      ${asiWarning}
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

  // Validate ASI step before proceeding
  if(steps[w.step] === 4 && dir === 1 && !w.asiChoice){
    showToast('Please select an ASI / Feat option first.');
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
  _luWizard.hpRoll = Math.floor(Math.random()*hd)+1;
  _luWizard.hpChoice = 'roll';
  renderLuModal();
}

function luSetAsi(val){
  _luWizard.asiChoice = val;
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

  if(hasAsiStep && !w.asiChoice){
    showToast('Please select an ASI / Feat before applying.');
    luNavStep(-1); return;
  }

  const hd = LU_HIT_DIE[w.className]||8;
  const conMod = luModifier(luGetField(w.charData,'con'));
  const avg = Math.ceil(hd/2)+1;
  const hpGain = w.hpChoice==='roll' && w.hpRoll!==null
    ? w.hpRoll + conMod : avg + conMod;

  const currentMaxHp = parseInt(luGetField(w.charData,'maxhp')||0);
  const currentHp = parseInt(luGetField(w.charData,'hp')||0);
  const profNew = LU_PROF_BONUS[w.newLevel]||2;

  const updates = {
    'f-level': String(w.newLevel),
    'f-maxhp': String(currentMaxHp + hpGain),
    'f-hp': String(currentHp + hpGain),
    'f-proficiencybonus': String(profNew),
    'f-pb': String(profNew),
  };

  // Apply ASI stat bumps
  if(w.asiChoice === 'plus2'){
    const old = parseInt(luGetField(w.charData, w.asiStat1)||10);
    updates[`f-${w.asiStat1}`] = String(Math.min(20, old+2));
  } else if(w.asiChoice === 'plus11'){
    const old1 = parseInt(luGetField(w.charData, w.asiStat1)||10);
    const old2 = parseInt(luGetField(w.charData, w.asiStat2)||10);
    updates[`f-${w.asiStat1}`] = String(Math.min(20, old1+1));
    updates[`f-${w.asiStat2}`] = String(Math.min(20, old2+1));
  }
  // Feat is stored as a note (no dedicated field in existing schema)
  if(w.asiChoice === 'feat' && w.featChoice){
    const existing = luGetField(w.charData,'feats') || luGetField(w.charData,'features') || '';
    const key = w.charData['f-feats'] !== undefined ? 'f-feats' : 'f-features';
    updates[key] = existing ? `${existing}\n${w.featChoice}` : w.featChoice;
  }

  try {
    const btn = document.querySelector('.lu-btn-primary');
    if(btn){ btn.disabled = true; btn.textContent = 'Saving…'; }

    await db.collection('campaigns').doc(currentCampaignId)
      .collection('characters').doc(w.slot)
      .update(updates);

    closeLuModal();
    showToast(`🎉 ${luGetField(w.charData,'name')||'Character'} is now level ${w.newLevel}!`);

    // Refresh party display if function exists
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
    .lu-step-dot.lu-step-done {
      background:rgba(201,168,76,.3); color:var(--gold,#c9a84c);
    }
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

    /* CONFIRM STEP */
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

    /* HP STEP */
    .lu-hp-options { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; }
    .lu-hp-option { display:flex; align-items:flex-start; gap:12px; padding:12px; border-radius:8px; border:2px solid rgba(201,168,76,.2); cursor:pointer; transition:all .15s; }
    .lu-hp-option:hover { border-color:rgba(201,168,76,.4); background:rgba(201,168,76,.06); }
    .lu-hp-option input[type=radio] { margin-top:3px; accent-color:var(--gold,#c9a84c); }
    .lu-hp-selected { border-color:var(--gold,#c9a84c) !important; background:rgba(201,168,76,.1) !important; }
    .lu-hp-option-title { color:var(--gold,#c9a84c); font-weight:700; font-size:.95rem; margin-bottom:2px; }
    .lu-hp-option-val { color:var(--parchment,#f5e6c8); font-size:1rem; }
    .lu-hp-option-sub { color:var(--parchment,#f5e6c8); font-size:.8rem; opacity:.6; }
    .lu-hp-summary { display:flex; justify-content:space-between; padding:10px 12px; background:rgba(255,255,255,.05); border-radius:6px; margin-top:12px; color:var(--parchment,#f5e6c8); font-size:.9rem; }

    /* FEATURES STEP */
    .lu-features-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
    .lu-feature-item { display:flex; gap:10px; align-items:flex-start; padding:10px 12px; background:rgba(255,255,255,.04); border-radius:6px; border-left:3px solid var(--gold,#c9a84c); }
    .lu-feature-bullet { color:var(--gold,#c9a84c); flex-shrink:0; }
    .lu-feature-item span:last-child { color:var(--parchment,#f5e6c8); font-size:.95rem; line-height:1.4; }

    /* SPELLS STEP */
    .lu-spell-table { width:100%; border-collapse:collapse; }
    .lu-spell-table th { color:var(--gold,#c9a84c); font-family:'Cinzel',serif; font-size:.8rem; text-align:left; padding:8px 12px; border-bottom:1px solid rgba(201,168,76,.3); }
    .lu-spell-table td { padding:8px 12px; color:var(--parchment,#f5e6c8); border-bottom:1px solid rgba(255,255,255,.06); }
    .lu-slot-level { font-weight:700; }
    .lu-slot-count { font-size:1rem; letter-spacing:3px; }
    .lu-slot-num { font-size:.8rem; opacity:.6; margin-left:6px; }

    /* ASI STEP */
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

    /* SUMMARY STEP */
    .lu-summary-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; }
    .lu-summary-list li { padding:8px 12px; background:rgba(255,255,255,.04); border-radius:6px; color:var(--parchment,#f5e6c8); font-size:.95rem; }

    /* SHARED */
    .lu-info-box { background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.25); border-radius:6px; padding:10px 12px; color:var(--parchment,#f5e6c8); font-size:.875rem; line-height:1.5; }
    .lu-warning { background:rgba(200,100,50,.15); border:1px solid rgba(200,100,50,.3); border-radius:6px; padding:10px 12px; color:#e8b090; font-size:.875rem; margin-bottom:12px; }
  `;
  document.head.appendChild(style);
})();

console.log('[LevelUp Wizard] loaded — call openLevelUpWizard(slot) to open');
