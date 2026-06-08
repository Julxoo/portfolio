import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Espace — Design",
  description:
    "Rythme vertical, containers et marges latérales — le système d'espacement qui donne à julestoussenel.com sa respiration éditoriale.",
};

type SectionStep = {
  name: string;
  token: string;
  values: string;
  usage: string;
};

const SECTIONS: SectionStep[] = [
  { name: "sm", token: "--section-sm", values: "clamp(3rem, 6vw, 5rem)    · 48 → 80 px",       usage: "Transitions, pieds de page, petites bandes" },
  { name: "md", token: "--section-md", values: "clamp(5rem, 9vw, 7.5rem)  · 80 → 120 px",      usage: "Section courante, la plupart des cas" },
  { name: "lg", token: "--section-lg", values: "clamp(6rem, 12vw, 10rem)  · 96 → 160 px",      usage: "Moment pivot narratif, introductions" },
  { name: "xl", token: "--section-xl", values: "clamp(8rem, 16vw, 12.5rem) · 128 → 200 px",    usage: "Hero, finale, respirations maximales" },
];

type Container = {
  name: string;
  token: string;
  width: string;
  pct: number;
  usage: string;
};

const CONTAINERS: Container[] = [
  { name: "reading", token: "--w-reading",  width: "672 px",  pct: 35, usage: "Colonne d'article, ~70 caractères par ligne" },
  { name: "narrow",  token: "--w-narrow",   width: "1024 px", pct: 58, usage: "Contenu éditorial dense, pages secondaires" },
  { name: "default", token: "--w-default",  width: "1280 px", pct: 75, usage: "Pages standard — home, portfolio, services" },
  { name: "wide",    token: "--w-wide",     width: "1536 px", pct: 92, usage: "Études de cas, galeries, comparatifs" },
];

type Observation = {
  site: string;
  href: string;
  container: string;
  section: string;
  gutter: string;
};

const OBSERVATIONS: Observation[] = [
  { site: "Aesop",                href: "https://shop.aesop.com/fr/fr/",        container: "full-bleed", section: "150 / 150 · 100 / 60",   gutter: "80–100 px"    },
  { site: "Jacquemus",            href: "https://www.jacquemus.com/fr_fr",      container: "full-bleed", section: "82 / 41",                gutter: "26 px (10px root)" },
  { site: "Pierre Yovanovitch",   href: "https://www.pierreyovanovitch.com/",   container: "full-bleed", section: "80 / 80 · 170 / 200",    gutter: "10–28 px"     },
  { site: "basement.studio",      href: "https://basement.studio/",             container: "max-w 1920", section: "64 / 128 desktop",       gutter: "16 px"        },
  { site: "rauno.me",             href: "https://rauno.me/",                    container: "pas de max", section: "64 / 64 uniforme",       gutter: "64 px"        },
  { site: "leerob.com",           href: "https://leerob.com/",                  container: "~586 px",    section: "compact, blog",          gutter: "interne"      },
  { site: "Sezane",               href: "https://www.sezane.com/fr-fr",         container: "full-bleed", section: "64 / 64",                gutter: "28 px"        },
  { site: "David Toutain",        href: "https://www.davidtoutain.com/",        container: "full-bleed", section: "galerie fullscreen",     gutter: "14 px"        },
];

function VerticalRhythmDemo({ step }: { step: SectionStep }) {
  // Hauteur proportionnelle pour rendre visible l'écart (on prend le min du clamp en visu)
  const minHeights: Record<string, string> = {
    sm: "3rem",
    md: "5rem",
    lg: "6rem",
    xl: "8rem",
  };
  return (
    <div className="flex flex-col items-stretch bg-accent-warm/20">
      <div
        style={{ height: minHeights[step.name] }}
        className="border-b border-ink/15"
      />
      <div className="px-5 py-3 text-center">
        <div className="font-display text-[1.6rem] leading-none text-surface">
          section-{step.name}
        </div>
      </div>
      <div
        style={{ height: minHeights[step.name] }}
        className="border-t border-ink/15"
      />
    </div>
  );
}

