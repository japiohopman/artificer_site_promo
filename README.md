# Artificer: The Foundry of Worlds

A high-performance promotional site for **Artificer**, an independent tabletop campaign control room for Game Masters.

## Tech Stack
- **Backend:** Node.js, Express
- **Frontend:** EJS (Embedded JavaScript Templates), CSS3, Vanilla JS
- **Integrations:** Mailchimp Marketing SDK
- **Environment:** Dotenv for credential management

## Features
- **Mailing List Integration:** Fully functional Mailchimp subscription flow.
- **Interactive Foundry:** Visual preview of map orchestration and tactical tools.
- **Tavern & Mini Games:** Showcase of in-app social features like Three Dragon Ante.
- **GM Kit & Soundscapes:** Preview of 11Labs-ready audio orchestration and AI automation.
- **Responsive Design:** Optimized for Desktop, Tablet, and Mobile with a dedicated navigation overlay.

## Installation & Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env` file based on `.env.example`:
   ```env
   MAILCHIMP_API_KEY=your_api_key
   MAILCHIMP_SERVER_PREFIX=usX
   MAILCHIMP_LIST_ID=your_list_id
   PORT=3000
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```
   The site will be available at `http://localhost:3000`.

## Project Structure
- `server.js`: Express server logic and Mailchimp integration.
- `views/index.ejs`: Main template structure.
- `public/`: Static assets (CSS, JS, Images, Favicon).
- `docs/`: Additional project documentation and roadmaps.
- `verification/`: Automated Playwright layout audit scripts.

---
*Created by The Lorekeeper Collective.*
