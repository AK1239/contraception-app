#!/usr/bin/env node

/**
 * Generates PWA icon sizes from the app adaptive icon.
 * Run via: npm run generate-pwa-icons
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SOURCE_ICON = path.join(__dirname, "../assets/adaptive-icon.png");
const OUTPUT_DIR = path.join(__dirname, "../public/icons");

const ICONS = [
  { filename: "icon-192.png", size: 192 },
  { filename: "icon-512.png", size: 512 },
  { filename: "apple-touch-icon.png", size: 180 },
  { filename: "icon-512-maskable.png", size: 512, maskable: true },
];

async function createIcon({ filename, size, maskable = false }) {
  const outputPath = path.join(OUTPUT_DIR, filename);

  if (maskable) {
    const innerSize = Math.round(size * 0.65);
    const padding = Math.round((size - innerSize) / 2);
    const foreground = await sharp(SOURCE_ICON)
      .resize(innerSize, innerSize, { fit: "contain" })
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([{ input: foreground, top: padding, left: padding }])
      .png()
      .toFile(outputPath);

    return;
  }

  await sharp(SOURCE_ICON)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toFile(outputPath);
}

async function main() {
  if (!fs.existsSync(SOURCE_ICON)) {
    throw new Error(`Source icon not found: ${SOURCE_ICON}`);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const icon of ICONS) {
    await createIcon(icon);
    console.log(`Generated ${icon.filename}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
