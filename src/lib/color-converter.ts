/**
 * Discord Color Converter Utilities.
 * Converts between HEX, Decimal (Discord API embed color), RGB, HSL, and official Discord Brand Role Colors.
 */

export interface ColorConversionResult {
  hex: string;          // e.g. "#5865F2"
  decimal: number;      // e.g. 5793266
  rgb: { r: number; g: number; b: number };
  rgbString: string;    // e.g. "rgb(88, 101, 242)"
  hsl: { h: number; s: number; l: number };
  hslString: string;    // e.g. "hsl(235, 86%, 65%)"
  discordJs: string;    // e.g. ".setColor(0x5865F2)" or ".setColor(5793266)"
  discordPy: string;    // e.g. "discord.Color(0x5865F2)" or "discord.Color(5793266)"
  isValid: boolean;
}

export interface PresetDiscordColor {
  name: string;
  category: "brand" | "roles" | "status";
  hex: string;
  decimal: number;
  description: string;
}

export const OFFICIAL_DISCORD_COLORS: PresetDiscordColor[] = [
  // Official Discord Brand Colors
  { name: "Blurple (Primary)", category: "brand", hex: "#5865F2", decimal: 5793266, description: "Official primary Discord Blurple accent" },
  { name: "Green / Emerald", category: "brand", hex: "#57F287", decimal: 5763719, description: "Official success & online indicator green" },
  { name: "Yellow / Gold", category: "brand", hex: "#FEE75C", decimal: 16705372, description: "Official idle & warning golden yellow" },
  { name: "Fuchsia / Pink", category: "brand", hex: "#EB459E", decimal: 15418782, description: "Official Nitro booster & celebration pink" },
  { name: "Red / Coral", category: "brand", hex: "#ED4245", decimal: 15548997, description: "Official DND & destructive action red" },
  { name: "White", category: "brand", hex: "#FFFFFF", decimal: 16777215, description: "Pure white foreground / embed border" },
  { name: "Dark Theme Slate", category: "brand", hex: "#2B2D31", decimal: 2829617, description: "Discord chat dark theme surface container" },
  { name: "Darker Charcoal", category: "brand", hex: "#1E1F22", decimal: 1974050, description: "Discord client background base" },

  // Role Color Presets
  { name: "Admin Crimson", category: "roles", hex: "#E74C3C", decimal: 15158332, description: "Classic server administrator role red" },
  { name: "Moderator Teal", category: "roles", hex: "#1ABC9C", decimal: 1752220, description: "Standard moderation staff teal" },
  { name: "Bot Developer Blue", category: "roles", hex: "#3498DB", decimal: 3447003, description: "Verified developer role blue" },
  { name: "VIP Royal Purple", category: "roles", hex: "#9B59B6", decimal: 10181046, description: "High tier donor / subscriber purple" },
  { name: "Event Host Orange", category: "roles", hex: "#E67E22", decimal: 15105570, description: "Community event organizer orange" },
  { name: "Server Booster Pink", category: "roles", hex: "#F47FFF", decimal: 16023551, description: "Level 3 server booster bright pink" },
  { name: "Invisible / Dark Theme Match", category: "roles", hex: "#2F3136", decimal: 3092790, description: "Old client transparent-matching color" },

  // Status & System Colors
  { name: "Online Status", category: "status", hex: "#23A55A", decimal: 2336090, description: "Active online green indicator" },
  { name: "Idle Status", category: "status", hex: "#F0B232", decimal: 15774258, description: "Away from keyboard idle amber" },
  { name: "DND Status", category: "status", hex: "#F23F43", decimal: 15875907, description: "Do Not Disturb badge crimson" },
  { name: "Streaming Purple", category: "status", hex: "#593695", decimal: 5846677, description: "Twitch streaming activity purple" },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9A-Fa-f]{6}$/.test(clean)) {
    if (/^[0-9A-Fa-f]{3}$/.test(clean)) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return { r, g, b };
    }
    return null;
  }
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const normR = r / 255;
  const normG = g / 255;
  const normB = b / 255;
  const max = Math.max(normR, normG, normB);
  const min = Math.min(normR, normG, normB);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case normR:
        h = (normG - normB) / d + (normG < normB ? 6 : 0);
        break;
      case normG:
        h = (normB - normR) / d + 2;
        break;
      case normB:
        h = (normR - normG) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hexToDecimal(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
}

export function decimalToHex(decimal: number): string {
  const safe = Math.max(0, Math.min(16777215, Math.floor(decimal)));
  return `#${safe.toString(16).padStart(6, "0").toUpperCase()}`;
}

export function convertColor(input: string | number): ColorConversionResult {
  let hex = "#5865F2";
  let isValid = true;

  if (typeof input === "number") {
    if (isNaN(input) || input < 0 || input > 16777215) {
      isValid = false;
      hex = "#5865F2";
    } else {
      hex = decimalToHex(input);
    }
  } else {
    const trimmed = input.trim();
    // Check if numeric decimal passed as string
    if (/^\d+$/.test(trimmed)) {
      const dec = parseInt(trimmed, 10);
      if (dec >= 0 && dec <= 16777215) {
        hex = decimalToHex(dec);
      } else {
        isValid = false;
      }
    } else if (trimmed.startsWith("#") || /^[0-9A-Fa-f]{3,6}$/.test(trimmed)) {
      const parsedRgb = hexToRgb(trimmed);
      if (parsedRgb) {
        hex = rgbToHex(parsedRgb.r, parsedRgb.g, parsedRgb.b);
      } else {
        isValid = false;
      }
    } else {
      isValid = false;
    }
  }

  const rgb = hexToRgb(hex) || { r: 88, g: 101, b: 242 };
  const decimal = hexToDecimal(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cleanHex = hex.replace("#", "");

  return {
    hex,
    decimal,
    rgb,
    rgbString: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl,
    hslString: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    discordJs: `.setColor(0x${cleanHex})`,
    discordPy: `discord.Color(0x${cleanHex})`,
    isValid,
  };
}
