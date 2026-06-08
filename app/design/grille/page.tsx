import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Grille — Design",
  description:
    "Grille éditoriale 6 colonnes — le système de mise en page horizontal de julestoussenel.com et ses huit patterns de composition.",
};

type Pattern = {
  n: string;
  name: string;
  container: string;
  context: string;
  code: string;
  viz: React.ReactNode;
};

function VizCell({
  className = "",
  label,
  tone = "surface",
}: {
  className?: string;
  label?: string;
  tone?: "surface" | "warm" | "deep" | "muted";
}) {
  const bg = {
    surface: "bg-surface",
    warm: "bg-accent-warm",
    deep: "bg-accent-deep",
    muted: "bg-muted/50",
  }[tone];
  const fg = tone === "warm" || tone === "muted" ? "text-ink/80" : "text-surface-foreground";
  return (
    <div
      className={`${bg} flex items-center justify-center px-2 ${className}`}
    >
      {label && (
        <span className={`font-display italic text-caption ${fg}`}>{label}</span>
      )}
    </div>
  );
}

const PATTERNS: Pattern[] = [
  {
    n: "P1",
    name: "Hero éditorial",
    container: "narrow · 1024 px",
    context: "Home, pages services, chapitres design. Titre pleine largeur, lead en 2/3.",
    code: `<div className="grid grid-cols-6 gap-grid">
  <h1 className="col-span-6">Titre</h1>
  <p className="col-span-4">Lead paragraph.</p>
</div>`,
    viz: (
      <div className="grid grid-cols-6 gap-grid">
        <VizCell className="col-span-6 h-16" label="Titre pleine largeur" />
        <VizCell className="col-span-4 h-10" tone="warm" label="Lead" />
      </div>
    ),
  },
  {
    n: "P2",
    name: "Article lecture longue",
    container: "reading · 672 px",
    context: "Blog, page About. Colonne unique centrée, ~70 caractères par ligne.",
    code: `<article className="mx-auto max-w-reading">
  <h1>Titre de l'article</h1>
  <p>Corps de l'article en une colonne…</p>
</article>`,
    viz: (
      <div className="max-w-[360px] mx-auto flex flex-col gap-2">
        <VizCell className="h-6" tone="surface" />
        <div className="h-2 bg-ink/25" />
        <div className="h-2 bg-ink/25" />
        <div className="h-2 bg-ink/25 w-4/5" />
        <div className="h-4" />
        <div className="h-2 bg-ink/25" />
        <div className="h-2 bg-ink/25 w-3/4" />
        <div className="h-2 bg-ink/25" />
      </div>
    ),
  },
  {
    n: "P3",
    name: "Case study — image dominante",
    container: "wide · 1536 px",
    context: "Étude de cas. Image principale 4/6 à gauche, meta + contexte 2/6 à droite.",
    code: `<section className="grid grid-cols-6 gap-grid">
  <figure className="col-span-4">Image</figure>
  <aside className="col-span-2">Meta</aside>
</section>`,
    viz: (
      <div className="grid grid-cols-6 gap-grid">
        <VizCell className="col-span-4 h-36" tone="warm" label="Image" />
        <VizCell className="col-span-2 h-36" tone="surface" label="Meta" />
      </div>
    ),
  },
  {
    n: "P4",
    name: "Texte + image — proportion 2/6 + 4/6",
    container: "default · 1280 px",
    context: "Section récit dans une étude de cas. Texte à gauche, image à droite.",
    code: `<section className="grid grid-cols-6 gap-grid">
  <div className="col-span-2">Texte</div>
  <div className="col-span-4">Image</div>
</section>`,
    viz: (
      <div className="grid grid-cols-6 gap-grid">
        <VizCell className="col-span-2 h-28" tone="surface" label="Texte" />
        <VizCell className="col-span-4 h-28" tone="warm" label="Image" />
      </div>
    ),
  },
  {
    n: "P5",
    name: "Grille de projets",
    container: "default · 1280 px",
    context: "Listing de travaux. 3/6 + 3/6 pour 2 colonnes, 2/6 × 3 pour plus dense.",
    code: `<ul className="grid grid-cols-6 gap-grid">
  <li className="col-span-3">Card A</li>
  <li className="col-span-3">Card B</li>
</ul>

<ul className="grid grid-cols-6 gap-grid">
  <li className="col-span-2">…</li>
  <li className="col-span-2">…</li>
  <li className="col-span-2">…</li>
</ul>`,
    viz: (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-6 gap-grid">
          <VizCell className="col-span-3 h-24" tone="surface" label="Card" />
          <VizCell className="col-span-3 h-24" tone="surface" label="Card" />
        </div>
        <div className="grid grid-cols-6 gap-grid">
          <VizCell className="col-span-2 h-20" tone="surface" />
          <VizCell className="col-span-2 h-20" tone="surface" />
          <VizCell className="col-span-2 h-20" tone="surface" />
        </div>
      </div>
    ),
  },
  {
    n: "P6",
    name: "Headline + lead, deux colonnes",
    container: "default · 1280 px",
    context: "Intro de section. Titre en Serif à gauche (4/6), lead + CTA en Sans à droite (2/6).",
    code: `<header className="grid grid-cols-6 gap-grid items-end">
  <h2 className="col-span-4 font-display">Titre</h2>
  <div className="col-span-2">
    <p>Lead.</p>
    <a>CTA</a>
  </div>
</header>`,
    viz: (
      <div className="grid grid-cols-6 gap-grid items-end">
        <VizCell className="col-span-4 h-20" tone="surface" label="Titre en Serif" />
        <VizCell className="col-span-2 h-14" tone="warm" label="Lead + CTA" />
      </div>
    ),
  },
  {
    n: "P7",
    name: "Citation centrée",
    container: "reading · 672 px",
    context: "Rupture dans un article. Blockquote en Serif italique, pleine largeur de reading.",
    code: `<blockquote className="mx-auto max-w-reading text-center">
  <p className="font-display italic text-h3">« Citation. »</p>
</blockquote>`,
    viz: (
      <div className="max-w-[360px] mx-auto">
        <div className="bg-accent-warm/60 flex items-center justify-center h-16 px-4">
          <span className="font-display italic text-lead text-ink">
            «&nbsp;Citation mémorable&nbsp;»
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "P8",
    name: "Galerie libre — mood board",
    container: "wide · 1536 px",
    context: "Pages About, inspirations, références. Tailles de cards variables dans la même grille 6.",
    code: `<section className="grid grid-cols-6 gap-grid">
  <div className="col-span-2">…</div>
  <div className="col-span-4">…</div>
  <div className="col-span-3">…</div>
  <div className="col-span-3">…</div>
  <div className="col-span-6">…</div>
</section>`,
    viz: (
      <div className="grid grid-cols-6 gap-grid">
        <VizCell className="col-span-2 h-20" tone="surface" />
        <VizCell className="col-span-4 h-20" tone="warm" />
        <VizCell className="col-span-3 h-20" tone="deep" />
        <VizCell className="col-span-3 h-20" tone="muted" />
        <VizCell className="col-span-6 h-20" tone="surface" />
      </div>
    ),
  },
];

function PatternCard({ p }: { p: Pattern }) {
  return (
    <article className="grid md:grid-cols-[1.4fr_1fr] gap-10 border-t border-ink/15 pt-10 first:border-t-0 first:pt-0">
      <div>
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-eyebrow uppercase text-ink/65">{p.n}</span>
          <h3 className="font-display text-[1.6rem] text-ink leading-tight">
            {p.name}
          </h3>
        </div>
        <div className="flex gap-3 mb-6 text-caption text-ink/65">
          <span className="text-eyebrow uppercase text-accent-deep">
            Container
          </span>
          <code className="font-mono">{p.container}</code>
        </div>
        <p className="text-body text-ink/80 mb-8 max-w-[48ch]">{p.context}</p>
        <div className="bg-accent-warm/15 p-6">{p.viz}</div>
      </div>
      <div>
        <Eyebrow>Code</Eyebrow>
        <pre className="mt-4 bg-ink/[0.04] p-5 overflow-x-auto text-caption font-mono text-ink/85 leading-relaxed whitespace-pre">
          {p.code}
        </pre>
      </div>
    </article>
  );
}

export default function Grille() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="mx-auto max-w-default">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Grille" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="mx-auto max-w-default">
          <p className="font-display italic text-lead text-surface mb-6">
            Six colonnes, une gouttière, huit mises en page.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Une grille <em className="italic text-surface">éditoriale</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Pas une grille 12 colonnes de SaaS, pas une grille asymétrique
            d&apos;agence. Six colonnes qui se divisent en 2/3/6, une gouttière
            fluide, un subgrid ponctuel pour aligner les cards. Le minimum
            vital pour que la page soit éditoriale sans que le système la
            dirige.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>6 colonnes</span>
            <span>Gouttière · clamp(1rem, 2vw, 2rem)</span>
            <span>8 patterns documentés</span>
            <span>Subgrid ciblé</span>
          </div>
        </div>
      </section>

      {/* 01 — POURQUOI 6 COLONNES */}
      <section className="px-gutter py-section-md bg-accent-warm/20">
        <div className="mx-auto max-w-default">
          <SectionHead n="01" label="Pourquoi six" />
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <Eyebrow>Écarté · 12 colonnes</Eyebrow>
              <p className="text-body text-ink/80 mt-4 max-w-[38ch]">
                Trop bavarde. Conçue pour les dashboards et les e-commerce
                structurés. Sur un site éditorial, on n&apos;utilise jamais 5/12
                ou 7/12 — on finit par se limiter à 2 à 4 combinaisons, autant
                partir d&apos;une base plus mentale.
              </p>
            </div>
            <div>
              <Eyebrow>Écarté · asymétrique</Eyebrow>
              <p className="text-body text-ink/80 mt-4 max-w-[38ch]">
                Le terrain des grands studios graphiques (Pentagram, Les
                Graphiquants). Résultat magnifique, mais chaque page devient un
                poster. Non maintenable en solo — un client qui demande
                d&apos;ajouter un paragraphe casse la composition.
              </p>
            </div>
            <div>
              <Eyebrow>Retenue · 6 colonnes</Eyebrow>
              <p className="text-body text-ink/80 mt-4 max-w-[38ch]">
                Divisible par 2, 3 et 6. Couvre toutes les compositions utiles
                d&apos;un portfolio — 1/1, 2/4, 3/3, 4/2, 2/2/2. Dialogue
                naturel avec la mesure de 66 caractères de Bringhurst.
                C&apos;est la grille des magazines, pas des apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — ANATOMIE */}
      <section className="px-gutter py-section-md">
        <div className="mx-auto max-w-default">
          <SectionHead n="02" label="Anatomie de la grille" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Six colonnes de largeur égale, séparées par une gouttière fluide.
            La grille n&apos;est pas globale — on l&apos;active section par
            section avec{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              grid grid-cols-6 gap-grid
            </code>
            .
          </p>

          <div className="relative bg-accent-warm/15 p-6 mb-12">
            <div className="grid grid-cols-6 gap-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 border border-surface/20 bg-surface/5 flex items-start justify-center pt-4"
                >
                  <span className="text-eyebrow uppercase text-surface">
                    Col {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-ink/15">
            {[
              { label: "Colonnes", value: "6 (largeur égale)" },
              { label: "Gouttière", value: "clamp(1rem, 2vw, 2rem) · 16 → 32 px" },
              { label: "Token Tailwind", value: "gap-grid · col-span-1 à col-span-6" },
              { label: "Rapport à la marge", value: "≈ 0.5× gutter latéral — préserve la lecture des sections" },
              { label: "Activation", value: "Locale à chaque section, pas globale au site" },
            ].map((row) => (
              <div
                key={row.label}
                className="grid md:grid-cols-[1fr_2fr] gap-4 py-4 border-b border-ink/10 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">
                  {row.label}
                </div>
                <div className="text-body text-ink/85">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — LES 8 PATTERNS */}
      <section className="px-gutter py-section-md">
        <div className="mx-auto max-w-default">
          <SectionHead n="03" label="Huit mises en page" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Ces huit patterns couvrent environ 95 % des besoins d&apos;un
            portfolio ambitieux. Chacun est nommé pour qu&apos;on puisse
            s&apos;y référer en conversation — « on part sur un P4 pour cette
            section ».
          </p>
          <div className="flex flex-col gap-16">
            {PATTERNS.map((p) => (
              <PatternCard key={p.n} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — SUBGRID */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="mx-auto max-w-default">
          <SectionHead n="04" label="Subgrid — pour aligner les cards" onSurface />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16">
            <div>
              <p className="text-body opacity-80 max-w-[44ch] mb-6">
                Le subgrid CSS est supporté à 97 % en 2026. On l&apos;utilise{" "}
                <em className="italic">ciblé</em> — uniquement là où il résout
                un vrai problème d&apos;alignement : les grilles de cards où
                titre, meta et CTA doivent s&apos;aligner d&apos;une card à
                l&apos;autre sur plusieurs rangs.
              </p>
              <p className="text-body opacity-75 max-w-[44ch] mb-6">
                La card enfant hérite des tracks du parent via{" "}
                <code className="font-mono bg-surface-foreground/10 px-1.5 py-0.5">
                  grid-cols-subgrid
                </code>{" "}
                et tous ses éléments internes se rangent sur les mêmes lignes
                que les autres cards.
              </p>
              <p className="text-caption opacity-65 max-w-[44ch]">
                Ne construis pas le système autour du subgrid. Appelle-le quand
                il résout un problème précis.
              </p>
            </div>
            <div>
              <Eyebrow>Démonstration — 3 cards alignées</Eyebrow>
              <div className="mt-4 grid grid-cols-3 gap-grid">
                {[
                  { title: "Le Vieux Tonneau", year: "2024", meta: "Restaurant · Aix" },
                  { title: "Les Voûtes", year: "2024", meta: "Bar-restaurant · Aix" },
                  { title: "SOMA Pilates", year: "2025", meta: "Studio · Sisteron" },
                ].map((c) => (
                  <article
                    key={c.title}
                    className="grid grid-cols-subgrid grid-rows-subgrid row-span-3 p-4 bg-surface-foreground/10"
                    style={{ gridColumn: "span 1" }}
                  >
                    <h4 className="font-display text-base leading-tight">
                      {c.title}
                    </h4>
                    <p className="text-caption opacity-70">{c.meta}</p>
                    <span className="text-eyebrow uppercase opacity-55">
                      {c.year}
                    </span>
                  </article>
                ))}
              </div>
              <p className="text-caption opacity-55 mt-4">
                Les 3 lignes (titre / meta / année) s&apos;alignent même si les
                titres ont des longueurs différentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Index design", href: "/design" }}
        next={{ label: "Lire ensuite — Lignes", href: "/design/lignes" }}
      />
    </div>
  );
}
