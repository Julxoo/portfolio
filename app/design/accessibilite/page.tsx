import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Accessibilité — Design",
  description:
    "WCAG 2.2 AA comme plancher, AAA en cherry-pick sur contraste et focus. RGAA 4.1 en méthode de test. 18 points de checklist, palette contrastée, composants auditées.",
};

type Contrast = {
  couple: string;
  ratio: string;
  aa: string;
  aaa: string;
  usage: string;
};

const CONTRASTS: Contrast[] = [
  { couple: "ink #1F1F1B / bg #F4F1E8", ratio: "14.5 : 1", aa: "✓", aaa: "✓", usage: "Corps de texte, titres — AAA confortable" },
  { couple: "ink/80 / bg", ratio: "≈ 8.4 : 1", aa: "✓", aaa: "✓", usage: "Texte secondaire, accroches" },
  { couple: "ink/70 / bg", ratio: "≈ 6.1 : 1", aa: "✓", aaa: "~", usage: "Légendes, métadonnées" },
  { couple: "ink/65 / bg", ratio: "≈ 5.2 : 1", aa: "✓", aaa: "~", usage: "Labels, small-caps secondaires" },
  { couple: "ink/50 / bg", ratio: "≈ 3.9 : 1", aa: "texte large uniquement", aaa: "✗", usage: "À réserver texte ≥ 18.66 px bold ou 24 px regular" },
  { couple: "accent-deep #8C6A4A / bg", ratio: "4.6 : 1", aa: "✓", aaa: "✗", usage: "Liens, CTA — OK en AA normal" },
  { couple: "surface #535040 / bg", ratio: "7.1 : 1", aa: "✓", aaa: "✓", usage: "Accent principal DA — AAA limite" },
  { couple: "muted #A8A189 / bg", ratio: "2.7 : 1", aa: "✗", aaa: "✗", usage: "INTERDIT pour texte. Seulement bordures décoratives." },
];

type Audit = {
  component: string;
  risk: string;
  verdict: string;
};

const AUDIT: Audit[] = [
  { component: "Header scroll-aware", risk: "Si on masquait via display:none, perte du skip-link. Risque évité.", verdict: "OK — transform: translateY(-100%) conservé. Header reste focusable, le focus remet visible." },
  { component: "MobileMenu (disclosure)", risk: "Focus trap manquant, focus retour manquant.", verdict: "Corrigé — inert sur siblings, focus sur Fermer à l'ouverture, retour au burger à la fermeture, Escape déjà géré." },
  { component: "Form — erreurs role=alert", risk: "Si erreurs live (onBlur), role=alert devient trop verbeux pour lecteur d'écran.", verdict: "Conforme — on valide onSubmit uniquement, focus programmatique sur premier invalide + aria-invalid + aria-describedby." },
  { component: "Card (::after { inset: 0 })", risk: "Sélection texte impossible (compromis accepté). Risque d'annonce verbeuse si on wrap tout.", verdict: "OK — <a> wrap seulement le titre, ::after étend la zone cliquable. Screen reader annonce juste le titre." },
  { component: "Blockquote / pull-quote", risk: "Utilisation de <q> insère auto des guillemets (duplication).", verdict: "OK — on utilise <blockquote> + <cite>, jamais <q>." },
  { component: "Marginalia (notes de marge)", risk: "Screen readers lisent en ordre DOM. Marginalia placée après un § sera lue hors contexte.", verdict: "À surveiller — positionner la marginalia juste après la phrase référencée dans le DOM, pas en bloc séparé." },
  { component: "<abbr title>", risk: "title attribute n'est pas fiable — caché au tactile, clavier seul, la plupart des screen readers.", verdict: "Limiter à du décoratif — définir la première mention complète dans le texte pour l'info essentielle." },
  { component: "Skip link", risk: "<main> sans tabIndex = focus ne se pose pas toujours.", verdict: "Corrigé — <main id='main' tabIndex={-1}> dans layout.tsx + focus-visible:outline-none pour ne pas voir l'outline." },
  { component: "Lenis (reduced-motion)", risk: "Aucun — Lenis ne se monte pas avec prefers-reduced-motion.", verdict: "OK — scroll natif honnête, scroll clavier (Space, PgUp/Dn) fonctionne." },
];

