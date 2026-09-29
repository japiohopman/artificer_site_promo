# Workflow & Verification Architecture

## Overview
This document outlines how `artificer_site_promo` synchronizes product data with the core `artificer` repository and executes automated verification workflows.

---

## 1. Product Truth Architecture
To prevent claims from drifting out of sync across multiple templates and scripts, all product metadata is centralized in:
`public/data/product_truth.json`

### Data Schema
- `brand`: Global naming, repository links, tagline, and dual-pillar positioning ("Play the World" / "Forge the World").
- `verification_summary`: Current verification status and check metrics.
- `modules`: List of implemented application features, current status tags (`LIVE`, `BETA`, `ALPHA`, `AI-READY`), and screenshot references.
- `devkit`: Inventory of creator tools categorized into Primary Inspectors, Entity Generators, and Validation Testers.
- `devlog`: Timeline of weekly engineering milestones.
- `roadmap`: Verified development phases and goals.

---

## 2. Express Integration
`server.js` loads `public/data/product_truth.json` upon startup:
- Passes `productTruth` directly to `views/index.ejs` during rendering.
- Exposes GET `/api/status` returning JSON containing product truth metadata and latest verification results.

---

## 3. Verification Pipeline (`verification/capture.py`)
The verification system runs automated end-to-end audits:
1. Spawns `node server.js` in a subprocess on port 3000.
2. Checks HTTP endpoints:
   - `GET /` (Status 200)
   - `POST /subscribe` (Status 200 / 400 validation check)
   - `GET /api/status` (Status 200)
3. Launches Playwright Chromium browser in headless mode.
4. Navigates to `http://localhost:3000` across 3 viewports:
   - **Desktop:** 1440 x 800
   - **Tablet:** 768 x 800
   - **Mobile:** 375 x 800
5. Captures screenshots into `verification/desktop.png`, `verification/tablet.png`, and `verification/mobile.png`.
6. Generates `verification/report.json` containing test results, check counts, timestamp, and asset statuses.

---

## 4. How to Run
```bash
# Run verification test suite
python3 verification/capture.py

# Or via npm
npm test
```
