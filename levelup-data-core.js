// ============================================================
//  D&D 5e LEVEL-UP DATA — CORE TABLES
//  Loaded once. All other class files depend on LU_CLASS_DATA
//  being initialised here before they run.
// ============================================================

const LU_PROF_BONUS = [0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];

const LU_ASI_LEVELS = {
  fighter: [4,6,8,12,14,16,19],
  rogue:   [4,8,10,12,16,19],
  default: [4,8,12,16,19],
};

const LU_SUBCLASS_LEVEL = {
  barbarian:3, bard:3, cleric:1, druid:2,
  fighter:3, monk:3, paladin:3, ranger:3,
  rogue:3, sorcerer:1, warlock:1, wizard:2, artificer:3,
};

const LU_HIT_DIE = {
  barbarian:12, fighter:10, paladin:10, ranger:10,
  bard:8, cleric:8, druid:8, monk:8, rogue:8, warlock:8,
  artificer:8, sorcerer:6, wizard:6,
};

const LU_CASTER_TYPE = {
  wizard:'full', sorcerer:'full', druid:'full', cleric:'full', bard:'full',
  paladin:'half', ranger:'half', warlock:'warlock',
  fighter:null, barbarian:null, monk:null, rogue:null, artificer:'half',
};

const LU_SPELL_SLOTS = {
  full:[
    null,
    [2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],
    [4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],
    [4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1],
  ],
  half:[
    null,null,
    [2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],
    [4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],
    [4,3,2,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],
    [4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],
    [4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],[4,3,3,3,2,0,0,0,0],
  ],
  warlock:[
    null,
    [1,0,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0,0],[0,0,2,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0],
    [0,0,0,0,2,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],
    [0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],[0,0,0,0,3,0,0,0,0],
    [0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],[0,0,0,0,4,0,0,0,0],
  ],
};

const LU_STATS     = ['str','dex','con','int','wis','cha'];
const LU_STAT_NAMES = {str:'Strength',dex:'Dexterity',con:'Constitution',int:'Intelligence',wis:'Wisdom',cha:'Charisma'};

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

// Container populated by each class data file
const LU_CLASS_DATA = {};
