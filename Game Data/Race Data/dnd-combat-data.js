// ============================================================
//  D&D 5e COMBAT DATA
//  Weapons, spell attacks, conditions, buffs, racial abilities
//  Used by the combat tracker and character sheet panels
// ============================================================

const DND_COMBAT_DATA = {};

// ============================================================
//  WEAPON ATTACKS
// ============================================================

DND_COMBAT_DATA.weapons = {

  // ── SIMPLE MELEE ────────────────────────────────────────
  club:           { name:'Club',           type:'simple melee',  reach:5,  damageDice:'1d4',  damageType:'bludgeoning', attackMod:'str',         properties:['light'],                     notes:'' },
  dagger:         { name:'Dagger',         type:'simple melee',  reach:5,  damageDice:'1d4',  damageType:'piercing',    attackMod:'str_or_dex',  properties:['finesse','light','thrown'],   range:'20/60',   notes:'' },
  greatclub:      { name:'Greatclub',      type:'simple melee',  reach:5,  damageDice:'1d8',  damageType:'bludgeoning', attackMod:'str',         properties:['two-handed'],                notes:'' },
  handaxe:        { name:'Handaxe',        type:'simple melee',  reach:5,  damageDice:'1d6',  damageType:'slashing',    attackMod:'str',         properties:['light','thrown'],            range:'20/60',   notes:'' },
  javelin:        { name:'Javelin',        type:'simple melee',  reach:5,  damageDice:'1d6',  damageType:'piercing',    attackMod:'str',         properties:['thrown'],                    range:'30/120',  notes:'' },
  lightHammer:    { name:'Light Hammer',   type:'simple melee',  reach:5,  damageDice:'1d4',  damageType:'bludgeoning', attackMod:'str',         properties:['light','thrown'],            range:'20/60',   notes:'' },
  mace:           { name:'Mace',           type:'simple melee',  reach:5,  damageDice:'1d6',  damageType:'bludgeoning', attackMod:'str',         properties:[],                            notes:'' },
  quarterstaff:   { name:'Quarterstaff',   type:'simple melee',  reach:5,  damageDice:'1d6',  damageType:'bludgeoning', attackMod:'str',         properties:['versatile'],                 versatileDice:'1d8', notes:'' },
  sickle:         { name:'Sickle',         type:'simple melee',  reach:5,  damageDice:'1d4',  damageType:'slashing',    attackMod:'str',         properties:['light'],                     notes:'' },
  spear:          { name:'Spear',          type:'simple melee',  reach:5,  damageDice:'1d6',  damageType:'piercing',    attackMod:'str',         properties:['thrown','versatile'],        range:'20/60',   versatileDice:'1d8', notes:'' },

  // ── SIMPLE RANGED ────────────────────────────────────────
  crossbowLight:  { name:'Crossbow, Light',type:'simple ranged', range:'80/320',  damageDice:'1d8',  damageType:'piercing',    attackMod:'dex', properties:['ammunition','loading','two-handed'], notes:'' },
  dart:           { name:'Dart',           type:'simple ranged', range:'20/60',   damageDice:'1d4',  damageType:'piercing',    attackMod:'str_or_dex', properties:['finesse','thrown'],   notes:'' },
  shortbow:       { name:'Shortbow',       type:'simple ranged', range:'80/320',  damageDice:'1d6',  damageType:'piercing',    attackMod:'dex', properties:['ammunition','two-handed'], notes:'' },
  sling:          { name:'Sling',          type:'simple ranged', range:'30/120',  damageDice:'1d4',  damageType:'bludgeoning', attackMod:'dex', properties:['ammunition'],             notes:'' },

  // ── MARTIAL MELEE ────────────────────────────────────────
  battleaxe:      { name:'Battleaxe',      type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'slashing',    attackMod:'str',         properties:['versatile'],                 versatileDice:'1d10', notes:'' },
  flail:          { name:'Flail',          type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'bludgeoning', attackMod:'str',         properties:[],                            notes:'' },
  glaive:         { name:'Glaive',         type:'martial melee', reach:10, damageDice:'1d10', damageType:'slashing',    attackMod:'str',         properties:['heavy','reach','two-handed'], notes:'' },
  greataxe:       { name:'Greataxe',       type:'martial melee', reach:5,  damageDice:'1d12', damageType:'slashing',    attackMod:'str',         properties:['heavy','two-handed'],        notes:'' },
  greatsword:     { name:'Greatsword',     type:'martial melee', reach:5,  damageDice:'2d6',  damageType:'slashing',    attackMod:'str',         properties:['heavy','two-handed'],        notes:'' },
  halberd:        { name:'Halberd',        type:'martial melee', reach:10, damageDice:'1d10', damageType:'slashing',    attackMod:'str',         properties:['heavy','reach','two-handed'], notes:'' },
  lance:          { name:'Lance',          type:'martial melee', reach:10, damageDice:'1d12', damageType:'piercing',    attackMod:'str',         properties:['reach','special'],           notes:'Disadvantage on attack rolls against adjacent targets; requires one hand while mounted' },
  longsword:      { name:'Longsword',      type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'slashing',    attackMod:'str',         properties:['versatile'],                 versatileDice:'1d10', notes:'' },
  maul:           { name:'Maul',           type:'martial melee', reach:5,  damageDice:'2d6',  damageType:'bludgeoning', attackMod:'str',         properties:['heavy','two-handed'],        notes:'' },
  morningstar:    { name:'Morningstar',    type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'piercing',    attackMod:'str',         properties:[],                            notes:'' },
  pike:           { name:'Pike',           type:'martial melee', reach:10, damageDice:'1d10', damageType:'piercing',    attackMod:'str',         properties:['heavy','reach','two-handed'], notes:'' },
  rapier:         { name:'Rapier',         type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'piercing',    attackMod:'str_or_dex',  properties:['finesse'],                   notes:'' },
  scimitar:       { name:'Scimitar',       type:'martial melee', reach:5,  damageDice:'1d6',  damageType:'slashing',    attackMod:'str_or_dex',  properties:['finesse','light'],           notes:'' },
  shortsword:     { name:'Shortsword',     type:'martial melee', reach:5,  damageDice:'1d6',  damageType:'piercing',    attackMod:'str_or_dex',  properties:['finesse','light'],           notes:'' },
  trident:        { name:'Trident',        type:'martial melee', reach:5,  damageDice:'1d6',  damageType:'piercing',    attackMod:'str',         properties:['thrown','versatile'],        range:'20/60',   versatileDice:'1d8', notes:'' },
  warPick:        { name:'War Pick',       type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'piercing',    attackMod:'str',         properties:[],                            notes:'' },
  warhammer:      { name:'Warhammer',      type:'martial melee', reach:5,  damageDice:'1d8',  damageType:'bludgeoning', attackMod:'str',         properties:['versatile'],                 versatileDice:'1d10', notes:'' },
  whip:           { name:'Whip',           type:'martial melee', reach:10, damageDice:'1d4',  damageType:'slashing',    attackMod:'str_or_dex',  properties:['finesse','reach'],           notes:'' },

  // ── MARTIAL RANGED ───────────────────────────────────────
  blowgun:        { name:'Blowgun',        type:'martial ranged', range:'25/100',   damageDice:'1',    damageType:'piercing',    attackMod:'dex', properties:['ammunition','loading'], notes:'1 piercing damage (no dice)' },
  crossbowHand:   { name:'Crossbow, Hand', type:'martial ranged', range:'30/120',   damageDice:'1d6',  damageType:'piercing',    attackMod:'dex', properties:['ammunition','light','loading'], notes:'' },
  crossbowHeavy:  { name:'Crossbow, Heavy',type:'martial ranged', range:'100/400',  damageDice:'1d10', damageType:'piercing',    attackMod:'dex', properties:['ammunition','heavy','loading','two-handed'], notes:'' },
  longbow:        { name:'Longbow',        type:'martial ranged', range:'150/600',  damageDice:'1d8',  damageType:'piercing',    attackMod:'dex', properties:['ammunition','heavy','two-handed'], notes:'' },
  net:            { name:'Net',            type:'martial ranged', range:'5/15',     damageDice:'0',    damageType:'none',        attackMod:'dex', properties:['special','thrown'],             notes:'Large or smaller creature is restrained; STR DC 10 or attack to escape. No damage.' },

  // ── NATURAL / UNARMED ────────────────────────────────────
  unarmed:        { name:'Unarmed Strike', type:'unarmed',       reach:5,  damageDice:'1',    damageType:'bludgeoning', attackMod:'str',         properties:[],                            notes:'Damage = 1 + STR modifier' },
  bite:           { name:'Bite (natural)', type:'natural',       reach:5,  damageDice:'1d6',  damageType:'piercing',    attackMod:'str',         properties:[],                            notes:'Natural weapon; varies by race/class' },
  claws:          { name:'Claws (natural)',type:'natural',       reach:5,  damageDice:'1d4',  damageType:'slashing',    attackMod:'str_or_dex',  properties:['light'],                     notes:'Tabaxi, Dragonborn (some variants), Wild Shape forms' },
};

