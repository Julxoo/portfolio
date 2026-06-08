import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "./_components";

export const metadata: Metadata = {
  title: "Design — La fabrique",
  description:
    "Les choix qui portent julestoussenel.com — typographie, palette, espace, et tout ce qui fait la cohérence du site.",
};

type Chapter = {
  n: string;
  slug: string;
  title: string;
  tagline: string;
  preview: "typography" | "palette" | "space" | "grid" | "lines" | "signs" | "motion" | "voice" | "images" | "prose" | "components" | "cards" | "navigation" | "footer" | "forms" | "states" | "light" | "responsive" | "a11y" | "meta" | "favicon" | "crawl" | "perf" | "article";
};

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    slug: "typographie",
    title: "Typographie",
    tagline:
      "Instrument Serif + Instrument Sans. Deux polices, un parti pris — et pourquoi ni Fraunces ni Inter ne nous convenaient.",
    preview: "typography",
  },
  {
    n: "02",
    slug: "palette",
    title: "Palette",
    tagline:
      "Pinède sur toile — six rôles sémantiques, cinq nuances de kaki, aucun hasard chromatique.",
    preview: "palette",
  },
  {
    n: "03",
    slug: "espace",
    title: "Espace",
    tagline:
      "Quatre respirations de section, quatre largeurs de container, une marge fluide. La discipline qui tient la page.",
    preview: "space",
  },
  {
    n: "04",
    slug: "grille",
    title: "Grille",
    tagline:
      "Six colonnes, une gouttière fluide, huit mises en page type. Le plan horizontal qui fait dialoguer les blocs.",
    preview: "grid",
  },
  {
    n: "05",
    slug: "lignes",
    title: "Lignes",
    tagline:
      "Angles vifs, filets 1 px honnêtes, aucune ombre portée. La profondeur naît du blanc, pas du flou.",
    preview: "lines",
  },
  {
    n: "06",
    slug: "signes",
    title: "Signes",
    tagline:
      "Le mot avant l'icône. Huit glyphes typographiques, trois SVG maison, aucune librairie. Instagram écrit en toutes lettres.",
    preview: "signs",
  },
  {
    n: "07",
    slug: "mouvements",
    title: "Mouvements",
    tagline:
      "Curseur à 15 sur 100. Quatre durées, trois courbes, sept animations — brèves, jamais démonstratives. Zéro lib.",
    preview: "motion",
  },
  {
    n: "08",
    slug: "voix",
    title: "Voix",
    tagline:
      "Écrire comme on dessine un plan. Vouvoiement, « je » rare, phrases courtes. Fondé sur l'observation réelle des maisons FR premium.",
    preview: "voice",
  },
  {
    n: "09",
    slug: "imagerie",
    title: "Imagerie",
    tagline:
      "Screenshots posés + photos au téléphone chez le client. Deux ratios, grading chaud, zéro mockup. La home presque muette, à la Dirand.",
    preview: "images",
  },
  {
    n: "10",
    slug: "prose",
    title: "Prose",
    tagline:
      "Blockquote, listes, tableaux, marginalia. Chaque élément doit justifier sa place — sinon la phrase pleine reprend la sienne.",
    preview: "prose",
  },
  {
    n: "11",
    slug: "composants",
    title: "Composants",
    tagline:
      "Button, Link, Tag, Badge. Deux variantes de bouton, deux liens, un tag, trois badges — discrets sous le doigt.",
    preview: "components",
  },
  {
    n: "12",
    slug: "cartes",
    title: "Cartes",
    tagline:
      "Pas de boîte — bloc typographique sur toile de lin. CardProject image ou silence, CardArticle, CardTestimonial.",
    preview: "cards",
  },
  {
    n: "13",
    slug: "navigation",
    title: "Navigation",
    tagline:
      "Cinq liens, scroll-direction aware, zéro bouton CTA. Mobile en overlay plein écran, sommaire éditorial à la Dirand.",
    preview: "navigation",
  },
  {
    n: "14",
    slug: "footer",
    title: "Footer",
    tagline:
      "Trois colonnes éditoriales — sommaire, contact, colophon. Barre basse mentions + signature géographique. Ni SaaS ni mutique.",
    preview: "footer",
  },
  {
    n: "15",
    slug: "formulaires",
    title: "Formulaires",
    tagline:
      "Border-b 1 px seul, label toujours visible, zéro astérisque rouge. Style fiche d'inscription musée. Server Actions + zod + Resend.",
    preview: "forms",
  },
  {
    n: "16",
    slug: "etats",
    title: "États",
    tagline:
      "404, 500, loading, empty. Chaque état est une page éditoriale — typographie pure, aligné gauche, aucune illustration.",
    preview: "states",
  },
  {
    n: "17",
    slug: "clair",
    title: "Clair",
    tagline:
      "Pas de dark mode. La toile de lin EST la DA — l'inverser donnerait un autre site. Palette unique assumée, color-scheme: light.",
    preview: "light",
  },
  {
    n: "18",
    slug: "responsive",
    title: "Responsive",
    tagline:
      "Mobile-first, fluide d'abord, breakpoints ensuite. Cinq seuils Tailwind v4, container queries sur quatre composants, dvh partout.",
    preview: "responsive",
  },
  {
    n: "19",
    slug: "accessibilite",
    title: "Accessibilité",
    tagline:
      "WCAG 2.2 AA plancher, AAA ciblé sur contraste et focus. Audit des composants, contrastes calculés, 18 points de checklist.",
    preview: "a11y",
  },
  {
    n: "20",
    slug: "meta",
    title: "Meta & OG",
    tagline:
      "Title template, description éditoriale, OG image typographique, JSON-LD Person. Les premiers signes avant le clic.",
    preview: "meta",
  },
  {
    n: "21",
    slug: "favicon",
    title: "Favicon",
    tagline:
      "Un « J » italique Instrument Serif, lin sur kaki. Fragment du wordmark, pas un logo séparé. PWA minimal-ui.",
    preview: "favicon",
  },
  {
    n: "22",
    slug: "crawl",
    title: "Crawl",
    tagline:
      "robots.txt, sitemap.xml, llms.txt. Bloquer le training IA, autoriser la recherche. Stratégie 2026 distincte par user-agent.",
    preview: "crawl",
  },
  {
    n: "23",
    slug: "performance",
    title: "Performance",
    tagline:
      "LCP ≤ 1.8 s, INP ≤ 150 ms, CLS ≤ 0.05. Budget JS 90 KB, Lighthouse ≥ 95 desktop. La performance est une conséquence du design.",
    preview: "perf",
  },
  {
    n: "24",
    slug: "articles",
    title: "Articles",
    tagline:
      "Longform à la Tufte — colonne de lecture 65ch + sidenotes 14rem sur desktop, footnotes sur mobile. Zéro parasite UI.",
    preview: "article",
  },
];

