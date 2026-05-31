// ============================================================
//  D&D 5e MONSTER DATA — 45 ICONIC MONSTERS
// ============================================================
//  Structure per monster:
//  { name, cr, type, size, alignment,
//    ac, acNote, hp, hpDice,
//    speed: { walk, fly?, swim?, climb?, burrow? },
//    stats: { str, dex, con, int, wis, cha },
//    saves: { str?, dex?, con?, int?, wis?, cha? },       // proficient saves only
//    skills: { [skillName]: bonus },
//    senses: { darkvision?, blindsight?, truesight?, passivePerception },
//    resistances[], immunities[], vulnerabilities[],
//    conditionImmunities[],
//    languages[],
//    traits[]:  { name, desc }
//    actions[]: { name, type: 'attack'|'ability'|'multiattack', desc,
//                 attackBonus?, reach?, range?, targets?,
//                 damageDice?, damageBonus?, damageType?, secondDamage? }
//    legendaryActions?: { count, options[]: { name, cost, desc } }
//    reactions?: [{ name, desc }]
//    xp, proficiencyBonus }

const DND_MONSTER_DATA = {};

// ── CR 0–½ ────────────────────────────────────────────────

DND_MONSTER_DATA.goblin = {
  name: 'Goblin', cr: '1/4', type: 'humanoid (goblinoid)', size: 'Small',
  alignment: 'Neutral Evil',
  ac: 15, acNote: 'leather armor, shield', hp: 7, hpDice: '2d6',
  speed: { walk: 30 },
  stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
  saves: {},
  skills: { Stealth: 6 },
  senses: { darkvision: 60, passivePerception: 9 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common', 'Goblin'],
  traits: [
    { name: 'Nimble Escape', desc: 'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.' }
  ],
  actions: [
    { name: 'Scimitar', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target.' },
    { name: 'Shortbow', type: 'attack', attackBonus: 4, range: '80/320', targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target.' }
  ],
  xp: 50, proficiencyBonus: 2
};

DND_MONSTER_DATA.kobold = {
  name: 'Kobold', cr: '1/8', type: 'humanoid (kobold)', size: 'Small',
  alignment: 'Lawful Evil',
  ac: 12, acNote: 'natural armor', hp: 5, hpDice: '2d6-2',
  speed: { walk: 30 },
  stats: { str: 7, dex: 15, con: 9, int: 8, wis: 7, cha: 8 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 8 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common', 'Draconic'],
  traits: [
    { name: 'Sunlight Sensitivity', desc: 'While in sunlight, the kobold has disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight.' },
    { name: 'Pack Tactics', desc: 'The kobold has advantage on an attack roll against a creature if at least one of the kobold\'s allies is adjacent to the creature and the ally isn\'t incapacitated.' }
  ],
  actions: [
    { name: 'Dagger', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '1d4', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target.' },
    { name: 'Sling', type: 'attack', attackBonus: 4, range: '30/120', targets: 1,
      damageDice: '1d4', damageBonus: 2, damageType: 'bludgeoning',
      desc: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target.' }
  ],
  xp: 25, proficiencyBonus: 2
};

DND_MONSTER_DATA.skeleton = {
  name: 'Skeleton', cr: '1/4', type: 'undead', size: 'Medium',
  alignment: 'Lawful Evil',
  ac: 13, acNote: 'armor scraps', hp: 13, hpDice: '2d8+4',
  speed: { walk: 30 },
  stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 9 },
  resistances: [], 
  immunities: ['poison', 'bludgeoning from nonmagical attacks (partial)'],
  vulnerabilities: ['bludgeoning'],
  conditionImmunities: ['exhaustion', 'poisoned'],
  languages: [],
  traits: [],
  actions: [
    { name: 'Shortsword', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target.' },
    { name: 'Shortbow', type: 'attack', attackBonus: 4, range: '80/320', targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target.' }
  ],
  xp: 50, proficiencyBonus: 2
};

DND_MONSTER_DATA.zombie = {
  name: 'Zombie', cr: '1/4', type: 'undead', size: 'Medium',
  alignment: 'Neutral Evil',
  ac: 8, hp: 22, hpDice: '3d8+9',
  speed: { walk: 20 },
  stats: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
  saves: { wis: 0 },
  skills: {},
  senses: { darkvision: 60, passivePerception: 8 },
  resistances: [],
  immunities: ['poison'],
  vulnerabilities: [],
  conditionImmunities: ['poisoned'],
  languages: [],
  traits: [
    { name: 'Undead Fortitude', desc: 'If damage reduces the zombie to 0 HP, it must make a CON saving throw with a DC of 5 + the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 HP instead.' }
  ],
  actions: [
    { name: 'Slam', type: 'attack', attackBonus: 3, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 1, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target.' }
  ],
  xp: 50, proficiencyBonus: 2
};

// ── CR 1 ──────────────────────────────────────────────────

DND_MONSTER_DATA.ghoul = {
  name: 'Ghoul', cr: '1', type: 'undead', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 12, hp: 22, hpDice: '5d8',
  speed: { walk: 30 },
  stats: { str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 10 },
  resistances: [],
  immunities: ['poison'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'poisoned'],
  languages: ['Common'],
  traits: [],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 2, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 0, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature.' },
    { name: 'Claws', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '2d4', damageBonus: 2, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. On a hit, if the target is not an elf or undead, it must succeed on a DC 10 CON save or be Paralyzed until end of its next turn.' }
  ],
  xp: 200, proficiencyBonus: 2
};

DND_MONSTER_DATA.bugbear = {
  name: 'Bugbear', cr: '1', type: 'humanoid (goblinoid)', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 16, acNote: 'hide armor, shield', hp: 27, hpDice: '5d8+5',
  speed: { walk: 30 },
  stats: { str: 15, dex: 14, con: 13, int: 8, wis: 11, cha: 9 },
  saves: {},
  skills: { Stealth: 6, Survival: 2 },
  senses: { darkvision: 60, passivePerception: 10 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common', 'Goblin'],
  traits: [
    { name: 'Brute', desc: 'A melee weapon deals one extra die of its damage when the bugbear hits with it (included in the attack).' },
    { name: 'Surprise Attack', desc: 'If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage from the attack.' }
  ],
  actions: [
    { name: 'Morningstar', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. 11 (2d8+2) piercing damage.' },
    { name: 'Javelin', type: 'attack', attackBonus: 4, range: '30/120', targets: 1,
      damageDice: '2d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target.' }
  ],
  xp: 200, proficiencyBonus: 2
};

DND_MONSTER_DATA.werewolf = {
  name: 'Werewolf', cr: '3', type: 'humanoid (human, shapechanger)', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 11, acNote: '12 in wolf or hybrid form', hp: 58, hpDice: '9d8+18',
  speed: { walk: 30, climb: 0 },
  stats: { str: 15, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
  saves: {},
  skills: { Perception: 4, Stealth: 3 },
  senses: { passivePerception: 14 },
  resistances: [],
  immunities: ['bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Common (can\'t speak in wolf form)'],
  traits: [
    { name: 'Shapechanger', desc: 'The werewolf can use its action to polymorph into a wolf-humanoid hybrid or a wolf, or back into its true human form. Stats other than AC remain the same in each form.' },
    { name: 'Keen Hearing and Smell', desc: 'Advantage on Wisdom (Perception) checks that rely on hearing or smell.' }
  ],
  actions: [
    { name: 'Multiattack (Humanoid or Hybrid Form Only)', type: 'multiattack',
      desc: 'Two attacks: one with its bite and one with its claws or spear.' },
    { name: 'Bite (Wolf or Hybrid Form Only)', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. On hit, humanoid must DC 12 CON save or be cursed with lycanthropy.' },
    { name: 'Claws (Hybrid Form Only)', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '2d4', damageBonus: 2, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target.' }
  ],
  xp: 700, proficiencyBonus: 2
};

// ── CR 2 ──────────────────────────────────────────────────

DND_MONSTER_DATA.ogre = {
  name: 'Ogre', cr: '2', type: 'giant', size: 'Large',
  alignment: 'Chaotic Evil',
  ac: 11, acNote: 'hide armor', hp: 59, hpDice: '7d10+21',
  speed: { walk: 40 },
  stats: { str: 19, dex: 8, con: 16, int: 5, wis: 7, cha: 7 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 8 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common', 'Giant'],
  traits: [],
  actions: [
    { name: 'Greatclub', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 4, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target.' },
    { name: 'Javelin', type: 'attack', attackBonus: 6, range: '30/120', targets: 1,
      damageDice: '2d6', damageBonus: 4, damageType: 'piercing',
      desc: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target.' }
  ],
  xp: 450, proficiencyBonus: 2
};

DND_MONSTER_DATA.ghast = {
  name: 'Ghast', cr: '2', type: 'undead', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 13, hp: 36, hpDice: '8d8',
  speed: { walk: 30 },
  stats: { str: 16, dex: 17, con: 10, int: 11, wis: 10, cha: 8 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 10 },
  resistances: ['necrotic'],
  immunities: ['poison'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'poisoned'],
  languages: ['Common'],
  traits: [
    { name: 'Stench', desc: 'Any creature that starts its turn within 5 ft. of the ghast must succeed on a DC 10 CON save or be poisoned until the start of its next turn.' },
    { name: 'Turning Defiance', desc: 'The ghast and any ghouls within 30 ft. of it have advantage on saving throws against effects that turn undead.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 3, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 3, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature.' },
    { name: 'Claws', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 3, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. DC 10 CON save or Paralyzed for 1 minute (repeat save each turn).' }
  ],
  xp: 450, proficiencyBonus: 2
};

DND_MONSTER_DATA.will_o_wisp = {
  name: "Will-o'-Wisp", cr: '2', type: 'undead', size: 'Tiny',
  alignment: 'Chaotic Evil',
  ac: 19, hp: 22, hpDice: '9d4',
  speed: { fly: 50 },
  stats: { str: 1, dex: 28, con: 10, int: 13, wis: 14, cha: 11 },
  saves: {},
  skills: {},
  senses: { darkvision: 120, passivePerception: 12 },
  resistances: ['acid', 'cold', 'fire', 'necrotic', 'thunder', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: ['lightning', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'poisoned', 'prone', 'restrained', 'unconscious'],
  languages: [],
  traits: [
    { name: 'Consume Life', desc: 'As a bonus action the wisp can target one creature within 5 ft. that has 0 HP. The creature must succeed on a DC 10 CON death save or die. If it dies, the wisp regains 10 (3d6) HP.' },
    { name: 'Ephemeral', desc: 'The wisp can\'t wear or carry anything.' },
    { name: 'Incorporeal Movement', desc: 'The wisp can move through other creatures and objects as if they were difficult terrain. Takes 5 (1d10) force damage if it ends its turn inside an object.' },
    { name: 'Variable Illumination', desc: 'The wisp sheds bright light in a 5–20 ft. radius and dim light for an additional equal range. It can alter the radius as a bonus action.' }
  ],
  actions: [
    { name: 'Shock', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 0, damageType: 'lightning',
      desc: 'Melee Spell Attack: +4 to hit, reach 5 ft., one creature.' },
    { name: 'Invisibility', type: 'ability',
      desc: 'The wisp and its light magically become invisible until it attacks or uses Consume Life, or until its concentration ends.' }
  ],
  xp: 450, proficiencyBonus: 2
};

// ── CR 3 ──────────────────────────────────────────────────

DND_MONSTER_DATA.manticore = {
  name: 'Manticore', cr: '3', type: 'monstrosity', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 14, acNote: 'natural armor', hp: 68, hpDice: '8d10+24',
  speed: { walk: 30, fly: 50 },
  stats: { str: 17, dex: 16, con: 17, int: 7, wis: 12, cha: 8 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 11 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common'],
  traits: [
    { name: 'Tail Spike Regrowth', desc: 'The manticore has twenty-four tail spikes. Used spikes regrow when the manticore finishes a long rest.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'The manticore makes three attacks: one with its bite and two with its claws.' },
    { name: 'Bite', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 3, damageType: 'piercing', desc: 'Melee Weapon Attack.' },
    { name: 'Claw', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 3, damageType: 'slashing', desc: 'Melee Weapon Attack.' },
    { name: 'Tail Spikes', type: 'attack', attackBonus: 5, range: '100/200', targets: 1,
      damageDice: '1d8', damageBonus: 3, damageType: 'piercing',
      desc: 'Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Can fire up to three per action.' }
  ],
  xp: 700, proficiencyBonus: 2
};

DND_MONSTER_DATA.minotaur = {
  name: 'Minotaur', cr: '3', type: 'monstrosity', size: 'Large',
  alignment: 'Chaotic Evil',
  ac: 14, acNote: 'natural armor', hp: 76, hpDice: '9d10+27',
  speed: { walk: 40 },
  stats: { str: 18, dex: 11, con: 16, int: 6, wis: 16, cha: 9 },
  saves: {},
  skills: { Perception: 7 },
  senses: { darkvision: 60, passivePerception: 17 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Abyssal'],
  traits: [
    { name: 'Charge', desc: 'If the minotaur moves at least 10 ft. toward a target and then hits with a gore attack on the same turn, the target takes an extra 9 (2d8) piercing damage. If the target is a creature, it must succeed on a DC 14 STR save or be pushed up to 10 ft. away and knocked prone.' },
    { name: 'Labyrinthine Recall', desc: 'The minotaur can perfectly recall any path it has traveled.' },
    { name: 'Reckless', desc: 'At the start of its turn, the minotaur can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.' }
  ],
  actions: [
    { name: 'Greataxe', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d12', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +6 to hit.' },
    { name: 'Gore', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 4, damageType: 'piercing', desc: 'Melee Weapon Attack: +6 to hit.' }
  ],
  xp: 700, proficiencyBonus: 2
};

// ── CR 4 ──────────────────────────────────────────────────

DND_MONSTER_DATA.banshee = {
  name: 'Banshee', cr: '4', type: 'undead', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 12, hp: 58, hpDice: '13d8',
  speed: { walk: 0, fly: 40 },
  stats: { str: 1, dex: 14, con: 10, int: 12, wis: 11, cha: 17 },
  saves: { wis: 2, cha: 5 },
  skills: {},
  senses: { darkvision: 60, passivePerception: 10 },
  resistances: ['acid', 'fire', 'lightning', 'thunder', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: ['cold', 'necrotic', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
  languages: ['Elvish', 'Common'],
  traits: [
    { name: 'Detect Life', desc: 'The banshee can magically sense the presence of living creatures up to 5 miles away. She knows the general direction but not the exact location.' },
    { name: 'Incorporeal Movement', desc: 'Can move through creatures and objects as if difficult terrain. Takes 5 (1d10) force damage if it ends its turn inside an object.' }
  ],
  actions: [
    { name: 'Corrupting Touch', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '3d6', damageBonus: 0, damageType: 'necrotic', desc: 'Melee Spell Attack: +4 to hit, reach 5 ft.' },
    { name: 'Horrifying Visage', type: 'ability',
      desc: 'Each non-undead creature within 60 ft. that can see the banshee must succeed on a DC 13 WIS save or be frightened for 1 minute. A frightened target can repeat the save at the end of each turn. If a target\'s save fails by 5 or more, the target ages 1d4 × 10 years.' },
    { name: 'Wail (Recharge 1/Day)', type: 'ability',
      desc: 'The banshee releases a mournful wail. Each non-undead creature within 30 ft. that can hear the wail must succeed on a DC 13 CON save. On failure, a creature drops to 0 HP. On success, it takes 3d6 psychic damage.' }
  ],
  xp: 1100, proficiencyBonus: 2
};

DND_MONSTER_DATA.owlbear = {
  name: 'Owlbear', cr: '3', type: 'monstrosity', size: 'Large',
  alignment: 'Unaligned',
  ac: 13, acNote: 'natural armor', hp: 59, hpDice: '7d10+21',
  speed: { walk: 40 },
  stats: { str: 20, dex: 12, con: 17, int: 3, wis: 12, cha: 7 },
  saves: {},
  skills: { Perception: 3 },
  senses: { darkvision: 60, passivePerception: 13 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Keen Sight and Smell', desc: 'Advantage on Wisdom (Perception) checks that rely on sight or smell.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with its beak and one with its claws.' },
    { name: 'Beak', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '1d10', damageBonus: 5, damageType: 'piercing', desc: 'Melee Weapon Attack: +7 to hit.' },
    { name: 'Claws', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 5, damageType: 'slashing', desc: 'Melee Weapon Attack: +7 to hit.' }
  ],
  xp: 700, proficiencyBonus: 2
};

// ── CR 5 ──────────────────────────────────────────────────

DND_MONSTER_DATA.troll = {
  name: 'Troll', cr: '5', type: 'giant', size: 'Large',
  alignment: 'Chaotic Evil',
  ac: 15, acNote: 'natural armor', hp: 84, hpDice: '8d10+40',
  speed: { walk: 30 },
  stats: { str: 18, dex: 13, con: 20, int: 7, wis: 9, cha: 7 },
  saves: {},
  skills: { Perception: 2 },
  senses: { darkvision: 60, passivePerception: 12 },
  resistances: [], immunities: [], vulnerabilities: ['fire', 'acid'],
  conditionImmunities: [],
  languages: ['Giant'],
  traits: [
    { name: 'Keen Smell', desc: 'Advantage on Wisdom (Perception) checks that rely on smell.' },
    { name: 'Regeneration', desc: 'The troll regains 10 HP at the start of its turn. If the troll takes acid or fire damage, this trait doesn\'t function at the start of the troll\'s next turn. The troll dies only if it starts its turn with 0 HP and doesn\'t regenerate.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one with its bite and two with its claws.' },
    { name: 'Bite', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 4, damageType: 'piercing', desc: 'Melee Weapon Attack: +7 to hit.' },
    { name: 'Claw', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +7 to hit.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

DND_MONSTER_DATA.vampire_spawn = {
  name: 'Vampire Spawn', cr: '5', type: 'undead', size: 'Medium',
  alignment: 'Neutral Evil',
  ac: 15, acNote: 'natural armor', hp: 82, hpDice: '11d8+33',
  speed: { walk: 30, climb: 30 },
  stats: { str: 16, dex: 16, con: 16, int: 11, wis: 10, cha: 12 },
  saves: { dex: 6, wis: 3 },
  skills: { Perception: 3, Stealth: 6 },
  senses: { darkvision: 60, passivePerception: 13 },
  resistances: ['necrotic', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: [],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Languages it knew in life'],
  traits: [
    { name: 'Regeneration', desc: 'Regains 10 HP at the start of its turn if it has at least 1 HP and isn\'t in sunlight or running water. Takes 20 radiant or holy water damage instead.' },
    { name: 'Spider Climb', desc: 'Can climb difficult surfaces including upside down on ceilings without ability checks.' },
    { name: 'Vampire Weaknesses', desc: 'Sunlight hypersensitivity (20 radiant damage at start of turn in sunlight, disadvantage on attacks and ability checks). Running water deals same damage. Stake to the heart while incapacitated kills it. Cannot enter a residence without invitation.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with Claws and one with Bite.' },
    { name: 'Claws', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d4', damageBonus: 3, damageType: 'slashing',
      desc: 'On hit, grapples target (escape DC 13). While grappled, target is restrained and the spawn can\'t use its claws on another target.' },
    { name: 'Bite', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 3, damageType: 'piercing',
      desc: 'Can only target a willing creature, incapacitated, or grappled. Also deals 7 (2d6) necrotic damage. Target\'s HP max is reduced by necrotic amount until next long rest. Spawn regains HP equal to necrotic dealt.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

DND_MONSTER_DATA.hill_giant = {
  name: 'Hill Giant', cr: '5', type: 'giant', size: 'Huge',
  alignment: 'Chaotic Evil',
  ac: 13, acNote: 'natural armor', hp: 105, hpDice: '10d12+40',
  speed: { walk: 40 },
  stats: { str: 21, dex: 8, con: 19, int: 5, wis: 9, cha: 6 },
  saves: {},
  skills: { Perception: 2 },
  senses: { passivePerception: 12 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Giant', 'Common'],
  traits: [],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two greatclub attacks.' },
    { name: 'Greatclub', type: 'attack', attackBonus: 8, reach: 10, targets: 1,
      damageDice: '3d8', damageBonus: 5, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +8 to hit.' },
    { name: 'Rock', type: 'attack', attackBonus: 8, range: '60/240', targets: 1,
      damageDice: '3d10', damageBonus: 5, damageType: 'bludgeoning', desc: 'Ranged Weapon Attack: +8 to hit.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

// ── CR 6–7 ────────────────────────────────────────────────

DND_MONSTER_DATA.wyvern = {
  name: 'Wyvern', cr: '6', type: 'dragon', size: 'Large',
  alignment: 'Unaligned',
  ac: 13, acNote: 'natural armor', hp: 110, hpDice: '13d10+39',
  speed: { walk: 20, fly: 80 },
  stats: { str: 19, dex: 10, con: 16, int: 5, wis: 12, cha: 6 },
  saves: {},
  skills: { Perception: 4 },
  senses: { darkvision: 60, passivePerception: 14 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with its bite and one with its stinger. While flying, it can use its claws in place of one other attack.' },
    { name: 'Bite', type: 'attack', attackBonus: 7, reach: 10, targets: 1,
      damageDice: '2d6', damageBonus: 4, damageType: 'piercing', desc: 'Melee Weapon Attack: +7 to hit.' },
    { name: 'Claws', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '2d8', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +7 to hit.' },
    { name: 'Stinger', type: 'attack', attackBonus: 7, reach: 10, targets: 1,
      damageDice: '2d6', damageBonus: 4, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +7 to hit, reach 10 ft. Plus target makes DC 15 CON save or takes 7d6 poison damage (half on success).' }
  ],
  xp: 2300, proficiencyBonus: 3
};

DND_MONSTER_DATA.medusa = {
  name: 'Medusa', cr: '6', type: 'monstrosity', size: 'Medium',
  alignment: 'Lawful Evil',
  ac: 15, acNote: 'natural armor', hp: 127, hpDice: '17d8+51',
  speed: { walk: 30 },
  stats: { str: 10, dex: 15, con: 16, int: 12, wis: 13, cha: 15 },
  saves: {},
  skills: { Deception: 5, Insight: 4, Perception: 4, Stealth: 5 },
  senses: { darkvision: 60, passivePerception: 14 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common'],
  traits: [
    { name: 'Petrifying Gaze', desc: 'When a creature that can see the medusa\'s eyes starts its turn within 30 ft., the medusa can force it to make a DC 14 CON save if the medusa isn\'t incapacitated and can see the creature. On failure, the creature is restrained (saving each turn). On a second failure, it\'s petrified for 24 hours.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one with its snake hair and two with its shortsword.' },
    { name: 'Snake Hair', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '1d4', damageBonus: 2, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +5 to hit. Plus 4d6 poison damage, DC 14 CON save for half.' },
    { name: 'Shortsword', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing', desc: 'Melee Weapon Attack: +5 to hit.' },
    { name: 'Longbow', type: 'attack', attackBonus: 5, range: '150/600', targets: 1,
      damageDice: '1d8', damageBonus: 2, damageType: 'piercing', desc: 'Ranged Weapon Attack: +5 to hit.' }
  ],
  xp: 2300, proficiencyBonus: 3
};

DND_MONSTER_DATA.oni = {
  name: 'Oni', cr: '7', type: 'giant', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 16, acNote: 'chain mail', hp: 110, hpDice: '13d10+39',
  speed: { walk: 30, fly: 30 },
  stats: { str: 19, dex: 11, con: 16, int: 14, wis: 12, cha: 15 },
  saves: { dex: 3, con: 6, wis: 4, cha: 5 },
  skills: { Arcana: 5, Deception: 8, Perception: 4 },
  senses: { darkvision: 60, passivePerception: 14 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Common', 'Giant'],
  traits: [
    { name: 'Innate Spellcasting (CHA, DC 13)', desc: 'At will: darkness, invisibility. 1/day each: charm person, cone of cold, gaseous form, sleep.' },
    { name: 'Magic Weapons', desc: 'The oni\'s weapon attacks are magical.' },
    { name: 'Regeneration', desc: 'Regains 10 HP at start of each turn if it has at least 1 HP.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks, either with its claws or its glaive.' },
    { name: 'Claw (Oni Form Only)', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +7 to hit.' },
    { name: 'Glaive', type: 'attack', attackBonus: 7, reach: 10, targets: 1,
      damageDice: '2d10', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +7 to hit. 15 (2d10+4) while large, or 9 (1d10+4) while medium.' },
    { name: 'Change Shape', type: 'ability',
      desc: 'The oni magically polymorphs into a Small or Medium humanoid, into a Large giant, or back into its true form. Stats other than size remain the same in each form.' }
  ],
  xp: 2900, proficiencyBonus: 3
};

// ── CR 8–9 ────────────────────────────────────────────────

DND_MONSTER_DATA.hydra = {
  name: 'Hydra', cr: '8', type: 'monstrosity', size: 'Huge',
  alignment: 'Unaligned',
  ac: 15, acNote: 'natural armor', hp: 172, hpDice: '15d12+75',
  speed: { walk: 30, swim: 30 },
  stats: { str: 20, dex: 12, con: 20, int: 2, wis: 10, cha: 7 },
  saves: {},
  skills: { Perception: 6 },
  senses: { darkvision: 60, passivePerception: 16 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Hold Breath', desc: 'The hydra can hold its breath for 1 hour.' },
    { name: 'Multiple Heads', desc: 'The hydra has five heads. While it has more than one head, the hydra has advantage on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious. Whenever the hydra takes 25 or more damage in a single turn, one of its heads dies. If all heads die, the hydra dies. At the end of its turn, the hydra grows two heads for each head lost since its last turn (max 5 extra heads).' },
    { name: 'Reactive Heads', desc: 'For each head beyond one, the hydra gets an extra reaction that can only be used for opportunity attacks.' },
    { name: 'Wakeful', desc: 'While the hydra sleeps, at least one of its heads is awake.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'As many bite attacks as it has heads.' },
    { name: 'Bite', type: 'attack', attackBonus: 8, reach: 10, targets: 1,
      damageDice: '1d10', damageBonus: 5, damageType: 'piercing', desc: 'Melee Weapon Attack: +8 to hit.' }
  ],
  xp: 3900, proficiencyBonus: 3
};

DND_MONSTER_DATA.mind_flayer = {
  name: 'Mind Flayer', cr: '7', type: 'aberration', size: 'Medium',
  alignment: 'Lawful Evil',
  ac: 15, acNote: 'breastplate', hp: 71, hpDice: '13d8+13',
  speed: { walk: 30 },
  stats: { str: 11, dex: 12, con: 12, int: 19, wis: 17, cha: 17 },
  saves: { int: 7, wis: 6, cha: 6 },
  skills: { Arcana: 7, Deception: 6, Insight: 6, Perception: 6, Persuasion: 6, Stealth: 4 },
  senses: { darkvision: 120, passivePerception: 16 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Deep Speech', 'Telepathy 120 ft.', 'Undercommon'],
  traits: [
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Innate Spellcasting (INT, DC 15)', desc: 'At will: detect thoughts, levitate. 1/day each: dominate monster, plane shift (self only).' }
  ],
  actions: [
    { name: 'Tentacles', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '2d10', damageBonus: 4, damageType: 'psychic',
      desc: 'Melee Weapon Attack: +7 to hit. If the target is Medium or smaller, it is grappled (escape DC 15) and must succeed on a DC 15 INT save or be stunned until the grapple ends.' },
    { name: 'Extract Brain', type: 'attack', attackBonus: 7, reach: 5, targets: 1,
      damageDice: '10d10', damageBonus: 0, damageType: 'piercing',
      desc: 'Melee Weapon Attack vs. a grappled creature. On a hit that drops the target to 0 HP, the mind flayer kills the target by extracting and devouring its brain.' },
    { name: 'Mind Blast (Recharge 5–6)', type: 'ability',
      desc: 'Each creature in a 60-ft. cone must succeed on a DC 15 INT save or take 22 (4d8+4) psychic damage and be stunned for 1 minute. The target can repeat the save at the end of each of its turns.' }
  ],
  xp: 2900, proficiencyBonus: 3
};

DND_MONSTER_DATA.bone_devil = {
  name: 'Bone Devil', cr: '9', type: 'fiend (devil)', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 19, acNote: 'natural armor', hp: 142, hpDice: '15d10+60',
  speed: { walk: 40, fly: 40 },
  stats: { str: 18, dex: 17, con: 18, int: 13, wis: 14, cha: 16 },
  saves: { int: 5, wis: 6, cha: 7 },
  skills: { Deception: 7, Insight: 6 },
  senses: { darkvision: 120, passivePerception: 12 },
  resistances: ['cold', 'bludgeoning/piercing/slashing from nonmagical attacks not made with silvered weapons'],
  immunities: ['fire', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['poisoned'],
  languages: ['Infernal', 'Telepathy 120 ft.'],
  traits: [
    { name: 'Devil\'s Sight', desc: 'Magical darkness doesn\'t impede the devil\'s darkvision.' },
    { name: 'Magic Resistance', desc: 'Advantage on saves against spells and other magical effects.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: two with its claws and one with its sting.' },
    { name: 'Claw', type: 'attack', attackBonus: 8, reach: 10, targets: 1,
      damageDice: '1d8', damageBonus: 4, damageType: 'slashing', desc: 'Melee Weapon Attack: +8 to hit.' },
    { name: 'Sting', type: 'attack', attackBonus: 8, reach: 10, targets: 1,
      damageDice: '2d8', damageBonus: 4, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +8 to hit. Plus 5d8 poison damage; DC 14 CON save for half. On failure, also poisoned for 1 minute.' }
  ],
  xp: 5000, proficiencyBonus: 4
};

// ── CR 10–13 ──────────────────────────────────────────────

DND_MONSTER_DATA.young_red_dragon = {
  name: 'Young Red Dragon', cr: '10', type: 'dragon', size: 'Large',
  alignment: 'Chaotic Evil',
  ac: 18, acNote: 'natural armor', hp: 178, hpDice: '17d10+85',
  speed: { walk: 40, climb: 40, fly: 80 },
  stats: { str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19 },
  saves: { dex: 4, con: 9, wis: 4, cha: 8 },
  skills: { Perception: 8, Stealth: 4 },
  senses: { blindsight: 30, darkvision: 120, passivePerception: 18 },
  resistances: [],
  immunities: ['fire'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Common', 'Draconic'],
  traits: [],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one with its bite and two with its claws.' },
    { name: 'Bite', type: 'attack', attackBonus: 10, reach: 10, targets: 1,
      damageDice: '2d10', damageBonus: 6, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +10 to hit. Plus 7 (2d6) fire damage.' },
    { name: 'Claw', type: 'attack', attackBonus: 10, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 6, damageType: 'slashing', desc: 'Melee Weapon Attack: +10 to hit.' },
    { name: 'Fire Breath (Recharge 5–6)', type: 'ability',
      desc: '30-ft. cone. Each creature makes a DC 17 DEX save, taking 56 (16d6) fire damage on a failure, or half on a success.' }
  ],
  xp: 5900, proficiencyBonus: 4
};

DND_MONSTER_DATA.beholder = {
  name: 'Beholder', cr: '13', type: 'aberration', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 18, acNote: 'natural armor', hp: 180, hpDice: '19d10+76',
  speed: { fly: 20 },
  stats: { str: 10, dex: 14, con: 18, int: 17, wis: 15, cha: 17 },
  saves: { int: 8, wis: 7, cha: 8 },
  skills: { Perception: 12 },
  senses: { darkvision: 120, passivePerception: 22 },
  resistances: [],
  immunities: [],
  vulnerabilities: [],
  conditionImmunities: ['prone'],
  languages: ['Deep Speech', 'Undercommon'],
  traits: [
    { name: 'Antimagic Cone', desc: 'The beholder\'s central eye creates a 150-foot cone of antimagic. At the start of each of its turns, the beholder decides which way the cone faces and whether it is active. The area works like an antimagic field spell.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '4d6', damageBonus: 0, damageType: 'piercing', desc: 'Melee Weapon Attack: +5 to hit.' },
    { name: 'Eye Rays', type: 'ability',
      desc: 'The beholder shoots three of the following magical eye rays at random (reroll duplicates), choosing 1–3 targets it can see within 120 ft.: 1. Charm Ray (DC 16 WIS, charmed 1 hr), 2. Paralyzing Ray (DC 16 CON, paralyzed 1 min), 3. Fear Ray (DC 16 WIS, frightened 1 min), 4. Slowing Ray (DC 16 DEX, speed halved + no multiattack + −2 AC and DEX saves for 1 min), 5. Enervation Ray (DC 16 CON, 8d8 necrotic), 6. Telekinetic Ray (DC 16 STR, moves up to 30 ft.), 7. Sleep Ray (DC 16 WIS, unconscious 1 min), 8. Petrification Ray (DC 16 DEX, restrained → petrified), 9. Disintegration Ray (DC 16 DEX, 10d8 force; if reduced to 0 HP, disintegrated), 10. Death Ray (DC 16 DEX, 10d10 necrotic; if reduced to 0 HP, dies).' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Eye Ray', cost: 1, desc: 'Use one random eye ray.' }
    ]
  },
  xp: 10000, proficiencyBonus: 5
};

DND_MONSTER_DATA.aboleth = {
  name: 'Aboleth', cr: '10', type: 'aberration', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 17, acNote: 'natural armor', hp: 135, hpDice: '18d10+36',
  speed: { walk: 10, swim: 40 },
  stats: { str: 21, dex: 9, con: 15, int: 18, wis: 15, cha: 18 },
  saves: { con: 6, int: 8, wis: 6 },
  skills: { History: 12, Perception: 10 },
  senses: { darkvision: 120, passivePerception: 20 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Deep Speech', 'Telepathy 120 ft.'],
  traits: [
    { name: 'Amphibious', desc: 'Can breathe air and water.' },
    { name: 'Mucous Cloud', desc: 'While underwater, the aboleth is surrounded by mucus. A creature that touches it or hits it with a melee attack while within 5 ft. must make a DC 14 CON save or be diseased for 1d4 hours, during which time it can breathe only underwater.' },
    { name: 'Probing Telepathy', desc: 'If a creature communicates telepathically with the aboleth, it learns the creature\'s greatest desires if the creature fails a DC 15 WIS save.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three tentacle attacks.' },
    { name: 'Tentacle', type: 'attack', attackBonus: 9, reach: 10, targets: 1,
      damageDice: '2d6', damageBonus: 5, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +9 to hit. On hit, target must succeed on DC 14 CON save or become diseased. Diseased creature can\'t regain HP by any means other than magic, and its skin transforms to transparent slime in 1d4 hours unless Cure Disease is cast on it.' },
    { name: 'Tail', type: 'attack', attackBonus: 9, reach: 10, targets: 1,
      damageDice: '3d6', damageBonus: 5, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +9 to hit.' },
    { name: 'Enslave (3/Day)', type: 'ability',
      desc: 'The aboleth targets one creature it can see within 30 ft. The target must succeed on a DC 14 WIS save or be magically charmed until the aboleth dies or until it is on a different plane. The charmed target obeys the aboleth\'s telepathic commands.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Detect', cost: 1, desc: 'Make a Wisdom (Perception) check.' },
      { name: 'Tail Swipe', cost: 1, desc: 'Make one tail attack.' },
      { name: 'Psychic Drain (Costs 2)', cost: 2, desc: 'One charmed creature within 30 ft. takes 3d6 psychic damage; aboleth regains HP equal to damage dealt.' }
    ]
  },
  reactions: [
    { name: 'Mucous Cloud', desc: 'See trait description above.' }
  ],
  xp: 5900, proficiencyBonus: 4
};

DND_MONSTER_DATA.vampire = {
  name: 'Vampire', cr: '13', type: 'undead (shapechanger)', size: 'Medium',
  alignment: 'Lawful Evil',
  ac: 16, acNote: 'natural armor', hp: 144, hpDice: '17d8+68',
  speed: { walk: 30, climb: 30 },
  stats: { str: 18, dex: 18, con: 18, int: 17, wis: 15, cha: 18 },
  saves: { dex: 9, wis: 7, cha: 9 },
  skills: { Perception: 7, Stealth: 9 },
  senses: { darkvision: 120, passivePerception: 17 },
  resistances: ['necrotic', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: [],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Languages it knew in life'],
  traits: [
    { name: 'Shapechanger', desc: 'Can polymorph into a Tiny bat or a Medium cloud of mist, or back into its true form. Stats remain the same in bat form; can\'t speak, attack, or cast spells in mist form.' },
    { name: 'Legendary Resistance (3/Day)', desc: 'If the vampire fails a saving throw, it can choose to succeed instead.' },
    { name: 'Regeneration', desc: 'Regains 20 HP at the start of its turn if it has at least 1 HP and isn\'t in sunlight or running water.' },
    { name: 'Vampire Weaknesses', desc: 'Harmed by running water (20 acid damage per turn). Hypersensitive to sunlight (20 radiant damage per turn, disadvantage on attacks). Stake through the heart while incapacitated → paralyzed. Cannot enter a residence uninvited.' },
    { name: 'Spellcasting', desc: 'CHA, DC 17, +9. At will: charm person. 3/day: animate dead, gaseous form.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with Unarmed Strike and one with Bite, or uses Charm.' },
    { name: 'Unarmed Strike', type: 'attack', attackBonus: 9, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 4, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +9 to hit. If the target is a creature, the vampire can grapple the target (escape DC 18).' },
    { name: 'Bite', type: 'attack', attackBonus: 9, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 4, damageType: 'piercing',
      desc: 'Melee Weapon Attack vs. willing, incapacitated, or grappled target. +10 (3d6) necrotic damage. Target max HP reduced until next long rest. Vampire regains HP equal to necrotic dealt.' },
    { name: 'Charm', type: 'ability',
      desc: 'One humanoid within 30 ft. makes DC 17 WIS save or is magically charmed for 24 hours. Charmed creature regards the vampire as a trusted friend and is a willing target for the vampire\'s bite.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Move', cost: 1, desc: 'Move up to speed without provoking opportunity attacks.' },
      { name: 'Unarmed Strike', cost: 1, desc: 'Make one unarmed strike.' },
      { name: 'Bite (Costs 2)', cost: 2, desc: 'Make one bite attack.' }
    ]
  },
  xp: 10000, proficiencyBonus: 5
};

// ── CR 14–17 ──────────────────────────────────────────────

DND_MONSTER_DATA.adult_red_dragon = {
  name: 'Adult Red Dragon', cr: '17', type: 'dragon', size: 'Huge',
  alignment: 'Chaotic Evil',
  ac: 19, acNote: 'natural armor', hp: 256, hpDice: '19d12+133',
  speed: { walk: 40, climb: 40, fly: 80 },
  stats: { str: 27, dex: 10, con: 25, int: 16, wis: 13, cha: 21 },
  saves: { dex: 6, con: 13, wis: 7, cha: 11 },
  skills: { Perception: 13, Stealth: 6 },
  senses: { blindsight: 60, darkvision: 120, passivePerception: 23 },
  resistances: [],
  immunities: ['fire'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Common', 'Draconic'],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one with its bite and two with its claws. Can use Frightful Presence in place of one attack.' },
    { name: 'Bite', type: 'attack', attackBonus: 14, reach: 10, targets: 1,
      damageDice: '2d10', damageBonus: 8, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +14 to hit. Plus 14 (4d6) fire damage.' },
    { name: 'Claw', type: 'attack', attackBonus: 14, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 8, damageType: 'slashing', desc: 'Melee Weapon Attack: +14 to hit.' },
    { name: 'Tail', type: 'attack', attackBonus: 14, reach: 15, targets: 1,
      damageDice: '2d8', damageBonus: 8, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +14 to hit.' },
    { name: 'Frightful Presence', type: 'ability',
      desc: 'Each creature within 120 ft. that is aware of the dragon must succeed on a DC 19 WIS save or become frightened for 1 minute.' },
    { name: 'Fire Breath (Recharge 5–6)', type: 'ability',
      desc: '60-ft. cone. Each creature makes a DC 21 DEX save, taking 63 (18d6) fire damage on a failure, or half on a success.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Detect', cost: 1, desc: 'Make a Wisdom (Perception) check.' },
      { name: 'Tail Attack', cost: 1, desc: 'Make one tail attack.' },
      { name: 'Wing Attack (Costs 2)', cost: 2, desc: 'Each creature within 10 ft. must DC 22 DEX save or take 15 (2d6+8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its speed.' }
    ]
  },
  xp: 18000, proficiencyBonus: 6
};

DND_MONSTER_DATA.death_knight = {
  name: 'Death Knight', cr: '17', type: 'undead', size: 'Medium',
  alignment: 'Chaotic Evil',
  ac: 20, acNote: 'plate armor, shield', hp: 180, hpDice: '24d8+72',
  speed: { walk: 30 },
  stats: { str: 20, dex: 11, con: 17, int: 12, wis: 16, cha: 18 },
  saves: { dex: 6, wis: 9, cha: 10 },
  skills: {},
  senses: { darkvision: 120, passivePerception: 13 },
  resistances: ['necrotic', 'bludgeoning/piercing/slashing from nonmagical attacks that aren\'t silvered'],
  immunities: ['poison', 'fire'],
  vulnerabilities: [],
  conditionImmunities: ['exhaustion', 'frightened', 'poisoned'],
  languages: ['Abyssal', 'Common'],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the death knight fails a saving throw, it can choose to succeed instead.' },
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Marshal Undead', desc: 'All undead within 60 ft. of the death knight and not under another creature\'s control have advantage on saving throws and can\'t be turned.' },
    { name: 'Spellcasting (CHA, DC 18, +10)', desc: 'At will: command, detect magic. 3/day: bestow curse, dispel magic, hold person. 1/day: animate dead, divine word, wall of ice.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three longsword attacks.' },
    { name: 'Longsword', type: 'attack', attackBonus: 11, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 5, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +11 to hit. Plus 18 (4d8) necrotic damage.' },
    { name: 'Hellfire Orb (1/Day)', type: 'ability',
      desc: 'Launches a fiery ball at a point within 180 ft. Each creature within 20 ft. of that point must make a DC 18 DEX save. Takes 35 (10d6) fire damage plus 35 (10d6) necrotic on a failure (half on a success).' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Command', cost: 1, desc: 'Cast command as a bonus action.' },
      { name: 'Frightening Glare (Costs 2)', cost: 2, desc: 'One creature within 30 ft. makes DC 18 WIS save or is frightened until end of its next turn.' },
      { name: 'Sword Attack (Costs 3)', cost: 3, desc: 'Make one longsword attack.' }
    ]
  },
  xp: 18000, proficiencyBonus: 6
};

DND_MONSTER_DATA.ancient_red_dragon = {
  name: 'Ancient Red Dragon', cr: '24', type: 'dragon', size: 'Gargantuan',
  alignment: 'Chaotic Evil',
  ac: 22, acNote: 'natural armor', hp: 546, hpDice: '28d20+252',
  speed: { walk: 40, climb: 40, fly: 80 },
  stats: { str: 30, dex: 10, con: 29, int: 18, wis: 15, cha: 23 },
  saves: { dex: 7, con: 16, wis: 9, cha: 13 },
  skills: { Perception: 16, Stealth: 7 },
  senses: { blindsight: 60, darkvision: 120, passivePerception: 26 },
  resistances: [],
  immunities: ['fire'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Common', 'Draconic'],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Uses Frightful Presence, then makes three attacks: one with its bite and two with its claws.' },
    { name: 'Bite', type: 'attack', attackBonus: 17, reach: 15, targets: 1,
      damageDice: '2d10', damageBonus: 10, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +17 to hit. Plus 17 (5d6) fire damage.' },
    { name: 'Claw', type: 'attack', attackBonus: 17, reach: 10, targets: 1,
      damageDice: '2d6', damageBonus: 10, damageType: 'slashing', desc: 'Melee Weapon Attack: +17 to hit.' },
    { name: 'Tail', type: 'attack', attackBonus: 17, reach: 20, targets: 1,
      damageDice: '2d8', damageBonus: 10, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +17 to hit.' },
    { name: 'Frightful Presence', type: 'ability',
      desc: 'Each creature within 120 ft. that is aware of the dragon must succeed on a DC 21 WIS save or become frightened for 1 minute.' },
    { name: 'Fire Breath (Recharge 5–6)', type: 'ability',
      desc: '90-ft. cone. Each creature makes a DC 24 DEX save, taking 91 (26d6) fire damage on a failure, or half on a success.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Detect', cost: 1, desc: 'Make a Wisdom (Perception) check.' },
      { name: 'Tail Attack', cost: 1, desc: 'Make one tail attack.' },
      { name: 'Wing Attack (Costs 2)', cost: 2, desc: 'Each creature within 15 ft. must DC 25 DEX save or take 17 (2d6+10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its speed.' }
    ]
  },
  xp: 62000, proficiencyBonus: 7
};

// ── CLASSIC UNDERDARK / DUNGEON ────────────────────────────

DND_MONSTER_DATA.drow = {
  name: 'Drow', cr: '1/4', type: 'humanoid (elf)', size: 'Medium',
  alignment: 'Neutral Evil',
  ac: 15, acNote: 'chain shirt', hp: 13, hpDice: '3d8',
  speed: { walk: 30 },
  stats: { str: 10, dex: 14, con: 10, int: 11, wis: 11, cha: 12 },
  saves: {},
  skills: { Perception: 2, Stealth: 4 },
  senses: { darkvision: 120, passivePerception: 12 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Elvish', 'Undercommon'],
  traits: [
    { name: 'Fey Ancestry', desc: 'Advantage on saves against being charmed, and magic can\'t put the drow to sleep.' },
    { name: 'Innate Spellcasting (CHA, DC 11)', desc: 'At will: dancing lights. 1/day each: darkness, faerie fire.' },
    { name: 'Sunlight Sensitivity', desc: 'Disadvantage on attack rolls and Perception checks relying on sight while in sunlight.' }
  ],
  actions: [
    { name: 'Shortsword', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing', desc: 'Melee Weapon Attack: +4 to hit.' },
    { name: 'Hand Crossbow', type: 'attack', attackBonus: 4, range: '30/120', targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'piercing',
      desc: 'Ranged Weapon Attack: +4 to hit. Hits with poisoned bolt; DC 13 CON save or poisoned for 1 hour. Fail by 5+ → also unconscious while poisoned.' }
  ],
  xp: 50, proficiencyBonus: 2
};

DND_MONSTER_DATA.gelatinous_cube = {
  name: 'Gelatinous Cube', cr: '2', type: 'ooze', size: 'Large',
  alignment: 'Unaligned',
  ac: 6, hp: 84, hpDice: '8d10+40',
  speed: { walk: 15 },
  stats: { str: 14, dex: 3, con: 20, int: 1, wis: 6, cha: 1 },
  saves: {},
  skills: {},
  senses: { blindsight: 60, passivePerception: 8 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'prone'],
  languages: [],
  traits: [
    { name: 'Ooze Cube', desc: 'The cube takes up its entire space. Other creatures can enter the space, but a creature that does so is subjected to the cube\'s Engulf and has disadvantage on the save. Creatures inside the cube are blinded and restrained, have total cover against attacks from outside the cube. A creature within 5 ft. can see creatures inside (cube is transparent).' },
    { name: 'Transparent', desc: 'Even when motionless, spotting the cube requires DC 15 Perception check.' }
  ],
  actions: [
    { name: 'Pseudopod', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '3d6', damageBonus: 0, damageType: 'acid', desc: 'Melee Weapon Attack: +4 to hit.' },
    { name: 'Engulf', type: 'ability',
      desc: 'The cube moves up to its speed. While doing so, it can enter Large or smaller creatures\' spaces. Creature in path: DC 12 DEX save. On failure, engulfed; on success, creature is pushed to edge of cube. Engulfed creature restrained, takes 6d6 acid at start of each cube turn, DC 12 CON save for half.' }
  ],
  xp: 450, proficiencyBonus: 2
};

DND_MONSTER_DATA.rust_monster = {
  name: 'Rust Monster', cr: '1/2', type: 'monstrosity', size: 'Medium',
  alignment: 'Unaligned',
  ac: 14, acNote: 'natural armor', hp: 27, hpDice: '5d8+5',
  speed: { walk: 40 },
  stats: { str: 13, dex: 12, con: 13, int: 2, wis: 13, cha: 6 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 11 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Iron Scent', desc: 'Can pinpoint, by scent, the location of ferrous metal within 30 ft.' },
    { name: 'Rust Metal', desc: 'Any nonmagical weapon made of metal that hits the rust monster corrodes. The weapon takes a permanent −1 penalty to damage rolls. If it drops to −5, the weapon is destroyed. Nonmagical ammunition made of metal that hits the rust monster is destroyed after dealing damage.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 3, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 1, damageType: 'piercing', desc: 'Melee Weapon Attack: +3 to hit.' },
    { name: 'Antennae', type: 'ability',
      desc: 'The rust monster corrodes a nonmagical ferrous metal object it can see within 5 ft. of it. If the object isn\'t being worn or carried, the touch destroys a 1-foot cube of it. If worn or carried by a creature, the creature can make a DC 11 DEX save. On failure, the object takes a −1d4 penalty to the AC it provides, or −1d4 damage if it\'s a weapon.' }
  ],
  xp: 100, proficiencyBonus: 2
};

DND_MONSTER_DATA.displacer_beast = {
  name: 'Displacer Beast', cr: '3', type: 'monstrosity', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 13, acNote: 'natural armor', hp: 85, hpDice: '10d10+30',
  speed: { walk: 40 },
  stats: { str: 18, dex: 15, con: 16, int: 6, wis: 12, cha: 8 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 11 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Avoidance', desc: 'If the displacer beast is subjected to an effect that allows it to make a saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.' },
    { name: 'Displacement', desc: 'The displacer beast projects a magical illusion that makes it appear to be standing near its actual location, causing attack rolls against it to have disadvantage. If it is hit by an attack, this trait is disrupted until the end of its next turn.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two tentacle attacks.' },
    { name: 'Tentacle', type: 'attack', attackBonus: 6, reach: 10, targets: 1,
      damageDice: '1d6', damageBonus: 4, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +6 to hit. Plus 7 (1d6+4) piercing damage from the hooked end.' }
  ],
  xp: 700, proficiencyBonus: 2
};

DND_MONSTER_DATA.basilisk = {
  name: 'Basilisk', cr: '3', type: 'monstrosity', size: 'Medium',
  alignment: 'Unaligned',
  ac: 15, acNote: 'natural armor', hp: 52, hpDice: '8d8+16',
  speed: { walk: 20 },
  stats: { str: 16, dex: 8, con: 15, int: 2, wis: 8, cha: 7 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 9 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Petrifying Gaze', desc: 'If a creature starts its turn within 30 ft. and the two can see each other, the basilisk can force the creature to make a DC 12 CON save. On a failed save, the creature magically begins to turn to stone and is restrained. The restrained creature must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified until freed by greater restoration or other magic.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 3, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +5 to hit. Plus 7 (2d6) acid damage.' }
  ],
  xp: 700, proficiencyBonus: 2
};

DND_MONSTER_DATA.blink_dog = {
  name: 'Blink Dog', cr: '1/4', type: 'fey', size: 'Medium',
  alignment: 'Lawful Good',
  ac: 13, hp: 22, hpDice: '4d8+4',
  speed: { walk: 40 },
  stats: { str: 12, dex: 17, con: 12, int: 10, wis: 13, cha: 11 },
  saves: {},
  skills: { Perception: 3, Stealth: 5 },
  senses: { passivePerception: 13 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: ['Blink Dog', 'understands Sylvan but cannot speak it'],
  traits: [
    { name: 'Keen Hearing and Smell', desc: 'Advantage on Wisdom (Perception) checks that rely on hearing or smell.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 3, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 1, damageType: 'piercing', desc: 'Melee Weapon Attack: +3 to hit.' },
    { name: 'Teleport (Recharge 4–6)', type: 'ability',
      desc: 'The blink dog magically teleports, along with any equipment it is wearing or carrying, up to 40 ft. to an unoccupied space it can see. Before or after teleporting, the blink dog can make one bite attack.' }
  ],
  xp: 50, proficiencyBonus: 2
};

DND_MONSTER_DATA.wraith = {
  name: 'Wraith', cr: '5', type: 'undead', size: 'Medium',
  alignment: 'Neutral Evil',
  ac: 13, hp: 67, hpDice: '9d8+27',
  speed: { fly: 60, walk: 0 },
  stats: { str: 6, dex: 16, con: 16, int: 12, wis: 14, cha: 15 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 12 },
  resistances: ['acid', 'cold', 'fire', 'lightning', 'thunder', 'bludgeoning/piercing/slashing from nonmagical attacks not made with silvered weapons'],
  immunities: ['necrotic', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained'],
  languages: ['Languages it knew in life'],
  traits: [
    { name: 'Incorporeal Movement', desc: 'Can move through creatures and objects as if difficult terrain. Takes 5 (1d10) force damage if ending turn inside an object.' },
    { name: 'Sunlight Sensitivity', desc: 'Disadvantage on attack rolls and Perception checks in sunlight.' }
  ],
  actions: [
    { name: 'Life Drain', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '4d8', damageBonus: 3, damageType: 'necrotic',
      desc: 'Melee Spell Attack: +6 to hit. The target must succeed on a DC 14 CON save or its hit point maximum is reduced by the necrotic damage dealt until it finishes a long rest. If this reduces the target\'s max HP to 0, it dies.' },
    { name: 'Create Specter', type: 'ability',
      desc: 'The wraith targets a humanoid within 10 ft. that died violently within the past minute. That creature rises as a specter under the wraith\'s control. Max 7 specters.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

DND_MONSTER_DATA.lich = {
  name: 'Lich', cr: '21', type: 'undead', size: 'Medium',
  alignment: 'Any Evil',
  ac: 17, acNote: 'natural armor', hp: 135, hpDice: '18d8+54',
  speed: { walk: 30 },
  stats: { str: 11, dex: 16, con: 16, int: 20, wis: 14, cha: 16 },
  saves: { con: 10, int: 12, wis: 9 },
  skills: { Arcana: 19, History: 12, Insight: 9, Perception: 9 },
  senses: { truesight: 120, passivePerception: 19 },
  resistances: ['cold', 'lightning', 'necrotic'],
  immunities: ['poison', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'poisoned'],
  languages: ['Common plus up to five other languages'],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the lich fails a saving throw, it can choose to succeed instead.' },
    { name: 'Rejuvenation', desc: 'If it has a phylactery, a destroyed lich gains a new body in 1d10 days, regaining all its HP and becoming active again. New body appears within 5 ft. of the phylactery.' },
    { name: 'Spellcasting (INT, DC 20, +12)', desc: 'Cantrips: mage hand, prestidigitation, ray of frost. 1st (4): detect magic, magic missile, shield, thunderwave. 2nd (3): detect thoughts, invisibility, Melf\'s acid arrow, mirror image. 3rd (3): animate dead, counterspell, dispel magic, fireball. 4th (3): blight, dimension door. 5th (3): cloudkill, scrying. 6th (1): disintegrate, globe of invulnerability. 7th (1): finger of death, plane shift. 8th (1): dominate monster, power word stun. 9th (1): power word kill.' },
    { name: 'Turn Resistance', desc: 'Advantage on saving throws against any effect that turns undead.' }
  ],
  actions: [
    { name: 'Paralyzing Touch', type: 'attack', attackBonus: 12, reach: 5, targets: 1,
      damageDice: '3d6', damageBonus: 0, damageType: 'cold',
      desc: 'Melee Spell Attack: +12 to hit. The target must succeed on a DC 18 CON save or be paralyzed for 1 minute. Repeat save at end of each turn.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Cantrip', cost: 1, desc: 'Cast a cantrip.' },
      { name: 'Paralyzing Touch (Costs 2)', cost: 2, desc: 'Use Paralyzing Touch.' },
      { name: 'Frightening Gaze (Costs 2)', cost: 2, desc: 'One creature within 10 ft. makes DC 18 WIS save or is frightened for 1 minute.' },
      { name: 'Disrupt Life (Costs 3)', cost: 3, desc: 'Each non-undead creature within 20 ft. must DC 18 CON save, taking 21 (6d6) necrotic damage on failure, half on success.' }
    ]
  },
  xp: 33000, proficiencyBonus: 7
};

// ── CLASSIC BOSS MONSTERS ─────────────────────────────────

DND_MONSTER_DATA.tarrasque = {
  name: 'Tarrasque', cr: '30', type: 'monstrosity (titan)', size: 'Gargantuan',
  alignment: 'Unaligned',
  ac: 25, acNote: 'natural armor', hp: 676, hpDice: '33d20+330',
  speed: { walk: 40 },
  stats: { str: 30, dex: 11, con: 30, int: 3, wis: 11, cha: 11 },
  saves: { int: 5, wis: 9, cha: 9 },
  skills: {},
  senses: { blindsight: 120, passivePerception: 10 },
  resistances: [],
  immunities: ['fire', 'poison', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'frightened', 'paralyzed', 'poisoned'],
  languages: [],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the tarrasque fails a saving throw, it can choose to succeed instead.' },
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Reflective Carapace', desc: 'Any time the tarrasque is targeted by a magic missile spell, a line spell, or a spell that requires a ranged attack roll, roll a d6. On a 1 to 5, the tarrasque is unaffected. On a 6, the tarrasque is unaffected, and the effect is reflected back at the caster as though it originated from the tarrasque.' },
    { name: 'Siege Monster', desc: 'The tarrasque deals double damage to objects and structures.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Uses Frightful Presence. Makes five attacks: one bite, two claws, one horn, one tail.' },
    { name: 'Bite', type: 'attack', attackBonus: 19, reach: 10, targets: 1,
      damageDice: '4d12', damageBonus: 10, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +19 to hit. On hit, target is grappled (escape DC 20). Grappled creature restrained, tarrasque can\'t bite another until grapple ends.' },
    { name: 'Claw', type: 'attack', attackBonus: 19, reach: 15, targets: 1,
      damageDice: '4d8', damageBonus: 10, damageType: 'slashing', desc: 'Melee Weapon Attack: +19 to hit.' },
    { name: 'Horn', type: 'attack', attackBonus: 19, reach: 10, targets: 1,
      damageDice: '4d10', damageBonus: 10, damageType: 'piercing', desc: 'Melee Weapon Attack: +19 to hit.' },
    { name: 'Tail', type: 'attack', attackBonus: 19, reach: 20, targets: 1,
      damageDice: '4d6', damageBonus: 10, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +19 to hit. Target must DC 20 STR save or be knocked prone.' },
    { name: 'Frightful Presence', type: 'ability',
      desc: 'Each creature within 120 ft. and aware of the tarrasque must succeed on a DC 17 WIS save or become frightened for 1 minute.' },
    { name: 'Swallow', type: 'ability',
      desc: 'The tarrasque makes one bite attack against a Large or smaller creature it is grappling. If it hits, the target is swallowed. Swallowed: blinded and restrained, total cover, takes 56 (16d6) acid damage at the start of each of the tarrasque\'s turns. Only one creature can be swallowed at a time. If the tarrasque takes 60 or more damage in a single turn, it must make a DC 20 CON save or regurgitate the swallowed creature (lands prone within 10 ft.).' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Attack', cost: 1, desc: 'Make one claw attack or tail attack.' },
      { name: 'Move', cost: 1, desc: 'Move up to half speed without provoking opportunity attacks.' },
      { name: 'Chomp (Costs 2)', cost: 2, desc: 'Make one bite attack or swallow a grappled creature.' }
    ]
  },
  xp: 155000, proficiencyBonus: 9
};

DND_MONSTER_DATA.dragon_turtle = {
  name: 'Dragon Turtle', cr: '17', type: 'dragon', size: 'Gargantuan',
  alignment: 'Neutral',
  ac: 20, acNote: 'natural armor', hp: 341, hpDice: '22d20+110',
  speed: { walk: 20, swim: 40 },
  stats: { str: 25, dex: 10, con: 20, int: 10, wis: 12, cha: 12 },
  saves: { dex: 6, con: 11, wis: 7 },
  skills: {},
  senses: { darkvision: 120, passivePerception: 11 },
  resistances: [],
  immunities: ['fire'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Aquan', 'Draconic'],
  traits: [
    { name: 'Amphibious', desc: 'Can breathe air and water.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one bite and two claws.' },
    { name: 'Bite', type: 'attack', attackBonus: 13, reach: 15, targets: 1,
      damageDice: '3d12', damageBonus: 7, damageType: 'piercing', desc: 'Melee Weapon Attack: +13 to hit.' },
    { name: 'Claw', type: 'attack', attackBonus: 13, reach: 10, targets: 1,
      damageDice: '2d10', damageBonus: 7, damageType: 'slashing', desc: 'Melee Weapon Attack: +13 to hit.' },
    { name: 'Steam Breath (Recharge 5–6)', type: 'ability',
      desc: '60-ft. cone. Each creature makes a DC 18 CON save, taking 52 (15d6) fire damage on a failure, or half on a success. Being underwater doesn\'t grant resistance.' }
  ],
  xp: 18000, proficiencyBonus: 6
};

DND_MONSTER_DATA.adult_white_dragon = {
  name: 'Adult White Dragon', cr: '13', type: 'dragon', size: 'Huge',
  alignment: 'Chaotic Evil',
  ac: 18, acNote: 'natural armor', hp: 200, hpDice: '16d12+96',
  speed: { walk: 40, burrow: 30, fly: 80, swim: 40 },
  stats: { str: 22, dex: 10, con: 22, int: 8, wis: 12, cha: 12 },
  saves: { dex: 5, con: 11, wis: 6, cha: 6 },
  skills: { Perception: 11, Stealth: 5 },
  senses: { blindsight: 60, darkvision: 120, passivePerception: 21 },
  resistances: [],
  immunities: ['cold'],
  vulnerabilities: [],
  conditionImmunities: [],
  languages: ['Common', 'Draconic'],
  traits: [
    { name: 'Legendary Resistance (3/Day)', desc: 'If the dragon fails a saving throw, it can choose to succeed instead.' },
    { name: 'Ice Walk', desc: 'Can move across and climb icy surfaces without an ability check. Difficult terrain composed of ice or snow doesn\'t cost it extra movement.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Three attacks: one bite and two claws. Can use Frightful Presence.' },
    { name: 'Bite', type: 'attack', attackBonus: 11, reach: 10, targets: 1,
      damageDice: '2d10', damageBonus: 6, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +11 to hit. Plus 9 (2d8) cold damage.' },
    { name: 'Claw', type: 'attack', attackBonus: 11, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 6, damageType: 'slashing', desc: 'Melee Weapon Attack: +11 to hit.' },
    { name: 'Tail', type: 'attack', attackBonus: 11, reach: 15, targets: 1,
      damageDice: '2d8', damageBonus: 6, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +11 to hit.' },
    { name: 'Frightful Presence', type: 'ability',
      desc: 'DC 16 WIS save or frightened for 1 minute.' },
    { name: 'Cold Breath (Recharge 5–6)', type: 'ability',
      desc: '60-ft. cone. Each creature makes a DC 19 CON save, taking 54 (12d8) cold damage on a failure, or half on a success.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Detect', cost: 1, desc: 'Make a Wisdom (Perception) check.' },
      { name: 'Tail Attack', cost: 1, desc: 'Make one tail attack.' },
      { name: 'Wing Attack (Costs 2)', cost: 2, desc: 'Creatures within 10 ft. make DC 19 DEX save or take 13 (2d6+6) bludgeoning damage and are knocked prone. Dragon can fly half speed.' }
    ]
  },
  xp: 10000, proficiencyBonus: 5
};

DND_MONSTER_DATA.pit_fiend = {
  name: 'Pit Fiend', cr: '20', type: 'fiend (devil)', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 19, acNote: 'natural armor', hp: 300, hpDice: '24d10+168',
  speed: { walk: 30, fly: 60 },
  stats: { str: 26, dex: 14, con: 24, int: 22, wis: 18, cha: 24 },
  saves: { dex: 8, con: 13, int: 12, wis: 10 },
  skills: {},
  senses: { truesight: 120, passivePerception: 14 },
  resistances: ['cold', 'bludgeoning/piercing/slashing from nonmagical attacks that aren\'t silvered'],
  immunities: ['fire', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['poisoned'],
  languages: ['Infernal', 'Telepathy 120 ft.'],
  traits: [
    { name: 'Aura of Fear', desc: 'Any creature hostile to the pit fiend that starts its turn within 20 ft. must succeed on a DC 21 WIS save or be frightened until the start of its next turn.' },
    { name: 'Innate Spellcasting (CHA, DC 21)', desc: 'At will: detect magic, fireball. 3/day: hold monster, wall of fire. 1/day: blasphemy, dominate monster, meteor swarm.' },
    { name: 'Legendary Resistance (3/Day)', desc: 'If the pit fiend fails a saving throw, it can choose to succeed instead.' },
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Magic Weapons', desc: 'The pit fiend\'s weapon attacks are magical.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Four attacks: one bite, one claw, one mace, one tail.' },
    { name: 'Bite', type: 'attack', attackBonus: 14, reach: 5, targets: 1,
      damageDice: '4d6', damageBonus: 8, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +14 to hit. Plus 21 (6d6) fire damage. Target must DC 21 CON save or be poisoned. Poisoned target makes another save every 24 hours; 3 failures → permanent curse.' },
    { name: 'Claw', type: 'attack', attackBonus: 14, reach: 10, targets: 1,
      damageDice: '2d8', damageBonus: 8, damageType: 'slashing', desc: 'Melee Weapon Attack: +14 to hit.' },
    { name: 'Mace', type: 'attack', attackBonus: 14, reach: 10, targets: 1,
      damageDice: '2d6', damageBonus: 8, damageType: 'bludgeoning',
      desc: 'Melee Weapon Attack: +14 to hit. Plus 21 (6d6) fire damage.' },
    { name: 'Tail', type: 'attack', attackBonus: 14, reach: 10, targets: 1,
      damageDice: '2d12', damageBonus: 8, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +14 to hit.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Fireball', cost: 1, desc: 'Cast fireball.' },
      { name: 'Mace (Costs 2)', cost: 2, desc: 'Make one mace attack.' },
      { name: 'Infernal Summons (Costs 3)', cost: 3, desc: 'Summons 2 bearded devils or 1 erinyes (50% chance of success; can only use once per day).' }
    ]
  },
  xp: 25000, proficiencyBonus: 6
};

DND_MONSTER_DATA.death_tyrant = {
  name: 'Death Tyrant', cr: '14', type: 'undead', size: 'Large',
  alignment: 'Lawful Evil',
  ac: 19, acNote: 'natural armor', hp: 187, hpDice: '22d10+66',
  speed: { fly: 25 },
  stats: { str: 10, dex: 14, con: 16, int: 17, wis: 15, cha: 17 },
  saves: { int: 8, wis: 7, cha: 8 },
  skills: { Perception: 12 },
  senses: { darkvision: 120, passivePerception: 22 },
  resistances: [],
  immunities: ['poison'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'poisoned', 'prone'],
  languages: ['Deep Speech', 'Undercommon'],
  traits: [
    { name: 'Negative Energy Cone', desc: 'The death tyrant\'s central eye emits a 150-foot cone of negative energy. At the start of each of its turns, the tyrant decides which way the cone faces and whether it is active. Any creature in the cone can\'t regain hit points, and any undead in the cone has advantage on all attack rolls, ability checks, and saving throws.' },
    { name: 'Legendary Resistance (3/Day)', desc: 'If the death tyrant fails a saving throw, it can choose to succeed instead.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '4d6', damageBonus: 0, damageType: 'piercing', desc: 'Melee Weapon Attack: +5 to hit.' },
    { name: 'Eye Rays', type: 'ability', desc: 'Shoots three random magical eye rays (same table as beholder, but reanimation ray substituted: DC 16 CON save; if target drops to 0 HP from this damage, it rises as a zombie under the death tyrant\'s control).' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Eye Ray', cost: 1, desc: 'Use one random eye ray.' }
    ]
  },
  xp: 11500, proficiencyBonus: 5
};

// ── BEASTS ────────────────────────────────────────────────

DND_MONSTER_DATA.giant_spider = {
  name: 'Giant Spider', cr: '1', type: 'beast', size: 'Large',
  alignment: 'Unaligned',
  ac: 14, acNote: 'natural armor', hp: 26, hpDice: '4d10+4',
  speed: { walk: 30, climb: 30 },
  stats: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 },
  saves: {},
  skills: { Stealth: 7 },
  senses: { blindsight: 10, darkvision: 60, passivePerception: 10 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Spider Climb', desc: 'Can climb difficult surfaces including ceilings without an ability check.' },
    { name: 'Web Sense', desc: 'While in contact with a web, the spider knows the exact location of any other creature in contact with the same web.' },
    { name: 'Web Walker', desc: 'Ignores movement restrictions caused by webbing.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 5, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 3, damageType: 'piercing',
      desc: 'Melee Weapon Attack: +5 to hit. Plus 2d8 poison damage; DC 11 CON save for half.' },
    { name: 'Web (Recharge 5–6)', type: 'attack', attackBonus: 5, range: '30/60', targets: 1,
      desc: 'Ranged Weapon Attack: +5 to hit. Hit: Restrained by webbing. Escape DC 12 STR check. AC 10, 5 HP; vulnerable to fire.' }
  ],
  xp: 200, proficiencyBonus: 2
};

DND_MONSTER_DATA.giant_shark = {
  name: 'Giant Shark', cr: '5', type: 'beast', size: 'Huge',
  alignment: 'Unaligned',
  ac: 13, acNote: 'natural armor', hp: 126, hpDice: '11d12+55',
  speed: { swim: 50 },
  stats: { str: 23, dex: 11, con: 21, int: 1, wis: 10, cha: 5 },
  saves: {},
  skills: { Perception: 3 },
  senses: { blindsight: 60, passivePerception: 13 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Blood Frenzy', desc: 'Advantage on melee attack rolls against any creature that doesn\'t have all its HP.' },
    { name: 'Water Breathing', desc: 'Can breathe only underwater.' }
  ],
  actions: [
    { name: 'Bite', type: 'attack', attackBonus: 9, reach: 5, targets: 1,
      damageDice: '3d10', damageBonus: 6, damageType: 'piercing', desc: 'Melee Weapon Attack: +9 to hit.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

DND_MONSTER_DATA.griffon = {
  name: 'Griffon', cr: '2', type: 'monstrosity', size: 'Large',
  alignment: 'Unaligned',
  ac: 12, hp: 59, hpDice: '7d10+21',
  speed: { walk: 30, fly: 80 },
  stats: { str: 18, dex: 15, con: 16, int: 2, wis: 13, cha: 8 },
  saves: {},
  skills: { Perception: 5 },
  senses: { darkvision: 60, passivePerception: 15 },
  resistances: [], immunities: [], vulnerabilities: [], conditionImmunities: [],
  languages: [],
  traits: [
    { name: 'Keen Sight', desc: 'Advantage on Wisdom (Perception) checks that rely on sight.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with its beak and one with its claws.' },
    { name: 'Beak', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '1d8', damageBonus: 4, damageType: 'piercing', desc: 'Melee Weapon Attack: +6 to hit.' },
    { name: 'Claws', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 4, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +6 to hit. Target is grappled (escape DC 15). Until the grapple ends, the target is restrained, and the griffon can\'t use its claws on another target.' }
  ],
  xp: 450, proficiencyBonus: 2
};

// ── CONSTRUCTS ────────────────────────────────────────────

DND_MONSTER_DATA.animated_armor = {
  name: 'Animated Armor', cr: '1', type: 'construct', size: 'Medium',
  alignment: 'Unaligned',
  ac: 18, acNote: 'natural armor', hp: 33, hpDice: '6d8+6',
  speed: { walk: 25 },
  stats: { str: 14, dex: 11, con: 13, int: 1, wis: 3, cha: 1 },
  saves: {},
  skills: {},
  senses: { blindsight: 60, passivePerception: 6 },
  resistances: [],
  immunities: ['poison', 'psychic'],
  vulnerabilities: [],
  conditionImmunities: ['blinded', 'charmed', 'deafened', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
  languages: [],
  traits: [
    { name: 'Antimagic Susceptibility', desc: 'The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a CON save against the caster\'s spell save DC or fall unconscious for 1 minute.' },
    { name: 'False Appearance', desc: 'While the armor remains motionless, it is indistinguishable from a normal suit of armor.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two melee attacks.' },
    { name: 'Slam', type: 'attack', attackBonus: 4, reach: 5, targets: 1,
      damageDice: '1d6', damageBonus: 2, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +4 to hit.' }
  ],
  xp: 200, proficiencyBonus: 2
};

DND_MONSTER_DATA.golem_iron = {
  name: 'Iron Golem', cr: '16', type: 'construct', size: 'Large',
  alignment: 'Unaligned',
  ac: 20, acNote: 'natural armor', hp: 210, hpDice: '20d10+100',
  speed: { walk: 30 },
  stats: { str: 24, dex: 9, con: 20, int: 3, wis: 11, cha: 1 },
  saves: {},
  skills: {},
  senses: { darkvision: 120, passivePerception: 10 },
  resistances: ['bludgeoning/piercing/slashing from nonmagical attacks that aren\'t adamantine'],
  immunities: ['fire', 'poison', 'psychic'],
  vulnerabilities: [],
  conditionImmunities: ['charmed', 'exhaustion', 'frightened', 'paralyzed', 'petrified', 'poisoned'],
  languages: ['Understands commands from creator but can\'t speak'],
  traits: [
    { name: 'Fire Absorption', desc: 'Whenever the golem is subjected to fire damage, it takes no damage and instead regains HP equal to the fire damage dealt.' },
    { name: 'Immutable Form', desc: 'Immune to any spell or effect that would alter its form.' },
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Magic Weapons', desc: 'The golem\'s weapon attacks are magical.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two slam attacks.' },
    { name: 'Slam', type: 'attack', attackBonus: 13, reach: 5, targets: 1,
      damageDice: '3d8', damageBonus: 7, damageType: 'bludgeoning', desc: 'Melee Weapon Attack: +13 to hit.' },
    { name: 'Sword', type: 'attack', attackBonus: 13, reach: 10, targets: 1,
      damageDice: '3d10', damageBonus: 7, damageType: 'slashing', desc: 'Melee Weapon Attack: +13 to hit.' },
    { name: 'Poison Breath (Recharge 6)', type: 'ability',
      desc: '15-ft. cone. Each creature must succeed on a DC 19 CON save or take 45 (10d8) poison damage and be poisoned for 1 minute (half damage, not poisoned on success).' }
  ],
  xp: 15000, proficiencyBonus: 5
};

// ── ELEMENTAL / PLANAR ────────────────────────────────────

DND_MONSTER_DATA.fire_elemental = {
  name: 'Fire Elemental', cr: '5', type: 'elemental', size: 'Large',
  alignment: 'Neutral',
  ac: 13, hp: 102, hpDice: '12d10+36',
  speed: { walk: 50 },
  stats: { str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7 },
  saves: {},
  skills: {},
  senses: { darkvision: 60, passivePerception: 10 },
  resistances: ['bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: ['fire', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['exhaustion', 'grappled', 'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'unconscious'],
  languages: ['Ignan'],
  traits: [
    { name: 'Fire Form', desc: 'The elemental can move through a space as narrow as 1 inch wide without squeezing. A creature that touches or hits it in melee takes 5 (1d10) fire damage. The elemental can enter a hostile creature\'s space and stop there. The first time each turn it enters a creature\'s space, that creature takes 5 (1d10) fire damage and must succeed on a DC 13 STR save or catch fire (1d10 fire damage at start of each turn until action is used to extinguish).' },
    { name: 'Illumination', desc: 'Sheds bright light in a 30-ft. radius and dim light in an additional 30 ft.' },
    { name: 'Water Susceptibility', desc: 'Takes 1 cold damage for every 5 ft. it moves in water, or for every gallon of water splashed on it.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two touch attacks.' },
    { name: 'Touch', type: 'attack', attackBonus: 6, reach: 5, targets: 1,
      damageDice: '2d6', damageBonus: 3, damageType: 'fire', desc: 'Melee Weapon Attack: +6 to hit. Target catches fire if it fails a DC 11 DEX save.' }
  ],
  xp: 1800, proficiencyBonus: 3
};

DND_MONSTER_DATA.balor = {
  name: 'Balor', cr: '19', type: 'fiend (demon)', size: 'Huge',
  alignment: 'Chaotic Evil',
  ac: 19, acNote: 'natural armor', hp: 262, hpDice: '21d12+126',
  speed: { walk: 40, fly: 80 },
  stats: { str: 26, dex: 15, con: 22, int: 20, wis: 16, cha: 22 },
  saves: { str: 14, con: 12, wis: 9, cha: 12 },
  skills: {},
  senses: { truesight: 120, passivePerception: 13 },
  resistances: ['cold', 'lightning', 'bludgeoning/piercing/slashing from nonmagical attacks'],
  immunities: ['fire', 'poison'],
  vulnerabilities: [],
  conditionImmunities: ['poisoned'],
  languages: ['Abyssal', 'Telepathy 120 ft.'],
  traits: [
    { name: 'Death Throes', desc: 'When the balor dies, it explodes, and each creature within 30 ft. of it must make a DC 20 DEX save, taking 70 (20d6) fire damage on a failure, or half on a success. The explosion also destroys the balor\'s weapons.' },
    { name: 'Fire Aura', desc: 'At the start of each of the balor\'s turns, each creature within 5 ft. of it takes 10 (3d6) fire damage, and flammable objects in the aura that aren\'t being worn or carried ignite. A creature that touches the balor or hits it with a melee attack while within 5 ft. takes 10 (3d6) fire damage.' },
    { name: 'Legendary Resistance (3/Day)', desc: 'If the balor fails a saving throw, it can choose to succeed instead.' },
    { name: 'Magic Resistance', desc: 'Advantage on saving throws against spells and other magical effects.' },
    { name: 'Magic Weapons', desc: 'The balor\'s weapon attacks are magical.' }
  ],
  actions: [
    { name: 'Multiattack', type: 'multiattack', desc: 'Two attacks: one with its longsword and one with its whip.' },
    { name: 'Longsword', type: 'attack', attackBonus: 14, reach: 10, targets: 1,
      damageDice: '3d8', damageBonus: 8, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +14 to hit. Plus 13 (3d8) lightning damage.' },
    { name: 'Whip', type: 'attack', attackBonus: 14, reach: 30, targets: 1,
      damageDice: '2d6', damageBonus: 8, damageType: 'slashing',
      desc: 'Melee Weapon Attack: +14 to hit. Target must DC 22 STR save or be pulled up to 25 ft. toward the balor.' },
    { name: 'Teleport', type: 'ability',
      desc: 'The balor magically teleports, along with any equipment it is wearing or carrying, up to 120 ft. to an unoccupied space it can see.' }
  ],
  legendaryActions: {
    count: 3,
    options: [
      { name: 'Teleport', cost: 1, desc: 'Use its Teleport action.' },
      { name: 'Whip (Costs 2)', cost: 2, desc: 'Make one whip attack.' },
      { name: 'Fire (Costs 3)', cost: 3, desc: 'Each creature within 5 ft. takes 10 (3d6) fire damage.' }
    ]
  },
  xp: 22000, proficiencyBonus: 6
};

// ── HELPER FUNCTIONS ──────────────────────────────────────

// Get all monsters as a sorted array
DND_MONSTER_DATA.getAll = () =>
  Object.entries(DND_MONSTER_DATA)
    .filter(([k, v]) => typeof v === 'object' && v.name && typeof v !== 'function')
    .map(([_, v]) => v)
    .sort((a, b) => {
      const crToNum = cr => {
        if (cr === '1/8') return 0.125;
        if (cr === '1/4') return 0.25;
        if (cr === '1/2') return 0.5;
        return parseFloat(cr) || 0;
      };
      return crToNum(a.cr) - crToNum(b.cr) || a.name.localeCompare(b.name);
    });

// Get monsters by CR
DND_MONSTER_DATA.getByCR = (cr) =>
  DND_MONSTER_DATA.getAll().filter(m => m.cr === String(cr));

// Get monsters by type
DND_MONSTER_DATA.getByType = (type) =>
  DND_MONSTER_DATA.getAll().filter(m => m.type.toLowerCase().includes(type.toLowerCase()));

// Get monsters in a CR range (e.g. for encounter building)
DND_MONSTER_DATA.getByRange = (minCR, maxCR) => {
  const crToNum = cr => {
    if (cr === '1/8') return 0.125;
    if (cr === '1/4') return 0.25;
    if (cr === '1/2') return 0.5;
    return parseFloat(cr) || 0;
  };
  return DND_MONSTER_DATA.getAll().filter(m => {
    const n = crToNum(m.cr);
    return n >= minCR && n <= maxCR;
  });
};

// Search by name
DND_MONSTER_DATA.search = (query) => {
  const q = query.toLowerCase();
  return DND_MONSTER_DATA.getAll().filter(m => m.name.toLowerCase().includes(q));
};

// XP thresholds for encounter difficulty (per character, by level)
DND_MONSTER_DATA.XP_THRESHOLDS = {
  1:  { easy: 25,   medium: 50,   hard: 75,   deadly: 100  },
  2:  { easy: 50,   medium: 100,  hard: 150,  deadly: 200  },
  3:  { easy: 75,   medium: 150,  hard: 225,  deadly: 400  },
  4:  { easy: 125,  medium: 250,  hard: 375,  deadly: 500  },
  5:  { easy: 250,  medium: 500,  hard: 750,  deadly: 1100 },
  6:  { easy: 300,  medium: 600,  hard: 900,  deadly: 1400 },
  7:  { easy: 350,  medium: 750,  hard: 1100, deadly: 1700 },
  8:  { easy: 450,  medium: 900,  hard: 1400, deadly: 2100 },
  9:  { easy: 550,  medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600,  medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800,  medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
};

console.log('[DND Monster Data] loaded —', DND_MONSTER_DATA.getAll().length, 'monsters');
