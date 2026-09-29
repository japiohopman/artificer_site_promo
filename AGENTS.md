# AGENTS.md — Rules & Guidelines for AI Agents

Welcome to **artificer_site_promo**! This file contains guidelines and instructions for AI agents working in this repository.

## 📜 Core Directives

1. **Product Truth Rule**
   - The promotional site is the public interface for the `artificer` (Arcane Codex) product repository.
   - Do not invent marketing claims or features that cannot be verified in `artificer`.
   - Update `public/data/product_truth.json` whenever product metadata, module status, or devlog milestones change.

2. **Verification-Driven Development (VDD)**
   - Always verify your work before completing tasks.
   - Run `python3 verification/capture.py` (or `npm test`) to audit Express server health, route responses, and visual layout on desktop, tablet, and mobile viewports.
   - Ensure `verification/report.json` and viewport screenshots are updated when UI or backend structure changes.

3. **Code Style & Architecture**
   - Stack: Node.js, Express, EJS, Vanilla CSS / JS, Python Playwright.
   - Keep backend logic clean in `server.js`.
   - Do not introduce bloated frontend frameworks (e.g. React/Next.js) into this promotional site unless explicitly requested; keep it fast, lightweight, and SEO-friendly.
   - Use semantic HTML tags and WCAG-compliant high-contrast focus states.

4. **Terminology Standards**
   - Product Brand: **Arcane Codex**
   - Core Pillars: **Play the World** (Campaign Client) & **Forge the World** (DevKit / Creator Workshop)
   - Atlas: **Reality Database**
   - AI Architecture: **Narrator vs. Engine**

5. **Pre-Commit Routine**
   - Run verification checks (`python3 verification/capture.py`).
   - Check for syntax errors and broken static assets.
   - Verify that EJS templates render correctly without undefined variable exceptions.
