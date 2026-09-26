# SEO KPI & Empirical Measurement Framework

**Target Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Target Domain:** https://discordtimestamps.dev/  
**Standard:** Empirical Data Only. Zero Fabricated Statistics.

---

## 1. Google & Search Engine Signals (Primary)

These metrics reflect actual search crawler discovery, user query interaction, and indexation health:

| Metric Category | Data Source | Measurement Method | Verification Frequency |
| :--- | :--- | :--- | :--- |
| **Indexed Canonical URLs** | Google Search Console (GSC) | GSC Index Coverage Report (Submitted & Indexed) | Weekly |
| **Search Impressions** | GSC Performance Report | Aggregated weekly impressions across queries | Weekly |
| **Organic Clicks** | GSC Performance Report | Clicks to homepage and guide URLs | Weekly |
| **Average Query Position** | GSC Performance Report | Tracked across core clusters (Generator, Syntax, Bot) | Monthly |
| **Crawl Health & Status** | GSC Crawl Stats / Server Logs | 200 vs 4xx/5xx responses; host availability | Continuous |
| **Core Web Vitals** | GSC Page Experience / CrUX | Field data (LCP, INP, CLS) across mobile & desktop | Monthly |

---

## 2. Product Utility & Engagement Metrics (Client-Side)

These events measure whether visitors successfully complete their goal:

| Event Name | Measurement Standard | Target Intent |
| :--- | :--- | :--- |
| `timestamp_generated` | User inputs date and calculates epoch | Active usage |
| `timestamp_copied` | User clicks copy pill for any format | Primary conversion |
| `code_snippet_copied` | User copies developer code block in tutorial | Technical adoption |
| `outbound_doc_click` | User follows official link to Discord developer docs | Reference validation |

---

## 3. Third-Party Diagnostic Authority Metrics

These metrics are useful secondary diagnostic indicators of link neighborhood health, but are **NOT** Google ranking factors:
* **Ahrefs Domain Rating (DR) / Referring Domains:** Tracked quarterly to observe natural editorial citation growth.
* **Semrush Authority Score (AS):** Monitored for overall link profile quality.
* **Moz Domain Authority (DA):** Monitored for brand mention trends.

*Rule:* Never report third-party metrics as "Google giving this site a score". Always attribute the metric to the specific diagnostic vendor.
