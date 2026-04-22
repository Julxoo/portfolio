"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Reveal, Rule } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════
   Identité visuelle · Jules Toussenel
   Atelier chaleureux · Spécimen N° 01 · MMXXVI
   ═══════════════════════════════════════════════════════════ */

const EDITION = {
  number: "N° 01",
  year: "MMXXVI",
  city: "Aix-en-Provence",
  language: "FR",
  studio: "Atelier chaleureux",
};

const palette = {
  fonds: [
    { name: "Bone", hex: "#F5F1E8", role: "Fond principal, surface de lecture" },
    { name: "Chalk", hex: "#EDE7DA", role: "Surface seconde, alternance de rythme" },
    { name: "Sand", hex: "#E8E0CE", role: "Surface alternative, zones calmes" },
  ],
  textes: [
    { name: "Ink", hex: "#1A1A1A", role: "Texte principal, hauts contrastes" },
    { name: "Smoke", hex: "#6E695F", role: "Texte secondaire lisible" },
    { name: "Stone", hex: "#9E978A", role: "Captions, métadonnées, folios" },
  ],
  accents: [
    { name: "Ochre", hex: "#C4732D", role: "Accent unique · action, hover, signal" },
    { name: "Ochre Soft", hex: "#E89C5A", role: "Rehausse discrète, dégradés" },
    { name: "Moss", hex: "#3D4A3A", role: "Statut actif, contraste vert sourd" },
    { name: "Clay", hex: "#8B4A3C", role: "État d'alerte, accent terracotta" },
  ],
};

const chapters = [
  { num: "01", title: "Voix", dek: "Ton, intention, silence.", folio: "004" },
  { num: "02", title: "Palette", dek: "Sept tokens, un seul accent chaud.", folio: "007" },
  { num: "03", title: "Typographie", dek: "Fraunces & Inter.", folio: "010" },
  { num: "04", title: "Composition", dek: "Grille de 8, rythme, règle.", folio: "013" },
  { num: "05", title: "Mouvement", dek: "Trois courbes, durées tenues.", folio: "015" },
  { num: "06", title: "Application", dek: "L'identité en contexte.", folio: "017" },
];

/* ─── Helpers ─────────────────────────────────────────── */

function RunningHead({
  folio,
  inverted = false,
}: {
  folio: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-6 pt-8 md:px-12 md:pt-10 font-mono text-[10px] uppercase tracking-[0.2em] ${
        inverted ? "text-bone/50" : "text-stone"
      }`}
    >
      <span>Jules Toussenel · Atelier chaleureux</span>
      <span className="tabular-nums">P. {folio}</span>
    </div>
  );
}

function ChapterMark({
  num,
  title,
  dek,
  inverted = false,
}: {
  num: string;
  title: string;
  dek: string;
  inverted?: boolean;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <div className="mb-8 flex items-baseline gap-4">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
            inverted ? "text-ochre-soft" : "text-stone"
          }`}
        >
          Chapitre · {num}
        </span>
        <div className={`h-px flex-1 ${inverted ? "bg-bone/20" : "bg-mist"}`} />
      </div>
      <Reveal>
        <h2
          className="font-serif font-light leading-[0.92] tracking-[-0.02em]"
          style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
        >
          {title}.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p
          className={`mt-10 max-w-xl font-serif italic ${
            inverted ? "text-bone/70" : "text-smoke"
          }`}
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
        >
          {dek}
        </p>
      </Reveal>
    </div>
  );
}

