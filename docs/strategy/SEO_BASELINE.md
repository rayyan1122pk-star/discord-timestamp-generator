# Verified Technical SEO & Production Baseline

**Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Target Domain:** https://discordtimestamps.dev/ (Pending Registrar DNS Configuration)  
**Last Verified:** 2026-09-26  
**Auditor:** Senior SEO Systems & Reliability Team  

---

## 1. Verified Infrastructure Baseline

| Component | Verified Production State | HTTP / Network Status |
| :--- | :--- | :--- |
| **Edge Host** | Vercel Global Edge Network (iad1) | HTTP 200 OK with TLS 1.3 / SSL |
| **Custom Domain** | `discordtimestamps.dev` | FAILED (Unresolved DNS host; registrar A/CNAME records pending) |
| **Active Fallback Host** | `discord-timestamp-generator-swart.vercel.app` | VERIFIED (Active production alias) |
| **Framework Runtime** | Next.js 16.3.6 (Turbopack SSG) | VERIFIED (31/31 static routes generated in 1.2s) |
| **Language Runtime** | Node.js 24.18.0 / React 19.2.8 / TypeScript 5 | VERIFIED (0 lint errors, 0 type errors) |

---

## 2. Canonical Route Inventory (24 Verified Routes)

Every URL listed below returns HTTP 200 OK, serves valid HTML5, includes self-referential canonical tags, and is indexed in `/sitemap.xml`:

### Core Application & Interactive Hubs (7 Routes)
1. `/` (Homepage: Interactive Generator, Preview Simulator, Multi-Format Copy)
2. `/discord-timestamp-guide` (Pillar Guide: Dynamic Syntax, POSIX Seconds, Rules)
3. `/discord-timestamp-formats` (Syntax Cheat Sheet: 7 Format Flags Breakdown)
4. `/unix-timestamp` (Unix Epoch Converter: Leap Seconds, 64-bit Y2038 Architecture)
5. `/discord-markdown` (Markdown Guide: ANSI Colors, Spoilers, Inline Code Pitfalls)
6. `/discord-webhook-timestamps` (Webhook Developer Guide: Embed Dynamic vs Footer ISO-8601)
7. `/discord-bot-timestamps` (Bot Developer Guide: discord.js v14 time() & discord.py format_dt)

### Index & Organizational Routes (5 Routes)
8. `/blog` (Technical Editorial Hub & Topical Cluster Directory)
9. `/about` (Editorial Standards, Mission, and Zero-Log Client Privacy Policy)
10. `/contact` (Interactive Feedback, Correction, and Bug Reporting Interface)
11. `/privacy` (Zero-Storage Client-Side Processing Transparency Policy)
12. `/terms` (Usage Terms and Open License Disclosure)

### Deep Technical Guides & Topical Clusters (12 Routes)
13. `/blog/how-to-create-discord-timestamps-complete-guide`
14. `/blog/discord-timestamp-not-working-troubleshooting-guide`
15. `/blog/discord-countdown-timer-chat-relative-time-guide`
16. `/blog/how-to-schedule-events-across-global-discord-servers`
17. `/blog/building-an-automated-discord-notification-system-with-n8n`
18. `/blog/how-to-send-discord-timestamps-on-mobile-iphone-android`
19. `/blog/discord-bot-dynamic-timestamp-developer-guide`
20. `/blog/unix-timestamp-vs-iso-8601-discord-bots`
21. `/blog/discord-markdown-formatting-timestamps-guide`
22. `/blog/discord-api-rate-limits-message-editing-countdown-bots`
23. `/blog/discord-scheduled-events-api-automations`
24. `/blog/diagnosing-discord-timezone-clock-skew-issues`

---

## 3. Crawler Control & Special Discovery Files

| Endpoint | Target URL | Verified Status | Payload / Standards |
| :--- | :--- | :--- | :--- |
| **Robots Directives** | `/robots.txt` | HTTP 200 OK | `User-agent: *`, `Allow: /`, `Sitemap: [URL]/sitemap.xml` |
| **XML Sitemap** | `/sitemap.xml` | HTTP 200 OK | Valid XML sitemap listing exactly 24 canonical URLs |
| **LLMs Discovery** | `/llms.txt` | HTTP 200 OK | Plain text Markdown index formatted for AI search retrieval |
| **Human Credits** | `/humans.txt` | HTTP 200 OK | Developer and engineering team attribution |
| **Security Disclosure**| `/.well-known/security.txt`| HTTP 200 OK | RFC 9116 compliant vulnerability reporting endpoint |
| **Social OpenGraph** | `/og-image.png` | HTTP 200 OK | 1200x630 PNG visual asset |

---

## 4. Structured Data (Schema.org JSON-LD) Baseline

The following schema blocks are verified present in server-rendered HTML:
* **WebApplication:** Injected on `/` with name, applicationCategory, operatingSystem, featureList, and zero-price Offer.
* **HowTo:** Injected on `/` with step-by-step instructions for picking time, selecting format, and pasting into Discord.
* **FAQPage:** Injected on `/` and on all 18 guide/blog pages matching visible accordion items verbatim.
* **BreadcrumbList:** Hierarchical breadcrumbs (`Home > Blog > Post Title`) injected across all subpages.
* **TechArticle:** Injected on technical articles with headline, description, author, and dateModified.

---

## 5. Generator Mathematical & Defensive Baseline

* **Epoch Resolution:** 10-digit POSIX seconds (derived via `Math.floor(Date.now() / 1000)`).
* **Leap Year Verification:** `2028-02-29 12:00:00 UTC` evaluates to `1835438400` without arithmetic error.
* **Epoch Zero:** `1970-01-01 00:00:00 UTC` evaluates to `0`.
* **Negative Timestamps:** Supported down to 64-bit integer limits (`<t:-14182980:D>` for July 20, 1969).
* **NaN Defense:** Any malformed date string intercepted by `calculateEpochSeconds` safely falls back to current epoch. Output strictly prevents `<t:NaN:R>`.
* **Supported Styles:** `:t`, `:T`, `:d`, `:D`, `:f`, `:F`, `:R` (all 7 verified).
