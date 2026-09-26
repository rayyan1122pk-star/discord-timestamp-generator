# Continuous SEO Monitoring & Reliability System

**Target Deployment:** `https://discord-timestamp-generator-swart.vercel.app/`  
**Target Domain:** `https://discordtimestamps.dev/`  
**Purpose:** Guard against silent SEO drift, broken canonicals, crawler blocks, and content degradation.

---

## 1. Automated Health & Crawl Verification Cycle

```text
Continuous CI/CD Gate (npm test)
       ↓
Pre-Deployment Verification (Static Page Generation & Lint)
       ↓
Post-Deployment Smoke Test (Direct HTTP 200 Probe on All 24 Canonical URLs)
       ↓
Weekly Schedulers (Sitemap validation, dead link detection, search console checks)
```

### Monitored Endpoints & Frequencies
1. **Robots.txt (`/robots.txt`):** Daily probe verifying `User-agent: *` and `Allow: /`. Alert on any unintended Disallow.
2. **XML Sitemap (`/sitemap.xml`):** Daily XML parsing check confirming all 24 URLs return HTTP 200 without redirects.
3. **Canonical Consistency:** Post-deployment check verifying `<link rel="canonical">` matches origin.
4. **Generator Edge Cases:** CI check running `node scripts/seo-regression.js` on every git push.

---

## 2. Escalation & Alert Tiers

| Alert Condition | Severity | Immediate Response | Assigned Role |
| :--- | :--- | :--- | :--- |
| Production returns HTTP 5xx or blank page | P0 (Critical) | Roll back immediately to previous Vercel deployment. | DevOps / Fullstack Lead |
| Robots.txt disallows root or sitemap missing | P0 (Critical) | Revert `robots.ts` and deploy edge fix. | Technical SEO Lead |
| Any canonical URL returns 404 Not Found | P1 (High) | Restore slug mapping in `guides-data.ts` or routes. | Content / SEO Engineer |
| Generator syntax outputs `<t:NaN:R>` | P1 (High) | Verify `time-utils.ts` fallback guards and redeploy. | Frontend Lead |
| Canonical tag points to unresolvable domain | P1 (High) | Update `NEXT_PUBLIC_SITE_URL` fallback. | SEO Systems Engineer |
| Meta description exceeds 175 characters | P2 (Medium) | Trim snippet in `seo-config.ts` during next cycle. | Technical Writer |

---

## 3. Incident Recovery Protocols

### Protocol A: Reverting an Erroneous Production Deployment
If a production deployment introduces critical defects:
1. Log into Vercel Dashboard or run `vercel rollback`.
2. Instant edge rollover restores the previous immutable build artifact within seconds.
3. Fix root cause locally, verify with `npm test`, and push a verified commit.

### Protocol B: Handling Registrar DNS Propagations
When configuring custom domain `discordtimestamps.dev`:
1. Verify A records point to `76.76.21.21` and CNAME points to `cname.vercel-dns.com`.
2. Do NOT change `NEXT_PUBLIC_SITE_URL` until `nslookup discordtimestamps.dev` resolves globally.
3. Once DNS resolves, set environment variable and redeploy.
