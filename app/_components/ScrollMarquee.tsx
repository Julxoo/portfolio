"use client";

import { useLenis } from "lenis/react";
import { useTempus } from "tempus/react";
import { useEffect, useRef } from "react";

// =====================================================================
// ScrollMarquee — bande horizontale infinie, vitesse modulée par le scroll.
//
// Base : défile à 40 px/s quel que soit le scroll.
// Scroll actif : la vélocité Lenis ajoute jusqu'à +480 px/s d'accélération,
// dans la direction opposée au scroll (scroll vers le bas → marquee va
// vers la gauche, scroll vers le haut → vers la droite). Le sens
// s'inverse donc avec le scroll, l'effet "vent" est lisible.
//
// Seamless loop : deux copies identiques du contenu, on wrap quand la
// première copie a complètement disparu à gauche.
// =====================================================================

// Bandeau-mantra : vocabulaire 100 % orienté client, aucun terme technique.
const ITEMS = [
  "Sites sur-mesure",
  "Dessiné depuis zéro",
  "Aucun template",
  "Aix-en-Provence",
  "Artisans & commerces",
  "Mise en ligne comprise",
];

const BASE_SPEED = 0.04; // px par ms, soit 40 px/s
const VELOCITY_EXTRA = 0.8; // px par ms par unité de velocity-n (50 → +40 px/ms = 40 000 px/s à fond)
const VELOCITY_CLAMP = 50;

export function ScrollMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const xRef = useRef(0);
  const velocityRef = useRef(0);
  const directionRef = useRef(-1);
  const copyWidthRef = useRef(0);

  useLenis((lenis) => {
    // Velocity en unité normalisée, on garde le signe via direction.
    velocityRef.current =
      Math.min(Math.abs(lenis.velocity), VELOCITY_CLAMP) / VELOCITY_CLAMP;
    // Lenis direction : 1 = scroll down, -1 = scroll up, 0 = idle. On garde
    // le dernier non-idle pour ne pas geler la marquee aux pauses.
    if (lenis.direction !== 0) {
      directionRef.current = lenis.direction === 1 ? -1 : 1;
    }
  });

  useEffect(() => {
    const measure = () => {
      if (copyRef.current) {
        copyWidthRef.current = copyRef.current.offsetWidth;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    // Aussi mesurer une fois que les fonts web sont chargées (évite mesure à 0).
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useTempus((_, deltaTime) => {
    const track = trackRef.current;
    if (!track || copyWidthRef.current === 0) return;

    const speed =
      (BASE_SPEED + velocityRef.current * VELOCITY_EXTRA) * directionRef.current;
    xRef.current += speed * deltaTime;

    const w = copyWidthRef.current;
    // Wrap bidirectionnel
    while (xRef.current <= -w) xRef.current += w;
    while (xRef.current > 0) xRef.current -= w;

    track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
  });

  const itemClass =
    "flex items-center font-display italic text-[clamp(2rem,6vw,4.75rem)] leading-none text-ink px-8 md:px-12";
  const sepClass =
    "inline-block mx-6 md:mx-10 text-accent-deep/50 text-[0.35em] translate-y-[-0.15em]";

  const renderCopy = () => (
    <div className="flex shrink-0">
      {ITEMS.map((item, i) => (
        <span key={`${i}-${item}`} className={itemClass}>
          {item}
          <span aria-hidden className={sepClass}>
            ●
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="overflow-hidden py-section-sm border-t border-b border-rule bg-bg relative z-[2]"
      aria-hidden
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        <div ref={copyRef}>{renderCopy()}</div>
        {renderCopy()}
      </div>
    </section>
  );
}
