// ============================================================
//  D&D 5e RACE DATA — EXTRA RACES
//  Requires dnd-races-core.js to be loaded first (creates DND_RACE_DATA)
// ============================================================

// DND_RACE_DATA already declared in dnd-races-core.js

DND_RACE_DATA.aasimar = {
  abilityBonuses: { cha: 2 },
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'Celestial'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    { name: 'Celestial Resistance', type: 'passive', desc: 'Resistance to necrotic damage and radiant damage.' },
    { name: 'Healing Hands', type: 'resource', desc: 'As an action, touch a creature and restore HP equal to your proficiency bonus. Once per long rest.' },
    { name: 'Light Bearer', type: 'active', desc: 'You know the Light cantrip. CHA is your spellcasting ability for it.' },
  ],
  subraces: {
    'Protector Aasimar': {
      abilityBonuses: { wis: 1 },
      traits: [
        {
          name: 'Radiant Soul',
          type: 'resource',
          desc: 'Starting at level 3: as a bonus action transform for 1 minute — sprout wings with 30 ft fly speed; once per turn deal extra radiant damage equal to your level on one attack or cantrip. Once per long rest.',
        },
      ],
    },
    'Scourge Aasimar': {
      abilityBonuses: { con: 1 },
      traits: [
        {
          name: 'Radiant Consumption',
          type: 'resource',
          desc: 'Starting at level 3: as a bonus action transform for 1 minute — shed bright light 10 ft, dim 10 ft beyond; at the end of each of your turns you and each creature within 10 ft take radiant damage equal to half your level (you can\'t avoid this); once per turn deal extra radiant damage equal to your level on one attack or cantrip. Once per long rest.',
        },
      ],
    },
    'Fallen Aasimar': {
      abilityBonuses: { str: 1 },
      traits: [
        {
          name: 'Necrotic Shroud',
          type: 'resource',
          desc: 'Starting at level 3: as a bonus action transform for 1 minute — eyes turn into pools of darkness, two skeletal wings sprout from your back; creatures within 10 ft that can see you must CHA save (DC = 8 + prof + CHA mod) or be frightened until end of your next turn; once per turn deal extra necrotic damage equal to your level on one attack or cantrip. Once per long rest.',
        },
      ],
    },
  },
};