function Label({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
        inverted ? "text-bone/50" : "text-stone"
      }`}
    >
      {children}
    </p>
  );
}

/* ─── Page ────────────────────────────────────────────── */

export default function DesignSystemPage() {
  return (
    <main className="bg-bone font-sans text-ink">
      <Cover />
      <EditorsLetter />
      <TableOfContents />
      <ChapterVoix />
      <ChapterPalette />
      <ChapterTypographie />
      <ChapterComposition />
      <ChapterMouvement />
      <ChapterApplication />
      <Colophon />
    </main>
  );
}

/* ─── Cover ────────────────────────────────────────────── */

function Cover() {
  return (
    <section className="relative flex min-h-screen flex-col bg-bone">
      <RunningHead folio="001" />

      <div className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
          <Reveal>
            <Label>{EDITION.studio} · Spécimen {EDITION.year}</Label>
          </Reveal>
          <Reveal delay={150}>
            <h1
              className="mt-10 font-serif font-light leading-[0.88] tracking-[-0.025em]"
              style={{ fontSize: "clamp(4rem, 15vw, 16rem)" }}
            >
              Identité
              <br />
              <span className="italic text-ochre">visuelle.</span>
            </h1>
          </Reveal>
          <Reveal delay={350}>
            <div className="mt-12 flex items-baseline gap-6">
              <div className="h-px w-16 bg-ink md:w-24" />
              <p
                className="font-serif italic"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
              >
                Jules Toussenel
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="flex items-end justify-between px-6 pb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-stone md:px-12 md:pb-12">
        <span>
          {EDITION.number} · {EDITION.city} · {EDITION.language}
        </span>
        <span className="flex items-center gap-4">
          <span className="hidden md:inline">Lecture continue</span>
          <span className="relative block h-10 w-px overflow-hidden bg-stone/40">
            <span className="absolute inset-0 block bg-ochre animate-scroll-hint" />
          </span>
        </span>
      </div>
    </section>
  );
}

/* ─── Editor's Letter ─────────────────────────────────── */

function EditorsLetter() {
  return (
    <section className="bg-bone">
      <RunningHead folio="002" />
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-48">
        <Reveal>
          <Label>Colophon d&apos;ouverture</Label>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-[1fr,1fr] md:gap-24">
          <Reveal delay={100}>
            <p
              className="font-serif font-light leading-[1.3] tracking-[-0.01em]"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
            >
              Ce document rassemble les règles visuelles qui gouvernent
              l&apos;écriture de{" "}
              <span className="italic">julestoussenel.com</span> · la voix, la
              palette, les lettres, la composition, le mouvement.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="max-w-[460px] md:pt-6">
              <p className="font-sans text-[15px] leading-[1.75] text-ink/75">
                Aucune section n&apos;est décorative. Chaque choix répond à une
                intention. L&apos;identité s&apos;articule sur trois tensions :
                encre et craie, sérif et sans, humain et rigueur.
              </p>
              <p className="mt-6 font-sans text-[15px] leading-[1.75] text-ink/75">
                L&apos;atelier est chaleureux sans être browné, précis sans
                être froid · une matière d&apos;artisan contemporain.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Table of Contents ───────────────────────────────── */

function TableOfContents() {
  return (
    <section className="bg-chalk">
      <RunningHead folio="003" />
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-48">
        <Reveal>
          <Label>Sommaire</Label>
        </Reveal>

        <div className="mt-16 md:mt-24">
          {chapters.map((ch, i) => (
            <Reveal key={ch.num} delay={i * 60}>
              <a
                href={`#ch-${ch.num}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(`ch-${ch.num}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group grid grid-cols-[auto,1fr,auto] items-baseline gap-4 border-t border-mist py-6 transition-colors duration-500 hover:border-ink md:gap-8 md:py-8"
                style={{ transitionTimingFunction: "var(--ease-luxury)" }}
              >
                <span
                  className="font-mono text-xs tabular-nums text-stone transition-colors duration-500 group-hover:text-ink md:text-sm"
                  style={{ transitionTimingFunction: "var(--ease-hover)" }}
                >
                  {ch.num}
                </span>
                <div>
                  <h3
                    className="font-serif font-normal leading-[1.05] tracking-[-0.015em] transition-all duration-500 group-hover:italic group-hover:text-ochre"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
                      transitionTimingFunction: "var(--ease-luxury)",
                    }}
                  >
                    {ch.title}
                  </h3>
                  <p
                    className="mt-2 font-serif italic text-smoke"
                    style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}
                  >
                    {ch.dek}
                  </p>
                </div>
                <span className="font-mono text-xs tabular-nums text-stone md:text-sm">
                  P. {ch.folio}
                </span>
              </a>
            </Reveal>
          ))}
          <div className="border-t border-mist" />
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 01 · Voix (inverted) ─────────────────────── */

