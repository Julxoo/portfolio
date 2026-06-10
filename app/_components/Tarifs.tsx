"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { animate } from "animejs";
import { SlideLink, InlineLink } from "../_lib/ui/Link";

// =====================================================================
// Tarifs — « Les reels qui se figent sur 500 ».
//
// Trois colonnes de chiffres défilent en boucle SANS FIN, à des vitesses
// décalées (vagues). Quand l'utilisateur ARRIVE sur la section (elle occupe
// la bande centrale du viewport), le flux déroule encore un instant puis
// FREINE et se fige, colonne après colonne, sur 5-0-0. S'il repart, ça se
// ré-arme : le flux reprend, et se refigera à la prochaine visite.
//
// Moteur : anime.js v4. La position de chaque reel est pilotée au pixel via
// un proxy `pos` ; transform = translateY(-(pos mod cycle)) avec un strip
// dupliqué → boucle sans couture. Le freinage (ease outExpo) vise l'offset
// exact qui centre le chiffre cible (atterrissage déterministe). Deux
// IntersectionObservers : « proche » (perf : pause hors-champ) et « centre »
// (déclenche le freinage / ré-arme).
//
// Séquences déterministes (LCG graine fixe) : aucun saut d'hydratation. La
// figure est décor (aria-hidden) ; le vrai prix vit dans la ligne « Dès
// 500 € » en dessous. Repli sans JS / reduced-motion : « 500 € » posé (SSR).
// =====================================================================

const REEL_COUNT = 3;
// Roue de compteur ORDONNÉE 0→9 : les voisins sont toujours cohérents
// (autour du 5 → 4/5/6 ; autour du 0 → 9/0/1). Strip = ORDER dupliqué.
const ORDER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const REEL_LEN = ORDER.length; // 10
const TARGETS = ["5", "0", "0"]; // l'atterrissage : 500
const LAND = TARGETS.map((t) => ORDER.indexOf(t)); // index cible par colonne
const SPIN_MS = [3400, 4600, 2800]; // durée d'un tour (10 chiffres) par colonne
const WINDOW_EM = 1.9; // hauteur de la fenêtre d'une colonne (en chiffres)

// motion = reels actifs. Snapshot serveur = false → SSR rend « 500 € » posé
// (aucun mismatch) ; le client bascule à l'hydratation, sauf reduced-motion.
function useMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type Reel = {
  strip: HTMLElement;
  pos: number; // position courante (px, non bornée)
  anim: ReturnType<typeof animate> | null;
  settled: boolean;
};

