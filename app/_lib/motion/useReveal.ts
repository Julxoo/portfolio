"use client";

import { useCallback, useRef } from "react";

type UseRevealOptions = {
  /** Proportion visible avant reveal (0..1). Default 0.15. */
  threshold?: number;
  /** Marge négative en bas = "déclenche avant que le bas de l'élément touche le viewport". */
  rootMargin?: string;
  /** Si false, re-pose data-revealed=false quand l'élément sort. Default true. */
  once?: boolean;
};

/**
 * useReveal — IntersectionObserver léger qui pose data-revealed="true" sur
 * un élément (et propage via CSS aux descendants).
 *
 * Inspiration : pattern Wodniack/Darkroom (`is-in-view`, `is-revealed`).
 * Usage typique, avec le variant `revealed:` défini dans globals.css :
 *
 * ```tsx
 * const ref = useReveal();
 * return (
 *   <section ref={ref} data-revealed="false">
 *     <h2 className="opacity-0 translate-y-4 revealed:opacity-100 revealed:translate-y-0 transition-all duration-700 ease-out-quint">
 *       …
 *     </h2>
 *   </section>
 * );
 * ```
 *
 * Pour un stagger, poser `style={{ transitionDelay: `calc(var(--i, 0) * 80ms)` }}`
 * et inline `style={{ '--i': index }}` sur chaque enfant.
 */
export function useReveal(options: UseRevealOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -8% 0px",
    once = true,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastNodeRef = useRef<Element | null>(null);

  const setRef = useCallback(
    (node: Element | null) => {
      // Déconnexion du précédent observateur si l'élément change.
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      lastNodeRef.current = node;
      if (!node) return;

      // Hydratation défensive — si SSR a posé data-revealed, on respecte.
      const el = node as HTMLElement;
      if (!el.dataset.revealed) {
        el.dataset.revealed = "false";
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.dataset.revealed = "true";
              if (once && observerRef.current) {
                observerRef.current.unobserve(target);
              }
            } else if (!once) {
              target.dataset.revealed = "false";
            }
          }
        },
        { threshold, rootMargin },
      );
      observerRef.current.observe(node);
    },
    [threshold, rootMargin, once],
  );

  return setRef;
}
