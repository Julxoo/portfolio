"use client";

import { useEffect, useState } from "react";

interface ScrollHintProps {
  targetId: string;
  /** Scroll Y threshold past which the hint fades out (default 80px) */
  threshold?: number;
  /** Entrance delay in ms (default 800) */
  enterDelay?: number;
}

export function ScrollHint({
  targetId,
  threshold = 80,
  enterDelay = 800,
}: ScrollHintProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), enterDelay);

    const onScroll = () => setScrolledAway(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enterDelay, threshold]);

  const visible = mounted && !scrolledAway;

  return (
    <a
      href={`#${targetId}`}
      aria-label="Faire défiler vers la suite"
      className={`group fixed bottom-6 right-5 z-30 flex flex-col items-center gap-2 transition-opacity duration-500 md:bottom-10 md:right-12 md:gap-3 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "var(--ease-luxury)" }}
    >
      <span
        className="font-sans text-[9px] uppercase tracking-[0.22em] text-taupe transition-colors duration-300 group-hover:text-camel md:text-[10px] md:tracking-[0.25em]"
        style={{
          writingMode: "vertical-rl",
          transitionTimingFunction: "var(--ease-hover)",
        }}
      >
        Scroll
      </span>
      <span
        aria-hidden="true"
        className="relative block h-10 w-px overflow-hidden bg-rule-light md:h-14"
      >
        <span className="absolute inset-x-0 top-0 h-3 bg-camel animate-scroll-hint md:h-4" />
      </span>
    </a>
  );
}