// ============================================================
//  SPELLCASTING ABILITY BY CLASS
// ============================================================

DND_COMBAT_DATA.spellcastingAbility = {
  wizard:    'int',
  artificer: 'int',
  fighter:   'int',   // Eldritch Knight
  rogue:     'int',   // Arcane Trickster
  cleric:    'wis',
  druid:     'wis',
  ranger:    'wis',
  monk:      'wis',   // Way of the Four Elements
  bard:      'cha',
  paladin:   'cha',
  sorcerer:  'cha',
  warlock:   'cha',
};

DND_COMBAT_DATA.cantripScaling = {
  1: 1, 5: 2, 11: 3, 17: 4,
};

DND_COMBAT_DATA.commonCantripDamage = {
  'Eldritch Blast':   { damageDice:'1d10', damageType:'force',    attackType:'spell attack', notes:'1 beam at level 1; 2 at level 5; 3 at level 11; 4 at level 17. Each beam is a separate attack roll.' },
  'Fire Bolt':        { damageDice:'1d10', damageType:'fire',     attackType:'spell attack', notes:'Scales with cantrip table' },
  'Ray of Frost':     { damageDice:'1d8',  damageType:'cold',     attackType:'spell attack', notes:'Target speed −10 ft until start of your next turn. Scales.' },
  'Toll the Dead':    { damageDice:'1d8',  damageType:'necrotic', attackType:'save (WIS)',   notes:'1d12 if target is missing HP. Scales.' },
  'Chill Touch':      { damageDice:'1d8',  damageType:'necrotic', attackType:'spell attack', notes:'Target can\'t regain HP until start of your next turn. Scales.' },
  'Sacred Flame':     { damageDice:'1d8',  damageType:'radiant',  attackType:'save (DEX)',   notes:'No cover bonus on save. Scales.' },
  'Vicious Mockery':  { damageDice:'1d4',  damageType:'psychic',  attackType:'save (WIS)',   notes:'On fail: disadvantage on next attack roll. Scales.' },
  'Shocking Grasp':   { damageDice:'1d8',  damageType:'lightning',attackType:'spell attack', notes:'Advantage if target wears metal armor. Target can\'t take reactions until start of its next turn. Scales.' },
  'Poison Spray':     { damageDice:'1d12', damageType:'poison',   attackType:'save (CON)',   notes:'Range 10 ft. Scales.' },
  'Thunderclap':      { damageDice:'1d6',  damageType:'thunder',  attackType:'save (CON)',   notes:'All creatures within 5 ft except you. Scales.' },
  'Green-Flame Blade':{ damageDice:'1d8',  damageType:'fire',     attackType:'melee weapon attack', notes:'On hit: jump fire to adjacent creature for CHA/INT mod damage. At level 5: +1d8 to both. At 11: +2d8. At 17: +3d8.' },
  'Booming Blade':    { damageDice:'1d8',  damageType:'thunder',  attackType:'melee weapon attack', notes:'On hit: target booming. If it moves before your next turn it takes 1d8 thunder. At 5: +1d8 to both, etc.' },
};