const PALETTE_SWATCHES = [
  "#F4F1E8",
  "#535040",
  "#1F1F1B",
  "#D9C7A7",
  "#8C6A4A",
  "#A8A189",
];

function TypographyPreview() {
  return (
    <div className="font-display text-[clamp(3rem,8vw,6rem)] leading-none text-surface">
      <em className="italic">Aa</em>
      <span className="text-ink">.Aa</span>
    </div>
  );
}

function PalettePreview() {
  return (
    <div className="flex gap-1 w-full">
      {PALETTE_SWATCHES.map((c) => (
        <span
          key={c}
          className="h-16 flex-1"
          style={{ background: c }}
          aria-hidden
        />
      ))}
    </div>
  );
}

function SpacePreview() {
  // Représentation en barres décroissantes des 4 containers.
  const widths = [35, 58, 75, 92];
  return (
    <div className="flex flex-col gap-2 w-full">
      {widths.map((w) => (
        <div
          key={w}
          className="h-3 bg-surface"
          style={{ width: `${w}%` }}
          aria-hidden
        />
      ))}
    </div>
  );
}

function GridPreview() {
  // Six barres verticales avec gouttière — évocation directe de la grille 6 cols.
  return (
    <div className="grid grid-cols-6 gap-2 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-20 bg-surface" aria-hidden />
      ))}
    </div>
  );
}

