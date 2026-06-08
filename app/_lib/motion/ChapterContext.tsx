"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useLenis } from "lenis/react";

type ChapterState = {
  activeIndex: number; // 0-based, -1 si aucun chapitre détecté
  total: number;
  label: string; // label lisible : "I", "II", "III", etc.
};

const ChapterContext = createContext<ChapterState>({
  activeIndex: -1,
  total: 0,
  label: "",
});

export function useChapters() {
  return useContext(ChapterContext);
}

// Convertit 1, 2, 3, 4 → I, II, III, IV. Suffit largement pour 1..12.
const ROMANS = [
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];
function toRoman(n: number): string {
  return ROMANS[n] ?? String(n);
}

type CachedChapter = {
  el: HTMLElement;
  top: number;
};

export function ChapterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ChapterState>({
    activeIndex: -1,
    total: 0,
    label: "",
  });

  // Cache des positions absolues des chapitres — recalculé au mount et à chaque resize.
  const [cache, setCache] = useState<CachedChapter[]>([]);

  useEffect(() => {
    function recompute() {
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-chapter]"),
      );
      // On ne garde que le top absolu — un [data-chapter] est un marqueur de
      // début de chapitre, le chapitre est actif jusqu'à ce que le suivant débute.
      const scroll = window.scrollY;
      setCache(
        els.map((el) => {
          const rect = el.getBoundingClientRect();
          return { el, top: rect.top + scroll };
        }),
      );
      setState((s) => ({ ...s, total: els.length }));
    }

    recompute();

    const ro = new ResizeObserver(recompute);
    ro.observe(document.body);
    window.addEventListener("resize", recompute);

    // Recompute aussi après la hydratation complète (images, fonts qui arrivent).
    const t = setTimeout(recompute, 200);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
      clearTimeout(t);
    };
  }, []);

  // Détermination du chapitre actif — celui dont le top est passé par la
  // ligne des 40% du viewport, mais dont le suivant n'a pas encore passé cette ligne.
  function computeActive(scroll: number): number {
    if (cache.length === 0) return -1;
    const viewportMid = scroll + window.innerHeight * 0.4;
    let idx = -1;
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].top <= viewportMid) idx = i;
      else break;
    }
    return idx;
  }

  // Lenis path (monté) — callback à chaque frame scrollée.
  useLenis((lenis) => {
    const idx = computeActive(lenis.scroll);
    setState((s) => {
      if (s.activeIndex === idx && s.total === cache.length) return s;
      return {
        activeIndex: idx,
        total: cache.length,
        label: idx >= 0 ? toRoman(idx + 1) : "",
      };
    });
  });

  // Fallback natif (reduced-motion, Lenis non monté).
  useEffect(() => {
    if (cache.length === 0) return;
    function onScroll() {
      const idx = computeActive(window.scrollY);
      setState((s) => {
        if (s.activeIndex === idx && s.total === cache.length) return s;
        return {
          activeIndex: idx,
          total: cache.length,
          label: idx >= 0 ? toRoman(idx + 1) : "",
        };
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cache]);

  return (
    <ChapterContext.Provider value={state}>{children}</ChapterContext.Provider>
  );
}
