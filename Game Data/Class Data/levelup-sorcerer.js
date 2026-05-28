// ============================================================
//  D&D 5e CLASS DATA — SORCERER
// ============================================================
LU_CLASS_DATA.sorcerer = {

  baseFeatures: {
    1:  ['Sorcerous Origin — choose your subclass', 'Spellcasting (CHA-based; innate; no book required)'],
    2:  ['Font of Magic (Sorcery Points = sorcerer level; convert slots to points or points to slots)', 'Flexible Casting: 1 pt = 1st-lvl slot, 2 pts = 2nd, 3 pts = 3rd, 4 pts = 4th, 5 pts = 5th; convert slot to points = slot level'],
    3:  ['Metamagic (choose 2): Careful, Distant, Empowered, Extended, Heightened, Quickened, Subtle, Twinned, Transmuted, Seeking'],
    4:  ['ASI / Feat'],
    5:  ['No new base features'],
    6:  ['Origin Feature'],
    7:  ['No new base features'],
    8:  ['ASI / Feat'],
    9:  ['No new base features'],
    10: ['Metamagic (choose 1 more)'],
    11: ['No new base features'],
    12: ['ASI / Feat'],
    13: ['No new base features'],
    14: ['Origin Feature'],
    15: ['No new base features'],
    16: ['ASI / Feat', 'Metamagic (choose 1 more)'],
    17: ['No new base features'],
    18: ['Origin Feature'],
    19: ['ASI / Feat'],
    20: ['Sorcerous Restoration (regain 4 Sorcery Points on short rest)'],
  },

  subclasses: {

    'Draconic Bloodline': {
      1:  ['Dragon Ancestor (choose dragon type; learn associated language; advantage on Persuasion/Intimidation with dragons)', 'Draconic Resilience (AC = 13 + DEX with no armor; +1 HP per sorcerer level)'],
      6:  ['Elemental Affinity (add CHA mod to one damage roll of dragon\'s element type; spend 1 Sorcery Point for 1-hour resistance to that damage type)'],
      14: ['Dragon Wings (bonus action: sprout wings granting fly speed equal to walk speed)'],
      18: ['Draconic Presence (spend 5 Sorcery Points, action: 60-ft aura for 1 minute; creatures of your choice must WIS save or be frightened or charmed for the duration)'],
    },

    'Wild Magic': {
      1:  ['Wild Magic Surge (after casting a 1st+ level spell, DM can ask you to roll d20; on a 1, roll on the Wild Magic table)', 'Tides of Chaos (advantage on one attack, check, or save; recharges when DM triggers a Wild Magic Surge — or long rest)'],
      6:  ['Bend Luck (reaction: spend 2 Sorcery Points to add or subtract 1d4 from an attack, check, or save of another creature within 60 ft)'],
      14: ['Controlled Chaos (when Wild Magic Surge occurs, roll twice and choose which result)'],
      18: ['Spell Bombardment (when you roll damage dice and any die shows max value, roll it again and add; once per turn)'],
    },

    'Shadow Magic': {
      1:  ['Eyes of the Dark (darkvision 120 ft; spend 1 Sorcery Point to cast Darkness without components; cast through your Darkness)', 'Strength of the Grave (when reduced to 0 HP: CON save DC = 5 + damage dealt to save at 1 HP instead; fails automatically on radiant or critical; 1/long rest)'],
      6:  ['Hound of Ill Omen (spend 3 Sorcery Points: summon shadowy wolf with half your HP max, shares your Initiative; moves toward and attacks target of your choice; while targeting it, creature has disadvantage on saves against your spells)'],
      14: ['Shadow Walk (when in dim light/darkness, use bonus action to teleport up to 120 ft to another dim/dark space you can see)'],
      18: ['Umbral Form (spend 6 Sorcery Points: become shadowy form for 1 minute — resistance to non-force/radiant damage; pass through creatures and objects as difficult terrain; 5 ft movement cost if ending in object)'],
    },

    'Storm Sorcery': {
      1:  ['Wind Speaker (speak, read, write Primordial/Aquan/Auran/Ignan/Terran)', 'Tempestuous Magic (after casting a 1st+ level spell: bonus action to fly 10 ft without provoking opportunity attacks)'],
      6:  ['Heart of the Storm (resistance to lightning and thunder; when you cast lightning/thunder spell: creatures within 10 ft take CHA mod lightning or thunder damage)', 'Storm Guide (bonus action: control precipitation in 100-ft radius around you — stop rain/fog, change wind direction; lasts 1 minute)'],
      14: ['Storm\'s Fury (reaction when hit by melee: deal lightning damage equal to sorcerer level to attacker; STR save or be pushed 20 ft away)'],
      18: ['Wind Soul (immunity to lightning and thunder; fly speed 60 ft; action + 1 hour: share fly speed 30 ft with up to 3 willing creatures within 30 ft)'],
    },

    'Divine Soul': {
      1:  ['Divine Magic (access the full Cleric spell list in addition to Sorcerer; choose one additional spell from cleric list that doesn\'t count against limit)', 'Favored by the Gods (add 2d4 to a failed attack roll or save; 1/short rest)'],
      6:  ['Empowered Healing (when you or an ally within 5 ft rolls dice to heal: spend 1 Sorcery Point to reroll any number of those dice once; result must be used)'],
      14: ['Otherworldly Wings (bonus action: sprout wings — angelic: fly speed 30 ft; fiendish: fly speed 30 ft; demonic: fly speed 30 ft and darkness aura; based on alignment chosen at level 1)'],
      18: ['Unearthly Recovery (bonus action when below half HP: regain HP equal to half your HP max; 1/long rest)'],
    },

    'Aberrant Mind': {
      1:  ['Telepathic Speech (bonus action: speak telepathically with one creature within 30 ft that has a language; they can respond; lasts 1 minute; you can use any creature as a relay)', 'Psionic Spells (additional spells always prepared that don\'t count against limit; listed by level)'],
      6:  ['Psionic Sorcery (spend Sorcery Points equal to spell level to cast psionic-origin spells silently and without material components)'],
      14: ['Revelation in Flesh (bonus action: spend 1+ Sorcery Points for 10 minutes — 1pt: see invisibility/ethereal within 60 ft; 2pts: 40 ft swim speed and breathe water; 3pts: 40 ft fly speed; 4pts: move through creatures/objects at 15-ft cost; ending in object takes 5 force)'],
      18: ['Warping Implosion (action: teleport to unoccupied space within 120 ft; each creature within 30 ft of your old space must STR save or take 3d10 force and be pulled to your old location; 1/long rest or 5 Sorcery Points)'],
    },

    'Clockwork Soul': {
      1:  ['Clockwork Magic (additional always-prepared spells at each level; alarm, protection from evil and good, aid, lesser restoration, dispel magic, protection from energy, freedom of movement, summon construct, wall of force, hold monster)', 'Restore Balance (reaction: cancel advantage or disadvantage on any roll within 60 ft; prof bonus uses per long rest)'],
      6:  ['Bastion of Law (spend 1–5 Sorcery Points as action: give a creature within 30 ft a ward — ward absorbs damage equal to 5× points spent; ward lasts until next long rest or depleted; 1 target at a time)'],
      14: ['Trance of Order (bonus action: enter perfect order for 1 minute — can\'t be surprised, advantage on attacks, attacks against you can\'t benefit from advantage; 1/long rest or 5 Sorcery Points)'],
      18: ['Clockwork Cavalcade (action: 30-ft cube of order for 1 round: repair 4d10 HP to creatures of your choice; end all conditions; end all spells and effects that could be dispelled; 1/long rest or 7 Sorcery Points)'],
    },
  },
};