function LinesPreview() {
  // Un carré dur posé sur trois filets horizontaux — radius 0, bordures 1px, zéro ombre.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="size-14 bg-surface" aria-hidden />
      <div className="flex flex-col gap-2 pt-2">
        <div className="h-px bg-ink/25" aria-hidden />
        <div className="h-px bg-ink/15" aria-hidden />
        <div className="h-px bg-ink/15" aria-hidden />
      </div>
    </div>
  );
}

function SignsPreview() {
  // Une grosse flèche Instrument Serif italique — l'icône-glyphe qui résume le chapitre.
  return (
    <div className="font-display italic text-surface text-[clamp(4rem,10vw,7rem)] leading-none">
      →
    </div>
  );
}

function MotionPreview() {
  // Une barre qui démarre à 30% — évocation d'une animation à mi-course,
  // jamais finie, toujours brève. Au hover de la card parente, elle s'étend.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-baseline justify-between text-eyebrow uppercase text-ink/65">
        <span>0 ms</span>
        <span>480 ms</span>
      </div>
      <div className="relative h-2 bg-ink/10 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[30%] bg-surface group-hover:w-full transition-[width] duration-deliberate ease-out-quint" />
      </div>
    </div>
  );
}

function VoicePreview() {
  // Une phrase en Instrument Serif italique, posée sur un filet — la voix incarnée.
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="h-px bg-ink/25" aria-hidden />
      <p className="font-display italic text-[clamp(1.3rem,2.2vw,1.7rem)] leading-[1.25] text-surface">
        « Un site dessiné pour votre maison. »
      </p>
      <div className="h-px bg-ink/15" aria-hidden />
    </div>
  );
}

function ImagesPreview() {
  // Les deux ratios côte à côte — 3:2 paysage + 4:5 portrait, nos deux formats.
  return (
    <div className="flex items-end gap-2 w-full">
      <div className="flex-1 aspect-[3/2] bg-surface" aria-hidden />
      <div className="w-[40%] aspect-[4/5] bg-accent-deep" aria-hidden />
    </div>
  );
}

function ProsePreview() {
  // Une maquette miniature : 4 lignes de texte + un blockquote indenté + un filet.
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="h-1 bg-ink/15 w-full" aria-hidden />
      <div className="h-1 bg-ink/15 w-[88%]" aria-hidden />
      <div className="h-1 bg-ink/15 w-[92%]" aria-hidden />
      <div className="ml-6 mt-3 mb-3 flex flex-col gap-1.5">
        <div className="h-1 bg-surface w-[72%]" aria-hidden />
        <div className="h-1 bg-surface w-[60%]" aria-hidden />
      </div>
      <div className="h-px bg-ink/25 w-full my-1" aria-hidden />
      <div className="h-1 bg-ink/15 w-[85%]" aria-hidden />
      <div className="h-1 bg-ink/15 w-[78%]" aria-hidden />
    </div>
  );
}

function ComponentsPreview() {
  // Un bouton plein ink + un bouton outline + un tag, posés comme dans une doc.
  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <div className="flex items-center gap-2">
        <div className="bg-ink text-bg px-3.5 py-1.5 text-[11px] font-sans font-medium inline-flex items-center gap-1.5">
          Écrire <span className="font-display italic">→</span>
        </div>
        <div className="border border-rule-strong px-3.5 py-1.5 text-[11px] font-sans font-medium text-ink">
          Revenir
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="inline-block rounded-hairline border border-rule-strong px-2 py-0.5 font-sans text-[9px] tracking-[0.04em] small-caps text-ink/70">
          2026
        </span>
        <span className="inline-block px-1.5 py-0.5 font-sans text-[9px] tracking-[0.04em] font-medium small-caps bg-accent-deep/10 text-accent-deep">
          Disponible
        </span>
      </div>
    </div>
  );
}

function CardsPreview() {
  // Une mini-card : eyebrow + "image" aspect 3:2 + titre serif italique + flèche.
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-[9px] tracking-[0.12em] small-caps text-ink/65">
        2026 · Aix-en-Provence
      </div>
      <div className="aspect-[3/2] bg-surface" aria-hidden />
      <div className="flex items-baseline justify-between gap-3 mt-1">
        <div className="font-display italic text-[1.1rem] leading-tight text-ink">
          Panaille
        </div>
        <div className="font-display italic text-ink text-[1rem]">→</div>
      </div>
    </div>
  );
}

