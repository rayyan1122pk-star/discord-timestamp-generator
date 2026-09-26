# Master Content Plan: Discord Timestamp & Developer Authority Hub

This document defines the topical architecture, content clusters, keyword-to-URL mappings, search intent analysis, and cannibalization risk controls for the Discord Timestamp Generator platform.

---

## 1. Topical Architecture & Cluster Taxonomy

The platform organizes content into nine interconnected technical clusters. Every article belongs to a dedicated cluster, serves a single primary search intent, and features bidirectional links to both the interactive generator tool and peer articles in the cluster.

```
                               ┌─────────────────────────────┐
                               │  Flagship Interactive Tool  │
                               │             /               │
                               └──────────────┬──────────────┘
                                              │
      ┌──────────────────┬────────────────────┼───────────────────┬──────────────────┐
      ▼                  ▼                    ▼                   ▼                  ▼
[1. Timestamps]   [2. Unix Epoch]    [3. Markdown Hub]    [4. Developers]     [5. Webhooks]
   Core Syntax       POSIX Specs        Lexical Parser       discord.js v14      Payload JSON
   7 Style Flags     UTC vs Epoch       Code Blocks          discord.py 2.0      Embed Footers
   Relative Clock    Leap Seconds       Masked Links         Rate Limits         n8n Pipelines
      │                  │                    │                   │                  │
      └──────────────────┼────────────────────┼───────────────────┼──────────────────┘
                         ▼                    ▼                   ▼
                  [6. Timezones]     [7. Troubleshooting]  [8. Automations]
                     IANA Database      Diagnostic Tree       Event Webhooks
                     DST Shifts         13-Digit Overflow     Cron Pipelines
                     Clock Skew & NTP   Backtick Escapes      Guild Events
```

---

## 2. Master Content Inventory & Keyword-to-URL Mapping

### Tier 1: Pillar Reference Documentation (Static Hub Pages)

| Page URL | Primary Keyword | Search Intent | Word Count | Content Cluster | Priority | Status |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: |
| `/` | `discord timestamp generator` | Tool / Transactional | 1,800 | Core Generator | P0 | Published |
| `/discord-timestamp-guide` | `discord timestamp guide` | Informational | 2,200 | Timestamps | P0 | Published |
| `/discord-timestamp-formats` | `discord timestamp formats` | Reference / Cheat Sheet | 1,900 | Timestamps | P0 | Published |
| `/unix-timestamp` | `unix timestamp discord` | Educational / Tech | 2,100 | Unix Epoch | P0 | Published |
| `/discord-markdown` | `discord markdown guide` | Educational / Formatting | 2,000 | Markdown Hub | P0 | Published |
| `/discord-webhook-timestamps` | `discord webhook timestamp` | Developer Tutorial | 1,950 | Webhooks | P0 | Published |
| `/discord-bot-timestamps` | `discord bot timestamp` | Developer SDK Guide | 2,050 | Developers | P0 | Published |

---

### Tier 2: Deep Technical Blog Articles (Long-Tail & Authority Hub)

