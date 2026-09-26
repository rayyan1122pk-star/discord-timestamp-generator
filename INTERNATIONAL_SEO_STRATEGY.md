# International SEO & Global Timezone Strategy

**Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Objective:** Serve international Discord communities without resorting to thin auto-translation spam.

---

## 1. Global Demand Analysis

Discord communities are inherently international. Gaming servers, open-source repositories, and crypto DAOs routinely span multiple continents. The primary search demand centers on:
1. Converting local event times to UTC/GMT.
2. Handling US and European Daylight Saving Time shifts (EDT/EST, BST/GMT, CEST/CET).
3. Displaying 24-hour clock formats (standard in Europe and Latin America) versus 12-hour AM/PM formats (standard in the US).

---

## 2. Dynamic Client-Side Localization Architecture

Rather than creating hundreds of duplicate translated pages that risk being flagged as doorway pages, our application handles internationalization dynamically at the browser runtime level:

```text
Browser Visits Site
       ↓
Browser Detects User Locale (Intl.DateTimeFormat().resolvedOptions().locale)
       ↓
Browser Detects Operating System Timezone (Intl.DateTimeFormat().resolvedOptions().timeZone)
       ↓
Interactive Generator Pre-populates Local System Timezone Automatically
       ↓
Rendered Preview Displays Date in User Local Conventions (e.g. DD/MM/YYYY vs MM/DD/YYYY)
```

---

## 3. Strict Hreflang & Translation Policy

1. **No Machine-Generated Thin Subdirectories:** We do not publish automated Google Translate subdirectories (such as `/es/`, `/de/`, `/fr/`) without native technical proofreading and human verification.
2. **Current Language Declaration:** The site declares `<html lang="en">` globally.
3. **Future Localization Prerequisite:** If dedicated non-English sections are introduced in the future:
   * Dedicated native translations of code captions and UI strings.
   * Bidirectional `hreflang` link headers:
     `<link rel="alternate" hreflang="en" href="https://discordtimestamps.dev/..." />`
     `<link rel="alternate" hreflang="x-default" href="https://discordtimestamps.dev/..." />`