function NavigationPreview() {
  // Mini-header : logo gauche + liens droite, un lien actif avec filet dessous.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between border-b border-rule pb-2">
        <div className="font-display italic text-[0.85rem] leading-none text-ink">
          Jules Toussenel
        </div>
        <div className="flex items-baseline gap-3 font-sans text-[9px] text-ink">
          <span>Projets</span>
          <span className="pb-0.5 border-b border-rule-strong">Carnet</span>
          <span>Méthode</span>
          <span>À propos</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[8px] text-ink/65 tracking-[0.1em] small-caps">
        <span>Scroll ↓ — cache</span>
        <span className="opacity-40">·</span>
        <span>Scroll ↑ — revient</span>
      </div>
    </div>
  );
}

function ArticlePreview() {
  // Mini-layout longform : colonne principale + sidenote à droite.
  return (
    <div className="flex gap-2 w-full h-full items-stretch">
      <div className="flex-1 flex flex-col gap-1 py-1">
        <div className="h-1 bg-ink w-[60%]" aria-hidden />
        <div className="h-[3px]" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-full" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-[92%]" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-[95%]" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-[80%]" aria-hidden />
        <div className="h-[4px]" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-full" aria-hidden />
        <div className="h-0.5 bg-ink/30 w-[88%]" aria-hidden />
      </div>
      <div className="w-[22%] flex flex-col gap-1 pt-3 border-l border-rule pl-1.5">
        <div className="text-[8px] text-accent-deep font-sans">¹</div>
        <div className="h-0.5 bg-ink/20 w-[90%]" aria-hidden />
        <div className="h-0.5 bg-ink/20 w-[70%]" aria-hidden />
      </div>
    </div>
  );
}

function PerfPreview() {
  // 3 barres CWV avec leur niveau — LCP / INP / CLS toutes vertes.
  return (
    <div className="flex flex-col gap-3 w-full text-[9px] font-mono">
      {[
        { k: "LCP", v: "1.2 s" },
        { k: "INP", v: "120 ms" },
        { k: "CLS", v: "0.02" },
      ].map((x) => (
        <div key={x.k} className="flex items-center gap-3">
          <div className="w-8 text-ink">{x.k}</div>
          <div className="flex-1 h-1.5 bg-ink/10 relative">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-accent-deep" />
          </div>
          <div className="text-accent-deep w-12 text-right">{x.v}</div>
        </div>
      ))}
    </div>
  );
}

function CrawlPreview() {
  // Mini ligne user-agents : 2 bloqués, 2 autorisés.
  return (
    <div className="flex flex-col gap-2 w-full text-[9px] font-mono text-ink">
      <div className="flex items-baseline justify-between">
        <span>GPTBot</span>
        <span className="text-ink/65 small-caps tracking-wide">Bloqué</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span>ClaudeBot</span>
        <span className="text-ink/65 small-caps tracking-wide">Bloqué</span>
      </div>
      <div className="h-px bg-ink/15 my-0.5" />
      <div className="flex items-baseline justify-between">
        <span>Claude-User</span>
        <span className="text-accent-deep small-caps tracking-wide">Autorisé</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span>PerplexityBot</span>
        <span className="text-accent-deep small-caps tracking-wide">Autorisé</span>
      </div>
    </div>
  );
}

function FaviconPreview() {
  // Mini favicon — carré kaki + J italique blanc.
  return (
    <div className="flex items-end gap-4 w-full">
      <div className="size-14 bg-surface flex items-center justify-center">
        <span className="font-display italic text-[36px] leading-none text-bg pb-1">
          J
        </span>
      </div>
      <div className="size-8 bg-surface flex items-center justify-center">
        <span className="font-display italic text-[22px] leading-none text-bg pb-0.5">
          J
        </span>
      </div>
      <div className="size-5 bg-surface flex items-center justify-center">
        <span className="font-display italic text-[14px] leading-none text-bg pb-0.5">
          J
        </span>
      </div>
    </div>
  );
}

