import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Performance — Design",
  description:
    "Cibles Core Web Vitals 2026 — LCP ≤ 1.8 s, INP ≤ 150 ms, CLS ≤ 0.05. Budget JS 90 KB, Lighthouse ≥ 95 desktop. Stack auditée, monitoring Vercel Speed Insights.",
};

type CWV = {
  metric: string;
  good: string;
  ours: string;
  notes: string;
};

const TARGETS: CWV[] = [
  { metric: "LCP — Largest Contentful Paint", good: "≤ 2.5 s", ours: "≤ 1.8 s", notes: "Image hero AVIF avec preload, blurDataURL, fetchPriority high" },
  { metric: "INP — Interaction to Next Paint", good: "≤ 200 ms", ours: "≤ 150 ms", notes: "Remplace FID depuis mars 2024. Risque si Lenis + RAF sur mobile bas de gamme." },
  { metric: "CLS — Cumulative Layout Shift", good: "≤ 0.1", ours: "≤ 0.05", notes: "Aspect-ratio explicite sur toutes les images + fontes avec adjustFontFallback" },
  { metric: "FCP — First Contentful Paint", good: "≤ 1.8 s", ours: "≤ 1.2 s", notes: "next/font avec preload + Vercel Edge" },
  { metric: "TTFB — Time to First Byte", good: "≤ 800 ms", ours: "≤ 400 ms", notes: "Vercel Edge + static prerendering complet" },
  { metric: "Lighthouse Performance", good: "—", ours: "≥ 95 desktop, ≥ 90 mobile", notes: "Vérifier en CI via lighthouse-ci sur chaque PR" },
];

type Budget = {
  resource: string;
  budget: string;
};

const BUDGET: Budget[] = [
  { resource: "JS initial client (page accueil)", budget: "≤ 90 KB gzipped" },
  { resource: "JS total route lourde", budget: "≤ 170 KB gzipped" },
  { resource: "CSS initial", budget: "≤ 20 KB gzipped" },
  { resource: "Image hero AVIF", budget: "≤ 120 KB" },
  { resource: "Vignettes projet", budget: "≤ 40 KB" },
  { resource: "Images inline article", budget: "≤ 60 KB" },
  { resource: "Fontes critiques (preload)", budget: "2 TTF (serif display + sans texte)" },
  { resource: "TBT — Total Blocking Time", budget: "≤ 150 ms" },
  { resource: "Requêtes initiales", budget: "≤ 30" },
];

type Rule = {
  n: string;
  rule: string;
  why: string;
};