// ============================================================
//  CONDITIONS
// ============================================================

DND_COMBAT_DATA.conditions = {

  // ── D&D 5e STANDARD CONDITIONS ───────────────────────────
  blinded:       { name:'Blinded',       color:'#888',    icon:'👁️', type:'debuff',  desc:'Attacks against the blinded creature have advantage; creature\'s attacks have disadvantage. Fails any check requiring sight. Auto-fails sight-based Perception.' },
  charmed:       { name:'Charmed',       color:'#e080e0', icon:'💕', type:'debuff',  desc:'Can\'t attack charmer or target them with harmful abilities/effects. Charmer has advantage on social ability checks against the creature.' },
  deafened:      { name:'Deafened',      color:'#888',    icon:'🔇', type:'debuff',  desc:'Can\'t hear. Automatically fails ability checks requiring hearing.' },
  exhaustion:    { name:'Exhaustion',    color:'#c04040', icon:'😓', type:'debuff',  desc:'Level 1: disadv on checks. 2: speed halved. 3: disadv attacks/saves. 4: HP max halved. 5: speed 0. 6: death. Each level stacks.' },
  frightened:    { name:'Frightened',    color:'#c08040', icon:'😱', type:'debuff',  desc:'Disadvantage on ability checks and attacks while source of fear is in line of sight. Can\'t willingly move closer to source.' },
  grappled:      { name:'Grappled',      color:'#8040c0', icon:'🤼', type:'debuff',  desc:'Speed becomes 0. Ends if grappler is incapacitated or effect moves grappled creature out of reach.' },
  incapacitated: { name:'Incapacitated', color:'#c04040', icon:'💫', type:'debuff',  desc:'Can\'t take actions or reactions.' },
  invisible:     { name:'Invisible',     color:'#80c0ff', icon:'👻', type:'buff',    desc:'Attacks against have disadvantage; attacks made have advantage. Can\'t be seen without special sense or magic.' },
  paralyzed:     { name:'Paralyzed',     color:'#c04040', icon:'⚡', type:'debuff',  desc:'Incapacitated, can\'t move or speak. Attacks against have advantage. Melee attacks within 5 ft are automatic crits. Fails STR/DEX saves.' },
  petrified:     { name:'Petrified',     color:'#808080', icon:'🪨', type:'debuff',  desc:'Transformed to stone. Incapacitated, can\'t move/speak. Unaware of surroundings. Attack advantage against. Resistance to all damage. Immune to poison/disease.' },
  poisoned:      { name:'Poisoned',      color:'#40c040', icon:'🤢', type:'debuff',  desc:'Disadvantage on attack rolls and ability checks.' },
  prone:         { name:'Prone',         color:'#a06030', icon:'🫄', type:'debuff',  desc:'Only movement option is crawl (costs double). Attacks against have advantage if attacker within 5 ft; otherwise disadvantage. Disadvantage on attack rolls.' },
  restrained:    { name:'Restrained',    color:'#8040c0', icon:'⛓️', type:'debuff',  desc:'Speed 0. Attacks against have advantage; creature\'s attacks have disadvantage. Disadvantage on DEX saves.' },
  stunned:       { name:'Stunned',       color:'#c0c040', icon:'💫', type:'debuff',  desc:'Incapacitated, can\'t move, can only speak falteringly. Attacks against have advantage. Fails STR/DEX saves.' },
  unconscious:   { name:'Unconscious',   color:'#404040', icon:'💤', type:'debuff',  desc:'Incapacitated, can\'t move/speak, unaware. Drops held items. Falls prone. Attacks against have advantage; melee within 5 ft are crits. Fails STR/DEX saves.' },

  // ── COMBAT BUFFS / CLASS ABILITIES ───────────────────────
  rage: {
    name:'Rage', color:'#e04020', icon:'🔥', type:'buff',
    source:'Barbarian',
    desc:'Advantage on STR checks and saves. Bonus damage on STR melee attacks (+2, scaling). Resistance to bludgeoning, piercing, and slashing damage. Lasts 1 minute. Ends if you don\'t attack or take damage since your last turn.',
    scalingBonus: { 1:'+2', 9:'+3', 16:'+4' },
    duration: '1 minute (10 rounds)',
    resource: 'Rage uses per long rest',
  },
  recklessAttack: {
    name:'Reckless Attack', color:'#e04020', icon:'⚔️', type:'buff_debuff',
    source:'Barbarian',
    desc:'Advantage on your STR-based melee attacks this turn. Attackers have advantage on attacks against you until your next turn.',
    duration: 'Until start of next turn',
    resource: 'No cost',
  },
  bardic_inspiration: {
    name:'Bardic Inspiration', color:'#c080ff', icon:'🎵', type:'buff',
    source:'Bard',
    desc:'A creature with a Bardic Inspiration die can roll it and add the result to one ability check, attack roll, or saving throw. Die size scales with bard level.',
    scalingDie: { 1:'d6', 5:'d8', 10:'d10', 15:'d12' },
    duration: '10 minutes (expires on use)',
    resource: 'CHA mod uses per long rest (short rest at level 5)',
  },
  bless: {
    name:'Bless', color:'#f0d060', icon:'✨', type:'buff',
    source:'Spell (1st level, Cleric/Paladin)',
    desc:'Up to 3 creatures add 1d4 to attack rolls and saving throws.',
    duration: '1 minute (concentration)',
    resource: '1st level spell slot',
  },
  hex: {
    name:'Hex', color:'#8040c0', icon:'🔮', type:'buff',
    source:'Spell (1st level, Warlock)',
    desc:'Target takes extra 1d6 necrotic damage when you hit them with an attack. Choose one ability — target has disadvantage on checks with it. If target drops to 0 HP you can move Hex to another creature (bonus action).',
    duration: '1 hour / 8 hours / 24 hours (concentration, scales with slot level)',
    resource: 'Spell slot (warlock)',
  },
  huntersMark: {
    name:'Hunter\'s Mark', color:'#804020', icon:'🎯', type:'buff',
    source:'Spell (1st level, Ranger)',
    desc:'You deal extra 1d6 damage to the target whenever you hit it with a weapon attack. If it drops to 0 HP you can move the mark to another creature (bonus action).',
    duration: '1 hour / 8 hours / 24 hours (concentration, scales with slot level)',
    resource: 'Spell slot (ranger)',
  },
  divineFavor: {
    name:'Divine Favor', color:'#f0d060', icon:'⚡', type:'buff',
    source:'Spell (1st level, Paladin)',
    desc:'Your weapon attacks deal extra 1d4 radiant damage on a hit.',
    duration: '1 minute (concentration)',
    resource: '1st level spell slot',
  },
  shieldOfFaith: {
    name:'Shield of Faith', color:'#60a0ff', icon:'🛡️', type:'buff',
    source:'Spell (1st level, Cleric/Paladin)',
    desc:'+2 bonus to AC for the duration.',
    duration: '10 minutes (concentration)',
    resource: '1st level spell slot',
  },
  haste: {
    name:'Haste', color:'#40e0a0', icon:'💨', type:'buff',
    source:'Spell (3rd level)',
    desc:'Speed doubled. +2 bonus to AC. Advantage on DEX saves. Gain an additional action on each turn (attack once, dash, disengage, hide, or use object only). When ends: can\'t move or take actions until after your next turn.',
    duration: '1 minute (concentration)',
    resource: '3rd level spell slot',
  },
  slow: {
    name:'Slow', color:'#8080a0', icon:'🐢', type:'debuff',
    source:'Spell (3rd level)',
    desc:'Speed halved. −2 penalty to AC and DEX saves. Can\'t use reactions. On your turn can only use an action OR bonus action. Can\'t make more than one melee or ranged attack per action. DC = caster\'s spell save DC (WIS save).',
    duration: '1 minute (concentration)',
    resource: '3rd level spell slot',
  },
  inspiringLeader: {
    name:'Inspiring Leader (Feat)', color:'#60c0ff', icon:'🎖️', type:'buff',
    source:'Feat — Inspiring Leader',
    desc:'After a 10-minute speech, up to 6 creatures gain temp HP equal to your level + CHA modifier.',
    duration: 'Until next short/long rest',
    resource: 'Once per short rest',
  },
  favoredByGods: {
    name:'Favored by the Gods', color:'#f0d060', icon:'⭐', type:'resource',
    source:'Sorcerer — Divine Soul',
    desc:'When you fail an attack roll or saving throw, add 2d4 to the roll, potentially turning failure into success.',
    resource: 'Once per short rest',
  },
  stonesEndurance: {
    name:'Stone\'s Endurance', color:'#808080', icon:'🪨', type:'resource',
    source:'Goliath racial trait',
    desc:'When you take damage, use a reaction to roll d12 + CON mod and reduce damage taken by that amount.',
    resource: 'Once per short or long rest',
  },
  secondWind: {
    name:'Second Wind', color:'#40c040', icon:'💪', type:'resource',
    source:'Fighter class feature',
    desc:'Bonus action: regain 1d10 + fighter level HP.',
    resource: 'Once per short or long rest',
  },
  actionSurge: {
    name:'Action Surge', color:'#e08020', icon:'⚡', type:'resource',
    source:'Fighter class feature',
    desc:'Take one additional action on your turn (not an additional bonus action).',
    resource: 'Once per short rest (twice at level 17)',
  },
  cunningAction: {
    name:'Cunning Action', color:'#40c080', icon:'🏃', type:'passive',
    source:'Rogue class feature',
    desc:'Bonus action to Dash, Disengage, or Hide.',
    resource: 'No cost',
  },
  sneakAttack: {
    name:'Sneak Attack', color:'#c04040', icon:'🗡️', type:'passive',
    source:'Rogue class feature',
    desc:'Once per turn, deal extra damage when you have advantage on the attack or when an ally is adjacent to the target. Must use a finesse or ranged weapon.',
    scalingDamage: { 1:'1d6', 3:'2d6', 5:'3d6', 7:'4d6', 9:'5d6', 11:'6d6', 13:'7d6', 15:'8d6', 17:'9d6', 19:'10d6' },
    resource: 'Once per turn',
  },
  divineSense: {
    name:'Divine Sense', color:'#f0d060', icon:'✨', type:'resource',
    source:'Paladin class feature',
    desc:'Action: detect the location of celestials, fiends, and undead within 60 ft not behind total cover. Until end of your next turn you know the type of creature and its location.',
    resource: 'CHA mod + 1 uses per long rest',
  },
  layOnHands: {
    name:'Lay on Hands', color:'#40c040', icon:'🙏', type:'resource',
    source:'Paladin class feature',
    desc:'Pool of HP = 5 × paladin level. Action: restore any number of HP from pool. Or spend 5 HP to cure a disease or neutralize one poison.',
    resource: 'HP pool refills on long rest',
  },
  channelDivinity: {
    name:'Channel Divinity', color:'#f0d060', icon:'✴️', type:'resource',
    source:'Cleric / Paladin class feature',
    desc:'Uses a Channel Divinity charge. Recharges on short or long rest.',
    resource: '1/rest (level 2), 2/rest (level 6), 3/rest (level 18)',
  },
  wildShape: {
    name:'Wild Shape', color:'#40c080', icon:'🐾', type:'resource',
    source:'Druid class feature',
    desc:'Bonus action: transform into a beast. HP becomes beast\'s HP (your HP returns when you revert). Concentration spells drop. Can\'t cast spells unless Circle of the Moon level 18.',
    resource: '2 uses per short rest',
  },
  kiPoints: {
    name:'Ki Points', color:'#60c0ff', icon:'🌀', type:'resource',
    source:'Monk class feature',
    desc:'Spend Ki to fuel: Flurry of Blows (2 extra unarmed strikes as bonus action), Patient Defense (Dodge as bonus action), Step of the Wind (Disengage/Dash as bonus action; jump distance doubled), Stunning Strike (1 Ki on hit: CON save or stunned).',
    resource: 'Equal to monk level; recharge on short or long rest',
  },
  sorceryPoints: {
    name:'Sorcery Points', color:'#e060e0', icon:'✨', type:'resource',
    source:'Sorcerer class feature',
    desc:'Fuel Metamagic options and convert to/from spell slots. Convert points to slot: 2pts=1st, 3pts=2nd, 5pts=3rd, 6pts=4th, 7pts=5th. Sorcery points = sorcerer level.',
    resource: 'Equal to sorcerer level; recharge on long rest',
  },
  eldritchBlast: {
    name:'Eldritch Blast', color:'#8040c0', icon:'💜', type:'active',
    source:'Warlock cantrip',
    desc:'Ranged spell attack, 120 ft range, 1d10 force per beam. 1 beam at level 1; 2 at level 5; 3 at level 11; 4 at level 17. Can be modified by Eldritch Invocations (Agonizing Blast, Repelling Blast, etc.).',
    attackType: 'Spell attack roll',
  },
  mysticArcanum: {
    name:'Mystic Arcanum', color:'#8040c0', icon:'📖', type:'resource',
    source:'Warlock class feature',
    desc:'Cast a high-level spell (6th/7th/8th/9th level) once per long rest without expending a spell slot.',
    resource: 'Once per long rest per arcanum level',
  },
};

