# Campaign Tracker — Build Roadmap

## Stack
- Frontend: HTML/CSS/JS (static, no build step)
- Backend: Firebase Firestore (project: dnd-tracker-4f54e)
- Hosting: GitHub Pages (christian0765.github.io/DND) — serves from `main` branch
- Auth: DM passcode only (localStorage). Player logins are Phase 4.

## Firestore Structure
```
characters/
  player1   { f-name, f-class, f-race, f-bg, f-align, f-player, f-prof,
               f-ac, f-init, f-speed, f-curhp, f-maxhp, f-hd, f-pp, f-gold, f-carry,
               f-str, f-strmod, f-dex, f-dexmod, f-con, f-conmod,
               f-int, f-intmod, f-wis, f-wismod, f-cha, f-chamod,
               f-traits, f-ideals, f-bonds, f-flaws, f-notes, f-gold2 }
  player2   { same fields + f-weapons, f-features, f-equipment, f-backstory, f-profs }
  player3   { same as player2 }
  player4   { same as player2 }

campaign/
  settings  { campaignName, dmNotes }
  broadcast { active, type, title, text, imageUrl, shopItems, updatedAt }
```

## Files
| File | Purpose |
|---|---|
| `index.html` | Party overview — live HP/AC/GP cards, DM panel |
| `sheet-1.html` | Dracula's sheet (Dragonborn Fighter 3, Battle Master) |
| `sheet-2/3/4.html` | Blank sheets for players 2-4 |
| `firebase-config.js` | Firebase credentials (project dnd-tracker-4f54e) |
| `broadcast.js` | Shared DM broadcast panel — included by all pages |
| `firestore.rules` | Open read/write (test mode) |
| `firebase.json` | Firebase CLI config |

---

## Phase Status

### ✅ Phase 1 — Done
- Character sheets (sheet-1 full, sheet-2/3/4 blank)
- Party overview with live HP/AC/GP bars (Firestore onSnapshot)
- AI conversion prompt
- Firebase Firestore replacing Google Sheets
- Firestore security rules (open read/write)

### ✅ Phase 2 — Done
- GitHub Pages hosting
- DM passcode panel
- Campaign name editor → saves to Firestore (syncs on refresh)
- DM secret notes → saves to Firestore (syncs on refresh)
- Campaign banner upload (device-local only — localStorage)
- **DM Broadcast System** — DM pushes to all player screens in real time:
  - Text announcement
  - Image / map (URL-based)
  - Shop (plain-text item list)
  - Combat alert (placeholder — full tracker is Phase 3)
  - Dismiss all panels

### 🔲 Phase 3 — Next
- **Combat tracker** — shared initiative order, HP editor per combatant, round counter, conditions, DM adds enemies
- NPC & world wiki — lore pages, NPC tracker (name, relation, status, last seen)
- Shared party inventory + gold pool
- Shop system — DM lists items, players request to buy
- Session log — DM writes session recap, players add personal notes

### 🔲 Phase 4 — Long Term
- Individual player logins (Firebase Auth)
- Mobile-optimised views
- Interactive map
- Real-time notifications (HP below 25%, unused abilities)

---

## DM Panel — How It Works
- Default passcode: `dm1234` (changeable in panel, stored in localStorage)
- Campaign name / notes: type → auto-saves to Firestore → all players see on next refresh
- Banner: upload from DM device only — does not sync (no Firebase Storage yet)
- Broadcast: fires Firestore write → all open pages get onSnapshot → panel slides up

## Key Patterns
- **Auto-save**: 2-second debounce on every field input → `db.collection('characters').doc(PLAYER_ID).set(data, { merge: true })`
- **Live listener**: `db.collection('campaign').doc('broadcast').onSnapshot(...)` in broadcast.js
- **db scope**: declared as `let db;` at top of each page's `<script>` block, assigned after `firebase.initializeApp()`
- **broadcast.js**: polls `typeof db !== 'undefined'` every 200ms before attaching listener
