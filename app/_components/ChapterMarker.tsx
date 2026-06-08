"use client";

import { useChapters } from "../_lib/motion/ChapterContext";

/**
 * Numéro de chapitre en marge droite — Instrument Serif italic, très discret.
 * Change en crossfade quand on passe d'un chapitre à l'autre. Référence : tranche d'un livre relié.
 * Masqué si aucun [data-chapter] n'est détecté sur la page.
 */
export function ChapterMarker() {
  const { label, activeIndex } = useChapters();

  if (activeIndex < 0 || !label) return null;

  return (
    <div
      aria-hidden
      className="fixed top-1/2 right-5 -translate-y-1/2 z-40 pointer-events-none hidden md:block"
    >
      <div
        key={label}
        className="font-display italic text-[1.75rem] leading-none text-ink/35 animate-[chapter-swap_280ms_ease-out]"
      >
        {label}
      </div>
      <style>{`
        @keyframes chapter-swap {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
