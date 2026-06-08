"use client";

import { SlideLink } from "../_lib/ui/Link";
import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// MethodeHome — version scroll-driven de la méthode pour la home.
//
// 4 étapes, chacune avec :
//   - Numéro géant Instrument Serif italic en sticky dans son propre bloc
//   - Titre + durée + description à droite
// Le numéro reste collé pendant le défilement du bloc, puis le numéro
// suivant prend le relais. Impression de chapitrage.
//
// La version complète et tabulée reste sur /methode — ici c'est un résumé
// éditorial qui montre la cadence.
// =====================================================================

type Phase = {
  num: string;
  name: string;
  duration: string;
  body: string;
};

const PHASES: Phase[] = [
  {
    num: "01",
    name: "Échange",
    duration: "3 jours",
    body:
      "Deux appels, un questionnaire court. Je comprends votre maison, vos clients, votre calendrier. On tranche la direction artistique avant d'écrire une ligne de code.",
  },
  {
    num: "02",
    name: "Conception",
    duration: "8 jours",
    body:
      "Maquettes Figma, prototype cliquable desktop + mobile, trois aller-retours inclus. Vous voyez le site tel qu'il sera, pas une version abstraite.",
  },
  {
    num: "03",
    name: "Développement",
    duration: "14 jours",
    body:
      "Publication progressive sur une URL privée. Relecture à chaque chapitre. Pas de grande révélation finale — vous commentez sur la version vivante.",
  },
  {
    num: "04",
    name: "Livraison",
    duration: "2 jours",
    body:
      "Mise en ligne, connexion du domaine, une heure de formation sur l'admin. Un mois de garantie — je corrige les bugs sans compter.",
  },
];

function Phase({ phase, index }: { phase: Phase; index: number }) {
  const revealRef = useReveal({ threshold: 0.18 });
  return (
    <div
      ref={revealRef as React.LegacyRef<HTMLDivElement>}
      data-revealed="false"
      className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-20 py-12 md:py-20 border-b border-rule last:border-b-0"
    >
      <div className="md:sticky md:top-[15vh] h-fit min-w-[6ch]">
        <span
          aria-hidden
          className="font-display italic text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-surface tabular-nums block"
        >
          {phase.num}
        </span>
      </div>
      <div
        className="opacity-0 translate-y-4 revealed:opacity-100 revealed:translate-y-0 transition-all duration-deliberate ease-out-quint motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0"
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        <div className="text-eyebrow uppercase text-accent-deep mb-3 tracking-[0.08em]">
          {phase.duration}
        </div>
        <h3 className="font-display italic text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-ink mb-5">
          {phase.name}
        </h3>
        <p className="font-display text-body text-ink/85 leading-[1.75] max-w-[52ch]">
          {phase.body}
        </p>
      </div>
    </div>
  );
}

export function MethodeHome() {
  return (
    <section className="px-gutter py-section-lg bg-accent-warm/20 border-t border-rule relative z-[2]">
      <div className="max-w-default mx-auto">
        <div className="flex items-baseline justify-between gap-6 mb-section-md flex-wrap">
          <div>
            <div className="text-eyebrow uppercase text-ink/60 mb-3">
              Méthode
            </div>
            <h2 className="font-display italic text-[clamp(2rem,4vw,3rem)] leading-tight text-ink max-w-[18ch]">
              Trois semaines, quatre étapes.
            </h2>
          </div>
          <SlideLink href="/methode">Lire la méthode complète</SlideLink>
        </div>

        <div className="border-t border-rule-strong">
          {PHASES.map((p, i) => (
            <Phase key={p.num} phase={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
