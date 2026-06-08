import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Meta & OG — Design",
  description:
    "Les balises, template Open Graph typographique, JSON-LD Person. Une signature éditoriale qui tient isolée dans un DM Slack ou une SERP.",
};

type MetaBalise = {
  tag: string;
  value: string;
  source: string;
};

const META_RACINE: MetaBalise[] = [
  { tag: "title (default)", value: "Jules Toussenel — Sites sur-mesure pour artisans et commerces premium", source: "layout.tsx · metadata.title.default" },
  { tag: "title.template", value: "%s — Jules Toussenel", source: "layout.tsx · ordre contenu-puis-marque" },
  { tag: "description", value: "Développeur freelance. Sites sur-mesure pour artisans, commerces et PME qui veulent un site à la hauteur de leur savoir-faire. Next.js, Vercel, Aix-en-Provence.", source: "≤ 160 caractères, voix éditoriale" },
  { tag: "metadataBase", value: "https://julestoussenel.com", source: "URLs absolues automatiques pour OG/Twitter" },
  { tag: "canonical", value: "/ (alternates.canonical)", source: "Redéfini par page via metadata par route" },
  { tag: "robots", value: "index/follow en production uniquement", source: "Preview deployments en noindex via VERCEL_ENV" },
  { tag: "viewport.colorScheme", value: "light", source: "Pas de dark mode — palette unique assumée" },
  { tag: "viewport.themeColor", value: "#F4F1E8", source: "Toile de lin — barre de statut mobile" },
];

type Interdits = {
  n: string;
  title: string;
  reason: string;
};

const INTERDITS: Interdits[] = [
  { n: "01", title: "Emoji dans title ou description", reason: "Casse la voix éditoriale, pénalisé par certains SERP." },
  { n: "02", title: "CAPITALES dans le title (hors marque)", reason: "Braillard, voix SaaS. Interdit par la voix." },
  { n: "03", title: "« Top freelance dev 2025 » dans la description", reason: "Vide, keyword stuffing. Google réécrit 60-70 % des descriptions." },
  { n: "04", title: "Logos clients dans l'OG image", reason: "Brouillon visuel, problèmes de droits. La typographie suffit." },
  { n: "05", title: "Dates dans le title (« NEW 2026 »)", reason: "Oblige à maintenir, daté en six mois." },
  { n: "06", title: "Photo de profil en OG image", reason: "Narcissique. Tue la typo. Aucun magazine premium ne le fait." },
  { n: "07", title: "Dégradé + drop shadow dans l'OG", reason: "Aesthetic Figma 2019. Incompatible avec la DA flat + filets." },
  { n: "08", title: "Mots-clés en virgule dans description", reason: "Obsolète depuis 2014. Google ignore." },
  { n: "09", title: "twitter:card = summary (vignette carrée)", reason: "Écrase la composition typographique. On veut summary_large_image." },
  { n: "10", title: "Description identique sur toutes les pages", reason: "Dilue, confond Google, flag dans Search Console." },
];

