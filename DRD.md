# 🎲 Campaign Tracker
## Feature & Design Draft (DRD)
### Version 1.2

---

## 🎯 What We're Building
A web-based campaign management platform for D&D. The DM and all players can access it from any device, see each other's characters, manage combat, track the story, and run sessions more smoothly.

---

## 👥 User Roles & Access

| Role | Access |
|------|--------|
| **DM** | Everything + locked DM panel (passcode protected) |
| **Player** | Full access to all pages and all character sheets |
| **Guest** | Same as player — everything open |

> Individual player logins are a **Phase 4** feature. For now everything is open except the DM panel.

---

## 🔐 DM Passcode Panel
*Locked behind a single passcode that the DM sets. Players never see this section.*

### Features inside the DM panel:

**Campaign Name Editor**
- DM can set or change the campaign/site title at any time
- Displays across all pages — home page header, browser tab, character sheets
- Stored in the database and syncs to all players instantly

**Campaign Photo / Banner Upload**
- DM can upload a custom image that appears as the home page banner or header
- Accepted formats: JPG, PNG, WebP
- Recommended size: 1200×400px for banner, or square for logo/icon
- If no image uploaded, defaults to the parchment texture

**DM Secret Notes**
- Private notes section only visible when logged in as DM
- Sub-sections:
  - NPC true motives and hidden stats
  - Plot spoilers and upcoming session plans
  - Secret loot not yet discovered by players
  - Session prep checklist

**DM Controls**
- Edit any player's character sheet
- Add enemies to combat tracker
- Lock/unlock player sheets (prevent edits mid-combat)
- Send notifications to all players

**Passcode Setup**
- DM sets a single password on first visit
- Stored securely (hashed) in the database
- Simple login form — enter passcode to unlock DM view
- No accounts or email needed for players — they just use the link

---

## 📋 Core Features

**1. Character Sheets**
- Full editable sheet per player (already built ✅)
- Auto-save to Google Sheets / database
- Weapon stages, bonded items, homebrew support
- AI conversion prompt for new players ✅

**2. Party Overview (Home Page)**
- See all players at a glance — HP, AC, gold, status ✅
- HP bars that update live during combat
- Status indicators — alive, unconscious, dead
- Campaign banner and name set by DM

**3. Combat Tracker**
- Initiative order with drag to reorder
- HP editor for every character and enemy
- Round counter
- Condition tracker — poisoned, frightened, prone, etc.
- DM can add enemies with custom stats

**4. Session Log**
- DM writes session notes after each game
- Players can add personal notes
- Timeline of major story events
- Loot log — who got what and when

**5. World & Lore Wiki**
- Dragon Veil lore page
- NPC tracker — name, relation, status, last seen
- Location map or list
- Faction tracker

**6. Inventory & Shop**
- Party shared inventory
- Gold tracking per player
- Simple shop — DM lists items for sale, players can request to buy

**7. Notifications**
- DM can ping all players — "Session tonight at 7!"
- Alert when HP drops below 25%
- Reminder for unused abilities or items

---

## 🛠 Technical Stack

| Layer | Option A (Simple) | Option B (Full) |
|-------|------------------|-----------------|
| **Frontend** | HTML/CSS/JS (current) | React |
| **Backend** | Google Sheets | Firebase or Supabase |
| **Hosting** | GitHub Pages | Vercel or Netlify |
| **Auth** | DM passcode only | Individual player logins |
| **Real-time sync** | Manual save | Live websocket updates |

**Recommendation:** Start with Option A and upgrade to Option B as needed. Current site is already Option A foundation.

---

## 🗺 Build Roadmap

**Phase 1 — Already Done ✅**
- Character sheet template
- Party overview home page
- Google Sheets sync
- AI conversion prompt

**Phase 2 — Next Up**
- GitHub repo + GitHub Pages hosting
- DM passcode panel
- Campaign name editor (under DM panel)
- Campaign photo/banner upload (under DM panel)
- DM secret notes
- Combat tracker

**Phase 3 — Mid Term**
- NPC & world wiki
- Shared party inventory
- Shop system
- Session log

**Phase 4 — Long Term**
- Individual player logins
- Real-time live sync
- Mobile optimized views
- Interactive map

---

## ✅ Decisions Made
- Site name: **Campaign Tracker**
- Access model: Everything open, DM panel passcode only
- Hosting: GitHub Pages (website, no app store needed)
- Player logins: Phase 4 — not needed yet