// ============================================================
//  RACIAL COMBAT ABILITIES
// ============================================================

DND_COMBAT_DATA.racialAbilities = {

  dragonborn: {
    breathWeapon: {
      name: 'Breath Weapon',
      type: 'resource',
      action: 'action',
      resource: '1/short rest',
      scalingDamage: { 1:'2d6', 6:'3d6', 11:'4d6', 16:'5d6' },
      saveDC: '8 + CON mod + proficiency bonus',
      desc: 'Exhale destructive energy in a 15 ft cone or 5×30 ft line (depends on dragon type). Creatures in area make a DEX or CON saving throw — DC = 8 + CON mod + prof. Failed save: full damage. Success: half damage.',
    },
  },

  'half-orc': {
    relentlessEndurance: {
      name: 'Relentless Endurance',
      type: 'resource',
      action: 'none (triggers automatically)',
      resource: '1/long rest',
      desc: 'When reduced to 0 HP but not killed outright, drop to 1 HP instead.',
    },
    savageAttacks: {
      name: 'Savage Attacks',
      type: 'passive',
      desc: 'On a critical hit with a melee weapon, roll one weapon damage die one additional time and add it to the crit damage.',
    },
  },

  tiefling: {
    hellishResistance: {
      name: 'Hellish Resistance',
      type: 'passive',
      desc: 'Resistance to fire damage.',
    },
    hellishRebuke: {
      name: 'Hellish Rebuke (3rd level)',
      type: 'resource',
      action: 'reaction (when hit by attacker within 60 ft)',
      resource: '1/long rest',
      damageDice: '2d10',
      damageType: 'fire',
      saveDC: '8 + CHA mod + proficiency bonus',
      desc: 'When damaged by a creature within 60 ft, use your reaction: creature makes a DEX save or takes 2d10 fire damage (half on success).',
    },
  },

  elf: {
    feyAncestry: {
      name: 'Fey Ancestry',
      type: 'passive',
      desc: 'Advantage on saves vs being charmed. Magic can\'t put you to sleep.',
    },
  },

  'dark elf': {
    drowMagic: {
      name: 'Drow Magic',
      type: 'resource',
      resource: 'Faerie Fire and Darkness 1/long rest each',
      desc: 'Know Dancing Lights cantrip. Level 3: Faerie Fire 1/long rest. Level 5: Darkness 1/long rest. CHA is your spellcasting ability.',
    },
    sunlightSensitivity: {
      name: 'Sunlight Sensitivity',
      type: 'passive',
      desc: 'Disadvantage on attack rolls and Perception (sight) checks in direct sunlight.',
    },
  },

  aasimar: {
    healingHands: {
      name: 'Healing Hands',
      type: 'resource',
      action: 'action',
      resource: '1/long rest',
      desc: 'Touch a creature to restore HP equal to your proficiency bonus.',
    },
    celestialResistance: {
      name: 'Celestial Resistance',
      type: 'passive',
      desc: 'Resistance to necrotic and radiant damage.',
    },
    radiantSoul: {
      name: 'Radiant Soul (Protector, level 3+)',
      type: 'resource',
      action: 'bonus action',
      resource: '1/long rest',
      duration: '1 minute',
      desc: 'Sprout wings (fly speed 30 ft). Once per turn deal extra radiant damage equal to your level on one attack or cantrip.',
    },
  },

  goliath: {
    stonesEndurance: {
      name: 'Stone\'s Endurance',
      type: 'resource',
      action: 'reaction',
      resource: '1/short rest',
      desc: 'When you take damage, roll d12 + CON mod and reduce the damage by that total.',
    },
  },

  tabaxi: {
    felineAgility: {
      name: 'Feline Agility',
      type: 'resource',
      action: 'free (part of movement)',
      resource: 'Resets after moving 0 ft on a turn',
      desc: 'Double your walking speed until end of turn.',
    },
    catClaws: {
      name: 'Cat\'s Claws',
      type: 'active',
      damageDice: '1d4',
      damageType: 'slashing',
      desc: 'Natural weapon attack. Climbing speed 20 ft.',
    },
  },

  lizardfolk: {
    bite: {
      name: 'Bite',
      type: 'active',
      damageDice: '1d6',
      damageType: 'piercing',
      attackMod: 'str',
      desc: 'Melee natural weapon. On hit: bonus action to grapple the target.',
    },
    hungryJaws: {
      name: 'Hungry Jaws',
      type: 'resource',
      action: 'bonus action',
      resource: '1/short rest',
      desc: 'Make a special bite attack. On hit: deal bite damage and gain temp HP equal to CON modifier (min 1).',
    },
    naturalArmor: {
      name: 'Natural Armor',
      type: 'passive',
      desc: 'When not wearing armor: AC = 13 + DEX modifier.',
    },
  },

  genasi_fire: {
    fireResistance: { name:'Fire Resistance', type:'passive', desc:'Resistance to fire damage.' },
    produceFlame: { name:'Produce Flame cantrip', type:'active', damageDice:'1d8', damageType:'fire', range:'30 ft', desc:'Ranged spell attack or illuminate 10 ft bright / 10 ft dim. Scales with cantrip table.' },
  },

  genasi_water: {
    acidResistance: { name:'Acid Resistance', type:'passive', desc:'Resistance to acid damage.' },
    amphibious: { name:'Amphibious', type:'passive', desc:'Breathe air and water. 30 ft swim speed.' },
  },

  kenku: {
    mimicry: {
      name: 'Mimicry',
      type: 'active',
      desc: 'Mimic any sound or voice heard. Detected with Insight vs your Deception check.',
    },
  },
};

