"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";

// =====================================================================
// ProximityText — champ typographique réactif au curseur.
//
// Reprise du pattern Exat microsite (Codrops 2026-04-10) : chaque
// caractère calcule sa distance au pointeur, et `font-variation-settings`
// sur les axes 'wght' et 'opsz' est piloté par 5 anneaux concentriques.
// Le caractère sous le curseur atteint le poids max ; les voisins
// rayonnent en dégradé.
//
// Prérequis : police variable. Dans notre stack c'est Clash Display
// (axe wght 200-700, pas d'opsz → seul le poids morphe). Appliquer via
// `fontFamily: "var(--font-signature)"`.
//
// Perf : positions des chars mesurées une fois (useLayoutEffect + resize),
// cache en ref. Par frame : 30 × calcul distance + écriture CSS var.
// Pas de DOM read dans la boucle rAF. IntersectionObserver gate pour
// couper la boucle quand le titre est hors viewport.
// =====================================================================

type Ring = { distance: number; wght: number; opsz: number };

const DEFAULT_RINGS: Ring[] = [
  { distance: 320, wght: 300, opsz: 14 },
  { distance: 220, wght: 420, opsz: 28 },
  { distance: 140, wght: 560, opsz: 60 },
  { distance: 80, wght: 720, opsz: 100 },
  { distance: 40, wght: 880, opsz: 144 },
];

const OUTSIDE: Ring = { distance: Infinity, wght: 300, opsz: 14 };

// lerp frame-rate-independent (Codrops Arnaud Rocca pattern)
function fri(current: number, target: number, dt: number, dissipation = 0.8) {
  const t = 1 - Math.pow(dissipation, dt * 60);
  return current + (target - current) * t;
}

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

type ProximityTextProps = {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  /** Poids par défaut quand hors portée / sans curseur. */
  baseWght?: number;
  rings?: Ring[];
};

