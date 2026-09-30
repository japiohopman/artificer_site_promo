# 🔬 Deep Artificer Codebase & Development Stadium Analysis
**Product Name:** Arcane Codex (Repository: `artificer`)
**Promotional Interface Repository:** `artificer_site_promo`
**Current Development Stadium:** `STADIUM_BETA_PROTOTYPE` (Developer Mode Active)
**Architectural Baseline:** Schema-Driven Tabletop Simulator & DM Command Desk

---

## 1. Executive Overview & Development Stadium
Arcane Codex is currently operating in **STADIUM_BETA_PROTOTYPE (Developer Mode)**. The software is not a conceptual mockup; it is a fully functioning, code-backed tabletop control room for Game Masters.

The primary objective of `artificer_site_promo` in this stage is **not** to present a polished SaaS marketing facade, but to act as a **Living Window into the Development Reality**. The promotional site must grow dynamically alongside the main codebase.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARCANE CODEX DEVELOPMENT STADIUMS                        │
├───────────────┬───────────────┬────────────────┬─────────────────┬──────────┤
│ STADIUM 1     │ STADIUM 2     │ STADIUM 3      │ STADIUM 4       │ STADIUM 5│
│ Pre-Alpha     │ Alpha Sandbox │ Beta Prototype │ Release Cand.   │ Launch   │
│ (Architecture)│ (Core Engines)│ (ACTIVE NOW)   │ (Public Demo)   │ (1.0)    │
└───────────────┴───────────────┴────────────────┴─────────────────┴──────────┘
```

---

## 2. Core Engine Maturity & Technical Breakdown

### A. World Atlas & Spatial Reality DB
- **Maturity:** `BETA`
- **Tech Stack:** Leaflet, Custom Tile Servers, GeoJSON Schema.
- **Capabilities:** 7 map zoom tiers, regional sub-layers, structured location coordinate tracking, and persistent world state markers.

### B. Registry-Based Inventory Engine v2
- **Maturity:** `LIVE` (Core System)
- **Tech Stack:** `dnd-kit`, Zustand (`useCharacterStore.ts`, `useStore.ts`).
- **Capabilities:** Strict container containment, slot allocation, item weight limits, and equipment state calculation. v1 legacy code fully excised.

### C. Meteocons Time & Weather Engine
- **Maturity:** `LIVE` (Core System)
- **Tech Stack:** `Meteocons` SVG/Icon Engine, React `TemporalWidget.tsx`.
- **Capabilities:** Diurnal solar cycles, temperature progression, dynamic precipitation transitions, and environmental condition modifiers.

### D. Atmosphere Sound Engine
- **Maturity:** `LIVE` (Core System)
- **Tech Stack:** Web Audio API (`soundService.ts`), Philips Hue smart lighting integration.
- **Capabilities:** Scene-aware ambient audio loops, dynamic mood triggers, and smart lighting synchronization handled by Sonny.

### E. Tactical Combat Grid
- **Maturity:** `BETA`
- **Tech Stack:** HTML5 Canvas / TSX Grid (`Aedif` engine integration), 3D Cannon.js Physics Dice.
- **Capabilities:** Chebyshev distance calculation, token collision detection, initiative order tracking, and physical 3D dice rolls.

### F. The DevKit (Foundry / Creator Workshop)
- **Maturity:** `LIVE` (Developer Core)
- **Tech Stack:** `DevKit.tsx` (147KB monolithic React suite), Google Gemini 1.5 Flash, 11Labs Audio API.
- **Capabilities:** Three distinct operational pillars:
  1. **Primary Inspectors:** Codex Explorer, World Explorer, Flag Manager.
  2. **Entity Generators:** NPC Generator, Enemy Manifestation (parsing 5e.tools blocks), Habitat Generator.
  3. **Validation Testers:** Combat Tester, NPC Slot Tester, Mechanics Simulator.

### G. AI Orchestration Bridge
- **Maturity:** `BETA` (AI-Ready)
- **Tech Stack:** Google Gemini 1.5 Flash API, Structured JSON Tool Calls.
- **Capabilities:** Strict **Narrator vs. Engine** architecture. AI acts purely as facilitator/narrator; mechanical state mutations must pass through code guardrails.

---

## 3. Asset Pipeline & Asset Reusability Matrix
The core `artificer` repository provides two key visual asset directories:
1. `docs/site/assets/`: High-resolution marketing and module graphics (`promo_world_map_wide.png`, `promo_journal.png`, `promo_character_profile_full.png`, `promo_screenshot_three_dragon_ante.png`).
2. `docs/screenshots/`: Live application gameplay screenshots (`game_hud.png`, `atlas_service.png`, `hud_chat_interface.png`, `tactical_view.png`, `7.png`, `3.png`).

All assets are accessible via the GitHub CDN:
`https://raw.githubusercontent.com/japiohopman/artificer/main/`

---

## 4. Living Co-Growth Strategy ("Site Groeit Mee")
To fulfill the directive that the promo site grows alongside the application:
1. **Centralized Product Truth (`product_truth.json`)**: Tracks current stadium, live verification metrics, active feature modules, and devlog timeline.
2. **Automated Verification Pipeline**: `python3 verification/capture.py` verifies all routes, API endpoints (`/api/status`), and screenshot viewports.
3. **Public Development Transparency**: The site prominently displays current development velocity, verified checks, and what is built vs. what is planned.
