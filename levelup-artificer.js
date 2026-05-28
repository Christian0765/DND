// ============================================================
//  D&D 5e CLASS DATA — ARTIFICER
// ============================================================
LU_CLASS_DATA.artificer = {

  baseFeatures: {
    1:  ['Magical Tinkering (touch Tiny object to give it one of: light, recorded message, faint odour, static picture/sound; up to INT mod objects active)', 'Spellcasting (INT-based; prepare spells from list; no ritual without Ritual Caster feat — note: can cast prepared spells as rituals per Tasha\'s errata)'],
    2:  ['Infuse Item (inscribe 2 infusions known into 2 objects during long rest; infused items are magic items; infusions known grows with level)', 'Infusions Known: 4 at level 2'],
    3:  ['Artificer Specialist — choose your subclass', 'The Right Tool for the Job (spend 1 hour and 10 gp of materials: create artisan\'s tools in an unoccupied space within 5 ft)'],
    4:  ['ASI / Feat'],
    5:  ['Specialist Feature'],
    6:  ['Tool Expertise (double proficiency with any tool proficiency)', 'Infusions Known: 6'],
    7:  ['Flash of Genius (reaction when you or ally within 30 ft fails ability check or save: add INT mod to the roll; INT mod uses/long rest)'],
    8:  ['ASI / Feat', 'Magic Item Adept (attune to up to 4 magic items; craft common/uncommon items at half cost and 1/4 time)'],
    9:  ['Specialist Feature'],
    10: ['Magic Item Savant (attune to 5 magic items; ignore class, race, spell, and level attunement requirements)', 'Infusions Known: 8'],
    11: ['Spell-Storing Item (after long rest: store one 1st or 2nd level artificer spell in a weapon or tool; bearer can use action to cast it; CHA-based; INT mod charges, replenish on long rest)'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Magic Item Master (attune to 6 magic items)', 'Infusions Known: 10'],
    15: ['Specialist Feature'],
    16: ['ASI / Feat'],
    17: ['No new base features'],
    18: ['Magic Item Master', 'Infusions Known: 12'],
    19: ['ASI / Feat'],
    20: ['Soul of Artifice (+1 to all saving throws per attuned magic item; reaction when you\'re reduced to 0 HP: drop to 1 HP instead and end one of your infusions; 1/long rest)'],
  },

  subclasses: {

    'Alchemist': {
      3:  ['Tools Proficiency: Alchemist\'s Supplies (if already proficient, double proficiency)', 'Alchemist Spells (additional always-prepared spells per level: Healing Word, Ray of Sickness; Flaming Sphere, Melf\'s Acid Arrow; Gaseous Form, Mass Healing Word; Blight, Death Ward; Cloudkill, Raise Dead)', 'Experimental Elixir (at end of long rest: create 1 free elixir in a flask; add INT mod free elixirs at levels 9 and 15; roll d6 for effect: 1-healing, 2-swiftness, 3-resilience, 4-boldness, 5-flight, 6-transformation; can expend spell slots for more elixirs)'],
      5:  ['Alchemical Savant (when you cast spells using alchemist\'s supplies as focus: add INT mod to one roll that heals HP or deals acid, fire, necrotic, or poison damage)'],
      9:  ['Restorative Reagents (cast Lesser Restoration with alchemist\'s supplies without a slot; INT mod times/long rest; experimental elixirs grant temp HP equal to 2d6 + INT mod)'],
      15: ['Chemical Mastery (resistance to acid and poison damage; immune to poisoned condition; cast Greater Restoration and Heal each once per long rest without a slot, using alchemist\'s supplies)'],
    },

    'Armorer': {
      3:  ['Tools Proficiency: Heavy Armor, Smith\'s Tools (if already have, gain different tools)', 'Armorer Spells (Magic Missile, Thunderwave; Mirror Image, Shatter; Hypnotic Pattern, Lightning Bolt; Fire Shield, Greater Invisibility; Passwall, Wall of Stone)', 'Arcane Armor (turn suit of armor into arcane armor — serves as spellcasting focus; can don/doff as action; armor can\'t be removed against your will; can add limbs)', 'Armor Model — choose Guardian or Infiltrator: Guardian: Thunder Gauntlets (1d8 thunder, target has disadvantage attacking other creatures); Infiltrator: Lightning Launcher (built-in ranged weapon, 1d6 lightning, one hit per turn deals +1d6 lightning)'],
      5:  ['Extra Attack (attack twice per Attack action)'],
      9:  ['Armor Modifications (4 infusions can be placed in armor: helm, chest, boots, and gauntlets; Arcane Armor counts as armor + boots; 4 infusion slots total in the armor)'],
      15: ['Perfected Armor — Guardian: reaction when a creature within 30 ft attacks a target other than you: force creature to make STR save or redirect attack to you; Infiltrator: when Lightning Launcher deals its +1d6: you can push the target 10 ft and reduce its speed by 15 ft until end of its next turn (STR save)'],
    },

    'Artillerist': {
      3:  ['Tools Proficiency: Woodcarver\'s Tools', 'Artillerist Spells (Shield, Thunderwave; Scorching Ray, Shatter; Fireball, Wind Wall; Ice Storm, Wall of Fire; Cone of Cold, Wall of Force)', 'Eldritch Cannon (action + 1 hour or action during long rest: create one cannon in unoccupied space within 5 ft — Tiny or Small object with AC 18 and HP equal to 5× artificer level; disappears after 1 hour; command it as bonus action)', 'Cannon types: Flamethrower (15-ft cone, DEX save, 2d8 fire, half on success), Force Ballista (ranged attack, 2d8 force, push target 5 ft), Protector (temp HP = 1d8 + INT mod to you and allies within 10 ft)'],
      5:  ['Arcane Firearm (replace wand/staff/rod with woodcarver\'s tools object; add 1d8 to one spell damage roll for artificer spells cast through it)'],
      9:  ['Explosive Cannon (Eldritch Cannon damage increases to 3d8; action to detonate it — 60-ft range, 3d8 force to all within 20 ft, DEX save for half)'],
      15: ['Fortified Position (can have two cannons simultaneously; allies in 10 ft of a cannon have half cover)'],
    },

    'Battle Smith': {
      3:  ['Tools Proficiency: Smith\'s Tools', 'Battle Smith Spells (Heroism, Shield; Branding Smite, Warding Bond; Aura of Vitality, Conjure Barrage; Aura of Purity, Fire Shield; Banishing Smite, Mass Cure Wounds)', 'Battle Ready (martial weapon proficiency; use INT instead of STR or DEX for weapon attacks with magic weapons)', 'Steel Defender (construct companion with AC, HP, attacks and special abilities; acts on your initiative; can command it as bonus action; regain from death on your next long rest; if lost, recreate with 1-hour work + 100 gp materials during long rest)'],
      5:  ['Extra Attack (attack twice; can replace one with Steel Defender\'s Force-Empowered Rend)'],
      9:  ['Arcane Jolt (when Steel Defender hits or you hit with magic weapon: deal extra 2d6 force damage OR restore 2d6 HP to a creature within 30 ft of Steel Defender; INT mod uses/long rest)'],
      15: ['Improved Defender (Steel Defender\'s Deflect Attack reaction reduces damage by 1d4 + prof bonus; Arcane Jolt becomes 4d6)'],
    },
  },
};
