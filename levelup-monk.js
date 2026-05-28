// ============================================================
//  D&D 5e CLASS DATA — MONK
// ============================================================
LU_CLASS_DATA.monk = {

  baseFeatures: {
    1:  ['Unarmored Defense (AC = 10 + DEX + WIS, no armor/shield)', 'Martial Arts (unarmed and monk weapons use d4; use DEX for attacks; bonus action unarmed strike)'],
    2:  ['Ki (2 points; DC = 8 + prof + WIS; Flurry of Blows, Patient Defense, Step of the Wind)', 'Unarmored Movement (+10 ft speed)', 'Dedicated Weapon (bonus action: make one simple/martial weapon a monk weapon for today)'],
    3:  ['Monastic Tradition — choose your subclass', 'Deflect Missiles (reaction: reduce ranged weapon damage by 1d10+DEX+monk level; if reduced to 0, catch and throw as an attack)', 'Ki-Fueled Attack (after spending Ki as bonus action: make an unarmed strike as bonus action)'],
    4:  ['ASI / Feat', 'Slow Fall (reaction: reduce fall damage by 5× monk level)', 'Quickened Healing (action + 2 Ki: regain 1d6 + prof bonus HP)'],
    5:  ['Extra Attack (attack twice)', 'Stunning Strike (after hitting with attack: spend 1 Ki, target CON save or stunned until end of your next turn)', 'Martial Arts: d6'],
    6:  ['Ki-Empowered Strikes (unarmed strikes count as magical)', 'Tradition Feature', 'Focused Aim (miss with attack: spend 1–3 Ki to add 2 per Ki to the attack roll)'],
    7:  ['Evasion (DEX saves that deal half damage on success deal none; no damage on failed save if you succeed)', 'Stillness of Mind (action: end one charm or fear effect on yourself)'],
    8:  ['ASI / Feat', 'Unarmored Movement (+15 ft speed)'],
    9:  ['Unarmored Movement: walk along vertical surfaces and across liquids during your turn'],
    10: ['Purity of Body (immune to disease and poison)', 'Martial Arts: d8'],
    11: ['Tradition Feature'],
    12: ['ASI / Feat'],
    13: ['Tongue of the Sun and Moon (understand and be understood by any creature with a language)'],
    14: ['Diamond Soul (proficiency in all saving throws; spend 1 Ki to reroll a failed save)', 'Unarmored Movement (+20 ft speed)'],
    15: ['Timeless Body (no longer age magically; immune to magical aging; need no food or water)', 'Martial Arts: d10'],
    16: ['ASI / Feat'],
    17: ['Tradition Feature'],
    18: ['Empty Body (action + 4 Ki: invisible + resistance to all damage except force for 1 minute; OR 8 Ki: cast Astral Projection without material components)'],
    19: ['ASI / Feat', 'Unarmored Movement (+25 ft speed)'],
    20: ['Perfect Self (regain 4 Ki on Initiative if you have 0)', 'Martial Arts: d12'],
  },

  subclasses: {

    'Way of the Open Hand': {
      3:  ['Open Hand Technique (when you hit with Flurry of Blows: choose one effect per hit — push target 15 ft, knock prone (DEX save), or prevent reaction until end of your next turn)'],
      6:  ['Wholeness of Body (action: regain HP equal to 3× monk level; 1/long rest)'],
      11: ['Tranquility (at end of long rest gain Sanctuary effect (DC = Ki save) until you attack/cast a spell; does not end on saving throw success)'],
      17: ['Quivering Palm (spend 3 Ki when you hit: set up vibrations in target; within 1 month use action to choose 0 HP or 10d10 necrotic (CON save for half); only one active at a time)'],
    },

    'Way of Shadow': {
      3:  ['Shadow Arts (spend 2 Ki: cast Darkness, Darkvision, Pass Without Trace, or Silence without components)', 'If you are in dim light or darkness, step into a shadow within 60 ft as a bonus action (Shadow Step) — then advantage on first melee attack before end of turn'],
      6:  ['Shadow Step (move from one shadow to another within 60 ft as bonus action; advantage on next melee attack)'],
      11: ['Cloak of Shadows (action: become invisible in dim light or darkness until you attack/cast a spell or enter bright light)'],
      17: ['Opportunist (reaction: make one melee attack against a creature that an ally just hit)'],
    },

    'Way of the Four Elements': {
      3:  ['Disciple of the Elements (choose 2 elemental disciplines; each costs Ki to activate)', 'Notable disciplines: Fangs of the Fire Snake (1 Ki: melee reach +10 ft, 1d10 fire), Fist of Four Thunders (2 Ki: Thunderwave), Fist of Unbroken Air (2 Ki: ranged push/damage), Rush of the Gale Spirits (2 Ki: Gust of Wind), Sweeping Cinder Strike (2 Ki: Burning Hands), Water Whip (2 Ki: whip attack, pull or knock prone)'],
      6:  ['Learn 1 additional elemental discipline'],
      11: ['Learn 1 additional elemental discipline; disciplines that replicate spells can use higher-level versions'],
      17: ['Learn 1 additional elemental discipline; disciplines that replicate spells can use higher-level versions up to 5th level'],
    },

    'Way of the Drunken Master': {
      3:  ['Bonus Proficiency: Performance', 'Drunken Technique (when using Flurry of Blows: gain Disengage and +10 ft movement this turn)', 'Tipsy Sway: Leap to Your Feet (standing from prone costs 5 ft instead of half your speed)'],
      6:  ['Tipsy Sway: Redirect Attack (reaction when you are missed by an attack: cause the attack to hit a different creature within 5 ft of you; 1 Ki)'],
      11: ['Drunkard\'s Luck (when you make an ability check, attack, or save with disadvantage, spend 2 Ki to cancel the disadvantage)'],
      17: ['Intoxicated Frenzy (during Flurry of Blows, make up to 3 additional unarmed strikes — each only if the previous hit a different target)'],
    },

    'Way of the Kensei': {
      3:  ['Path of the Kensei (choose 2 Kensei weapons: 1 melee, 1 ranged; these become monk weapons; ranged Kensei weapon ammo is free; +2 AC if you attack with melee Kensei weapon and have other hand free or carry only Kensei weapons)', 'Kensei\'s Shot (bonus action: ranged Kensei weapon attack deals extra 1d4 damage this turn)'],
      6:  ['One with the Blade (Kensei weapons count as magical; spend 1 Ki to make melee Kensei weapon attacks deal magic damage and +1d4 for 1 minute)', 'Choose 1 more Kensei weapon'],
      11: ['Sharpen the Blade (bonus action: spend 1–3 Ki to grant Kensei weapon +1/+2/+3 to attack and damage for 1 minute; no effect on already-enchanted weapons)', 'Choose 1 more Kensei weapon'],
      17: ['Unerring Accuracy (once per turn: reroll a miss on a monk weapon attack)'],
    },

    'Way of the Sun Soul': {
      3:  ['Radiant Sun Bolt (ranged spell attack using DEX or STR, deals 1d4+DEX radiant; bonus action: spend 1 Ki for a second bolt)', 'Searing Arc Strike (spend 2+ Ki to cast Burning Hands as bonus action after attacking; uses 1 Ki per spell level beyond 1st)'],
      6:  ['Searing Sunburst (action: 20-ft radius sphere of light; CON save or take 2d6 radiant; spend 1–3 Ki to add 2d6 per Ki; 1/long rest base)'],
      11: ['Sun Shield (shed bright light in 30-ft radius; reaction when hit in melee: attacker takes radiant damage equal to 5 + WIS mod)'],
      17: ['Radiant Sun Bolt damage increases to 1d6 base; Searing Arc Strike gains 2 additional Ki options'],
    },

    'Way of the Astral Self': {
      3:  ['Arms of the Astral Self (spend 1 Ki: summon astral arms for 10 minutes; gain 10-ft reach, can use WIS instead of STR/DEX for attack and damage, make an extra attack with astral arms as bonus action dealing 1d6 force)'],
      6:  ['Visage of the Astral Self (spend 1 Ki: summon astral visage for 10 minutes; darkvision 120 ft, advantage on Insight/Intimidation, speak and understand any language)'],
      11: ['Body of the Astral Self (spend 3 Ki while arms or visage active: summon full astral form; reaction to reduce damage by 1d10 + WIS + prof; +2 attacks with Flurry of Blows; astral arms reach increases to 10 ft)'],
      17: ['Awakened Astral Self (spend 5 Ki to fully awaken: arms and visage active for free, bonus action attack at start of each turn dealing 2d6 force, +2 AC)'],
    },

    'Way of Mercy': {
      3:  ['Implements of Mercy (proficiency in Insight and Medicine; Herbalism Kit)', 'Hand of Healing (spend 1 Ki as part of Flurry of Blows or as action: touch a creature to restore 1d6 + WIS mod HP; end one disease, blind, deaf, paralyzed, poisoned, or stunned condition)', 'Hand of Harm (once per turn when you hit with unarmed strike: spend 1 Ki to deal extra 1d6 + WIS mod necrotic and possibly inflict Poisoned — CON save; 1 use without Ki cost per long rest)'],
      6:  ['Physician\'s Touch (Hand of Healing can additionally end one disease or condition; Hand of Harm can additionally poison a creature — CON save; both at no extra Ki cost)'],
      11: ['Flurry of Healing and Harm (use Hand of Healing with each hit of Flurry of Blows at no extra Ki; one use of Hand of Harm per Flurry at no extra Ki)'],
      17: ['Hand of Ultimate Mercy (spend 5 Ki, touch creature dead ≤ 24 hours: revive it with 4d10 + WIS mod HP; 1/long rest)'],
    },
  },
};
