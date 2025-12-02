#!/usr/bin/env node

/**
 * 🔍 Script de Validation SEO Local
 * 
 * Ce script vérifie les éléments SEO essentiels sans serveur externe
 * 
 * Usage: node scripts/validate-seo.js
 */

const fs = require("fs");
const path = require("path");

// Couleurs ANSI
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: (msg) =>
    console.log(`\n${colors.cyan}${colors.bold}${msg}${colors.reset}\n`),
};

let totalChecks = 0;
let passedChecks = 0;

function check(condition, successMsg, errorMsg) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    log.success(successMsg);
    return true;
  } else {
    log.error(errorMsg);
    return false;
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

function fileContains(filePath, searchString) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
    return content.includes(searchString);
  } catch {
    return false;
  }
}

console.log(`
${colors.cyan}╔════════════════════════════════════════════════════════════════╗
║           🔍 SEO Validation - Portfolio Jules Toussenel        ║
╚════════════════════════════════════════════════════════════════╝${colors.reset}
`);

// =============================================================================
// 1. Fichiers SEO Essentiels
// =============================================================================
log.header("📁 1. Fichiers SEO Essentiels");

check(
  fileExists("app/sitemap.ts"),
  "sitemap.ts existe",
  "sitemap.ts manquant - Créez app/sitemap.ts"
);

check(
  fileExists("app/robots.ts"),
  "robots.ts existe",
  "robots.ts manquant - Créez app/robots.ts"
);

check(
  fileExists("app/manifest.ts"),
  "manifest.ts existe (PWA)",
  "manifest.ts manquant - Créez app/manifest.ts"
);

check(
  fileExists("app/feed.xml/route.ts"),
  "RSS Feed existe",
  "RSS Feed manquant - Créez app/feed.xml/route.ts"
);

check(
  fileExists("app/atom.xml/route.ts"),
  "Atom Feed existe",
  "Atom Feed manquant - Créez app/atom.xml/route.ts"
);

check(
  fileExists("public/humans.txt"),
  "humans.txt existe",
  "humans.txt manquant (optionnel)"
);

check(
  fileExists("public/browserconfig.xml"),
  "browserconfig.xml existe",
  "browserconfig.xml manquant (optionnel)"
);

// =============================================================================
// 2. JSON-LD Structured Data
// =============================================================================
log.header("📊 2. JSON-LD Structured Data");

check(
  fileExists("components/json-ld.tsx"),
  "Person/WebSite JSON-LD existe",
  "json-ld.tsx manquant"
);

check(
  fileExists("components/faq-json-ld.tsx"),
  "FAQ JSON-LD existe",
  "faq-json-ld.tsx manquant"
);

check(
  fileExists("components/collection-page-json-ld.tsx"),
  "CollectionPage JSON-LD existe",
  "collection-page-json-ld.tsx manquant"
);

check(
  fileExists("components/breadcrumb-with-json-ld.tsx"),
  "Breadcrumb JSON-LD existe",
  "breadcrumb-with-json-ld.tsx manquant"
);

check(
  fileExists("components/project-json-ld.tsx"),
  "Project JSON-LD existe",
  "project-json-ld.tsx manquant"
);

check(
  fileExists("components/blog-post-json-ld.tsx"),
  "BlogPost JSON-LD existe",
  "blog-post-json-ld.tsx manquant"
);

// Vérifier le contenu des JSON-LD
check(
  fileContains("components/json-ld.tsx", "@context"),
  "JSON-LD contient @context",
  "JSON-LD mal formé - @context manquant"
);

check(
  fileContains("components/json-ld.tsx", "Person"),
  "Person schema présent",
  "Person schema manquant dans json-ld.tsx"
);

check(
  fileContains("components/json-ld.tsx", "WebSite"),
  "WebSite schema présent",
  "WebSite schema manquant dans json-ld.tsx"
);

check(
  fileContains("components/json-ld.tsx", "SearchAction"),
  "SearchAction présent (Sitelinks)",
  "SearchAction manquant - Pas de Sitelinks Search Box"
);

// =============================================================================
// 3. Images OG Dynamiques
// =============================================================================
log.header("🖼️ 3. Images OpenGraph Dynamiques");

check(
  fileExists("app/[locale]/opengraph-image.tsx"),
  "OG Image locale existe",
  "OG Image locale manquante"
);

check(
  fileExists("app/[locale]/projects/[slug]/opengraph-image.tsx"),
  "OG Image projets existe",
  "OG Image projets manquante"
);

check(
  fileExists("app/[locale]/blog/[slug]/opengraph-image.tsx"),
  "OG Image blog existe",
  "OG Image blog manquante"
);

// =============================================================================
// 4. PWA Icons
// =============================================================================
log.header("📱 4. PWA Icons");

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
let iconsFound = 0;

for (const size of iconSizes) {
  if (fileExists(`public/icons/icon-${size}x${size}.png`)) {
    iconsFound++;
  }
}

check(
  iconsFound === iconSizes.length,
  `Toutes les icônes PWA présentes (${iconsFound}/${iconSizes.length})`,
  `Icônes PWA manquantes (${iconsFound}/${iconSizes.length}) - Lancez: node scripts/generate-icons.js`
);

// =============================================================================
// 5. Métadonnées Layout
// =============================================================================
log.header("🏷️ 5. Métadonnées dans Layout");

const layoutPath = "app/[locale]/layout.tsx";

