"use client";

import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// Manifeste — section sticky column, 3 principes de l'atelier.
//
// Gauche : H2 sticky "Le manifeste" en Instrument Serif italic géant.
// Droite : 3 principes numérotés 01/02/03, reveals staggered via useReveal.
// Pattern Paolo Vendramini : nav sticky + contenu qui défile.
// =====================================================================

type Principle = {
  num: string;
  title: string;
  body: string;
};

const PRINCIPES: Principle[] = [
  {
    num: "01",
    title: "Un projet à la fois",
    body:
      "Pas de dossiers en parallèle. Quand je signe un projet, c'est le seul en cours — du premier appel jusqu'à la livraison. L'attention reste entière, les décisions ne se diluent pas entre trois clients.",
  },
  {
    num: "02",
    title: "Pas de template",
    body:
      "Chaque site est dessiné depuis la typographie, la palette, la grille — pas acheté sur ThemeForest et habillé. Si la DA ne se défend pas à l'oral devant vous, elle n'existe pas.",
  },
  {
    num: "03",
    title: "Publié au fil de l'eau",
    body:
      "Pas de grande révélation finale. Le site se construit sur une URL privée, section par section. Vous commentez sur la version vivante, jamais sur une maquette figée.",
  },
];

export function Manifeste() {
  const listRef = useReveal({ threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  return (
    <section className="px-gutter py-section-lg border-t border-rule relative z-[2]">
      <div className="max-w-default mx-auto">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
          {/* Sticky title */}
          <div className="md:sticky md:top-[18vh] h-fit">
            <div className="text-eyebrow uppercase text-ink/60 mb-5">
              Le manifeste
            </div>
            <h2 className="font-display italic text-[clamp(2.25rem,6vw,5.25rem)] leading-[0.95] text-ink">
              Trois
              <br />
              <em className="italic text-surface">règles</em>
              <br />
              tenues.
            </h2>
          </div>

          {/* Principles */}
          <ol
            ref={listRef as React.LegacyRef<HTMLOListElement>}
            data-revealed="false"
            className="flex flex-col gap-14 md:gap-20 md:pt-[18vh]"
          >
            {PRINCIPES.map((p, i) => (
              <li
                key={p.num}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 opacity-0 translate-y-4 revealed:opacity-100 revealed:translate-y-0 transition-all duration-deliberate ease-out-quint motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <span
                  aria-hidden
                  className="font-display italic text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-surface tabular-nums"
                >
                  {p.num}
                </span>
                <div>
                  <h3 className="font-display italic text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight text-ink mb-4">
                    {p.title}
                  </h3>
                  <p className="font-display text-body text-ink/80 leading-[1.75] max-w-[52ch]">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