// ============================================================
//  BONUS ACTIONS REFERENCE
// ============================================================

DND_COMBAT_DATA.bonusActions = [
  { name:'Off-hand attack',          source:'Two-Weapon Fighting',      desc:'When you attack with a light melee weapon in one hand, attack with a different light melee weapon in the other. No ability modifier to damage unless negative.' },
  { name:'Shove',                    source:'Combat (replaces attack)',  desc:'STR (Athletics) vs target STR (Athletics) or DEX (Acrobatics). Push 5 ft away or knock prone. Target must be no more than one size larger.' },
  { name:'Grapple',                  source:'Combat (replaces attack)',  desc:'STR (Athletics) vs target STR (Athletics) or DEX (Acrobatics). Target\'s speed becomes 0. Must be within reach and target no more than one size larger.' },
  { name:'Dash (Cunning Action)',    source:'Rogue',                     desc:'Double movement speed this turn.' },
  { name:'Disengage (Cunning Action)',source:'Rogue',                    desc:'Movement doesn\'t provoke opportunity attacks for the rest of the turn.' },
  { name:'Hide (Cunning Action)',    source:'Rogue',                     desc:'DEX (Stealth) check. If successful, hidden from creatures that can\'t see you.' },
  { name:'Flurry of Blows',         source:'Monk (2 Ki)',                desc:'Two unarmed strikes.' },
  { name:'Patient Defense',         source:'Monk (1 Ki)',                desc:'Take the Dodge action (attackers have disadvantage; you have advantage on DEX saves).' },
  { name:'Step of the Wind',        source:'Monk (1 Ki)',                desc:'Disengage or Dash as bonus action. Jump distance doubled.' },
  { name:'Wild Shape',              source:'Druid',                      desc:'Transform into a beast. Uses one Wild Shape charge.' },
  { name:'Bardic Inspiration',      source:'Bard',                       desc:'Grant one ally a Bardic Inspiration die (d6/d8/d10/d12 based on level).' },
  { name:'Hexblade\'s Curse',       source:'Warlock — Hexblade',         desc:'Curse one creature within 30 ft. Bonus damage = prof bonus; crit on 19-20; steal HP on kill.' },
  { name:'Second Wind',             source:'Fighter',                    desc:'Regain 1d10 + fighter level HP.' },
  { name:'Rage',                    source:'Barbarian',                  desc:'Enter rage. Advantage on STR checks/saves; bonus melee damage; resistance to B/P/S damage.' },
  { name:'Healing Light (die)',     source:'Warlock — Celestial',        desc:'Expend healing dice to restore HP to a creature within 60 ft.' },
  { name:'Feline Agility',          source:'Tabaxi racial',              desc:'Double walking speed until end of turn.' },
  { name:'Hungry Jaws',             source:'Lizardfolk racial',          desc:'Bonus bite attack; on hit gain temp HP equal to CON mod.' },
  { name:'Radiant Soul (transform)',source:'Aasimar — Protector',        desc:'Sprout wings; gain fly speed 30 ft for 1 minute; deal extra radiant damage equal to level once per turn.' },
];

