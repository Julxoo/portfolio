"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useTempus } from "tempus/react";

// Services — « Le tunnel de caractères ».
//
// La section s'épingle plein écran et devient une caméra. Chaque métier
// arrive du fond, DÉCÉLÈRE jusqu'au plan de lecture, s'y ARRÊTE (palier net,
// lisible, légende affichée), puis ACCÉLÈRE et vous traverse pendant que le
// suivant émerge. En sortie de tunnel, l'INDEX : les quatre posés ensemble.
//
// SCROLL DÉCOUPLÉ (clé) : la progression n'est pas collée 1:1 au scroll —
// un moteur Tempus LISSE la progression courante vers la cible du scroll
// (lerp). Conséquence : même lancé à pleine vitesse, le scroll ne peut JAMAIS
// téléporter d'un mot à l'autre — la progression rattrape en traversant tous
// les états dans l'ordre. Aucun mot sauté. (Même principe que ProjectScene.)
//
// Sémantique : l'index porte le contenu (h3 + p, toujours dans le DOM) ; le
// tunnel est décor aria-hidden. Repli (sans JS / reduced-motion) : seul
// l'index s'affiche, en flux. data-svt="play" est posé au montage si le
// moteur tourne.
//
const SERVICES = [
  { nom: "Sites vitrines", desc: "Sur-mesure, dessinés depuis zéro. Le cœur de l'atelier." },
  { nom: "Boutiques en ligne", desc: "E-commerce léger, sans usine à gaz." },
  { nom: "MCP", desc: "Serveurs Model Context Protocol — vos outils branchés à l'IA." },
  { nom: "Logiciels sur-mesure", desc: "Outils internes, dashboards, automatisations." },
];

// Géométrie du tunnel (en fraction de la course d'épinglage 0..1).
const SPACING = 0.2; // décalage de départ entre mots
const DUR = 0.28; // durée d'un vol
const APPROACH_END = 0.46; // fin de l'approche / début du palier
const PLATEAU_END = 0.7; // fin du palier / début de l'éjection
const INDEX_START = 0.86; // l'index commence à se poser
const SURFACE = "83, 80, 64"; // --color-surface #535040, en RGB

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
// lerp indépendant du frame-rate (même formule que ProjectScene/ProximityText).
const fri = (cur: number, target: number, dt: number, diss = 0.78) =>
  cur + (target - cur) * (1 - Math.pow(diss, dt * 60));

type Frame = { scale: number; opacity: number; wght: number; ink: number };

// État d'un mot pour une progression locale (0..1) sur sa propre tranche.
function flyFrame(localP: number): Frame {
  if (localP <= 0) return { scale: 0.05, opacity: 0, wght: 200, ink: 0 };
  if (localP >= 1) return { scale: 8.5, opacity: 0, wght: 620, ink: 1 };

  if (localP < APPROACH_END) {
    // Approche : décélère et vient se poser (ease-out).
    const a = localP / APPROACH_END;
    const e = easeOutCubic(a);
    const ink = clamp01((localP - 0.3) / (APPROACH_END - 0.3));
    return {
      scale: 0.05 + e * (1 - 0.05),
      opacity: clamp01(localP / 0.05),
      wght: 200 + ink * (620 - 200),
      ink,
    };
  }
  if (localP < PLATEAU_END) {
    // Palier : immobile, net, lisible.
    return { scale: 1, opacity: 1, wght: 620, ink: 1 };
  }
  // Éjection : accélère et traverse (ease-in).
  const t = (localP - PLATEAU_END) / (1 - PLATEAU_END);
  const e = easeInCubic(t);
  const fade = clamp01(1 - (localP - 0.86) / (1 - 0.86));
  return { scale: 1 + e * (8.5 - 1), opacity: fade, wght: 620, ink: 1 };
}

// Opacité de la légende : visible pendant le palier, s'efface à l'éjection.
function descOpacity(localP: number): number {
  if (localP < 0.46 || localP >= 0.78) return 0;
  if (localP < 0.52) return (localP - 0.46) / 0.06;
  if (localP <= 0.68) return 1;
  return 1 - (localP - 0.68) / 0.1;
}

