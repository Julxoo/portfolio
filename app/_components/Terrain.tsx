"use client";

import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// Terrain — quatre zones concentriques depuis Aix.
//
// SVG de 4 cercles qui se dessinent progressivement au scroll via
// stroke-dashoffset. Chaque cercle correspond à une zone de déplacement
// commentée dans la colonne de droite. Le geste signé "trait qui naît"
// est repris des patterns Codrops (stroke-dasharray scroll-linked).
// =====================================================================

type Zone = {
  radius: number; // rayon SVG en unités viewBox 400
  label: string;
  range: string;
  body: string;
};

const ZONES: Zone[] = [
  {
    radius: 42,
    label: "Aix-en-Provence",
    range: "Le bureau",
    body: "29 rue de Cuques, 13100. Tout se dessine et se code ici. C'est aussi là qu'on se retrouve pour les premiers rendez-vous.",
  },
  {
    radius: 92,
    label: "Provence · Côte d'Azur",
    range: "Marseille, Avignon, Nice — 1h30 de route",
    body: "Déplacements inclus pour les premiers rendez-vous et la livraison. Le reste se fait à distance, par écrit — c'est mieux pour tout le monde.",
  },
  {
    radius: 160,
    label: "Paris · Lyon",
    range: "Sur invitation, quelques fois par an",
    body: "Les entretiens parisiens se tiennent en présentiel quand ils ont du sens. Train plutôt qu'avion, sauf urgence.",
  },
  {
    radius: 210,
    label: "France entière",
    range: "À distance, tout le reste du temps",
    body: "La majorité des projets se livrent sans se voir en face — emails, appels courts, partage d'URL privée. La distance ne change rien à la qualité.",
  },
];

const CENTER = 200;

function circumference(r: number) {
  return 2 * Math.PI * r;
}

export function Terrain() {
  const sectionRef = useReveal({ threshold: 0.2 });

  return (
    <section
      ref={sectionRef as React.LegacyRef<HTMLElement>}
      data-revealed="false"
      className="px-gutter py-section-lg border-t border-rule relative z-[2]"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Le terrain</div>
        <h2 className="font-display italic text-[clamp(2rem,4vw,3rem)] leading-tight text-ink max-w-[20ch] mb-section-md">
          Basé à Aix, disponible à mesure.
        </h2>

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-start">
          {/* SVG concentric circles */}
          <div className="relative aspect-square max-w-[min(90vw,520px)] w-full">
            <svg
              viewBox="0 0 400 400"
              aria-hidden
              className="w-full h-full"
              style={{ color: "var(--color-surface)" }}
            >
              <title>Rayon d&apos;action depuis Aix-en-Provence</title>
              {/* Filets de grille latents, pâles */}
              <line
                x1="0"
                y1={CENTER}
                x2="400"
                y2={CENTER}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <line
                x1={CENTER}
                y1="0"
                x2={CENTER}
                y2="400"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />

              {ZONES.map((zone, i) => {
                const c = circumference(zone.radius);
                return (
                  <circle
                    key={zone.radius}
                    cx={CENTER}
                    cy={CENTER}
                    r={zone.radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray={c}
                    strokeDashoffset={c}
                    style={{
                      transition:
                        "stroke-dashoffset 1400ms var(--eoq), opacity 400ms linear",
                      transitionDelay: `${i * 180}ms`,
                      opacity: 0.65,
                      transform: "rotate(-90deg)",
                      transformOrigin: `${CENTER}px ${CENTER}px`,
                    }}
                    className="revealed:[stroke-dashoffset:0]"
                  />
                );
              })}

              {/* Point central Aix */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r="5"
                fill="currentColor"
                opacity="0"
                className="revealed:opacity-100 transition-opacity duration-standard"
                style={{ transitionDelay: "200ms" }}
              />
              <text
                x={CENTER + 12}
                y={CENTER + 4}
                fontSize="11"
                fill="currentColor"
                className="font-sans opacity-0 revealed:opacity-100 transition-opacity duration-standard"
                style={{
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transitionDelay: "350ms",
                }}
              >
                AIX
              </text>
            </svg>
          </div>

          {/* Liste des zones */}
          <ol className="flex flex-col gap-10">
            {ZONES.map((zone, i) => (
              <li
                key={zone.label}
                className="grid grid-cols-[auto_1fr] gap-5 opacity-0 translate-y-3 revealed:opacity-100 revealed:translate-y-0 transition-all duration-deliberate ease-out-quint motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
                style={{ transitionDelay: `${200 + i * 180}ms` }}
              >
                <div className="pt-2">
                  <div
                    aria-hidden
                    className="rounded-full border border-surface"
                    style={{
                      width: `${Math.min(28, 10 + i * 6)}px`,
                      height: `${Math.min(28, 10 + i * 6)}px`,
                    }}
                  />
                </div>
                <div>
                  <div className="text-eyebrow uppercase text-accent-deep mb-2 tracking-[0.08em]">
                    {zone.range}
                  </div>
                  <h3 className="font-display italic text-[clamp(1.25rem,2.2vw,1.65rem)] leading-tight text-ink mb-2">
                    {zone.label}
                  </h3>
                  <p className="font-display text-body text-ink/80 leading-[1.6] max-w-[46ch]">
                    {zone.body}
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
