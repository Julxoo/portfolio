"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "../_lib/motion/useReveal";

// =====================================================================
// Chiffres — quatre mesures de l'atelier, count-up au reveal.
//
// Pattern Wodniack `.s__award--counter` : quand la section entre en view,
// chaque chiffre s'anime de 0 à sa valeur cible, avec un stagger entre
// les quatre. Easing easeOutExpo pour un arrêt net et élégant.
//
// Les valeurs sont factuelles et liées à la méthode (3 semaines type,
// 4 étapes, 1 mois de garantie, 0 template) — jamais de stat de volume
// ou de ratio client qu'on ne peut pas prouver.
// =====================================================================

type Stat = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 3, suffix: " sem.", label: "la durée type d'un projet vitrine, de l'échange à la livraison" },
  { value: 4, label: "étapes — échange, conception, développement, livraison" },
  { value: 1, suffix: " mois", label: "de garantie après mise en ligne, bugs et coquilles corrigés sans compter" },
  { value: 0, label: "template. Une direction artistique dessinée par projet, toujours." },
];

function StatCell({
  stat,
  active,
  index,
}: {
  stat: Stat;
  active: boolean;
  index: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!active) return;
    const delay = index * 140;
    const duration = 1400;
    const start = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        // Attendre le délai — on maintient 0 en attendant.
        if (ref.current) ref.current.textContent = "0";
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - 2 ** (-10 * t);
      const current = Math.round(eased * stat.value);
      if (ref.current) ref.current.textContent = String(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value, index]);

  return (
    <div className="flex flex-col">
      <div className="font-display italic text-[clamp(4rem,11vw,9rem)] leading-[0.9] text-ink flex items-baseline">
        {stat.prefix && (
          <span className="text-surface text-[0.55em] mr-1">{stat.prefix}</span>
        )}
        <span ref={ref} className="tabular-nums">
          0
        </span>
        {stat.suffix && (
          <span className="text-surface text-[0.55em] ml-1">{stat.suffix}</span>
        )}
      </div>
      <p className="mt-4 font-display text-body text-ink/70 leading-[1.5] max-w-[28ch]">
        {stat.label}
      </p>
    </div>
  );
}

export function Chiffres() {
  const [active, setActive] = useState(false);
  const setRevealRef = useReveal({ threshold: 0.2 });

  // On combine notre useReveal avec un local state — useReveal pose
  // data-revealed mais on a besoin d'un signal React pour lancer la
  // boucle d'animation.
  const setRef = (node: HTMLElement | null) => {
    setRevealRef(node);
    if (node) {
      // Observer local pour setActive (lancement animation).
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setActive(true);
            obs.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      obs.observe(node);
    }
  };

  return (
    <section
      ref={setRef}
      data-revealed="false"
      className="px-gutter py-section-xl border-t border-rule relative z-[2]"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">
          Cadre de travail
        </div>
        <h2 className="font-display italic text-[clamp(2rem,4vw,3rem)] leading-tight text-ink max-w-[22ch] mb-section-md">
          Le cadre avant les chiffres.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-16 border-t border-rule-strong pt-12">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
