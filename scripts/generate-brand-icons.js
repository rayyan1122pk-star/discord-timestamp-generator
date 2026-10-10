const sharp = require('sharp');
const fs = require('fs');

// We generate two distinct designs:
// 1. BRAND LOGO / APP ICON (512x512, 192x192, 180x180):
//    Solid deep dark container (#14161B -> #0A0C10) with sharp Discord Blurple mascot & live Emerald timer dial.
// 2. ULTRA-CRISP FAVICON (16x16, 32x32, 48x48, and multi-resolution favicon.ico):
//    Specifically engineered for low-pixel browser tabs:
//    - 100% full-bleed dark square background (#121318) - ZERO TRANSPARENCY, completely solid so it NEVER looks white or cut off.
//    - High-contrast pure white/blurple Discord silhouette perfectly sized to fit 16-48px.
//    - Crisp vibrant emerald accent clock so it pops instantly against both dark and light browser tabs and Google Search result snippets.

const createDarkBrandLogoSvg = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Dark Theme Solid Container -->
    <linearGradient id="brandDarkGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1c1e24" />
      <stop offset="100%" stop-color="#0a0c10" />
    </linearGradient>

    <!-- Discord Blurple Accent Gradient -->
    <linearGradient id="blurpleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5865F2" />
      <stop offset="100%" stop-color="#4752C4" />
    </linearGradient>
  </defs>

  <!-- Solid 100% Opaque Dark Container -->
  <rect width="512" height="512" rx="112" fill="url(#brandDarkGrad)" />

  <!-- Crisp outer border rim for maximum definition -->
  <rect x="4" y="4" width="504" height="504" rx="108" fill="none" stroke="#2D3139" stroke-width="8" />

  <!-- Discord Clyde Mascot (Blurple with pure white eye cutouts) -->
  <g transform="translate(68, 86) scale(15.7)">
    <path fill="url(#blurpleGrad)" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
    <path fill="#FFFFFF" d="M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </g>

  <!-- Dynamic Live Clock Dial in Bottom-Right -->
  <g transform="translate(372, 372)">
    <circle cx="0" cy="0" r="94" fill="#0A0C10" stroke="#2D3139" stroke-width="6" />
    <circle cx="0" cy="0" r="76" fill="#10B981" />
    <circle cx="0" cy="0" r="64" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="6" />
    <line x1="0" y1="0" x2="0" y2="-40" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
    <line x1="0" y1="0" x2="28" y2="4" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
    <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
  </g>
</svg>
`;

// Specially engineered pixel-optimized SVG for Favicons (16px to 48px)
// Uses a 100% full-bleed dark rectangle (zero rounding on outermost edge) so that even if a browser renders the raw square,
// all 4 corners are pitch-dark solid (#0e1015) with an inner rounded glow!
const createFaviconOptimizedSvg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 100% OPAQUE FULL-BLEED SOLID DARK BACKGROUND (Never transparent, always dark!) -->
  <rect width="128" height="128" fill="#0b0e14" />

  <!-- Rounded Tile Container with Subtle Contrast Rim -->
  <rect x="4" y="4" width="120" height="120" rx="28" fill="#151821" stroke="#2e3444" stroke-width="4" />

  <!-- Discord Clyde Logo (Vibrant Blurple) -->
  <g transform="translate(18, 22) scale(4.0)">
    <path fill="#5865F2" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028z" />
    <path fill="#FFFFFF" d="M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </g>

  <!-- Prominent Live Timestamp Clock Badge (Vibrant Emerald with White Hands) -->
  <g transform="translate(92, 92)">
    <circle cx="0" cy="0" r="26" fill="#0b0e14" stroke="#2e3444" stroke-width="3" />
    <circle cx="0" cy="0" r="21" fill="#10B981" />
    <line x1="0" y1="0" x2="0" y2="-12" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" />
    <line x1="0" y1="0" x2="9" y2="1" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" />
    <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
  </g>
</svg>
`;

async function generateAll() {
  const brandSvg = Buffer.from(createDarkBrandLogoSvg());

  // 1. High-resolution App Icons & Logo
  const icon512 = await sharp(brandSvg).resize(512, 512).png().toBuffer();
  fs.writeFileSync('public/icon.png', icon512);
  fs.writeFileSync('src/app/icon.png', icon512);
  fs.writeFileSync('public/logo.png', icon512);

  const icon192 = await sharp(brandSvg).resize(192, 192).png().toBuffer();
  fs.writeFileSync('public/icon-192x192.png', icon192);

  const icon180 = await sharp(brandSvg).resize(180, 180).png().toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', icon180);
  fs.writeFileSync('src/app/apple-icon.png', icon180);
  console.log('[OK] Generated high-res brand icons (512, 192, 180)');

  // 2. Favicons with 100% full-bleed solid dark background (zero transparent edge gap)
  const faviconSvg = Buffer.from(createFaviconOptimizedSvg(128));
  const icon48 = await sharp(faviconSvg).resize(48, 48).png().toBuffer();
  const icon32 = await sharp(faviconSvg).resize(32, 32).png().toBuffer();
  const icon16 = await sharp(faviconSvg).resize(16, 16).png().toBuffer();

  fs.writeFileSync('public/favicon-48x48.png', icon48);
  fs.writeFileSync('public/favicon-32x32.png', icon32);
  fs.writeFileSync('public/favicon-16x16.png', icon16);
  console.log('[OK] Generated favicons (48x48, 32x32, 16x16) with 100% solid dark background');

  // 3. Multi-resolution Windows ICO
  const images = [
    { w: 16, h: 16, buf: icon16 },
    { w: 32, h: 32, buf: icon32 },
    { w: 48, h: 48, buf: icon48 }
  ];

  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;
  let currentOffset = headerSize + dirEntrySize * numImages;

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.w === 256 ? 0 : img.w, 0);
    entry.writeUInt8(img.h === 256 ? 0 : img.h, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buf.length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    entries.push(entry);
    currentOffset += img.buf.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map(i => i.buf)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log('[OK] Generated multi-res favicon.ico with 100% solid dark background');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