function MetaPreview() {
  // Mini OG image — composition typographique retenue.
  return (
    <div className="aspect-[1200/630] bg-bg border border-rule p-3 flex flex-col justify-between w-full">
      <div className="text-[7px] tracking-[0.2em] uppercase text-surface">
        Jules Toussenel
      </div>
      <div className="font-display italic text-[0.9rem] leading-none text-ink">
        Sites sur-mesure.
      </div>
      <div className="flex items-baseline justify-between text-[6px] text-surface border-t border-rule pt-1">
        <span className="tracking-[0.15em] uppercase">Portfolio</span>
        <span>julestoussenel.com</span>
      </div>
    </div>
  );
}

function A11yPreview() {
  // Un bloc avec un focus ring stylisé — symbolise l'accessibilité clavier.
  return (
    <div className="flex flex-col gap-3 w-full items-start">
      <div className="relative inline-block">
        <div className="bg-ink text-bg px-3 py-1.5 text-[11px] font-sans font-medium inline-flex items-center gap-1.5">
          Écrire <span className="font-display italic">→</span>
        </div>
        <div className="absolute -inset-1 border-2 border-accent-deep pointer-events-none" aria-hidden />
      </div>
      <div className="text-[9px] tracking-[0.04em] small-caps text-ink/65">
        Focus visible · WCAG 2.2 AA
      </div>
    </div>
  );
}

function ResponsivePreview() {
  // Trois cadrés empilés représentant les trois pivots : mobile, md, lg.
  return (
    <div className="flex items-end gap-1.5 w-full">
      <div className="w-[20%] h-10 bg-surface" aria-hidden />
      <div className="w-[35%] h-14 bg-surface/80" aria-hidden />
      <div className="flex-1 h-20 bg-surface/60" aria-hidden />
    </div>
  );
}

function LightPreview() {
  // Un soleil stylisé typographique + deux carrés inversés barrés.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3">
        <div className="size-8 bg-bg border border-rule-strong" aria-hidden />
        <div className="size-8 bg-ink relative" aria-hidden>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-px bg-accent-deep/60 rotate-45" />
          </div>
        </div>
      </div>
      <div className="font-display italic text-surface text-[1rem] leading-tight">
        Une palette
      </div>
      <div className="text-[9px] tracking-[0.04em] small-caps text-ink/65">
        color-scheme: light
      </div>
    </div>
  );
}

function StatesPreview() {
  // Un glyphe "404" kaki + filet + ligne de loading — évoque les 4 états clés.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="font-display italic text-accent-deep/40 text-[3rem] leading-none">
        404
      </div>
      <div className="relative h-px bg-ink/10 overflow-hidden">
        <span className="absolute inset-y-0 left-[30%] w-1/3 bg-accent-deep/60" />
      </div>
      <div className="text-[9px] tracking-[0.04em] small-caps text-ink/65">
        Typographie pure · filet 1 px
      </div>
    </div>
  );
}

function FormsPreview() {
  // Mini form : 2 labels + inputs en underline, un bouton dark.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-1">
        <div className="text-[9px] tracking-[0.04em] text-ink">Nom complet</div>
        <div className="h-3 border-b border-ink/30" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[9px] tracking-[0.04em] text-ink">Email</div>
        <div className="h-3 border-b-2 border-accent-deep" />
      </div>
      <div className="flex justify-end mt-1">
        <div className="bg-ink text-bg px-3 py-1 text-[9px] font-sans inline-flex items-center gap-1">
          Envoyer <span className="font-display italic">→</span>
        </div>
      </div>
    </div>
  );
}

function FooterPreview() {
  // Mini-footer : 3 colonnes miniatures + barre basse avec copyright.
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-3 gap-2 border-t border-rule pt-2">
        <div className="flex flex-col gap-1">
          <div className="text-[7px] tracking-[0.1em] small-caps text-ink/65">
            Sommaire
          </div>
          <div className="h-0.5 bg-ink/20 w-[70%]" />
          <div className="h-0.5 bg-ink/20 w-[55%]" />
          <div className="h-0.5 bg-ink/20 w-[65%]" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[7px] tracking-[0.1em] small-caps text-ink/65">
            Contact
          </div>
          <div className="h-0.5 bg-ink/20 w-[90%]" />
          <div className="h-0.5 bg-ink/20 w-[40%]" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[7px] tracking-[0.1em] small-caps text-ink/65">
            Colophon
          </div>
          <div className="h-0.5 bg-ink/15 w-full" />
          <div className="h-0.5 bg-ink/15 w-[88%]" />
          <div className="h-0.5 bg-ink/15 w-[72%]" />
        </div>
      </div>
      <div className="border-t border-rule pt-1 text-[8px] text-ink/65 font-sans">
        © 2026 — Jules Toussenel · <em className="italic">Aix-en-Provence</em>
      </div>
    </div>
  );
}

