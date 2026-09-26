/**
 * Natural language time parser for Discord Timestamp Generator.
 * Parses conversational time phrases into concrete Year, Month, Day, Hour, Minute.
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
  const text = input.trim().toLowerCase();
  if (!text) return null;

  const target = new Date(referenceDate.getTime());

  // 1. "now" / "right now"
  if (text === "now" || text === "right now") {
    return formatDateResult(target, "Current moment");
  }

  // 2. Relative offsets: "in X minutes", "in X hours", "in X days", "in X weeks"
  const relativeMatch = text.match(
    /^in\s+(\d+)\s*(m|min|mins|minute|minutes|h|hr|hrs|hour|hours|d|day|days|w|wk|wks|week|weeks)$/i
  );
  if (relativeMatch) {
    const amount = parseInt(relativeMatch[1], 10);
    const unit = relativeMatch[2].toLowerCase();

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

  // 3. Combined relative offset: "in X hours and Y minutes" or "in X hours Y minutes"
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

  // Helper to parse clock time like "5pm", "5:30 pm", "17:00", "5:30", "midnight", "noon"
  const extractTime = (timeStr: string): { hours: number; minutes: number } | null => {
    const t = timeStr.trim().toLowerCase();
    if (t === "noon" || t === "midday") return { hours: 12, minutes: 0 };
    if (t === "midnight") return { hours: 0, minutes: 0 };

    const match = t.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
    if (!match) return null;

    let h = parseInt(match[1], 10);
    const m = match[2] ? parseInt(match[2], 10) : 0;
    const meridiem = match[3] ? match[3].toLowerCase() : null;

    if (meridiem === "pm" && h < 12) h += 12;
    if (meridiem === "am" && h === 12) h = 0;

    if (h >= 0 && h < 24 && m >= 0 && m < 60) {
      return { hours: h, minutes: m };
    }
    return null;
  };

  // 4. "tomorrow" or "tomorrow at <time>" or "tomorrow <time>"
  if (text.startsWith("tomorrow")) {
    target.setDate(target.getDate() + 1);
    const timePart = text.replace(/^tomorrow\s*(?:at\s*)?/, "").trim();
    if (timePart) {
      const parsedTime = extractTime(timePart);
      if (parsedTime) {
        target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return formatDateResult(target, `Tomorrow at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
      }
    } else {
      // Default tomorrow same time or 8 PM if past
      return formatDateResult(target, "Tomorrow");
    }
  }

  // 5. "today at <time>" or "today <time>"
  if (text.startsWith("today")) {
    const timePart = text.replace(/^today\s*(?:at\s*)?/, "").trim();
    if (timePart) {
      const parsedTime = extractTime(timePart);
      if (parsedTime) {
        target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
        return formatDateResult(target, `Today at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
      }
    }
  }

  // 6. Direct time: "at 5pm", "5:30pm", "18:00", "noon", "midnight"
  const directTimeStr = text.replace(/^(?:at\s+)/, "").trim();
  const directTime = extractTime(directTimeStr);
  if (directTime) {
    target.setHours(directTime.hours, directTime.minutes, 0, 0);
    // If the time is already past today, roll over to tomorrow
    if (target.getTime() <= referenceDate.getTime()) {
      target.setDate(target.getDate() + 1);
      return formatDateResult(target, `Tomorrow at ${formatClock(directTime.hours, directTime.minutes)}`);
    }
    return formatDateResult(target, `Today at ${formatClock(directTime.hours, directTime.minutes)}`);
  }

  // 7. Day of week: "friday", "next friday", "friday at 8pm", "monday at 10:00"
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayMatch = text.match(/^(?:next\s+)?(sunday|monday|tuesday|wednesday|thursday|friday|saturday)(?:\s+(?:at\s+)?(.+))?$/i);
  if (dayMatch) {
    const targetDayName = dayMatch[1].toLowerCase();
    const targetDayIndex = daysOfWeek.indexOf(targetDayName);
    const timePart = dayMatch[2] ? dayMatch[2].trim() : null;

    if (targetDayIndex !== -1) {
      const currentDayIndex = target.getDay();
      let daysAhead = targetDayIndex - currentDayIndex;
      if (daysAhead <= 0) daysAhead += 7; // Next occurrence

      target.setDate(target.getDate() + daysAhead);

      if (timePart) {
        const parsedTime = extractTime(timePart);
        if (parsedTime) {
          target.setHours(parsedTime.hours, parsedTime.minutes, 0, 0);
          return formatDateResult(target, `Next ${capitalize(targetDayName)} at ${formatClock(parsedTime.hours, parsedTime.minutes)}`);
        }
      }
      return formatDateResult(target, `Next ${capitalize(targetDayName)}`);
    }
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