DND_RACE_DATA.genasi = {
  abilityBonuses: { con: 2 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Common', 'Primordial'],
  traits: [],
  subraces: {
    'Air Genasi': {
      abilityBonuses: { dex: 1 },
      traits: [
        { name: 'Unending Breath', type: 'passive', desc: 'You can hold your breath indefinitely while not incapacitated.' },
        { name: 'Mingle with the Wind', type: 'resource', desc: 'Cast Levitate on yourself once per long rest without a spell slot. CON is your spellcasting ability.' },
      ],
    },
    'Earth Genasi': {
      abilityBonuses: { str: 1 },
      traits: [
        { name: 'Earth Walk', type: 'passive', desc: 'You can move across difficult terrain made of earth or stone without expending extra movement.' },
        { name: 'Merge with Stone', type: 'resource', desc: 'Cast Pass Without Trace once per long rest without a spell slot. CON is your spellcasting ability.' },
      ],
    },
    'Fire Genasi': {
      abilityBonuses: { int: 1 },
      traits: [
        { name: 'Darkvision', type: 'passive', desc: 'Darkvision 60 ft.' },
        { name: 'Fire Resistance', type: 'passive', desc: 'Resistance to fire damage.' },
        { name: 'Reach to the Blaze', type: 'resource', desc: 'Know Produce Flame cantrip. At level 3: cast Burning Hands once per long rest. CON is your spellcasting ability.' },
      ],
    },
    'Water Genasi': {
      abilityBonuses: { wis: 1 },
      traits: [
        { name: 'Acid Resistance', type: 'passive', desc: 'Resistance to acid damage.' },
        { name: 'Amphibious', type: 'passive', desc: 'You can breathe air and water.' },
        { name: 'Swim', type: 'passive', desc: '30 ft swimming speed.' },
        { name: 'Call to the Wave', type: 'resource', desc: 'Know Shape Water cantrip. At level 3: cast Create or Destroy Water once per long rest. CON is your spellcasting ability.' },
      ],
    },
  },
};

DND_RACE_DATA.goliath = {
  abilityBonuses: { str: 2, con: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Common', 'Giant'],
  traits: [
    {
      name: 'Natural Athlete',
      type: 'passive',
      desc: 'Proficiency in the Athletics skill.',
    },
    {
      name: 'Stone\'s Endurance',
      type: 'resource',
      desc: 'When you take damage, use your reaction to roll a d12 and add your CON modifier — reduce the damage by that total. Once per short or long rest.',
    },
    {
      name: 'Powerful Build',
      type: 'passive',
      desc: 'You count as one size larger when determining carrying capacity and the weight you can push, drag, or lift.',
    },
    {
      name: 'Mountain Born',
      type: 'passive',
      desc: 'Acclimated to high altitude (including elevations above 20,000 ft). Naturally adapted to cold climates.',
    },
  ],
  subraces: {},
};

DND_RACE_DATA.tabaxi = {
  abilityBonuses: { dex: 2, cha: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: 60,
  languages: ['Common', 'One language of your choice'],
  traits: [
    { name: 'Darkvision', type: 'passive', desc: 'See in dim light within 60 ft as bright light; darkness as dim light.' },
    {
      name: 'Feline Agility',
      type: 'resource',
      desc: 'Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can\'t use it again until you move 0 feet on one of your turns.',
    },
    {
      name: 'Cat\'s Claws',
      type: 'active',
      desc: 'Because of your claws, you have a climbing speed of 20 ft. Your claws are natural weapons — 1d4 slashing damage, use STR or DEX modifier.',
    },
    {
      name: 'Cat\'s Talent',
      type: 'passive',
      desc: 'Proficiency in Perception and Stealth.',
    },
  ],
  subraces: {},
};

DND_RACE_DATA.kenku = {
  abilityBonuses: { dex: 2, wis: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Understands Common and Auran but speaks only through mimicry'],
  traits: [
    {
      name: 'Expert Forgery',
      type: 'passive',
      desc: 'You can duplicate other creatures\' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects.',
    },
    {
      name: 'Kenku Training',
      type: 'passive',
      desc: 'Proficiency in two of the following skills of your choice: Acrobatics, Deception, Stealth, and Sleight of Hand.',
    },
    {
      name: 'Mimicry',
      type: 'active',
      desc: 'You can mimic sounds you have heard, including voices. A creature that hears the sounds can tell they are imitations with a successful WIS (Insight) check contested by your CHA (Deception) check.',
    },
  ],
  subraces: {},
};

DND_RACE_DATA.lizardfolk = {
  abilityBonuses: { con: 2, wis: 1 },
  size: 'Medium',
  speed: 30,
  darkvision: null,
  languages: ['Common', 'Draconic'],
  traits: [
    {
      name: 'Swim Speed',
      type: 'passive',
      desc: '30 ft swimming speed.',
    },
    {
      name: 'Bite',
      type: 'active',
      desc: 'Your fanged maw is a natural weapon — 1d6 + STR piercing damage. On a hit, you can use a bonus action to begin grappling the target (bite is used instead of unarmed strike for Bite grapple).',
    },
    {
      name: 'Cunning Artisan',
      type: 'active',
      desc: 'As part of a short rest you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature to create one of: a shield, a club, a javelin, or 1d4 darts or blowgun needles. To use the creature\'s hide, it must be Large or larger.',
    },
    {
      name: 'Hold Breath',
      type: 'passive',
      desc: 'You can hold your breath for up to 15 minutes at a time.',
    },
    {
      name: 'Hunter\'s Lore',
      type: 'passive',
      desc: 'Proficiency in two of the following skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival.',
    },
    {
      name: 'Natural Armor',
      type: 'passive',
      desc: 'You have tough scaly skin. When not wearing armor, your AC is 13 + DEX modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield\'s benefits apply as normal.',
    },
    {
      name: 'Hungry Jaws',
      type: 'resource',
      desc: 'In combat you can throw yourself into a feeding frenzy. As a bonus action you can make a special attack with your bite. If it hits, it deals its normal damage and you gain temporary HP equal to your CON modifier (minimum 1). Once per short or long rest.',
    },
  ],
  subraces: {},
};