export function ProximityText({
  children,
  className,
  as: Tag = "span",
  baseWght = 400,
  rings = DEFAULT_RINGS,
}: ProximityTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const wghtRef = useRef<number[]>([]);
  const opszRef = useRef<number[]>([]);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });
  const visibleRef = useRef(false);
  const introStartRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const tokens = children.split("");

  // Mesure des centres chars — une fois au montage + resize + fonts ready.
  useLayoutEffect(() => {
    const measure = () => {
      centersRef.current = charsRef.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 + window.scrollX,
          y: r.top + r.height / 2 + window.scrollY,
        };
      });
    };
    measure();
    // Re-mesure quand les fonts arrivent (métriques changent).
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  // Observer viewport visibility pour couper la boucle hors-écran.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Vague de poids one-shot : balaie le mot (fin→gras→repos) quand le hero
  // est révélé. Déclenchée par l'évènement "hero:intro" (dispatché par
  // l'Overture après le repli). Le type s'annonce vivant, sans curseur.
  useEffect(() => {
    const onIntro = () => {
      introStartRef.current = performance.now();
    };
    window.addEventListener("hero:intro", onIntro);
    return () => window.removeEventListener("hero:intro", onIntro);
  }, []);

  useEffect(() => {
    if (reduced) return;
    // Pointer global (clientX/Y + scroll offset pour rester en coords
    // document, cohérent avec les centers stockés).
    const onMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY,
        active: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);

    // Init buffers
    wghtRef.current = Array(tokens.length).fill(baseWght);
    opszRef.current = Array(tokens.length).fill(14);

    let raf = 0;
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      if (!visibleRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const { x: px, y: py, active } = pointerRef.current;
      const centers = centersRef.current;

      // Progression de la vague d'intro (0→1 sur ~1.1 s).
      const introStart = introStartRef.current;
      let introActive = false;
      let ip = 0;
      if (introStart != null) {
        ip = (now - introStart) / 1100;
        if (ip >= 1) introStartRef.current = null;
        else introActive = true;
      }

      for (let i = 0; i < tokens.length; i++) {
        const center = centers[i];
        const char = charsRef.current[i];
        if (!char || !center) continue;
        // Ring matching : on commence par la ring la plus large et on
        // resserre si plus proche.
        let target: Ring = OUTSIDE;
        target = { distance: 0, wght: baseWght, opsz: 14 };
        if (active) {
          const dx = px - center.x;
          const dy = py - center.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          for (const ring of rings) {
            if (d <= ring.distance) {
              target = ring;
            }
          }
        }
        // Vague d'intro : un front lumineux traverse le mot et soulève le
        // poids au passage (cloche large de ~4 chars). Se compose avec le
        // curseur via un max (jamais en conflit).
        if (introActive) {
          const front = ip * (tokens.length + 8);
          const bell = Math.max(0, 1 - Math.abs(front - i) / 4);
          const waveWght = baseWght + bell * (700 - baseWght);
          if (waveWght > target.wght) target = { ...target, wght: waveWght };
        }
        const prevW = wghtRef.current[i] ?? baseWght;
        const prevO = opszRef.current[i] ?? 14;
        const newW = fri(prevW, target.wght, dt, 0.82);
        const newO = fri(prevO, target.opsz, dt, 0.82);
        wghtRef.current[i] = newW;
        opszRef.current[i] = newO;
        char.style.setProperty("--wght", newW.toFixed(1));
        char.style.setProperty("--opsz", newO.toFixed(1));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [baseWght, rings, tokens.length, reduced]);

  const charSpan = (char: string, i: number) => (
    <span
      key={`${i}-${char}`}
      ref={(el) => {
        charsRef.current[i] = el;
      }}
      aria-hidden
      className="inline-block"
      style={{
        fontVariationSettings: "'wght' var(--wght, 400), 'opsz' var(--opsz, 14)",
      }}
    >
      {char}
    </span>
  );

  // Regroupe les chars par mot — chaque mot est un inline-block insécable — afin
  // que le retour à la ligne ne coupe jamais en plein milieu d'un mot (les
  // métriques varient selon la fonte ; Clash Display est large). Les caractères
  // restent pilotés un à un par le champ de proximité.
  const content: React.ReactNode[] = [];
  let word: React.ReactNode[] = [];
  tokens.forEach((char, i) => {
    if (char === " ") {
      if (word.length) {
        content.push(
          <span key={`w${i}`} className="inline-block whitespace-nowrap">
            {word}
          </span>,
        );
        word = [];
      }
      content.push(
        // Espace normal (pas de white-space:pre) → il se collapse au retour à
        // la ligne, sans laisser de cran en début de ligne suivante.
        <span
          key={`s${i}`}
          ref={(el) => {
            charsRef.current[i] = el;
          }}
          aria-hidden
        >
          {" "}
        </span>,
      );
    } else {
      word.push(charSpan(char, i));
    }
  });
  if (word.length) {
    content.push(
      <span key="word-end" className="inline-block whitespace-nowrap">
        {word}
      </span>,
    );
  }

  const commonProps = {
    className,
    "aria-label": children,
    style: { fontFamily: "var(--font-signature)" },
  } as const;

  switch (Tag) {
    case "h1":
      return (
        <h1
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          {...commonProps}
        >
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          {...commonProps}
        >
          {content}
        </h2>
      );
    case "h3":
      return (
        <h3
          ref={rootRef as React.RefObject<HTMLHeadingElement | null>}
          {...commonProps}
        >
          {content}
        </h3>
      );
    case "p":
      return (
        <p
          ref={rootRef as React.RefObject<HTMLParagraphElement | null>}
          {...commonProps}
        >
          {content}
        </p>
      );
    case "div":
      return (
        <div
          ref={rootRef as React.RefObject<HTMLDivElement | null>}
          {...commonProps}
        >
          {content}
        </div>
      );
    default:
      return (
        <span
          ref={rootRef as React.RefObject<HTMLSpanElement | null>}
          {...commonProps}
        >
          {content}
        </span>
      );
  }
}
