"use client";

import { type CSSProperties } from "react";
import { useReveal } from "../_lib/motion/useReveal";

// Terrain — version minimaliste : titre net, un filet qui se trace (scaleX),
// puis trois informations en grille. Aucun décor. Reveal via useReveal
// (fondu-montée) ; reduced-motion neutralise les transitions, tout reste posé.

const FACTS = [
  { label: "Atelier", value: "Aix-en-Provence" },
  { label: "Périmètre", value: "France entière, à distance" },
  { label: "Rendez-vous", value: "En visio, ou autour d'une table" },
];

const REVEAL =
  "opacity-0 translate-y-4 revealed:opacity-100 revealed:translate-y-0 transition-all duration-deliberate ease-out-quint motion-reduce:transition-none";

export function Terrain() {
  const reveal = useReveal({ threshold: 0.25 });

  return (
    <section
      ref={reveal as React.LegacyRef<HTMLElement>}
      data-revealed="false"
      className="px-gutter py-section-lg border-t border-rule relative z-[2]"
    >
      <div className="max-w-default mx-auto">
        <div className={`text-eyebrow uppercase text-ink/60 mb-5 ${REVEAL}`}>
          Le terrain
        </div>
        <h2
          className={`font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-ink max-w-[20ch] ${REVEAL}`}
          style={{ transitionDelay: "80ms" }}
        >
          Basé à Aix-en-Provence,{" "}
          <span className="text-ink/40">disponible à mesure.</span>
        </h2>

        {/* Le filet qui se trace — geste signé, réduit à l'essentiel. */}
        <div
          className="mt-16 md:mt-24 h-px bg-rule-strong origin-left scale-x-0 revealed:scale-x-100 transition-transform duration-[1200ms] ease-out-quint motion-reduce:transition-none"
        />

        {/* Trois informations, aérées. */}
        <dl className="grid md:grid-cols-3 gap-x-12 gap-y-12 pt-10 md:pt-12">
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className={REVEAL}
              style={{ transitionDelay: `${260 + i * 110}ms` } as CSSProperties}
            >
              <dt className="text-[11px] uppercase tracking-[0.2em] text-ink/45 mb-3">
                {f.label}
              </dt>
              <dd className="font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.3] text-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
