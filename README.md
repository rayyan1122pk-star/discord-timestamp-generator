# Discord Timestamp Generator & Dynamic Time Formatter

> A high-performance, search-driven web utility and developer resource for creating dynamic Discord timestamps that automatically adjust to every user's local timezone.

[![Live Website](https://img.shields.io/badge/Live_Site-disctimestamps.site-5865F2?style=flat-square&logo=discord&logoColor=white)](https://www.disctimestamps.site)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 1. Project Purpose & Architecture

Discord Timestamps solves timezone friction in global online communities. Instead of posting fragile static strings like `"8 PM EST / 5 PM PST / 1 AM UTC"`, Discord allows authors to format dates as Unix epoch tokens (`<t:TIMESTAMP:STYLE>`). The Discord client dynamically queries the viewer's device clock and renders the local equivalent.

This product is engineered to:
1. **Satisfy "Do" Search Intent Instantly:** Deliver a zero-latency, 100% client-side generator above the fold.
2. **Eliminate Data Privacy Concerns:** Execute all calculations directly in the browser using the native `Intl` API without sending user event data to any server.
3. **Capture Long-Tail Search Demand:** Build a structured hub-and-spoke topical network targeting high-intent developer and server admin queries (`discord timestamp formats`, `discord markdown`, `discord webhook timestamp`, `discord bot timestamp`).
4. **Demonstrate Technical SEO & AEO Excellence:** Implement semantic HTML5, zero-CLS layouts, WCAG AA accessibility, rich JSON-LD schemas (`WebApplication`, `HowTo`, `TechArticle`, `FAQPage`, `BreadcrumbList`, `CollectionPage`), and answer-engine-optimized content blocks.

---

## 2. Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router)
- **Runtime:** React 19 Server Components (`RSC`) & Leaf Client Components
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 (Inline CSS theme, zero configuration bloat)
- **Icons:** `lucide-react` (Lightweight SVG primitives with accessible ARIA tags)
- **Linter:** ESLint 9 (Strict TypeScript & React Hooks verification)

---

## 3. Site Map & Keyword-to-URL Architecture

| Route | Primary Keyword | Search Intent | Schema Types | Priority |
| :--- | :--- | :--- | :--- | :---: |
| `/` | `discord timestamp generator` | Tool / Functional ("Do") | `WebApplication`, `HowTo`, `FAQPage`, `WebSite` | `1.0` |
| `/discord-timestamp-guide` | `discord timestamp guide` | Informational ("Know") | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.9` |
| `/discord-timestamp-formats` | `discord timestamp formats` | Commercial / Reference | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.9` |
| `/unix-timestamp` | `unix timestamp discord` | Technical Informational | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.8` |
| `/discord-markdown` | `discord markdown guide` | Informational / Reference | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.8` |
| `/discord-webhook-timestamps` | `discord webhook timestamp` | Developer Tutorial | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.8` |
| `/discord-bot-timestamps` | `discord bot timestamp` | Developer Tutorial | `TechArticle`, `BreadcrumbList`, `FAQPage` | `0.8` |
| `/blog` | `discord tutorials` | Content Hub | `CollectionPage`, `BreadcrumbList` | `0.8` |
| `/blog/[slug]` | Long-tail educational queries | Informational | `BlogPosting`, `BreadcrumbList` | `0.7` |
| `/about` | Brand / E-E-A-T | Trust & Governance | `AboutPage`, `Organization` | `0.5` |
| `/contact` | User Feedback & Support | Transactional | `ContactPage` | `0.5` |
| `/privacy` | Privacy Policy | Governance | `WebPage` | `0.3` |
| `/terms` | Terms of Service | Governance | `WebPage` | `0.3` |

---

## 4. Key Product Features

- **Intuitive Date & Time Selection:** Native HTML5 date/time pickers paired with quick presets (`Right Now`, `+15 Minutes`, `+1 Hour`, `+24 Hours`, `Tomorrow 8:00 PM`).
- **Smart Timezone Detection:** Automatically detects browser timezone with one-click override to any major global timezone (UTC, EST, PST, CET, GMT, IST, PKT, JST, etc.).
- **Live Discord Chat Preview:** High-fidelity Discord dark mode chat component showing avatar, BOT badge, timestamp pill, and real-time hover tooltip with absolute date.
- **Full Formats Matrix:** Side-by-side comparison of all 7 Discord timestamp flags (`:R`, `:f`, `:F`, `:t`, `:T`, `:d`, `:D`, and default) with dedicated 1-click copy buttons.
- **Deep-Link Sharing:** Encode state into shareable URL parameters (`?t=1727280000&s=R`) for seamless community coordination.
- **Tactile Visual Feedback:** Animated copy confirmation badges with zero layout shift.

---

## 5. Local Development & Verification

### Prerequisites
- Node.js `v20.0.0` or later (Tested on Node `v24.18.0`)
- npm `v10.0.0` or later

### Installation
```bash
git clone https://github.com/rayyan1122pk-star/discord-timestamp-generator.git
cd discord-timestamp-generator
npm install
```

### Development Server
```bash
npm run dev
# Visit http://localhost:3000 in your browser
```

### Quality Assurance & Auditing
```bash
# Run strict TypeScript and React Hooks linting
npm run lint

# Run optimized Turbopack production build
npm run build
```

---

## 6. Technical SEO & Core Web Vitals Engineering

- **LCP (Largest Contentful Paint):** Pre-rendered static HTML via App Router SSG. No external blocking scripts or remote fonts.
- **CLS (Cumulative Layout Shift):** Fixed dimensional aspect ratios for avatar badges, form controls, and code containers. Score: `0.00`.
- **INP (Interaction to Next Paint):** Leaf client component architecture. Input calculations occur in lightweight JavaScript microtasks without blocking main thread execution.
- **Accessibility:**
  - `<a href="#main-content">` Skip-to-content link for keyboard users.
  - Full ARIA attributes on interactive accordions (`aria-expanded`, `aria-controls`, `role="region"`).
  - Explicit `<label htmlFor="...">` bindings across all inputs.
  - High contrast ratio exceeding WCAG AA standards.
  - Supports `prefers-reduced-motion`.

---

## 7. Future n8n Automation Architecture

The content infrastructure is decoupled from view rendering to facilitate automated editorial workflows via n8n:

```
[n8n Keyword Research Trigger]
             │
             ▼
[SERP Gap Analysis & Topic Clustering]
             │
             ▼
[JSON Content Brief Generator]
             │
             ▼
[Human Review & Approval Webhook]
             │
             ▼
[Git PR or Direct Data Push to src/data/guides-data.ts]
             │
             ▼
[Next.js Static Generation / Vercel Deploy]
```

### Structured Data Model for n8n Payloads
Articles and tutorials follow the strictly-typed `BlogPost` and `GuideItem` interfaces defined in `src/data/guides-data.ts`:
- `slug`: kebab-case URL identifier
- `title`: SEO-targeted H1 headline
- `description`: Meta description under 155 characters
- `primaryKeyword`: Focus search query
- `category`: Taxonomy grouping
- `readingTime`: Formatted reading speed
- `publishedDate`: ISO 8601 date string
- `author`: Verified contributor profile
- `content`: Markdown/HTML text payload
- `sources`: Authoritative references

---

## 8. License

MIT License &copy; 2026 Discord Timestamps. Independent open source developer utility.