export function Tarifs() {
  const motion = useMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const reelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!motion) return;
    const root = reelsRef.current;
    const section = sectionRef.current;
    if (!root || !section) return;

    const strips = Array.from(
      root.querySelectorAll<HTMLElement>(".prix-reel-strip"),
    );
    if (!strips.length) return;

    // Métriques live (robuste au chargement tardif des fontes).
    const metrics = () => {
      const d =
        strips[0].querySelector<HTMLElement>(".prix-reel-d")?.getBoundingClientRect()
          .height || 0;
      return { digitH: d, cycle: d * REEL_LEN };
    };

    const reels: Reel[] = strips.map((strip) => ({
      strip,
      pos: 0,
      anim: null,
      settled: false,
    }));

    const draw = (r: Reel, cycle: number) => {
      const wrapped = ((r.pos % cycle) + cycle) % cycle;
      r.strip.style.transform = `translateY(${(-wrapped).toFixed(2)}px)`;
    };

    // Défilé continu : pos augmente d'un cycle, en boucle (linéaire).
    const spin = (r: Reel, i: number) => {
      const { cycle } = metrics();
      if (!cycle) return;
      r.settled = false;
      r.anim?.pause();
      const start = ((r.pos % cycle) + cycle) % cycle;
      r.pos = start;
      r.anim = animate(r, {
        pos: start + cycle,
        duration: SPIN_MS[i % SPIN_MS.length],
        ease: "linear",
        loop: true,
        onUpdate: () => draw(r, cycle),
      });
    };

    // Freinage : vise l'offset exact qui centre le chiffre cible, + un cycle
    // pour « dérouler encore » avant de se poser (decel outExpo, en cascade).
    const settle = (r: Reel, i: number) => {
      if (r.settled) return;
      const { digitH, cycle } = metrics();
      if (!cycle) return;
      r.settled = true;
      r.anim?.pause();
      // offset visible (0..cycle) qui place le chiffre cible de CETTE colonne
      // au centre de la fenêtre
      const m = LAND[i % LAND.length];
      const targetVis =
        (((m + 0.5 - WINDOW_EM / 2) * digitH) % cycle + cycle) % cycle;
      const cur = ((r.pos % cycle) + cycle) % cycle;
      const delta = ((targetVis - cur) % cycle + cycle) % cycle;
      const final = r.pos + delta + cycle;
      r.anim = animate(r, {
        pos: final,
        duration: 780,
        delay: i * 120,
        ease: "outExpo",
        onUpdate: () => draw(r, cycle),
      });
    };

    reels.forEach((r, i) => spin(r, i));

    // « Proche » : perf + ré-armement. Près → on (re)joue le flux ; loin (la
    // section a quitté l'écran) → on ré-arme le défilé puis on met en pause.
    // Le ré-armement se fait donc HORS-CHAMP : on ne voit jamais 500 « repartir ».
    const nearObs = new IntersectionObserver(
      ([e]) => {
        const near = e?.isIntersecting ?? false;
        if (near) {
          reels.forEach((r) => r.anim?.play());
        } else {
          reels.forEach((r, i) => {
            spin(r, i);
            r.anim?.pause();
          });
        }
      },
      { rootMargin: "40% 0px 40% 0px" },
    );
    nearObs.observe(section);

    // « Centre » : la section occupe la bande centrale → freinage, fige sur
    // 500. Une fois posé, ça reste figé (le ré-armement vit dans nearObs).
    const centerObs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) reels.forEach((r, i) => settle(r, i));
      },
      { rootMargin: "-38% 0px -38% 0px" },
    );
    centerObs.observe(section);

    return () => {
      nearObs.disconnect();
      centerObs.disconnect();
      reels.forEach((r) => r.anim?.pause());
    };
  }, [motion]);

  return (
    <section
      ref={sectionRef}
      data-prix={motion ? "play" : undefined}
      className="prix-section px-gutter py-section-lg border-t border-rule overflow-clip"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Tarifs</div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[20ch] mb-2">
          Combien ça coûte.
        </h2>

        {/* Layout : desktop = reels larges à gauche + texte à droite ;
            mobile = reels pleine largeur + texte dessous. */}
        <div className="prix-layout">
          {/* La figure — décor : le flux qui se fige sur 500. Masquée aux
              lecteurs d'écran ; le vrai prix vit dans la ligne sémantique. */}
          <div className="prix-figure" aria-hidden="true">
            {motion ? (
              <div ref={reelsRef} className="prix-reels font-display">
                {Array.from({ length: REEL_COUNT }).map((_, i) => (
                  <div key={i} className="prix-reel">
                    <div className="prix-reel-strip">
                      {[...ORDER, ...ORDER].map((d, j) => (
                        <span key={j} className="prix-reel-d">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <span className="prix-euro">€</span>
              </div>
            ) : (
              <span className="prix-number font-display">500&nbsp;€</span>
            )}
          </div>

          {/* Contenu réel — la ligne calme, sémantique, toujours lisible. */}
          <div className="prix-line max-w-[44ch]">
            <p className="font-display text-lead text-ink">
              Dès <strong>500 €</strong>, mise en ligne comprise
              <sup className="align-super text-[0.7em] text-accent-deep">
                *
              </sup>
              .
            </p>
            <p className="font-sans text-[13px] text-ink/55 mt-3">
              <span aria-hidden="true">* </span>Ce que comprend chaque projet —
              nom de domaine, hébergement, mise en ligne — en détail sur la{" "}
              <InlineLink href="/tarifs">page Tarifs</InlineLink>.
            </p>
            <div className="mt-8">
              <SlideLink href="/tarifs">Voir les tarifs</SlideLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