export default function Espace() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="mx-auto max-w-default">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Espace" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-xl">
        <div className="mx-auto max-w-default">
          <p className="font-display italic text-lead text-surface mb-6">
            Un site respire avant de parler.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Le rythme qui <em className="italic text-surface">fait tenir</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Avant les mots, avant les couleurs, il y a l&apos;espace qu&apos;on
            laisse entre les choses. Quatre respirations de section, quatre
            largeurs de container, une marge latérale qui s&apos;adapte. Rien
            de plus — c&apos;est la discipline qui fait qu&apos;un site ne
            s&apos;affaisse jamais.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Base 4 px · Tailwind v4</span>
            <span>4 sections · sm, md, lg, xl</span>
            <span>4 containers · reading → wide</span>
            <span>Marges fluides · 24 → 96 px</span>
          </div>
        </div>
      </section>

      {/* 01 — OBSERVATIONS */}
      <section className="px-gutter py-section-md">
        <div className="mx-auto max-w-default">
          <SectionHead n="01" label="Ce qu'on a observé" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-12">
            Huit sites inspectés à la main — maisons de luxe, studios premium,
            blogs éditoriaux. Trois constats ressortent&nbsp;: le full-bleed
            domine, les padding verticaux montent à 100-200&nbsp;px desktop, le
            ratio grosse/petite section tourne autour de 2,5×.
          </p>
          <div className="border-t border-ink/15">
            {OBSERVATIONS.map((o) => (
              <div
                key={o.site}
                className="grid md:grid-cols-[1fr_1fr_1.2fr_1fr] gap-4 py-4 border-b border-ink/10 items-baseline"
              >
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[1.15rem] text-ink hover:text-accent-deep transition-colors"
                >
                  {o.site} ↗
                </a>
                <div className="text-caption text-ink/65">
                  <span className="text-eyebrow uppercase block text-ink/60 mb-1">
                    Container
                  </span>
                  {o.container}
                </div>
                <div className="text-caption text-ink/65">
                  <span className="text-eyebrow uppercase block text-ink/60 mb-1">
                    Section y (desktop)
                  </span>
                  {o.section}
                </div>
                <div className="text-caption text-ink/65">
                  <span className="text-eyebrow uppercase block text-ink/60 mb-1">
                    Gutter
                  </span>
                  {o.gutter}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — PARTI PRIS */}
      <section className="px-gutter py-section-md bg-accent-warm/20">
        <div className="mx-auto max-w-default">
          <SectionHead n="02" label="Le parti pris" />
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <Eyebrow>Base 4 px, Tailwind natif</Eyebrow>
              <p className="text-body text-ink/80 mt-4">
                On ne customise pas la base de Tailwind v4 (`--spacing: 0.25rem`).
                Toute la richesse des utilitaires (p-1 à p-96, fractions, arbitraires)
                reste disponible pour les composants internes. Pas de bataille contre
                l&apos;outil.
              </p>
            </div>
            <div>
              <Eyebrow>Couche sémantique au-dessus</Eyebrow>
              <p className="text-body text-ink/80 mt-4">
                Par-dessus la base, on définit des tokens avec des noms de
                rôle — <code className="font-mono text-accent-deep">section-md</code>,
                <code className="font-mono text-accent-deep"> gutter</code>,
                <code className="font-mono text-accent-deep"> max-w-default</code>.
                C&apos;est ce qu&apos;on utilise dans les pages. La DA se joue
                à ce niveau, pas en bas.
              </p>
            </div>
            <div>
              <Eyebrow>Fluide horizontal, fixe vertical</Eyebrow>
              <p className="text-body text-ink/80 mt-4">
                Les marges latérales sont en <code className="font-mono text-accent-deep">clamp()</code>
                {" "}pour s&apos;adapter sans sauts disgracieux. Les paddings
                verticaux sont eux aussi fluides mais bornés — prévisibles pour
                respecter les rapports d&apos;aspect des images.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — RYTHME VERTICAL */}
      <section className="px-gutter py-section-md">
        <div className="mx-auto max-w-default">
          <SectionHead n="03" label="Quatre respirations de section" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Chaque section du site pioche dans ces quatre rôles. Les valeurs
            sont en <code className="font-mono text-accent-deep">clamp()</code>
            {" "}— elles évoluent fluidement entre mobile et desktop, sans
            breakpoint abrupt.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {SECTIONS.map((s) => (
              <VerticalRhythmDemo key={s.name} step={s} />
            ))}
          </div>

          <div className="border-t border-ink/15">
            {SECTIONS.map((s) => (
              <div
                key={s.name}
                className="grid md:grid-cols-[1fr_2fr_2fr] gap-4 py-4 border-b border-ink/10 items-baseline"
              >
                <div>
                  <div className="font-display text-[1.3rem] text-ink leading-tight">
                    section-{s.name}
                  </div>
                  <code className="font-mono text-eyebrow uppercase text-ink/65">
                    {s.token}
                  </code>
                </div>
                <code className="font-mono text-caption text-surface">
                  {s.values}
                </code>
                <p className="text-body text-ink/75">{s.usage}</p>
              </div>
            ))}
          </div>

          <p className="text-caption text-ink/65 mt-8 max-w-[58ch]">
            Usage en Tailwind&nbsp;:{" "}
            <code className="font-mono text-ink bg-accent-warm/30 px-1.5 py-0.5">
              py-section-md
            </code>
            ,{" "}
            <code className="font-mono text-ink bg-accent-warm/30 px-1.5 py-0.5">
              pt-section-xl
            </code>
            ,{" "}
            <code className="font-mono text-ink bg-accent-warm/30 px-1.5 py-0.5">
              mb-section-sm
            </code>
            .
          </p>
        </div>
      </section>

      {/* 04 — CONTAINERS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="mx-auto max-w-default">
          <SectionHead n="04" label="Quatre largeurs de container" onSurface />
          <p className="text-body opacity-80 max-w-[58ch] mb-16">
            Le site alterne quatre largeurs selon ce qu&apos;il faut raconter.
            Au-delà, on passe en full-bleed — hero image, galerie, bandeau plein
            écran.
          </p>

          <div className="flex flex-col gap-4 mb-16">
            {CONTAINERS.map((c) => (
              <div key={c.name} className="relative">
                <div
                  className="h-12 bg-surface-foreground flex items-center justify-between px-4"
                  style={{ width: `${c.pct}%` }}
                >
                  <span className="font-display text-base text-surface">
                    max-w-{c.name}
                  </span>
                  <code className="font-mono text-caption text-surface/80">
                    {c.width}
                  </code>
                </div>
              </div>
            ))}
            <div className="h-12 bg-surface-foreground/25 flex items-center justify-between px-4 w-full">
              <span className="font-display italic text-base">full-bleed</span>
              <code className="font-mono text-caption opacity-70">100 vw</code>
            </div>
          </div>

          <div className="border-t border-surface-foreground/15">
            {CONTAINERS.map((c) => (
              <div
                key={c.name}
                className="grid md:grid-cols-[1fr_1fr_2fr] gap-4 py-4 border-b border-surface-foreground/10 items-baseline"
              >
                <div>
                  <div className="font-display text-[1.2rem] leading-tight">
                    {c.name}
                  </div>
                  <code className="font-mono text-eyebrow uppercase opacity-55">
                    {c.token}
                  </code>
                </div>
                <code className="font-mono text-caption opacity-80">
                  {c.width}
                </code>
                <p className="text-body opacity-75">{c.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — MARGES */}
      <section className="px-gutter py-section-md">
        <div className="mx-auto max-w-default">
          <SectionHead n="05" label="Marges latérales fluides" />
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[48ch] mb-6">
                Une seule valeur —{" "}
                <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
                  clamp(1.5rem, 5vw, 6rem)
                </code>
                {" "}— qui varie de 24&nbsp;px sur un iPhone à 96&nbsp;px sur un
                grand écran, sans saut de breakpoint. C&apos;est la respiration
                qui cadre chaque page.
              </p>
              <p className="text-body text-ink/80 max-w-[48ch] mb-6">
                Un seul token, une seule classe Tailwind —{" "}
                <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
                  px-gutter
                </code>
                {" "}— appliquée sur chaque section. Pas de{" "}
                <code className="font-mono">px-6 md:px-16 lg:px-24</code>
                {" "}à maintenir.
              </p>
            </div>
            <div>
              <Eyebrow>Démonstration</Eyebrow>
              <div className="mt-4 bg-accent-warm/25 relative">
                <div className="absolute inset-y-0 left-0 w-[var(--gutter)] bg-accent-deep/15" />
                <div className="absolute inset-y-0 right-0 w-[var(--gutter)] bg-accent-deep/15" />
                <div className="relative py-12 px-gutter">
                  <p className="font-display italic text-lead text-ink/80">
                    Zone de contenu. Les bandes latérales sont les marges
                    (px-gutter).
                  </p>
                </div>
              </div>
              <p className="text-caption text-ink/65 mt-4 max-w-[38ch]">
                Redimensionne la fenêtre — les bandes latérales s&apos;ajustent
                en continu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Index design", href: "/design" }}
        next={{ label: "Relire — Palette", href: "/design/palette" }}
      />
    </div>
  );
}
