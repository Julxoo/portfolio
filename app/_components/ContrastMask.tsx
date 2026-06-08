"use client";

import { useLenis } from "lenis/react";
import { useRef } from "react";

// =====================================================================
// ContrastMask — brisure chromatique scroll-driven (ticket #26).
//
// Voile kaki `var(--color-surface)` fixé en viewport, opacité animée
// de 0 à `maxOpacity` quand l'utilisateur approche la section cible.
// La section cible doit porter `data-contrast-mask-target` (ou passer
// targetSelector explicitement) et stacker au-dessus via z-index > 15
// dans le même contexte d'empilement.
//
// Le voile est positionné `z-index: 15`. À placer DANS le composant
// page (et non dans layout) pour rester dans le stacking context de
// `<main>`. La section CTA doit être `relative z-[25]` pour apparaître
// au-dessus du voile quand il est opaque.
// =====================================================================

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

    // Progress : 0 quand la cible est hors viewport (top > fadeZone),
    // 1 quand le top de la cible atteint le top du viewport.
    const progress = Math.max(0, Math.min(1, 1 - rect.top / fadeZone));
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
