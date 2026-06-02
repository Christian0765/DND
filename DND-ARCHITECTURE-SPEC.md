# DND Campaign Tracker — Full Architecture Specification
## Version 1.0 — Master Blueprint for Coding Agent
---
## Overview
This document is the complete architectural specification for rebuilding the DND Campaign Tracker backend from Firebase/Firestore to Supabase. The frontend UI (all CSS, layouts, animations, the sheet design) stays exactly the same. Only the data layer changes.
Read this entire document before writing any code. Every decision has been made deliberately. Do not introduce architectural changes not described here.
---
## Repository
- GitHub: https://github.com/christian0765/DND
- Live URL: https://christian0765.github.io/DND
- Stack: Vanilla HTML/CSS/JS, GitHub Pages hosting
- New backend: Supabase (PostgreSQL + Auth + Realtime)
---
## Core Principles
1. **Field-level saves** — never save an entire document at once. Only save the specific field that changed. This prevents simultaneous edits from overwriting each other.
2. **Atomic increments for numeric values** — HP, gold, resource counts must use `+= delta` operations, never absolute overwrites. Two people editing HP at the same time must both apply correctly.
3. **Server-side enforcement** — sheet locks, role permissions, and campaign membership are enforced by Supabase Row Level Security, not by client-side UI checks. A locked sheet rejects writes at the database level.
4. **Soft deletes only** — never hard delete any row. Add `deleted_at TIMESTAMPTZ` to every table. Restore accidentally deleted data from the Supabase dashboard.
5. **System data in JSON files, campaign data in the database** — D&D reference data (races, weapons, spells, class features) lives in `/data/rulesets/` files in the repo. Player/campaign-specific data lives in Supabase.
6. **Homebrew layers on top of system data** — campaign homebrew is fetched from the database and merged with the ruleset JSON files at runtime. Homebrew always wins on name conflicts.
---
## User Roles & Access
A user is a person with a Supabase auth account. A user can have different roles in different campaigns simultaneously.
| Role | Access |
|------|--------|
| DM | Full read/write on all data in their campaign. Can edit any character sheet, add enemies, lock sheets, manage NPCs, quests, shop. |
| Player | Read all character sheets in their campaign. Write only their own character sheet (when not locked). |
| Guest | Read-only access to all public campaign data. No writes. |
Roles are stored on the `memberships` table, not on the user. One person can be DM in Campaign A and Player in Campaign B using the same account.
---
## Database Schema
### `users` (managed by Supabase Auth)
```sql
-- Auto-created by Supabase Auth
-- Extended with a profiles table:
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
### `campaigns`
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Campaign Tracker',
  banner_url TEXT,
  dm_notes TEXT,
  ruleset TEXT NOT NULL DEFAULT '5e-2014',
  theme_preset TEXT DEFAULT 'classic',
  theme_vars JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
```
### `memberships`
```sql
CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('dm', 'player', 'guest')),
  accent_hex TEXT DEFAULT '#c4920a',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, campaign_id)
);
```
### `characters`
```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID REFERENCES memberships(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  ruleset_override TEXT,
  locked BOOLEAN DEFAULT FALSE,
  -- Identity
  name TEXT DEFAULT '',
  class TEXT DEFAULT '',
  race TEXT DEFAULT '',
  background TEXT DEFAULT '',
  alignment TEXT DEFAULT '',
  player_name TEXT DEFAULT '',
  prof_bonus TEXT DEFAULT '+2',
  portrait_url TEXT,
  -- Combat stats
  ac INTEGER DEFAULT 10,
  initiative INTEGER DEFAULT 0,
  speed INTEGER DEFAULT 30,
  cur_hp INTEGER DEFAULT 0,
  max_hp INTEGER DEFAULT 0,
  temp_hp INTEGER DEFAULT 0,
  hit_dice TEXT DEFAULT '1d8',
  passive_perception INTEGER DEFAULT 10,
  carry_capacity INTEGER DEFAULT 0,
  -- Ability scores
  str INTEGER DEFAULT 10, str_mod INTEGER DEFAULT 0,
  dex INTEGER DEFAULT 10, dex_mod INTEGER DEFAULT 0,
  con INTEGER DEFAULT 10, con_mod INTEGER DEFAULT 0,
  int INTEGER DEFAULT 10, int_mod INTEGER DEFAULT 0,
  wis INTEGER DEFAULT 10, wis_mod INTEGER DEFAULT 0,
  cha INTEGER DEFAULT 10, cha_mod INTEGER DEFAULT 0,
  -- Free text fields
  traits TEXT DEFAULT '',
  ideals TEXT DEFAULT '',
  bonds TEXT DEFAULT '',
  flaws TEXT DEFAULT '',
  backstory TEXT DEFAULT '',
  -- Cosmetics
  accent_hex TEXT,
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);
```
### `currency`
```sql
CREATE TABLE currency (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE UNIQUE,
  pp INTEGER DEFAULT 0,
  gp INTEGER DEFAULT 0,
  ep INTEGER DEFAULT 0,
  sp INTEGER DEFAULT 0,
  cp INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
### `items` (master item list — DM creates, campaign-scoped)
```sql
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '📦',
  category TEXT DEFAULT 'misc'
    CHECK (category IN ('weapons','armor','magical','resources','healing','food','misc')),
  weight NUMERIC DEFAULT 0,
  value_gp NUMERIC DEFAULT 0,
  is_magical BOOLEAN DEFAULT FALSE,
  properties JSONB DEFAULT '{}',
  source TEXT DEFAULT 'dm',
  deleted_at TIMESTAMPTZ
);
```
### `character_inventory`
```sql
CREATE TABLE character_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  equipped BOOLEAN DEFAULT FALSE,
  attuned BOOLEAN DEFAULT FALSE,
  notes TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
