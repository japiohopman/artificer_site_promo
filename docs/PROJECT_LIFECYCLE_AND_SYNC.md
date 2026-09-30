# 🔄 Project Lifecycle & Co-Growth Framework ("Site Groeit Mee")

## Core Philosophy
`artificer_site_promo` is not an isolated, static marketing brochure. It is designed as a **Living Window** that dynamically evolves across every development stadium of the core `artificer` (Arcane Codex) application.

---

## 1. Development Stadiums & Site Evolution Matrix

| Development Stadium | Application Reality | Promotional Site Focus | Data & Verification Strategy |
| :--- | :--- | :--- | :--- |
| **Stadium 1: Pre-Alpha** | Architecture design, schema definition, JSON structures. | System specifications, concept lore, development roadmap. | Manual `product_truth.json` updates. |
| **Stadium 2: Alpha Sandbox** | Core engines running locally (Atlas, Inventory v1, Sound Engine). | Engine previews, devlog timeline, basic screenshot gallery. | Initial `capture.py` visual viewport testing. |
| **Stadium 3: Beta Prototype** *(ACTIVE NOW)* | Functional GM Control Desk, Inventory v2, Meteocons, DevKit tools. | **Developer Mode Window:** Live verification stats, built vs. funding status, DevKit showcase. | Automated `capture.py` auditing routes (`/api/status`), assets, and viewports. |
| **Stadium 4: Release Candidate** | No-auth public demo, sample campaign, video walkthrough. | Public Demo Portal, video player integration, Kickstarter pre-launch conversion. | Full E2E Playwright test suite for demo interaction and newsletter capture. |
| **Stadium 5: Production Launch** | v1.0 Release, active campaign sessions, plugin ecosystem. | Full commercial software site, user onboarding, press kit downloads, community hub. | Continuous CI/CD automated regression testing. |

---

## 2. Dynamic Synchronization Pipeline

```
┌────────────────────────────────────────────────────────┐
│               ARTIFICER (PRODUCT REPO)                 │
│ Core Engines ∙ Schemas ∙ DevKit ∙ Screenshots          │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│           PUBLIC DATA PIPELINE & CATALOG               │
│  public/data/product_truth.json ∙ asset_catalog.json   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│               EXPRESS & EJS PROMO SITE                 │
│  GET /api/status ∙ GET / ∙ Living Stadium Banner        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             PLAYWRIGHT VERIFICATION SUITE              │
│  python3 verification/capture.py -> report.json        │
└────────────────────────────────────────────────────────┘
```

---

## 3. Developer Guidance
When a new major engine or feature lands in `artificer`:
1. Update `public/data/product_truth.json` with the new feature status (`LIVE`, `BETA`, or `ALPHA`).
2. Add new visual evidence or screenshots to `public/data/asset_catalog.json`.
3. Execute `npm test` (`python3 verification/capture.py`) to verify the updated product state and regenerate `verification/report.json`.
