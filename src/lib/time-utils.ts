export type DiscordFormatStyle = "t" | "T" | "d" | "D" | "f" | "F" | "R" | "default";

export interface TimestampFormatItem {
  style: DiscordFormatStyle;
  flag: string;
  name: string;
  description: string;
  syntax: string;
  exampleRender: string;
  useCase: string;
}

export const DISCORD_FORMAT_STYLES: Array<{
  style: DiscordFormatStyle;
  flag: string;
  name: string;
  description: string;
  useCase: string;
}> = [
  {
    style: "R",
    flag: ":R",
    name: "Relative Time",
    description: "Dynamic countdown or elapsed time (e.g., 'in 2 hours', '5 minutes ago')",
    useCase: "Event start times, raid alerts, tournament count-downs, deadlines",
  },
  {
    style: "f",
    flag: ":f",
    name: "Short Date / Time",
    description: "Concise human date and time (e.g., 'September 25, 2026 8:00 PM')",
    useCase: "General announcements, meeting schedules, community notices",
  },
  {
    style: "F",
    flag: ":F",
    name: "Long Date / Time",
    description: "Includes weekday, full month name, year, and time",
    useCase: "Official server rules, seasonal launch dates, tournament schedules",
  },
  {
    style: "t",
    flag: ":t",
    name: "Short Time",
    description: "Time only without seconds (e.g., '8:00 PM' or '20:00')",
    useCase: "Daily recurring activities, podcast time reminders",
  },
  {
    style: "T",
    flag: ":T",
    name: "Long Time",
    description: "Time with precise seconds (e.g., '8:00:00 PM')",
    useCase: "Speedruns, server restart notices, auction snipes",
  },
  {
    style: "d",
    flag: ":d",
    name: "Short Date",
    description: "Numerical date formatted according to viewer's locale (e.g., '09/25/2026')",
    useCase: "Birthdays, ban expiration dates, membership logs",
  },
  {
    style: "D",
    flag: ":D",
    name: "Long Date",
    description: "Written date without time (e.g., 'September 25, 2026')",
    useCase: "Release date reveals, maintenance days",
  },
  {
    style: "default",
    flag: "",
    name: "Default (No flag)",
    description: "Identical to :f (Short Date/Time) without typing the style character",
    useCase: "Quick typing shortcuts when style specification is omitted",
  },
];

/**
 * Common major global timezones with IANA identifiers and readable display labels
 */
export interface TimezoneOption {
  value: string;
  label: string;
  offsetHours: number;
}

export const COMMON_TIMEZONES: TimezoneOption[] = [
  { value: "UTC", label: "UTC (Coordinated Universal Time, ±00:00)", offsetHours: 0 },
  { value: "America/New_York", label: "Eastern Time: New York, Atlanta, Toronto (EST/EDT, -05:00/-04:00)", offsetHours: -4 },
  { value: "America/Chicago", label: "Central Time: Chicago, Dallas, Winnipeg (CST/CDT, -06:00/-05:00)", offsetHours: -5 },
  { value: "America/Denver", label: "Mountain Time: Denver, Calgary, Phoenix (MST/MDT, -07:00/-06:00)", offsetHours: -6 },
  { value: "America/Los_Angeles", label: "Pacific Time: Los Angeles, Seattle, Vancouver (PST/PDT, -08:00/-07:00)", offsetHours: -7 },
  { value: "America/Anchorage", label: "Alaska Time: Anchorage (AKST/AKDT, -09:00/-08:00)", offsetHours: -8 },
  { value: "Pacific/Honolulu", label: "Hawaii-Aleutian Time: Honolulu (HST, -10:00)", offsetHours: -10 },
  { value: "America/Sao_Paulo", label: "Brasília Time: São Paulo, Rio de Janeiro (BRT, -03:00)", offsetHours: -3 },
  { value: "Europe/London", label: "London, Dublin, Lisbon (GMT/BST, +00:00/+01:00)", offsetHours: 1 },
  { value: "Europe/Paris", label: "Paris, Berlin, Rome, Madrid, Amsterdam (CET/CEST, +01:00/+02:00)", offsetHours: 2 },
  { value: "Europe/Athens", label: "Athens, Helsinki, Bucharest (EET/EEST, +02:00/+03:00)", offsetHours: 3 },
  { value: "Europe/Moscow", label: "Moscow Standard Time (MSK, +03:00)", offsetHours: 3 },
  { value: "Asia/Dubai", label: "Gulf Standard Time: Dubai, Abu Dhabi (GST, +04:00)", offsetHours: 4 },
  { value: "Asia/Karachi", label: "Pakistan Standard Time: Karachi, Islamabad, Lahore (PKT, +05:00)", offsetHours: 5 },
  { value: "Asia/Kolkata", label: "India Standard Time: New Delhi, Mumbai, Bengaluru (IST, +05:30)", offsetHours: 5.5 },
  { value: "Asia/Dhaka", label: "Bangladesh Standard Time: Dhaka (BST, +06:00)", offsetHours: 6 },
  { value: "Asia/Bangkok", label: "Indochina Time: Bangkok, Hanoi, Jakarta (ICT, +07:00)", offsetHours: 7 },
  { value: "Asia/Singapore", label: "Singapore, Kuala Lumpur, Hong Kong, Beijing (SGT/CST, +08:00)", offsetHours: 8 },
  { value: "Asia/Tokyo", label: "Japan Standard Time: Tokyo, Seoul (JST/KST, +09:00)", offsetHours: 9 },
  { value: "Australia/Sydney", label: "Australian Eastern Time: Sydney, Melbourne (AEST/AEDT, +10:00/+11:00)", offsetHours: 10 },
  { value: "Pacific/Auckland", label: "New Zealand Standard Time: Auckland (NZST/NZDT, +12:00/+13:00)", offsetHours: 12 },
];

