"use client";

import { useLenis } from "lenis/react";
import { useRef } from "react";

// ContrastMask — voile kaki fixe (z-15) dont l'opacité monte à l'entrée de la
// cible [data-contrast-mask-target] et redescend à sa sortie. À placer dans la
// page (pas le layout) ; la cible doit être `relative z-[25]` pour passer devant.

type ContrastMaskProps = {
  /** CSS selector de la section cible. */
  targetSelector?: string;
  /** Opacité max atteinte (0-1). Default 0.94 — on garde un filet de toile
   *  pour éviter l'aplat total qui fatigue l'œil. */
  maxOpacity?: number;
  /** Distance d'animation avant le target, en viewport heights. Default 0.8 = 80vh. */
  fadeDistance?: number;
};

export function ContrastMask({
  targetSelector = "[data-contrast-mask-target]",
  maxOpacity = 0.94,
  fadeDistance = 0.8,
}: ContrastMaskProps) {
  const maskRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<Element | null>(null);

  useLenis(() => {
    if (!targetRef.current) {
      targetRef.current = document.querySelector(targetSelector);
      if (!targetRef.current) return;
    }
    const mask = maskRef.current;
    const target = targetRef.current;
    if (!mask || !target) return;

    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight;
    const fadeZone = vh * fadeDistance;
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    // Le voile monte À L'ENTRÉE de la cible (son haut descend de fadeZone → 0)
    // et redescend À LA SORTIE (son bas remonte de fadeZone → 0). Transitoire :
    // plein écran kaki sur la cible, puis retrait pour laisser propre ce qui suit.
    const enter = clamp01((fadeZone - rect.top) / fadeZone);
    const exit = clamp01(rect.bottom / fadeZone);
    const progress = Math.min(enter, exit);
    mask.style.opacity = String(progress * maxOpacity);
  });

  return (
    <div
      ref={maskRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundColor: "var(--color-surface)",
        zIndex: 15,
        opacity: 0,
        willChange: "opacity",
      }}
    />
  );
}
