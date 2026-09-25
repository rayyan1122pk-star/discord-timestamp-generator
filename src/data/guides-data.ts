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
      "A comprehensive guide to Discord's dynamic timestamps. Learn how <t:TIMESTAMP:STYLE> syntax automatically adjusts to local timezones, how to construct them, and best practices for server admins.",
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
      "Discord dynamic timestamps allow server owners, moderators, and bot builders to post a single time code that automatically displays in each viewer's local clock and timezone. This eliminates timezone confusion for international communities.",
    sections: [
      {
        id: "what-are-discord-timestamps",
        heading: "What Are Dynamic Discord Timestamps?",
        content:
          "Prior to Discord introducing timestamp formatting, community managers had to post cumbersome multi-timezone announcements like 'Event starts at 8:00 PM EST / 5:00 PM PST / 1:00 AM UTC'. This led to missed events and manual conversion errors. Dynamic timestamps solve this completely. When you write a timestamp code into a message, Discord's client reads the Unix epoch value and renders the time using the local device clock and language preferences of whoever is looking at the screen.",
      },
      {
        id: "the-anatomy-of-syntax",
        heading: "The Anatomy of Discord Timestamp Syntax",
        content:
          "Every Discord timestamp follows an exact bracketed formula composed of three parts: the opening tag `<t:`, the 10-digit Unix Epoch timestamp in seconds, an optional style flag preceded by a colon `:`, and the closing bracket `>`. For example, `<t:1727280000:R>` tells Discord to render the date as a relative countdown.",
        codeSnippet: {
          language: "markdown",
          code: "<t:1727280000:R>\n// Breakdown:\n// <t:  -> Opening Discord timestamp tag\n// 1727280000 -> Unix epoch timestamp in SECONDS (not milliseconds)\n// :R   -> Style flag (R = Relative Time)\n// >    -> Closing tag",
          caption: "Discord Timestamp Syntax Anatomy",
        },
      },
      {
        id: "seconds-vs-milliseconds-rule",
        heading: "The Critical Rule: Seconds vs. Milliseconds",
        content:
          "The most common mistake when manually coding Discord timestamps is using JavaScript milliseconds. Standard JavaScript expressions like Date.now() return 13 digits (milliseconds since January 1, 1970). Discord strictly requires a 10-digit timestamp in seconds. If you pass a 13-digit millisecond value, Discord will either render it as plain text or interpret it thousands of years into the future.",
        codeSnippet: {
          language: "javascript",
          code: "// INCORRECT (13 digits):\nconst badEpoch = Date.now(); // 1727280000123\nconst badTag = `<t:${badEpoch}:R>`; // Will break in Discord!\n\n// CORRECT (10 digits):\nconst goodEpoch = Math.floor(Date.now() / 1000); // 1727280000\nconst goodTag = `<t:${goodEpoch}:R>`; // Works perfectly!",
          caption: "Converting JavaScript Date.now() to 10-digit Unix seconds",
        },
      },
      {
        id: "best-practices-for-server-admins",
        heading: "Best Practices for Server Announcements & Rules",
        content:
          "When posting raid schedules, game tournaments, or maintenance notices, pair a relative countdown with an absolute date. Combining `<t:EPOCH:F>` with `(<t:EPOCH:R>)` gives members both the exact calendar date on their wall and a real-time countdown showing how many hours remain.",
      },
    ],
    faqs: [
      {
        question: "Can mobile Discord users see dynamic timestamps?",
        answer:
          "Yes. Discord's iOS and Android apps fully support dynamic timestamps across both dark and light modes. The timestamp pulls directly from the operating system's timezone settings.",
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
      "Discord provides 7 distinct format flags to control how a timestamp renders on screen. Discover when to use relative countdowns versus absolute dates, with complete visual examples.",
    sections: [
      {
        id: "the-seven-flags",
        heading: "The 7 Discord Timestamp Flags",
        content:
          "Discord uses single-letter flags placed after a second colon to determine the visual presentation. If you omit the flag entirely (`<t:1727280000>`), Discord defaults to the `:f` (Short Date/Time) style.",
        table: {
          headers: ["Flag", "Format Name", "Discord Syntax", "Rendered Output (US Locale)", "Best Use Case"],
          rows: [
            ["R", "Relative Time", "<t:1727280000:R>", "in 2 hours / 5 minutes ago", "Countdowns, deadlines, live streams"],
            ["f", "Short Date/Time", "<t:1727280000:f>", "September 25, 2026 8:00 PM", "General events, community meetings"],
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
          "The `:R` flag is the most powerful format flag in Discord. It is recalculated continuously on the client side without needing the message to be edited. In the future it renders as 'in 2 hours', 'in 15 minutes', or 'in a few seconds'. Once the epoch is reached, it automatically flips to 'a few seconds ago' and '3 hours ago'. When hovered on desktop, a tooltip reveals the exact absolute date and time.",
      },
      {
        id: "combining-formats",
        heading: "Pro Tip: Dual-Layer Formatting",
        content:
          "Top community admins use dual-layer formatting for key announcements. By placing an absolute long date followed by a relative countdown in parentheses, your community gets maximum clarity regardless of whether they are glancing on mobile or reading rules on desktop.",
        codeSnippet: {
          language: "markdown",
          code: "**Tournament Kickoff:** <t:1727280000:F> (<t:1727280000:R>)\n**Server Maintenance:** <t:1727280000:t> — Downtime duration: 30 minutes.",
          caption: "Recommended announcement layout combining :F and :R styles",
        },
      },
    ],
    faqs: [
      {
        question: "Does the relative time flag update in real time without refreshing?",
        answer:
          "Yes. Discord's client engine runs a client-side timer that recalculates the relative text string periodically as time passes.",
      },
      {
        question: "What happens if I type an invalid flag like :X?",
        answer:
          "If Discord does not recognize the flag character, it falls back to the default `:f` (Short Date/Time) style.",
      },
    ],
  },
  "unix-timestamp": {
    slug: "unix-timestamp",
    title: "Unix Timestamp to Discord: Epoch Conversion & Developer Guide",
    navTitle: "Unix Timestamp",
    description:
      "Understand the mechanics of Unix Epoch time in Discord. Learn how seconds elapsed since January 1, 1970 UTC power worldwide synchronization without timezone drift.",
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
      "A deep dive into POSIX Unix epoch time. Learn why Discord relies on integer seconds rather than string dates, how to handle daylight saving adjustments automatically, and how to convert dates across programming languages.",
    sections: [
      {
        id: "what-is-unix-epoch",
        heading: "What Is Unix Epoch Time?",
        content:
          "Unix time (also known as Epoch time or POSIX time) is a universal system for describing a point in time. It measures the total number of seconds that have elapsed since the Unix epoch: 00:00:00 UTC on Thursday, 1 January 1970 (excluding leap seconds). Because Unix time is an absolute integer based on UTC, it is completely immune to daylight saving changes, time zone differences, and local calendar conventions.",
      },
      {
        id: "why-discord-uses-unix",
        heading: "Why Discord Uses Unix Epoch Integers",
        content:
          "If Discord messages used plain strings like 'Friday at 8 PM', every user in London, Tokyo, New York, and Sydney would interpret that time differently. By storing a single 10-digit number like `1727280000`, the Discord client on each device takes that universal point in time and asks the local operating system: 'What date and time does this represent in the user's configured timezone and language?'",
      },
      {
        id: "converting-across-languages",
        heading: "How to Generate Unix Timestamps in Code",
        content:
          "Here is how to calculate a valid 10-digit Discord Unix timestamp across common programming languages:",
        codeSnippet: {
          language: "javascript",
          code: "// JavaScript / TypeScript (Node.js & Browser)\nconst discordEpoch = Math.floor(new Date('2026-09-25T20:00:00Z').getTime() / 1000);\n\n# Python 3\nimport datetime\ndiscord_epoch = int(datetime.datetime(2026, 9, 25, 20, 0, tzinfo=datetime.timezone.utc).timestamp())\n\n// Go\npackage main\nimport \"time\"\nfunc getEpoch() int64 {\n    return time.Date(2026, 9, 25, 20, 0, 0, 0, time.UTC).Unix()\n}\n\n// PHP\n$discord_epoch = strtotime('2026-09-25 20:00:00 UTC');",
          caption: "Converting dates to Unix epoch across languages",
        },
      },
      {
        id: "the-year-2038-problem",
        heading: "Will Discord Timestamps Suffer the Year 2038 Problem?",
        content:
          "On 19 January 2038, systems using signed 32-bit integers to store Unix epoch time will overflow. Discord's client and modern 64-bit backend architectures parse timestamps as 64-bit integers, ensuring Discord timestamps will function safely for billions of years.",
      },
    ],
    faqs: [
      {
        question: "Can I use negative Unix timestamps in Discord for dates before 1970?",
        answer:
          "Discord officially supports timestamps between 0 (1 January 1970) and positive 64-bit integers. Negative timestamps for historical dates prior to 1970 are not reliably parsed by Discord clients.",
      },
      {
        question: "Does daylight saving time (DST) affect the Unix timestamp number?",
        answer:
          "No. The Unix timestamp number represents an absolute UTC moment. When a region shifts into DST, the integer remains identical—the viewer's local device adjusts its display offset automatically.",
      },
    ],
  },
  "discord-markdown": {
    slug: "discord-markdown",
    title: "Discord Markdown Guide: Text Formatting, Code Blocks & Timestamps",
    navTitle: "Markdown Guide",
    description:
      "The definitive guide to Discord Markdown. Master bold, italics, strikethrough, spoiler tags, headers, blockquotes, syntax highlighting, and embedding dynamic timestamps.",
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
      "A complete reference for Discord's customized Markdown flavor. Learn how to combine bold headings, colorful code blocks, spoiler redactions, and dynamic timestamp tags to create beautiful announcements.",
    sections: [
      {
        id: "markdown-basics",
        heading: "Core Discord Text Formatting Syntax",
        content:
          "Discord uses a modified subset of Markdown to style chat messages. These formatting rules can be wrapped around text and paired seamlessly with timestamp tags.",
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
          "You can place Discord timestamp codes inside bold tags, lists, blockquotes, and headers. However, do NOT put a timestamp code inside backticks (inline code) or code blocks, because backticks instruct Discord to display the raw characters literally without executing the timestamp engine.",
        codeSnippet: {
          language: "markdown",
          code: "// THIS WILL RENDER DYNAMICALLY:\n# Raid Night: **<t:1727280000:F>**\n> Starting: **<t:1727280000:R>**\n> Please join Voice Channel 1.\n\n// THIS WILL DISPLAY RAW TEXT (DO NOT DO THIS):\n`The event starts at <t:1727280000:R>`",
          caption: "Correct vs Incorrect ways to combine Markdown with Timestamps",
        },
      },
      {
        id: "code-blocks-and-highlighting",
        heading: "Multi-Line Code Blocks with Syntax Highlighting",
        content:
          "To format code or log outputs, wrap the block with triple backticks (```) followed by the language identifier (e.g., json, js, py, yaml, diff, ansi).",
      },
    ],
    faqs: [
      {
        question: "Can I color text in Discord messages?",
        answer:
          "Discord does not have native HTML font color tags, but you can achieve colored text using ANSI escape code blocks (```ansi) with foreground color sequences.",
      },
      {
        question: "Can I combine bold, italic, and underline together?",
        answer:
          "Yes. Nest the Markdown characters: `__***bold italic underline***__` renders with all three styles applied simultaneously.",
      },
    ],
  },
  "discord-webhook-timestamps": {
    slug: "discord-webhook-timestamps",
    title: "Discord Webhook Timestamps: Embeds, ISO-8601 & Dynamic Formatting",
    navTitle: "Webhook Timestamps",
    description:
      "Step-by-step guide for developers using timestamps in Discord incoming webhooks. Master embed descriptions, dynamic fields, and ISO-8601 footer timestamps.",
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
      "Learn how to programmatically send dynamic timestamps through Discord webhooks via cURL, Python, Node.js, and n8n workflows, while distinguishing between embed body timestamps and embed footer timestamps.",
    sections: [
      {
        id: "two-types-of-webhook-timestamps",
        heading: "The Two Types of Webhook Timestamps: Dynamic vs. Footer",
        content:
          "When sending webhook embeds to Discord, there are two completely different ways to present dates. Understanding the difference is vital for backend automation:\n\n1. **Dynamic Unix Tags (`<t:EPOCH:STYLE>`):** Used inside message `content`, embed `description`, and embed `fields.value`. These render dynamically in the user's timezone.\n2. **Embed Footer ISO-8601 Timestamp (`timestamp` property):** A top-level string property on the embed object that requires an ISO-8601 date string (e.g., `2026-09-25T20:00:00.000Z`). This renders in small grey text at the very bottom right of the embed card.",
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
          "Here is how to automate this in modern JavaScript or TypeScript without requiring external heavy libraries:",
        codeSnippet: {
          language: "javascript",
          code: "const webhookUrl = process.env.DISCORD_WEBHOOK_URL;\nconst eventDate = new Date('2026-09-25T20:00:00Z');\nconst epochSeconds = Math.floor(eventDate.getTime() / 1000);\n\nawait fetch(webhookUrl, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    embeds: [{\n      title: 'Incident Resolved',\n      description: `All services restored as of <t:${epochSeconds}:R> (<t:${epochSeconds}:t>).`,\n      color: 0x57F287,\n      timestamp: eventDate.toISOString()\n    }]\n  })\n});",
          caption: "Lightweight native fetch implementation for Discord webhooks",
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
      "Complete code patterns and best practices for generating clean, type-safe timestamps in Discord bots using discord.js v14 and discord.py v2. Avoid string concatenation bugs and utilize built-in SDK helpers.",
    sections: [
      {
        id: "discord-js-implementation",
        heading: "Implementing Timestamps in discord.js (v14+)",
        content:
          "In modern discord.js, you should never write manual string template literals like `<t:${time}:R>`. Discord.js exports dedicated, type-safe helpers: the `time()` function and the `TimestampStyles` enum from `@discordjs/formatters` or `discord.js` directly.",
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
          "In Python's `discord.py` library, you can use the built-in `discord.utils.format_dt()` function, which accepts standard Python `datetime` objects and style flags.",
        codeSnippet: {
          language: "python",
          code: "import discord\nfrom discord.ext import commands\nfrom datetime import datetime, timezone\n\nbot = commands.Bot(command_prefix='!', intents=discord.Intents.default())\n\n@bot.command()\nasync def countdown(ctx):\n    # Create a timezone-aware UTC datetime\n    event_time = datetime(2026, 9, 25, 20, 0, 0, tzinfo=timezone.utc)\n    \n    # Format with discord.utils.format_dt\n    relative_str = discord.utils.format_dt(event_time, style='R')\n    full_str = discord.utils.format_dt(event_time, style='F')\n    \n    await ctx.send(f'The event will take place {relative_str} ({full_str})!')",
          caption: "Python discord.py format_dt helper implementation",
        },
      },
      {
        id: "bot-timezone-conversion-pitfalls",
        heading: "Common Pitfall: Server Time vs. User Time",
        content:
          "Bot developers frequently get confused when accepting user input in slash commands (e.g. `/remindme 8pm`). If your bot runs on a server in Germany (UTC+1) and the user is in California (UTC-8), parsing '8pm' using standard local time will result in an offset error of 9 hours. Always require users to provide their timezone or accept UTC/relative offsets (e.g. `in 2 hours`).",
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
          "They are functionally identical. `TimestampStyles.RelativeTime` simply resolves to the string character `'R'`, providing TypeScript autocomplete and preventing typos.",
      },
    ],
  },
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  category: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  excerpt: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-schedule-events-across-global-discord-servers",
    title: "How to Schedule Events Across Global Discord Servers Without Timezone Confusion",
    description:
      "A complete guide for Discord community leaders on using dynamic timestamps, event creation tools, and bot announcements for global audiences.",
    primaryKeyword: "schedule events discord timezone",
    category: "Community Management",
    readingTime: "5 min read",
    publishedDate: "2026-03-01",
    author: "Marcus Chen",
    excerpt:
      "Managing an international gaming clan or creator server often leads to timezone chaos. Learn how dynamic timestamps eliminate missed meetings and timezone math.",
    content:
      "When running a server with members across North America, Europe, Asia, and Oceania, writing static times like '8 PM EST' inevitably alienates half your membership. By leveraging Discord's native `<t:EPOCH:F>` and `<t:EPOCH:R>` formats, every user sees your event in their own local time without any mental conversion. In this article, we break down optimal announcement templates, moderation tips, and pairing timestamps with Discord's scheduled events feature.",
  },
  {
    slug: "discord-timestamp-not-working-troubleshooting-guide",
    title: "Why Is My Discord Timestamp Not Working? (Troubleshooting & Fixes)",
    description:
      "Troubleshooting guide for raw <t:epoch:style> text errors, 13-digit millisecond bugs, formatting syntax mistakes, and mobile display issues.",
    primaryKeyword: "discord timestamp not working",
    category: "Troubleshooting",
    readingTime: "4 min read",
    publishedDate: "2026-03-15",
    author: "Alex Vance",
    excerpt:
      "Is your Discord timestamp showing as raw code like `<t:1727280000>` instead of a readable date? Here are the 5 exact reasons and how to fix them.",
    content:
      "Seeing raw code instead of a formatted timestamp is almost always caused by one of five simple mistakes: 1) Passing a 13-digit millisecond value instead of 10-digit seconds; 2) Accidentally wrapping the code in backticks (inline code); 3) Leaving whitespace inside the `<t:...>` brackets; 4) Placing the timestamp in an unsupported field like an embed title; or 5) Misspelling the style flag. Learn how to diagnose and fix each issue in seconds.",
  },
  {
    slug: "building-an-automated-discord-notification-system-with-n8n",
    title: "Building an Automated Discord Notification Workflow with n8n and Dynamic Timestamps",
    description:
      "How to set up an n8n webhook automation that calculates UTC epoch timestamps and pushes formatted event alerts to Discord channels.",
    primaryKeyword: "n8n discord webhook timestamp",
    category: "Automation & APIs",
    readingTime: "6 min read",
    publishedDate: "2026-04-01",
    author: "Elena Rostova",
    excerpt:
      "Connect calendar APIs, Google Sheets, or GitHub releases to Discord with n8n while calculating dynamic local timestamps automatically.",
    content:
      "In modern operations, notifying Discord communities when a GitHub release ships, a webinar starts, or maintenance is scheduled can be fully automated using n8n workflows. This tutorial guides you through creating an n8n workflow that consumes webhook triggers, computes `Math.floor(Date.parse($json.eventTime) / 1000)`, and constructs Discord embed payloads featuring relative countdowns and ISO-8601 footer timestamps.",
  },
];
