// ============================================================
//  D&D 5e RACE DATA — CORE RACES
//  Populates DND_RACE_DATA with traits, bonuses, and abilities
//  Load after dnd-data-core.js
// ============================================================

const DND_RACE_DATA = window.DND_RACE_DATA || {};

// ── DATA STRUCTURE PER RACE ──────────────────────────────────
// {
//   abilityBonuses: { str/dex/con/int/wis/cha: number }
//   size: 'Small' | 'Medium'
//   speed: number (ft)
//   darkvision: number | null  (ft range, null if none)
//   languages: string[]
//   traits: [{ name, desc, type: 'passive'|'active'|'resource' }]
//   subraces: { name: { abilityBonuses, traits } }
// }

DND_RACE_DATA.human = {
  abilityBonuses: { str:1, dex:1, con:1, int:1, wis:1, cha:1 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Common', 'One extra language of your choice'],
  traits: [
    {
      name: 'Extra Language',
      type: 'passive',
      desc: 'You can speak, read, and write one extra language of your choice.',
    },
  ],
  subraces: {
    'Variant Human': {
      abilityBonuses: { any1: 1, any2: 1 }, // player picks two different stats
      traits: [
        {
          name: 'Skills',
          type: 'passive',
          desc: 'You gain proficiency in one skill of your choice.',
        },
        {
          name: 'Feat',
          type: 'passive',
          desc: 'You gain one feat of your choice at level 1.',
        },
      ],
    },
  },
};

DND_RACE_DATA.elf = {
  abilityBonuses: { dex: 2 },
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'Elvish'],
  traits: [
    {
      name: 'Darkvision',
      type: 'passive',
      desc: 'You can see in dim light within 60 ft as if it were bright light, and in darkness as if it were dim light.',
    },
    {
      name: 'Keen Senses',
      type: 'passive',
      desc: 'You have proficiency in the Perception skill.',
    },
    {
      name: 'Fey Ancestry',
      type: 'passive',
      desc: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.',
    },
    {
      name: 'Trance',
      type: 'passive',
      desc: 'You don\'t need to sleep. Instead you meditate deeply for 4 hours a day. After resting this way you gain the same benefit as a human does from 8 hours of sleep.',
    },
  ],
  subraces: {
    'High Elf': {
      abilityBonuses: { int: 1 },
      traits: [
        { name: 'Elf Weapon Training', type: 'passive', desc: 'Proficiency with longsword, shortsword, shortbow, and longbow.' },
        { name: 'Cantrip', type: 'active', desc: 'You know one cantrip of your choice from the wizard spell list. INT is your spellcasting ability for it.' },
        { name: 'Extra Language', type: 'passive', desc: 'You can speak, read, and write one extra language.' },
      ],
    },
    'Wood Elf': {
      abilityBonuses: { wis: 1 },
      traits: [
        { name: 'Elf Weapon Training', type: 'passive', desc: 'Proficiency with longsword, shortsword, shortbow, and longbow.' },
        { name: 'Fleet of Foot', type: 'passive', desc: 'Your base walking speed increases to 35 ft.' },
        { name: 'Mask of the Wild', type: 'passive', desc: 'You can attempt to hide even when only lightly obscured by foliage, rain, snow, mist, or other natural phenomena.' },
      ],
    },
    'Dark Elf (Drow)': {
      abilityBonuses: { cha: 1 },
      traits: [
        { name: 'Superior Darkvision', type: 'passive', desc: 'Your darkvision range is 120 ft.' },
        { name: 'Sunlight Sensitivity', type: 'passive', desc: 'Disadvantage on attack rolls and Perception checks that rely on sight when you or target are in direct sunlight.' },
        { name: 'Drow Magic', type: 'resource', desc: 'Know Dancing Lights cantrip. At level 3: cast Faerie Fire once per long rest. At level 5: cast Darkness once per long rest. CHA is your spellcasting ability.' },
        { name: 'Drow Weapon Training', type: 'passive', desc: 'Proficiency with rapiers, shortswords, and hand crossbows.' },
      ],
    },
  },
};

