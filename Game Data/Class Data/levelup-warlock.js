// ============================================================
//  D&D 5e CLASS DATA — WARLOCK
// ============================================================
LU_CLASS_DATA.warlock = {

  baseFeatures: {
    1:  ['Otherworldly Patron — choose your subclass', 'Pact Magic (CHA-based; spell slots recharge on short rest; slot level scales with warlock level)', 'Eldritch Invocations (learn 1 invocation)'],
    2:  ['Eldritch Invocations (learn 1 more — 2 total)'],
    3:  ['Pact Boon (choose Pact of the Blade, Chain, or Ttome)', 'Eldritch Invocations (2 total)'],
    4:  ['ASI / Feat', 'Eldritch Invocations (2 total)'],
    5:  ['Eldritch Invocations (learn 1 more — 3 total)'],
    6:  ['Patron Feature', 'Eldritch Invocations (3 total)'],
    7:  ['Eldritch Invocations (learn 1 more — 4 total)'],
    8:  ['ASI / Feat', 'Eldritch Invocations (4 total)'],
    9:  ['Eldritch Invocations (learn 1 more — 5 total)'],
    10: ['Patron Feature', 'Eldritch Invocations (5 total)'],
    11: ['Mystic Arcanum (cast a 6th-level spell once per long rest without a slot)', 'Eldritch Invocations (5 total)'],
    12: ['ASI / Feat', 'Eldritch Invocations (learn 1 more — 6 total)'],
    13: ['Mystic Arcanum (7th level spell, 1/long rest)', 'Eldritch Invocations (6 total)'],
    14: ['Patron Feature', 'Eldritch Invocations (6 total)'],
    15: ['Mystic Arcanum (8th level spell, 1/long rest)', 'Eldritch Invocations (learn 1 more — 7 total)'],
    16: ['ASI / Feat', 'Eldritch Invocations (7 total)'],
    17: ['Mystic Arcanum (9th level spell, 1/long rest)', 'Eldritch Invocations (7 total)'],
    18: ['Eldritch Invocations (learn 1 more — 8 total)'],
    19: ['ASI / Feat', 'Eldritch Invocations (8 total)'],
    20: ['Eldritch Master (spend 1 minute in entreaty with patron to regain all Pact Magic slots; 1/long rest)', 'Eldritch Invocations (8 total)'],
  },

  subclasses: {

    'The Archfey': {
      1:  ['Fey Presence (action: 10-ft cube; creatures must WIS save or be charmed or frightened until end of your next turn; 1/short rest)', 'Expanded Spells: Faerie Fire, Sleep, Calm Emotions, Phantasmal Force, Blink, Plant Growth, Dominate Beast, Greater Invisibility, Dominate Person, Seeming'],
      6:  ['Misty Escape (reaction when you take damage: turn invisible and teleport up to 60 ft; invisibility lasts until start of your next turn or until you attack/cast a spell; 1/short rest)'],
      10: ['Beguiling Defenses (immune to being charmed; reaction when creature tries to charm you: they must WIS save or be charmed by you for 1 minute)'],
      14: ['Dark Delirium (action: charm or frighten one creature for 1 minute — it\'s confused, can\'t remember you when it ends; WIS save at end of each turn; 1/short rest)'],
    },

    'The Fiend': {
      1:  ['Dark One\'s Blessing (when you reduce a creature to 0 HP: gain temp HP equal to CHA mod + warlock level)', 'Expanded Spells: Burning Hands, Command, Blindness/Deafness, Scorching Ray, Fireball, Stinking Cloud, Fire Shield, Wall of Fire, Flame Strike, Hallow'],
      6:  ['Dark One\'s Own Luck (add 1d10 to one ability check or save; 1/short rest)'],
      10: ['Fiendish Resilience (choose one damage type after a short rest; gain resistance to it until your next short rest — not magical or silver)'],
      14: ['Hurl Through Hell (reaction when you hit a creature: banish it to a nightmare hellscape; it returns at the start of its next turn taking 10d10 psychic damage; fiends and undead are immune; 1/long rest)'],
    },

    'The Great Old One': {
      1:  ['Awakened Mind (telepathically speak to any creature within 30 ft that has a language; one-way)', 'Expanded Spells: Dissonant Whispers, Tashas Hideous Laughter, Detect Thoughts, Phantasmal Force, Clairvoyance, Sending, Dominate Beast, Evard\'s Black Tentacles, Dominate Person, Telepathy'],
      6:  ['Entropic Ward (reaction when attacked: impose disadvantage; if it misses, you have advantage on your next attack against the attacker; 1/short rest)'],
      10: ['Thought Shield (your thoughts can\'t be read unless you allow it; resist psychic damage; when a creature deals psychic damage to you, it takes the same amount)'],
      14: ['Create Thrall (touch an incapacitated humanoid: it becomes charmed by you until you use this again or until a Remove Curse is cast on it; charmed creature is unaware; telepathic link within 1 mile)'],
    },

    'The Hexblade': {
      1:  ['Hexblade\'s Curse (bonus action: curse one creature within 30 ft for 1 minute — bonus to damage = prof bonus; crit on 19-20 vs cursed creature; if cursed creature dies, regain HP = warlock level + CHA mod; 1/short rest)', 'Hex Warrior (medium armor, shields, martial weapons proficiency; choose one weapon each long rest to use CHA for attacks and damage)', 'Expanded Spells: Shield, Wrathful Smite, Blur, Branding Smite, Blink, Elemental Weapon, Phantasmal Killer, Staggering Smite, Banishing Smite, Cone of Cold'],
      6:  ['Accursed Specter (when you slay a humanoid: raise it as a specter with temp HP equal to half your warlock level; it acts on your turn, follows your commands, lasts 24 hours; 1/long rest)'],
      10: ['Armor of Hexes (reaction when cursed target hits you: roll d6; on 4+, the attack misses instead)'],
      14: ['Master of Hexes (when cursed target dies: apply Hexblade\'s Curse to a new target within 30 ft for free — no action, no use of 1/short rest)'],
    },

    'The Celestial': {
      1:  ['Healing Light (pool of d6s = 1 + warlock level; bonus action: expend dice to heal a creature within 60 ft; max dice spent per turn = CHA mod; replenish on long rest)', 'Expanded Spells: Cure Wounds, Guiding Bolt, Flaming Sphere, Lesser Restoration, Daylight, Revivify, Guardian of Faith, Wall of Fire, Flame Strike, Greater Restoration'],
      6:  ['Radiant Soul (resistance to radiant damage; add CHA mod to one radiant or fire damage roll per turn for spells and Eldritch Blast)'],
      10: ['Celestial Resilience (when you finish a short/long rest: you gain temp HP = warlock level + CHA mod; nearest CHA mod allies each gain temp HP = half warlock level)'],
      14: ['Searing Vengeance (when you or an ally within 60 ft is reduced to 0 HP: burst of radiance — all creatures within 30 ft take 2d8 + CHA radiant and are blinded; you or the ally regains half their HP max; 1/long rest)'],
    },

    'The Fathomless': {
      1:  ['Tentacle of the Deeps (bonus action: summon a tentacle in unoccupied space within 60 ft for 1 minute; melee attack deal 1d8 cold; on hit, target\'s speed reduced 10 ft until start of your next turn; tentacle attacks once on your turn; 1/short rest)', 'Gift of the Sea (30 ft swim speed; breathe underwater)', 'Expanded Spells: Create or Destroy Water, Thunderwave, Gust of Wind, Silence, Lightning Bolt, Sleet Storm, Control Water, Summon Elemental (Water), Cone of Cold, Maelstrom'],
      6:  ['Oceanic Soul (resistance to cold damage; speak with creatures that have a swim speed)', 'Guardian Coil (reaction when you or a creature within 10 ft of tentacle is hit: tentacle reduces damage by 1d8)'],
      10: ['Grasping Tentacles (always have Evard\'s Black Tentacles prepared; cast it once per long rest without a slot; when you cast it, gain temp HP equal to warlock level)'],
      14: ['Fathomless Plunge (action: open a rift for yourself and up to 5 willing creatures you can see within 30 ft; each teleports to an unoccupied space within 1 mile you can see on or under water; 1/short rest)'],
    },

    'The Genie': {
      1:  ['Genie\'s Vessel (a Tiny object — ring, bottle, etc. — acts as spellcasting focus; contains Bottled Respite)', 'Bottled Respite (action: disappear into vessel for up to prof bonus hours; vessel must be unattended; inside is a 20-ft-radius extradimensional space; you can\'t be detected or targeted; emerge as bonus action)', 'Genie\'s Gift — based on patron type: Dao (Bludgeoning weapon deals extra 1d6), Djinni (Lightning), Efreeti (Fire), Marid (Cold — 1d6 per patron on one weapon attack per turn)', 'Wish — at level 17: once per long rest cast Wish without using a slot'],
      6:  ['Elemental Gift — based on patron type: Dao (burrow 30 ft), Djinni (fly 30 ft as bonus action for 10 min; 1/long rest), Efreeti (fire resistance), Marid (swim 40 ft; breathe water)', 'Sanctuary Vessel (up to 5 willing creatures can enter the vessel with you)'],
      10: ['Limited Wish (use action: cast any 6th-level or lower spell from any list without a slot; the spell must have a 1-action casting time; 1d4 long rests to recharge)'],
      14: ['Genie\'s Wrath (once per turn your weapon attack can deal extra damage based on patron type: 2d6 for Dao/Marid, or 2d6 fire/lightning for Efreeti/Djinni)'],
    },

    'The Undead': {
      1:  ['Form of Dread (bonus action: transform for 1 minute — gain temp HP equal to 1d10 + warlock level; immune to frightened; when you hit, target must WIS save or be frightened until end of its next turn; prof bonus uses per long rest)', 'Expanded Spells: Bane, False Life, Blindness/Deafness, Phantasmal Force, Phantom Steed, Speak with Dead, Death Ward, Greater Invisibility, Antilife Shell, Cloudkill'],
      6:  ['Grave Touched (no need for food, water, or air; while in Form of Dread: replace one damage die per attack with d8 necrotic)'],
      10: ['Necrotic Husk (resistance to necrotic damage; immune in Form of Dread; reaction when reduced to 0 HP outside of Form of Dread: drop to 1 HP and enter Form of Dread instead; if you do, creatures within 30 ft must CON save or be frightened; 1/long rest)'],
      14: ['Spirit Projection (action: your spirit leaves your body for 1 hour — fly speed equal to walk speed, resistance to bludgeoning/piercing/slashing, immune to disease and poison; while projected you can cast spells as if in your body\'s space; 1/long rest)'],
    },
  },
};
