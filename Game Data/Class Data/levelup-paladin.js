// ============================================================
//  D&D 5e CLASS DATA — PALADIN
// ============================================================
LU_CLASS_DATA.paladin = {

  baseFeatures: {
    1:  ['Divine Sense (action: detect celestials, fiends, undead within 60 ft; CHA mod + 1 uses per long rest)', 'Lay on Hands (HP pool = 5× paladin level; action: restore HP from pool or expend 5 HP to cure disease/poison)'],
    2:  ['Fighting Style', 'Spellcasting (CHA-based, prepared spells)', 'Divine Smite (expend spell slot on hit: deal extra 2d8+1d8/slot level radiant, +1d8 vs undead/fiends, max 5d8)'],
    3:  ['Divine Health (immune to disease)', 'Sacred Oath — choose your subclass', 'Channel Divinity (1/rest; two options: one from oath, one shared)'],
    4:  ['ASI / Feat'],
    5:  ['Extra Attack (attack twice)'],
    6:  ['Aura of Protection (you and allies within 10 ft add CHA mod to saving throws while you are conscious)'],
    7:  ['Oath Feature'],
    8:  ['ASI / Feat'],
    9:  ['No new base features'],
    10: ['Aura of Courage (you and allies within 10 ft can\'t be frightened while you are conscious)'],
    11: ['Improved Divine Smite (all melee weapon hits deal extra 1d8 radiant, stacking with Divine Smite)'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Cleansing Touch (action: end one spell on a willing creature; CHA mod uses per long rest)'],
    15: ['Oath Feature'],
    16: ['ASI / Feat'],
    17: ['Aura of Protection and Aura of Courage expand to 30 ft'],
    18: ['Oath Feature'],
    19: ['ASI / Feat'],
    20: ['Sacred Oath Capstone Feature'],
  },

  subclasses: {

    'Oath of Devotion': {
      3:  ['Oath Spells: Protection from Evil and Good, Sanctuary, Lesser Restoration, Zone of Truth', 'Sacred Weapon (Channel Divinity: action — weapon becomes magical, +CHA mod to attacks, sheds bright light 20 ft, lasts 1 minute)', 'Turn the Unholy (Channel Divinity: action — celestials, fiends, undead within 30 ft must WIS save or flee for 1 minute)'],
      7:  ['Aura of Devotion (you and allies within 10 ft can\'t be charmed while you are conscious; expands to 30 ft at level 18)'],
      15: ['Purity of Spirit (always under Protection from Evil and Good)'],
      20: ['Holy Nimbus (action: aura of sunlight 30 ft for 1 minute; enemies starting in or entering the aura take 10 radiant; advantage on saves vs fiend/undead spells; 1/long rest)'],
    },

    'Oath of the Ancients': {
      3:  ['Oath Spells: Speak with Animals, Ensnaring Strike, Moonbeam, Misty Step', 'Nature\'s Wrath (Channel Divinity: action — spectral vines restrain a creature within 10 ft; STR or DEX save to escape; lasts 1 minute)', 'Turn the Faithless (Channel Divinity: action — fey and fiends within 30 ft must WIS save or flee for 1 minute; if unable to flee, disadvantage on attacks against you)'],
      7:  ['Aura of Warding (you and allies within 10 ft have resistance to spell damage; expands to 30 ft at level 18)'],
      15: ['Undying Sentinel (when reduced to 0 HP, drop to 1 HP instead; no aging effects; immune to magical aging; 1/long rest)'],
      20: ['Elder Champion (action: transform for 1 minute — regain 10 HP at start of each turn; cast paladin spells as bonus action; enemies within 10 ft have disadvantage on saves vs paladin spells; 1/long rest)'],
    },

    'Oath of Vengeance': {
      3:  ['Oath Spells: Bane, Hunter\'s Mark, Hold Person, Misty Step', 'Abjure Enemy (Channel Divinity: action — one creature WIS save or frightened and speed 0 for 1 minute; fiends/undead have disadvantage)', 'Vow of Enmity (Channel Divinity: bonus action — advantage on attacks against one creature you can see for 1 minute)'],
      7:  ['Relentless Avenger (when you hit with opportunity attack, move up to half speed immediately; doesn\'t provoke opportunity attacks)'],
      15: ['Soul of Vengeance (when a creature under your Vow of Enmity attacks, use reaction to make a melee attack against it)'],
      20: ['Avenging Angel (action: transform for 1 hour — fly speed 60 ft; creatures within 30 ft must WIS save when you transform or be frightened of you for 1 minute; 1/long rest)'],
    },

    'Oath of Conquest': {
      3:  ['Oath Spells: Armor of Agathys, Command, Hold Person, Spiritual Weapon', 'Conquering Presence (Channel Divinity: action — creatures of your choice within 30 ft must WIS save or be frightened for 1 minute)', 'Guided Strike (Channel Divinity: +10 to an attack roll after seeing the roll; same as War Cleric)'],
      7:  ['Aura of Conquest (frightened creatures in your aura have speed 0 and take 1d4 psychic at start of their turn; expands to 30 ft at level 18)'],
      15: ['Scornful Rebuke (when hit by an attack, the attacker takes psychic damage equal to your CHA mod)'],
      20: ['Invincible Conqueror (action: transform for 1 minute — resistance to all damage; extra attack on each Attack action; crits on 19–20; 1/long rest)'],
    },

    'Oath of Redemption': {
      3:  ['Oath Spells: Sanctuary, Sleep, Calm Emotions, Hold Person', 'Emissary of Peace (Channel Divinity: bonus action — +5 to Persuasion for 10 minutes)', 'Rebuke the Violent (Channel Divinity: reaction when ally within 60 ft is damaged — attacker takes radiant damage equal to the damage dealt; WIS save for half)'],
      7:  ['Aura of the Guardian (reaction: you take the damage that a creature within 10 ft would take; expands to 30 ft at level 18)'],
      15: ['Protective Spirit (at end of your turn, if below half HP and not incapacitated, regain 1d6 + half paladin level HP)'],
      20: ['Emissary of Redemption (resistance to all damage from creatures; when a creature damages you, it takes half as much radiant; ends if you attack it or cast a spell at it; 1/long rest)'],
    },

    'Oath of Glory': {
      3:  ['Oath Spells: Guiding Bolt, Heroism, Enhance Ability, Magic Weapon', 'Inspiring Smite (Channel Divinity: immediately after Divine Smite, distribute temp HP equal to 2d8 + paladin level among any creatures within 30 ft)', 'Peerless Athlete (Channel Divinity: bonus action — advantage on Athletics and Acrobatics; double carrying capacity; jump distance doubles; 10 minutes)'],
      7:  ['Aura of Alacrity (your walk speed increases by 10 ft; allies starting turn within 5 ft gain +10 walk speed for that turn; expands to 10-ft aura at level 18)'],
      15: ['Glorious Defense (reaction: when you or an ally within 10 ft is hit — add CHA mod to AC for that attack; if it misses, make a weapon attack against the attacker; CHA mod uses per long rest)'],
      20: ['Living Legend (bonus action: for 1 minute — charismatic; Persuasion automatically succeeds vs nonhostile creatures; weapon attacks gain +CHA mod; if you miss, reroll once and use new result; 1/long rest)'],
    },

    'Oath of the Watchers': {
      3:  ['Oath Spells: Alarm, Detect Magic, Moonbeam, See Invisibility', 'Abjure the Extraplanar (Channel Divinity: action — aberrations, celestials, elementals, fey, fiends within 30 ft must WIS save or flee for 1 minute)', 'Watcher\'s Will (Channel Divinity: action — you and allies within 30 ft have advantage on INT/WIS/CHA saves vs creatures for 1 minute)'],
      7:  ['Aura of the Sentinel (you and allies within 10 ft add proficiency bonus to Initiative; expands to 30 ft at level 18)'],
      15: ['Vigilant Rebuke (reaction when you or an ally within 30 ft succeeds on INT/WIS/CHA save: deal 2d8 + CHA mod force damage to the creature that caused the save)'],
      20: ['Mortal Bulwark (bonus action: for 1 minute — truesight 120 ft; advantage on attacks vs aberrations/celestials/elementals/fey/fiends; when you hit them, you can banish them — CHA save; 1/long rest)'],
    },

    'Oathbreaker': {
      3:  ['Oath Spells: Hellish Rebuke, Inflict Wounds, Crown of Madness, Darkness', 'Channel Divinity: Control Undead (undead within 30 ft must WIS save or be charmed for 24 hours)', 'Channel Divinity: Dreadful Aspect (creatures of your choice within 30 ft must WIS save or be frightened for 1 minute)'],
      7:  ['Aura of Hate (you and undead/fiends within 10 ft add CHA mod to melee damage rolls; expands to 30 ft at level 18)'],
      15: ['Supernatural Resistance (resistance to bludgeoning, piercing, and slashing from non-magical weapons)'],
      20: ['Dread Lord (action: 30-ft aura for 1 minute — dim light, enemies disadvantaged on saves, fearful creatures take 4d10 psychic, shadows attack non-deathly creatures; 1/long rest)'],
    },
  },
};