function ChapterVoix() {
  return (
    <section id="ch-01" className="bg-ink text-bone">
      <RunningHead folio="004" inverted />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-24">
        <ChapterMark
          num="01"
          title="Voix"
          dek="Ton, intention, silence."
          inverted
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <Reveal>
          <blockquote
            className="max-w-5xl font-serif font-light italic leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
          >
            On ne crie pas. On pose.
            <br />
            Chaque mot porte parce qu&apos;on en laisse moins.
          </blockquote>
        </Reveal>
      </div>

      <div className="border-t border-bone/15">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:grid-cols-3 md:gap-12 md:px-12 md:py-32">
          {[
            {
              num: "I",
              t: "Tenue",
              d: "Le ton reste haut sans être froid. Vouvoiement d'usage, jamais familier, jamais distant.",
            },
            {
              num: "II",
              t: "Retenue",
              d: "Pas de superlatif, pas de promesse creuse. Montrer, pas raconter.",
            },
            {
              num: "III",
              t: "Cadence",
              d: "Des phrases courtes rythmées par des longues. La ponctuation tient le souffle.",
            },
          ].map((p, i) => (
            <Reveal key={p.num} delay={i * 100}>
              <div>
                <p
                  className="font-serif italic text-ochre-soft"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
                >
                  {p.num}
                </p>
                <h3
                  className="mt-4 font-serif font-normal"
                  style={{ fontSize: "clamp(1.5rem, 2vw, 1.75rem)" }}
                >
                  {p.t}
                </h3>
                <p className="mt-5 font-sans text-[15px] leading-[1.75] text-bone/70">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 02 · Palette ────────────────────────────── */

function ChapterPalette() {
  return (
    <section id="ch-02" className="bg-bone">
      <RunningHead folio="007" />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-16">
        <ChapterMark
          num="02"
          title="Palette"
          dek="Trois fonds, trois neutres de texte, un accent chaud qui travaille pour tout le site."
        />
      </div>

      {/* Plate A · Couple primaire */}
      <div className="mt-8 bg-ink text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-32 md:grid-cols-[3fr,2fr] md:px-12 md:py-48">
          <div>
            <Label inverted>Plate A · Couple primaire</Label>
            <p
              className="mt-10 font-serif font-light leading-[1.1] tracking-[-0.015em]"
              style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
            >
              <span className="italic">Ink</span> sur Bone · le mariage qui
              porte toute la lecture.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3">
            {[
              { n: "Ink", h: "#1A1A1A" },
              { n: "Bone", h: "#F5F1E8" },
            ].map((c) => (
              <div
                key={c.h}
                className="flex items-baseline justify-between border-t border-bone/20 pt-3 font-mono text-xs tabular-nums"
              >
                <span className="text-bone/90">{c.n}</span>
                <span className="text-bone/50">{c.h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plate B · Accent ochre */}
      <div className="bg-chalk">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-32 md:grid-cols-[5fr,3fr] md:items-end md:gap-24 md:px-12 md:py-48">
          <div>
            <Label>Plate B · Accent unique</Label>
            <p
              className="mt-10 font-serif font-light leading-[1.1] tracking-[-0.015em]"
              style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.75rem)" }}
            >
              L&apos;<span className="italic text-ochre">ochre</span>{" "}
              n&apos;apparaît qu&apos;aux charnières · action, hover, signal.
              <br />
              La rareté fait la valeur.
            </p>
          </div>
          <div>
            <div className="aspect-[5/4] w-full bg-ochre" />
            <div className="mt-4 flex items-baseline justify-between border-t border-mist pt-3 font-mono text-xs tabular-nums">
              <span>Ochre</span>
              <span className="text-stone">#C4732D</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plate C · Index */}
      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
          <Label>Index des couleurs</Label>
          <div className="mt-16 grid gap-16 md:grid-cols-3">
            {[
              { key: "fonds", title: "Fonds" },
              { key: "textes", title: "Texte" },
              { key: "accents", title: "Accents" },
            ].map((group) => (
              <div key={group.key}>
                <p
                  className="font-serif italic text-smoke"
                  style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}
                >
                  {group.title}
                </p>
                <ul className="mt-8 space-y-5">
                  {palette[group.key as keyof typeof palette].map((c) => (
                    <li
                      key={c.hex}
                      className="flex items-start gap-4 border-t border-mist pt-4"
                    >
                      <span
                        className="block h-10 w-10 shrink-0 border border-mist"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-sans text-[13px]">{c.name}</span>
                          <span className="font-mono text-[11px] tabular-nums text-stone">
                            {c.hex}
                          </span>
                        </div>
                        <p className="mt-1 font-sans text-xs text-smoke">
                          {c.role}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 03 · Typographie ────────────────────────── */

function ChapterTypographie() {
  return (
    <section id="ch-03" className="bg-bone">
      <RunningHead folio="010" />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-16">
        <ChapterMark
          num="03"
          title="Typographie"
          dek="Deux familles. Une pour dire, l'autre pour montrer."
        />
      </div>

      {/* Big Aa specimens */}
      <div className="border-t border-mist">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          <div className="border-mist p-8 md:border-r md:p-16">
            <div className="mb-10 flex items-baseline justify-between">
              <Label>Sérif · Display</Label>
              <span className="font-mono text-[11px] tabular-nums text-stone">
                01 / 02
              </span>
            </div>
            <div
              className="font-serif font-light leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
            >
              Aa
            </div>
            <dl className="mt-12 space-y-3 font-mono text-xs tabular-nums text-stone">
              {[
                ["Nom", "Fraunces"],
                ["Usage", "Titres, citations, emphase"],
                ["Styles", "Roman · Italic (variable)"],
                ["Interligne", "0.95 – 1.30"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between border-t border-mist pt-3"
                >
                  <dt>{k}</dt>
                  <dd className="text-ink/80">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-mist p-8 md:border-t-0 md:p-16">
            <div className="mb-10 flex items-baseline justify-between">
              <Label>Sans · Texte</Label>
              <span className="font-mono text-[11px] tabular-nums text-stone">
                02 / 02
              </span>
            </div>
            <div
              className="font-sans font-light leading-none"
              style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
            >
              Aa
            </div>
            <dl className="mt-12 space-y-3 font-mono text-xs tabular-nums text-stone">
              {[
                ["Nom", "Inter"],
                ["Usage", "Corps, labels, UI"],
                ["Graisses", "400 · 500"],
                ["Interligne", "1.60 – 1.75"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between border-t border-mist pt-3"
                >
                  <dt>{k}</dt>
                  <dd className="text-ink/80">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Italic Fraunces showcase */}
      <div className="border-t border-mist bg-chalk">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
          <Label>Fraunces · italique</Label>
          <p
            className="mt-10 max-w-5xl font-serif font-light italic leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
          >
            &laquo;&nbsp;Un caractère contemporain, vivant, à la plume tenue.&nbsp;&raquo;
          </p>
          <p className="mt-8 max-w-xl font-sans text-[14px] leading-[1.75] text-smoke">
            L&apos;italique de Fraunces remplace ici la posture Cormorant. Même chaleur
            éditoriale, davantage de caractère, moins de parfum fashion.
          </p>
        </div>
      </div>

      {/* Editorial scale */}
      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-48">
          <Label>Échelle éditoriale</Label>

          <div className="mt-16 space-y-12 md:space-y-16">
            {[
              {
                label: "Display",
                meta: "serif · 300",
                family: "serif",
                italic: false,
                weight: 300,
                size: "clamp(3rem, 7vw, 6rem)",
                sample: "Crafting quiet digital objects.",
              },
              {
                label: "Title",
                meta: "serif · 400",
                family: "serif",
                italic: false,
                weight: 400,
                size: "clamp(2rem, 3.5vw, 3rem)",
                sample: "Services & réalisations",
              },
              {
                label: "Pull quote",
                meta: "serif italic · 400",
                family: "serif",
                italic: true,
                weight: 400,
                size: "clamp(1.25rem, 2vw, 1.75rem)",
                sample: "Code propre, performances tenues, maintenance simple.",
              },
              {
                label: "Lead",
                meta: "sans · 400 · 18 / 1.7",
                family: "sans",
                italic: false,
                weight: 400,
                size: "clamp(1.1rem, 1.4vw, 1.25rem)",
                sample:
                  "Je conçois et développe des applications web sur-mesure pour les entreprises.",
              },
              {
                label: "Body",
                meta: "sans · 400 · 16 / 1.75",
                family: "sans",
                italic: false,
                weight: 400,
                size: "1rem",
                sample:
                  "Phase d'écoute et de cadrage. Traduction des besoins métier en spécifications claires.",
              },
              {
                label: "Caption · Mono",
                meta: "mono · 400 · uppercase",
                family: "mono",
                italic: false,
                weight: 400,
                size: "0.75rem",
                sample: "AIX-EN-PROVENCE · MMXXVI · SPECIMEN N° 01",
              },
            ].map((s) => {
              const familyClass =
                s.family === "serif"
                  ? "font-serif"
                  : s.family === "mono"
                  ? "font-mono"
                  : "font-sans";
              return (
                <Reveal key={s.label}>
                  <div className="grid grid-cols-[110px,1fr] items-baseline gap-6 border-t border-mist pt-6 md:grid-cols-[200px,1fr] md:gap-12 md:pt-8">
                    <div>
                      <Label>{s.label}</Label>
                      <p className="mt-2 font-mono text-[10px] tabular-nums text-stone/70">
                        {s.meta}
                      </p>
                    </div>
                    <p
                      className={`${familyClass} ${s.italic ? "italic" : ""} leading-[1.2] ${
                        s.family === "mono" ? "uppercase tracking-[0.15em]" : ""
                      }`}
                      style={{ fontSize: s.size, fontWeight: s.weight }}
                    >
                      {s.sample}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 04 · Composition ────────────────────────── */

function ChapterComposition() {
  return (
    <section id="ch-04" className="bg-chalk">
      <RunningHead folio="013" />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-16">
        <ChapterMark
          num="04"
          title="Composition"
          dek="Grille de 8. Douze colonnes à l'écran. Le blanc porte autant que le noir."
        />
      </div>

      {/* Grid overlay demo */}
      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <Label>Grille 12 colonnes · rendue visible</Label>
        <div className="relative mt-8 aspect-[16/10] border border-mist bg-bone">
          <div className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-4 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-l border-ochre/15 last:border-r" />
            ))}
          </div>
          <div className="relative flex h-full flex-col justify-between p-8 md:p-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone">
              Exemple · Bloc hero
            </p>
            <div>
              <p
                className="font-serif font-light leading-[1.05] tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)" }}
              >
                Applications web sur-mesure,
                <br />
                de l&apos;idée à la production.
              </p>
              <p className="mt-6 max-w-md font-sans text-[13px] leading-[1.7] text-smoke">
                La typographie occupe six colonnes sur douze. Les marges
                latérales sont strictement symétriques.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing scale */}
      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
          <Label>Échelle d&apos;espacement · base 8</Label>
          <div className="mt-16 space-y-2">
            {[8, 16, 24, 32, 48, 64, 96, 128, 160].map((v, i) => (
              <Reveal key={v} delay={i * 30}>
                <div className="flex items-center gap-6 border-t border-mist pt-3">
                  <span className="w-16 shrink-0 font-mono text-[11px] tabular-nums text-stone">
                    {v}px
                  </span>
                  <span
                    className="block h-2 bg-ink/15"
                    style={{ width: `min(${v * 2.5}px, 72vw)` }}
                  />
                  <span className="font-mono text-[11px] tabular-nums text-stone/70">
                    {v / 8}×
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
          <Label>Règles & séparateurs</Label>
          <div className="mt-16 space-y-16">
            <div>
              <p className="mb-4 font-mono text-[11px] tabular-nums text-stone">
                Règle pleine · séparateur majeur
              </p>
              <Rule />
            </div>
            <div>
              <p className="mb-4 font-mono text-[11px] tabular-nums text-stone">
                Règle courte · signature de section
              </p>
              <div className="w-24">
                <Rule />
              </div>
            </div>
            <div>
              <p className="mb-4 font-mono text-[11px] tabular-nums text-stone">
                Filet composé · rail + étiquette
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px w-16 bg-ink" />
                <span className="font-serif text-sm italic text-smoke">
                  détail
                </span>
                <div className="h-px flex-1 bg-mist" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 05 · Mouvement ──────────────────────────── */

function ChapterMouvement() {
  const [clipKey, setClipKey] = useState(0);

  return (
    <section id="ch-05" className="bg-bone">
      <RunningHead folio="015" />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-16">
        <ChapterMark
          num="05"
          title="Mouvement"
          dek="Le mouvement souligne, ne décore jamais. Trois courbes, durées tenues."
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
        <Label>Courbes · survolez ou touchez chaque ligne</Label>
        <div className="mt-12 space-y-12 md:space-y-16">
          {[
            {
              name: "Luxury",
              css: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
              use: "Transitions majeures · images, titres, révélations",
            },
            {
              name: "Enter",
              css: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
              use: "Éléments entrants · reveals au scroll",
            },
            {
              name: "Hover",
              css: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              use: "Interactions rapides · liens, boutons, champs",
            },
          ].map((c) => (
            <EasingTrack key={c.name} {...c} />
          ))}
        </div>
      </div>

      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-40">
          <div className="mb-12 flex items-baseline justify-between">
            <Label>Clip reveal · bas vers haut</Label>
            <button
              onClick={() => setClipKey((k) => k + 1)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone transition-colors duration-300 hover:text-ochre"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              Rejouer ↻
            </button>
          </div>
          <ClipRevealDemo key={clipKey} />
        </div>
      </div>
    </section>
  );
}

/* ─── Chapter 06 · Application ────────────────────────── */

function ChapterApplication() {
  return (
    <section id="ch-06" className="bg-bone">
      <RunningHead folio="017" />
      <div className="mx-auto max-w-[1400px] px-6 pt-32 md:px-12 md:pt-48 md:pb-16">
        <ChapterMark
          num="06"
          title="Application"
          dek="L'identité mise en contexte. Chaque pièce assemble les règles précédentes."
        />
      </div>

      <ApplicationPlate label="Hero · page d'accueil">
        <div className="bg-chalk px-8 py-24 md:px-16 md:py-40">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
            Développeur web freelance · Aix-en-Provence
          </p>
          <h3
            className="mt-12 font-serif font-light leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            Applications web sur-mesure,
            <br />
            de l&apos;idée à la production.
          </h3>
          <div className="mt-16 h-px w-24 bg-ink" />
        </div>
      </ApplicationPlate>

      <ApplicationPlate label="Boutons · primaire plein & secondaire outline">
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            className="bg-ochre px-7 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-bone transition-all duration-300 hover:bg-ink active:scale-[0.98]"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            Démarrer un projet
          </button>
          <button
            type="button"
            className="border border-ink px-7 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-ink transition-all duration-300 hover:bg-ink hover:text-bone active:scale-[0.98]"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            Voir les réalisations
          </button>
          <button
            type="button"
            className="font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-ochre underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            En savoir plus
          </button>
        </div>
      </ApplicationPlate>

      <ApplicationPlate label="Entrée de projet · liste des réalisations">
        <a href="#" className="group block">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <h3
              className="font-serif font-normal transition-colors duration-[600ms] group-hover:text-ochre"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                transitionTimingFunction: "var(--ease-luxury)",
              }}
            >
              CRM sur-mesure · ATC Immobilier
            </h3>
            <p className="shrink-0 font-mono text-xs tabular-nums text-stone">
              2025 · En cours
            </p>
          </div>
          <p className="max-w-2xl font-sans text-[15px] leading-[1.75] text-ink/75">
            CRM immobilier commercial remplaçant Salesforce. Matching
            intelligent, cartographie interactive, enrichissement automatisé.
          </p>
        </a>
      </ApplicationPlate>

      <ApplicationPlate label="Citation éditoriale">
        <blockquote
          className="max-w-4xl border-l-2 border-ochre pl-8 font-serif font-light italic leading-[1.25] tracking-[-0.015em]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          Chaque projet est construit pour durer · code propre, performances
          tenues, maintenance simple.
        </blockquote>
      </ApplicationPlate>

      <ApplicationPlate label="Bloc FAQ">
        <div className="max-w-3xl">
          <AccordionDemo />
        </div>
      </ApplicationPlate>

      <ApplicationPlate label="Bloc de contact">
        <div className="max-w-2xl">
          <Label>Contact</Label>
          <h3
            className="mt-6 font-serif font-light tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Parlons de votre projet.
          </h3>
          <a
            href="mailto:toussenelj@gmail.com"
            className="group mt-12 inline-flex items-center gap-3 font-serif italic text-ochre transition-colors duration-[400ms] hover:text-ink"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              transitionTimingFunction: "var(--ease-hover)",
            }}
          >
            toussenelj@gmail.com
            <span
              className="inline-block transition-transform duration-[400ms] group-hover:translate-x-1"
              style={{ transitionTimingFunction: "var(--ease-hover)" }}
            >
              →
            </span>
          </a>
        </div>
      </ApplicationPlate>
    </section>
  );
}

function ApplicationPlate({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-mist">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <Label>{label}</Label>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

/* ─── Colophon ────────────────────────────────────────── */

function Colophon() {
  return (
    <section className="bg-ink text-bone">
      <RunningHead folio="020" inverted />
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-12 md:py-48">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ochre-soft">
            Colophon
          </p>
        </Reveal>

        <Reveal delay={100}>
          <p
            className="mt-12 max-w-4xl font-serif font-light italic leading-[1.3] tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Ce spécimen est édité et mis à jour au fil de l&apos;écriture du
            site. Il est la grammaire qui gouverne chaque page.
          </p>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-bone/15 pt-16 md:grid-cols-4">
          {[
            { label: "Édition", value: `${EDITION.number} · ${EDITION.year}` },
            { label: "Caractères", value: "Fraunces · Inter · Geist Mono" },
            { label: "Outillage", value: "Next.js · Tailwind · TypeScript" },
            { label: "Atelier", value: `${EDITION.city} · France` },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 80}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
                  {m.label}
                </p>
                <p
                  className="mt-4 font-serif text-bone/90"
                  style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}
                >
                  {m.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-32 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
          <span>Fin du spécimen</span>
          <span>© MMXXVI · Jules Toussenel</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Interactive demos ───────────────────────────────── */

function EasingTrack({
  name,
  css,
  use,
}: {
  name: string;
  css: string;
  use: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="border-t border-mist pt-6"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onTouchStart={() => setPlaying(true)}
      onTouchEnd={() => setPlaying(false)}
    >
      <div className="mb-5 flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-6">
          <span
            className="font-serif"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            {name}
          </span>
          <span className="font-mono text-[11px] tabular-nums text-stone">
            {css}
          </span>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-stone/70 md:inline">
          Survol
        </span>
      </div>
      <div className="relative h-px bg-mist">
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-ochre transition-all duration-[1000ms]"
          style={{
            left: playing ? "calc(100% - 10px)" : "0px",
            transitionTimingFunction: css,
          }}
        />
      </div>
      <p className="mt-4 font-sans text-[13px] text-smoke">{use}</p>
    </div>
  );
}

function ClipRevealDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-[16/9] border border-mist bg-chalk"
      style={
        {
          clipPath: visible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: "clip-path 1000ms var(--ease-luxury)",
        } as CSSProperties
      }
    >
      <div className="flex h-full items-center justify-center px-8">
        <p
          className="text-center font-serif italic text-smoke"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)" }}
        >
          Dévoilement du bas vers le haut.
        </p>
      </div>
    </div>
  );
}

function AccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = [
    {
      q: "Quel est le délai pour un site vitrine ?",
      a: "Entre une et trois semaines selon la complexité. Un délai précis est donné dès le devis.",
    },
    {
      q: "L'hébergement est-il inclus ?",
      a: "Oui. Seul le coût du nom de domaine reste à votre charge, renouvelable chaque année.",
    },
    {
      q: "Peut-on faire évoluer le site ensuite ?",
      a: "Oui. Le site est livré avec un accès complet. Les évolutions sont gérées sur devis.",
    },
  ];

  return (
    <div className="border-t border-mist">
      {items.map((item, i) => (
        <div key={i} className="border-b border-mist">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:text-ochre"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            <span
              className="pr-4 font-serif font-normal"
              style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
            >
              {item.q}
            </span>
            <span
              className="shrink-0 font-mono text-sm text-stone transition-transform duration-300"
              style={{
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              +
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-[400ms]"
            style={{
              maxHeight: openIndex === i ? "300px" : "0px",
              opacity: openIndex === i ? 1 : 0,
              transitionTimingFunction: "var(--ease-luxury)",
            }}
          >
            <p className="max-w-2xl pb-6 font-sans text-[15px] leading-[1.75] text-ink/70">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
