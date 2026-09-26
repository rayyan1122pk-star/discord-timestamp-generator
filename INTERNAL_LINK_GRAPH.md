# Semantic Internal Link Graph & Hub Architecture

**Website:** https://discord-timestamp-generator-swart.vercel.app/  
**Objective:** Distribute PageRank, establish topical clusters, and provide frictionless user pathways between tools and documentation.

---

## 1. Hub-and-Spoke Semantic Architecture

```text
                               [Homepage: /]
                         (Core Interactive Generator)
                                  |
     +----------------------------+----------------------------+
     |                            |                            |
     v                            v                            v
[Syntax & Formats Hub]       [Unix Epoch Hub]        [Developer Hubs]
 - /discord-timestamp-guide   - /unix-timestamp       - /discord-webhook-timestamps
 - /discord-timestamp-formats                         - /discord-bot-timestamps
 - /discord-markdown
     |                            |                            |
     +----------------------------+----------------------------+
                                  |
                                  v
                   [Cluster Deep-Dive Articles]
  - /blog/discord-timestamp-not-working-troubleshooting-guide
  - /blog/discord-countdown-timer-chat-relative-time-guide
  - /blog/discord-api-rate-limits-message-editing-countdown-bots
  - /blog/unix-timestamp-vs-iso-8601-discord-bots
  - /blog/diagnosing-discord-timezone-clock-skew-issues
  - /blog/how-to-send-discord-timestamps-on-mobile-iphone-android
```

---

## 2. Inbound & Outbound Link Distribution Matrix

| Page URL | Inbound Links (Internal) | Outbound Links (Internal) | Primary Upward Hub | Key Lateral Connections |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Site-wide (Logo/Nav/Breadcrumbs) | All 6 Pillar Guides + Blog | Root | Generator presets and quick format copy |
| `/discord-timestamp-guide` | Header, Footer, Home, 12 Blog Posts | `/`, Formats, Unix, Troubleshooting | `/` | `/discord-timestamp-formats` |
| `/discord-timestamp-formats` | Header, Footer, Guide, 12 Blog Posts | `/`, Guide, Markdown | `/` | `/discord-timestamp-guide` |
| `/unix-timestamp` | Header, Footer, Guide, Webhooks, Bots | `/`, Webhooks, Bots, ISO-8601 | `/` | `/blog/unix-timestamp-vs-iso-8601-discord-bots` |
| `/discord-markdown` | Header, Footer, Guide, Formats | `/`, Formats, Guide | `/` | `/blog/discord-markdown-formatting-timestamps-guide` |
| `/discord-webhook-timestamps` | Header, Footer, Bots, Automation | `/`, Bots, Unix, Scheduled Events | `/` | `/discord-bot-timestamps` |
| `/discord-bot-timestamps` | Header, Footer, Webhooks, Dev Guide | `/`, Webhooks, Rate Limits, API | `/` | `/blog/discord-bot-dynamic-timestamp-developer-guide` |
| `/blog/discord-timestamp-not-working` | Guide, Formats, Home, Blog | `/`, Formats, Guide, Mobile | `/discord-timestamp-guide` | `/blog/diagnosing-discord-timezone-clock-skew-issues` |

---

## 3. Natural Anchor Text Policy

1. **Descriptive, Varied Anchors:** Never force identical keyword phrases across multiple links. Use contextually natural variations:
   * Good: *"Check the complete Discord timestamp formats reference table"*
   * Good: *"See how the :R relative flag behaves in Discord"*
   * Bad: *"Click here"* or *"Read more"*
2. **Contextual Upward Pathways:** Every technical troubleshooting article provides a prominent contextual link leading back to the interactive generator so users can immediately test their corrected timestamp.
