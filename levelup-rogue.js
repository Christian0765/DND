// ============================================================
//  D&D 5e CLASS DATA — ROGUE
// ============================================================
LU_CLASS_DATA.rogue = {

  baseFeatures: {
    1:  ['Expertise (double proficiency in 2 skills or tools)', 'Sneak Attack (1d6 — extra damage when you have advantage or an ally is adjacent to target)', 'Thieves\' Cant (secret language of rogues)'],
    2:  ['Cunning Action (bonus action: Dash, Disengage, or Hide)'],
    3:  ['Roguish Archetype — choose your subclass', 'Sneak Attack: 2d6'],
    4:  ['ASI / Feat'],
    5:  ['Uncanny Dodge (reaction: halve damage from one attack you can see)', 'Sneak Attack: 3d6'],
    6:  ['Expertise (2 more skills or tools)', 'Sneak Attack: 3d6'],
    7:  ['Evasion (DEX saves that deal half damage on success deal none on fail too)', 'Sneak Attack: 4d6'],
    8:  ['ASI / Feat', 'Sneak Attack: 4d6'],
    9:  ['Archetype Feature', 'Sneak Attack: 5d6'],
    10: ['ASI / Feat', 'Sneak Attack: 5d6'],
    11: ['Reliable Talent (treat any roll of 9 or lower as 10 on proficient ability checks)', 'Sneak Attack: 6d6'],
    12: ['ASI / Feat', 'Sneak Attack: 6d6'],
    13: ['Archetype Feature', 'Sneak Attack: 7d6'],
    14: ['Blindsense (aware of hidden creatures within 10 ft if you can hear)', 'Sneak Attack: 7d6'],
    15: ['Slippery Mind (gain proficiency in WIS saves)', 'Sneak Attack: 8d6'],
    16: ['ASI / Feat', 'Sneak Attack: 8d6'],
    17: ['Archetype Feature', 'Sneak Attack: 9d6'],
    18: ['Elusive (no attack roll ever has advantage against you while you\'re not incapacitated)', 'Sneak Attack: 9d6'],
    19: ['ASI / Feat', 'Sneak Attack: 10d6'],
    20: ['Stroke of Luck (turn a miss into a hit, or a failed ability check into 20; 1/short rest)', 'Sneak Attack: 10d6'],
  },

  subclasses: {

    'Thief': {
      3:  ['Fast Hands (use Cunning Action to make a Sleight of Hand check, use thieves\' tools to disarm trap or open lock, or use an object)', 'Second-Story Work (climbing costs no extra movement; running long jump adds DEX mod in feet)'],
      9:  ['Supreme Sneak (advantage on Stealth checks if you move no more than half speed on that turn)'],
      13: ['Use Magic Device (ignore class, race, and level requirements on magic items)'],
      17: ['Thief\'s Reflexes (take two turns in the first round of combat — first at Initiative, second at Initiative − 10)'],
    },

    'Assassin': {
      3:  ['Bonus Proficiencies: disguise kit, poisoner\'s kit', 'Assassinate (advantage on attacks vs creatures that haven\'t taken a turn; hits against surprised creatures are automatic crits)'],
      9:  ['Infiltration Expertise (spend 7 days + 25 gp to create an undetectable false identity)'],
      13: ['Impostor (study a creature for 3 hours to mimic voice, handwriting, and mannerisms; Insight check to detect; DC = 8 + prof + CHA)'],
      17: ['Death Strike (when you crit a surprised creature, double the damage dice; CON save DC = 8 + DEX + prof to negate the doubling)'],
    },

    'Arcane Trickster': {
      3:  ['Spellcasting (INT-based; 3 cantrips including Mage Hand; spells must be Enchantment or Illusion except 2 general wizard spells)', 'Mage Hand Legerdemain (Mage Hand is invisible; use Cunning Action to control it; can pick locks, pick pockets, and stow items at range)'],
      9:  ['Magical Ambush (if you are hidden when you cast a spell, target has disadvantage on saving throw against it)'],
      13: ['Versatile Trickster (use Cunning Action to distract a creature you can see within 5 ft of your Mage Hand; you have advantage on attack rolls against that creature)'],
      17: ['Spell Thief (reaction when creature casts a spell: steal it — creature must INT save or lose the spell and you learn it for 8 hours; 1/long rest)'],
    },

    'Inquisitive': {
      3:  ['Ear for Deceit (minimum roll of 8 on Insight checks)', 'Eye for Detail (use Cunning Action for Perception or Investigation check)', 'Insightful Fighting (bonus action: Insight vs target\'s Deception; on success, deal Sneak Attack even without advantage or allied adjacency for 1 minute; 1/short rest)'],
      9:  ['Steady Eye (advantage on Perception and Investigation if you move no more than half speed this turn)'],
      13: ['Unerring Eye (action: detect illusions, shapechangers, magical concealment, and magical disguises within 30 ft; INT mod uses per long rest)'],
      17: ['Eye for Weakness (while Insightful Fighting is active, add 3d6 to Sneak Attack against that creature)'],
    },

    'Mastermind': {
      3:  ['Master of Intrigue (proficiency in disguise kit, forgery kit, one gaming set, two languages)', 'Master of Tactics (use Help as bonus action from 30 ft away)'],
      9:  ['Insightful Manipulator (spend 1 minute studying a creature: learn 2 of — CHA score vs yours, INT score vs yours, class levels, any class features; DM chooses which 2)'],
      13: ['Misdirection (use Cunning Action to cause a creature within 5 ft who can\'t see you to become the target of opportunity attacks from another creature that can see it until your next turn)'],
      17: ['Soul of Deceit (thoughts can\'t be read; you know when someone uses magic to determine if you\'re lying and can feed them false thoughts; Deception always beats Insight unless the DM rules otherwise)'],
    },

    'Scout': {
      3:  ['Skirmisher (reaction: move up to half speed when an enemy ends its turn within 5 ft; doesn\'t provoke opportunity attacks)', 'Survivalist (proficiency and expertise in Nature and Survival)'],
      9:  ['Superior Mobility (+10 ft walk, climb, and swim speed)'],
      13: ['Ambush Master (advantage on Initiative; first creature you hit in first round becomes the one all your allies have advantage to hit for their first attacks)'],
      17: ['Sudden Strike (if you take the Attack action, make an extra attack as bonus action; can Sneak Attack twice per round if both hit different targets)'],
    },

    'Swashbuckler': {
      3:  ['Fancy Footwork (creatures you make a melee attack against can\'t make opportunity attacks against you for the rest of your turn)', 'Rakish Audacity (add CHA mod to Initiative; Sneak Attack a creature you\'re in melee with even without advantage — as long as no other creature is within 5 ft of you)'],
      9:  ['Panache (use Persuasion against Insight to either impose disadvantage on attacks against non-you targets for 1 minute, or charm the creature for 1 minute as long as not hostile)'],
      13: ['Elegant Maneuver (use Cunning Action for advantage on Acrobatics or Athletics next turn)'],
      17: ['Master Duelist (once per short rest, if you miss an attack, reroll with advantage)'],
    },

    'Phantom': {
      3:  ['Whispers of the Dead (after short/long rest: gain proficiency in one skill or tool from the dead)', 'Wails from the Grave (when you Sneak Attack, also deal half as many d6s of necrotic to a second creature within 30 ft of target; prof bonus uses per long rest)'],
      9:  ['Tokens of the Departed (reaction when creature dies within 30 ft: conjure a Tiny soul trinket in your free hand; has prof bonus charges; use a charge to ask the spirit one question; trinket lasts until next long rest or until you use another creature\'s death for a new one)'],
      13: ['Ghost Walk (bonus action: become incorporeal for 10 minutes — can move through objects/creatures, 10 ft of movement costs 1 extra ft; speed halved; 1/long rest or Soul Trinket charge)'],
      17: ['Death\'s Friend (Wails from the Grave no longer costs uses; Sneak Attack deals 1d8 necrotic to target automatically in addition to normal Sneak Attack dice)'],
    },

    'Soulknife': {
      3:  ['Psionic Power (Psionic Energy Dice — d6, equal to twice prof bonus; replenish one as bonus action 1/long rest; replenish all on short rest)', 'Psi-Bolstered Knack (when a proficient ability check fails: expend one die, add to check; can do after seeing the roll)', 'Psychic Whispers (action + 1 die: establish telepathic link with prof bonus creatures within 30 ft for 1 hour; they can communicate silently; 1/long rest free)', 'Psychic Blades (bonus action: manifest two blades that count as finesse thrown weapons with 60/120 range; 1d6 psychic, off-hand 1d4; disappear after attack; no hands needed; free ammunition)'],
      9:  ['Soul Blades — Homing Strikes (expend 1 die: add to missed Psychic Blade attack roll)', 'Soul Blades — Psychic Teleportation (bonus action: expend 1 die, teleport to unoccupied space within 10× the roll in feet; not obstructed by objects or creatures in the way)'],
      13: ['Psychic Veil (become invisible for 1 hour or until you deal damage or force a save; 1/long rest or 1 die)'],
      17: ['Rend Mind (when you Sneak Attack with Psychic Blades: target must WIS save DC = 8 + prof + DEX mod or be stunned until end of its next turn; 1/short rest)'],
    },
  },
};