| # | Article URL | Primary Keyword | Secondary Keywords | Search Intent | Target Word Count | Content Cluster | Cannibalization Safeguard | Priority | Status |
| :-: | :--- | :--- | :--- | :--- | :---: | :--- | :--- | :---: | :---: |
| 1 | `/blog/how-to-create-discord-timestamps-complete-guide` | `how to make discord timestamp` | `discord time stamp`, `dicord timestamp`, `discord time code` | How-To / Educational | 3,200+ | Timestamps | Focuses on creation workflows and beginner steps; links to formats cheat sheet for flag deep-dive. | P0 | Published (Expanded) |
| 2 | `/blog/discord-timestamp-not-working-troubleshooting-guide` | `discord timestamp not working` | `discord timestamp raw text`, `discord timestamp broken`, `discord t: raw code` | Troubleshooting | 3,500+ | Troubleshooting | Focuses strictly on errors, parser regex rules, and fixes; does not duplicate general format explanations. | P0 | Published (Expanded) |
| 3 | `/blog/discord-countdown-timer-chat-relative-time-guide` | `discord countdown timer` | `discord countdown in chat`, `discord relative timestamp`, `discord R flag` | How-To / Feature | 2,800+ | Timestamps & Use Cases | Dedicated solely to the `:R` relative time flag, client-side tick updating, and announcement recipes. | P0 | Published (Expanded) |
| 4 | `/blog/how-to-schedule-events-across-global-discord-servers` | `schedule events discord timezone` | `discord event timezone converter`, `discord global server time` | Strategy / Community Ops | 3,000+ | Timezones & Use Cases | Focuses on international server management, daylight saving shifts, and event scheduling psychology. | P0 | Published (Expanded) |
| 5 | `/blog/building-an-automated-discord-notification-system-with-n8n` | `discord webhook timestamp format` | `n8n discord webhook timestamp`, `discord webhook embed timestamp json` | Technical Tutorial | 3,400+ | Automations & Webhooks | Focuses on n8n visual automation pipelines and JavaScript date conversion nodes. | P0 | Published (Expanded) |
| 6 | `/blog/how-to-send-discord-timestamps-on-mobile-iphone-android` | `discord timestamp mobile` | `discord timestamp iphone`, `discord timestamp android`, `discord on phone` | Mobile / How-To | 2,800+ | Mobile & Shortcuts | Dedicated to iOS Text Replacement, Gboard clipboard pins, mobile picker wheels, and tap popovers. | P0 | Published (Expanded) |
| 7 | `/blog/discord-bot-dynamic-timestamp-developer-guide` | `discord bot timestamp code` | `discord.js timestamp format`, `discord.py timestamp example`, `discord embed dynamic timestamp` | Developer Guide | 3,800+ | Developers | SDK implementation in discord.js v14 and discord.py; distinguishes client rendering from bot edit loops. | P0 | Published (Expanded) |
| 8 | `/blog/unix-timestamp-vs-iso-8601-discord-bots` | `unix timestamp vs iso 8601 discord` | `discord embed timestamp iso 8601`, `discord database timestamp storage`, `unix epoch vs iso date` | Architecture / Comparison | 3,200+ | Unix Epoch & Developers | Analyzes database storage trade-offs (PostgreSQL, MySQL, MongoDB), payload byte weight, and Discord API expectations. | P1 | New Expansion |
| 9 | `/blog/discord-markdown-formatting-timestamps-guide` | `discord markdown timestamp` | `discord formatting timestamp`, `discord embed code block timestamp`, `discord masked link time` | Technical Guide | 3,000+ | Markdown Hub | Explores lexical parser precedence, nesting tags in spoilers/quotes/bold, and why backticks prevent timestamp evaluation. | P1 | New Expansion |
| 10 | `/blog/discord-api-rate-limits-message-editing-countdown-bots` | `discord api rate limit message edit` | `discord bot countdown rate limit`, `discord 429 rate limit message`, `discord bot edit message loop` | Architecture / Performance | 3,200+ | Developers & Troubleshooting | Technical teardown of Discord REST rate limits (5 edits / 5s per channel), bucket resets, and Gateway traffic. | P1 | New Expansion |
| 11 | `/blog/discord-scheduled-events-api-automations` | `discord scheduled events api` | `discord scheduled event timestamp`, `discord create event bot`, `discord scheduled event embed` | Developer / Automation | 3,000+ | Automations & Developers | Implementation guide for GuildScheduledEvent endpoints, recurring rules, voice stage links, and channel broadcast alerts. | P1 | New Expansion |
| 12 | `/blog/diagnosing-discord-timezone-clock-skew-issues` | `discord timestamp wrong time` | `discord timestamp showing wrong time`, `discord clock skew`, `discord ntp sync time` | Troubleshooting | 2,900+ | Timezones & Troubleshooting | Diagnostic guide for client device clock drift, NTP synchronization, IANA database updates, and Windows/iOS clock offsets. | P1 | New Expansion |

---

## 3. Cannibalization Prevention Matrix

