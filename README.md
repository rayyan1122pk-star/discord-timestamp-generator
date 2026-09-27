# Discord Timestamp Generator & Dynamic Time Formatter

A fast, lightweight, zero-tracking web utility to create dynamic Discord timestamps that automatically adjust to every user's local timezone.

[![Live Website](https://img.shields.io/badge/Live_Site-disctimestamps.site-5865F2?style=flat-square&logo=discord&logoColor=white)](https://www.disctimestamps.site)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Why This Exists

If you have ever tried scheduling a raid, podcast, team sync, or community event in Discord across different timezones, you know the headache: "8 PM EST" means someone in London wakes up at 1 AM or misses the event entirely.

Discord solved this with dynamic `<t:TIMESTAMP:STYLE>` tags. When you post a dynamic timestamp token, Discord automatically renders the time on each user's screen matching their local phone or computer clock.

The problem? Calculating Unix timestamps by hand or running command line date math is annoying, and existing web generators were slow, ad-heavy, or lacked essential features.

Disctimestamps provides an instant, ad-free web app with live Discord chat preview, reverse tag decoding, quick shorthand parsing, Snowflake ID conversion, and ANSI colored text generation.

---

## Features & Developer Tools

- **Live Discord Preview:** High-fidelity Discord dark mode chat component showing real-time formatting and hover tooltips.
- **Discord Timestamp Generator:** One-click copy for all 7 Discord timestamp flags (`:R`, `:t`, `:T`, `:d`, `:D`, `:f`, `:F`).
- **Discord Embed Generator & Webhook Visualizer:** Interactive embed builder with real-time dark mode chat simulation, custom colors, fields, and multi-format code exports (Webhook JSON, discord.js v14, discord.py).
- **Discord Glitch & Zalgo Text Maker:** Corrupted font maker with intensity sliders, directional toggles, and Discord 32-character nickname limit validation.
- **Discord Snowflake ID Converter:** Extract exact creation dates and timestamps from Discord user, channel, and message IDs.
- **Discord ANSI Colored Text Generator:** Format colored code blocks for Discord announcements using native ANSI escape sequences.
- **100% Client-Side Privacy:** All date and time math runs locally in your browser using native JavaScript Intl APIs. Zero tracking, zero analytics bloat, zero server logs.

---

## Embeddable Badges for Your Bot or Server README

Support the project or link directly from your bot repository:

```markdown
[![Discord Timestamps](https://img.shields.io/badge/Discord-Timestamps-5865F2?style=flat&logo=discord&logoColor=white)](https://www.disctimestamps.site)
```

```markdown
[![Discord Embed Maker](https://img.shields.io/badge/Discord-Embed_Maker-57F287?style=flat&logo=discord&logoColor=white)](https://www.disctimestamps.site/discord-embed-generator)
```

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4
- **Icons:** `lucide-react`
- **Testing:** Custom regression test suite (`scripts/seo-regression.js`)

---

## Getting Started

### Prerequisites

- Node.js `v20.0.0` or higher
- npm `v10.0.0` or higher

### Installation

```bash
git clone https://github.com/rayyan1122pk-star/discord-timestamp-generator.git
cd discord-timestamp-generator
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

### Running Tests

```bash
npm test
```

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/cool-feature`)
3. Commit your changes (`git commit -m 'Add cool feature'`)
4. Push to the branch (`git push origin feature/cool-feature`)
5. Open a Pull Request

---

## Creator & Community

Created and maintained by **Rayyan** ([@rayyan1122pk-star](https://github.com/rayyan1122pk-star)), with feedback and testing from server moderators and bot developers in the Discord community.

---

## License

This project is open source and available under the [MIT License](LICENSE). Independent developer resource, not affiliated with or endorsed by Discord Inc.
