export interface GuideItem {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  readingTime: string;
  publishedDate: string;
  modifiedDate: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  sections: Array<{
    id: string;
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

export const COMPREHENSIVE_GUIDES: Record<string, GuideItem> = {
  "discord-timestamp-guide": {
    slug: "discord-timestamp-guide",
    title: "The Complete Discord Timestamp Guide: Syntax, Styles & Rules",
    navTitle: "Timestamp Guide",
    description:
      "The complete handbook for Discord dynamic timestamps. See how <t:TIMESTAMP:STYLE> tags adjust to every viewer's local clock, how to construct them in seconds, and how to avoid the classic 13-digit millisecond trap.",
    primaryKeyword: "discord timestamp guide",
    secondaryKeywords: [
      "how to use discord timestamps",
      "discord time syntax",
      "discord auto timezone time",
      "discord epoch time format",
    ],
    readingTime: "7 min read",
    publishedDate: "2026-01-15",
    modifiedDate: "2026-09-25",
    author: {
      name: "Alex Vance",
      role: "Discord Bot Architect & Systems Engineer",
    },
    summary:
      "If you've ever tried running an event across three continents, you know the pain of typing out four different timezone abbreviations. Someone always miscalculates. Discord dynamic timestamps fix that for good: you post one code, and Discord shows the right time on everyone's screen.",
    sections: [
      {
        id: "what-are-discord-timestamps",
        heading: "What Are Dynamic Discord Timestamps?",
        content:
          "Before Discord added dynamic timestamps, server mods had to type out messy messages like 'Event starts at 8:00 PM EST / 5:00 PM PST / 1:00 AM UTC'. Half the server would still show up an hour late because of daylight saving changes or simple math mistakes. Dynamic timestamps kill that problem completely. You write a short code, Discord reads the Unix timestamp inside it, and each member's phone or computer displays the exact time according to their own system clock.",
      },
      {
        id: "the-anatomy-of-syntax",
        heading: "How the Discord Timestamp Syntax Works",
        content:
          "Every Discord timestamp uses a simple bracketed formula with three parts: the opening `<t:`, a 10-digit Unix timestamp in seconds, an optional style flag after a colon `:`, and the closing `>`. For instance, `<t:1727280000:R>` tells Discord to render a live countdown. That is all there is to it.",
        codeSnippet: {
          language: "markdown",
          code: "<t:1727280000:R>\n// Breakdown:\n// <t:        Opening tag\n// 1727280000 10-digit Unix epoch in SECONDS (never milliseconds)\n// :R         Style flag (R = Relative countdown/countup)\n// >          Closing tag",
          caption: "Discord Timestamp Syntax Anatomy",
        },
      },
      {
        id: "seconds-vs-milliseconds-rule",
        heading: "Watch Out: Seconds vs Milliseconds (The 10-Digit Rule)",
        content:
          "Here is the mistake that trips up almost every developer the first time: JavaScript's `Date.now()` gives you 13 digits (milliseconds). Discord strictly expects 10 digits (seconds). If you copy-paste raw milliseconds into Discord, your timestamp either breaks into plain text or shows a date in the year 56,000. Always divide by 1000 and round down with `Math.floor()`.",
        codeSnippet: {
          language: "javascript",
          code: "// BROKEN (13 digits):\nconst badEpoch = Date.now(); // 1727280000123\nconst badTag = `<t:${badEpoch}:R>`; // Breaks in chat!\n\n// WORKING (10 digits):\nconst goodEpoch = Math.floor(Date.now() / 1000); // 1727280000\nconst goodTag = `<t:${goodEpoch}:R>`; // Renders properly on all devices",
          caption: "Converting JavaScript Date.now() to 10-digit Unix seconds",
        },
      },
      {
        id: "best-practices-for-server-admins",
        heading: "Best Practices for Server Announcements & Rules",
        content:
          "A clean trick used by experienced community admins is the dual-layer timestamp. Put an absolute calendar date first, followed by a relative countdown in parentheses: `<t:EPOCH:F> (<t:EPOCH:R>)`. That way, your community sees both the exact calendar date on their wall and a real-time countdown showing how many hours are left.",
      },
    ],
    faqs: [
      {
        question: "Can mobile Discord users see dynamic timestamps?",
        answer:
          "Yes. Discord's iOS and Android apps fully support dynamic timestamps across both dark and light modes. The app pulls the time directly from the phone's system clock.",
      },
      {
        question: "Do timestamps work inside Discord server channel topics and rules?",
        answer:
          "Yes. You can paste Discord timestamp tags directly into channel topics, announcement channels, welcome screens, and forum posts.",
      },
      {
        question: "Why does my timestamp show as raw code like <t:1727280000>?",
        answer:
          "This happens if there is an extra space inside the brackets, if you forgot the closing bracket, or if the number is in milliseconds (13 digits) rather than seconds (10 digits).",
      },
    ],
  },
  "discord-timestamp-formats": {
    slug: "discord-timestamp-formats",
    title: "Discord Timestamp Formats & Styles Cheat Sheet (t, T, d, D, f, F, R)",
    navTitle: "Format Styles",
    description:
      "Deep dive into all seven official Discord timestamp styles: Short Time, Long Time, Short Date, Long Date, Short Date/Time, Long Date/Time, and Relative Time.",
    primaryKeyword: "discord timestamp formats",
    secondaryKeywords: [
      "discord timestamp styles",
      "discord relative time tag",
      "discord time format flags",
      "discord timestamp cheat sheet",
    ],
    readingTime: "5 min read",
    publishedDate: "2026-01-20",
    modifiedDate: "2026-09-25",
    author: {
      name: "Marcus Chen",
      role: "Frontend Engineer & Developer Community Lead",
    },
    summary:
      "Discord gives you 7 single-letter flags to control how your time looks. Whether you want a compact hour, a full calendar date, or a live countdown that ticks down automatically, here is what each flag renders on screen.",
    sections: [
      {
        id: "the-seven-flags",
        heading: "The 7 Discord Timestamp Flags",
        content:
          "Discord uses single-letter flags placed after a second colon to pick how your timestamp displays. If you leave off the flag entirely (`<t:1727280000>`), Discord defaults to the `:f` (Short Date/Time) style.",
        table: {
          headers: ["Flag", "Format Name", "Discord Syntax", "Rendered Output (US Locale)", "Best Use Case"],
          rows: [
            ["R", "Relative Time", "<t:1727280000:R>", "in 2 hours / 5 minutes ago", "Countdowns, deadlines, live streams"],
            ["f", "Short Date/Time", "<t:1727280000:f>", "September 25, 2026 8:00 PM", "General events, community meetings (Default)"],
            ["F", "Long Date/Time", "<t:1727280000:F>", "Friday, September 25, 2026 8:00 PM", "Official tournaments, server rules"],
            ["t", "Short Time", "<t:1727280000:t>", "8:00 PM", "Daily recurring events (standups, raids)"],
            ["T", "Long Time", "<t:1727280000:T>", "8:00:00 PM", "Precise speedrun logs, server reboots"],
            ["d", "Short Date", "<t:1727280000:d>", "09/25/2026", "Compact lists, ban expirations"],
            ["D", "Long Date", "<t:1727280000:D>", "September 25, 2026", "Seasonal announcements, release days"],
          ],
        },
      },
      {
        id: "relative-flag-mechanics",
        heading: "How Relative Time (:R) Works Dynamically",
        content:
          "The `:R` flag is easily the most popular formatting trick in Discord. Instead of an absolute date, it renders a dynamic countdown like 'in 2 hours' or '15 minutes ago'. The best part? Discord recalculates this locally on every user's device without you having to edit the message. Once the target time passes, it seamlessly flips from 'in 5 minutes' to '5 minutes ago'. If someone hovers over the badge on desktop, Discord reveals the full calendar date in a tooltip.",
      },
      {
        id: "combining-formats",
        heading: "Pro Tip: Dual-Layer Formatting",
        content:
          "If you run announcements for game nights, podcasts, or community raids, use the dual-layer trick. Pair an absolute date with a live countdown: `<t:EPOCH:F> (<t:EPOCH:R>)`. Members reading on a phone get the quick countdown, while desktop users checking their calendar see the exact weekday and time.",
        codeSnippet: {
          language: "markdown",
          code: "**Tournament Kickoff:** <t:1727280000:F> (<t:1727280000:R>)\n**Server Maintenance:** <t:1727280000:t> (Downtime: about 30 minutes).",
          caption: "Recommended announcement layout combining :F and :R styles",
        },
      },
    ],
    faqs: [
      {
        question: "Does the relative time flag update in real time without refreshing?",
        answer:
          "Yes. Discord's client runs an internal timer that recalculates the relative string as time passes, no page reload or message edit required.",
      },
      {
        question: "What happens if I type an invalid flag like :X?",
        answer:
          "If Discord does not recognize your flag character, it falls back to the default `:f` (Short Date/Time) style.",
      },
    ],
  },
  "unix-timestamp": {
    slug: "unix-timestamp",
    title: "Unix Timestamp to Discord: Epoch Conversion & Developer Guide",
    navTitle: "Unix Timestamp",
    description:
      "See how Unix Epoch time works in Discord. Learn how seconds elapsed since January 1, 1970 UTC keep global communities in sync without messy timezone conversion errors.",
    primaryKeyword: "unix timestamp discord",
    secondaryKeywords: [
      "epoch time discord",
      "convert date to unix epoch",
      "discord timestamp epoch seconds",
      "posix time discord",
    ],
    readingTime: "6 min read",
    publishedDate: "2026-02-01",
    modifiedDate: "2026-09-25",
    author: {
      name: "Elena Rostova",
      role: "Backend Architect & Distributed Systems Engineer",
    },
    summary:
      "Why does Discord use a 10-digit number like 1727280000 instead of normal text? Because Unix epoch seconds provide a single, universal point in time that every phone and computer can translate to local clocks without timezone bugs.",
    sections: [
      {
        id: "what-is-unix-epoch",
        heading: "What Is Unix Epoch Time?",
        content:
          "Unix time counts the number of seconds that have passed since midnight UTC on January 1, 1970 (excluding leap seconds). It is an absolute number. Because it references UTC directly, it never cares about daylight saving shifts, timezone borders, or leap years. A specific second in Tokyo is the exact same Unix number in New York.",
      },
      {
        id: "why-discord-uses-unix",
        heading: "Why Discord Uses Unix Epoch Integers",
        content:
          "If you send 'Stream starts at 7 PM', that means four different things to four different people in your server. But if you post `<t:1727280000:t>`, you send an absolute moment. The Discord client on each member's device checks their local operating system settings and displays that moment matching their clock.",
      },
      {
        id: "converting-across-languages",
        heading: "How to Generate Unix Timestamps in Code",
        content:
          "Here is how to calculate a valid 10-digit Discord Unix timestamp across common languages:",
        codeSnippet: {
          language: "javascript",
          code: "// JavaScript / TypeScript (Node.js & Browser)\nconst discordEpoch = Math.floor(new Date('2026-09-25T20:00:00Z').getTime() / 1000);\n\n# Python 3\nimport datetime\ndiscord_epoch = int(datetime.datetime(2026, 9, 25, 20, 0, tzinfo=datetime.timezone.utc).timestamp())\n\n// Go\npackage main\nimport \"time\"\nfunc getEpoch() int64 {\n    return time.Date(2026, 9, 25, 20, 0, 0, 0, time.UTC).Unix()\n}\n\n// PHP\n$discord_epoch = strtotime('2026-09-25 20:00:00 UTC');",
          caption: "Converting dates to Unix epoch across languages",
        },
      },
      {
        id: "the-year-2038-problem",
        heading: "Will Discord Timestamps Break in Year 2038?",
        content:
          "On January 19, 2038, signed 32-bit Unix integers will hit their limit (2,147,483,647) and roll over into negative numbers on older systems. Discord is completely safe from this bug. Discord's client runs on modern 64-bit numbers in JavaScript, supporting integer timestamps safely up to the year 285,426.",
        codeSnippet: {
          language: "javascript",
          code: "// Boundary Verification in Node.js / JavaScript:\nconst max32Bit = 2147483647;\nconsole.log(new Date(max32Bit * 1000).toISOString()); // 2038-01-19T03:14:07.000Z\n\nconst post2038 = 2147483648;\nconsole.log(new Date(post2038 * 1000).toISOString()); // 2038-01-19T03:14:08.000Z (safe in Discord!)",
          caption: "Year 2038 boundary check demonstrating 64-bit safety",
        },
      },
    ],
    faqs: [
      {
        question: "Can I use negative Unix timestamps in Discord for dates before 1970?",
        answer:
          "Discord officially supports timestamps between 0 (January 1, 1970) and positive 64-bit integers. Negative timestamps for historical dates prior to 1970 are not reliably parsed by Discord clients.",
      },
      {
        question: "Does daylight saving time (DST) affect the Unix timestamp number?",
        answer:
          "No. The Unix timestamp number represents an absolute UTC moment. When a region shifts into DST, the integer stays identical, and each viewer's device adjusts its display offset automatically.",
      },
    ],
  },
  "discord-markdown": {
    slug: "discord-markdown",
    title: "Discord Markdown Guide: Text Formatting, Code Blocks & Timestamps",
    navTitle: "Markdown Guide",
    description:
      "Master Discord Markdown formatting: bold headings, colorful code blocks, spoiler redactions, blockquotes, and dynamic timestamp tags that look great on desktop and mobile.",
    primaryKeyword: "discord markdown guide",
    secondaryKeywords: [
      "discord text formatting",
      "discord markdown cheatsheet",
      "discord spoiler text",
      "discord code block syntax highlighting",
    ],
    readingTime: "6 min read",
    publishedDate: "2026-02-10",
    modifiedDate: "2026-09-25",
    author: {
      name: "Alex Vance",
      role: "Discord Bot Architect & Systems Engineer",
    },
    summary:
      "Discord chat supports a modified flavor of Markdown. You can format words, highlight code, hide spoilers, and combine bold text with live dynamic timestamps to build clean, organized server announcements.",
    sections: [
      {
        id: "markdown-basics",
        heading: "Core Discord Text Formatting Syntax",
        content:
          "Discord uses a modified subset of Markdown to style chat messages. You can wrap these around normal text or pair them directly with timestamp tags.",
        table: {
          headers: ["Style", "Markdown Syntax", "Example Code", "Resulting Appearance"],
          rows: [
            ["Bold", "**text**", "**Community Raid**", "Strong emphasized text"],
            ["Italics", "*text* or _text_", "*Arrive 10m early*", "Slanted text"],
            ["Underline", "__text__", "__Mandatory__", "Underlined text"],
            ["Strikethrough", "~~text~~", "~~Old Time 7 PM~~", "Line drawn through text"],
            ["Spoiler", "||text||", "||Secret Boss||", "Black clickable blur box"],
            ["Inline Code", "`code`", "`<t:1727280000:R>`", "Monospace grey pill box"],
            ["Single Blockquote", "> text", "> Note from Admin", "Indented line with grey bar"],
            ["Header 1", "# Heading", "# Event Announcement", "Large bold title text"],
            ["Header 2", "## Heading", "## Squad Rules", "Medium bold section header"],
            ["Header 3", "### Heading", "### Schedule", "Small bold subsection header"],
          ],
        },
      },
      {
        id: "embedding-timestamps-in-markdown",
        heading: "Embedding Timestamps Inside Markdown Elements",
        content:
          "You can wrap Discord timestamps in bold, italics, quotes, or headers. But there is one big trap: do NOT put timestamps inside backticks (inline code ` `) or multi-line code blocks (` ``` `). Backticks tell Discord to treat everything as literal text, which turns off timestamp parsing completely.",
        codeSnippet: {
          language: "markdown",
          code: "// THIS RENDERS DYNAMICALLY:\n# Raid Night: **<t:1727280000:F>**\n> Starting: **<t:1727280000:R>**\n> Please join Voice Channel 1.\n\n// THIS WILL DISPLAY RAW TEXT (DON'T DO THIS):\n`The event starts at <t:1727280000:R>`",
          caption: "Correct vs Incorrect ways to combine Markdown with Timestamps",
        },
      },
      {
        id: "code-blocks-and-highlighting",
        heading: "Multi-Line Code Blocks with Syntax Highlighting",
        content:
          "To format code or server log snippets, wrap the block with triple backticks (```) followed by the language identifier (such as json, js, py, yaml, diff, or ansi).",
      },
    ],
    faqs: [
      {
        question: "Can I color text in Discord messages?",
        answer:
          "Discord does not have native color tags like HTML, but you can get colored text using ANSI escape code blocks (```ansi) with standard terminal color sequences.",
      },
      {
        question: "Can I combine bold, italic, and underline together?",
        answer:
          "Yes. Just nest the tags: `__***bold italic underline***__` renders with all three styles active at once.",
      },
    ],
  },
  "discord-webhook-timestamps": {
    slug: "discord-webhook-timestamps",
    title: "Discord Webhook Timestamps: Embeds, ISO-8601 & Dynamic Formatting",
    navTitle: "Webhook Timestamps",
    description:
      "A developer guide for sending timestamps through Discord webhooks. Master embed descriptions, dynamic fields, and ISO-8601 footer timestamps.",
    primaryKeyword: "discord webhook timestamp",
    secondaryKeywords: [
      "discord embed timestamp format",
      "discord webhook dynamic date",
      "discord webhook json payload",
      "discord webhook iso 8601",
    ],
    readingTime: "7 min read",
    publishedDate: "2026-02-15",
    modifiedDate: "2026-09-25",
    author: {
      name: "Elena Rostova",
      role: "Backend Architect & Distributed Systems Engineer",
    },
    summary:
      "Sending dates through Discord webhooks trips up a lot of developers because Discord has two different timestamp systems: dynamic Unix tags in text and ISO-8601 strings in embed footers. Here is how both work.",
    sections: [
      {
        id: "two-types-of-webhook-timestamps",
        heading: "The Two Types of Webhook Timestamps: Dynamic vs Footer",
        content:
          "When sending embeds to Discord, keep this rule in mind: dynamic tags (`<t:EPOCH:STYLE>`) go inside descriptions and field values. Embed footers, on the other hand, strictly require an ISO-8601 string (like `2026-09-25T20:00:00.000Z`). If you accidentally put a `<t:...>` tag inside the embed footer timestamp field, the Discord API throws an immediate HTTP 400 Bad Request.",
      },
      {
        id: "webhook-json-payload",
        heading: "Complete Webhook JSON Payload Example",
        content:
          "Here is a production-ready JSON payload showing both dynamic timestamp syntax inside fields and the top-level ISO timestamp in the footer:",
        codeSnippet: {
          language: "json",
          code: "{\n  \"username\": \"Server Alert Bot\",\n  \"avatar_url\": \"https://i.imgur.com/4M34hi2.png\",\n  \"content\": \"Scheduled Maintenance Alert for all regional nodes!\",\n  \"embeds\": [\n    {\n      \"title\": \"Database Cluster Maintenance\",\n      \"color\": 5793266,\n      \"description\": \"Upgrades will begin **<t:1727280000:R>**.\",\n      \"fields\": [\n        {\n          \"name\": \"Start Time\",\n          \"value\": \"<t:1727280000:F>\",\n          \"inline\": true\n        },\n        {\n          \"name\": \"Expected Duration\",\n          \"value\": \"45 Minutes\",\n          \"inline\": true\n        }\n      ],\n      \"timestamp\": \"2026-09-25T20:00:00.000Z\",\n      \"footer\": {\n        \"text\": \"Systems Status Hub\"\n      }\n    }\n  ]\n}",
          caption: "Valid Discord webhook payload demonstrating both timestamp methods",
        },
      },
      {
        id: "sending-with-curl-or-fetch",
        heading: "Sending Webhooks in Node.js (fetch)",
        content:
          "Here is how to automate this in modern JavaScript or TypeScript without installing heavy external packages:",
        codeSnippet: {
          language: "javascript",
          code: "const webhookUrl = process.env.DISCORD_WEBHOOK_URL;\nconst eventDate = new Date('2026-09-25T20:00:00Z');\nconst epochSeconds = Math.floor(eventDate.getTime() / 1000);\n\nawait fetch(webhookUrl, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    embeds: [{\n      title: 'Incident Resolved',\n      description: `All services restored as of <t:${epochSeconds}:R> (<t:${epochSeconds}:t>).`,\n      color: 0x57F287,\n      timestamp: eventDate.toISOString()\n    }]\n  })\n});",
          caption: "Lightweight native fetch implementation for Discord webhooks",
        },
      },
      {
        id: "curl-and-github-actions-automation",
        heading: "Automating Announcements with cURL and GitHub Actions",
        content:
          "For automated CI/CD alerts or scheduled event notices, you can calculate the Unix epoch in Bash and send the webhook using cURL in GitHub Actions:",
        codeSnippet: {
          language: "yaml",
          code: "name: Discord Event Alert\non:\n  schedule:\n    - cron: '0 12 * * 1' # Every Monday at 12:00 UTC\njobs:\n  notify:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Send Scheduled Discord Webhook\n        env:\n          WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}\n        run: |\n          # Calculate epoch for event in 2 hours\n          TARGET_EPOCH=$(($(date +%s) + 7200))\n          \n          curl -H \"Content-Type: application/json\" \\\n            -X POST \\\n            -d '{\"content\": \"Weekly Community Standby starts <t:'\"$TARGET_EPOCH\"':R> (<t:'\"$TARGET_EPOCH\"':F>)!\"}' \\\n            \"$WEBHOOK_URL\"",
          caption: "Production-ready GitHub Actions cron job using cURL and Unix seconds",
        },
      },
    ],
    faqs: [
      {
        question: "Can I put dynamic timestamps inside embed titles?",
        answer:
          "No. Discord does not parse `<t:EPOCH:STYLE>` tags inside embed `title` or `author.name` properties. They will display as raw code. Only use them inside embed `description`, `fields.value`, and regular message `content`.",
      },
      {
        question: "What happens if the footer timestamp format is invalid?",
        answer:
          "The Discord API will reject the entire webhook with HTTP 400 Bad Request if the `timestamp` field is not formatted as valid ISO-8601.",
      },
    ],
  },
  "discord-bot-timestamps": {
    slug: "discord-bot-timestamps",
    title: "Discord Bot Timestamps in JavaScript (discord.js) & Python (discord.py)",
    navTitle: "Bot Timestamps",
    description:
      "A developer tutorial for implementing dynamic Discord timestamps in bots. Features discord.js v14 time() builders, TimestampStyles enums, and discord.py formatting utils.",
    primaryKeyword: "discord bot timestamp",
    secondaryKeywords: [
      "discord.js timestamp utility",
      "timestampstyles discord js",
      "discord py format timestamp",
      "discord bot dynamic time builder",
    ],
    readingTime: "8 min read",
    publishedDate: "2026-02-25",
    modifiedDate: "2026-09-25",
    author: {
      name: "Alex Vance",
      role: "Discord Bot Architect & Systems Engineer",
    },
    summary:
      "Writing bots in discord.js or discord.py? Stop manually string-concatenating `<t:${time}:R>`. Both SDKs ship with native, type-safe helpers that format dates cleanly and protect against timezone bugs.",
    sections: [
      {
        id: "discord-js-implementation",
        heading: "Implementing Timestamps in discord.js (v14+)",
        content:
          "In modern discord.js v14, you do not need to stitch strings together. Discord.js provides the `time()` helper and the `TimestampStyles` enum directly. They give you full TypeScript autocomplete and ensure you never pass an invalid flag.",
        codeSnippet: {
          language: "typescript",
          code: "import { EmbedBuilder, time, TimestampStyles } from 'discord.js';\n\nconst targetDate = new Date('2026-09-25T20:00:00Z');\n\n// Create formatted timestamp strings\nconst relativeTime = time(targetDate, TimestampStyles.RelativeTime); // <t:1727280000:R>\nconst longDateTime = time(targetDate, TimestampStyles.LongDateTime); // <t:1727280000:F>\n\nconst embed = new EmbedBuilder()\n  .setTitle('Community Game Night')\n  .setDescription(`Join us ${relativeTime} on ${longDateTime} for our server tournament!`)\n  .setColor(0x5865F2);",
          caption: "Clean, type-safe discord.js v14 implementation",
        },
      },
      {
        id: "discord-py-implementation",
        heading: "Implementing Timestamps in discord.py (v2+)",
        content:
          "In Python's `discord.py` library, you can use the built-in `discord.utils.format_dt()` function, which takes standard Python `datetime` objects and style flags.",
        codeSnippet: {
          language: "python",
          code: "import discord\nfrom discord.ext import commands\nfrom datetime import datetime, timezone\n\nbot = commands.Bot(command_prefix='!', intents=discord.Intents.default())\n\n@bot.command()\nasync def countdown(ctx):\n    # Create a timezone-aware UTC datetime\n    event_time = datetime(2026, 9, 25, 20, 0, 0, tzinfo=timezone.utc)\n    \n    # Format with discord.utils.format_dt\n    relative_str = discord.utils.format_dt(event_time, style='R')\n    full_str = discord.utils.format_dt(event_time, style='F')\n    \n    await ctx.send(f'The event will take place {relative_str} ({full_str})!')",
          caption: "Python discord.py format_dt helper implementation",
        },
      },
      {
        id: "bot-timezone-conversion-pitfalls",
        heading: "Common Pitfall: Server Time vs User Time",
        content:
          "Here is a classic bug in reminder bots: a user in California types `/remindme 8pm`. Your bot host is in Frankfurt (UTC+1). If your code simply parses '8pm' using local system time, your reminder fires 9 hours early or late. Always capture the user's timezone offset or store everything in UTC.",
      },
    ],
    faqs: [
      {
        question: "Can bot slash command option choices display timestamps?",
        answer:
          "No. Autocomplete and command choices cannot dynamically render timestamps. The tag will display as raw text inside the command menu.",
      },
      {
        question: "What is the difference between TimestampStyles.RelativeTime and 'R' in discord.js?",
        answer:
          "They are functionally identical. `TimestampStyles.RelativeTime` simply resolves to the string character `'R'`, giving you autocomplete and typo protection.",
      },
    ],
  },
};

export interface BlogSection {
  id: string;
  heading: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  subsections?: Array<{
    heading: string;
    content: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption?: string;
    };
  }>;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  searchVariations?: string[];
  category: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: string;
  keyTakeaways?: string[];
  sections?: BlogSection[];
  faqs?: Array<{ question: string; answer: string }>;
}

import { BLOG_POSTS } from "./blog";
export { BLOG_POSTS };
