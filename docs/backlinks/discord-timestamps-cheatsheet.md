# Discord Dynamic Timestamps & Snowflake Math Cheatsheet

A quick reference guide for Discord developers, community managers, and bot creators.

Online interactive tools:
- Generator & Preview: [https://www.disctimestamps.site](https://www.disctimestamps.site)
- Snowflake ID Decoder: [https://www.disctimestamps.site/discord-snowflake-to-timestamp](https://www.disctimestamps.site/discord-snowflake-to-timestamp)
- ANSI Colored Text Builder: [https://www.disctimestamps.site/discord-colored-text](https://www.disctimestamps.site/discord-colored-text)

---

## 1. Discord Timestamp Syntax

Discord uses the token format `<t:TIMESTAMP:STYLE>`:
- `TIMESTAMP`: 10-digit Unix epoch integer in seconds (POSIX time).
- `STYLE`: Single-letter display flag (optional, defaults to `f`).

```markdown
<t:1790409000:R>  -> Relative countdown (e.g., "in 2 hours")
<t:1790409000:f>  -> Short date and time (e.g., "September 25, 2026 8:00 PM")
<t:1790409000:F>  -> Long date and time with weekday (e.g., "Friday, September 25, 2026 8:00 PM")
<t:1790409000:t>  -> Short time only (e.g., "8:00 PM")
<t:1790409000:T>  -> Long time with seconds (e.g., "8:00:00 PM")
<t:1790409000:d>  -> Short date (e.g., "09/25/2026")
<t:1790409000:D>  -> Long date (e.g., "September 25, 2026")
```

---

## 2. Generating Timestamps in Code

### JavaScript / TypeScript (Node.js & Browser)
```typescript
// Current time in seconds
const nowEpoch = Math.floor(Date.now() / 1000);
console.log(`<t:${nowEpoch}:R>`);

// Specific date
const targetDate = new Date("2026-09-25T20:00:00Z");
const targetEpoch = Math.floor(targetDate.getTime() / 1000);
console.log(`<t:${targetEpoch}:F>`);
```

### Python (discord.py)
```python
import datetime
import discord

# Using standard datetime (timezone-aware UTC)
event_time = datetime.datetime(2026, 9, 25, 20, 0, tzinfo=datetime.timezone.utc)
epoch_seconds = int(event_time.timestamp())
formatted_tag = f"<t:{epoch_seconds}:R>"

# Or using discord.utils helper
relative_str = discord.utils.format_dt(event_time, style="R")
```

---

## 3. Discord Snowflake ID to Timestamp Formula

Discord Snowflake IDs are 64-bit integers where the first 42 bits represent milliseconds since the Discord Epoch (January 1, 2015 00:00:00 UTC).

- Discord Epoch: `1420070400000` (ms)

### JavaScript / TypeScript Formula
```typescript
function snowflakeToDate(snowflake: string): Date {
  const DISCORD_EPOCH = BigInt("1420070400000");
  const id = BigInt(snowflake);
  const timestampMs = Number((id >> BigInt(22)) + DISCORD_EPOCH);
  return new Date(timestampMs);
}

// Example: Discord User ID
const creationDate = snowflakeToDate("102938475610293847");
console.log(creationDate.toISOString());
```

---

## 4. Discord ANSI Colored Code Blocks

Discord supports ANSI color formatting inside triple backtick code blocks using `ansi`:

```
[0;31mRed text[0m
[0;32mGreen text[0m
[0;34mBlue text[0m
[0;33mYellow text[0m
[1;37mBold white text[0m
```

Generate custom colors visually with [https://www.disctimestamps.site/discord-colored-text](https://www.disctimestamps.site/discord-colored-text).

---

## Open Source Utility

Website: [https://www.disctimestamps.site](https://www.disctimestamps.site)
Repository: [https://github.com/rayyan1122pk-star/discord-timestamp-generator](https://github.com/rayyan1122pk-star/discord-timestamp-generator)
