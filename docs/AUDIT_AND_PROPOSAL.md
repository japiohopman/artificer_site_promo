# 📜 Artificer & Arcane Codex: Product Truth, Architecture & DevKit Strategy Audit Report
**Date:** August 13, 2026
**Author:** Jules, The Orchestrator
**Target Repository:** `artificer_site_promo` (with alignment to `artificer`)

---

## 1. Executive Summary
This report establishes the absolute architectural and promotional alignment between **Arcane Codex** (the product repo) and its public promotional experience (**artificer_site_promo**).

The promotional site is not an independent fantasy projection; it is the direct public-facing interface for a living, highly functional codebase. Our audit shows that while the current promotional site features strong high-fantasy skeuomorphic styles and a functional subscription engine, it contains a mismatch of old/new naming, placeholder Kickstarter calls-to-action, and misses the core story of the **DM Kit / DevKit**.

We propose a **"Product Truth" architecture** utilizing a single, centralized product database, establishing **"Play the World / Forge the World"** as the core positioning, elevating the DevKit to a first-class selling point, and establishing a lightweight sync workflow to keep both repositories aligned indefinitely.

---

## 2. Current Artificer Product Reality
Based on a comprehensive audit of the core `artificer` repository (`README.md`, `GOALS.md`, `ROADMAP.md`, `DOCS_INDEX.md`, and `DEV_KIT.md`), the actual product state is a robust, schema-driven tabletop simulator and DM control room.

### Genuinely Implemented Systems & Evidence:
1. **Interactive World Atlas (BETA)**
   - *Evidence:* Leaflet-powered tile layer rendering a multi-tiered regional map (including zoom tiers up to 7), regional sub-tiers, and local coordinates (`README.md` and `GOALS.md`).
   - *Reality:* Richly structured and driven by JSON schemas stored in `public/assets/atlas/`.
2. **Registry-Based Inventory v2 (LIVE)**
   - *Evidence:* Mentioned in `ROADMAP.md` as "Re-architected items engine using a slot-and-container design". Powered by `dnd-kit` and Zustand in `useCharacterStore.ts` and `useStore.ts`.
   - *Reality:* Implements rigid containment, item weight, and equipment slot rules. Old v1 logic has been fully removed.
3. **Meteocons Time & Weather Engine (LIVE)**
   - *Evidence:* `ROADMAP.md` checklist item "Meteocons icon library for Time and Weather" is fully checked `[X]`. Widget is rendered in `src/components/hud/TemporalWidget.tsx`.
   - *Reality:* Implements temperature systems, diurnal time shifts, and weather transitions.
4. **AI Lore & Translation Bridge (LIVE)**
   - *Evidence:* `README.md` and `GOALS.md` describe integration with **Google Gemini 1.5 Flash**.
   - *Reality:* Automates parsing unstructured data into JSON entities and generating session memories.
5. **Atmosphere Sound Engine (LIVE)**
   - *Evidence:* `soundService.ts` and `AUDIO_REGISTRY.md`.
   - *Reality:* Features scene-aware audio mixing, ambient loops, and physical smart-lighting synchronization (Philips Hue) handled by Sonny.
6. **Tactical Combat Grid (BETA)**
   - *Evidence:* `ROADMAP.md` marks "Complete TSX translation of the Tactical Combat Grid (Aedif inspiration)" as complete `[X]`.
   - *Reality:* Implements grid coordinate mapping, Chebyshev token collision, distance checks, and 3D digital dice roller physics.
7. **The DM Kit / DevKit (LIVE)**
   - *Evidence:* Fully defined in `src/components/devkit/DevKit.tsx` (a massive 147KB component) and documented in `DEV_KIT.md`.
   - *Reality:* Offers three distinct categories (Inspectors, Generators, Testers) to inspect spatial data, manifest entities via AI, and simulate combat or mechanics.

---

## 3. Current Promo Site Reality
Our audit of the `artificer_site_promo` repository reveals a beautifully stylized EJS/CSS/Vanilla JS single-page application.