export default function Design() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="mx-auto max-w-default">
          <Breadcrumb items={[{ label: "Design" }]} />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="mx-auto max-w-default">
          <p className="font-display italic text-lead text-surface mb-6">
            La fabrique.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Ce qui <em className="italic text-surface">porte</em> le site.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch]">
            Ces pages consignent les choix qui font cohérence — la typographie
            qu&apos;on a retenue et écartée, la palette qu&apos;on a sculptée,
            l&apos;espace qu&apos;on laisse entre les choses. On les documente
            pour qu&apos;elles tiennent dans le temps, et parce qu&apos;un
            parti-pris qu&apos;on ne peut pas expliquer n&apos;en est pas
            vraiment un.
          </p>
        </div>
      </section>

      {/* CHAPITRES */}
      <section className="px-gutter pb-section-lg">
        <div className="mx-auto max-w-default">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15">
            {CHAPTERS.map((c) => (
              <Link
                key={c.slug}
                href={`/design/${c.slug}`}
                className="group relative bg-bg p-10 md:p-12 flex flex-col gap-12 transition-colors hover:bg-accent-warm/25"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-eyebrow uppercase text-ink/65">
                    Chapitre {c.n}
                  </span>
                  <span className="font-display italic text-2xl text-accent-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <div className="flex-1 flex items-center justify-center py-10">
                  {c.preview === "typography" && <TypographyPreview />}
                  {c.preview === "palette" && <PalettePreview />}
                  {c.preview === "space" && <SpacePreview />}
                  {c.preview === "grid" && <GridPreview />}
                  {c.preview === "lines" && <LinesPreview />}
                  {c.preview === "signs" && <SignsPreview />}
                  {c.preview === "motion" && <MotionPreview />}
                  {c.preview === "voice" && <VoicePreview />}
                  {c.preview === "images" && <ImagesPreview />}
                  {c.preview === "prose" && <ProsePreview />}
                  {c.preview === "components" && <ComponentsPreview />}
                  {c.preview === "cards" && <CardsPreview />}
                  {c.preview === "navigation" && <NavigationPreview />}
                  {c.preview === "footer" && <FooterPreview />}
                  {c.preview === "forms" && <FormsPreview />}
                  {c.preview === "states" && <StatesPreview />}
                  {c.preview === "light" && <LightPreview />}
                  {c.preview === "responsive" && <ResponsivePreview />}
                  {c.preview === "a11y" && <A11yPreview />}
                  {c.preview === "meta" && <MetaPreview />}
                  {c.preview === "favicon" && <FaviconPreview />}
                  {c.preview === "crawl" && <CrawlPreview />}
                  {c.preview === "perf" && <PerfPreview />}
                  {c.preview === "article" && <ArticlePreview />}
                </div>

                <div>
                  <h2 className="font-display text-h3 text-ink mb-4">
                    {c.title}
                  </h2>
                  <p className="text-body text-ink/75 max-w-[36ch]">
                    {c.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* À VENIR */}
      <section className="px-gutter py-section-sm border-t border-ink/15">
        <div className="mx-auto max-w-default">
          <p className="text-eyebrow uppercase text-ink/65 mb-6">
            À venir dans cette rubrique
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-3 font-display italic text-2xl text-ink/40">
            <span>Lenis « waou »</span>
          </div>
        </div>
      </section>

      <section className="px-gutter py-10 border-t border-ink/15">
        <div className="mx-auto max-w-default">
          <Link
            href="/"
            className="text-eyebrow uppercase text-ink/65 hover:text-accent-deep transition-colors"
          >
            ← Retour home
          </Link>
        </div>
      </section>
    </div>
  );
}
