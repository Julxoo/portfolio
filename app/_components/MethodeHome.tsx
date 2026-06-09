"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useTempus } from "tempus/react";
import { SlideLink } from "../_lib/ui/Link";

// =====================================================================
// MethodeHome — « Les étapes se posent ».
//
// Système d'empilement de cartes répliqué de lenis.dev (feature-cards), habillé
// à notre DA. Section haute (piste de scroll) + enfant sticky qui épingle titre
// + scène. Au scroll, chaque étape est POSÉE à un cran :
//
//   r        = clamp(0, -rect.top / (hauteur - viewport), 1)   // progression épinglée
//   current  = floor((nbCartes + 1) * r)                        // combien sont posées
//
// Le JS ne fait QUE basculer la classe .current ; le CSS anime la pose (.ms-*).
// Avec 9 cartes, current = floor(10·r) — identique à lenis. Le pas de l'escalier
// = espace/(N-1) est plus petit que la carte → chevauchement dense.
//
// Piloté par Tempus (rAF partagé) → marche avec ou sans Lenis (desktop ET
// tactile). reduced-motion / sans-JS : data-ready jamais posé → les cartes
// restent visibles à leur position de repos, sans mouvement imposé.
//
// Le détail des quatre phases vit sur /methode ; ici, le parcours geste à geste.
// =====================================================================

type Step = {
  num: string;
  phase: string;
  label: string;
  detail: string;
};

const STEPS: Step[] = [
  { num: "01", phase: "Échange", label: "Premier appel", detail: "On cadre le projet, le ton, le calendrier." },
  { num: "02", phase: "Échange", label: "Questionnaire", detail: "Vos clients, vos références, vos contraintes." },
  { num: "03", phase: "Échange", label: "Direction artistique", detail: "On tranche la DA avant la première ligne de code." },
  { num: "04", phase: "Conception", label: "Maquettes Figma", detail: "Desktop et mobile, dessinés au pixel près." },
  { num: "05", phase: "Conception", label: "Prototype cliquable", detail: "Le site tel qu'il sera, déjà navigable." },
  { num: "06", phase: "Développement", label: "Développement", detail: "Publié au fil de l'eau, sur une URL privée." },
  { num: "07", phase: "Développement", label: "Relecture vivante", detail: "Vous commentez la version réelle, pas une maquette." },
  { num: "08", phase: "Livraison", label: "Mise en ligne", detail: "Domaine, performances, une heure de formation." },
  { num: "09", phase: "Livraison", label: "Garantie · 1 mois", detail: "Bugs et coquilles corrigés sans compter." },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function MethodeHome() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const idxRef = useRef(0);
  const enabledRef = useRef(false);
  const [current, setCurrent] = useState(0);

  // reduced-motion → on désactive le mécanisme : cartes visibles, statiques.
  useEffect(() => {
    const section = sectionRef.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      enabledRef.current = !mq.matches;
      if (!section) return;
      if (mq.matches) section.removeAttribute("data-ready");
      else section.dataset.ready = "true";
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pose des cartes au scroll. Tempus = rAF partagé (avec/sans Lenis).
  useTempus(() => {
    if (!enabledRef.current) return;
    const section = sectionRef.current;
    if (!section) return;
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const rect = section.getBoundingClientRect();
    const r = clamp(-rect.top / total, 0, 1);
    const next = Math.floor((STEPS.length + 1) * r);
    if (next !== idxRef.current) {
      idxRef.current = next;
      setCurrent(next);
    }
  });

  return (
    <section
      ref={sectionRef}
      data-section="methode"
      className="ms-section bg-accent-warm/20 border-t border-rule z-[2]"
      aria-label="La méthode, étape par étape"
      style={
        {
          "--ms-count": STEPS.length,
          "--ms-steps": STEPS.length - 1,
        } as CSSProperties
      }
    >
      <div className="ms-sticky">
        <div className="ms-head">
          <div className="text-eyebrow uppercase text-ink/60 mb-3">Méthode</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[0.98] text-ink max-w-[14ch] md:ml-auto">
            Le projet, <span className="text-surface">étape par étape.</span>
          </h2>
          <p className="mt-4 font-sans text-[0.95rem] text-ink/60 max-w-[30ch] md:ml-auto">
            Trois semaines, quatre phases, aucun angle mort.
          </p>
          <div className="mt-4">
            <SlideLink href="/methode">Lire la méthode complète</SlideLink>
          </div>
        </div>

        <div className="ms-stage">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`ms-card${i < current ? " current" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              <div className="relative h-full overflow-hidden bg-surface text-bg border border-accent-warm/40">
                {/* Photo propre à l'étape en fond + voile kaki (dégradé plus
                    dense en bas pour la lisibilité du libellé). La photo
                    distincte de chaque carte aide aussi à les distinguer. */}
                <Image
                  src={`/methode/etape-${step.num}.webp`}
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 23rem, 80vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-surface/92 via-surface/74 to-surface/52"
                />

                <div className="relative z-[1] h-full flex flex-col p-7 md:p-9">
                {/* Numéro héros + phase — restent visibles dans la tranche
                    gauche quand les cartes se chevauchent. */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden
                    className="font-display text-accent-warm text-[clamp(3rem,4.8vw,4.6rem)] leading-[0.82] tabular-nums"
                  >
                    {step.num}
                  </span>
                  <span className="text-eyebrow uppercase text-accent-warm/70 pt-2 whitespace-nowrap">
                    {step.phase}
                  </span>
                </div>

                {/* Filet + libellé + détail, ancrés en bas. */}
                <div className="mt-auto">
                  <span
                    aria-hidden
                    className="block h-px w-12 bg-accent-warm/45 mb-5"
                  />
                  <h3 className="font-display text-bg text-[clamp(1.65rem,2.4vw,2.4rem)] leading-[1.04] [font-variation-settings:'wght'_560]">
                    {step.label}
                  </h3>
                  <p className="mt-3 font-sans text-[0.98rem] leading-snug text-bg/70 max-w-[28ch]">
                    {step.detail}
                  </p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