### Inventory of Existing Technical Components:
1. **Backend (`server.js`)**: A lightweight Node.js/Express server. Handles the static asset delivery, serves `index.ejs`, and connects securely to the Mailchimp Marketing SDK for newsletter enrollment.
2. **Frontend (`views/index.ejs`)**: High-fantasy aesthetic utilizing the custom font "Cinzel" and "Inter" body text. Employs premium scroll-reveal animations and high-fidelity gold hover card borders.
3. **Static Scripts (`public/script.js`)**: Implements standard EJS routing wrappers, dynamic scroll-locking for mobile menus, scroll-reveal triggers, a dynamic "Back to Top" trigger, and a lightbox previewing tool that reads metadata attributes (`data-module-asset`).
4. **Assets (`public/assets/` & `docs/screenshots/`)**:
   - Pulled from two distinct places: standard local assets and GitHub raw CDN (`https://raw.githubusercontent.com/japiohopman/artificer/main/docs/site/assets/`).
5. **Disclaimers**: Features a solid "Independent Tabletop Toolkit" footer note to distance itself from brand-specific monopolies (like D&D 5e).

---

## 4. Product Truth Conflicts
There are several core discrepancies between the promotional site's copy/claims and the reality of the `artificer` repository.

### Identified Discrepancies:
1. **Kickstarter Exaggeration**:
   - *Promo Claim:* The site displays prominent CTAs: "Back on Kickstarter", "Kickstarter page", and a secondary outline button pointing to `https://www.kickstarter.com/` (a blank domain).
   - *Product Reality:* There is no live Kickstarter campaign. This creates a broken user experience and damages professional credibility.
2. **Missing Video Pitch Walkthrough**:
   - *Promo Claim:* A large section titled "Watch the walkthrough (Coming soon)" uses a placeholder cover image with a non-functional play icon overlaid.
   - *Product Reality:* No video file exists, leading to a dead-end hover interaction.
3. **Outdated Discord CTA**:
   - *Promo Claim:* Contains a "Join the Discord" card with a button marked "Coming Soon" that is hard-disabled via CSS and JavaScript.
4. **Naming Inconsistencies**:
   - The codebase has been rebranded from "Artificer" to **"Arcane Codex"**. However, some headers and references on the promotional site still call the toolkit "Artificer" or mix the two terms incoherently.
5. **AI Hype vs. AI Reality**:
   - *Promo Claim:* Over-emphasizes "autonomous game masters" or "automated game masters".
   - *Product Reality:* Per `GOALS.md`, the AI DM is strictly a *narrator and facilitator* acting within the mechanical guardrails of code-based tools (Narrator vs. Engine). AI must not directly mutate game states without passing tool calls.

---

## 5. Missing Features / Stories
Several outstanding features currently running in the `artificer` repository are completely unrepresented on the promo site:

1. **Meteocons Integration**: The live weather and time widget is a major skeuomorphic element but is only mentioned casually in the devlog. It deserves visual representation.
2. **Temperature and Environmental Conditions**: A core mechanical simulator feature that dynamically impacts characters but is completely hidden from the public.
3. **Rigid Inventory Logistics**: The inventory isn't just an EJS array; it is a full-fledged, slot-based, registry-driven logistics grid with carry capacities and containers.
4. **System-Neutral Core**: The promo site doesn't emphasize how the tool abstracts stats, making it fully flexible for other systems (e.g., Pathfinder, custom homebrews).

---

## 6. DevKit Inventory
The DevKit is a powerhouse component of `artificer`. We mapped all systems from `DEV_KIT.md` and `src/components/devkit/DevKit.tsx`:

