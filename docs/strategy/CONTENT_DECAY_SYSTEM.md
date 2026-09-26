# Content Decay Detection & Refresh Engine

**Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Objective:** Prevent technical obsolescence, maintain high factual freshness, and track Discord API updates.

---

## 1. Technical Decay Triggers

Technical content deteriorates when underlying software platforms evolve. The following external events trigger an immediate content audit:

| Trigger Event | Impacted Topics | Required Audit Action |
| :--- | :--- | :--- |
| **Discord.js Major Version Release** | `/discord-bot-timestamps`, `/blog/discord-bot-dynamic-timestamp-developer-guide` | Verify `TimestampStyles` and `time()` helpers against new SDK export signatures. |
| **Discord Developer Portal API Update** | `/discord-webhook-timestamps`, `/blog/discord-api-rate-limits-message-editing-countdown-bots` | Audit rate limit quotas (e.g. 5-per-5-second message edit rules) and embed schema changes. |
| **Discord Client Rendering Update** | `/discord-timestamp-guide`, `/discord-markdown` | Test chat token regex across desktop, web, iOS, and Android client builds. |
| **IANA Time Zone Database Release** | `/unix-timestamp`, `/blog/diagnosing-discord-timezone-clock-skew-issues` | Verify daylight saving transition rules and timezone alias handling. |

---

## 2. Decay Review Intervals

1. **Monthly Sanity Check:** Automated CI run of `node scripts/seo-regression.js`.
2. **Quarterly Technical Review:** Manual verification of discord.js, discord.py, and webhook code snippets against active production Discord bots.
3. **Annual Freshness Refresh:** Updating `modifiedDate` metadata and review notes for all 18 guides and blog articles.
