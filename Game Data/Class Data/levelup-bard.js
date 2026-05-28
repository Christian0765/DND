// ============================================================
//  D&D 5e CLASS DATA — BARD
// ============================================================
LU_CLASS_DATA.bard = {

  baseFeatures: {
    1:  ['Bardic Inspiration (d6, CHA mod uses per long rest)', 'Spellcasting (CHA-based)'],
    2:  ['Jack of All Trades (add half prof bonus to any check you\'re not proficient in)', 'Song of Rest (d6 — allies regain extra HP on short rest)'],
    3:  ['Bard College — choose your subclass', 'Expertise (double proficiency in 2 skills)'],
    4:  ['ASI / Feat'],
    5:  ['Bardic Inspiration: d8', 'Font of Inspiration (regain all Bardic Inspiration uses on short rest)'],
    6:  ['Countercharm (action to grant advantage on saves vs charm/frighten to allies within 30 ft)', 'College Feature'],
    7:  ['No new base features'],
    8:  ['ASI / Feat'],
    9:  ['Song of Rest: d8'],
    10: ['Bardic Inspiration: d10', 'Expertise (2 more skills)', 'Magical Secrets (learn 2 spells from any class list)'],
    11: ['No new base features'],
    12: ['ASI / Feat'],
    13: ['Song of Rest: d10'],
    14: ['Magical Secrets (2 more spells from any class)', 'College Feature'],
    15: ['Bardic Inspiration: d12'],
    16: ['ASI / Feat'],
    17: ['Song of Rest: d12'],
    18: ['Magical Secrets (2 more spells from any class)'],
    19: ['ASI / Feat'],
    20: ['Superior Inspiration (regain 1 Bardic Inspiration die on Initiative if you have 0)'],
  },

  subclasses: {

    'College of Lore': {
      3:  ['Bonus Proficiencies (3 skills of your choice)', 'Cutting Words (use Bardic Inspiration die to subtract from an enemy\'s attack roll, ability check, or damage roll as a reaction)'],
      6:  ['Additional Magical Secrets (learn 2 spells from any class list — earlier than normal)'],
      14: ['Peerless Skill (when you fail an ability check, expend a Bardic Inspiration die and add the result to the check)'],
    },

    'College of Valor': {
      3:  ['Bonus Proficiencies (medium armor, shields, martial weapons)', 'Combat Inspiration (allies can use Bardic Inspiration die to add to a weapon damage roll OR AC against one attack)'],
      6:  ['Extra Attack (attack twice per Attack action)'],
      14: ['Battle Magic (when you use your action to cast a bard spell, make one weapon attack as a bonus action)'],
    },

    'College of Glamour': {
      3:  ['Mantle of Inspiration (bonus action: expend Bardic Inspiration to give up to CHA mod allies temp HP equal to the die roll + bard level, and each can immediately move their speed without provoking opportunity attacks)', 'Enthralling Performance (1 minute performance charms up to CHA mod humanoids for 1 hour; WIS save)'],
      6:  ['Mantle of Majesty (bonus action: cast Command without a spell slot for 1 minute, CHA mod times per long rest)'],
      14: ['Unbreakable Majesty (bonus action: anyone who attacks you must CHA save or target a different creature; lasts until start of your next turn; 1/short rest)'],
    },

    'College of Swords': {
      3:  ['Bonus Proficiencies (medium armor, scimitars)', 'Fighting Style (Dueling or Two-Weapon Fighting)', 'Blade Flourish (when you attack, you can expend a Bardic Inspiration die for one of: Defensive Flourish +die to damage and AC, Slashing Flourish deals die damage to a second creature, or Mobile Flourish pushes the target and lets you move toward it)'],
      6:  ['Extra Attack (attack twice per Attack action)'],
      14: ['Master\'s Flourish (when you use Blade Flourish you can roll a d6 instead of expending a Bardic Inspiration die)'],
    },

    'College of Whispers': {
      3:  ['Psychic Blades (when you hit with a weapon attack, expend a Bardic Inspiration die to deal extra psychic damage: 2d6 at level 3, 3d6 at level 5, 5d6 at level 10, 8d6 at level 15)', 'Words of Terror (1 minute conversation instills terror; WIS save or frightened of you for 1 hour; 1/short rest)'],
      6:  ['Mantle of Whispers (reaction when a humanoid dies within 30 ft: capture their shadow and assume their appearance for 1 hour; gain their surface memories; 1/short rest)'],
      14: ['Shadow Lore (whisper to a creature that can hear you; WIS save or be frightened and do your bidding for 8 hours; 1/long rest)'],
    },

    'College of Creation': {
      3:  ['Mote of Potential (Bardic Inspiration dice give bonus effects: ability checks roll the die twice, attack rolls deal extra thunder damage, saving throws grant temp HP equal to the roll)', 'Performance of Creation (action: expend a Bardic Inspiration die to conjure one non-magical item worth up to 20gp × die roll; lasts hours equal to prof bonus; 1/long rest, or reuse with a 2nd-level slot)'],
      6:  ['Animating Performance (action: animate a Large or smaller object as a Dancing Item construct; acts on your initiative, follows your commands; lasts 1 hour; 1/long rest or 3rd-level slot)'],
      14: ['Creative Crescendo (you can maintain up to prof bonus conjured items from Performance of Creation simultaneously; items no longer expire when you create new ones)'],
    },

    'College of Eloquence': {
      3:  ['Silver Tongue (treat a roll of 9 or lower as 10 on Persuasion and Deception checks)', 'Unsettling Words (bonus action: expend Bardic Inspiration die; target subtracts the roll from its next saving throw before your next turn)'],
      6:  ['Unfailing Inspiration (if an ally fails a check after using your Bardic Inspiration die, they keep the die)', 'Universal Speech (speak to any creature that can understand a language; INT mod creatures understand you as if using Comprehend Languages; 1/long rest)'],
      14: ['Infectious Inspiration (when a creature succeeds using your Bardic Inspiration, you can give a free die to another creature within 60 ft as a reaction; CHA mod times per long rest)'],
    },
  },
};
