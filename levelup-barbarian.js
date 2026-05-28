// ============================================================
//  D&D 5e CLASS DATA — BARBARIAN
// ============================================================
LU_CLASS_DATA.barbarian = {

  baseFeatures: {
    1:  ['Rage (2/rest, +2 dmg, resistance to B/P/S)', 'Unarmored Defense (AC = 10 + DEX + CON)'],
    2:  ['Reckless Attack (adv on STR attacks; attackers have adv on you)', 'Danger Sense (adv on DEX saves vs seen effects)'],
    3:  ['Primal Path — choose your subclass', 'Primal Knowledge (proficiency in one skill)'],
    4:  ['ASI / Feat'],
    5:  ['Extra Attack (attack twice)', 'Fast Movement (+10 ft speed while not in heavy armor)'],
    6:  ['Path Feature', 'Rage uses: 4'],
    7:  ['Feral Instinct (adv on Initiative; can act on surprise round if raging)'],
    8:  ['ASI / Feat'],
    9:  ['Brutal Critical (roll 1 extra damage die on a melee crit)'],
    10: ['Path Feature'],
    11: ['Relentless Rage (DC 10+5×use CON save to drop to 1 HP instead of 0 while raging)'],
    12: ['ASI / Feat', 'Rage uses: 5'],
    13: ['Brutal Critical (2 extra damage dice on crit)'],
    14: ['Path Feature'],
    15: ['Persistent Rage (rage only ends early if unconscious or you choose to end it)'],
    16: ['ASI / Feat', 'Rage uses: 6'],
    17: ['Brutal Critical (3 extra damage dice on crit)'],
    18: ['Indomitable Might (use STR score instead of total for STR checks if the roll is lower)'],
    19: ['ASI / Feat'],
    20: ['Primal Champion (+4 STR, +4 CON)'],
  },

  subclasses: {

    'Path of the Berserker': {
      3:  ['Frenzy — while raging you can frenzy: make a single melee weapon attack as a bonus action each turn, but suffer one level of exhaustion when the rage ends'],
      6:  ['Mindless Rage — while raging you cannot be charmed or frightened; any active charm/fear effect is suspended for the duration'],
      10: ['Intimidating Presence — action to frighten one creature within 30 ft (WIS save DC = 8 + prof + CHA mod); repeatable each turn as an action'],
      14: ['Retaliation — when you take damage from a creature within 5 ft, use your reaction to make one melee weapon attack against that creature'],
    },

    'Path of the Totem Warrior': {
      3:  ['Spirit Seeker — cast Beast Sense and Speak with Animals as rituals', 'Totem Spirit — choose Bear (resistance to all damage except psychic while raging), Eagle (Dash as bonus action while raging, opportunity attacks against you have disadvantage), or Wolf (allies have advantage on melee attacks against any enemy within 5 ft of you while you rage)'],
      6:  ['Aspect of the Beast — choose Bear (carrying capacity doubles, advantage on STR checks), Eagle (see up to 1 mile clearly, dim light is not disadvantaged), or Wolf (track at fast pace, stealth at normal pace)'],
      10: ['Spirit Walker — cast Commune with Nature as a ritual'],
      14: ['Totemic Attunement — choose Bear (enemies within 5 ft have disadvantage on attacks against allies), Eagle (fly speed equal to walking speed while raging), or Wolf (knock Large or smaller creatures prone when you hit them with a melee attack while raging)'],
    },

    'Path of the Ancestral Guardian': {
      3:  ['Ancestral Protectors — the first creature you hit each rage has disadvantage on attacks against targets other than you, and those targets have resistance to the creature\'s attacks'],
      6:  ['Spirit Shield — reaction to reduce damage a visible ally takes by 2d6 (scales: 3d6 at level 10, 4d6 at level 14)'],
      10: ['Consult the Spirits — cast Clairvoyance or Augury once per short rest without a spell slot'],
      14: ['Vengeful Ancestors — when Spirit Shield reduces damage, the attacker takes the same amount of force damage'],
    },

    'Path of the Storm Herald': {
      3:  ['Storm Aura — while raging, you emit an aura (10 ft radius). Desert: creatures you choose take 2 fire damage. Sea: choose one creature to take 1d6 lightning damage. Tundra: choose one creature to gain 2 temp HP. (Damage/HP scales by level)'],
      6:  ['Storm Soul — Desert: fire resistance, can ignite flammable objects. Sea: lightning resistance, can breathe underwater, 30 ft swim speed. Tundra: cold resistance, immune to extreme cold, touch freezes water'],
      10: ['Shielding Storm — allies within your aura gain the resistance from Storm Soul'],
      14: ['Raging Storm — Desert: reaction to burn an attacker (STR save or take 2d6 fire). Sea: hit knocks target prone (STR save). Tundra: hit reduces target speed to 0 until your next turn (CON save)'],
    },

    'Path of the Zealot': {
      3:  ['Divine Fury — first creature hit each turn takes extra 1d6 radiant or necrotic damage (your choice at level 3) + half your barbarian level', 'Warrior of the Gods — spells that return you to life don\'t require material components'],
      6:  ['Fanatical Focus — once per rage, reroll a failed saving throw and use the new roll'],
      10: ['Zealous Presence — once per long rest, use a bonus action to grant up to 10 allies advantage on attacks and saving throws until the start of your next turn'],
      14: ['Rage Beyond Death — while raging, having 0 HP doesn\'t knock you unconscious. You still make death saves; if you fail three you die when the rage ends. Damage while at 0 HP doesn\'t cause death saves — only the rage ending does'],
    },

    'Path of the Beast': {
      3:  ['Form of the Beast — while raging, manifest one natural weapon: Bite (1d8 piercing, heal half damage once per turn), Claws (two claw attacks instead of two regular attacks, each 1d6 slashing), or Tail (reaction when hit to add 1d8 to AC for that attack; reach 10 ft)'],
      6:  ['Bestial Soul — swim/climb speed equal to walking speed; jump distance doubles; your natural weapons count as magical for overcoming resistances'],
      10: ['Infectious Fury — when you hit with a natural weapon, target must CON save (DC 8 + prof + CON mod) or be compelled to attack a creature of your choice (not you) as a reaction, or take 2d12 psychic damage'],
      14: ['Call the Hunt — bonus action to link up to CON mod willing creatures within 30 ft; each time you hit, one linked creature can deal 1d6 extra damage once per turn for the rage\'s duration'],
    },

    'Path of Wild Magic': {
      3:  ['Magic Awareness — action to detect magic within 60 ft (as Detect Magic) once per long rest', 'Wild Surge — when you rage, roll on the Wild Magic table (d8): 1 teleport 30 ft, 2 temp HP aura, 3 plants restrain nearby foes, 4 ghost fire bolts, 5 protection aura, 6 invisible until you attack, 7 random creatures appear, 8 magic flows through you'],
      6:  ['Bolstering Magic — touch a creature to either give proficiency bonus to one roll OR restore a 1st/2nd-level spell slot (consult DM); usable CON mod times per long rest'],
      10: ['Unstable Backlash — reaction when you take damage or fail a save: roll on the Wild Surge table and immediately apply the effect'],
      14: ['Controlled Surge — roll twice on the Wild Surge table and choose which result applies; if both are the same, pick any result from the table'],
    },
  },
};
