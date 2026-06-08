"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import type { LenisOptions } from "lenis";
import { useTempus } from "tempus/react";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";

// Durée d'inactivité (ms) avant de marquer l'état at-rest.
const AT_REST_DELAY_MS = 1500;

// Clamp de la vélocité brute pour normaliser en [0, 1].
// 50 px/frame couvre un scroll molette rapide sans saturer.
const VELOCITY_CLAMP = 50;

// Options Lenis éditoriales — retenue + feeling "print lourd".
// `autoRaf: false` — Tempus drive le tick, pas le rAF interne de Lenis.
const OPTIONS: LenisOptions = {
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1,
  anchors: { offset: -80, duration: 1.4 },
  autoRaf: false,
};

// Branche Lenis sur la boucle Tempus et écrit les CSS vars scroll à chaque frame.
// Une seule rAF partagée = pas de désynchro entre Lenis et d'éventuels effets
// futurs (GSAP, canvas, etc.) qui s'abonneront à useTempus eux aussi.
function LenisTempusBridge({
  lenisRef,
}: {
  lenisRef: React.RefObject<LenisRef | null>;
}) {
  const restTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useTempus((time) => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    lenis.raf(time);

    const root = document.documentElement;
    const abs = Math.min(Math.abs(lenis.velocity), VELOCITY_CLAMP);
    root.style.setProperty("--scroll-velocity", String(abs));
    root.style.setProperty("--scroll-velocity-n", String(abs / VELOCITY_CLAMP));
    root.style.setProperty(
      "--scroll-direction",
      String(lenis.direction ?? 0),
    );
    root.style.setProperty(
      "--scroll-progress",
      String(lenis.progress ?? 0),
    );

    root.classList.remove("at-rest");
    if (restTimer.current) clearTimeout(restTimer.current);
    restTimer.current = setTimeout(() => {
      root.classList.add("at-rest");
    }, AT_REST_DELAY_MS);
  });

  useLayoutEffect(() => {
    document.documentElement.classList.add("at-rest");
    return () => {
      if (restTimer.current) clearTimeout(restTimer.current);
    };
  }, []);

  return null;
}

// Détecte prefers-reduced-motion via useSyncExternalStore — safe hydratation,
// pas d'anti-pattern setState-in-effect.
function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Site à 90 % mobile : sur pointeur grossier (tactile), on n'instancie PAS
  // Lenis — le scroll natif iOS/Android est plus fluide, accessible, et évite
  // l'inertie cassée + le rAF permanent. Lenis = desktop (pointeur fin) only.
  const coarse = useMediaQuery("(pointer: coarse)");
  const lenisRef = useRef<LenisRef | null>(null);

  if (reduced || coarse) {
    return <>{children}</>;
  }

  return (
    <ReactLenis ref={lenisRef} root options={OPTIONS}>
      <LenisTempusBridge lenisRef={lenisRef} />
      {children}
    </ReactLenis>
  );
}
