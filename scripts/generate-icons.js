/**
 * Script pour générer les icônes PWA à partir du SVG source
 *
 * Prérequis:
 * npm install sharp
 *
 * Usage:
 * node scripts/generate-icons.js
 *
 * Ce script génère les icônes aux tailles suivantes:
 * - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
 */

const fs = require("fs");
const path = require("path");

// SVG source
const svgSource = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="512" height="512" fill="#222428"/>
<circle cx="256" cy="256" r="200" fill="#FFA200"/>
<path d="M193 330V296.055L301.152 249.89V262.11L193 215.945V182L318 235.497V276.503L193 330Z" fill="#222428"/>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, "../public/icons");

// Créer le dossier si nécessaire
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    // Essayer d'utiliser sharp si disponible
    const sharp = require("sharp");

    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);

      await sharp(Buffer.from(svgSource))
        .resize(size, size)
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated: icon-${size}x${size}.png`);
    }

    console.log("\\n✨ All icons generated successfully!");
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      console.log("⚠️  Sharp not installed. Creating placeholder icons...");
      console.log("   Run: npm install sharp");
      console.log("   Then: node scripts/generate-icons.js");

      // Créer des placeholders SVG en attendant
      for (const size of sizes) {
        const svgPath = path.join(outputDir, `icon-${size}x${size}.svg`);
        const resizedSvg = svgSource
          .replace(/width="512"/g, `width="${size}"`)
          .replace(/height="512"/g, `height="${size}"`);
        fs.writeFileSync(svgPath, resizedSvg);
        console.log(`✓ Created placeholder: icon-${size}x${size}.svg`);
      }
    } else {
      throw error;
    }
  }
}

generateIcons();



