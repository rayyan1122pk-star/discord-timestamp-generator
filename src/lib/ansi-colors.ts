/**
 * Discord ANSI Color Formatting Utilities.
 * Discord uses ANSI escape codes inside ```ansi codeblocks.
 * Format: \u001b[<format>;<color>m <text> \u001b[0m
 */

export interface AnsiColorOption {
  id: string;
  name: string;
  code: string; // e.g. "31" for red
  hex: string;  // Preview color
  bgHex?: string;
}

export const ANSI_FOREGROUND_COLORS: AnsiColorOption[] = [
  { id: "default", name: "Default (White)", code: "0", hex: "#ffffff" },
  { id: "gray", name: "Gray", code: "30", hex: "#4f545c" },
  { id: "red", name: "Red", code: "31", hex: "#dc322f" },
  { id: "green", name: "Green", code: "32", hex: "#859900" },
  { id: "yellow", name: "Yellow", code: "33", hex: "#b58900" },
  { id: "blue", name: "Blue", code: "34", hex: "#268bd2" },
  { id: "pink", name: "Pink / Magenta", code: "35", hex: "#d33682" },
  { id: "cyan", name: "Cyan", code: "36", hex: "#2aa198" },
  { id: "white", name: "Bright White", code: "37", hex: "#ffffff" },
];

export const ANSI_BACKGROUND_COLORS: AnsiColorOption[] = [
  { id: "none", name: "No Background", code: "", hex: "transparent" },
  { id: "bg-darkblue", name: "Dark Blue", code: "40", hex: "#002b36" },
  { id: "bg-orange", name: "Orange", code: "41", hex: "#cb4b16" },
  { id: "bg-marble", name: "Marble Blue", code: "42", hex: "#586e75" },
  { id: "bg-turquoise", name: "Turquoise", code: "43", hex: "#657b83" },
  { id: "bg-gray", name: "Gray", code: "44", hex: "#839496" },
  { id: "bg-indigo", name: "Indigo", code: "45", hex: "#6c71c4" },
  { id: "bg-lightgray", name: "Light Gray", code: "46", hex: "#93a1a1" },
  { id: "bg-white", name: "White", code: "47", hex: "#fdf6e3" },
];

export interface FormattedSpan {
  text: string;
  fg: string; // ANSI code (e.g. "31")
  bg: string; // ANSI code (e.g. "40")
  bold: boolean;
  underline: boolean;
}

export function generateDiscordAnsiBlock(spans: FormattedSpan[]): string {
  let content = "";

  for (const span of spans) {
    if (!span.text) continue;

    const codes: string[] = [];
    if (span.bold) codes.push("1");
    if (span.underline) codes.push("4");
    if (span.fg && span.fg !== "0") codes.push(span.fg);
    if (span.bg) codes.push(span.bg);

    if (codes.length > 0) {
      content += `\u001b[${codes.join(";")}m${span.text}\u001b[0m`;
    } else {
      content += span.text;
    }
  }

  return `\`\`\`ansi\n${content}\n\`\`\``;
}
