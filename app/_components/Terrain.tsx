"use client";

import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// Terrain — « La ligne de crête ».
//
// Le geste signé du site (le trait qui naît) appliqué au lieu : une crête
// stylisée — la Sainte-Victoire, l'horizon d'Aix — se TRACE de l'ouest vers
// l'est au scroll (stroke-dashoffset, pathLength normalisé). Derrière, un
// soleil de Provence se lève (dégradé chaud qui monte et s'allume). Aix est
// marqué au sommet ; le texte, distillé, dit l'essentiel : ancré ici,
// disponible partout.
//
// Aucune carte spec-sheet, aucune coordonnée : composition type-led, aérée.
// Reveal via useReveal (IntersectionObserver → data-revealed). Reduced-motion :
// la règle globale neutralise les transitions → tout s'affiche posé, dessiné.
// =====================================================================

// Crête stylisée (viewBox 1000×240) : longue pente ouest, sommet à Aix,
// chute est plus franche, puis collines vers l'horizon.
const RIDGE = "M0 182 L150 174 L300 96 L340 56 L400 96 L470 150 L620 166 L780 150 L1000 170";
const PEAK_X = 340; // sommet (Aix) — aligné avec l'overlay du repère (34 %)

export function Terrain() {
  const reveal = useReveal({ threshold: 0.25 });

  return (
    <section
      ref={reveal as React.LegacyRef<HTMLElement>}
      data-revealed="false"
      className="px-gutter py-section-lg border-t border-rule relative z-[2]"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Le terrain</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.06] text-ink max-w-[22ch]">
          Basé à Aix-en-Provence,{" "}
          <em className="italic text-accent-deep">disponible à mesure</em>.
        </h2>

        {/* La scène — décor : la crête qui se trace, le soleil qui se lève.
            Le repère « Aix » est un overlay HTML (lisible à toute taille,
            contrairement à un <text> SVG qui rapetisse en mobile). */}
        <div className="relative mt-12 md:mt-16">
          <svg
            viewBox="0 0 1000 240"
            aria-hidden="true"
            className="w-full h-auto block overflow-visible"
            style={{ color: "var(--color-surface)" }}
          >
            <defs>
              <radialGradient id="terrainSun" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="var(--color-accent-warm)"
                  stopOpacity="0.6"
                />
                <stop
                  offset="55%"
                  stopColor="var(--color-accent-warm)"
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent-warm)"
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            {/* Le soleil — derrière la crête, se lève au reveal. */}
            <circle
              cx={PEAK_X}
              cy="120"
              r="98"
              fill="url(#terrainSun)"
              className="opacity-0 [transform:translateY(34px)] revealed:opacity-100 revealed:[transform:translateY(0)]"
              style={{
                transition:
                  "opacity 1400ms var(--eoq), transform 1600ms var(--eoq)",
              }}
            />

            {/* Filet d'horizon, latent. */}
            <line
              x1="0"
              y1="196"
              x2="1000"
              y2="196"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />

            {/* La crête — se trace d'ouest en est. */}
            <path
              d={RIDGE}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              className="revealed:[stroke-dashoffset:0]"
              style={{ transition: "stroke-dashoffset 2000ms var(--eoq)" }}
            />

          </svg>

          {/* Aix au sommet — overlay HTML (point + nom), posé une fois la
              crête tracée. Positionné sur le pic (34 % × 23,3 % du viewBox). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: "34%", top: "23.3%", transform: "translate(-50%, -50%)" }}
          >
            <div className="relative flex flex-col items-center">
              <span
                className="absolute bottom-full mb-2 whitespace-nowrap font-display text-[13px] md:text-[15px] text-surface opacity-0 revealed:opacity-100"
                style={{ transition: "opacity 600ms linear 1650ms" }}
              >
                Aix-en-Provence
              </span>
              <span
                className="block h-[9px] w-[9px] rounded-full bg-surface opacity-0 revealed:opacity-100"
                style={{ transition: "opacity 500ms linear 1500ms" }}
              />
            </div>
          </div>
        </div>

        {/* Le texte — distillé, type-led. */}
        <p className="mt-12 md:mt-14 font-display text-lead text-ink/85 leading-[1.6] max-w-[54ch]">
          Le bureau est à Aix. De là, les projets partent partout en France —
          le plus souvent par écrit, parfois autour d&apos;une table pour les
          premiers rendez-vous. La distance ne change rien à la tenue du
          travail.
        </p>
      </div>
    </section>
  );
}
