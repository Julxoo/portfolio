"use client";

import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// Parcours — section sticky pour la page /a-propos.
//
// Pattern repris de Paolo Vendramini + Wodniack : titre massif Instrument
// Serif italic sticky à gauche, colonne droite qui défile avec 4 étapes
// numérotées. Chaque étape apparaît avec un léger décalage vertical au
// moment de sa révélation (data-revealed posé par useReveal sur le <ol>,
// propagé aux enfants via le variant `revealed:` du globals.css).
// =====================================================================

type Step = {
  num: string;
  year: string;
  title: string;
  body: string;
};

const PARCOURS: Step[] = [
  {
    num: "01",
    year: "2022 → 2024",
    title: "ATC Immobilier",
    body:
      "Alternance chez un promoteur marseillais — deux ans à livrer des fichiers à l'heure, à rappeler les clients le lundi matin, à envoyer les factures la même semaine. Rien de glamour, tout le fondamental. J'ai appris la rigueur opérationnelle qu'aucun cours ne donne.",
  },
  {
    num: "02",
    year: "2024",
    title: "Premiers sites, au cas par cas",
    body:
      "Des refontes en marge du boulot — pour des restaurateurs, des indépendants, des associations. J'ai appris à cadrer un projet court, à livrer propre, à écrire un devis qui tient. Chaque site a remplacé un template par quelque chose de dessiné.",
  },
  {
    num: "03",
    year: "Mars 2025",
    title: "Création de l'entreprise",
    body:
      "Dépôt des statuts, SIREN attribué. Installation à Aix-en-Provence, rue de Cuques. Un atelier à moi, une ligne éditoriale tenue courte — pas de template, une direction artistique par projet, une attention pleine à la fois.",
  },
  {
    num: "04",
    year: "2026 →",
    title: "Les premières maisons",
    body:
      "Une charte vivante sur /design qui précède chaque projet. Les premières études de cas arrivent à l'automne 2026. En attendant, je choisis les projets un par un — lent, précis, régulier.",
  },
];

export function Parcours() {
  const listRef = useReveal({ threshold: 0.1, rootMargin: "0px 0px -15% 0px" });

  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-24">
          {/* Titre sticky à gauche, style print — respire avec le scroll. */}
          <div className="md:sticky md:top-[15vh] h-fit">
            <div className="text-eyebrow uppercase text-ink/60 mb-4">
              Parcours
            </div>
            <h2 className="font-display italic text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-ink">
              Quatre
              <br />
              <em className="italic text-surface">étapes.</em>
            </h2>
            <p className="font-display text-body text-ink/70 leading-[1.75] max-w-[32ch] mt-8">
              De l&apos;alternance à l&apos;atelier freelance — chaque étape a
              changé quelque chose à la façon de livrer.
            </p>
          </div>

          {/* Liste numérotée à droite, stagger reveal via --i inline + variant. */}
          <ol
            ref={listRef as React.LegacyRef<HTMLOListElement>}
            data-revealed="false"
            className="flex flex-col gap-12 md:gap-16"
          >
            {PARCOURS.map((step, i) => (
              <li
                key={step.num}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 opacity-0 translate-y-4 revealed:opacity-100 revealed:translate-y-0 transition-all duration-deliberate ease-out-quint motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span
                  className="font-display italic text-[clamp(2.5rem,5vw,4rem)] leading-none text-surface tabular-nums pt-1"
                  aria-hidden
                >
                  {step.num}
                </span>
                <div>
                  <div className="text-eyebrow uppercase text-accent-deep mb-2 tracking-[0.08em]">
                    {step.year}
                  </div>
                  <h3 className="font-display italic text-[clamp(1.25rem,2.2vw,1.65rem)] leading-tight text-ink mb-3">
                    {step.title}
                  </h3>
                  <p className="font-display text-body text-ink/80 leading-[1.75] max-w-[48ch]">
                    {step.body}
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
