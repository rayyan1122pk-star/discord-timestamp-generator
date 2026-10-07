const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Google Favicon guideline:
// Must be a multiple of 48px square, e.g. 48x48, 96x96, 144x144, 192x192, 512x512.
// Must have contrast against both dark and light search engine themes (often rendered inside a 16x16 circle).
// By giving the icon a full solid rounded-square base in Discord's signature Blurple (#5865F2),
// it will NEVER appear as a raw white blob cut in half by Google's circular mask!

const createIconSvg = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Premium Discord Blurple Gradient -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#5865F2" />
      <stop offset="100%" stop-color="#4752C4" />
    </linearGradient>

    <!-- Accent Emerald/Cyan Gradient for Timestamp Dial -->
    <linearGradient id="clockGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3BA55C" />
      <stop offset="100%" stop-color="#237F41" />
    </linearGradient>
  </defs>

  <!-- Discord Brand Solid Rounded Square Container (guarantees contrast on Google Search) -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Inner subtle border highlight -->
  <rect x="4" y="4" width="504" height="504" rx="108" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="8" />

  <!-- Discord Clyde Mascot (Centered & Proportioned) -->
  <g transform="translate(68, 86) scale(15.7)">
    <path fill="#FFFFFF" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </g>

  <!-- Dynamic Timestamp Clock Badge (Bottom-Right) -->
  <g transform="translate(372, 372)">
    <!-- Dark outer ring to give clean contrast separation from Clyde -->
    <circle cx="0" cy="0" r="92" fill="#18191C" />
    <!-- Vibrant Emerald / Mint live time indicator dial -->
    <circle cx="0" cy="0" r="76" fill="#10B981" />
    <!-- Clock border ring -->
    <circle cx="0" cy="0" r="64" fill="none" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="6" />
    <!-- Minute/Hour hands showing active dynamic clock -->
    <line x1="0" y1="0" x2="0" y2="-40" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
    <line x1="0" y1="0" x2="28" y2="4" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" />
    <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
  </g>
</svg>
`;

async function generateAll() {
  const svgBuffer = Buffer.from(createIconSvg());
  
  // 1. Generate 512x512 PNG (public/icon.png and src/app/icon.png)
  const icon512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync('public/icon.png', icon512);
  fs.writeFileSync('src/app/icon.png', icon512);
  fs.writeFileSync('public/logo.png', icon512);
  console.log('[OK] 512x512 icon.png & logo.png generated');

  // 2. Generate 192x192 PNG (standard PWA / Android / Google search crawler icon)
  const icon192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync('public/icon-192x192.png', icon192);
  console.log('[OK] 192x192 icon generated');

  // 3. Generate 180x180 Apple Touch Icon (public/apple-touch-icon.png and src/app/apple-icon.png)
  const icon180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync('public/apple-touch-icon.png', icon180);
  fs.writeFileSync('src/app/apple-icon.png', icon180);
  console.log('[OK] 180x180 apple-touch-icon.png generated');

  // 4. Generate 48x48 Favicon (Google's designated size)
  const icon48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  fs.writeFileSync('public/favicon-48x48.png', icon48);

  // 5. Generate 32x32 & 16x16 Favicons
  const icon32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const icon16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  fs.writeFileSync('public/favicon-32x32.png', icon32);
  fs.writeFileSync('public/favicon-16x16.png', icon16);
  console.log('[OK] 48x48, 32x32, 16x16 favicons generated');

  // 6. Generate multi-resolution Windows ICO containing 16x16, 32x32, and 48x48 PNG chunks
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
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buf.length, 8); // size of image data
    entry.writeUInt32LE(currentOffset, 12); // offset of image data
    entries.push(entry);
    currentOffset += img.buf.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(numImages, 4); // number of images

  const icoBuffer = Buffer.concat([header, ...entries, ...images.map(i => i.buf)]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  console.log('[OK] favicon.ico (multi-resolution 16/32/48) generated');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