### `weapons`
```sql
CREATE TABLE weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '⚔',
  atk_bonus INTEGER DEFAULT 0,
  dmg_dice TEXT DEFAULT '1d6',
  dmg_bonus INTEGER DEFAULT 0,
  dmg_type TEXT DEFAULT 'slashing',
  range TEXT DEFAULT '5 ft',
  properties JSONB DEFAULT '[]',
  notes TEXT DEFAULT '',
  ammo_item_id UUID REFERENCES items(id),
  is_save BOOLEAN DEFAULT FALSE,
  save_dc INTEGER,
  save_stat TEXT,
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ
);
```
### `features`
```sql
CREATE TABLE features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT 'passive'
    CHECK (category IN ('maneuver','action','passive','reaction','racial','fighting-style','homebrew')),
  formula TEXT,
  recharge TEXT,
  source_class TEXT DEFAULT '',
  source_level INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ
);
```
### `resources`
```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  total INTEGER DEFAULT 1,
  used INTEGER DEFAULT 0,
  die_type TEXT,
  recover TEXT DEFAULT 'Long rest',
  category TEXT DEFAULT 'action',
  sort_order INTEGER DEFAULT 0
);
```
### `spell_slots`
```sql
CREATE TABLE spell_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE UNIQUE,
  slots_total JSONB DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}',
  slots_used JSONB DEFAULT '{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0}',
  pact_slots_total INTEGER DEFAULT 0,
  pact_slots_used INTEGER DEFAULT 0,
  pact_slot_level INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
### `npcs`
```sql
CREATE TABLE npcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  race TEXT DEFAULT '',
  role TEXT DEFAULT '',
  relation TEXT DEFAULT 'neutral',
  status TEXT DEFAULT 'alive'
    CHECK (status IN ('alive','dead','unknown','missing')),
  last_seen_location TEXT DEFAULT '',
  public_notes TEXT DEFAULT '',
  dm_notes TEXT DEFAULT '',
  portrait_url TEXT,
  first_appeared_session INTEGER,
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ
);
```
### `quests`
```sql
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'hidden'
    CHECK (status IN ('hidden','active','completed','failed')),
  reward TEXT DEFAULT '',
  giver_npc_id UUID REFERENCES npcs(id),
  dm_notes TEXT DEFAULT '',
  created_session INTEGER,
  completed_session INTEGER,
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ
);
```
### `locations`
```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT DEFAULT 'location'
    CHECK (type IN ('city','dungeon','region','landmark','location')),
  description TEXT DEFAULT '',
  dm_notes TEXT DEFAULT '',
  discovered BOOLEAN DEFAULT FALSE,
  connected_to UUID[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ
);
```
### `factions`
```sql
CREATE TABLE factions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  alignment TEXT DEFAULT '',
  dm_notes TEXT DEFAULT '',
  deleted_at TIMESTAMPTZ
);
```
### `faction_reputations`
```sql
CREATE TABLE faction_reputations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faction_id UUID REFERENCES factions(id) ON DELETE CASCADE,
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  reputation INTEGER DEFAULT 0,
  notes TEXT DEFAULT '',
  UNIQUE(faction_id, character_id)
);
```
### `shop_listings`
```sql
CREATE TABLE shop_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE CASCADE,
  price_gp NUMERIC DEFAULT 0,
  quantity_available INTEGER DEFAULT -1,
  visible_to_players BOOLEAN DEFAULT FALSE,
  notes TEXT DEFAULT '',
  deleted_at TIMESTAMPTZ
);
```
### `homebrew`
```sql
CREATE TABLE homebrew (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('weapon','race','class','item','spell','feature')),
  name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_by_dm BOOLEAN DEFAULT TRUE,
  visible_to_players BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ
);
```
### `combat_sessions`
```sql
CREATE TABLE combat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE UNIQUE,
  round INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT FALSE,
  combatants JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
