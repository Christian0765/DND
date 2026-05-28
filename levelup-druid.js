// ============================================================
//  D&D 5e CLASS DATA — DRUID
// ============================================================
LU_CLASS_DATA.druid = {

  baseFeatures: {
    1:  ['Druidic (secret language; leave hidden messages)', 'Spellcasting (WIS-based, ritual casting)'],
    2:  ['Wild Shape (2 uses/rest; CR 1/4, no swim speed, no fly speed)', 'Druid Circle — choose your subclass'],
    3:  ['No new base features'],
    4:  ['ASI / Feat', 'Wild Shape: CR 1/2 (no fly speed)', 'Cantrip Versatility (swap one cantrip on level up)'],
    5:  ['No new base features'],
    6:  ['Circle Feature'],
    7:  ['No new base features'],
    8:  ['ASI / Feat', 'Wild Shape: CR 1'],
    9:  ['No new base features'],
    10: ['Circle Feature'],
    11: ['No new base features'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Circle Feature'],
    15: ['No new base features'],
    16: ['ASI / Feat'],
    17: ['No new base features'],
    18: ['Timeless Body (age 10× slower; immune to magical aging)', 'Beast Spells (cast spells while Wild Shaped, using verbal/somatic components)'],
    19: ['ASI / Feat'],
    20: ['Archdruid (unlimited Wild Shape uses)'],
  },

  subclasses: {

    'Circle of the Land': {
      2:  ['Bonus Cantrip (learn one extra druid cantrip)', 'Natural Recovery (short rest: recover spell slots totalling up to half your druid level, rounded up; max slot level 5; 1/long rest)', 'Circle Spells — choose a terrain for always-prepared spells (Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, or Underdark)'],
      6:  ['Land\'s Stride (moving through non-magical difficult terrain costs no extra movement; plants can\'t magically impede you)'],
      10: ['Nature\'s Ward (immune to disease and poison; elementals and fey can\'t charm or frighten you)'],
      14: ['Nature\'s Sanctuary (creatures of type beast or plant must WIS save or fail to attack you; 1/creature/day)'],
    },

    'Circle of the Moon': {
      2:  ['Combat Wild Shape (Wild Shape as bonus action in combat; spend spell slots to regain 1d8 HP per slot level as a bonus action while Wild Shaped)', 'Circle Forms (Wild Shape into CR 1 beasts, increasing to CR = floor(druid level / 3) at higher levels)'],
      6:  ['Primal Strike (Wild Shape attacks count as magical for overcoming resistance)'],
      10: ['Elemental Wild Shape (expend 2 Wild Shape uses to transform into an air, earth, fire, or water elemental)'],
      14: ['Thousand Forms (cast Alter Self at will)'],
    },

    'Circle of Dreams': {
      2:  ['Balm of the Summer Court (pool of d6s equal to druid level; bonus action: expend dice (up to half druid level) to restore HP + bonus temp HP to a creature within 120 ft you can see)'],
      6:  ['Hearth of Moonlight and Shadow (short/long rest: create a 30-ft invisible magical sphere; enemies have disadvantage on Perception vs your camp; light within is invisible outside the sphere)'],
      10: ['Hidden Paths (bonus action: teleport to unoccupied space you can see within 60 ft; or teleport a willing creature to an unoccupied space you can see within 30 ft of you; INT mod uses per long rest)'],
      14: ['Walker in Dreams (after a long rest, cast Dream, Scrying, or Teleportation Circle once without a spell slot — destination is a place you slept recently)'],
    },

    'Circle of the Shepherd': {
      2:  ['Speech of the Woods (speak with beasts; understand and be understood)', 'Spirit Totem (bonus action: summon a spirit in a 30-ft radius for 1 minute; Bear: temp HP equal to 5 + druid level, advantage on STR checks; Hawk: reaction help in attack rolls, advantage on Perception; Unicorn: bonus healing from spells and magic items in area)'],
      6:  ['Mighty Summoner (summoned beasts and fey gain +2 HP per HD and their natural weapons count as magical)'],
      10: ['Guardian Spirit (summoned beasts and fey within your Spirit Totem regain HP equal to half your druid level at end of your turn if they have fewer than half their HP max)'],
      14: ['Faithful Summons (when reduced to 0 HP while you have no summoned creatures: 4 beasts of CR 2 or lower appear and are friendly, acting on your initiative for 1 hour or until dismissed; 1/long rest)'],
    },

    'Circle of Spores': {
      2:  ['Halo of Spores (reaction when a creature moves within 10 ft: deal 1d4 necrotic damage, CON save negates; damage scales with level)', 'Symbiotic Entity (expend Wild Shape use: gain 4× druid level temp HP, Halo of Spores damage doubles, melee attacks deal +1d6 necrotic; lasts 10 min or until temp HP gone)'],
      6:  ['Fungal Infestation (when a Small/Medium beast or humanoid dies within 10 ft, animate it as a zombie with 1 HP using your reaction; it lasts 1 hour; INT mod zombies max; 1/creature)'],
      10: ['Spreading Spores (while Symbiotic Entity active: bonus action to hurl spores in a 10-ft cube; any creature entering or starting in the cube takes Halo of Spores damage once per turn; lasts 1 minute)'],
      14: ['Fungal Body (while Symbiotic Entity active: immune to blinded, deafened, frightened, poisoned; critical hits against you become normal hits)'],
    },

    'Circle of Stars': {
      2:  ['Star Map (create a star chart; it\'s a spellcasting focus; always have Guidance and Guiding Bolt prepared; Guiding Bolt free INT mod times per long rest)', 'Starry Form (Wild Shape as bonus action to become a starry form instead of a beast; choose Archer: bonus action ranged spell attack 1d8+WIS radiant, Chalice: when you cast a healing spell you or another creature within 30 ft regains 1d8+WIS HP, or Dragon: treat concentration check roll of 9 or lower as 10)'],
      6:  ['Cosmic Omen (after long rest, roll d6: odd = Woe, even = Weal; reaction when a creature within 30 ft makes an attack, check, or save — add d6 or subtract d6; prof bonus uses per long rest)'],
      10: ['Twinkling Constellations (Starry Form improvements: Archer shoots 2 bolts, Chalice heals 2d8+WIS, Dragon grants 20-ft fly speed; can change constellation each turn as bonus action)'],
      14: ['Full of Stars (while in Starry Form you become partially incorporeal: resistance to bludgeoning, piercing, and slashing damage)'],
    },

    'Circle of Wildfire': {
      2:  ['Summon Wildfire Spirit (expend Wild Shape use: summon a wildfire spirit in an unoccupied space within 30 ft; it acts on your initiative and follows commands; 1 hour)', 'Enhanced Bond (while Wildfire Spirit is present: +1d8 fire or healing to spells you cast through or within 5 ft of it)'],
      6:  ['Cauterizing Flames (when a Small+ creature dies within 60 ft: a spectral flame appears in its space for 1 minute; you or an ally can use a reaction when within 5 ft to extinguish it, gaining 2d10+WIS temp HP; prof bonus flames per long rest)'],
      10: ['Blazing Revival (when Wildfire Spirit drops to 0 HP you can have it explode: creatures within 10 ft take 2d10 fire damage, DEX save for half; you then regain half your max HP and the spirit vanishes; 1/long rest)'],
      14: ['Fiery Soul (fire resistance; fire damage you deal ignores resistance; when you cast a fire spell you can instantly teleport to an unoccupied space within 15 ft of the spell\'s target/origin)'],
    },
  },
};
