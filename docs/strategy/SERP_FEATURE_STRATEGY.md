# Advanced SERP Feature & Answer Engine Strategy

**Target Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Objective:** Structure technical content to win rich results, featured snippets, People Also Ask (PAA) blocks, and direct AI search extractions.

---

## 1. Featured Snippet Optimization Architecture

### Type 1: Definition Snippet (Target Query: "What is a Discord timestamp?")
* **Target Placement:** Top 100 words of `/discord-timestamp-guide` and `/`
* **Optimal Pattern:** Direct concise declaration:
  > "A Discord timestamp is a formatted text snippet written as `<t:TIMESTAMP:STYLE>`, where TIMESTAMP is a 10-digit Unix Epoch integer in seconds and STYLE is an optional single-letter display flag. Discord automatically converts this code into each viewer's local clock and timezone."
* **Supporting Tag:** Followed immediately by an illustrative syntax breakdown.

### Type 2: Table Snippet (Target Query: "Discord timestamp formats" / "Discord timestamp flags")
* **Target Placement:** `/discord-timestamp-formats` and `/discord-timestamp-guide`
* **Format Structure:** Semantic HTML `<table>` with explicit `<th>` and `<td>` tags:
  * Flag (`:t`, `:T`, `:d`, `:D`, `:f`, `:F`, `:R`)
  * Format Name (Short Time, Relative, etc.)
  * Discord Syntax (`<t:1727280000:R>`)
  * Rendered Output (`in 2 hours`)

### Type 3: Ordered List Snippet (Target Query: "How to make a Discord timestamp")
* **Target Placement:** `<ol>` steps on homepage and guides:
  1. Pick your target event date and time.
  2. Select your local timezone.
  3. Choose your preferred format flag (such as :R for countdowns or :F for full dates).
  4. Copy the `<t:epoch:style>` code and paste it into Discord.

---

## 2. People Also Ask (PAA) Query Strategy

The following verified PAA questions are mapped directly to corresponding FAQPage schemas across the website:

| Target Search Query | Matching Page URL | Direct Answer Summary |
| :--- | :--- | :--- |
| "Why is my Discord timestamp showing raw text?" | `/blog/discord-timestamp-not-working-troubleshooting-guide` | Explains backticks disabling parsing, whitespace in brackets, or 13-digit millisecond errors. |
| "What is the R format in Discord timestamp?" | `/discord-timestamp-formats` | Explains relative countdown/countup updating dynamically on client devices without message edits. |
| "Can Discord timestamps show different times for different users?" | `/discord-timestamp-guide` | Explains client-side evaluation based on viewer's local device clock and locale settings. |
| "How do I make a Discord timestamp countdown?" | `/blog/discord-countdown-timer-chat-relative-time-guide` | Explains pairing `<t:EPOCH:R>` with `<t:EPOCH:F>`. |
| "Do Discord timestamps work on mobile phones?" | `/blog/how-to-send-discord-timestamps-on-mobile-iphone-android` | Confirms native iOS and Android support with zero plugins required. |

---

## 3. Answer Engine Optimization (AEO / GEO) Guidelines

1. **Information Extraction Readiness:** Every major article provides the core fact in a stand-alone sentence before expanding into narrative background.
2. **Glossary Definition Lists:** Semantic `<dl>`, `<dt>`, and `<dd>` elements used in technical glossaries for direct token identification.
3. **Machine Readable Reference (`/llms.txt`):** Provides AI scrapers and search indexing models with structured syntax cheat sheets and code snippets in markdown.