// ============================================================
//  REACTIONS REFERENCE
// ============================================================

DND_COMBAT_DATA.reactions = [
  { name:'Opportunity Attack',       source:'All creatures',             desc:'When a hostile creature you can see moves out of your reach, make one melee attack against it.' },
  { name:'Readied Action',           source:'All creatures',             desc:'Trigger a prepared action when a specified condition occurs.' },
  { name:'Uncanny Dodge',            source:'Rogue (level 5)',           desc:'When an attacker you can see hits you, halve the attack\'s damage against you.' },
  { name:'Deflect Missiles',         source:'Monk',                      desc:'When hit by a ranged weapon attack, reduce damage by 1d10 + DEX + monk level. If reduced to 0, catch and throw as attack (1 Ki).' },
  { name:'Arcane Deflection',        source:'Fighter — War Magic',       desc:'When hit: +2 AC for that hit. When failing save: +4 to save. If used: only cantrips until your next turn.' },
  { name:'Shield (spell)',           source:'Wizard/Sorcerer (1st level)',desc:'+5 bonus to AC until start of your next turn, including against the triggering attack. Also blocks Magic Missile.' },
  { name:'Warding Flare',            source:'Cleric — Light Domain',     desc:'Impose disadvantage on an attack roll against you or an adjacent ally. CHA mod uses per long rest.' },
  { name:'Hellish Rebuke',           source:'Tiefling / Warlock',        desc:'When damaged: attacker makes DEX save or takes 2d10 fire damage (half on success).' },
  { name:'Stone\'s Endurance',       source:'Goliath racial',            desc:'When taking damage: roll d12 + CON mod and reduce damage by that amount. 1/short rest.' },
  { name:'Relentless Endurance',     source:'Half-Orc racial',           desc:'When reduced to 0 HP (not killed outright): drop to 1 HP instead. 1/long rest.' },
  { name:'Sentinel feat — attack',   source:'Sentinel feat',             desc:'When a creature within 5 ft makes an opportunity attack against an ally, you can make a melee attack against it.' },
  { name:'Riposte (Maneuver)',       source:'Fighter — Battle Master',   desc:'When a creature misses you in melee, expend a Superiority Die to make a melee attack and add die to damage.' },
  { name:'Parry (Maneuver)',         source:'Fighter — Battle Master',   desc:'When damaged by a melee attack, expend a Superiority Die to reduce damage by roll + DEX mod.' },
  { name:'War Caster feat',          source:'War Caster feat',           desc:'Cast a spell with casting time of 1 action as an opportunity attack.' },
];