export default function Meta() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Meta & OG" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Les premiers signes qu&apos;on voit avant de cliquer.
          </p>
          <h1 className="font-display text-display text-ink max-w-[18ch] mb-10">
            Meta, Open Graph, <em className="italic text-surface">ld-json</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Ces balises ne sont pas des cases à cocher SEO — ce sont les
            premiers signes que quelqu&apos;un voit avant de cliquer. Chaque
            title, chaque description, chaque vignette Open Graph doit
            tenir debout, isolée, dans un DM Slack ou une SERP — sans
            logo qui braille, sans CTA bidon, sans{" "}
            <em className="italic">« Best freelance developer 2025 »</em>.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Title template %s — Jules Toussenel</span>
            <span>OG image dynamique, pure typo</span>
            <span>JSON-LD Person + BreadcrumbList</span>
            <span>noindex en preview</span>
          </div>
        </div>
      </section>

      {/* 01 — METADATA RACINE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Metadata racine — huit balises clés" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Posées dans{" "}
            <code className="font-mono text-accent-deep">app/layout.tsx</code>{" "}
            via <code className="font-mono text-accent-deep">export const metadata</code>.
            Next.js 16 les compose en balises HTML côté serveur. Chaque page
            peut surcharger individuellement via{" "}
            <code className="font-mono text-accent-deep">
              generateMetadata()
            </code>
            .
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.2fr_2.4fr_1.6fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Balise</div>
              <div>Valeur retenue</div>
              <div>Source / raison</div>
            </div>
            {META_RACINE.map((m) => (
              <div
                key={m.tag}
                className="grid md:grid-cols-[1.2fr_2.4fr_1.6fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <code className="font-mono text-caption text-accent-deep">
                  {m.tag}
                </code>
                <div className="text-body text-ink/85">{m.value}</div>
                <div className="text-caption text-ink/65">{m.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — OG IMAGE */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Open Graph image — pure typographie" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Générée dynamiquement via{" "}
                <code className="font-mono text-accent-deep">
                  app/opengraph-image.tsx
                </code>{" "}
                et <code className="font-mono text-accent-deep">ImageResponse</code>{" "}
                de Next.js 16. Cachée au build, zéro coût runtime. Les pages
                profondes (projet, article) déclarent leur propre template
                enfant pour insérer leur titre.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Composition retenue&nbsp;: fond lin plein, bandeau haut
                « JULES TOUSSENEL » en small-caps kaki, bloc central en
                Instrument Serif italique 104 px, bandeau bas avec filet
                1 px et URL. Aucun logo, aucune photo, aucun dégradé.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Pour l&apos;instant la serif est rendue via fontes système
                (fallback). TODO : déposer Instrument Serif Italic TTF
                dans <code className="font-mono text-accent-deep">
                  app/_fonts/
                </code>{" "}
                et les charger via{" "}
                <code className="font-mono text-accent-deep">
                  readFile(process.cwd(), ...)
                </code>{" "}
                dans la signature{" "}
                <code className="font-mono text-accent-deep">ImageResponse</code>.
              </p>
            </div>

            {/* Maquette statique du template */}
            <div className="aspect-[1200/630] bg-bg border border-rule p-[6%] flex flex-col justify-between">
              <div className="text-[11px] tracking-[0.2em] uppercase text-surface">
                Jules Toussenel
              </div>
              <div className="font-display italic text-[clamp(1.5rem,4vw,3rem)] leading-[1.05] text-ink max-w-[85%]">
                Sites sur-mesure pour artisans et commerces premium.
              </div>
              <div className="flex items-center justify-between text-[11px] text-surface border-t border-rule pt-2">
                <span className="tracking-[0.15em] uppercase">Portfolio</span>
                <span>julestoussenel.com</span>
              </div>
            </div>
          </div>

          <p className="text-caption text-ink/60 mt-12 max-w-[58ch]">
            Dimensions fixes <code className="font-mono text-accent-deep">1200×630</code>{" "}
            (spec Facebook/Open Graph). Même asset consommé par LinkedIn,
            Twitter, Slack, Discord — d&apos;où{" "}
            <code className="font-mono text-accent-deep">
              twitter:card = summary_large_image
            </code>{" "}
            pour éviter la vignette carrée qui écrase la typographie.
          </p>
        </div>
      </section>

      {/* 03 — JSON-LD */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="JSON-LD — identité Person" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Schéma <code className="font-mono text-accent-deep">Person</code>{" "}
                injecté dans{" "}
                <code className="font-mono text-accent-deep">&lt;body&gt;</code>{" "}
                via un script{" "}
                <code className="font-mono text-accent-deep">
                  type=&quot;application/ld+json&quot;
                </code>
                . Next.js 16 ne gère pas ce type via metadata — on l&apos;insère
                directement dans le layout (server component, pas de
                hydratation cliente).
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Pages profondes&nbsp;:{" "}
                <code className="font-mono text-accent-deep">CreativeWork</code>{" "}
                pour les études de cas,{" "}
                <code className="font-mono text-accent-deep">Article</code>{" "}
                pour le carnet,{" "}
                <code className="font-mono text-accent-deep">
                  BreadcrumbList
                </code>{" "}
                pour les pages ≥ 2 niveaux. Pas de{" "}
                <em className="italic">ProfessionalService</em> (trop
                corporate).
              </p>
            </div>

            <pre className="font-mono text-caption text-ink/85 bg-accent-warm/25 p-6 leading-relaxed overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jules Toussenel",
  "jobTitle": "Développeur freelance",
  "url": "https://julestoussenel.com",
  "sameAs": [
    "https://instagram.com/julestoussenel",
    "https://linkedin.com/in/julestoussenel",
    "https://are.na/jules-toussenel"
  ],
  "knowsAbout": [
    "Next.js",
    "TypeScript",
    "React",
    "Design éditorial"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Aix-en-Provence",
    "addressCountry": "FR"
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 04 — INTERDITS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Parce que le head est un lieu où l&apos;on lâche facilement —
            copier-coller un template, stuffer des mots-clés, mettre un
            emoji pour « se démarquer ». Dix habitudes qu&apos;on refuse.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {INTERDITS.map((b) => (
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
        prev={{ label: "Relire — Accessibilité", href: "/design/accessibilite" }}
        next={{ label: "Lire ensuite — Favicon", href: "/design/favicon" }}
      />
    </div>
  );
}
