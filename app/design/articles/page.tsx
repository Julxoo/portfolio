import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Articles — Design",
  description:
    "Grille éditoriale longform. Colonne de lecture 42rem (65ch), sidenotes flottantes droite sur desktop ≥1024px, image full-bleed réservée aux moments pivot. Tufte adapté.",
};

type Layout = {
  breakpoint: string;
  layout: string;
  sidenotes: string;
  toc: string;
};

const RESPONSIVE: Layout[] = [
  { breakpoint: "< 768 px · mobile", layout: "1 colonne, max-w-reading = 100% - gutter. Images full-width.", sidenotes: "Footnotes numérotées en fin d'article (#fn-1)", toc: "<details> collapsé en haut si article > 1500 mots" },
  { breakpoint: "768-1023 px · tablette", layout: "1 colonne, marges qui grandissent. Pas encore de sidenotes.", sidenotes: "Footnotes en fin (comme mobile)", toc: "<details> collapsé" },
  { breakpoint: "≥ 1024 px · desktop", layout: "Grille 3 champs : reading 42rem + gap 2rem + sidenote 14rem", sidenotes: "Flottantes à droite, ancrage par exposant numéroté", toc: "Sticky gauche à partir de 1280 px, fade-in au 2e scroll" },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_LONGFORM: Banned[] = [
  { n: "01", title: "Progress bar de scroll", reason: "Gadget. Vole l'attention. La scrollbar native suffit." },
  { n: "02", title: "Bouton partage social flottant", reason: "Parasite visuel. Usage < 0,5 % des lecteurs. Pas la voix premium." },
  { n: "03", title: "« Articles liés » algorithmique", reason: "Juge éditorial remplacé par moteur. prev/next manuel suffit et respecte l'auteur." },
  { n: "04", title: "Commentaires", reason: "Bruit, modération lourde, pas la voix du portfolio. Un mailto « Une réaction ? » suffit." },
  { n: "05", title: "Popup newsletter intrusif", reason: "Agression. On intègre inline en footer d'article, jamais en modal." },
  { n: "06", title: "Adsense / sponsored inline", reason: "Hors positionnement premium. Pas un media financé par la pub." },
  { n: "07", title: "Lazy-loading sur le texte du corps", reason: "Saute le LCP, détruit la lecture. Texte toujours chargé immédiatement." },
  { n: "08", title: "Double colonne sur mobile", reason: "Illisible sous 600 px. Une colonne partout au-delà." },
  { n: "09", title: "Clickbait thumbnails dans prev/next", reason: "Une image sobre + un titre sobre. Pas de titre en emoji ou chiffre rond." },
  { n: "10", title: "Drop cap automatique sur tous les articles", reason: "Gadget forcé. Réservé à un dossier long, opt-in conscient, jamais par défaut." },
];

export default function Articles() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Articles" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Une colonne, des marges, rien de plus.
          </p>
          <h1 className="font-display text-display text-ink max-w-[18ch] mb-10">
            Longform, <em className="italic text-surface">Tufte adapté</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            L&apos;article longform suit la règle de l&apos;économie
            typographique&nbsp;: une colonne de lecture de 65 caractères
            max, une marge droite qui accueille sidenotes et marginalia
            (Tufte CSS adapté), des images qui respectent la colonne par
            défaut et ne débordent en{" "}
            <code className="font-mono text-accent-deep">full-bleed</code>{" "}
            qu&apos;aux moments éditoriaux forts. Zéro friction UI.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Colonne 42 rem · 65ch</span>
            <span>Sidenotes flottantes desktop</span>
            <span>Footnotes sur mobile</span>
            <span>Full-bleed uniquement pivot</span>
          </div>
        </div>
      </section>

      {/* 01 — STRUCTURE ARTICLE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Layout /carnet/[slug] — article longform" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Grille à trois champs sur desktop : colonne principale{" "}
            <code className="font-mono text-accent-deep">42 rem</code>,
            gap{" "}
            <code className="font-mono text-accent-deep">2 rem</code>,
            sidenote{" "}
            <code className="font-mono text-accent-deep">14 rem</code>. À
            droite et non à gauche — sens de lecture FR, l&apos;œil
            revient naturellement à gauche. Tufte CSS utilise{" "}
            <code className="font-mono text-accent-deep">float: right</code>
            {" "}avec{" "}
            <code className="font-mono text-accent-deep">
              margin-right: −60%
            </code>
            &nbsp;; on fait mieux avec{" "}
            <code className="font-mono text-accent-deep">grid</code> — pas
            de chevauchement, ancrage prévisible, mobile propre.
          </p>

          {/* Wireframe du layout */}
          <div className="border-t border-rule-strong pt-10">
            <Eyebrow>Wireframe — desktop ≥ 1024 px</Eyebrow>
            <div className="mt-6 font-mono text-caption text-ink/75 leading-relaxed bg-accent-warm/20 p-6 overflow-x-auto whitespace-pre">
{`┌─────────────────────────────────────────────────────────────┐
│          EYEBROW · CARNET                                   │
│          Titre de l'article, Instrument Serif, ~text-h3     │
│          Lead Instrument Sans 58ch, ink/80                  │
│          — — — — — — — — — — — — — — — — — —              │
│          28 mars 2026 · 7 min de lecture                    │
│                                                             │
│   Corps d'article 42rem (65ch).      ¹│ Sidenote 14rem     │
│   Paragraphes Instrument Sans 15     │  Instrument Sans    │
│   px, leading 1.65. Séparés par       │  text-caption, ink/ │
│   margin-bottom, pas d'indentation.   │  65, leading-snug. │
│                                       │                    │
│   Image inline — max-w-reading        │                    │
│   [ ratio 3:2 ou 4:5 ]                │                    │
│   Légende Instrument Serif italique   │                    │
│                                       │                    │
│   ✱  ✱  ✱   (ornement chapitre)       │                    │
│                                                             │
│   ——— Image full-bleed éditoriale max-w-wide ———            │
│                                                             │
│   Retour colonne lecture.             ²│ Autre sidenote    │
│                                       │                    │
│          — — — — — — — — — — —        │                    │
│          Tags (pastilles)                                   │
│          [← Précédent]   [Suivant →]                        │
└─────────────────────────────────────────────────────────────┘`}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — STRUCTURE CASE STUDY */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Layout /projets/[slug] — étude de cas" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Plus visuel, plus respirant. Le texte n&apos;est plus la
                colonne vertébrale — il tisse entre des images. La
                largeur par défaut est{" "}
                <code className="font-mono text-accent-deep">narrow</code>{" "}
                ou{" "}
                <code className="font-mono text-accent-deep">wide</code>,
                pas{" "}
                <code className="font-mono text-accent-deep">reading</code>.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                Hero pleine largeur ratio 16:9 ou 3:2. Header projet en
                grille 6 colonnes — H1 cols 1-4, méta{" "}
                <code className="font-mono text-accent-deep">&lt;dl&gt;</code>{" "}
                cols 5-6 (client, année, lieu, rôle, lien live).
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Sections alternées&nbsp;: texte narratif{" "}
                <code className="font-mono text-accent-deep">reading</code>,
                image pleine largeur{" "}
                <code className="font-mono text-accent-deep">wide</code>,
                grille 3-col d&apos;artefacts. Pas de sidenotes — la voix
                est plus directe sur un case study.
              </p>
            </div>

            <div className="font-mono text-caption text-ink/75 leading-relaxed bg-bg p-5 border border-rule overflow-x-auto whitespace-pre">
{`┌─ HERO full-bleed 3:2 ─────────────────┐
│  image projet                         │
└───────────────────────────────────────┘

Eyebrow · Projet 2026
Nom du projet                Client
Instrument Serif             Année
                             Lieu
                             Rôle
                             Lien live ↗

    Texte narratif — reading 42rem

┌─ Image wide ─────────────────────────┐
│                                      │
└──────────────────────────────────────┘

    Retour texte reading

┌─ 1fr ─┐┌─ 1fr ─┐┌─ 1fr ─┐
│ img   ││ img   ││ img   │
└───────┘└───────┘└───────┘

    Clôture texte reading

─────────────────────────────
       Projet suivant →
─────────────────────────────`}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — RESPONSIVE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Responsive — trois paliers" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Le seuil clé est <strong>1024 px</strong> — en-dessous, la
            colonne lecture + sidenote 14 rem ne tient pas avec nos
            gutters. On passe donc les sidenotes en footnotes
            numérotées en fin d&apos;article, ancrées par{" "}
            <code className="font-mono text-accent-deep">#fn-1</code>,{" "}
            <code className="font-mono text-accent-deep">#fn-2</code>,
            etc.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.3fr_2fr_1.5fr_1.5fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Breakpoint</div>
              <div>Layout</div>
              <div>Sidenotes</div>
              <div>TOC</div>
            </div>
            {RESPONSIVE.map((r) => (
              <div
                key={r.breakpoint}
                className="grid md:grid-cols-[1.3fr_2fr_1.5fr_1.5fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink leading-tight">
                  {r.breakpoint}
                </div>
                <div className="text-caption text-ink/75">{r.layout}</div>
                <div className="text-caption text-ink/75">{r.sidenotes}</div>
                <div className="text-caption text-ink/75">{r.toc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CODE */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Code retenu" onSurface />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="text-body opacity-80 max-w-[42ch] mb-6">
                Grille CSS avec{" "}
                <code className="font-mono text-accent-warm">
                  grid-template-columns
                </code>{" "}
                en 5 pistes. La colonne 2 porte le texte, la colonne 4
                porte les sidenotes. Sur mobile, la grille devient{" "}
                <code className="font-mono text-accent-warm">
                  grid-cols-1
                </code>
                {" "}et les sidenotes passent en fin via{" "}
                <code className="font-mono text-accent-warm">
                  display: contents
                </code>{" "}
                + ordering.
              </p>
              <p className="text-body opacity-75 max-w-[42ch]">
                Pattern Tufte classique via{" "}
                <code className="font-mono text-accent-warm">counter-reset</code>{" "}
                +{" "}
                <code className="font-mono text-accent-warm">
                  counter-increment
                </code>{" "}
                pour numéroter les sidenotes automatiquement.
              </p>
            </div>

            <pre className="font-mono text-caption text-ink/80 bg-bg p-6 leading-relaxed overflow-x-auto">
{`// app/carnet/[slug]/page.tsx
<article className="grid grid-cols-[1fr_min(42rem,100%)_2rem_14rem_1fr]
                    gap-x-0 px-gutter
                    max-lg:grid-cols-1
                    max-lg:max-w-reading max-lg:mx-auto">
  <header className="col-start-2 col-span-3 mb-section-md
                     border-b border-rule-strong pb-8">
    <Eyebrow>Carnet</Eyebrow>
    <h1 className="font-display text-h3 mt-4">{title}</h1>
    <p className="text-lead max-w-[58ch] mt-6">{lead}</p>
    <Meta date={date} readingTime={minutes} className="mt-10" />
  </header>

  <div className="col-start-2 font-sans text-body">
    {body}
  </div>

  <aside aria-label="Notes"
         className="col-start-4 space-y-12 text-caption
                    text-ink/65 max-lg:hidden">
    {sidenotes.map((n, i) => (
      <Sidenote key={i} num={i + 1} {...n} />
    ))}
  </aside>

  <nav className="col-start-2 col-span-3 mt-section-lg
                  border-t border-rule-strong pt-8">
    <PrevNext prev={prev} next={next} />
  </nav>
</article>`}
            </pre>
          </div>
        </div>
      </section>

      {/* 05 — BANNIS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Le longform éditorial attire beaucoup de parasites UI —
            progress bar, partage social, articles liés, commentaires.
            Chacun retire de l&apos;autorité au texte. On s&apos;en passe
            tous.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_LONGFORM.map((b) => (
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
        prev={{ label: "Relire — Performance", href: "/design/performance" }}
        next={{ label: "Index design", href: "/design" }}
      />
    </div>
  );
}
