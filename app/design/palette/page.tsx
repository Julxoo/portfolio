import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Palette — Design",
  description:
    "Pinède sur toile — la palette retenue pour julestoussenel.com. Six rôles sémantiques, cinq nuances de kaki, pair pattern shadcn.",
};

type Role = {
  key: string;
  hex: string;
  role: string;
  usage: string;
  fg: "text-ink" | "text-bg";
  pair?: string;
};

const ROLES: Role[] = [
  { key: "bg",           hex: "#F4F1E8", role: "Fond",           usage: "Page, respiration, fond courant",           fg: "text-ink", pair: "bg-foreground · #1F1F1B" },
  { key: "surface",      hex: "#535040", role: "Surface",        usage: "Hero, sections denses, nav sombre",         fg: "text-bg",  pair: "surface-foreground · #F4F1E8" },
  { key: "ink",          hex: "#1F1F1B", role: "Encre",          usage: "Texte courant, titres",                     fg: "text-bg" },
  { key: "accent-warm",  hex: "#D9C7A7", role: "Accent chaud",   usage: "Badges, hover, CTA primaire",               fg: "text-ink", pair: "accent-warm-foreground · #1F1F1B" },
  { key: "accent-deep",  hex: "#8C6A4A", role: "Accent profond", usage: "Liens, eyebrows, année active",             fg: "text-bg",  pair: "accent-deep-foreground · #F4F1E8" },
  { key: "muted",        hex: "#A8A189", role: "Muté",           usage: "Légendes, metadata, texte secondaire",      fg: "text-ink" },
];

type Nuance = { hex: string; name: string; ref: string; note: string; selected?: boolean };

const NUANCES: Nuance[] = [
  { hex: "#535040", name: "Olive Night",     ref: "Pantone 19-0515",     note: "Gris-olive neutre, lisible à l'écran. Valeur retenue — c'est notre surface.", selected: true },
  { hex: "#63563B", name: "Military Olive",  ref: "Pantone 19-0622",     note: "Plus chaud, plus terrain. Superbe à côté du cuir et du bois." },
  { hex: "#726454", name: "Salon Drab",      ref: "Farrow & Ball 290",   note: "Chocolat à peine vert. Kaki de salon 19e, totalement anti-militaire." },
  { hex: "#6B6A4C", name: "Le Philanthrope", ref: "Ressource R502",      note: "Kaki parisien. Fonctionne en UI secondaire ou en accent d'un bloc." },
  { hex: "#4A4A2E", name: "Galleria Olive",  ref: "Prada Galleria 2023", note: "Presque noir, vibre en vert sous lumière chaude. Pour les sections très denses." },
];

type Rejected = { n: string; name: string; summary: string; reason: string; hex: string };

const REJECTED: Rejected[] = [
  {
    n: "Alt 01",
    name: "Phantom",
    hex: "#4A2E1F",
    summary: "Marron Rolls-Royce Burnt Oak + cuir Connolly Seashell + Walnut Burr.",
    reason:
      "Magnifique mais plus intimiste — un vestibule feutré plutôt qu'une pinède ouverte. Laissé en réserve pour un client futur.",
  },
  {
    n: "Alt 02",
    name: "Vanquish",
    hex: "#1F2B45",
    summary: "Midnight Blue Aston Martin + cuir Sahara Tan + Bright Walnut.",
    reason:
      "Contraste complémentaire bleu/orange impeccable mais ton trop « club anglais », moins en phase avec la cible méditerranéenne.",
  },
];

