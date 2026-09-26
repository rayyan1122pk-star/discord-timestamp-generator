export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    discordDocs: string;
  };
  author: {
    name: string;
    role: string;
    url: string;
  };
}

const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  return "https://discord-timestamp-generator-swart.vercel.app";
};

const siteUrl = getSiteUrl();

export const siteConfig: SiteConfig = {
  name: "Discord Timestamp Generator & Dynamic Time Formatter",
  shortName: "Discord Timestamps",
  description:
    "Generate dynamic Discord timestamps that automatically adjust to local timezones. Convert dates to Unix epoch with live chat preview and 1-click copy.",
  url: siteUrl,
  ogImage: `${siteUrl}/og-image.png`,
  links: {
    github: "https://github.com/rayyan1122pk-star/discord-timestamp-generator",
    discordDocs: "https://discord.com/developers/docs/reference#message-formatting-timestamp-styles",
  },
  author: {
    name: "Discord Timestamps Engineering Team",
    role: "Open Source Tool & Developer Utility",
    url: `${siteUrl}/about`,
  },
};

export interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
}

export const routeMetadataMap: Record<string, RouteMetadata> = {
  home: {
    title: "Discord Timestamp Generator: Dynamic Timezone Formatter & Preview",
    description:
      "Generate dynamic Discord timestamps (<t:TIMESTAMP:STYLE>) that adapt to each user's local timezone. Features live chat preview, countdowns, and 1-click copy.",
    canonical: siteConfig.url,
    keywords: [
      "discord timestamp generator",
      "discord timestamp",
      "discord dynamic time",
      "discord time code",
      "discord unix timestamp",
      "discord relative time generator",
      "discord timestamp maker",
      "discord chat formatting time",
    ],
  },
  guide: {
    title: "The Complete Discord Timestamp Guide (2026): Syntax, Styles & Rules",
    description:
      "Learn how Discord dynamic timestamps work, why they automatically adapt to international timezones, and master the full <t:epoch:style> syntax for messages, channels, and rules.",
    canonical: `${siteConfig.url}/discord-timestamp-guide`,
    keywords: [
      "discord timestamp guide",
      "how to do discord timestamps",
      "discord time format guide",
      "discord timestamp syntax",
      "discord auto timezone message",
    ],
  },
  formats: {
    title: "Discord Timestamp Formats & Styles Cheat Sheet (t, T, d, D, f, F, R)",
    description:
      "Compare all 7 Discord timestamp style flags (Short Time, Long Time, Short Date, Long Date, Short Date/Time, Long Date/Time, and Relative Countdown) with side-by-side examples.",
    canonical: `${siteConfig.url}/discord-timestamp-formats`,
    keywords: [
      "discord timestamp formats",
      "discord timestamp styles",
      "discord timestamp flag list",
      "discord relative timestamp format",
      "discord timestamp cheat sheet",
    ],
  },
  unix: {
    title: "Unix Timestamp to Discord Converter & Epoch Guide",
    description:
      "Understand Unix epoch time (seconds since Jan 1, 1970) in Discord. Learn how to convert timestamps, avoid the 1000x millisecond bug, and calculate UTC offsets.",
    canonical: `${siteConfig.url}/unix-timestamp`,
    keywords: [
      "unix timestamp discord",
      "epoch time to discord",
      "discord timestamp seconds vs milliseconds",
      "convert date to unix epoch discord",
    ],
  },
  markdown: {
    title: "Discord Markdown Guide: Text Formatting, Code Blocks & Timestamps",
    description:
      "Master Discord text formatting: bold, italic, underline, strikethrough, spoiler tags, headers, quotes, blockquotes, syntax highlighting, and dynamic timestamp embedding.",
    canonical: `${siteConfig.url}/discord-markdown`,
    keywords: [
      "discord markdown guide",
      "discord text formatting",
      "discord markdown timestamps",
      "discord headers code blocks spoiler text",
    ],
  },
  webhooks: {
    title: "Discord Webhook Timestamps: Embeds, ISO-8601 & Dynamic Formatting",
    description:
      "How to format dynamic timestamps in Discord webhooks and bot embeds. Learn the difference between <t:epoch:style> in embed descriptions vs ISO-8601 in embed footers.",
    canonical: `${siteConfig.url}/discord-webhook-timestamps`,
    keywords: [
      "discord webhook timestamp",
      "discord embed timestamp format",
      "discord webhook json timestamp",
      "discord embed dynamic date",
    ],
  },
  bots: {
    title: "Discord Bot Timestamps in JavaScript (discord.js) & Python (discord.py)",
    description:
      "Code examples for generating dynamic timestamps in Discord bots. Master discord.js time() utility, TimestampStyles, and Python datetime epoch conversions.",
    canonical: `${siteConfig.url}/discord-bot-timestamps`,
    keywords: [
      "discord bot timestamp",
      "discord js timestamp builder",
      "discord py timestamp formatting",
      "timestampstyles discord.js",
    ],
  },
  blog: {
    title: "Discord Timestamps Blog & Developer Tutorials",
    description:
      "In-depth guides, case studies, and tutorials on Discord API formatting, server moderation scheduling, webhook automations, and developer best practices.",
    canonical: `${siteConfig.url}/blog`,
    keywords: [
      "discord tutorials",
      "discord developer blog",
      "discord automation guides",
      "discord server management tips",
    ],
  },
  about: {
    title: "About Discord Timestamps: Philosophy, Privacy & Architecture",
    description:
      "Learn about Discord Timestamps: a high-performance, client-side developer utility built with zero tracking, instant processing, and accessibility.",
    canonical: `${siteConfig.url}/about`,
    keywords: ["about discord timestamp generator", "discord timestamps project mission"],
  },
  contact: {
    title: "Contact Us & Developer Support: Discord Timestamps",
    description:
      "Get in touch with the engineering team. Report bugs, suggest new timestamp tools or features, and provide feedback.",
    canonical: `${siteConfig.url}/contact`,
    keywords: ["contact discord timestamps", "discord timestamp generator feedback"],
  },
  privacy: {
    title: "Privacy Policy: 100% Client-Side Processing",
    description:
      "Our privacy policy explains why no dates, times, or personal data ever leave your web browser. Completely local, cookie-free, and private.",
    canonical: `${siteConfig.url}/privacy`,
    keywords: ["discord timestamps privacy policy", "client side privacy tool"],
  },
  terms: {
    title: "Terms of Service: Discord Timestamps",
    description:
      "Terms of service for using Discord Timestamps, an open utility and informational resource.",
    canonical: `${siteConfig.url}/terms`,
    keywords: ["terms of service discord timestamps"],
  },
};
