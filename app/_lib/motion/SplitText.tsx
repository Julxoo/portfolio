"use client";

import { useEffect, useRef, useState } from "react";

// =====================================================================
// SplitText — char-par-char reveal, sans plugin GSAP.
//
// Deux modes de déclenchement :
//   - "mount" : reveal au montage, après `delay` ms. Pour le hero.
//   - "visible" : reveal quand l'élément passe `threshold` du viewport.
//     Pour les sections plus bas.
//
// La typographie visible est divisée en chars (ou mots), chacun wrapped
// dans un <span inline-block> qui se translate de 1.1em en y avec un
// stagger par index. L'accessibilité est préservée via aria-label sur
// le conteneur + aria-hidden sur les spans.
//
// L'easing reprend --eoq (cubic-bezier out-quint de globals.css).
// =====================================================================

type AllowedTag = "h1" | "h2" | "h3" | "h4" | "span" | "p" | "div";

type SplitTextProps = {
  children: string;
  as?: AllowedTag;
  className?: string;
  /** `mount` = reveal post-montage. `visible` = reveal via IntersectionObserver. */
  trigger?: "mount" | "visible";
  /** Délai entre chaque char en ms. Default 22. */
  stagger?: number;
  /** Délai initial avant le premier char en ms. Default 0. */
  delay?: number;
  /** Split par chars (défaut) ou par mots (plus sobre). */
  type?: "chars" | "words";
  /** Threshold IntersectionObserver en mode `visible`. Default 0.2. */
  threshold?: number;
};

function tokenize(text: string, type: "chars" | "words"): string[] {
  if (type === "words") {
    // Préserve les espaces comme tokens entre les mots pour le spacing natif.
    return text.split(/(\s+)/).filter((t) => t.length > 0);
  }
  return text.split("");
}

export function SplitText({
  children,
  as: Tag = "span",
  className,
  trigger = "mount",
  stagger = 22,
  delay = 0,
  type = "chars",
  threshold = 0.2,
}: SplitTextProps) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (trigger === "mount") {
      const t = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(t);
    }

    // trigger === "visible"
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => setReady(true), delay);
            obs.disconnect();
            return;
          }
        }
      },
      { threshold },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [trigger, delay, threshold]);

  const tokens = tokenize(children, type);

  const content = tokens.map((token, i) => {
    const isSpace = /^\s+$/.test(token);
    return (
      <span
        key={`${i}-${token}`}
        aria-hidden
        className="inline-block will-change-[transform,opacity] motion-reduce:!transform-none motion-reduce:!opacity-100"
        style={{
          transform: ready ? "translateY(0)" : "translateY(0.4em)",
          opacity: ready ? 1 : 0,
          transition:
            "transform 720ms var(--eoq), opacity 520ms var(--eoq)",
          transitionDelay: `${i * stagger}ms`,
          whiteSpace: isSpace ? "pre" : undefined,
        }}
      >
        {token}
      </span>
    );
  });

  // Rend le tag demandé via un switch — on garde le typage strict.
  switch (Tag) {
    case "h1":
      return (
        <h1
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </h2>
      );
    case "h3":
      return (
        <h3
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </h3>
      );
    case "h4":
      return (
        <h4
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </h4>
      );
    case "p":
      return (
        <p
          ref={rootRef as React.RefObject<HTMLParagraphElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </p>
      );
    case "div":
      return (
        <div
          ref={rootRef as React.RefObject<HTMLDivElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </div>
      );
    default:
      return (
        <span
          ref={rootRef as React.RefObject<HTMLSpanElement | null>}
          className={className}
          aria-label={children}
        >
          {content}
        </span>
      );
  }
}
