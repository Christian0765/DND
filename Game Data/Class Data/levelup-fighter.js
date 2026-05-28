// ============================================================
//  D&D 5e CLASS DATA — FIGHTER
// ============================================================
LU_CLASS_DATA.fighter = {

  baseFeatures: {
    1:  ['Fighting Style (choose one combat specialisation)', 'Second Wind (bonus action: regain 1d10 + fighter level HP; 1/short rest)'],
    2:  ['Action Surge (take one additional action on your turn; 1/short rest)'],
    3:  ['Martial Archetype — choose your subclass'],
    4:  ['ASI / Feat'],
    5:  ['Extra Attack (attack twice per Attack action)'],
    6:  ['ASI / Feat'],
    7:  ['Archetype Feature'],
    8:  ['ASI / Feat'],
    9:  ['Indomitable (reroll a failed saving throw, must keep new result; 1/long rest)'],
    10: ['Archetype Feature'],
    11: ['Extra Attack (attack 3 times per Attack action)'],
    12: ['ASI / Feat'],
    13: ['Indomitable (2 uses per long rest)'],
    14: ['ASI / Feat'],
    15: ['Archetype Feature'],
    16: ['ASI / Feat'],
    17: ['Action Surge (2 uses per short rest)', 'Indomitable (3 uses per long rest)'],
    18: ['Archetype Feature'],
    19: ['ASI / Feat'],
    20: ['Extra Attack (attack 4 times per Attack action)'],
  },

  subclasses: {

    'Champion': {
      3:  ['Improved Critical (score a critical hit on a 19 or 20)'],
      7:  ['Remarkable Athlete (add half proficiency bonus, rounded up, to STR/DEX/CON checks you\'re not proficient in; running long jump distance increases by STR mod feet)'],
      10: ['Additional Fighting Style (choose a second Fighting Style option)'],
      15: ['Superior Critical (score a critical hit on an 18, 19, or 20)'],
      18: ['Survivor (at the start of each of your turns when you have fewer than half your HP max but at least 1 HP, regain HP equal to 5 + CON mod)'],
    },

    'Battle Master': {
      3:  ['Combat Superiority (4 Superiority Dice — d8; learn 3 maneuvers from the list)', 'Student of War (proficiency with one type of artisan\'s tools)', 'Know Your Enemy (spend 1 minute observing a creature to learn if they are superior, inferior, or equal to you in 2 of: STR, DEX, CON, AC, current HP, total class levels, fighter levels)'],
      7:  ['Combat Superiority (5 Superiority Dice; learn 2 more maneuvers)', 'Superiority Dice upgrade to d10 at level 10'],
      10: ['Improved Combat Superiority (Superiority Dice become d10; learn 2 more maneuvers)'],
      15: ['Relentless (if you have no Superiority Dice when you roll Initiative, regain 1 die)', 'Combat Superiority (6 Superiority Dice; learn 2 more maneuvers)'],
      18: ['Combat Superiority (Superiority Dice become d12)'],
    },

    'Eldritch Knight': {
      3:  ['Spellcasting (INT-based; learn Wizard spells — 2 must be Abjuration or Evocation until level 10)', 'Weapon Bond (bond up to 2 weapons; can\'t be disarmed; teleport bonded weapon to your hand as bonus action)'],
      7:  ['War Magic (when you use your action to cast a cantrip, make one weapon attack as a bonus action)'],
      10: ['Eldritch Strike (when you hit a creature with a weapon, it has disadvantage on its next saving throw against a spell you cast before end of your next turn)'],
      15: ['Arcane Charge (when you use Action Surge, teleport up to 30 ft to an unoccupied space before or after the extra action)'],
      18: ['Improved War Magic (when you use your action to cast any spell, make one weapon attack as a bonus action)'],
    },

    'Arcane Archer': {
      3:  ['Arcane Archer Lore (proficiency in Arcana or Nature)', 'Arcane Shot (2 uses/short rest; choose 2 options: Banishing, Beguiling, Bursting, Enfeebling, Grasping, Piercing, Seeking, or Shadow Arrow)'],
      7:  ['Curving Shot (miss with Arcane Shot: reuse the arrow against a different target within 60 ft of the original)', 'Magic Arrow (non-magical arrows become magical)'],
      10: ['Arcane Shot (3 uses; learn one more option; die becomes d6 for eligible shots)'],
      15: ['Ever-Ready Shot (regain one Arcane Shot use on Initiative if you have none)'],
      18: ['Arcane Shot (save DC increases; die becomes d8 for eligible shots; learn one more option)'],
    },

    'Cavalier': {
      3:  ['Bonus Proficiency (Animal Handling or one language)', 'Born to the Saddle (advantage on saves to avoid falling off mount; mounting/dismounting costs 5 ft; if mount is knocked prone you can land on your feet)', 'Unwavering Mark (when you hit a creature, mark it until end of your next turn; marked creature has disadvantage on attacks against targets other than you; if marked creature hits another target, use bonus action to make one weapon attack against it)'],
      7:  ['Warding Maneuver (use reaction when you or an adjacent ally is hit: add 1d8 to the target\'s AC for that attack; if it still hits, the attacker takes 1d8 damage; CON mod uses per long rest)'],
      10: ['Hold the Line (creatures provoke opportunity attacks when they move within your reach; if you hit, their speed is 0 for the rest of their turn)'],
      15: ['Ferocious Charger (if you move 10+ ft in a straight line before hitting, target must STR save or be knocked prone; 1/turn)'],
      18: ['Vigilant Defender (take opportunity attacks against every separate creature within reach that moves; no action cost on your turn; only outside your turn)'],
    },

    'Samurai': {
      3:  ['Bonus Proficiency (History, Insight, Performance, or Persuasion — or one language)', 'Fighting Spirit (bonus action: advantage on weapon attacks this turn + 5 temp HP; 3/long rest. Temp HP scales to 10 at level 10, 15 at level 15)'],
      7:  ['Elegant Courtier (add WIS mod to Persuasion checks; WIS saving throw proficiency — or another save if already proficient)'],
      10: ['Tireless Spirit (roll Initiative with 0 Fighting Spirit uses: regain 1 use)'],
      15: ['Rapid Strike (forego advantage on one attack to make an additional attack as a bonus action; 1/turn)'],
      18: ['Strength before Death (when reduced to 0 HP, delay dying until end of current turn; immediately take an extra turn, though you can\'t regain HP; 1/long rest)'],
    },

    'Psi Warrior': {
      3:  ['Psionic Power (Psionic Energy Dice — d6 equal to twice prof bonus; replenish one die as bonus action 1/long rest; replenish all on short rest)', 'Protective Field (reaction: spend 1 die to reduce damage a visible ally within 30 ft takes by roll + INT mod)', 'Psionic Strike (after hitting with a weapon: spend 1 die for extra force damage equal to roll + INT mod)', 'Telekinetic Movement (use action + 1 die: move a Large or smaller creature/object within 30 ft up to 30 ft in a direction you choose)'],
      7:  ['Telekinetic Adept — Psi-Powered Leap (bonus action: fly speed equal to twice walking speed until end of turn; 1/turn, 1 die)', 'Telekinetic Adept — Focused Telekinesis (action: impose STR or DEX save on target within 30 ft or teleport them 30 ft; 1 die)'],
      10: ['Guarded Mind (spend 1 die as reaction to gain resistance to psychic damage; end charm and frighten effects on yourself)'],
      15: ['Bulwark of Force (bonus action: choose INT mod creatures (including yourself) within 30 ft to have half cover for 1 minute; 1 die; 1/long rest)'],
      18: ['Telekinetic Master (cast Telekinesis at will without a spell slot using INT; while concentrating on it, make one weapon attack as bonus action each turn)'],
    },

    'Rune Knight': {
      3:  ['Bonus Proficiency (Smith\'s Tools)', 'Rune Carving (learn 2 runes; inscribe into weapons/armor/clothing; each rune has an active and passive effect)', 'Giant\'s Might (bonus action: grow to Large, gain advantage on STR checks and saves, deal extra 1d6 on weapon attacks; 1/short rest. Lasts 1 minute)'],
      7:  ['Runic Shield (reaction: impose disadvantage on an attack roll against a visible ally within 60 ft; 1/turn)', 'Learn 1 more rune (3 total)'],
      10: ['Great Stature (Giant\'s Might lets you become Large if you\'re already Medium or smaller; +1d6 on weapon attacks while large; grow 3d4 inches permanently)', 'Learn 1 more rune (4 total)'],
      15: ['Master of Runes (invoke each rune twice instead of once per short/long rest)', 'Learn 1 more rune (5 total)'],
      18: ['Runic Juggernaut (Giant\'s Might can make you Huge, increasing reach by 5 ft and the weapon damage die to 1d8; learn 1 more rune — 6 total)'],
    },
  },
};