const RULES: Rule[] = [
  { n: "01", rule: "priority uniquement sur l'image LCP (hero), jamais ailleurs", why: "Browser preload queue se remplit — priority partout = rien prioritaire." },
  { n: "02", rule: "sizes attribute toujours précisé sur next/image", why: "Sinon serveur sert du 100vw (overkill mobile). Perte bandwidth." },
  { n: "03", rule: "loading=\"lazy\" par défaut (next/image le fait déjà)", why: "Images below-the-fold chargées seulement à l'approche." },
  { n: "04", rule: "placeholder=\"blur\" + blurDataURL", why: "Évite CLS pendant chargement et donne un rendu agréable." },
  { n: "05", rule: "generateStaticParams sur [slug] projets + articles", why: "SSG total = TTFB minimal, CDN cache partout." },
  { n: "06", rule: "next/font avec preload: true + display: swap", why: "Fonts critiques preloadées, le reste swap sans render-blocking." },
  { n: "07", rule: "<Suspense> autour des blocs async pour streaming", why: "La page répond dès que le shell est prêt, contenu stream ensuite." },
  { n: "08", rule: "Pas de useEffect avec listener scroll", why: "Passer par Lenis callbacks ou framer-motion useScroll — plus performant." },
  { n: "09", rule: "'use client' au plus près de la feuille", why: "RSC par défaut, client seulement si interactivité réelle." },
  { n: "10", rule: "Pas de CSS-in-JS runtime (styled-components, emotion)", why: "Overhead hydration. Tailwind v4 + CSS natif font mieux." },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_PERF: Banned[] = [
  { n: "01", title: "Google Analytics gtag.js direct", reason: "Script bloquant. Utiliser @next/third-parties/google qui retarde le chargement." },
  { n: "02", title: "Facebook Pixel / TikTok / LinkedIn Insight", reason: "Tracking lourd, zéro intérêt sur un portfolio freelance premium." },
  { n: "03", title: "<img> HTML nu sans next/image", reason: "Pas d'AVIF automatique, pas de lazy, pas de placeholder blur. Perte 200-500 KB par image." },
  { n: "04", title: "Images sans sizes ni dimensions", reason: "CLS garanti + overkill bandwidth. width/height + sizes OBLIGATOIRES." },
  { n: "05", title: "Iframes YouTube directes", reason: "Charge ~500 KB et bloque le thread. Utiliser lite-youtube-embed ou facade image." },
  { n: "06", title: "Fontes custom hors next/font (@font-face maison)", reason: "Render-blocking + FOUT mal géré + pas d'adjustFontFallback." },
  { n: "07", title: "Packages >100 KB pour une feature triviale", reason: "moment.js → date-fns (tree-shaken). lodash → natifs ES. Audit avec bundlephobia." },
  { n: "08", title: "dangerouslySetInnerHTML sans critical CSS", reason: "Injecte sans optimisation. Sécurité + perf dégradées." },
  { n: "09", title: "CSS-in-JS runtime", reason: "Hydration overhead sur chaque composant. Tailwind v4 compile au build." },
  { n: "10", title: "'use client' à la racine d'une page entière", reason: "Tout devient client. Perdre les gains RSC. Au plus près de la feuille." },
];

export default function Performance() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Performance" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un site qui répond en moins d&apos;une seconde.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Core Web <em className="italic text-surface">Vitals</em> verts.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            LCP sous 1,8 seconde, INP sous 150 ms, CLS sous 0,05. On se
            fixe des cibles <em className="italic">sous</em> les seuils
            « good » de Google pour garder de la marge. Budget
            JS&nbsp;: 90 KB gzipped initial. Lighthouse Performance
            ≥ 95 desktop. La retenue éditoriale aide — moins de
            composants, moins de scripts, moins d&apos;images. La
            performance est une{" "}
            <em className="italic">conséquence du design</em>, pas un
            chantier parallèle.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>LCP ≤ 1.8 s · INP ≤ 150 ms · CLS ≤ 0.05</span>
            <span>JS initial ≤ 90 KB</span>
            <span>Lighthouse ≥ 95 desktop</span>
            <span>Vercel Speed Insights monitoring</span>
          </div>
        </div>
      </section>

      {/* 01 — CIBLES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Cibles Core Web Vitals 2026" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Seuils officiels Google (web.dev, Search Central),{" "}
            <em className="italic">stables pour 2026</em>, mesure au
            75<sup>e</sup> percentile mobile + desktop. Nos cibles
            internes sont plus strictes — on vise sous le seuil « good »
            pour garder de la marge aux cas extrêmes (bas de gamme
            mobile, réseau 3G).
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.5fr_1fr_1fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Métrique</div>
              <div>Seuil good</div>
              <div>Cible interne</div>
              <div>Notes</div>
            </div>
            {TARGETS.map((t) => (
              <div
                key={t.metric}
                className="grid md:grid-cols-[1.5fr_1fr_1fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink leading-tight">
                  {t.metric}
                </div>
                <code className="font-mono text-caption text-ink/75">
                  {t.good}
                </code>
                <code className="font-mono text-caption text-accent-deep">
                  {t.ours}
                </code>
                <div className="text-caption text-ink/75">{t.notes}</div>
              </div>
            ))}
          </div>

          <p className="text-caption text-ink/60 max-w-[58ch] mt-12 pt-6 border-t border-rule-strong">
            FID (First Input Delay) est{" "}
            <em className="italic">officiellement remplacé par INP</em>{" "}
            depuis mars 2024. INP mesure la latence de toutes les
            interactions de la page, pas juste la première. Plus dur à
            optimiser, plus représentatif.
          </p>
        </div>
      </section>

      {/* 02 — BUDGET */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Budget chiffré — neuf ressources" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque ressource a un plafond. Si on le dépasse, on cherche
            pourquoi et on coupe — jamais « on verra plus tard ». Le site
            n&apos;est pas une app marchande avec ROI de chaque feature,
            c&apos;est un portfolio qui doit respirer.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BUDGET.map((b) => (
              <div
                key={b.resource}
                className="grid md:grid-cols-[2fr_1.2fr] gap-6 py-4 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink">
                  {b.resource}
                </div>
                <code className="font-mono text-caption text-accent-deep">
                  {b.budget}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — RÈGLES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Dix règles d'optimisation" />
          <div className="flex flex-col border-t border-rule-strong">
            {RULES.map((r) => (
              <div
                key={r.n}
                className="grid md:grid-cols-[60px_1.4fr_1.8fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">
                  {r.n}
                </div>
                <div className="font-display italic text-[1.05rem] text-ink leading-tight">
                  {r.rule}
                </div>
                <div className="text-caption text-ink/75">{r.why}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — MONITORING */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Monitoring — RUM + CI" onSurface />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[42ch] mb-6">
                Deux sources de données&nbsp;: <strong>RUM</strong>{" "}
                (Real User Monitoring, utilisateurs réels 75<sup>e</sup>{" "}
                percentile) via Vercel Speed Insights + {" "}
                <strong>synthétique</strong> (Lighthouse CI sur chaque
                PR, machine contrôlée).
              </p>
              <p className="text-body opacity-75 max-w-[42ch] mb-6">
                Speed Insights est gratuit sur plan Hobby (quota
                mensuel). Script différé (~1 KB gzipped, zéro impact sur
                LCP/INP). Dashboard par route, pays, device. Métriques
                remontent sous 24 h.
              </p>
              <p className="text-body opacity-70 max-w-[42ch]">
                Lighthouse CI bloque les régressions avant merge. Config
                avec budget fichier JSON, failing si LCP +200 ms ou
                Performance &lt; 90.
              </p>
            </div>

            <div className="bg-bg text-ink p-6 border border-surface-foreground/20">
              <Eyebrow>Installation Speed Insights (pas encore fait)</Eyebrow>
              <pre className="mt-4 font-mono text-caption text-ink/80 bg-accent-warm/25 p-4 leading-relaxed overflow-x-auto">
{`// bun add @vercel/speed-insights

// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}`}
              </pre>
              <p className="text-caption text-ink/60 mt-4 max-w-[42ch]">
                TODO — installer quand on passe en production. Dépendance
                légère, 1 KB gzipped, totalement différée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Dix patterns qui tuent la perf" />
          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_PERF.map((b) => (
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
        prev={{ label: "Relire — Crawl", href: "/design/crawl" }}
        next={{ label: "Lire ensuite — Articles", href: "/design/articles" }}
      />
    </div>
  );
}