DND_RACE_DATA.dwarf = {
  abilityBonuses: { con: 2 },
  size: 'Medium',
  speed: 25,
  darkvision: 60,
  languages: ['Common', 'Dwarvish'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Dwarven Resilience', type: 'passive', desc: 'Advantage on saving throws against poison; resistance to poison damage.' },
    { name: 'Dwarven Combat Training', type: 'passive', desc: 'Proficiency with battleaxe, handaxe, light hammer, and warhammer.' },
    { name: 'Tool Proficiency', type: 'passive', desc: 'Proficiency with one artisan\'s tool of your choice: smith\'s, brewer\'s, or mason\'s tools.' },
    { name: 'Stonecunning', type: 'passive', desc: 'Whenever you make an INT (History) check related to the origin of stonework, double your proficiency bonus.' },
  ],
  subraces: {
    'Hill Dwarf': {
      abilityBonuses: { wis: 1 },
      traits: [
        { name: 'Dwarven Toughness', type: 'passive', desc: 'Your HP maximum increases by 1 and increases by 1 again every time you gain a level.' },
      ],
    },
    'Mountain Dwarf': {
      abilityBonuses: { str: 2 },
      traits: [
        { name: 'Dwarven Armor Training', type: 'passive', desc: 'Proficiency with light and medium armor.' },
      ],
    },
  },
};

DND_RACE_DATA.halfling = {
  abilityBonuses: { dex: 2 },
  size: 'Small',
  speed: 25,
  darkvision: null,
  languages: ['Common', 'Halfling'],
  traits: [
    { name: 'Lucky', type: 'passive', desc: 'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.' },
    { name: 'Brave', type: 'passive', desc: 'Advantage on saving throws against being frightened.' },
    { name: 'Halfling Nimbleness', type: 'passive', desc: 'You can move through the space of any creature that is a size larger than yours.' },
  ],
  subraces: {
    'Lightfoot': {
      abilityBonuses: { cha: 1 },
      traits: [
        { name: 'Naturally Stealthy', type: 'passive', desc: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.' },
      ],
    },
    'Stout': {
      abilityBonuses: { con: 1 },
      traits: [
        { name: 'Stout Resilience', type: 'passive', desc: 'Advantage on saving throws against poison and resistance to poison damage.' },
      ],
    },
  },
};

DND_RACE_DATA.gnome = {
  abilityBonuses: { int: 2 },
  size: 'Small',
  speed: 25,
  darkvision: 60,
  languages: ['Common', 'Gnomish'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Gnome Cunning', type: 'passive', desc: 'Advantage on all INT, WIS, and CHA saving throws against magic.' },
  ],
  subraces: {
    'Forest Gnome': {
      abilityBonuses: { dex: 1 },
      traits: [
        { name: 'Natural Illusionist', type: 'active', desc: 'You know the Minor Illusion cantrip. INT is your spellcasting ability for it.' },
        { name: 'Speak with Small Beasts', type: 'active', desc: 'You can communicate simple ideas with Small or smaller beasts using sounds and gestures.' },
      ],
    },
    'Rock Gnome': {
      abilityBonuses: { con: 1 },
      traits: [
        { name: 'Artificer\'s Lore', type: 'passive', desc: 'Add twice your proficiency bonus to INT (History) checks related to magic items, alchemical objects, or technological devices.' },
        { name: 'Tinker', type: 'active', desc: 'Proficiency with artisan\'s tools (tinker\'s tools). Using them over 1 hour and 10 gp of materials, you can construct a Tiny clockwork device.' },
      ],
    },
    'Deep Gnome (Svirfneblin)': {
      abilityBonuses: { dex: 1 },
      traits: [
        { name: 'Superior Darkvision', type: 'passive', desc: 'Darkvision range is 120 ft.' },
        { name: 'Stone Camouflage', type: 'passive', desc: 'Advantage on DEX (Stealth) checks to hide in rocky terrain.' },
      ],
    },
  },
};

DND_RACE_DATA['half-elf'] = {
  abilityBonuses: { cha: 2, any1: 1, any2: 1 }, // player picks two different stats
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'Elvish', 'One language of your choice'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Fey Ancestry', type: 'passive', desc: 'Advantage on saving throws against being charmed; magic can\'t put you to sleep.' },
    { name: 'Skill Versatility', type: 'passive', desc: 'Proficiency in two skills of your choice.' },
  ],
  subraces: {},
};