type Check = {
  n: string;
  area: string;
  test: string;
};

const CHECKLIST: Check[] = [
  { n: "01", area: "Clavier", test: "Premier Tab → skip link visible, focusable, va à #main." },
  { n: "02", area: "Clavier", test: "Ordre de tab logique (suit l'ordre visuel) sur home, /design/*, formulaires." },
  { n: "03", area: "Clavier", test: "Aucun piège focus — on peut sortir de tout composant avec Tab." },
  { n: "04", area: "Clavier", test: "MobileMenu : ouvre avec Enter, Escape ferme, focus retourne au burger." },
  { n: "05", area: "Clavier", test: "Anchor hash (#id) → focus se pose sur la cible, pas seulement viewport." },
  { n: "06", area: "Clavier", test: "Focus visible systématique (outline 2 px accent-deep offset 3 px), jamais outline:none." },
  { n: "07", area: "Screen reader", test: "<html lang='fr'> prononce en français. VoiceOver + NVDA." },
  { n: "08", area: "Screen reader", test: "Structure headings linéaire : 1× h1 par page, pas de saut (h2 → h4 interdit)." },
  { n: "09", area: "Screen reader", test: "Landmarks : <header>, <nav>, <main id='main'>, <footer>." },
  { n: "10", area: "Screen reader", test: "Liens et boutons annoncés avec leur texte lisible (pas « lien lien lien »)." },
  { n: "11", area: "Screen reader", test: "Chaque input a un label associé (for/id ou wrap). Erreurs lisibles via aria-describedby." },
  { n: "12", area: "Screen reader", test: "alt descriptif ou alt='' pour les images décoratives. Jamais 'photo de…' ou 'image de…'." },
  { n: "13", area: "Screen reader", test: "Anglicismes persistants ont lang='en' (« design system », « open source »)." },
  { n: "14", area: "Motion", test: "prefers-reduced-motion: reduce → Lenis off, transitions ≤ 0.01 s." },
  { n: "15", area: "Zoom", test: "Zoom 200 % → pas de débord horizontal, pas de texte coupé." },
  { n: "16", area: "Zoom", test: "Zoom 400 % (WCAG 1.4.10 Reflow) → contenu reste lisible en colonne unique." },
  { n: "17", area: "Contraste", test: "Tous les textes ≥ 4.5 : 1 (AA) — vérifier avec DevTools ou axe." },
  { n: "18", area: "Cibles", test: "Liens/boutons ≥ 24 × 24 CSS px (WCAG 2.5.8). Inline dans texte exempt." },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_A11Y: Banned[] = [
  { n: "01", title: "outline: none sans focus custom", reason: "WCAG 2.4.7. Erreur #1 des audits WebAIM Million. Bannie sans exception." },
  { n: "02", title: "<div onClick> pour un bouton", reason: "Pas focusable, pas de support clavier natif, screen reader ne l'annonce pas comme bouton." },
  { n: "03", title: "role='button' sur <a> ou role='link' sur <button>", reason: "Contredit le rôle natif et confond les assistances (Adrian Roselli)." },
  { n: "04", title: "alt='' sur image informative (ou alt='logo' redondant)", reason: "53 % des sites ont des alt manquants/mauvais selon WebAIM Million 2026." },
  { n: "05", title: "Couleur seule pour signaler erreur/succès", reason: "WCAG 1.4.1 Use of Color. Daltoniens ne voient pas le signal." },
  { n: "06", title: "<abbr title> pour info essentielle", reason: "title attribute pas lu par screen readers, pas accessible clavier/tactile (Heydon Pickering)." },
  { n: "07", title: "aria-label qui duplique le texte visible", reason: "Sur-annoncé. Règle : si le label visible suffit, pas d'aria-label." },
  { n: "08", title: "Placeholder comme label", reason: "Disparaît au focus, pas de label persistant. WCAG 1.3.1." },
  { n: "09", title: "Carousel / auto-play sans contrôle pause", reason: "WCAG 2.2.2 — vestibular risk aussi." },
  { n: "10", title: "tabindex > 0", reason: "Casse l'ordre DOM. Uniquement 0 (focusable) ou -1 (programmatique)." },
];

export default function Accessibilite() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Accessibilité" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Test de maturité, pas d&apos;ajout moral.
          </p>
          <h1 className="font-display text-display text-ink max-w-[18ch] mb-10">
            WCAG 2.2 <em className="italic text-surface">AA</em>, tenue sans
            excuse.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            L&apos;accessibilité n&apos;est pas un bolt-on moral — c&apos;est
            un test de maturité du design. Chaque choix (cible, contraste,
            ordre focus) est déjà une décision d&apos;interface. Sur un
            portfolio freelance haut de gamme FR, viser la conformité, c&apos;est
            démontrer la même rigueur artisanale que sur la typographie. Le
            site n&apos;est pas soumis au RGAA légalement, mais on adopte{" "}
            <strong>WCAG 2.2 AA</strong> comme plancher et on vise{" "}
            <strong>AAA</strong> sur le contraste corps et le focus.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>WCAG 2.2 AA plancher</span>
            <span>AAA sur contraste et focus</span>
            <span>18 points de checklist</span>
            <span>Composants audités</span>
          </div>
        </div>
      </section>

      {/* 01 — NIVEAU VISÉ */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Niveau visé — WCAG 2.2 AA + AAA ciblé" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Plancher — WCAG 2.2 AA</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                Publié octobre 2023. Nine critères ajoutés vs 2.1, dont
                six AA pertinents ici :{" "}
                <strong>2.4.11</strong> Focus Not Obscured,{" "}
                <strong>2.5.7</strong> Dragging Movements,{" "}
                <strong>2.5.8</strong> Target Size 24×24,{" "}
                <strong>3.2.6</strong> Consistent Help,{" "}
                <strong>3.3.7</strong> Redundant Entry.
              </p>
              <p className="text-caption text-ink/65 max-w-[36ch]">
                Non négociable. C&apos;est la base technique.
              </p>
            </div>
            <div>
              <Eyebrow>Cherry-pick — AAA</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                On vise AAA sur deux critères :{" "}
                <strong>1.4.6</strong> Contrast Enhanced (7 : 1 texte
                corps — déjà 14.5 : 1 avec notre palette) et{" "}
                <strong>2.4.13</strong> Focus Appearance (outline
                épais, contraste 3 : 1 avec fond adjacent).
              </p>
              <p className="text-caption text-ink/65 max-w-[36ch]">
                AAA intégral est irréaliste (contraintes sur niveau de
                lecture, expressions idiomatiques) — on cherry-pick.
              </p>
            </div>
            <div>
              <Eyebrow>Méthode — RGAA 4.1</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                Le <strong>Référentiel général d&apos;amélioration de
                l&apos;accessibilité</strong> n&apos;est pas obligatoire
                pour un freelance privé, mais sa force est sa méthode :
                106 critères organisés par thématique concrète — images,
                cadres, formulaires, langue.
              </p>
              <p className="text-caption text-ink/65 max-w-[36ch]">
                On l&apos;utilise comme checklist de vérification, pas
                comme obligation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — CONTRASTES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Contrastes calculés — palette Pinède sur toile" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Ratios calculés avec la formule WCAG (relative luminance) sur
            la toile de lin{" "}
            <code className="font-mono text-accent-deep">#F4F1E8</code> (L ≈
            0.893). Le corps de texte atteint AAA naturellement. Les
            couleurs à opacité réduite sont cadrées par usage.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_2.4fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Couple</div>
              <div>Ratio</div>
              <div>AA 4.5 : 1</div>
              <div>AAA 7 : 1</div>
              <div>Usage</div>
            </div>
            {CONTRASTS.map((c) => (
              <div
                key={c.couple}
                className="grid md:grid-cols-[2fr_1fr_1fr_1fr_2.4fr] gap-6 py-4 border-b border-rule last:border-b-0 items-baseline"
              >
                <code className="font-mono text-caption text-ink">
                  {c.couple}
                </code>
                <code className="font-mono text-caption text-accent-deep">
                  {c.ratio}
                </code>
                <div className="font-sans text-caption text-ink/80">
                  {c.aa}
                </div>
                <div className="font-sans text-caption text-ink/80">
                  {c.aaa}
                </div>
                <div className="text-caption text-ink/75">{c.usage}</div>
              </div>
            ))}
          </div>

          <p className="text-body text-ink/75 max-w-[58ch] mt-12 pt-6 border-t border-rule-strong">
            <strong>Décision d&apos;application&nbsp;:</strong> la couleur{" "}
            <code className="font-mono text-accent-deep">muted</code> à
            100 % est interdite pour tout texte (ratio 2.7 : 1 — sous AA
            pour tous les formats). Un audit sed a remplacé toutes les
            occurrences{" "}
            <code className="font-mono text-accent-deep">text-muted</code>{" "}
            par <code className="font-mono text-accent-deep">
              text-ink/65
            </code>{" "}
            ou équivalent sur les 23 fichiers du projet. La couleur reste
            utilisable pour des bordures décoratives non informatives.
          </p>
        </div>
      </section>

      {/* 03 — AUDIT DES COMPOSANTS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Audit des composants existants" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque composant construit a été audité pour ses risques
            d&apos;accessibilité propres. Neuf éléments passés en revue,
            verdict pour chacun.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.2fr_2fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Composant</div>
              <div>Risque identifié</div>
              <div>Verdict / action</div>
            </div>
            {AUDIT.map((a) => (
              <div
                key={a.component}
                className="grid md:grid-cols-[1.2fr_2fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink">
                  {a.component}
                </div>
                <div className="text-caption text-ink/75">{a.risk}</div>
                <div className="text-caption text-ink/85">{a.verdict}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CHECKLIST */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Checklist de test — 18 points manuels" onSurface />
          <p className="text-body opacity-80 max-w-[58ch] mb-16">
            À exécuter à chaque déploiement de page majeure. Navigateur
            clavier, lecteur d&apos;écran (VoiceOver + NVDA), zoom,
            contraste. Les outils automatisés (axe DevTools, Lighthouse)
            couvrent 30&nbsp;% — le reste se vérifie à la main.
          </p>

          <div className="flex flex-col border-t border-surface-foreground/25">
            {CHECKLIST.map((c) => (
              <div
                key={c.n}
                className="grid md:grid-cols-[60px_1.2fr_3fr] gap-6 py-4 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase opacity-55">
                  {c.n}
                </div>
                <div className="text-eyebrow uppercase text-accent-warm">
                  {c.area}
                </div>
                <div className="text-body opacity-85">{c.test}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — BANNIS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Dix erreurs a11y bannies" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Les dix patterns cassants les plus fréquents, relevés par
            WebAIM Million, Adrian Roselli, Heydon Pickering, Sara
            Soueidan. Aucun ne doit apparaître sur julestoussenel.com.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_A11Y.map((b) => (
              <div
                key={b.n}
                className="grid md:grid-cols-[60px_1.2fr_1.8fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">
                  {b.n}
                </div>
                <div className="font-display italic text-[1.15rem] text-ink leading-snug">
                  {b.title}
                </div>
                <div className="text-body text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Responsive", href: "/design/responsive" }}
        next={{ label: "Lire ensuite — Meta & OG", href: "/design/meta" }}
      />
    </div>
  );
}