### `session_logs`
```sql
CREATE TABLE session_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  session_number INTEGER NOT NULL,
  session_date DATE DEFAULT CURRENT_DATE,
  dm_notes TEXT DEFAULT '',
  player_notes JSONB DEFAULT '{}',
  deleted_at TIMESTAMPTZ
);
```
### `ui_preferences`
```sql
CREATE TABLE ui_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID REFERENCES memberships(id) ON DELETE CASCADE UNIQUE,
  cosmetic_vars JSONB DEFAULT '{}',
  display_mode TEXT DEFAULT 'modern',
  section_order JSONB DEFAULT '{}',
  hidden_sections JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
---
## Row Level Security Rules
```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
-- (repeat for all tables)
-- Profiles: users can only read/write their own
CREATE POLICY "profiles_own" ON profiles
  USING (id = auth.uid());
-- Campaigns: members can read, DM can write
CREATE POLICY "campaigns_read" ON campaigns
  FOR SELECT USING (
    id IN (
      SELECT campaign_id FROM memberships WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "campaigns_write" ON campaigns
  FOR ALL USING (
    id IN (
      SELECT campaign_id FROM memberships
      WHERE user_id = auth.uid() AND role = 'dm'
    )
  );
-- Characters: members can read all in campaign,
-- players write own (if not locked), DM writes any
CREATE POLICY "characters_read" ON characters
  FOR SELECT USING (
    campaign_id IN (
      SELECT campaign_id FROM memberships WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "characters_write_player" ON characters
  FOR UPDATE USING (
    locked = FALSE AND
    membership_id IN (
      SELECT id FROM memberships WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "characters_write_dm" ON characters
  FOR ALL USING (
    campaign_id IN (
      SELECT campaign_id FROM memberships
      WHERE user_id = auth.uid() AND role = 'dm'
    )
  );
-- NPCs, quests, locations: members read non-hidden,
-- DM reads and writes all
CREATE POLICY "npcs_read_players" ON npcs
  FOR SELECT USING (
    campaign_id IN (
      SELECT campaign_id FROM memberships WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "npcs_write_dm" ON npcs
  FOR ALL USING (
    campaign_id IN (
      SELECT campaign_id FROM memberships
      WHERE user_id = auth.uid() AND role = 'dm'
    )
  );
-- (repeat pattern for quests, locations, factions, shop_listings)
-- DM notes fields: never exposed to players
-- These are enforced by only selecting them in DM-role queries
-- Never select dm_notes in player-facing queries
```
---
## JSON Data File Structure
System reference data lives in the repo, not the database.
```
/data/rulesets/
  5e-2014/
    sheet_schema.json     -- which sections appear on the sheet
    weapons.json
    armor.json
    races.json
    spells.json
    conditions.json
    classes/
      fighter.json
      wizard.json
      sorcerer.json
      rogue.json
      barbarian.json
      monk.json
      paladin.json
      ranger.json
      cleric.json
      druid.json
      bard.json
      warlock.json
      artificer.json
  5e-2024/
    (same structure)
```
### sheet_schema.json format
```json
{
  "ruleset": "5e-2014",
  "sections": [
    "ability-scores",
    "combat",
    "hit-points",
    "currency",
    "hit-dice",
    "conditions",
    "exhaustion",
    "death-saves",
    "spell-slots",
    "concentration",
    "weapons",
    "proficiencies",
    "features",
    "resources",
    "cantrips",
    "spells",
    "equipment",
    "personality",
    "backstory",
    "attunement"
  ]
}
```
### class file format (example: fighter.json)
```json
{
  "name": "Fighter",
  "hitDie": "d10",
  "primaryAbility": "str",
  "savingThrows": ["str", "con"],
  "proficiencies": {
    "armor": ["Heavy", "Medium", "Light", "Shields"],
    "weapons": ["Martial", "Simple"],
    "tools": [],
    "skills": ["choose 2 from Athletics, Acrobatics, History, Insight, Intimidation, Perception, Survival"]
  },
  "features": [
    {
      "level": 1,
      "name": "Second Wind",
      "category": "action",
      "formula": "1d10 + {level}",
      "recharge": "Short rest",
      "description": "Bonus action: regain HP equal to 1d10 + your fighter level. Once per short or long rest."
    },
    {
      "level": 2,
      "name": "Action Surge",
      "category": "action",
      "recharge": "Short rest",
      "description": "Take one additional action on your turn. Once per short rest."
    }
  ],
  "subclasses": {
    "battle-master": {
      "name": "Battle Master",
      "features": [
        {
          "level": 3,
          "name": "Superiority Dice",
          "category": "maneuver",
          "die": "d8",
          "recharge": "Short rest"
        }
      ]
    }
  },
  "spellcasting": null
}
```
---
## How System Data + Homebrew Merge
```js
async function loadCharacterData(character, campaignId) {
  const ruleset = character.ruleset_override || campaign.ruleset || '5e-2014';
  // 1. Load system data from JSON files
  const [weapons, classData, schema] = await Promise.all([
    fetch(`/data/rulesets/${ruleset}/weapons.json`).then(r => r.json()),
    fetch(`/data/rulesets/${ruleset}/classes/${characterClass}.json`).then(r => r.json()),
    fetch(`/data/rulesets/${ruleset}/sheet_schema.json`).then(r => r.json()),
  ]);
  // 2. Load campaign homebrew from Supabase
  const { data: homebrew } = await supabase
    .from('homebrew')
    .select('*')
    .eq('campaign_id', campaignId)
    .is('deleted_at', null);
  // 3. Merge — homebrew wins on name conflicts
  const homebrewWeapons = homebrew.filter(h => h.type === 'weapon').map(h => h.properties);
  const allWeapons = mergeByName(weapons, homebrewWeapons);
  return { weapons: allWeapons, classData, schema };
}
function mergeByName(system, homebrew) {
  const map = {};
  system.forEach(item => map[item.name] = item);
  homebrew.forEach(item => map[item.name] = item); // homebrew overwrites
  return Object.values(map);
}
```
---
## Field-Level Save Pattern
Never save the entire character object. Only save what changed.
```js
// WRONG — saves everything, causes conflicts
async function saveCharacter(data) {
  await supabase.from('characters').update(data).eq('id', characterId);
}
// CORRECT — saves only the changed field
async function saveField(field, value) {
  await supabase
    .from('characters')
    .update({ [field]: value, updated_at: new Date().toISOString() })
    .eq('id', characterId);
}
// Usage — called on blur from each input
nameInput.addEventListener('blur', () => saveField('name', nameInput.value));
traitsInput.addEventListener('blur', () => saveField('traits', traitsInput.value));
```
---
## Atomic HP Operations
Never set HP to an absolute value from the client. Always use a delta.
```js
// WRONG — two simultaneous saves corrupt the value
async function setHp(newValue) {
  await supabase.from('characters').update({ cur_hp: newValue }).eq('id', characterId);
}
// CORRECT — use a Supabase RPC function
// Create this function in Supabase SQL editor:
/*
CREATE OR REPLACE FUNCTION adjust_hp(character_id UUID, delta INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE characters
  SET cur_hp = GREATEST(0, LEAST(max_hp, cur_hp + delta))
  WHERE id = character_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
*/
async function adjustHp(delta) {
  await supabase.rpc('adjust_hp', {
    character_id: characterId,
    delta: delta
  });
}
// Same pattern for gold, resource used counts, spell slots
```
---
## Real-Time Sync Pattern
```js
// Subscribe to character changes (replaces Firestore onSnapshot)
function subscribeToCharacter(characterId, onUpdate) {
  return supabase
    .channel('character-' + characterId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'characters',
      filter: 'id=eq.' + characterId
    }, payload => onUpdate(payload.new))
    .subscribe();
}
// Subscribe to all characters in a campaign (for party overview)
function subscribeToParty(campaignId, onUpdate) {
  return supabase
    .channel('party-' + campaignId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'characters',
      filter: 'campaign_id=eq.' + campaignId
    }, payload => onUpdate(payload.new))
    .subscribe();
}
// Subscribe to combat session
function subscribeToCombat(campaignId, onUpdate) {
  return supabase
    .channel('combat-' + campaignId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'combat_sessions',
      filter: 'campaign_id=eq.' + campaignId
    }, payload => onUpdate(payload.new))
    .subscribe();
}
// Always unsubscribe when leaving a page
window.addEventListener('beforeunload', () => {
  supabase.removeAllChannels();
});
```
---
## Auth Flow
```js
// Initialize Supabase client (replaces firebase-config.js)
// Create supabase-config.js:
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Check auth on every page load
async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  return session;
}
// Get current user's membership for a campaign
async function getMembership(campaignId) {
  const { data } = await supabase
    .from('memberships')
    .select('*, campaigns(*)')
    .eq('campaign_id', campaignId)
    .eq('user_id', (await supabase.auth.getUser()).data.user.id)
    .single();
  return data;
}
// Check if current user is DM of a campaign
async function isDM(campaignId) {
  const membership = await getMembership(campaignId);
  return membership?.role === 'dm';
}
// Token auto-refresh — add this once on page load
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Session refreshed automatically');
  }
  if (event === 'SIGNED_OUT') {
    window.location.href = 'login.html';
  }
});
```
---
## Theming System
```js
// Load and apply theme on every page
async function applyTheme(campaignId, membershipId) {
  // 1. Get campaign theme (DM controls this)
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('theme_preset, theme_vars')
    .eq('id', campaignId)
    .single();
  // 2. Get player's personal accent color
  const { data: membership } = await supabase
    .from('memberships')
    .select('accent_hex')
    .eq('id', membershipId)
    .single();
  // 3. Apply campaign theme CSS variables
  applyThemePreset(campaign.theme_preset);
  if (campaign.theme_vars) {
    Object.entries(campaign.theme_vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  }
  // 4. Override accent with player's personal color
  // (only on sheet.html — not on index.html or combat.html)
  if (isSheetPage && membership.accent_hex) {
    document.documentElement.style.setProperty('--accent', membership.accent_hex);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(membership.accent_hex));
  }
}
// Save player accent color
async function saveAccentColor(hex) {
  await supabase
    .from('memberships')
    .update({ accent_hex: hex })
    .eq('id', membershipId);
}
// Save campaign theme (DM only)
async function saveCampaignTheme(preset, customVars) {
  await supabase
    .from('campaigns')
    .update({ theme_preset: preset, theme_vars: customVars })
    .eq('id', campaignId);
}
```
---
## Sheet Lock Enforcement
```js
// Lock a player's sheet (DM only — enforced server-side by RLS)
async function lockSheet(characterId) {
  await supabase
    .from('characters')
    .update({ locked: true })
    .eq('id', characterId);
  // RLS ensures only DM can do this
}
// On the sheet — check lock status and show banner
supabase.channel('lock-' + characterId)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'characters',
    filter: 'id=eq.' + characterId
  }, payload => {
    if (payload.new.locked && !isDMView) {
      showLockBanner('Your sheet is locked by the DM during combat');
      disableAllInputs();
    } else {
      hideLockBanner();
      enableAllInputs();
    }
  })
  .subscribe();
