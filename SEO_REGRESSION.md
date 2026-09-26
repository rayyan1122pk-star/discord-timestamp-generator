# Automated SEO Regression System & Rules

This document defines the strict regression prevention rules and test procedures for the Discord Timestamp Generator project. Every release must pass these checks prior to production deployment.

---

## 1. Regression Test Suite

The regression test suite can be executed locally and in CI via:
```bash
node scripts/seo-regression.js
```

### Verified Test Assertions
1. **Mathematical Accuracy:**
   - Leap year date `2028-02-29 12:00:00 UTC` produces exact epoch `1835438400`.
   - Epoch zero `1970-01-01 00:00:00 UTC` produces exact epoch `0`.
   - Gregorian boundary `2024-12-31 23:59:59` to `2025-01-01 00:00:00` advances by exactly 1 second.
   - Year 2038 boundary `2147483648` evaluates without 32-bit overflow.
2. **Defensive Input Sanitization:**
   - Passing `""`, `"invalid-date"`, `null`, `undefined`, or `NaN` into time utility functions returns safe current epoch seconds instead of `NaN`.
   - Syntax builder output strictly avoids `<t:NaN:style>`.
3. **Format Integrity:**
   - Verified outputs for all 7 styles: `:t`, `:T`, `:d`, `:D`, `:f`, `:F`, `:R`.
4. **Content Cleanliness & Quality Gate:**
   - Exact count of em-dashes (`—`): **0**.
   - Exact count of en-dashes (`–`): **0**.
   - Banned AI buzzword count: **0** across all `src/**/*.ts` and `src/**/*.tsx` files.
5. **Route & Sitemap Synchronization:**
   - Every route declared in `/sitemap.xml` exists in the App Router.
   - Every canonical tag matches the configured site origin.

---

## 2. Regression Severity Matrix

| Severity Level | Definition | Release Action |
| :--- | :--- | :--- |
| **P0 (Critical)** | Entire site noindexed, robots blocks root, canonical points to dead domain, sitemap returns non-200, generator produces `<t:NaN:R>`, or build fails. | **BLOCK DEPLOYMENT IMMEDIATELY.** |
| **P1 (High)** | Any canonical route returns 404/500, broken internal links to non-existent slugs, or time conversion math deviates from UTC. | **BLOCK PRODUCTION RELEASE.** |
| **P2 (Medium)** | Metadata description exceeds 175 characters, missing breadcrumb on subpage, or FAQ schema text does not match accordion copy. | **FIX WITHIN 24 HOURS.** |
| **P3 (Low)** | Minor semantic HTML refinement, non-blocking CSS cosmetic adjustment, or internal anchor wording optimization. | **SCHEDULE IN SPRINT BACKLOG.** |

---

## 3. Recovery Procedures

### If Robots.txt Blocks Crawling
1. Inspect `src/app/robots.ts`.
2. Ensure `rules: { userAgent: "*", allow: "/" }` is unmodified.
3. Verify no `disallow: "/"` statements exist.
4. Redeploy immediately.

### If Canonical Domain Drifts
1. Check `process.env.NEXT_PUBLIC_SITE_URL` in Vercel project settings.
2. Verify fallback in `src/lib/seo-config.ts` points to active production URL.
3. Run `npm run build` and check `<link rel="canonical">` output.

### If Generator Generates `<t:NaN:R>`
1. Inspect `src/lib/time-utils.ts`.
2. Confirm `calculateEpochSeconds` uses defensive check:
   `if (Number.isNaN(targetDate.getTime())) { return Math.floor(Date.now() / 1000); }`
3. Execute `node scripts/seo-regression.js`.
