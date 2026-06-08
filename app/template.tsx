"use client";

import { motion, useReducedMotion } from "motion/react";

// =====================================================================
// Transition de page — « le rideau kaki ». template.tsx se re-monte à
// CHAQUE navigation : on en profite pour lever un voile kaki (--surface)
// sur le nouveau contenu, écho miniature de l'Ouverture. Le geste est le
// même partout (intro, hero, navigation) → l'expérience est d'un bloc.
//
// Le voile vit DANS <main> (stacking-context z-[1]) → il recouvre le
// contenu mais passe SOUS le header (z-40), qui reste donc persistant
// pendant la transition. Initial scaleY:1 (rendu dès la 1ʳᵉ frame) → zéro
// flash du nouveau contenu. prefers-reduced-motion : aucun voile.
// =====================================================================

const EXPO = [0.87, 0, 0.13, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <>
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[200] bg-surface origin-top pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}
        />
      )}
    </>
  );
}
