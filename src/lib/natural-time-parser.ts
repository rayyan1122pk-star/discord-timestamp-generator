/**
 * Enhanced Natural language time parser for Discord Timestamp Generator.
 * Handles abbreviations (tmr, tmrw, fri, 6 pm, in 2h), slang, and conversational phrases.
 * Zero external dependencies, 100% client-side.
 */

export interface ParsedTimeResult {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  description: string;
}

export function parseNaturalLanguageTime(
  input: string,
  referenceDate: Date = new Date()
): ParsedTimeResult | null {
  if (!input) return null;
  let text = input.trim().toLowerCase();
  if (!text) return null;

  // Normalize multiple spaces and common symbols like "+"
  text = text.replace(/\s+/g, " ");

  const target = new Date(referenceDate.getTime());

  // 1. "now", "right now", "rn"
  if (text === "now" || text === "right now" || text === "rn") {
    return formatDateResult(target, "Current moment");
  }

  // 2. Helper to extract time component (e.g. "6pm", "6 pm", "6:30 pm", "18:00", "noon", "midnight", "8")
  const extractTime = (timeStr: string): { hours: number; minutes: number } | null => {
    const t = timeStr.trim().toLowerCase();
    if (t === "noon" || t === "midday") return { hours: 12, minutes: 0 };
    if (t === "midnight") return { hours: 0, minutes: 0 };

    // Matches: "6pm", "6 pm", "6:30pm", "6:30 pm", "06:30", "18:00", "6"
    const match = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
    if (!match) return null;

    let h = parseInt(match[1], 10);
    const m = match[2] ? parseInt(match[2], 10) : 0;
    const meridiem = match[3] ? match[3].toLowerCase() : null;

    if (meridiem === "pm" && h < 12) h += 12;
    if (meridiem === "am" && h === 12) h = 0;

    // If no am/pm specified and h is between 1 and 7, assume PM if after morning (e.g. "at 6" usually means 6 PM)
    if (!meridiem && !match[2] && h >= 1 && h <= 11) {
      // Keep as standard 24h if user typed e.g. 18, otherwise assume PM for 1-7
      if (h <= 7) h += 12;
    }

    if (h >= 0 && h < 24 && m >= 0 && m < 60) {
      return { hours: h, minutes: m };
    }
    return null;
  };

  // 3. Short relative expressions: "+15m", "+1h", "in 2h", "15m", "2h", "30 mins", "in 45m"
  const shortRelMatch = text.match(
    /^(?:\+|in\s+)?(\d+)\s*(m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days|w|wk|wks|week|weeks)$/i
  );
  if (shortRelMatch) {
    const amount = parseInt(shortRelMatch[1], 10);
    const unit = shortRelMatch[2].toLowerCase();

    if (unit.startsWith("m") && !unit.startsWith("mo")) {
      target.setMinutes(target.getMinutes() + amount);
      return formatDateResult(target, `In ${amount} minute(s)`);
    } else if (unit.startsWith("h")) {
      target.setHours(target.getHours() + amount);
      return formatDateResult(target, `In ${amount} hour(s)`);
    } else if (unit.startsWith("d")) {
      target.setDate(target.getDate() + amount);
      return formatDateResult(target, `In ${amount} day(s)`);
    } else if (unit.startsWith("w")) {
      target.setDate(target.getDate() + amount * 7);
      return formatDateResult(target, `In ${amount} week(s)`);
    }
  }

  // 4. Word-based relatives: "in an hour", "in half an hour", "in a minute"
  if (text === "in an hour" || text === "in 1 hour" || text === "an hour") {
    target.setHours(target.getHours() + 1);
    return formatDateResult(target, "In 1 hour");
  }
  if (text === "in half an hour" || text === "half an hour" || text === "in 30 mins") {
    target.setMinutes(target.getMinutes() + 30);
    return formatDateResult(target, "In 30 minutes");
  }

  // 5. Multi-unit relative: "in 1 hour 30 mins", "in 2 hours and 15 minutes"
  const multiRelMatch = text.match(
    /^in\s+(\d+)\s*(?:hours|hour|hrs|h)\s*(?:and)?\s*(\d+)\s*(?:minutes|minute|mins|m)$/i
  );
  if (multiRelMatch) {
    const hours = parseInt(multiRelMatch[1], 10);
    const mins = parseInt(multiRelMatch[2], 10);
    target.setHours(target.getHours() + hours);
    target.setMinutes(target.getMinutes() + mins);
    return formatDateResult(target, `In ${hours}h ${mins}m`);
  }

  // 6. Tomorrow variations: "tomorrow", "tmr", "tmrw", "tom", "tomorow", "2morrow"
  const tmrRegex = /^(?:tomorrow|tmrw|tmr|tom|tomorow|2morrow)(?:\s+(?:at\s+)?(.+))?$/i;
  const tmrMatch = text.match(tmrRegex);
  if (tmrMatch) {
    target.setDate(target.getDate() + 1);
    const timePart = tmrMatch[1] ? tmrMatch[1].trim() : null;
    if (timePart) {
      const parsedTime = extractTime(timePart);
      if (parsedTime) {
        target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return formatDateResult(target, `Tomorrow at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
      }
    }
    // Default tomorrow: keep current hours or 8:00 PM if time omitted
    return formatDateResult(target, "Tomorrow");
  }

  // 7. Tonight variations: "tonight", "2night", "tonight at 8pm"
  const tonightRegex = /^(?:tonight|2night)(?:\s+(?:at\s+)?(.+))?$/i;
  const tonightMatch = text.match(tonightRegex);
  if (tonightMatch) {
    const timePart = tonightMatch[1] ? tonightMatch[1].trim() : null;
    if (timePart) {
      const parsedTime = extractTime(timePart);
      if (parsedTime) {
        target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return formatDateResult(target, `Tonight at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
      }
    }
    target.setHours(20, 0, 0, 0); // Default 8:00 PM
    return formatDateResult(target, "Tonight at 8:00 PM");
  }

  // 8. Today variations: "today", "tod", "today at 6pm"
  const todayRegex = /^(?:today|tod)(?:\s+(?:at\s+)?(.+))?$/i;
  const todayMatch = text.match(todayRegex);
  if (todayMatch) {
    const timePart = todayMatch[1] ? todayMatch[1].trim() : null;
    if (timePart) {
      const parsedTime = extractTime(timePart);
      if (parsedTime) {
        target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return formatDateResult(target, `Today at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
      }
    }
    return formatDateResult(target, "Today");
  }

  // 9. Day of week (full or abbreviated): "fri", "friday", "next fri", "mon at 4pm", "wed 6:30 pm"
  const dayPatterns = [
    { name: "sunday", aliases: ["sunday", "sun"] },
    { name: "monday", aliases: ["monday", "mon"] },
    { name: "tuesday", aliases: ["tuesday", "tue", "tues"] },
    { name: "wednesday", aliases: ["wednesday", "wed"] },
    { name: "thursday", aliases: ["thursday", "thu", "thur", "thurs"] },
    { name: "friday", aliases: ["friday", "fri"] },
    { name: "saturday", aliases: ["saturday", "sat"] },
  ];

  const allDayAliases = dayPatterns.flatMap((d) => d.aliases).join("|");
  const dayRegex = new RegExp(`^(?:next\\s+)?(${allDayAliases})(?:\\s+(?:at\\s+)?(.+))?$`, "i");
  const dayMatch = text.match(dayRegex);

  if (dayMatch) {
    const matchedAlias = dayMatch[1].toLowerCase();
    const targetDayIndex = dayPatterns.findIndex((d) => d.aliases.includes(matchedAlias));
    const timePart = dayMatch[2] ? dayMatch[2].trim() : null;

    if (targetDayIndex !== -1) {
      const currentDayIndex = target.getDay();
      let daysAhead = targetDayIndex - currentDayIndex;
      if (daysAhead <= 0) daysAhead += 7; // Next occurrence

      target.setDate(target.getDate() + daysAhead);

      const dayName = dayPatterns[targetDayIndex].name;
      if (timePart) {
        const parsedTime = extractTime(timePart);
        if (parsedTime) {
          target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
          return formatDateResult(
            target,
            `Next ${capitalize(dayName)} at ${formatClock(parsedTime.hours, parsedTime.minutes)}`
          );
        }
      }
      return formatDateResult(target, `Next ${capitalize(dayName)}`);
    }
  }

  // 10. Direct time alone: "6pm", "6 pm", "18:00", "at 6pm", "at 6 pm", "5:30 am", "noon", "midnight"
  const directTimeStr = text.replace(/^(?:at\s+)/, "").trim();
  const directTime = extractTime(directTimeStr);
  if (directTime) {
    target.setHours(directTime.hours, directTime.minutes, 0, 0);
    // If the time already passed today, advance to tomorrow
    if (target.getTime() <= referenceDate.getTime()) {
      target.setDate(target.getDate() + 1);
      return formatDateResult(target, `Tomorrow at ${formatClock(directTime.hours, directTime.minutes)}`);
    }
    return formatDateResult(target, `Today at ${formatClock(directTime.hours, directTime.minutes)}`);
  }

  return null;
}

function formatDateResult(d: Date, description: string): ParsedTimeResult {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
    description,
  };
}

function formatClock(hours: number, minutes: number): string {
  const meridiem = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = String(minutes).padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${meridiem}`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
