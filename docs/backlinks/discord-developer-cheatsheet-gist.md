# Discord Developer Toolkit Cheatsheet (2026)

A quick-reference guide for Discord bot developers, server managers, and community builders. Covers dynamic timestamp syntax, webhook embed JSON structures, ANSI colored text codes, and Snowflake ID decoding.

Interactive web tools with live Discord chat preview:
- [Discord Timestamp Generator](https://www.disctimestamps.site/)
- [Discord Embed Generator & Webhook Visualizer](https://www.disctimestamps.site/discord-embed-generator)
- [Discord Glitch & Zalgo Text Maker](https://www.disctimestamps.site/discord-glitch-text)
- [Discord Snowflake to Timestamp Decoder](https://www.disctimestamps.site/discord-snowflake-to-timestamp)
- [Discord ANSI Colored Text Formatter](https://www.disctimestamps.site/discord-colored-text)

---

## 1. Dynamic Timestamp Formatting

Discord dynamic timestamps automatically adapt to each user's local device timezone and clock format (12-hour vs 24-hour).

### Syntax: `<t:TIMESTAMP:STYLE>`
`TIMESTAMP` is a 10-digit Unix Epoch integer (seconds since January 1, 1970 UTC).

| Flag | Name | Output Example | Typical Use Case |
| :---: | :--- | :--- | :--- |
| `t` | Short Time | 9:41 AM | Fast reminders, daily standups |
| `T` | Long Time | 9:41:30 AM | Precise countdown launches, raid starts |
| `d` | Short Date | 09/28/2026 | Event flyers, tournament schedules |
| `D` | Long Date | September 28, 2026 | Formal announcements, milestone celebrations |
| `f` | Short Date / Time | September 28, 2026 9:41 AM | Calendar invites, meeting agendas |
| `F` | Long Date / Time | Monday, September 28, 2026 9:41 AM | Official rulebook posts, server bans |
| `R` | Relative Time | in 2 hours / 5 minutes ago | Active countdowns, maintenance timers |

> **Pro Tip:** In JavaScript, `Date.now()` returns milliseconds (13 digits). You must divide by 1000 and use `Math.floor()` to prevent the 1000x bug.

```javascript
// JavaScript / Node.js
const epoch = Math.floor(Date.now() / 1000);
const timestampTag = `<t:${epoch}:R>`;
console.log(timestampTag);
```

```python
# Python
import time
epoch = int(time.time())
timestamp_tag = f"<t:{epoch}:R>"
print(timestamp_tag)
```

---

## 2. Discord Webhook Embeds & Decimal Colors

Discord REST API requires embed colors as 24-bit decimal integers (0 to 16777215) rather than hex strings like `#5865F2`.

### Hex to Decimal Color Formula:
Convert the 6-character hex string to base-16 integer:
`#5865F2` -> `5865F2` in base 16 = `5793266`

### Popular Discord Embed Color Codes:
- Discord Blurple: `#5865F2` -> `5793266`
- Success Green: `#57F287` -> `5763719`
- Warning Yellow: `#FEE75C` -> `16705372`
- Critical Red: `#ED4245` -> `15548997`
- Aqua Blue: `#00B0F4` -> `45300`

### Minimal Webhook cURL Example:
```bash
curl -H "Content-Type: application/json" \
  -X POST \
  -d '{
    "username": "Server Bot",
    "embeds": [
      {
        "title": "Community Update",
        "description": "Next community tournament starts <t:1790550000:R>!",
        "color": 5793266,
        "fields": [
          { "name": "Format", "value": "Double Elimination", "inline": true },
          { "name": "Channel", "value": "#tournament-lobby", "inline": true }
        ],
        "footer": { "text": "Official Esports Desk" }
      }
    ]
  }' \
  YOUR_DISCORD_WEBHOOK_URL
```

Generate full embed templates visually at [DiscTimestamps Embed Generator](https://www.disctimestamps.site/discord-embed-generator).

---

## 3. Discord Snowflake ID Math

Every Discord User ID, Channel ID, Server ID, and Message ID is a 64-bit Snowflake containing an embedded timestamp.

- Discord Epoch: January 1, 2015 00:00:00 UTC (`1420070400000` milliseconds)
- Bitshift: Shift the snowflake right by 22 bits, then add the Discord Epoch.

```javascript
// Decode Snowflake to Date
function getSnowflakeDate(snowflakeId) {
  const DISCORD_EPOCH = 1420070400000n;
  const id = BigInt(snowflakeId);
  const milliseconds = (id >> 22n) + DISCORD_EPOCH;
  return new Date(Number(milliseconds));
}

console.log(getSnowflakeDate("175728562319360000").toISOString());
```

---

## 4. Discord ANSI Colored Text

Discord desktop and web clients render ANSI escape sequences inside ` ```ansi ` codeblocks.

```text
\u001b[{format};{color}m
```

### Color Codes:
- Gray: `30`
- Red: `31`
- Green: `32`
- Yellow: `33`
- Blue: `34`
- Pink: `35`
- Cyan: `36`
- White: `37`

Visual formatter available at [DiscTimestamps Colored Text](https://www.disctimestamps.site/discord-colored-text).

---

## 5. Embeddable Badges for Open-Source Bot Repositories

Add a dynamic timestamp or embed helper badge to your GitHub README:

```markdown
[![Discord Timestamps](https://img.shields.io/badge/Discord-Timestamps-5865F2?style=flat&logo=discord&logoColor=white)](https://www.disctimestamps.site)
```

```markdown
[![Discord Embed Builder](https://img.shields.io/badge/Discord-Embed_Builder-57F287?style=flat&logo=discord&logoColor=white)](https://www.disctimestamps.site/discord-embed-generator)
```

---

*Curated by [Rayyan](https://github.com/rayyan1122pk-star) | [DiscTimestamps Website](https://www.disctimestamps.site)*
