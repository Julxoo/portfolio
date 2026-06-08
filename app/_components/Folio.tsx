"use client";

import { useChapters } from "../_lib/motion/ChapterContext";

/**
 * Folio bas-droite "03 / 12" — style tranche de livre, petites capitales Instrument Sans.
 * Au repos (classe .at-rest sur <html>) il passe à pleine opacité ; en mouvement il s'efface.
 * Masqué si aucun [data-chapter] n'est détecté.
 */
export function Folio() {
  const { activeIndex, total } = useChapters();

  if (total === 0) return null;

  const current = String(Math.max(activeIndex, 0) + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <div
      aria-hidden
      className="fixed bottom-4 right-5 z-40 pointer-events-none hidden md:flex items-baseline gap-1.5 text-eyebrow uppercase text-ink/50 at-rest:text-ink/65 transition-[color] duration-standard ease-out-quint"
    >
      <span className="tabular-nums">{current}</span>
      <span className="opacity-50">/</span>
      <span className="tabular-nums opacity-70">{totalStr}</span>
    </div>
  );
}