| Tool Name | Functional Group | Purpose | Target User | Maturity | Selling Point? | Visual Asset Requirement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Codex Explorer** | Primary Inspector | Inspect and edit global entities (Enemies, Equipment, Materials). | GM & Creators | High (LIVE) | Yes (Shows system neutrality) | `devkit_codex_explorer.png` |
| **World Explorer** | Primary Inspector | Spatial exploration of regional, sub-regional, and local maps. | GM & Creators | High (LIVE) | Yes (Shows map depth) | `devkit_world_explorer.png` |
| **Flag Manager** | Primary Inspector | Modify global story progression, faction status, and quest flags. | GM | Medium (BETA) | Yes (Shows living state) | `devkit_flag_manager.png` |
| **NPC Generator** | Entity Generator | Procedural creation of NPCs using customized Google Gemini prompts and image synthesis. | GM | High (LIVE) | **Huge** (Shows AI integration) | `devkit_npc_generator.png` |
| **Enemy Manifestation** | Entity Generator | Automatically parse unstructured monster statistics (e.g., 5e.tools blocks) into typed JSON schemas. | GM & Creators | High (LIVE) | Yes (Zero-friction onboarding) | `devkit_enemy_manifest.png` |
| **Habitat Generator** | Entity Generator | Procedural creation and committing of environmental narratives. | GM | Medium (BETA) | Yes (Instant scene prep) | `devkit_habitat_gen.png` |
| **Combat Tester** | Validation Tester | Simulate tactical grid-based combat rounds, token movement, and rules execution. | GM & Devs | Medium (BETA) | Yes (Sells tactical rigor) | `devkit_combat_tester.png` |
| **NPC Slot Tester** | Validation Tester | Verify active slot allocations, party formations, and character roster persistence. | Devs | Medium (BETA) | No (Internal developer-only) | *None* |
| **Simulator** | Validation Tester | Run sandbox rolls, item container weight audits, and sheet statistics calculation tests. | GM & Devs | High (LIVE) | Yes (Mechanical integrity) | `devkit_simulator.png` |

---

## 7. Recommended DevKit Positioning
We recommend dividing the Arcane Codex identity into two equal, complementary pillars to differentiate it from standard, passive virtual tabletops:

```
                  ┌─────────────────────────────────────────┐
                  │              ARCANE CODEX               │
                  └────────────────────┬────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│   PLAY THE WORLD      │                             │    FORGE THE WORLD    │
├───────────────────────┤                             ├───────────────────────┤
│ The Campaign Front    │                             │ The Creator's Portal  │
│ ∙ Live Atlas HUD      │                             │ ∙ Primary Inspectors  │
│ ∙ Character Vault     │                             │ ∙ Entity Generators   │
│ ∙ Tactical Grid       │                             │ ∙ Validation Testers  │
│ ∙ Atmosphere Engine   │                             │ ∙ Schema Enforcement  │
└───────────────────────┘                             └───────────────────────┘
```

By positioning the DevKit as **"Forge the World,"** we market Arcane Codex not just as a virtual tabletop, but as an *operating system and CAD tool for living fantasy realities.*

---

## 8. Recommended Information Architecture
We propose restructuring the homepage (`views/index.ejs`) into the following sequence of high-converting semantic sections:

1. **Hero Header & Navigation**: Clear tagline, brand marks, and prominent CTAs pointing to the Mailing List and GitHub.
2. **Product Statement (What is Arcane Codex?)**: A single, powerful narrative block explaining the problem solved (removing table bookkeeping and lore memory fragmentation).
3. **Section Pillar: "Play the World"**:
   - **The Atlas**: Zoom levels, locations, and spatial travel state.
   - **The Vault**: Registry-based container inventory, slots, and character stats.
   - **The Table**: Interactive tactical battle grid, Chebyshev distance, and mechanical dice.
   - **The Atmosphere**: Sonny's multi-layered weather, soundscapes, and Philips Hue integration.
4. **Section Pillar: "Forge the World" (The DevKit)**:
   - Introduce **The Creator's Workshop** as a first-class citizen.
   - Highlight Inspectors, Generators, and Validation Testers with detailed sub-tool listings.
   - Interactive UI mockups showcasing AI audio synthesis (11Labs) and procedural NPC creation.
5. **The Maker Story (Lorekeeper Collective)**:
   - Frame Jules, Jimmy, Jane, Sonny, and Skill Agent as the specialized AI team building this engine, establishing transparent development trust.
6. **Live State & Verification Audit**:
   - A transparent status matrix showing what is Live vs. BETA vs. PLANNED, verified automatically.
7. **Relentless Roadmap**:
   - Focused roadmap detailing the upcoming milestones (Point Buy Calculator, Spellbook FocusView, AI GM bridge, System-neutral content).
