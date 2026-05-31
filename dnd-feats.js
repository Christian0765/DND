// ============================================================
//  D&D 5e FEATS DATA — ALL PHB + COMMON TASHA'S FEATS
// ============================================================

const DND_FEAT_DATA = {};

// Structure: { name, prerequisite, desc, bonuses: {stat?, skill?, proficiency?} }

const _feats = [

  // ── PHB FEATS ────────────────────────────────────────────

  { name:'Alert',
    prerequisite: null,
    desc: '+5 bonus to Initiative. You can\'t be surprised while conscious. Other creatures don\'t gain advantage on attack rolls against you as a result of being unseen by you.',
    bonuses: { initiative: 5 } },

  { name:'Athlete',
    prerequisite: null,
    desc: '+1 STR or DEX (your choice). Climbing no longer costs extra movement. Running long jump now only needs 5 ft of running start instead of 10. Standing from prone costs only 5 ft of movement.',
    bonuses: { statChoice: ['str','dex'] } },

  { name:'Actor',
    prerequisite: null,
    desc: '+1 CHA. Advantage on Deception and Performance checks when trying to pass yourself off as someone else. Mimic the speech or sounds of another person or creature (Insight DC = 8 + prof + CHA mod to detect).',
    bonuses: { cha: 1 } },

  { name:'Charger',
    prerequisite: null,
    desc: 'When you use Dash and then make a melee attack as a bonus action: +5 to damage or push target 10 ft away (on hit). Or if you move 10 ft in a straight line before hitting: one of those two effects.',
    bonuses: {} },

  { name:'Crossbow Expert',
    prerequisite: null,
    desc: 'Ignore loading property on crossbows. Being within 5 ft of hostile creature doesn\'t impose disadvantage on ranged attack rolls. When you use Attack action with a one-handed weapon, you can use a bonus action to attack with a hand crossbow.',
    bonuses: {} },

  { name:'Defensive Duelist',
    prerequisite: 'Proficiency with finesse weapon',
    desc: 'When wielding a finesse weapon and attacked, use reaction to add proficiency bonus to AC for that attack (potentially causing it to miss).',
    bonuses: {} },

  { name:'Dual Wielder',
    prerequisite: null,
    desc: '+1 AC while wielding a melee weapon in each hand. Use two-weapon fighting with weapons that aren\'t light. Draw or stow two weapons simultaneously.',
    bonuses: { ac: 1 } },

  { name:'Dungeon Delver',
    prerequisite: null,
    desc: 'Advantage on Perception and Investigation checks to detect secret doors. Advantage on saving throws against traps. Resistance to trap damage. Searching for traps doesn\'t require concentration.',
    bonuses: {} },

  { name:'Durable',
    prerequisite: null,
    desc: '+1 CON. When rolling a Hit Die for HP recovery during short rest, minimum roll is twice your CON modifier (minimum 2).',
    bonuses: { con: 1 } },

  { name:'Elemental Adept',
    prerequisite: 'Ability to cast at least one spell',
    desc: 'Choose acid, cold, fire, lightning, or thunder. Spells of that damage type ignore resistance. When you roll damage dice for a spell of that type, treat any 1 as a 2.',
    bonuses: {} },

  { name:'Grappler',
    prerequisite: 'STR 13+',
    desc: 'Advantage on attack rolls against creatures you are grappling. Use action to try to pin a grappled creature — both you and target are restrained until grapple ends.',
    bonuses: {} },

  { name:'Great Weapon Master',
    prerequisite: null,
    desc: 'When you score a crit or reduce a creature to 0 HP with a melee weapon: make one melee weapon attack as a bonus action. Before making a melee attack with a heavy weapon: take -5 to attack roll; on hit, +10 damage.',
    bonuses: {} },

  { name:'Healer',
    prerequisite: null,
    desc: 'Use a healer\'s kit to stabilize a creature, and that creature also regains 1 HP. Action: spend one use of healer\'s kit to restore 1d6 + 4 HP + target\'s max HD to a creature. Once per short rest per creature.',
    bonuses: {} },

  { name:'Heavily Armored',
    prerequisite: 'Proficiency with medium armor',
    desc: '+1 STR. Gain proficiency with heavy armor.',
    bonuses: { str: 1 } },

  { name:'Heavy Armor Master',
    prerequisite: 'Proficiency with heavy armor',
    desc: '+1 STR. While wearing heavy armor: bludgeoning, piercing, and slashing damage from nonmagical attacks reduced by 3.',
    bonuses: { str: 1 } },

  { name:'Inspiring Leader',
    prerequisite: 'CHA 13+',
    desc: '10-minute speech: up to 6 creatures gain temp HP equal to your level + CHA modifier. Once per short or long rest per creature.',
    bonuses: {} },

  { name:'Keen Mind',
    prerequisite: null,
    desc: '+1 INT. You always know which way north is. You always know roughly how many hours until the next sunrise or sunset. Can recall anything seen or heard within the last month accurately.',
    bonuses: { int: 1 } },

  { name:'Lightly Armored',
    prerequisite: null,
    desc: '+1 STR or DEX. Gain proficiency with light armor.',
    bonuses: { statChoice: ['str','dex'] } },

  { name:'Linguist',
    prerequisite: null,
    desc: '+1 INT. Learn 3 languages of your choice. Create ciphers — others must succeed on INT check (DC = INT mod + proficiency) to decode your writing.',
    bonuses: { int: 1 } },

  { name:'Lucky',
    prerequisite: null,
    desc: '3 luck points per long rest. Spend 1 point when you make an attack roll, ability check, or saving throw: roll an additional d20 and choose which to use. Or spend 1 point when creature attacks you: roll d20 and choose which they use.',
    bonuses: {} },

  { name:'Mage Slayer',
    prerequisite: null,
    desc: 'When a creature within 5 ft casts a spell: use reaction to make one melee weapon attack. When you damage a concentrating creature: they have disadvantage on the concentration save. Advantage on saving throws against spells cast by creatures within 5 ft.',
    bonuses: {} },

  { name:'Magic Initiate',
    prerequisite: null,
    desc: 'Choose a class (bard, cleric, druid, sorcerer, warlock, or wizard). Learn 2 cantrips from that class\'s list. Learn 1 1st-level spell from that list; cast it once per long rest without a spell slot. Use that class\'s spellcasting ability.',
    bonuses: {} },

  { name:'Martial Adept',
    prerequisite: null,
    desc: 'Learn 2 maneuvers from the Battle Master archetype (Superiority Die = d6). Gain 1 Superiority Die. Regain uses on short/long rest.',
    bonuses: {} },

  { name:'Medium Armor Master',
    prerequisite: 'Proficiency with medium armor',
    desc: 'Wearing medium armor doesn\'t impose disadvantage on Stealth checks. Maximum DEX bonus to AC from medium armor becomes +3 (instead of +2).',
    bonuses: {} },

  { name:'Mobile',
    prerequisite: null,
    desc: '+10 ft speed. When you Dash, difficult terrain doesn\'t cost extra movement for that turn. When you make a melee attack against a creature, you don\'t provoke opportunity attacks from it for the rest of the turn (hit or miss).',
    bonuses: { speed: 10 } },

  { name:'Moderately Armored',
    prerequisite: 'Proficiency with light armor',
    desc: '+1 STR or DEX. Gain proficiency with medium armor and shields.',
    bonuses: { statChoice: ['str','dex'] } },

  { name:'Mounted Combatant',
    prerequisite: null,
    desc: 'Advantage on melee attack rolls against unmounted creatures smaller than your mount. Force attacks targeting mount to target you instead. If mount is subject to DEX save for half damage, it takes no damage on success (and half on fail).',
    bonuses: {} },

  { name:'Observant',
    prerequisite: null,
    desc: '+1 INT or WIS. Lip reading — if you can see a creature\'s mouth while it speaks in a language you know, you can understand it without hearing. +5 to passive Perception and passive Investigation scores.',
    bonuses: { statChoice: ['int','wis'], passivePerception: 5, passiveInvestigation: 5 } },

  { name:'Polearm Master',
    prerequisite: null,
    desc: 'Bonus action: hit with opposite end of glaive, halberd, or quarterstaff (1d4 bludgeoning). Quarterstaff, glaive, and halberd have 10-ft reach for opportunity attacks.',
    bonuses: {} },

  { name:'Resilient',
    prerequisite: null,
    desc: '+1 to chosen ability score. Gain proficiency in saving throws using the chosen ability.',
    bonuses: { statChoice: ['str','dex','con','int','wis','cha'] } },

  { name:'Ritual Caster',
    prerequisite: 'INT or WIS 13+',
    desc: 'Acquire a ritual book with 2 1st-level ritual spells. Can cast spells in book as rituals. Can copy ritual spells found on scrolls or books into your ritual book (50 gp and 2 hours per level of spell).',
    bonuses: {} },

  { name:'Savage Attacker',
    prerequisite: null,
    desc: 'Once per turn when you roll damage for a melee weapon attack: roll the dice twice and use either result.',
    bonuses: {} },

  { name:'Sentinel',
    prerequisite: null,
    desc: 'When you hit a creature with an opportunity attack: its speed becomes 0 for the rest of the turn. Creatures within your reach provoke opportunity attacks from you even when they Disengage. When a creature within 5 ft attacks a target other than you: use reaction to make melee weapon attack against that creature.',
    bonuses: {} },

  { name:'Sharpshooter',
    prerequisite: null,
    desc: 'Long range attacks don\'t impose disadvantage. Ranged attacks ignore half and three-quarters cover. Before ranged attack: take -5 to attack roll; on hit, +10 damage.',
    bonuses: {} },

  { name:'Shield Master',
    prerequisite: null,
    desc: 'If you take Attack action: bonus action to shove an adjacent creature. Shield\'s bonus to AC also applies to DEX saves from effects targeting only you. Use reaction when succeeding on DEX save for half damage: take no damage instead.',
    bonuses: {} },

  { name:'Skilled',
    prerequisite: null,
    desc: 'Gain proficiency in any combination of 3 skills or tools.',
    bonuses: {} },

  { name:'Skulker',
    prerequisite: 'DEX 13+',
    desc: 'Hide when only lightly obscured. Missing a ranged attack while hidden doesn\'t reveal position. Dim light doesn\'t impose disadvantage on Perception checks.',
    bonuses: {} },

  { name:'Spell Sniper',
    prerequisite: 'Ability to cast at least one spell',
    desc: 'Range of spells requiring attack rolls is doubled. Ranged spell attacks ignore half and three-quarters cover. Learn one cantrip from any class that requires an attack roll.',
    bonuses: {} },

  { name:'Tavern Brawler',
    prerequisite: null,
    desc: '+1 STR or CON. Proficiency with improvised weapons and unarmed strikes. Unarmed strike damage die = d4. Grapple as bonus action when you hit with unarmed strike or improvised weapon.',
    bonuses: { statChoice: ['str','con'] } },

  { name:'Tough',
    prerequisite: null,
    desc: 'HP maximum increases by 2 × your level. Each time you gain a level, HP max increases by an additional 2.',
    bonuses: { hpPerLevel: 2 } },

  { name:'War Caster',
    prerequisite: 'Ability to cast at least one spell',
    desc: 'Advantage on concentration saves when taking damage. Perform somatic spell components while holding weapons or shield. When creature provokes opportunity attack: use reaction to cast a spell with 1-action cast time and single target instead of the attack.',
    bonuses: {} },

  { name:'Weapon Master',
    prerequisite: null,
    desc: '+1 STR or DEX. Gain proficiency with 4 weapons of your choice.',
    bonuses: { statChoice: ['str','dex'] } },

  // ── TASHA'S CAULDRON FEATS ───────────────────────────────

  { name:'Artificer Initiate',
    prerequisite: null,
    desc: 'Learn 1 cantrip from the Artificer spell list (INT spellcasting). Learn 1 1st-level artificer spell; cast once per long rest without a slot, or using spell slots if you have them. Proficiency with one artisan\'s tool (double proficiency if already proficient).',
    bonuses: {} },

  { name:'Chef',
    prerequisite: null,
    desc: '+1 CON or WIS. Proficiency with cook\'s utensils (double if already). Short rest: spend 30 min cooking to produce treats equal to prof bonus (each grants 1d8 temp HP, lasts 1 hour). Long rest: cook a special meal for prof bonus creatures (each regains additional 1d8 HP beyond normal resting).',
    bonuses: { statChoice: ['con','wis'] } },

  { name:'Crusher',
    prerequisite: null,
    desc: '+1 STR or CON. When dealing bludgeoning damage, move target 5 ft (once per turn). On a crit with bludgeoning damage: all attacks against that creature have advantage until the start of your next turn.',
    bonuses: { statChoice: ['str','con'] } },

  { name:'Eldritch Adept',
    prerequisite: 'Spellcasting feature or Pact Magic',
    desc: 'Learn one Eldritch Invocation of your choice (from the Warlock list). If the invocation has prerequisites, you must meet them. Retrain this feat\'s invocation on a level-up.',
    bonuses: {} },

  { name:'Fey Touched',
    prerequisite: null,
    desc: '+1 INT, WIS, or CHA. Learn Misty Step and one 1st-level divination or enchantment spell from any class list. Cast each once per long rest without a slot, or with spell slots if you have them.',
    bonuses: { statChoice: ['int','wis','cha'] } },

  { name:'Fighting Initiate',
    prerequisite: 'Proficiency with a martial weapon',
    desc: 'Learn one Fighting Style of your choice (from the Fighter list). Can retrain this feat\'s Fighting Style whenever you gain a level in a class with the Fighting Style feature.',
    bonuses: {} },

  { name:'Gunner',
    prerequisite: null,
    desc: '+1 DEX. Proficiency with firearms. Ignore loading property of firearms. Being within 5 ft of hostile creature doesn\'t impose disadvantage on ranged attack rolls with firearms.',
    bonuses: { dex: 1 } },

  { name:'Metamagic Adept',
    prerequisite: 'Spellcasting or Pact Magic feature',
    desc: 'Learn 2 Metamagic options (from Sorcerer list). Gain 2 Sorcery Points (add to existing pool if Sorcerer; otherwise separate pool). Can use Metamagic on your spells using these Sorcery Points.',
    bonuses: {} },

  { name:'Piercer',
    prerequisite: null,
    desc: '+1 STR or DEX. Once per turn when dealing piercing damage: reroll one damage die (must use new result). On a crit with piercing: roll one additional damage die.',
    bonuses: { statChoice: ['str','dex'] } },

  { name:'Poisoner',
    prerequisite: null,
    desc: 'Proficiency with poisoner\'s kit (double if already). Ignore poison resistance. Bonus action: apply poison to a weapon or 3 pieces of ammunition (lasts 1 minute; on hit CON save or 2d8 poison + poisoned until end of your next turn). Craft potions of poison during long rest (2d4+10 gp materials, 50 gp sale value).',
    bonuses: {} },

  { name:'Shadow Touched',
    prerequisite: null,
    desc: '+1 INT, WIS, or CHA. Learn Invisibility and one 1st-level illusion or necromancy spell from any class list. Cast each once per long rest without a slot, or with spell slots if you have them.',
    bonuses: { statChoice: ['int','wis','cha'] } },

  { name:'Skill Expert',
    prerequisite: null,
    desc: '+1 to any ability score. Gain proficiency in one skill. Gain Expertise in one skill you\'re already proficient in.',
    bonuses: { statChoice: ['str','dex','con','int','wis','cha'] } },

  { name:'Slasher',
    prerequisite: null,
    desc: '+1 STR or DEX. Once per turn when dealing slashing damage: reduce target\'s speed by 10 ft until start of your next turn. On a crit with slashing: target has disadvantage on attack rolls until start of your next turn.',
    bonuses: { statChoice: ['str','dex'] } },

  { name:'Telekinetic',
    prerequisite: null,
    desc: '+1 INT, WIS, or CHA. Learn Mage Hand cantrip (or increase range by 30 ft if already known); hand is invisible. Bonus action: telekinetic shove — move one creature within 30 ft of your mage hand up to 5 ft (STR save DC = 8 + prof + modifier to resist).',
    bonuses: { statChoice: ['int','wis','cha'] } },

  { name:'Telepathic',
    prerequisite: null,
    desc: '+1 INT, WIS, or CHA. Speak telepathically with any creature within 60 ft that has a language (one-way; creature can respond verbally). Cast Detect Thoughts once per long rest without a spell slot.',
    bonuses: { statChoice: ['int','wis','cha'] } },

  { name:'Poisoner\'s Initiate',
    prerequisite: null,
    desc: 'Deprecated — see Poisoner feat above.',
    bonuses: {} },

  // ── ADDITIONAL POPULAR FEATS ─────────────────────────────

  { name:'Polearm Master',
    prerequisite: null,
    desc: 'When you take Attack action with a glaive, halberd, pike, or quarterstaff: bonus action to attack with the butt end (1d4 bludgeoning). Creatures entering your reach while wielding those weapons provoke an opportunity attack.',
    bonuses: {} },

  { name:'Great Weapon Master',
    prerequisite: null,
    desc: 'When you score a critical hit or reduce a creature to 0 HP with a melee weapon: bonus action to make one melee weapon attack. Before a melee attack with a heavy weapon: optionally take -5 to attack roll for +10 damage on a hit.',
    bonuses: {} },

  { name:'Warcaster',
    prerequisite: 'Ability to cast at least one spell',
    desc: 'Advantage on Constitution saving throws to maintain concentration when damaged. Can perform somatic components while wielding weapons or a shield. When a creature provokes an opportunity attack: cast a spell with a casting time of 1 action and a single target as the attack instead.',
    bonuses: {} },

  { name:'Inspiring Leader',
    prerequisite: 'Charisma 13 or higher',
    desc: 'Spend 10 minutes giving an inspiring speech. Up to 6 friendly creatures gain temporary hit points equal to your level + your Charisma modifier. Once per short or long rest per creature.',
    bonuses: {} },

  { name:'Aberrant Dragonmark',
    prerequisite: 'No existing Dragonmark',
    desc: '+1 CON. Gain a randomly determined 1st-level spell; cast it once per long rest (CON is spellcasting ability). When you cast it, roll d6: on 1 take 1d6 force damage per spell level. Constitution 16+: learn an additional cantrip from the sorcerer list.',
    bonuses: { con: 1 } },

  { name:'Cohort of Chaos',
    prerequisite: null,
    desc: 'Roll on Wild Magic table at start of each turn (DM decides). Benefit: chaos bursts — random beneficial or detrimental effects. Also, advantage on Charisma checks to impress with unpredictability.',
    bonuses: {} },

  { name:'Gift of the Chromatic Dragon',
    prerequisite: null,
    desc: 'Chromatic Infusion (bonus action, prof bonus uses per long rest): touch a simple/martial weapon — deals +1d4 of chosen energy type (acid/cold/fire/lightning/poison) on hit for 1 minute. Reactive Resistance (reaction): gain resistance to acid, cold, fire, lightning, or poison damage once per long rest.',
    bonuses: {} },

  { name:'Gift of the Gem Dragon',
    prerequisite: '+1 INT, WIS, or CHA',
    desc: '+1 INT, WIS, or CHA. Telekinetic Reprisal (reaction when taking damage): psychic energy erupts — each creature within 10 ft takes 2d8 psychic damage (INT/WIS/CHA save for half; DC = 8 + prof + modifier). Prof bonus uses per long rest.',
    bonuses: { statChoice: ['int','wis','cha'] } },

  { name:'Gift of the Metallic Dragon',
    prerequisite: null,
    desc: 'Protective Wings (reaction when creature within 5 ft hit): impose disadvantage on the attack roll; use once per long rest. Draconic Healing: learn Cure Wounds; cast once per long rest without a slot (INT/WIS/CHA spellcasting ability).',
    bonuses: {} },

];

// Index by name
_feats.forEach(feat => {
  // Deduplicate (some feats repeated)
  if (!DND_FEAT_DATA[feat.name]) {
    DND_FEAT_DATA[feat.name] = feat;
  }
});

// Helper: get all feats as sorted array
DND_FEAT_DATA.getAll = () =>
  Object.values(DND_FEAT_DATA)
    .filter(f => typeof f === 'object' && f.name)
    .sort((a, b) => a.name.localeCompare(b.name));

// Helper: search feats
DND_FEAT_DATA.search = (query) => {
  const q = query.toLowerCase();
  return DND_FEAT_DATA.getAll().filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.desc.toLowerCase().includes(q)
  );
};

console.log('[DND Feat Data] loaded —', DND_FEAT_DATA.getAll().length, 'feats');
