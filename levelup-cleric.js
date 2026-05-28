// ============================================================
//  D&D 5e CLASS DATA — CLERIC
// ============================================================
LU_CLASS_DATA.cleric = {

  baseFeatures: {
    1:  ['Divine Domain — choose your subclass (grants domain spells + feature)', 'Spellcasting (WIS-based)', 'Domain Spells (always prepared, don\'t count against limit)'],
    2:  ['Channel Divinity (1/rest) — Turn Undead + domain option', 'Divine Domain Feature'],
    3:  ['No new base features'],
    4:  ['ASI / Feat'],
    5:  ['Destroy Undead (CR 1/2 or lower are destroyed instead of turned)'],
    6:  ['Channel Divinity (2/rest)', 'Divine Domain Feature'],
    7:  ['No new base features'],
    8:  ['ASI / Feat', 'Destroy Undead (CR 1)', 'Divine Domain Feature'],
    9:  ['No new base features'],
    10: ['Divine Intervention (roll d100 ≤ cleric level for deity to intervene; 1/week)'],
    11: ['Destroy Undead (CR 2)'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Destroy Undead (CR 3)'],
    15: ['No new base features'],
    16: ['ASI / Feat'],
    17: ['Destroy Undead (CR 4)', 'Divine Domain Feature'],
    18: ['Channel Divinity (3/rest)'],
    19: ['ASI / Feat'],
    20: ['Divine Intervention (automatically succeeds now)'],
  },

  subclasses: {

    'Life Domain': {
      1:  ['Bonus Proficiency: heavy armor', 'Disciple of Life (healing spells restore 2 + spell level extra HP)'],
      2:  ['Channel Divinity: Preserve Life (action: restore HP equal to 5× cleric level split among any creatures within 30 ft, up to half their HP max)'],
      6:  ['Blessed Healer (when you cast a healing spell on another creature, you regain 2 + spell level HP)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 radiant damage on a weapon hit; 2d8 at level 14)'],
      17: ['Supreme Healing (when you would roll dice to restore HP, use the maximum number instead)'],
    },

    'Light Domain': {
      1:  ['Bonus Cantrip: Light', 'Warding Flare (reaction: impose disadvantage on an attack roll against you or an ally within 30 ft; CHA mod uses per long rest)'],
      2:  ['Channel Divinity: Radiance of the Dawn (action: magical darkness in 30 ft is dispelled; creatures in range take 2d10 + cleric level radiant damage, CON save for half)'],
      6:  ['Improved Flare (use Warding Flare to protect any visible creature, not just yourself or adjacent allies)'],
      8:  ['Potent Spellcasting (add WIS mod to damage of cleric cantrips)'],
      17: ['Corona of Light (action: emit sunlight in 60-ft radius for 1 minute; enemies in the light have disadvantage on saves vs spells that deal fire or radiant damage)'],
    },

    'Trickery Domain': {
      1:  ['Blessing of the Trickster (touch a willing creature; they have advantage on Stealth checks for 1 hour; 1/long rest)'],
      2:  ['Channel Divinity: Invoke Duplicity (action: create a perfect illusory duplicate for 1 minute; you can cast spells as if from its space; enemies have disadvantage on saves vs spells you cast from its space)'],
      6:  ['Channel Divinity: Cloak of Shadows (action: become invisible until end of next turn)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 poison damage on a weapon hit; 2d8 at level 14)'],
      17: ['Improved Duplicity (create up to 4 duplicates with Invoke Duplicity instead of 1)'],
    },

    'Knowledge Domain': {
      1:  ['Blessings of Knowledge (proficiency in 2 languages and 2 skills from History, Arcana, Nature, Religion; double proficiency bonus in those skills)', 'Domain Spells: Command, Identify, Augury, Suggestion'],
      2:  ['Channel Divinity: Knowledge of the Ages (action: gain proficiency in one skill or tool for 10 minutes)', 'Channel Divinity: Read Thoughts (action: read surface thoughts of one creature; WIS save; if fails, cast Suggestion on them without a slot for the duration)'],
      6:  ['Channel Divinity: Read Thoughts (additional use — choose one from Knowledge of the Ages OR Read Thoughts per Channel Divinity use)'],
      8:  ['Potent Spellcasting (add WIS mod to damage of cleric cantrips)'],
      17: ['Visions of the Past (spend 1 minute meditating over an object or location to receive visions from its recent past; 1/long rest)'],
    },

    'Nature Domain': {
      1:  ['Acolyte of Nature (learn a druid cantrip; proficiency in one skill: Animal Handling, Nature, or Survival)', 'Bonus Proficiency: heavy armor'],
      2:  ['Channel Divinity: Charm Animals and Plants (action: charm beasts and plants within 30 ft for 1 minute; WIS save negates)'],
      6:  ['Dampen Elements (reaction: grant resistance to acid, cold, fire, lightning, or thunder damage to one creature you can see within 30 ft)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 cold, fire, or lightning damage on a weapon hit; 2d8 at level 14)'],
      17: ['Master of Nature (bonus action: command charmed beasts and plants)'],
    },

    'Tempest Domain': {
      1:  ['Bonus Proficiencies: martial weapons, heavy armor', 'Wrath of the Storm (reaction when hit: deal 2d8 lightning or thunder damage to the attacker; DEX save for half; WIS mod uses per long rest)'],
      2:  ['Channel Divinity: Destructive Wrath (replace any lightning or thunder damage roll with the maximum value)'],
      6:  ['Thunderbolt Strike (when you deal lightning damage to a Large or smaller creature, you can push it up to 10 ft away)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 thunder damage on a weapon hit; 2d8 at level 14)'],
      17: ['Stormborn (fly speed equal to walking speed outdoors in non-underground, non-enclosed space)'],
    },

    'War Domain': {
      1:  ['Bonus Proficiencies: martial weapons, heavy armor', 'War Priest (bonus action attack after Attack action; WIS mod uses per long rest)'],
      2:  ['Channel Divinity: Guided Strike (add +10 to an attack roll after seeing the roll but before knowing the outcome)', 'Channel Divinity: War God\'s Blessing (reaction: give an ally within 30 ft +10 to their attack roll)'],
      6:  ['Channel Divinity: War God\'s Blessing becomes available as a second option per Channel Divinity use'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 damage of your weapon\'s type on a hit; 2d8 at level 14)'],
      17: ['Avatar of Battle (resistance to bludgeoning, piercing, and slashing from non-magical weapons)'],
    },

    'Arcana Domain': {
      1:  ['Arcane Initiate (learn 2 cantrips from the Wizard spell list)', 'Domain Spells: Detect Magic, Magic Missile, Magic Weapon, Nystul\'s Magic Aura'],
      2:  ['Channel Divinity: Arcane Abjuration (turn celestials, elementals, fey, and fiends as well as undead; CR scales like Destroy Undead)'],
      6:  ['Spell Breaker (when you restore HP with a spell of 1st level or higher, you can also end one spell of equal or lower level on the target)'],
      8:  ['Potent Spellcasting (add WIS mod to cleric cantrip damage)'],
      17: ['Arcane Mastery (choose one 6th, 7th, 8th, and 9th level wizard spell; add them to your domain spells)'],
    },

    'Death Domain': {
      1:  ['Bonus Proficiency: martial weapons', 'Reaper (cleric cantrips that normally target one creature can target two within 5 ft of each other)'],
      2:  ['Channel Divinity: Touch of Death (melee attack touch deals extra necrotic damage equal to 5 + twice cleric level; no save)'],
      6:  ['Inescapable Destruction (necrotic damage from your spells and Channel Divinity ignores resistance)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 necrotic damage on a weapon hit; 2d8 at level 14)'],
      17: ['Improved Reaper (1st–5th level spells that target one creature can target two within 5 ft; components must be paid once)'],
    },

    'Forge Domain': {
      1:  ['Bonus Proficiency: heavy armor', 'Blessing of the Forge (at the end of a long rest, touch a non-magical weapon or armor; it becomes +1 until your next long rest)'],
      2:  ['Channel Divinity: Artisan\'s Blessing (1-hour ritual: create one metal item worth up to 100 gp — a non-magical weapon, set of armor, or other metal object)'],
      6:  ['Soul of the Forge (+1 AC in medium or heavy armor; resistance to fire damage)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 fire damage on a weapon hit; 2d8 at level 14)'],
      17: ['Saint of Forge and Fire (immunity to fire damage; resistance to bludgeoning, piercing, and slashing from non-magical weapons while in heavy armor)'],
    },

    'Grave Domain': {
      1:  ['Circle of Mortality (healing spells cast on creatures at 0 HP use maximum dice; Spare the Dying becomes a bonus action cantrip at range 30 ft)', 'Eyes of the Grave (detect undead within 60 ft as an action; WIS mod uses per long rest)'],
      2:  ['Channel Divinity: Path to the Grave (action: curse a creature you can see; next hit against it is a critical hit; curse ends after the hit or 1 minute)'],
      6:  ['Sentinel at Death\'s Door (reaction: turn a critical hit against you or an ally within 30 ft into a normal hit; WIS mod uses per long rest)'],
      8:  ['Potent Spellcasting (add WIS mod to cleric cantrip damage)'],
      17: ['Keeper of Souls (reaction when a creature dies within 60 ft: one creature of your choice within 60 ft regains HP equal to the dead creature\'s number of HD; 1/round)'],
    },

    'Order Domain': {
      1:  ['Bonus Proficiencies: heavy armor, Persuasion', 'Voice of Authority (when you cast a 1st+ level spell on an ally, they can use their reaction to make one weapon attack)'],
      2:  ['Channel Divinity: Order\'s Demand (action: charm creatures of your choice within 30 ft that fail a WIS save; they drop held items and their speed becomes 0 until end of your next turn)'],
      6:  ['Embodiment of the Law (casting enchantment spells of 1st level or higher becomes a bonus action WIS mod times per long rest)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 psychic damage on a weapon hit; 2d8 at level 14)'],
      17: ['Order\'s Wrath (when you deal Divine Strike damage, the creature is cursed until your next turn; the next time an ally hits the cursed creature, it takes extra 2d8 psychic damage)'],
    },

    'Peace Domain': {
      1:  ['Implement of Peace (proficiency in Insight, Performance, or Persuasion)', 'Emboldening Bond (bonus action: bond up to prof bonus creatures within 30 ft for 10 minutes; bonded creatures add 1d4 to attack rolls, ability checks, or saves once per turn when within 30 ft of another bonded creature; prof bonus uses per long rest)'],
      2:  ['Channel Divinity: Balm of Peace (move up to your speed without provoking opportunity attacks; heal each creature you pass within 5 ft for 2d6 + WIS mod HP)'],
      6:  ['Protective Bond (bonded creatures can use their reaction to take the damage for another bonded creature that would go to 0 HP; the one who takes the damage is teleported adjacent to the target)'],
      8:  ['Potent Spellcasting (add WIS mod to cleric cantrip damage)'],
      17: ['Expansive Bond (Protective Bond works even if no teleportation occurs; bonded creatures have resistance to all damage while using Protective Bond)'],
    },

    'Twilight Domain': {
      1:  ['Bonus Proficiencies: martial weapons, heavy armor', 'Eyes of Night (darkvision 300 ft; share with willing creatures within 10 ft for 1 hour; WIS mod uses per long rest)', 'Vigilant Blessing (touch a creature to give it advantage on Initiative rolls until you use this again)'],
      2:  ['Channel Divinity: Twilight Sanctuary (action: 30-ft radius sphere of twilight for 1 minute; each creature entering for the first time on a turn or starting there: choose temp HP equal to 1d6 + cleric level OR end one charm or fear effect)'],
      6:  ['Steps of Night (when in dim light or darkness, use bonus action to gain fly speed equal to walk speed for 1 minute; prof bonus uses per long rest)'],
      8:  ['Divine Strike (once per turn, deal extra 1d8 radiant damage on a weapon hit; 2d8 at level 14)'],
      17: ['Twilight Shroud (creatures in Twilight Sanctuary have half cover)'],
    },
  },
};