/**
 * Formats a Discord timestamp code
 */
export function buildDiscordSyntax(epochSeconds: number, style: DiscordFormatStyle): string {
  if (style === "default") {
    return `<t:${epochSeconds}>`;
  }
  return `<t:${epochSeconds}:${style}>`;
}

/**
 * Calculates human readable relative time (e.g. "in 2 hours", "45 minutes ago")
 */
export function getRelativeTimeString(epochSeconds: number, referenceDate: Date = new Date()): string {
  const targetMs = epochSeconds * 1000;
  const nowMs = referenceDate.getTime();
  const diffSeconds = Math.round((targetMs - nowMs) / 1000);

  const isFuture = diffSeconds > 0;
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 30) {
    return isFuture ? "in a few seconds" : "a few seconds ago";
  }

  const minutes = Math.round(absSeconds / 60);
  if (minutes < 60) {
    if (minutes === 1) return isFuture ? "in a minute" : "a minute ago";
    return isFuture ? `in ${minutes} minutes` : `${minutes} minutes ago`;
  }

  const hours = Math.round(absSeconds / 3600);
  if (hours < 24) {
    if (hours === 1) return isFuture ? "in an hour" : "an hour ago";
    return isFuture ? `in ${hours} hours` : `${hours} hours ago`;
  }

  const days = Math.round(absSeconds / 86400);
  if (days < 30) {
    if (days === 1) return isFuture ? "tomorrow" : "yesterday";
    return isFuture ? `in ${days} days` : `${days} days ago`;
  }

  const months = Math.round(days / 30.44);
  if (months < 12) {
    if (months === 1) return isFuture ? "in a month" : "a month ago";
    return isFuture ? `in ${months} months` : `${months} months ago`;
  }

  const years = Math.round(days / 365.25);
  if (years === 1) return isFuture ? "in a year" : "a year ago";
  return isFuture ? `in ${years} years` : `${years} years ago`;
}

/**
 * Formats a preview according to Discord's formatting guidelines using Intl
 */
export function renderDiscordFormatPreview(
  epochSeconds: number,
  style: DiscordFormatStyle,
  locale: string = "en-US",
  timezone?: string
): string {
  const date = new Date(epochSeconds * 1000);
  const tz = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  try {
    switch (style) {
      case "t":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      case "T":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }).format(date);
      case "d":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }).format(date);
      case "D":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date);
      case "f":
      case "default":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      case "F":
        return new Intl.DateTimeFormat(locale, {
          timeZone: tz,
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(date);
      case "R":
        return getRelativeTimeString(epochSeconds);
      default:
        return date.toLocaleString(locale, { timeZone: tz });
    }
  } catch {
    // Fallback if timezone string is invalid
    return date.toLocaleString();
  }
}

/**
 * Convert user date string, time string, and IANA timezone into Unix Epoch seconds
 */
export function calculateEpochSeconds(dateStr: string, timeStr: string, timeZone: string): number {
  if (!dateStr || !timeStr) {
    return Math.floor(Date.now() / 1000);
  }

  try {
    // Create an ISO-like string and resolve with given timeZone
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hours, minutes] = timeStr.split(":").map(Number);

    const target = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

    // Resolve time in timezone using Intl formatToParts
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(target);
    const partMap: Record<string, number> = {};
    for (const p of parts) {
      if (p.type !== "literal") {
        partMap[p.type] = Number(p.value);
      }
    }

    const dayDiff = (partMap.day || day) - day;
    const hourDiff = (partMap.hour === 24 ? 0 : partMap.hour || hours) - hours;

    // Adjust for daylight savings and time boundaries
    const totalHourOffset = dayDiff * 24 + hourDiff;
    const correctedTime = target.getTime() - totalHourOffset * 3600 * 1000 - ((partMap.minute || minutes) - minutes) * 60 * 1000;

    return Math.floor(correctedTime / 1000);
  } catch {
    return Math.floor(new Date(`${dateStr}T${timeStr}:00`).getTime() / 1000);
  }
}
