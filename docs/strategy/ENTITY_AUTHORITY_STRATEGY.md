# Brand & Entity Authority Strategy

**Target Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Target Domain:** https://discordtimestamps.dev/  
**Objective:** Transition from a generic exact-match tool to an established entity within the developer knowledge graph.

---

## 1. Brand Identity & Disambiguation

* **Brand Entity:** Discord Timestamp Generator (`discordtimestamps.dev`)
* **Entity Type:** SoftwareApplication / WebApplication / Technical Reference Hub
* **Primary Topical Node:** Discord Timestamp (`/t:` token syntax)
* **Connected Parent Entities:**
  * Discord (Platform)
  * Unix Time / POSIX Time (Time Representation Standard)
  * Coordinated Universal Time / UTC (Global Time Standard)
  * ECMAScript Internationalization API (Intl)

---

## 2. Technical Author & Contributor Profiles

To satisfy Google E-E-A-T and Search Quality Guidelines, editorial content is authored and maintained by specialized engineering roles:

| Contributor | Focus Area | Technical Credentials / Verification |
| :--- | :--- | :--- |
| **Alex Vance** | Bot Architecture & API Limits | Discord.js v14, Discord API Rate Limits, and Bot Event Systems |
| **Elena Rostova** | Distributed Systems & Time Math | POSIX Epoch, NTP Clock Synchronization, and Webhook Payloads |
| **Marcus Chen** | Frontend Engineering & UX | ECMAScript Intl Formatting, Mobile Viewports, and Accessibility |

---

## 3. Structured Data Entity Integration

Every page includes structured JSON-LD attributing the author and publisher:
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "Alex Vance",
    "jobTitle": "Discord Bot Architect & Systems Engineer"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Discord Timestamp Generator",
    "url": "https://discord-timestamp-generator-swart.vercel.app"
  }
}
```

---

## 4. Entity Footprint Roadmap

1. **GitHub Organization:** Publish open-source client helpers under an official GitHub repository.
2. **SameAs Linking:** Link organizational structured data to official GitHub and npm package profiles.
3. **Wikidata & Wikipedia Citations:** Ensure the tool and syntax guides adhere to primary sources (Discord Developer Portal and IEEE POSIX) to qualify for community technical citations.