```
---
## URL Structure
Replace `?player=player2&c=campaign1` URL parameters with auth-based routing.
```
login.html              — sign in / sign up
home.html               — list of campaigns the user belongs to
index.html?c={id}       — party overview for a campaign
sheet.html?c={id}       — the current user's character sheet for that campaign
sheet.html?c={id}&p={characterId} — DM viewing/editing a specific player's sheet
combat.html?c={id}      — combat tracker for a campaign
```
The app knows who you are from the auth session. It knows which character is yours from the memberships table. No more hardcoded player slots.
---
## Migration Script
See `migrate.js` in the repo root. Run once after Supabase is configured:
```bash
node migrate.js
```
The script:
1. Reads all documents from Firestore `characters/*`
2. Creates a campaign row for `campaign1`
3. Creates membership rows for each player
4. Copies character data into the `characters` table
5. Copies subcollections (inventory, weapons, features, resources)
6. Marks each document as migrated with `_migrated_at`
7. Is safe to run multiple times — skips already-migrated data
---
## Build Order
Do not skip phases or combine them. Each phase must be fully working before starting the next.
### Phase 1 — Foundation
1. Create Supabase project (manual — owner does this)
2. Run schema SQL to create all tables
3. Configure Row Level Security rules
4. Create `supabase-config.js` replacing `firebase-config.js`
5. Create `login.html` and `home.html`
6. Test auth works — sign up, sign in, sign out
### Phase 2 — Data Migration
1. Write and test migration script
2. Owner runs migration script
3. Verify all data in Supabase dashboard
4. Fix any issues
### Phase 3 — sheet.html rewrite
1. Swap Firestore reads/writes for Supabase
2. Implement field-level saves
3. Implement atomic HP operations
4. Implement real-time subscription
5. Connect theme system to database
6. Test with both players
### Phase 4 — index.html rewrite
1. Swap Firestore party listener for Supabase subscription
2. Campaign theme applies from database
3. Player accent colors show on cards
4. DM panel saves to campaigns table
### Phase 5 — combat.html rewrite
1. Swap Firestore combat state for combat_sessions table
2. Real-time sync across all players
3. HP changes sync back to characters table
### Phase 6 — Structured records (one PR per system)
1. Inventory system
2. Weapons system
3. NPC tracker
4. Quest tracker
5. Shop system
6. Locations
7. Factions
### Phase 7 — JSON data files
1. Extract hardcoded class data to JSON files
2. Extract weapons, races, spells
3. Implement ruleset loading
4. Implement homebrew overlay
### Phase 8 — Cleanup
1. Remove all Firebase imports
2. Remove firebase-config.js
3. Remove migration code from sheet.html
4. Remove ?player= URL parameter system
5. Final testing
---
## What Does NOT Change
- All CSS — every variable, animation, layout
- All HTML structure — tabs, sections, modals, the sheet design
- All UI JavaScript — dice rolling, theme creator, layout editor, condition tracking
- Combat tracker UI
- GitHub Pages hosting
- The DRD.md roadmap phases
Only the data layer changes. If a PR touches CSS or UI structure without being asked to, reject it.
---
## Known Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| Supabase free tier pauses after 7 days inactivity | Add "Waking up..." loading screen. Upgrade to Pro ($25/mo) when campaign is active. |
| Token expires mid-session | Auto-refresh configured in auth setup. Silent refresh in background. |
| Two players edit same field simultaneously | Field-level saves — different fields never conflict. Atomic increments for numeric values. |
| DM accidentally deletes data | Soft deletes only. `deleted_at` column on all tables. Restore from Supabase dashboard. |
| Migration runs twice | Script checks `_migrated_at` marker before copying. Safe to re-run. |
| New ruleset has different sheet fields | `sheet_schema.json` per ruleset defines which sections render. No sheet code changes needed. |
| Player accent clashes with campaign theme | Warn on low contrast. DM can override in campaign settings. |
| Real-time drops mid-combat | Visible sync status indicator. Manual refresh button on combat page. |
