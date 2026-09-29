/**
 * Unicode mathematical alphanumeric symbols for Discord font generation.
 * Maps standard ASCII characters to Unicode styling variants supported by Discord.
 */

export interface FontStyleOption {
  id: string;
  name: string;
  category: string;
  transform: (text: string) => string;
  preview: string;
}

// Small Caps character map
const SMALL_CAPS_MAP: Record<string, string> = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ",
  j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "ǫ", r: "ʀ",
  s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ",
};

// Fullwidth / Monospace character helper
function toFullwidth(text: string): string {
  return text.split("").map((c) => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) {
      return String.fromCharCode(code + 65248);
    }
    return c;
  }).join("");
}

// Helper to offset standard ASCII characters into Unicode plane blocks
function offsetRange(text: string, upperStart: number, lowerStart: number, numberStart?: number): string {
  return text.split("").map((c) => {
    const code = c.charCodeAt(0);
    // A to Z
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(upperStart + (code - 65));
    }
    // a to z
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(lowerStart + (code - 97));
    }
    // 0 to 9
    if (numberStart !== undefined && code >= 48 && code <= 57) {
      return String.fromCodePoint(numberStart + (code - 48));
    }
    return c;
  }).join("");
}

// Circled / Bubble character helper
function toCircled(text: string): string {
  return text.split("").map((c) => {
    const code = c.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
    if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
    if (code === 48) return "⓪";
    return c;
  }).join("");
}

// Inverted / Upside down text helper
const FLIP_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ",
  j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ",
  s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I",
  J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Ò", R: "ᴚ",
  S: "S", T: "┴", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0",
  ".": "˙", ",": "'", "'": ",", "\"": "„", "!": "¡", "?": "¿",
};

export const FONT_STYLES: FontStyleOption[] = [
  {
    id: "small-caps",
    name: "Small Caps",
    category: "Clean",
    transform: (t) => t.toLowerCase().split("").map((c) => SMALL_CAPS_MAP[c] || c).join(""),
    preview: "sᴍᴀʟʟ ᴄᴀᴘs",
  },
  {
    id: "sans-bold",
    name: "Bold Sans",
    category: "Bold",
    transform: (t) => offsetRange(t, 0x1d5d4, 0x1d5ee, 0x1d7ec),
    preview: "𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀",
  },
  {
    id: "serif-bold",
    name: "Bold Serif",
    category: "Bold",
    transform: (t) => offsetRange(t, 0x1d400, 0x1d41a, 0x1d7ce),
    preview: "𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟",
  },
  {
    id: "sans-italic",
    name: "Italic Sans",
    category: "Italic",
    transform: (t) => offsetRange(t, 0x1d608, 0x1d622),
    preview: "𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴",
  },
  {
    id: "monospace",
    name: "Monospace",
    category: "Code",
    transform: (t) => offsetRange(t, 0x1d670, 0x1d68a, 0x1d7f6),
    preview: "𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎",
  },
  {
    id: "script",
    name: "Cursive Script",
    category: "Decorative",
    transform: (t) => offsetRange(t, 0x1d49c, 0x1d4b6),
    preview: "𝒮𝒸𝓇𝒾𝓅𝓉",
  },
  {
    id: "script-bold",
    name: "Bold Cursive",
    category: "Decorative",
    transform: (t) => offsetRange(t, 0x1d4d0, 0x1d4ea),
    preview: "𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽",
  },
  {
    id: "fraktur",
    name: "Gothic / Fraktur",
    category: "Gothic",
    transform: (t) => offsetRange(t, 0x1d504, 0x1d51e),
    preview: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯",
  },
  {
    id: "fraktur-bold",
    name: "Bold Gothic",
    category: "Gothic",
    transform: (t) => offsetRange(t, 0x1d56c, 0x1d586),
    preview: "𝕭𝖔𝖑𝖉 𝕲𝖔𝖙𝖍𝖎𝖈",
  },
  {
    id: "double-struck",
    name: "Double-Struck (Outline)",
    category: "Modern",
    transform: (t) => offsetRange(t, 0x1d538, 0x1d552, 0x1d7d8),
    preview: "𝔻𝕠𝕦𝕓𝕝𝕖-𝕊𝕥𝕣𝕦𝕔𝕜",
  },
  {
    id: "bubble",
    name: "Bubble / Circled",
    category: "Decorative",
    transform: (t) => toCircled(t),
    preview: "ⓑⓤⓑⓑⓛⓔ",
  },
  {
    id: "fullwidth",
    name: "Vaporwave (Fullwidth)",
    category: "Aesthetic",
    transform: (t) => toFullwidth(t),
    preview: "Ｖａｐｏｒｗａｖｅ",
  },
  {
    id: "flip",
    name: "Upside Down",
    category: "Fun",
    transform: (t) => t.split("").reverse().map((c) => FLIP_MAP[c] || c).join(""),
    preview: "uʍop ǝpᴉsd∩",
  },
];