8. **Join & Support (CTAs)**:
   - Unified conversion engine (Mailchimp subscription and "Buy Me a Coffee" micro-pledge tiers).

---

## 9. Terminology / Naming Recommendation
Based on repository audits and current roadmap guidelines, we recommend the following structural terminology hierarchy:

*   **Arcane Codex**: The global product brand name.
*   **The Campaign Client**: The player/GM live experience (Play the World).
*   **The DevKit (or Creator's Workshop)**: The back-end creation and validation portal (Forge the World).
*   **The Lorekeeper Collective**: The specialized AI team coordinating development.
*   **The Reality Database**: The structured, schema-compliant JSON file database (The Atlas).

We must permanently excise raw, confusing mixtures of "Artificer" as the app name. "Artificer" is now strictly the repository name and the title of Jimmy's domain (The Artificer). The software is **Arcane Codex**.

---

## 10. Screenshot & Asset Strategy
To ensure optimal performance and automated visual truth, we establish the following strategy:

- **CDN Root Integration**: Maintain the raw CDN base (`https://raw.githubusercontent.com/japiohopman/artificer/main/docs/site/assets/`) for high-fidelity images.
- **Snake Case Naming Conventions**: Strictly enforce asset categorization prefixes (`promo_`, `module_`, `devkit_`, `ui_`) as per `CDN_ASSETS_GUIDE.md`.
- **Lightbox and Image Previews**: Keep EJS elements decoupled from script.js using `data-module-asset` selectors. This lets us load the appropriate CDN asset dynamically upon click, maintaining a light initial DOM load.
- **Identified Critical Asset Requirements**:
  1. `devkit_audio_orchestration.png` (AI Voice Generation)
  2. `devkit_npc_generator.png` (Procedural creation)
  3. `devkit_combat_tester.png` (Combat validation grid)
  4. `module_temporal_widget.png` (Time/Weather engine)

---

## 11. CTA / Conversion Strategy
We must restore absolute integrity to all conversion triggers:

1. **Remove Broken Kickstarter Links**:
   - Replace "Back on Kickstarter" with **"Follow Development"** (smooth scrolls to the newsletter section) or **"Support Development"** (scrolls to the Coffee pledge tiers).
   - Once a Kickstarter draft or pre-launch page is ready, we update the link globally.
2. **Fix Discord Call-to-Action**:
   - Update the card from "Coming Soon" to **"Join Discord Prep"** or hide the disabled button until an invite code is generated.
3. **Activate the Video Walkthrough Frame**:
   - Since a formal video doesn't exist, change the overlay to **"Request a Live Demo"** or replace the non-functional video player with an interactive scrolling mockup of the Atlas.

---

## 12. SEO / Accessibility / Performance Findings
Our audit of EJS and CSS structures yields key optimization opportunities:

- **SEO & Opengraph Metadata**: EJS currently contains basic OG titles and Twitter cards. However, the canonical URL pointing to `https://japiohopman.github.io/artificer_site_promo` is missing. We should add a `<link rel="canonical">` element.
- **Keyboard Navigation & Focus States**: Some elements like `.module-preview-btn` lack explicit `:focus-visible` outlines. High-contrast focus state styles must be implemented to comply with WCAG accessibility principles.
- **Lazy Loading**: Ensure all non-hero static images are explicitly set to `loading="lazy"` to speed up initial mobile paint cycles.
- **CORS & Proxy Safeguards**: The Mailchimp script handles client-side subscription calls safely via Express endpoints. Ensure any local JS errors are gracefully captured inside try-catch blocks to prevent UI crashes.

---

## 13. Verification Strategy
Verification should not be a manual afterthought. We propose an automated workflow using the existing Playwright infrastructure inside `verification/capture.py`:

1. **Auto-Server Spawn**: Ensure the script launches and kills the server on standard ports automatically.
2. **Audit Targets**:
   - Check EJS page load and HTML layout at 3 desktop/mobile viewport scales.
   - Audit forms (submit dummy addresses to verify Express handles endpoints correctly).
   - Scan for console errors or broken resource assets using Playwright's `page.on('console', ...)` listeners.
3. **Continuous Execution**: Embed the validation check directly into our deployment script (`npm test` runs local capture).

---

## 14. Proposed Product Truth Architecture
To prevent product truth drift across 6 different sections, we propose building a centralized metadata engine inside the promo repo:

### File: `public/data/product_truth.json`
```json
{
  "brand": {
    "name": "Arcane Codex",
    "tagline": "Run bigger worlds with less table chaos.",
    "pitch": "Arcane Codex is a tabletop control room for GMs: a living atlas, campaign memory, character vault, tactical grid, and AI-ready orchestration in one focused workspace."
  },
  "modules": [
    {
      "id": "atlas",
      "name": "Atlas & Reality DB",
      "status": "BETA",
      "tagClass": "beta",
      "asset": "promo_world_map_with_panels.png",
      "desc": "The structured backbone of campaign reality: locations, markers, travel states, and world data persistence."
    },
    {
      "id": "ai-orchestrator",
      "name": "AI Orchestration",
      "status": "AI-READY",
      "tagClass": "ai",
      "asset": "promo_journal.png",
      "desc": "A Narrator vs. Engine architecture designed for dynamic session history, quest logs, and AI-assisted narration."
    }
  ],
  "roadmap": [
    { "phase": 1, "title": "Public Demo Path", "desc": "Sample party, sample campaign, and no private keys required." },
    { "phase": 2, "title": "AI GM Bridge", "desc": "Tool calls for narration, travel, journal updates, and tactical actions." }
  ]
}
```

### Rendering Pipeline:
1. Express reads `product_truth.json` during server startup and caches it.
2. The `/` route passes this JSON database to `views/index.ejs`.
3. EJS loops over the modules, roadmap, and pricing tiers dynamically.
4. **Outcome**: Updating a feature name or status tag takes 1 second in `product_truth.json`, automatically updating the headers, cards, grid, lightbox, and FAQ instantly.

---

## 15. Proposed Maintenance Workflow
We propose a lightweight 4-step synchronization contract for any future development changes:

```
┌────────────────────────────────┐
│ 1. Code Change in Artificer    │
└───────────────┬────────────────┘
                ▼
┌────────────────────────────────┐
│ 2. Modify `product_truth.json` │
│    Update name, status, or img │
└───────────────┬────────────────┘
                ▼
┌────────────────────────────────┐
│ 3. Run Verification Suite      │
│    `python capture.py` runs    │
└───────────────┬────────────────┘
                ▼
┌────────────────────────────────┐
│ 4. Commit and Push Promo Site  │
└────────────────────────────────┘
```

---

## 16. Recommended Implementation Phases

We recommend executing the evolution of the promotional site across the following 5 structured phases:

- **Phase 1 — Centralized Truth Database**: Move all hardcoded copy, status tags, and feature grids from EJS into `product_truth.json` and update `server.js` to feed this metadata to the template.
- **Phase 2 — UI/UX Restructure**: Update the styling, implement WCAG focus states, enable lazy loading, and resolve semantic grid issues.
- **Phase 3 — Play the World (Player Client Showcase)**: Rework Atlas, Characters, Atmosphere, and Table grids to match latest React implementation details.
- **Phase 4 — Forge the World (The DevKit)**: Integrate the 3-column DevKit system, adding detailed listings for Inspectors, Generators, and Testers.
- **Phase 5 — Conversion Optimization**: Purge broken Kickstarter CTAs, refine Discord placeholders, and optimize the newsletter flow.

---

## 17. Risks
- **Asset Desynchronization**: If the master Artificer repo changes asset paths, image loading will break. Our verification system must run a broken link check to mitigate this.
- **Rate Limiting**: Mailchimp limits on sandbox keys. Form handling must degrade gracefully to prevent Express from freezing.
- **Framework Inflation**: Moving the site to React/Next.js would introduce excessive complexity. We should remain firmly within the lightweight Express/EJS stack.

---

## 18. Open Questions
1. Do we want to include an interactive mockup where users can click to roll digital dice directly on the promo homepage to showcase dice responsiveness?
2. Shall we activate a public Discord community preparation landing page before the Kickstarter draft goes live?

---
*Created by Jules, the Orchestrator. Forged for the tabletop.*
