/**
 * Unicode Combining Diacritical Marks for Glitch / Zalgo Text Generation
 * 100% Client-Side Algorithm
 */

export const ZALGO_UP: string[] = [
  "\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310",
  "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0342", "\u0343",
  "\u0344", "\u034a", "\u034b", "\u034c", "\u0350", "\u0300", "\u0301", "\u0302",
  "\u0303", "\u030b", "\u030c", "\u0312", "\u0313", "\u0314", "\u033d", "\u0309",
  "\u0363", "\u0364", "\u0365", "\u0366", "\u0367", "\u0368", "\u0369", "\u036a",
  "\u036b", "\u036c", "\u036d", "\u036e", "\u036f",
];

export const ZALGO_DOWN: string[] = [
  "\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f",
  "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a", "\u032b", "\u032c",
  "\u032d", "\u032e", "\u032f", "\u0330", "\u0331", "\u0332", "\u0333", "\u0339",
  "\u033a", "\u033b", "\u033c", "\u0345", "\u0347", "\u0348", "\u0349", "\u034d",
  "\u034e", "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323",
];

export const ZALGO_MID: string[] = [
  "\u0315", "\u031b", "\u0340", "\u0341", "\u0358", "\u0321", "\u0322", "\u0327",
  "\u0328", "\u0334", "\u0335", "\u0336", "\u0337", "\u0338", "\u0360", "\u0361",
  "\u033e",
];

export interface ZalgoOptions {
  up: boolean;
  mid: boolean;
  down: boolean;
  intensity: number; // 1 to 20
}

function getRandomMark(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateZalgo(text: string, options: ZalgoOptions): string {
  if (!text) return "";

  const { up, mid, down, intensity } = options;
  const result: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result.push(char);

    // Skip applying diacritics to whitespace or existing diacritical marks
    if (char === " " || char === "\n" || char === "\t") {
      continue;
    }

    if (up) {
      const count = Math.floor(Math.random() * (intensity + 1));
      for (let j = 0; j < count; j++) {
        result.push(getRandomMark(ZALGO_UP));
      }
    }

    if (mid) {
      const count = Math.floor(Math.random() * (Math.floor(intensity / 2) + 1));
      for (let j = 0; j < count; j++) {
        result.push(getRandomMark(ZALGO_MID));
      }
    }

    if (down) {
      const count = Math.floor(Math.random() * (intensity + 1));
      for (let j = 0; j < count; j++) {
        result.push(getRandomMark(ZALGO_DOWN));
      }
    }
  }

  return result.join("");
}