| Potential Overlap Pair | Shared Subject | Distinct Search Intent | Canonical / Separation Boundary |
| :--- | :--- | :--- | :--- |
| `/discord-timestamp-guide` vs. `/blog/how-to-create-discord-timestamps-complete-guide` | Syntax creation | Static guide is an exhaustive reference manual; blog post is a conversational step-by-step tutorial with announcement copy recipes. | Guide targets `discord timestamp guide`; blog targets `how to make discord timestamp`. Both link to each other. |
| `/discord-timestamp-formats` vs. `/blog/discord-countdown-timer-chat-relative-time-guide` | Format flags | Formats cheat sheet compares all 7 flags side-by-side; Countdown post isolates only the `:R` flag, explaining tick mechanics and giveaway countdowns. | Formats targets `discord timestamp formats`; Countdown targets `discord countdown timer`. |
| `/discord-webhook-timestamps` vs. `/blog/building-an-automated-discord-notification-system-with-n8n` | Webhooks | Static guide documents raw Discord webhook JSON specification; blog post provides an end-to-end n8n workflow implementation. | Static guide targets `discord webhook timestamp`; blog post targets `n8n discord webhook timestamp`. |
| `/discord-bot-timestamps` vs. `/blog/discord-bot-dynamic-timestamp-developer-guide` | Bot code | Static guide provides quick API cheatsheets; blog post provides an architectural deep dive with database storage and migration patterns. | Static guide targets `discord bot timestamp`; blog post targets `discord bot timestamp code`. |
| `/unix-timestamp` vs. `/blog/unix-timestamp-vs-iso-8601-discord-bots` | Epoch time | Static guide explains Unix epoch history, definitions, and leap seconds; blog post evaluates database storage models (PostgreSQL vs MongoDB vs MySQL) for bots. | Static page targets `unix timestamp discord`; blog post targets `unix timestamp vs iso 8601 discord`. |
| `/blog/discord-timestamp-not-working-troubleshooting-guide` vs. `/blog/diagnosing-discord-timezone-clock-skew-issues` | Troubleshooting | Syntax guide troubleshoots broken code tokens (`<t:1727280000>`); clock skew guide troubleshoots timestamps that render successfully but show the wrong time due to local device clock drift. | Syntax targets `discord timestamp not working`; Clock skew targets `discord timestamp wrong time`. |

---

## 4. Internal Link Graph Architecture

Every page must conform to the 3-link rule:
1. **Upward Link**: Links to the flagship tool (`/`) using clear descriptive anchor text ("Discord Timestamp Generator" or "free timestamp generator tool").
2. **Horizontal Link**: Links to the relevant pillar guide in its topical cluster (e.g. `/discord-timestamp-guide` or `/discord-bot-timestamps`).
3. **Lateral Supporting Link**: Links to 2-3 related blog articles addressing adjacent questions (e.g. the troubleshooting guide links to the syntax guide and the rate limits guide).

```
                 [Home / Generator (/)]
                    ▲              ▲
                    │              │
       ┌────────────┴───┐      ┌───┴────────────┐
       ▼                ▼      ▼                ▼
[Pillar Guides] ◀──────────────▶ [Blog Articles Hub]
  - Guide                  ▲       - Creation Guide
  - Formats                │       - Troubleshooting Guide
  - Unix Epoch             │       - Relative Countdowns
  - Markdown               │       - Global Server Scheduling
  - Webhooks               │       - n8n Automation
  - Bots                   │       - Mobile Shortcuts
                           │       - Bot Developer Guide
                           │       - Unix vs ISO 8601
                           │       - Markdown Formatting
                           │       - API Rate Limits
                           │       - Scheduled Events API
                           │       - Clock Skew Diagnostics
                           ▼
                 [Lateral Cross-Links]
```

---

## 5. Technical Documentation Standards

All content published to the platform adheres to these technical writing standards:
1. **Answer-First Structure**: The first 60 words under every major heading must provide a direct factual answer to the section query before expanding into context and edge cases.
2. **Current API Verification**: Code examples must use current, non-deprecated libraries:
   - `discord.js v14+` (`import { time, TimestampStyles } from 'discord.js'`)
   - `discord.py 2.0+` (`discord.utils.format_dt`)
   - Native JavaScript `Date` and `Intl` APIs
   - Modern SQL (`TIMESTAMPTZ`, `BIGINT`)
3. **Failure Mode Diagnosis**: When explaining a concept, dedicate space to why it fails, what error messages appear, and how to verify the fix.
4. **Zero Fluff**: Omit opening filler paragraphs ("In today's fast-paced digital era...", "Whether you are a seasoned developer or beginner..."). Start immediately with the subject definition.
5. **Punctuation Rules**: Zero em-dashes (`—`) and zero en-dashes (`–`). Use parentheses, colons, or clean commas for syntactic separation.