check(
  fileContains(layoutPath, "metadataBase"),
  "metadataBase défini",
  "metadataBase manquant dans layout.tsx"
);

check(
  fileContains(layoutPath, "openGraph"),
  "OpenGraph configuré",
  "OpenGraph manquant dans layout.tsx"
);

check(
  fileContains(layoutPath, "twitter"),
  "Twitter Cards configuré",
  "Twitter Cards manquant dans layout.tsx"
);

check(
  fileContains(layoutPath, "alternates"),
  "Alternates/hreflang configuré",
  "Alternates manquant dans layout.tsx"
);

check(
  fileContains(layoutPath, "robots"),
  "Robots meta configuré",
  "Robots meta manquant dans layout.tsx"
);

check(
  fileContains(layoutPath, "preconnect"),
  "Preconnect configuré",
  "Preconnect manquant - Performance impactée"
);

check(
  fileContains(layoutPath, "dns-prefetch"),
  "DNS Prefetch configuré",
  "DNS Prefetch manquant - Performance impactée"
);

// =============================================================================
// 6. Security Headers
// =============================================================================
log.header("🔒 6. Security Headers");

const configPath = "next.config.ts";

check(
  fileContains(configPath, "Strict-Transport-Security"),
  "HSTS configuré",
  "HSTS manquant dans next.config.ts"
);

check(
  fileContains(configPath, "X-Content-Type-Options"),
  "X-Content-Type-Options configuré",
  "X-Content-Type-Options manquant"
);

check(
  fileContains(configPath, "X-Frame-Options"),
  "X-Frame-Options configuré",
  "X-Frame-Options manquant"
);

check(
  fileContains(configPath, "Referrer-Policy"),
  "Referrer-Policy configuré",
  "Referrer-Policy manquant"
);

// =============================================================================
// 7. Accessibilité SEO
// =============================================================================
log.header("♿ 7. Accessibilité SEO");

check(
  fileContains(layoutPath, "skip") || fileContains(layoutPath, "Skip"),
  "Skip link présent",
  "Skip link manquant - Accessibilité impactée"
);

check(
  fileContains("components/layout/section.tsx", "aria-label"),
  "aria-label sur les sections",
  "aria-label manquant sur les sections"
);

check(
  fileContains("components/layout/footer.tsx", "role="),
  "Roles ARIA dans footer",
  "Roles ARIA manquants dans footer"
);

// =============================================================================
// 8. Robots.txt Configuration
// =============================================================================
log.header("🤖 8. Configuration Robots.txt");

check(
  fileContains("app/robots.ts", "Googlebot"),
  "Règles Googlebot spécifiques",
  "Règles Googlebot manquantes"
);

check(
  fileContains("app/robots.ts", "GPTBot"),
  "Blocage AI bots configuré",
  "AI bots non bloqués (optionnel)"
);

check(
  fileContains("app/robots.ts", "sitemap"),
  "Sitemap référencé dans robots",
  "Sitemap non référencé dans robots.ts"
);

// =============================================================================
// Résumé Final
// =============================================================================
console.log(`
${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}
`);

const percentage = Math.round((passedChecks / totalChecks) * 100);
const scoreColor = percentage >= 90 ? colors.green : percentage >= 70 ? colors.yellow : colors.red;

console.log(`${colors.bold}📊 Score SEO Local: ${scoreColor}${passedChecks}/${totalChecks} (${percentage}%)${colors.reset}`);

if (percentage >= 90) {
  console.log(`\n${colors.green}🎉 Excellent! Ton SEO est optimisé au maximum.${colors.reset}`);
} else if (percentage >= 70) {
  console.log(`\n${colors.yellow}👍 Bon travail! Quelques améliorations possibles.${colors.reset}`);
} else {
  console.log(`\n${colors.red}⚠️ Attention! Des optimisations SEO importantes sont manquantes.${colors.reset}`);
}

console.log(`
${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}

${colors.bold}🔗 Outils de Test en Ligne:${colors.reset}

  ${colors.blue}Rich Results Test:${colors.reset}
  https://search.google.com/test/rich-results?url=https://julestoussenel.com/fr

  ${colors.blue}Schema Validator:${colors.reset}
  https://validator.schema.org/

  ${colors.blue}PageSpeed Insights:${colors.reset}
  https://pagespeed.web.dev/analysis?url=https://julestoussenel.com/fr

  ${colors.blue}Mobile-Friendly Test:${colors.reset}
  https://search.google.com/test/mobile-friendly?url=https://julestoussenel.com/fr

  ${colors.blue}Security Headers:${colors.reset}
  https://securityheaders.com/?q=julestoussenel.com

  ${colors.blue}SSL Labs:${colors.reset}
  https://www.ssllabs.com/ssltest/analyze.html?d=julestoussenel.com

  ${colors.blue}Meta Tags Inspector:${colors.reset}
  https://metatags.io/?url=https://julestoussenel.com/fr

  ${colors.blue}Open Graph Debugger (Facebook):${colors.reset}
  https://developers.facebook.com/tools/debug/?q=https://julestoussenel.com/fr

  ${colors.blue}Twitter Card Validator:${colors.reset}
  https://cards-dev.twitter.com/validator

  ${colors.blue}LinkedIn Post Inspector:${colors.reset}
  https://www.linkedin.com/post-inspector/inspect/https://julestoussenel.com/fr

${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}
`);




