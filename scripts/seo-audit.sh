#!/bin/bash

# =============================================================================
# 🔍 Script d'Audit SEO Complet pour le Portfolio
# =============================================================================
# 
# Usage: ./scripts/seo-audit.sh [URL_BASE]
# Exemple: ./scripts/seo-audit.sh https://julestoussenel.com
#
# Ce script génère des rapports Lighthouse pour toutes les pages principales
# =============================================================================

URL_BASE="${1:-http://localhost:3000}"
OUTPUT_DIR="./seo-reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
REPORT_DIR="${OUTPUT_DIR}/${TIMESTAMP}"

# Couleurs pour l'output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              🔍 Audit SEO - Portfolio Jules Toussenel          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}URL Base:${NC} $URL_BASE"
echo -e "${YELLOW}Output:${NC} $REPORT_DIR"
echo ""

# Créer le dossier de rapports
mkdir -p "$REPORT_DIR"

# Pages à auditer
PAGES=(
  "/fr"
  "/en"
  "/fr/projects"
  "/en/projects"
  "/fr/blog"
  "/en/blog"
)

# Fonction pour lancer un audit Lighthouse
run_lighthouse() {
  local path=$1
  local name=$(echo "$path" | tr '/' '-' | sed 's/^-//')
  [ -z "$name" ] && name="home"
  
  echo -e "${GREEN}► Auditing:${NC} ${URL_BASE}${path}"
  
  lighthouse "${URL_BASE}${path}" \
    --output=html,json \
    --output-path="${REPORT_DIR}/${name}" \
    --only-categories=seo,performance,accessibility,best-practices \
    --chrome-flags="--headless --no-sandbox" \
    --quiet
    
  echo -e "  ✓ Report saved: ${name}.report.html"
}

# Lancer les audits
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Starting Lighthouse audits...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

for page in "${PAGES[@]}"; do
  run_lighthouse "$page"
done

# Générer un résumé
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Audit Complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Reports generated in:${NC} $REPORT_DIR"
echo ""
echo -e "Open reports in browser:"
for page in "${PAGES[@]}"; do
  name=$(echo "$page" | tr '/' '-' | sed 's/^-//')
  [ -z "$name" ] && name="home"
  echo "  file://${PWD}/${REPORT_DIR}/${name}.report.html"
done
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Additional Testing Tools:${NC}"
echo "  • Google Rich Results: https://search.google.com/test/rich-results"
echo "  • Schema Validator:    https://validator.schema.org/"
echo "  • PageSpeed Insights:  https://pagespeed.web.dev/"
echo "  • Mobile-Friendly:     https://search.google.com/test/mobile-friendly"
echo "  • Security Headers:    https://securityheaders.com/"
echo ""