// Le moteur tourne hors reduced-motion. Snapshot serveur = false → le SSR
// rend le repli (index seul) ; le client bascule sur "play" à l'hydratation.
function useShouldPlay() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function Services() {
  const play = useShouldPlay();
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progRef = useRef(0); // progression LISSÉE (ce qu'on affiche)
  const visibleRef = useRef(false);

  // Coupe la boucle quand la section est hors champ.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  useTempus((_time: number, deltaMs: number) => {
    const section = sectionRef.current;
    if (!play || !section || !visibleRef.current) return;
    const rect = section.getBoundingClientRect();
    const runway = section.offsetHeight - window.innerHeight;
    if (runway <= 0) return;

    // Cible brute du scroll (0..1) puis lissage : c'est ce lissage qui
    // empêche tout saut, même à pleine vitesse.
    const target = clamp01(-rect.top / runway);
    const dt = Math.min(0.05, (deltaMs || 16) / 1000);
    progRef.current = fri(progRef.current, target, dt);
    const p = progRef.current;

    // Mots
    for (let i = 0; i < SERVICES.length; i++) {
      const title = titleRefs.current[i];
      if (title) {
        const localP = (p - i * SPACING) / DUR;
        const f = flyFrame(localP);
        title.style.transform = `scale(${f.scale.toFixed(4)})`;
        title.style.opacity = f.opacity.toFixed(3);
        title.style.fontVariationSettings = `"wght" ${Math.round(f.wght)}`;
        title.style.color = `rgba(${SURFACE}, ${f.ink.toFixed(3)})`;
        title.style.webkitTextStrokeColor = `rgba(${SURFACE}, ${(
          (1 - f.ink) *
          0.58
        ).toFixed(3)})`;
      }
      const desc = descRefs.current[i];
      if (desc) {
        desc.style.opacity = descOpacity((p - i * SPACING) / DUR).toFixed(3);
      }
    }

    // Index (sortie de tunnel) : chaque rangée se pose en cascade.
    for (let i = 0; i < SERVICES.length; i++) {
      const row = rowRefs.current[i];
      if (!row) continue;
      const start = INDEX_START + i * 0.025;
      const rp = clamp01((p - start) / 0.06);
      row.style.opacity = rp.toFixed(3);
      row.style.transform = `translateY(${((1 - rp) * 0.85).toFixed(3)}rem)`;
    }
  });

  return (
    <section
      ref={sectionRef}
      data-svt={play ? "play" : undefined}
      className="svt-section border-t border-rule overflow-clip"
    >
      <div className="svt-sticky relative px-gutter py-section-lg">
        <div className="max-w-default mx-auto">
          <div className="text-eyebrow uppercase text-ink/60 mb-4">Services</div>
          <p className="font-sans text-body text-ink/55 max-w-[46ch]">
            Sur-mesure, depuis Aix-en-Provence — du site vitrine au logiciel.
          </p>
        </div>

        {/* Le spectacle — décor pur, masqué aux lecteurs d'écran. Piloté image
            par image par le moteur Tempus (progression lissée). */}
        <div className="svt-words" aria-hidden="true">
          {SERVICES.map((s, i) => (
            <div
              key={s.nom}
              className="svt-word"
              style={{ "--si": i } as CSSProperties}
            >
              <div
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="svt-title font-display text-[clamp(2.6rem,9vw,9rem)] leading-[0.98] tracking-[-0.01em]"
              >
                {s.nom}
              </div>
              <p
                ref={(el) => {
                  descRefs.current[i] = el;
                }}
                className="svt-desc font-sans text-body text-ink/60 max-w-[42ch]"
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* L'index — la sortie du tunnel : les quatre posés ensemble, lisibles.
            Contenu sémantique unique de la section. */}
        <div className="svt-index">
          <div className="max-w-default mx-auto w-full">
            {SERVICES.map((s, i) => (
              <div
                key={s.nom}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="svt-row grid md:grid-cols-2 gap-x-8 gap-y-1 items-baseline py-5 md:py-6 border-b border-rule first:border-t first:border-t-rule-strong"
              >
                <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight text-ink">
                  {s.nom}
                </h3>
                <p className="font-sans text-body text-ink/60 max-w-[42ch]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