export default function Palette() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Palette" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un kaki posé sur du lin, réchauffé par une lumière de midi.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Pinède <em className="italic text-surface">sur toile.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Notre palette ne cherche pas à surprendre — elle cherche à durer.
            Six rôles sémantiques, nommés par fonction et non par valeur.
            L&apos;olive qui domine vient de Pantone et des boutiques Jacquemus,
            les accents chauds de Ressource Peintures, le cuir d&apos;Aesop.
            Aucun hasard.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>6 couleurs · 1 palette</span>
            <span>4 paires foreground</span>
            <span>5 nuances de kaki en réserve</span>
            <span>Aucune dépendance à une lib externe</span>
          </div>
        </div>
      </section>

      {/* 01 — LES SIX RÔLES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Les six rôles sémantiques" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            On nomme les couleurs par <em className="italic">ce qu&apos;elles
            font</em>, pas par leur valeur. Un nom comme{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              surface
            </code>{" "}
            survit à un changement de teinte ; un nom comme{" "}
            <code className="font-mono text-accent-deep bg-accent-warm/30 px-1.5 py-0.5">
              olive-500
            </code>{" "}
            devient absurde dès qu&apos;on ajuste la nuance.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ink/15">
            {ROLES.map((r) => (
              <div
                key={r.key}
                className="aspect-[3/4] relative"
                style={{ background: r.hex }}
              >
                <div
                  className="absolute inset-0 p-6 flex flex-col justify-end"
                  style={{
                    background: `linear-gradient(to top, ${r.hex}f6 45%, transparent 100%)`,
                  }}
                >
                  <div
                    className={`text-eyebrow uppercase opacity-90 mb-2 ${r.fg}`}
                  >
                    {r.role}
                  </div>
                  <div
                    className={`font-display text-[1.5rem] leading-none mb-3 ${r.fg}`}
                  >
                    {r.key}
                  </div>
                  <code
                    className={`font-mono text-caption opacity-80 block mb-3 ${r.fg}`}
                  >
                    {r.hex}
                  </code>
                  <p className={`text-caption opacity-70 ${r.fg}`}>
                    {r.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — PAIR PATTERN */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Le pair pattern — foreground" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16">
            <div>
              <p className="text-body text-ink/80 max-w-[44ch] mb-6">
                Chaque surface colorée expose la couleur de texte qui lui va.
                Pour <code className="font-mono text-accent-deep">bg-surface</code>,
                Tailwind sait automatiquement qu&apos;on utilise{" "}
                <code className="font-mono text-accent-deep">
                  text-surface-foreground
                </code>
                .
              </p>
              <p className="text-body text-ink/80 max-w-[44ch]">
                C&apos;est le pattern popularisé par shadcn/ui. Il remplace les
                fonctions <code className="font-mono">getContrast()</code>{" "}
                calculées à l&apos;exécution — plus propre, plus prévisible,
                testable d&apos;un coup d&apos;œil dans le CSS.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {ROLES.filter((r) => r.pair).map((r) => (
                <div
                  key={r.key}
                  className="flex items-stretch border border-ink/10"
                >
                  <div
                    className="w-1/2 p-6"
                    style={{ background: r.hex }}
                  >
                    <div
                      className={`text-eyebrow uppercase opacity-75 mb-2 ${r.fg}`}
                    >
                      {r.key}
                    </div>
                    <code
                      className={`font-mono text-caption opacity-85 ${r.fg}`}
                    >
                      {r.hex}
                    </code>
                  </div>
                  <div className="w-1/2 p-6 bg-bg">
                    <div className="text-eyebrow uppercase text-ink/65 mb-2">
                      Pair foreground
                    </div>
                    <code className="font-mono text-caption text-ink/80">
                      {r.pair}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — NUANCES DE KAKI */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Cinq nuances de kaki" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            La surface peut bouger sur cette plage selon le contexte — une
            landing plus chaleureuse, un portail plus austère. Chaque nuance a
            une référence culturelle qui la légitime : Pantone, Farrow &amp;
            Ball, Ressource, Prada.
          </p>

          <ul className="flex flex-col border-t border-ink/15">
            {NUANCES.map((n) => (
              <li
                key={n.hex}
                className="flex items-center gap-6 py-6 border-b border-ink/10"
              >
                <span
                  className="flex-shrink-0 size-16 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]"
                  style={{ background: n.hex }}
                />
                <div className="flex-1 min-w-0 grid md:grid-cols-[1.2fr_1.5fr] gap-4 items-baseline">
                  <div>
                    <div className="font-display text-[1.35rem] leading-tight text-ink flex items-baseline gap-3">
                      {n.name}
                      {n.selected && (
                        <span className="text-eyebrow uppercase text-accent-deep">
                          · Retenue
                        </span>
                      )}
                    </div>
                    <div className="text-eyebrow uppercase text-ink/65 mt-1">
                      {n.ref}
                    </div>
                  </div>
                  <p className="font-display text-body text-ink/80">
                    {n.note}
                  </p>
                </div>
                <code className="font-mono text-caption text-surface">
                  {n.hex}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — TERRITOIRES ÉCARTÉS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Les territoires écartés" onSurface />
          <p className="text-body opacity-75 max-w-[58ch] mb-16">
            Avant de retenir le kaki, on a construit deux alternatives abouties
            autour du marron de luxe et du marine automobile. Elles ne
            disparaissent pas — elles restent en réserve, documentées, pour un
            futur client ou une déclinaison qu&apos;on n&apos;a pas encore vue
            venir.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {REJECTED.map((r) => (
              <article
                key={r.name}
                className="border border-surface-foreground/20 p-8"
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="text-eyebrow uppercase opacity-55">
                    {r.n}
                  </span>
                  <span
                    className="size-8"
                    style={{ background: r.hex }}
                    aria-hidden
                  />
                </div>
                <h3 className="font-display italic text-[1.8rem] leading-tight mb-4">
                  {r.name}
                </h3>
                <p className="text-body opacity-80 mb-4">{r.summary}</p>
                <p className="text-caption opacity-65">{r.reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Index design", href: "/design" }}
        next={{ label: "Relire — Typographie", href: "/design/typographie" }}
      />
    </div>
  );
}
