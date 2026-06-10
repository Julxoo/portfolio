"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useTempus } from "tempus/react";

// =====================================================================
// Pour qui — « Lumière rasante ».
//
// Les trois clientèles sont gravées dans la toile. Une source de lumière
// suit le pointeur (doigt ou souris, un seul modèle partout) ; au repos
// elle balaie lentement toute seule. Le relief accroche la lumière à son
// passage : le biseau de chaque nom se tourne vers elle et un éclat chaud
// parcourt les lettres — les noms surgissent gaufrés, puis se rendorment.
//
// Deux calques superposés au pixel (même grille) :
//   · base   — noms kaki lisibles, biseau gravé (text-shadow ±--bx/--by).
//   · gloss  — copie transparente, éclat radial chaud clippé aux lettres,
//              centré sur la source (--lx/--ly).
// Tempus (rAF partagé) écrit --lx/--ly sur le panneau et le biseau par nom.
// Aucun filtre par frame : rendu CSS, fluide même sur mobile.
//
// SSR / sans JS : lumière figée haut-gauche → noms lisibles et gaufrés.
// Reduced motion : pas de balayage auto ; le pointeur (geste volontaire)
// reste actif. Boucle coupée hors écran (IntersectionObserver).
// =====================================================================

const AUDIENCES = [
  {
    nom: "Artisans",
    detail: "Métiers de bouche, ateliers, savoir-faire local — à Aix et autour.",
  },
  {
    nom: "Commerces premium",
    detail: "Boutiques, hôtellerie, caves, lieux de réception.",
  },
  {
    nom: "PME & marques",
    detail: "Structures qui veulent un site tenu, pas bricolé.",
  },
];

const NOM_CLASS =
  "pq-nom font-display text-[clamp(2.1rem,5.6vw,4.8rem)] leading-[1.04] tracking-[-0.01em]";
const NOTE_CLASS =
  "pq-note font-sans text-body text-ink/55 max-w-[44ch] md:text-right";
const ROW_GRID =
  "grid md:grid-cols-[1fr_minmax(0,24rem)] items-baseline gap-x-12 gap-y-1 py-7 md:py-9 border-b border-rule";

// lerp indépendant du frame-rate (même formule que ProximityText).
function fri(current: number, target: number, dt: number, dissipation = 0.82) {
  return current + (target - current) * (1 - Math.pow(dissipation, dt * 60));
}

export function PourQui() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const nameRefs = useRef<(HTMLElement | null)[]>([]);
  const centersRef = useRef<{ x: number; y: number }[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const lightRef = useRef({ x: 0, y: 0, init: false });
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);

  // Centres des noms (relatifs au panneau) — pour orienter chaque biseau.
  // Mesurés au montage, au resize et après chargement des fontes.
  useEffect(() => {
    const measure = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const pr = panel.getBoundingClientRect();
      centersRef.current = nameRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left - pr.left + r.width / 2,
          y: r.top - pr.top + r.height / 2,
        };
      });
    };
    measure();
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Coupe la boucle quand le panneau est hors écran.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "10% 0px 10% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Pointeur global (la lumière le suit dès qu'il survole / glisse).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useTempus((time: number, deltaMs: number) => {
    const panel = panelRef.current;
    if (!panel || !visibleRef.current) return;
    const rect = panel.getBoundingClientRect();
    const dt = Math.min(0.05, (deltaMs || 16) / 1000);

    // Cible de la lumière : le pointeur s'il survole le panneau, sinon
    // un balayage lent et autonome (sauf reduced-motion = figée).
    const p = pointerRef.current;
    const pointerInside =
      p.active &&
      p.x >= rect.left - 80 &&
      p.x <= rect.right + 80 &&
      p.y >= rect.top - 120 &&
      p.y <= rect.bottom + 120;

    let tx: number;
    let ty: number;
    if (pointerInside) {
      tx = p.x - rect.left;
      ty = p.y - rect.top;
    } else if (!reducedRef.current) {
      const phase = (time % 8000) / 8000; // 0..1 sur 8 s
      tx = rect.width * (0.5 + 0.46 * Math.sin(phase * Math.PI * 2));
      ty = rect.height * (0.32 + 0.26 * Math.sin(phase * Math.PI * 4));
    } else {
      tx = rect.width * 0.26;
      ty = -rect.height * 0.08;
    }

    const light = lightRef.current;
    if (!light.init) {
      light.x = tx;
      light.y = ty;
      light.init = true;
    } else {
      light.x = fri(light.x, tx, dt);
      light.y = fri(light.y, ty, dt);
    }

    panel.style.setProperty("--lx", `${light.x.toFixed(1)}px`);
    panel.style.setProperty("--ly", `${light.y.toFixed(1)}px`);

    // Biseau par nom : vecteur unité du centre du nom vers la lumière.
    const centers = centersRef.current;
    for (let i = 0; i < nameRefs.current.length; i++) {
      const el = nameRefs.current[i];
      const c = centers[i];
      if (!el || !c) continue;
      const dx = light.x - c.x;
      const dy = light.y - c.y;
      const len = Math.hypot(dx, dy) || 1;
      el.style.setProperty("--bx", (dx / len).toFixed(3));
      el.style.setProperty("--by", (dy / len).toFixed(3));
    }
  });

  return (
    <section className="px-gutter py-section-lg border-t border-rule">
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Pour qui</div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[24ch]">
          Pour celles et ceux qui veulent un site{" "}
          <em className="italic text-accent-deep">dessiné</em>, pas un
          template.
        </h2>

        <div ref={panelRef} className="pq-panel mt-14 md:mt-20">
          {/* Pile de deux calques alignés au pixel (même grille). */}
          <div className="pq-grid border-t border-rule-strong">
            {/* base — lisible, gravée. Porte la sémantique (h3 + détail). */}
            <ul className="pq-list">
              {AUDIENCES.map((a, i) => (
                <li
                  key={a.nom}
                  className={`pq-row ${ROW_GRID}`}
                  style={{ "--i": i } as CSSProperties}
                  onTouchStart={() => {}}
                >
                  <h3
                    ref={(el) => {
                      nameRefs.current[i] = el;
                    }}
                    className={NOM_CLASS}
                  >
                    {a.nom}
                  </h3>
                  <p className={NOTE_CLASS}>{a.detail}</p>
                </li>
              ))}
            </ul>

            {/* gloss — éclat chaud clippé aux lettres. Décor, masqué aux
                lecteurs d'écran ; même structure pour l'alignement exact. */}
            <ul className="pq-list pq-gloss" aria-hidden="true">
              {AUDIENCES.map((a) => (
                <li key={a.nom} className={`pq-row ${ROW_GRID}`}>
                  <span className={NOM_CLASS}>{a.nom}</span>
                  <p className={NOTE_CLASS}>{a.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
