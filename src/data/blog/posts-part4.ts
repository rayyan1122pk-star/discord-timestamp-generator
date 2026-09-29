import { BlogPost } from "../guides-data";

export const POSTS_PART_4: BlogPost[] = [
  {
    slug: "how-to-get-invisible-name-discord-guide",
    title: "How to Get an Invisible Name on Discord: Desktop, Mobile & Server Nicknames",
    description: "Learn how to set a blank invisible display name or server nickname on Discord using Unicode Hangul Filler (U+3164) without getting blocked by character validation filters.",
    primaryKeyword: "how to get an invisible name on discord",
    searchVariations: [
      "discord invisible name",
      "discord blank name",
      "discord empty character copy paste",
      "discord invisible nickname mobile",
      "discord blank display name",
      "hangul filler discord"
    ],
    category: "Profiles & Moderation",
    readingTime: "12 min read",
    publishedDate: "2026-09-29",
    author: "Rayyan",
    excerpt: "Discord rejects spacebar spaces for names, but accepts the special Unicode Hangul Filler (U+3164). Here is how to copy and apply an invisible name on desktop and mobile apps safely.",
    content: "When customizing your Discord profile, you might want a clean, minimalist appearance with no visible text in your display name, voice channel avatar badge, or server member list. If you simply press the spacebar on your keyboard and click save, Discord throws an error stating that your name cannot be blank.\n\nThis restriction happens because Discord trims standard ASCII spaces from the start and end of strings. However, by using a specialized Unicode character known as the Hangul Filler (U+3164), you can bypass the blank name filter. Because the Unicode standard classifies this codepoint as a letter rather than whitespace, Discord saves it as a valid entry while rendering completely blank on screen across Windows, macOS, Linux, iOS, Android, and web clients.",
    keyTakeaways: [
      "Discord blocks standard spacebar spaces (U+0020), but accepts Unicode Hangul Filler (U+3164) because it is classified as a typographic letter.",
      "Global handles (@username) still require alphanumeric characters, but Display Names and Server Nicknames can be completely invisible.",
      "Zero-width spaces (U+200B) work for sending blank chat messages, but Hangul Filler is required for profile display names.",
      "Setting an invisible nickname is 100% compliant with Discord Terms of Service, though individual server moderators may ask you to use a readable name.",
      "Our free Discord Invisible Name Generator provides 1-click copy for the exact tested character with zero tracking."
    ],
    sections: [
      {
        id: "why-discord-blocks-regular-spaces",
        heading: "Why Discord Rejects Spacebar Spaces in Names",
        content: "When you submit a new display name or server nickname, Discord runs an input sanitization script that applies a string trim function. This function automatically removes leading, trailing, and standalone ASCII spaces (character code 32). If the trimmed result has a length of zero, the API rejects the request with an HTTP 400 Bad Request error payload: 'Must be between 1 and 32 characters in length.'\n\nTo bypass this check, you must use a Unicode character that possesses visual transparency while retaining non-whitespace classification in the Unicode character database.",
        codeSnippet: {
          language: "json",
          code: "{\n  \"code\": 50035,\n  \"errors\": {\n    \"nick\": {\n      \"_errors\": [\n        {\n          \"code\": \"BASE_TYPE_BAD_LENGTH\",\n          \"message\": \"Must be between 1 and 32 in length.\"\n        }\n      ]\n    }\n  },\n  \"message\": \"Invalid Form Body\"\n}",
          caption: "Discord API validation error when attempting to use standard spaces"
        },
        subsections: [
          {
            heading: "The Hangul Filler Character (U+3164)",
            content: "The Hangul Filler (codepoint U+3164, UTF-8 byte sequence E3 85 A4) originates from Korean script encoding. In typographic typesetting, it was designed to hold the position of a letter without rendering ink on paper. Because modern software platforms treat it as an alphabetic glyph, Discord counts it as a valid 1-character name that passes all server-side validation rules."
          },
          {
            heading: "Zero-Width Space vs Hangul Filler",
            content: "Zero-Width Space (U+200B) is another popular invisible character. While U+200B works for sending blank messages in Discord chat channels, Discord nickname filters occasionally strip zero-width characters. For profile display names, Hangul Filler (U+3164) is consistently reliable across all operating systems."
          }
        ]
      },
      {
        id: "step-by-step-setup-guide",
        heading: "Step-by-Step Instructions: Setting an Invisible Name",
        content: "Follow these exact steps to update your profile on desktop or mobile devices:",
        table: {
          headers: ["Platform", "Menu Location", "Required Action", "Shortcut / Action"],
          rows: [
            ["Desktop (Windows / Mac)", "User Settings > Profiles", "Paste Hangul Filler into Display Name", "Ctrl+V / Cmd+V then Save"],
            ["Mobile (iOS / Android)", "Avatar > Edit Profile", "Long-press Display Name field", "Tap Paste then Save"],
            ["Individual Server Only", "Right-click server icon > Edit Server Profile", "Paste into Server Nickname field", "Keeps global name visible elsewhere"],
            ["Blank Chat Message", "Any text channel input box", "Paste Zero-Width Space (U+200B)", "Press Enter to send blank bubble"]
          ]
        },
        subsections: [
          {
            heading: "Setting a Server-Specific Invisible Nickname",
            content: "If you only want to be invisible in a gaming clan or private server without altering your global identity, right-click the server name and select 'Edit Server Profile'. Paste the Hangul Filler into the Server Nickname box and click save. Your friends on your direct message list will still see your standard name."
          }
        ]
      },
      {
        id: "moderation-and-safety-considerations",
        heading: "Moderation and Server Safety Guidelines",
        content: "While having an invisible nickname looks stylish and minimal, keep these community considerations in mind:\n\n1. Server Rules: Large community servers often prohibit invisible names because it makes it difficult for moderators to ping you or inspect logs. Always read the server rules channel first.\n\n2. Mentioning Invisible Users: Members can still mention you by typing @ followed by your unique alphanumeric handle, or by right-clicking your avatar in the member list and selecting Mention.\n\n3. Safe Character Acquisition: Always use a trusted client-side tool like our Discord Invisible Name Generator. Never download suspicious executable files or browser extensions that claim to give you invisible accounts."
      }
    ],
    faqs: [
      {
        question: "Can I get banned from Discord for using an invisible name?",
        answer: "No. Discord does not ban users for using valid Unicode characters like Hangul Filler. However, individual server administrators have the right to kick or ban you if their custom server rules forbid invisible names."
      },
      {
        question: "Why does my name show as a box with a question mark on some devices?",
        answer: "This only occurs on very old operating systems (such as Windows 7 or Android 7) that lack modern Unicode font support. On modern Windows 10/11, macOS, iOS 15+, and Android 10+, the character renders completely transparent."
      },
      {
        question: "Can I use an invisible avatar along with an invisible name?",
        answer: "Yes. You can upload a transparent 1x1 PNG image as your Discord profile avatar to achieve a completely blank presence in chat and voice channels."
      }
    ]
  },
  {
    slug: "how-to-create-discord-webhook-embeds-guide",
    title: "How to Create Discord Webhook Embeds: JSON Payloads, discord.js & Python Guide",
    description: "Master Discord webhook embeds with this complete visual guide. Learn embed JSON formatting, color integer conversion, field layouts, and automation with curl, discord.js, and Python.",
    primaryKeyword: "how to make discord webhook embed",
    searchVariations: [
      "discord webhook embed generator",
      "discord webhook builder",
      "discord webhook json payload",
      "discord embed visualizer",
      "discordjs webhook embed",
      "python discord webhook embed"
    ],
    category: "Bots & Automation",
    readingTime: "15 min read",
    publishedDate: "2026-09-29",
    author: "Rayyan",
    excerpt: "Learn how to format rich Discord webhook embeds with live visual previews, convert hex colors to integers, and automate delivery using curl, Node.js, and Python.",
    content: "Discord webhooks allow external scripts, GitHub repositories, and game servers to post automated announcements directly into Discord channels. While standard webhooks send plain text messages, rich embeds provide structured cards with color accent bars, bold titles, thumbnail graphics, multi-column inline fields, and dynamic timestamps.\n\nBuilding an embed requires constructing a JSON payload that adheres to the official Discord Webhook REST API specification. In this guide, we break down every property of the Discord embed object, explain how to convert hex colors to base-10 integers, and demonstrate automated posting across curl, JavaScript, and Python.",
    keyTakeaways: [
      "Discord embed colors must be formatted as base-10 decimal integers (e.g., 5793266 for Blurple), not hex strings.",
      "Embed titles have a 256-character limit, and descriptions have a 4096-character limit.",
      "Inline fields allow up to 3 columns per row on desktop Discord clients, creating compact statistics tables.",
      "Embeds support dynamic Discord timestamps (<t:EPOCH:STYLE>) inside descriptions and field values.",
      "Our Discord Embed Generator lets you design embeds visually with live dark mode chat preview and 1-click code export."
    ],
    sections: [
      {
        id: "anatomy-of-a-discord-embed",
        heading: "Anatomy of a Discord Embed Payload",
        content: "A Discord webhook message accepts an array of embed objects named 'embeds' (up to 10 embeds per message). Each embed can contain the following properties:\n\n- title: The primary headline linkable via the 'url' parameter.\n- description: The main body text supporting full Markdown (bold, lists, timestamps).\n- color: Decimal integer controlling the vertical accent bar on the left edge.\n- fields: Array of up to 25 name/value pairs with optional inline alignment.\n- author: Object containing name, url, and icon_url.\n- footer: Object containing text and icon_url.\n- image & thumbnail: Media objects specifying full-width banners and corner icons.",
        codeSnippet: {
          language: "json",
          code: "{\n  \"username\": \"Server Bot\",\n  \"avatar_url\": \"https://i.imgur.com/example.png\",\n  \"embeds\": [\n    {\n      \"title\": \"Weekly Community Tournament\",\n      \"url\": \"https://disctimestamps.site\",\n      \"description\": \"Registration is open! The tournament starts <t:1790683200:R>.\",\n      \"color\": 5793266,\n      \"fields\": [\n        {\n          \"name\": \"Entry Fee\",\n          \"value\": \"Free\",\n          \"inline\": true\n        },\n        {\n          \"name\": \"Prize Pool\",\n          \"value\": \"$500\",\n          \"inline\": true\n        }\n      ],\n      \"footer\": {\n        \"text\": \"Hosted by Community Team\"\n      }\n    }\n  ]\n}",
          caption: "Complete Discord webhook embed JSON structure"
        }
      },
      {
        id: "converting-hex-to-decimal",
        heading: "Converting Hex Colors to Decimal Integers",
        content: "The most frequent error when building Discord webhook embeds is passing a hex color code string like '#5865F2' instead of an integer. The Discord API expects a 24-bit numeric value.\n\nTo convert any 6-digit hex code to decimal, strip the '#' symbol and parse it as a base-16 integer:\n\nIn JavaScript:\nparseInt('5865F2', 16) === 5793266\n\nIn Python:\nint('5865F2', 16) === 5793266",
        table: {
          headers: ["Color Name", "Hex Code", "Decimal Integer (Discord API)", "Visual Role"],
          rows: [
            ["Blurple (Brand)", "#5865F2", "5793266", "Official notices, community updates"],
            ["Green (Success)", "#57F287", "5763719", "Server online, verification passes"],
            ["Yellow (Warning)", "#FEE75C", "16705372", "Maintenance notices, warnings"],
            ["Red (Danger)", "#ED4245", "15548997", "Server downtime, bans, security alerts"],
            ["Dark Charcoal", "#2B2D31", "2829617", "Neutral stealth cards matching Discord theme"]
          ]
        }
      },
      {
        id: "automating-webhook-delivery",
        heading: "Automating Delivery in Node.js, Python and cURL",
        content: "Here is how to dispatch your embed payload to a Discord webhook URL using popular developer tools:",
        codeSnippet: {
          language: "javascript",
          code: "// Node.js (Fetch API)\nconst webhookUrl = 'https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN';\n\nawait fetch(webhookUrl, {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify(payload)\n});\n\n# Python (Requests)\nimport requests\nrequests.post(webhook_url, json=payload)\n\n# cURL (Bash)\ncurl -H \"Content-Type: application/json\" -X POST -d @payload.json $WEBHOOK_URL",
          caption: "Sending Discord webhook embeds across environments"
        }
      }
    ],
    faqs: [
      {
        question: "Can I edit a webhook message after sending it?",
        answer: "Yes. By appending '/messages/MESSAGE_ID' to your webhook URL and using the PATCH HTTP method, you can update the title, description, or embed fields of an existing webhook message."
      },
      {
        question: "Why did my webhook return HTTP 400 Bad Request?",
        answer: "The most common causes are passing color as a string instead of an integer, exceeding field character limits (256 for names, 1024 for values), or providing an invalid image URL."
      },
      {
        question: "Can dynamic timestamps be placed in embed titles?",
        answer: "No. Discord dynamic timestamps only render inside the embed description and field values. In titles, footers, and author fields, the tag displays as raw text."
      }
    ]
  },
  {
    slug: "how-to-make-glitch-zalgo-text-discord",
    title: "How to Make Glitch Text on Discord: The Science of Zalgo Diacritics",
    description: "Discover how Zalgo glitch text works on Discord. Learn how combining Unicode diacritics corrupts typography, how to stay within the 32-character nickname limit, and how to use our generator.",
    primaryKeyword: "how to make glitch text discord",
    searchVariations: [
      "discord glitch text",
      "discord zalgo text generator",
      "discord corrupted text",
      "discord cursed font maker",
      "discord scary text generator",
      "zalgo font discord"
    ],
    category: "Formatting & Style",
    readingTime: "11 min read",
    publishedDate: "2026-09-29",
    author: "Rayyan",
    excerpt: "Learn how Unicode combining diacritical marks create terrifying corrupted Zalgo text in Discord chat and nicknames without crashing member apps.",
    content: "In gaming servers, horror roleplay communities, and Halloween events, you often see users with glitched, corrupted text that spills upward and downward beyond normal line boundaries. Known across the internet as 'Zalgo text', this visual effect appears as if the Discord client itself has suffered a graphics failure.\n\nRather than being a special Discord font or exploit, glitch text is completely valid Unicode. By stacking multiple combining diacritical marks on top of standard alphanumeric letters, the font rendering engine positions visual accents above, below, and through the character. In this technical deep dive, we explore how combining marks operate, how Discord renders them, and how to prevent text from triggering spam filters.",
    keyTakeaways: [
      "Zalgo text uses standard Unicode Combining Diacritical Marks (U+0300 to U+036F) stacked onto base ASCII letters.",
      "Discord desktop, web, and mobile apps all support combining marks, but mobile operating systems clip extreme vertical heights.",
      "Discord enforces a strict 32-character limit on usernames and server nicknames. Excessive diacritics will exceed this limit.",
      "Our Discord Glitch Text Generator includes an intensity slider and character counter to ensure your glitched nicknames fit within Discord limits.",
      "Moderators can clean up malicious text crashes by enforcing regular nickname policies using Discord AutoMod."
    ],
    sections: [
      {
        id: "how-combining-diacritics-work",
        heading: "The Unicode Mechanics of Combining Diacritical Marks",
        content: "In the international Unicode standard, combining characters do not occupy space on their own. Instead, they attach to the preceding base character. For example, in linguistics and European languages, a base letter 'e' combined with an acute accent mark (U+0301) produces 'e'.\n\nWhen a Zalgo generator processes text, it appends a randomized sequence of upward, middle, and downward combining characters to every letter. Because text layout engines (such as HarfBuzz on Android and DirectWrite on Windows) stack each mark relative to the previous one, the accents spill out into adjacent chat lines.",
        codeSnippet: {
          language: "javascript",
          code: "// Example of manual combining mark stacking in JavaScript:\nconst baseChar = 'D';\nconst topMark = '\\u030D';    // Combining vertical line above\nconst bottomMark = '\\u0316'; // Combining grave accent below\nconst middleMark = '\\u0334'; // Combining tilde overlay\n\nconst corrupted = baseChar + topMark + middleMark + bottomMark;\nconsole.log(corrupted); // Renders as glitched D",
          caption: "Stacking combining diacritics onto a base character"
        }
      },
      {
        id: "staying-within-discord-limits",
        heading: "Navigating Discord 32-Character Nickname Limits",
        content: "A common mistake when generating glitch text for a Discord nickname is forgetting that each combining diacritic counts toward your total string length. If you type a 6-letter name like 'Shadow' and apply 10 diacritics per letter, the resulting string contains 66 characters. When you attempt to save this as your Discord nickname, the client rejects it because nicknames have a maximum ceiling of 32 UTF-16 code units.\n\nTo ensure your glitched nickname saves successfully:\n- Keep base names short (3 to 6 letters).\n- Use an intensity level between 2 and 5 marks per character.\n- Always check the character counter in our Discord Glitch Text Generator before copying.",
        table: {
          headers: ["Intensity Preset", "Marks Per Char", "Typical Output Length (5 Letters)", "Recommended Use Case"],
          rows: [
            ["Light Glitch", "1 to 2", "10 to 15 characters", "Server Nicknames, Clan Tags (Safe)"],
            ["Medium Chaos", "4 to 7", "25 to 32 characters", "Roleplay Character Names (Fits 32-char limit)"],
            ["Maximum Cursed", "15 to 30", "80 to 150 characters", "Chat Announcements, Creepypasta Lore (Chat only)"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Can glitch text crash someone Discord app?",
        answer: "In previous years, extreme Zalgo text containing thousands of marks could lag older mobile phones. Modern versions of Discord automatically truncate and clip excessive vertical overflowing marks to prevent crashes."
      },
      {
        question: "How do I remove glitch text from my Discord name?",
        answer: "Open User Settings > Profiles, select your Display Name, press Ctrl+A, hit Delete, and type your standard name."
      }
    ]
  },
  {
    slug: "how-to-write-colored-text-discord-ansi-guide",
    title: "How to Write in Color in Discord: The Complete ANSI Syntax Guide",
    description: "Learn how to write colored text in Discord messages using ANSI escape sequences. Master all 8 colors, background highlights, bold formatting, and 1-click copy tricks.",
    primaryKeyword: "how to write colored text in discord",
    searchVariations: [
      "how to make colored text in discord",
      "discord colored text",
      "discord ansi color text generator",
      "discord text color codes",
      "discord red text copy paste",
      "colored discord text"
    ],
    category: "Formatting & Style",
    readingTime: "14 min read",
    publishedDate: "2026-09-29",
    author: "Rayyan",
    excerpt: "Learn how ANSI escape codes inside codeblocks turn plain Discord chat into vibrant red, green, blue, yellow, and highlighted announcement banners.",
    content: "For years, Discord users relied on clumsy syntax highlighting hacks (like using yaml or diff codeblocks) to simulate colors in chat. However, Discord introduced native support for ANSI terminal escape sequences inside codeblocks denoted with the 'ansi' syntax language tag.\n\nBy leveraging ANSI escape codes, you can format individual words or entire paragraphs with 8 distinct text colors, 8 background highlight fills, bold typography, and underlined emphasis. In this guide, we break down the exact escape code syntax, provide copyable templates for moderation banners, and explain mobile compatibility.",
    keyTakeaways: [
      "Colored text requires wrapping your message in a triple-backtick codeblock declared with 'ansi'.",
      "Colors are initiated using the escape character sequence '\\u001b[CODEm' and cleared with '\\u001b[0m'.",
      "Discord supports 8 foreground text colors (Dark Gray, Red, Green, Yellow, Blue, Pink, Cyan, and White).",
      "ANSI codeblocks render in color on Discord Desktop and Web clients; on some mobile app releases, they render in standard monospaced text.",
      "Our Discord Colored Text Generator lets you type, highlight, and copy complete ANSI codeblocks with zero syntax errors."
    ],
    sections: [
      {
        id: "how-ansi-escape-codes-work",
        heading: "The ANSI Escape Code Syntax Structure",
        content: "ANSI terminal formatting relies on control sequences that instruct terminal emulators how to style text. To write colored text in Discord, you open a codeblock with ```ansi and write your message using this pattern:\n\n\\u001b[STYLE;COLORmYour Text Here\\u001b[0m\n\nWhere:\n- \\u001b: The unprintable Escape character (ASCII 27 / Hex 1B).\n- [: Opening bracket for the Control Sequence Introducer (CSI).\n- STYLE: 0 for normal, 1 for bold, 4 for underline.\n- COLOR: Two-digit numeric code specifying foreground or background color.\n- m: Terminating command letter.\n- \\u001b[0m: Reset sequence that prevents colors from bleeding into subsequent text.",
        codeSnippet: {
          language: "ansi",
          code: "```ansi\n\u001b[1;31m[CRITICAL]\u001b[0m Server reboot in progress\n\u001b[1;32m[SUCCESS]\u001b[0m All services online\n\u001b[1;33m[WARNING]\u001b[0m High latency detected on EU node\n\u001b[1;34m[INFO]\u001b[0m Community game night starts tonight\n```",
          caption: "Multi-colored server announcement using Discord ANSI syntax"
        }
      },
      {
        id: "complete-ansi-color-code-chart",
        heading: "Complete Discord ANSI Color Code Reference Chart",
        content: "Here are all supported color codes in Discord:",
        table: {
          headers: ["Color", "Foreground Code", "Background Code", "Best Practice Usage"],
          rows: [
            ["Dark Gray", "30", "40", "Timestamps, footers, subtle metadata"],
            ["Red", "31", "41", "Errors, urgent alerts, rule violations"],
            ["Green", "32", "42", "Success notices, bot online indicators"],
            ["Yellow", "33", "43", "Warnings, maintenance reminders"],
            ["Blue", "34", "44", "Information banners, hyperlinks, guides"],
            ["Pink / Magenta", "35", "45", "Events, giveaways, VIP role announcements"],
            ["Cyan", "36", "46", "Commands, channel names, role tags"],
            ["Bright White", "37", "47", "High-contrast headings and callouts"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "Why does my colored text show raw code like [31m on Discord?",
        answer: "This happens if you forgot to specify 'ansi' after the opening triple backticks, or if your text editor replaced the literal escape character with plain text. Use our visual editor to generate clean, verified escape tokens."
      },
      {
        question: "Can I use dynamic timestamps inside an ANSI colored text block?",
        answer: "No. Discord's entity parser is disabled inside codeblocks to prevent syntax interference. Dynamic timestamps (<t:TIMESTAMP:STYLE>) must be placed outside the codeblock."
      }
    ]
  }
];
