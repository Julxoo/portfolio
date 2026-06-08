"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// =====================================================================
// Transition de page — « le rideau kaki ». template.tsx se re-monte à
// CHAQUE navigation : on lève un voile kaki (--surface) sur le nouveau
// contenu, écho miniature de l'Ouverture.
//
// IMPORTANT (iOS) : le voile est DÉMONTÉ dès la fin de l'animation. Un
// élément `fixed` couvrant les safe-areas qui reste dans le DOM (même à
// scaleY:0) laisse iOS peindre sa couleur dans les insets haut/bas
// (bandeaux kaki fantômes). En le retirant, plus aucun résidu.
//
// Le voile vit DANS <main> (z-[1]) → passe sous le header. prefers-
// reduced-motion : aucun voile.
// =====================================================================

const EXPO = [0.87, 0, 0.13, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  // Démontage garanti après l'animation (timeout robuste, indépendant de
  // onAnimationComplete) → aucun élément `fixed` kaki ne subsiste dans le DOM.
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 750);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {children}
      {!reduced && !done && (
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
