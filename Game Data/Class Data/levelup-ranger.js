// ============================================================
//  D&D 5e CLASS DATA — RANGER
// ============================================================
LU_CLASS_DATA.ranger = {

  baseFeatures: {
    1:  ['Favored Enemy (advantage on Survival to track, INT checks to recall info; +2 damage vs chosen type)', 'Natural Explorer (choose a Favored Terrain; double prof on related skills; bonus navigation/tracking benefits)'],
    2:  ['Fighting Style', 'Spellcasting (WIS-based)'],
    3:  ['Ranger Conclave — choose your subclass', 'Primeval Awareness (expend spell slot: sense creatures of favored enemy type within 1 mile for 1 min per slot level)'],
    4:  ['ASI / Feat'],
    5:  ['Extra Attack (attack twice)'],
    6:  ['Additional Favored Enemy', 'Additional Favored Terrain', 'Fleet of Foot (Dash as bonus action)'],
    7:  ['Conclave Feature', 'Hide in Plain Sight (spend 1 minute creating camouflage; +10 Stealth while motionless in natural surroundings)'],
    8:  ['ASI / Feat', 'Land\'s Stride (non-magical difficult terrain costs no extra movement; plants can\'t magically impede you; advantage on saves vs plant-based effects)'],
    9:  ['No new base features'],
    10: ['Additional Favored Enemy', 'Additional Favored Terrain', 'Vanish (Hide as bonus action; can\'t be tracked by non-magical means)'],
    11: ['Conclave Feature'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Vanish upgrade: can\'t be magically tracked unless you choose to be'],
    15: ['Conclave Feature'],
    16: ['ASI / Feat'],
    17: ['No new base features'],
    18: ['Feral Senses (no disadvantage on attacks vs invisible creatures within 30 ft; aware of invisible creatures in your space even if you can\'t see them)'],
    19: ['ASI / Feat'],
    20: ['Foe Slayer (add WIS mod to one attack OR damage roll against favored enemy once per turn)'],
  },

  subclasses: {

    'Hunter': {
      3:  ['Hunter\'s Prey — choose one: Colossus Slayer (once per turn: extra 1d8 damage vs creature below max HP), Giant Killer (reaction to attack Large+ creature that misses you within 5 ft), or Horde Breaker (once per turn: attack a second creature within 5 ft of first target with same attack)'],
      7:  ['Defensive Tactics — choose one: Escape the Horde (no opportunity attack disadvantage from you), Multiattack Defense (+4 AC after being hit once per turn by the attacker), or Steel Will (advantage on saves vs frightened)'],
      11: ['Multiattack — choose one: Volley (action: ranged attack against all creatures within 10 ft of a point in range) or Whirlwind Attack (action: melee attack against any creatures within 5 ft)'],
      15: ['Superior Hunter\'s Defense — choose one: Evasion (DEX saves), Stand Against the Tide (reaction: redirect miss to another creature), or Uncanny Dodge (reaction: halve damage from one attack)'],
    },

    'Beast Master': {
      3:  ['Ranger\'s Companion (bond with a beast companion of CR 1/4 or lower; it uses your proficiency bonus; can command it as bonus action to Attack, Dash, Disengage, Dodge, or Help)'],
      7:  ['Exceptional Training (on your turn, if you don\'t command companion to attack, it can take Dash, Disengage, Dodge, or Help as bonus action; companion\'s attacks count as magical)'],
      11: ['Bestial Fury (companion can make two attacks or use Multiattack when commanded to attack)'],
      15: ['Share Spells (when you cast a spell targeting yourself, you can also target the beast companion)'],
    },

    'Gloom Stalker': {
      3:  ['Gloom Stalker Magic (always prepared: Disguise Self, Rope Trick, Fear, Greater Invisibility, Seeming)', 'Dread Ambusher (add WIS mod to Initiative; first round of combat: +10 speed, one extra weapon attack that deals +1d8 damage)', 'Umbral Sight (darkvision 60 ft or +60 ft to existing; invisible to creatures that rely on darkvision to see you in darkness)'],
      7:  ['Iron Mind (proficiency in WIS saves; or CHA if already proficient in WIS)'],
      11: ['Stalker\'s Flurry (once per turn, if you miss an attack, immediately make another attack against the same target)'],
      15: ['Shadowy Dodge (reaction when targeted by attack: impose disadvantage; can use even if attacker has advantage)'],
    },

    'Horizon Walker': {
      3:  ['Horizon Walker Magic (always prepared: Protection from Evil and Good, Misty Step, Haste, Banishment, Teleportation Circle)', 'Detect Portal (action: detect planar portals within 1 mile; 1/short rest)', 'Planar Warrior (bonus action: choose a creature within 30 ft; your first hit against it this turn deals force damage instead of its normal type + 1d8 extra force)'],
      7:  ['Ethereal Step (bonus action: cast Etherealness at will with a 1-round duration; 1/short rest at level 7; can do it every turn by level 11)'],
      11: ['Distant Strike (when you take the Attack action, you can teleport 10 ft before each attack; if you attack two different creatures in one action, make one extra attack)'],
      15: ['Spectral Defense (reaction when hit: resistance to all damage from that hit)'],
    },

    'Monster Slayer': {
      3:  ['Monster Slayer Magic (always prepared: Protection from Evil and Good, Zone of Truth, Magic Circle, Banishment, Hold Monster)', 'Hunter\'s Sense (action: learn immunities, resistances, and vulnerabilities of one creature within 60 ft; 1/short rest)', 'Slayer\'s Prey (bonus action: mark a creature; deal +1d6 to first hit against it each turn; lasts until you use it again or short rest)'],
      7:  ['Supernatural Defense (add 1d6 to saves and grapple checks against creature marked by Slayer\'s Prey)'],
      11: ['Magic-User\'s Nemesis (reaction when creature within 60 ft casts a spell or teleports: choose one — counterspell (DC = 10 + spell level) or prevent teleport (WIS save); 1/short rest)'],
      15: ['Slayer\'s Counter (reaction when Slayer\'s Prey target makes you make a save: make one weapon attack against it; if you hit, auto-succeed on the save)'],
    },

    'Fey Wanderer': {
      3:  ['Fey Wanderer Magic (always prepared: Charm Person, Misty Step, Dispel Magic, Dimension Door, Mislead)', 'Dreadful Strikes (deal extra 1d4 psychic on each weapon hit; 1/turn; increases to 1d6 at level 11)', 'Otherworldly Glamour (add WIS mod to CHA checks; proficiency in Deception, Performance, or Persuasion)'],
      7:  ['Beguiling Twist (reaction when a creature within 120 ft succeeds on a charm/frighten save: redirect the effect to a different creature within 30 ft of the first; WIS save)'],
      11: ['Fey Reinforcements (Summon Fey once per long rest without slot; can cast again with slots; concentration optional if summoned this way)'],
      15: ['Misty Wanderer (Misty Step can bring one willing creature within 5 ft along; cast it prof bonus times per long rest without expending a slot)'],
    },

    'Swarmkeeper': {
      3:  ['Swarmkeeper Magic (always prepared: Faerie Fire, Web, Gaseous Form, Arcane Eye, Insect Plague)', 'Gathered Swarm (bonus action after hitting: choose one — deal extra 1d6 piercing to same target, knock target prone (STR save), or move yourself 5 ft to an unoccupied space)', 'Writhing Tide (bonus action: your swarm carries you — fly speed 10 ft for 1 minute; 1/short rest)'],
      7:  ['Writhing Tide upgrade: fly speed increases to 30 ft'],
      11: ['Mighty Swarm (Gathered Swarm extra damage increases to 1d8; prone is STR save or automatically prone; movement becomes 10 ft in any direction)'],
      15: ['Swarming Dispersal (reaction when you take damage: become resistant to that damage and teleport up to 30 ft; 1/short rest)'],
    },
  },
};