DND_RACE_DATA['half-orc'] = {
  abilityBonuses: { str: 2, con: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'Orc'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Menacing', type: 'passive', desc: 'Proficiency in the Intimidation skill.' },
    { name: 'Relentless Endurance', type: 'resource', desc: 'When reduced to 0 HP but not killed outright, drop to 1 HP instead. Once per long rest.' },
    { name: 'Savage Attacks', type: 'passive', desc: 'When you score a critical hit with a melee weapon attack, roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.' },
  ],
  subraces: {},
};

DND_RACE_DATA.tiefling = {
  abilityBonuses: { int: 1, cha: 2 },
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'Infernal'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Hellish Resistance', type: 'passive', desc: 'Resistance to fire damage.' },
    {
      name: 'Infernal Legacy',
      type: 'resource',
      desc: 'Know Thaumaturgy cantrip. At level 3: cast Hellish Rebuke as a 2nd-level spell once per long rest. At level 5: cast Darkness once per long rest. CHA is your spellcasting ability.',
    },
  ],
  subraces: {
    'Asmodeus Tiefling': {
      abilityBonuses: {},
      traits: [{ name: 'Infernal Legacy', type: 'resource', desc: 'Standard Infernal Legacy as above.' }],
    },
    'Zariel Tiefling': {
      abilityBonuses: { str: 1 },
      traits: [{ name: 'Infernal Legacy', type: 'resource', desc: 'Know Thaumaturgy. Level 3: Searing Smite 1/long rest. Level 5: Branding Smite 1/long rest.' }],
    },
    'Glasya Tiefling': {
      abilityBonuses: { dex: 1 },
      traits: [{ name: 'Infernal Legacy', type: 'resource', desc: 'Know Minor Illusion. Level 3: Disguise Self 1/long rest. Level 5: Invisibility 1/long rest.' }],
    },
  },
};

DND_RACE_DATA.dragonborn = {
  abilityBonuses: { str: 2, cha: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Common', 'Draconic'],
  traits: [
    {
      name: 'Draconic Ancestry',
      type: 'passive',
      desc: 'Choose a dragon type. This determines your breath weapon damage type and your damage resistance.',
      table: {
        Black:  { damage: 'Acid',      breathShape: '5×30 ft line', save: 'DEX' },
        Blue:   { damage: 'Lightning', breathShape: '5×30 ft line', save: 'DEX' },
        Brass:  { damage: 'Fire',      breathShape: '5×30 ft line', save: 'DEX' },
        Bronze: { damage: 'Lightning', breathShape: '5×30 ft line', save: 'DEX' },
        Copper: { damage: 'Acid',      breathShape: '5×30 ft line', save: 'DEX' },
        Gold:   { damage: 'Fire',      breathShape: '15 ft cone',   save: 'DEX' },
        Green:  { damage: 'Poison',    breathShape: '15 ft cone',   save: 'CON' },
        Red:    { damage: 'Fire',      breathShape: '15 ft cone',   save: 'DEX' },
        Silver: { damage: 'Cold',      breathShape: '15 ft cone',   save: 'CON' },
        White:  { damage: 'Cold',      breathShape: '15 ft cone',   save: 'CON' },
      },
    },
    {
      name: 'Breath Weapon',
      type: 'resource',
      desc: 'Exhale destructive energy as an action. Damage = 2d6 (increases: 3d6 at level 6, 4d6 at level 11, 5d6 at level 16). Creatures in the area make a saving throw (DEX or CON depending on ancestry) — DC = 8 + CON mod + proficiency bonus. On a failed save they take full damage; half on success. Once per short or long rest.',
      scalingDamage: { 1: '2d6', 6: '3d6', 11: '4d6', 16: '5d6' },
    },
    {
      name: 'Damage Resistance',
      type: 'passive',
      desc: 'Resistance to the damage type associated with your draconic ancestry.',
    },
  ],
  subraces: {},
};
