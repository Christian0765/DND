// ============================================================
//  D&D 5e CLASS DATA — WIZARD
// ============================================================
LU_CLASS_DATA.wizard = {

  baseFeatures: {
    1:  ['Spellcasting (INT-based; spellbook; ritual casting)', 'Arcane Recovery (short rest: recover spell slots totalling up to half wizard level rounded up; max 5th level; 1/long rest)'],
    2:  ['Arcane Tradition — choose your subclass'],
    3:  ['No new base features'],
    4:  ['ASI / Feat', 'Cantrip Formulas (swap one cantrip when you finish a long rest)'],
    5:  ['No new base features'],
    6:  ['Tradition Feature'],
    7:  ['No new base features'],
    8:  ['ASI / Feat'],
    9:  ['No new base features'],
    10: ['Tradition Feature'],
    11: ['No new base features'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Tradition Feature'],
    15: ['No new base features'],
    16: ['ASI / Feat'],
    17: ['No new base features'],
    18: ['Spell Mastery (choose one 1st-level and one 2nd-level spell from your book; cast each at their lowest level without expending a spell slot; change choices on long rest)'],
    19: ['ASI / Feat'],
    20: ['Signature Spells (choose two 3rd-level spells from your book; always prepared, don\'t count against limit; cast each once per short rest without a slot)'],
  },

  subclasses: {

    'School of Abjuration': {
      2:  ['Abjuration Savant (half gold and time to copy abjuration spells into spellbook)', 'Arcane Ward (when you cast an abjuration spell of 1st+ level: ward appears with HP = 2× wizard level + INT mod; damage hits ward first; recharge by casting abjuration spells — each level restores 2 HP; if ward at 0, it disappears until you recast an abjuration spell)'],
      6:  ['Projected Ward (when a creature within 30 ft is hit: ward absorbs damage instead)'],
      10: ['Improved Abjuration (add proficiency bonus to Abjuration counterspell/dispel checks)'],
      14: ['Spell Resistance (advantage on saves vs spells; resistance to spell damage)'],
    },

    'School of Conjuration': {
      2:  ['Conjuration Savant (half gold and time to copy conjuration spells)', 'Minor Conjuration (action: conjure one Tiny, non-magical object worth ≤ 25 gp from your conjuration studies into an unoccupied space within 10 ft; lasts 1 hour or until another use)'],
      6:  ['Benign Transposition (action: teleport up to 30 ft OR swap places with a willing Small/Medium creature within 30 ft; 1/long rest; recharges when you cast conjuration spell of 1st+ level)'],
      10: ['Focused Conjuration (concentration on conjuration spells can\'t be broken by taking damage)'],
      14: ['Durable Summons (conjured creatures gain 30 temp HP)'],
    },

    'School of Divination': {
      2:  ['Divination Savant (half gold and time to copy divination spells)', 'Portent (after long rest: roll 2d20 and record them; use either result to replace any attack roll, save, or check — before or after the roll; or force someone else to use your result; all dice used by start of next long rest)'],
      6:  ['Expert Divination (casting a divination spell of 2nd level or higher: regain one expended spell slot of lower level than the divination spell)'],
      10: ['The Third Eye (choose one at end of short rest until next rest: Darkvision 60 ft, see through Ethereal Plane 60 ft, read any language, or see invisible within 10 ft)'],
      14: ['Greater Portent (roll 3 Portent dice instead of 2)'],
    },

    'School of Enchantment': {
      2:  ['Enchantment Savant (half gold and time to copy enchantment spells)', 'Hypnotic Gaze (action: choose one creature within 5 ft; it must WIS save or be charmed and incapacitated; creature\'s speed drops to 0; repeat save at end of each of its turns; ends if creature takes damage or is 5+ ft from you; 1/day, lasts until next long rest)'],
      6:  ['Instinctive Charm (reaction when a creature within 30 ft attacks you: redirect the attack to the nearest creature other than you or the attacker; WIS save negates; 1/creature/long rest)'],
      10: ['Split Enchantment (when casting enchantment spell targeting 1 creature: target one additional creature with same spell for free)'],
      14: ['Alter Memories (when you cast enchantment spell that charms: choose one creature affected; it doesn\'t remember you cast a spell on it and takes no notice during spell\'s duration; when effect ends, remove INT mod hours of memory from it)'],
    },

    'School of Evocation': {
      2:  ['Evocation Savant (half gold and time to copy evocation spells)', 'Sculpt Spells (when casting an evocation spell: choose prof bonus + 1 creatures you can see; they auto-succeed on saves and take no damage from the spell)'],
      6:  ['Potent Cantrip (when a creature succeeds on a save against your cantrip: it takes half the cantrip\'s damage)'],
      10: ['Empowered Evocation (add INT mod to one damage roll of evocation spells you cast)'],
      14: ['Overchannel (when casting evocation spell of 1st–5th level: deal maximum damage; first use no cost; subsequent uses in same long rest take necrotic damage — first: 2d12, each after: cumulative +1d12; no save)'],
    },

    'School of Illusion': {
      2:  ['Illusion Savant (half gold and time to copy illusion spells)', 'Improved Minor Illusion (Minor Illusion creates both a sound and an image at the same time; as a cantrip)'],
      6:  ['Malleable Illusions (when concentrating on an illusion spell: action to change its nature per the spell\'s rules for an already cast spell)'],
      10: ['Illusory Self (reaction when attacked: interpose an illusory duplicate — attacker must hit the illusion; if they do, it disappears and the attack misses; 1/short rest)'],
      14: ['Illusory Reality (once per day after casting illusion of 1st+ level: use bonus action to make one non-creature element of the illusion real for 1 minute — it can interact with the world but deal no damage)'],
    },

    'School of Necromancy': {
      2:  ['Necromancy Savant (half gold and time to copy necromancy spells)', 'Grim Harvest (when you kill a creature with a spell: regain HP equal to twice the spell level, or three times for necromancy spells; once per turn; doesn\'t apply to undead or constructs)'],
      6:  ['Undead Thralls (Animate Dead can animate one extra corpse; undead created have +wizard level HP and add prof bonus to damage)'],
      10: ['Inured to Undeath (resistance to necrotic damage; max HP can\'t be reduced)'],
      14: ['Command Undead (action: charm an undead creature within 60 ft — INT save; undead with INT ≤ 8 auto-fail; if it succeeds, can\'t be targeted again for 24 hours; charmed undead obey you completely for 24 hours if INT ≤ 8, or for 1 hour with general commands if INT > 8)'],
    },

    'School of Transmutation': {
      2:  ['Transmutation Savant (half gold and time to copy transmutation spells)', 'Minor Alchemy (spend 10 min transforming one Small/larger object of one type into another: wood→stone, stone→metal, copper→silver, silver→gold; reverts after 1 hour or if your concentration breaks)'],
      6:  ['Transmuter\'s Stone (create a magic stone over 8 hours; stone bearer gains one of: darkvision 60 ft, 10 ft movement increase, proficiency in CON saves, resistance to chosen damage type; make new stone on long rest or transmutation spell — old stone loses power)'],
      10: ['Shapechanger (cast Polymorph on yourself at will without a slot; concentration required; 1/short rest)'],
      14: ['Master Transmuter (action: destroy Transmuter\'s Stone for one of: convert matter as Major Transformation, restore creature to full HP + end conditions + disease/curse, cast Raise Dead without components, reduce creature\'s apparent age by 3d10 years)'],
    },

    'Bladesinging': {
      2:  ['Training in War and Song (proficiency in light armor and one one-handed melee weapon)', 'Bladesong (bonus action: activate for 1 minute while not in medium/heavy armor or shield — INT mod to AC, +10 walk speed, advantage on DEX (Acrobatics), +INT mod to concentration saves; 2 uses/short rest)'],
      6:  ['Extra Attack (attack twice per Attack action)'],
      10: ['Song of Defense (reaction while Bladesong active: spend spell slot to reduce damage by 5× slot level)'],
      14: ['Song of Victory (while Bladesong active: add INT mod to melee weapon damage rolls)'],
    },

    'Order of Scribes': {
      2:  ['Wizardly Quill (conjure a magic quill — bonus action; copying spells costs no gold, takes half time; quill produces ink)', 'Awakened Spellbook (use spellbook as arcane focus; ritual casting takes normal time not 10 extra minutes; when you cast a wizard spell using a slot: swap its damage type for another type from a spell in your spellbook; 1/turn)'],
      6:  ['Manifest Mind (bonus action: project spectral mind to any space within 300 ft; you can perceive from its location; cast spells from its space; flies 10 ft per turn; 1/long rest or 1 spell slot)'],
      10: ['Master Scrivener (after long rest: transcribe a 1st or 2nd level spell from spellbook onto a paper; the paper is a magic scroll usable by anyone; works only for that day; 1/long rest)'],
      14: ['One with the Word (reaction when you take damage: consult the Awakened Spellbook; you take no damage, but lose spells from your book equal to 3× levels of spells lost — random; regain them on next long rest; 1/long rest)'],
    },

    'War Magic': {
      2:  ['Arcane Deflection (reaction when you fail a save: +4 to the save; or reaction when hit: +2 AC for that hit; if you use this, only cantrips until your next turn)', 'Tactical Wit (add INT mod to Initiative rolls)'],
      6:  ['Power Surge (store up to prof bonus Power Surges; gain 1 when Counterspell or Dispel Magic succeeds; use to add extra damage equal to half wizard level to one damaging spell; lose all surges on long rest)'],
      10: ['Durable Magic (while concentrating on a spell: +2 to AC and all saves)'],
      14: ['Deflecting Shroud (when Arcane Deflection triggers: creatures of your choice within 60 ft take force damage equal to half wizard level)'],
    },

    'Chronurgy Magic': {
      2:  ['Chronal Shift (reaction: after a creature within 30 ft makes a roll — force a reroll, must use new result; 2 uses/long rest)', 'Temporal Awareness (add INT mod to Initiative)'],
      6:  ['Momentary Stasis (action: attempt to freeze a Large or smaller creature within 60 ft in time; CON save or incapacitated and speed 0 until end of its next turn; INT mod uses/long rest)'],
      10: ['Arcane Abeyance (when you cast a spell of 4th level or lower: compress it into a Tiny bead that another creature can catch and use as an action to activate the spell; bead lasts 1 minute and vanishes if not used; 1/short rest)'],
      14: ['Convergent Future (reaction: when a creature you can see within 60 ft makes a roll: choose the result of the roll; you gain 1 level of exhaustion; exhaustion from this feature can\'t be removed until long rest)'],
    },

    'Graviturgy Magic': {
      2:  ['Adjust Density (action: choose a creature within 30 ft — halve its weight for 1 minute: speed +10 ft, jump distance doubles; or double weight: speed −10 ft, proficiency on STR checks/saves; INT mod uses/long rest)', 'Gravity Blade (your cantrips that deal damage can deal force damage instead)'],
      6:  ['Gravity Well (when you deal damage to a creature: you can move it 5 ft toward or away from you; 1/creature/turn)'],
      10: ['Violent Attraction (reaction when a creature within 60 ft takes bludgeoning/falling damage: maximize one damage die for that instance; INT mod uses/long rest)'],
      14: ['Event Horizon (action: 30-ft radius sphere centered on you for 1 minute — concentration; creatures starting or entering the area take 2d10 force and speed is halved; uses action each turn to maintain; concentration)'],
    },
  },
};
