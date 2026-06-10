"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTempus } from "tempus/react";

// =====================================================================
// Témoignages — « À voix haute ».
//
// Une scène épinglée où UNE seule voix parle à la fois : centrée, en encre
// pleine, immense. Les autres ne sont que des murmures autour — pâles, plus
// petits, plus fins — qui montent et descendent. La voix active porte seule
// son attribution (nom · métier · ville → preuve + SEO local). Un guillemet
// « démesuré ancre la composition.
//
// Le scroll est DÉCOUPLÉ (lerp Tempus, comme Services) : pas de saut. Et la
// position de focus passe par un smootherstep — chaque voix MARQUE un temps
// au centre (lecture posée) avant de céder la parole. Profondeur par le
// poids / l'opacité / l'échelle — jamais par le flou (règle de la DA).
//
// Temps suspendu, à dessein : contraste avec la marquee rapide qui précède,
// et registre distinct du Manifeste (liste qui se révèle) qui suit.
//
// Repli (sans JS / reduced-motion) : les voix en colonne, lisibles, en flux.
// Verbatims FACTICES en attendant les vrais — à remplacer.
// =====================================================================

type Voix = { citation: string; auteur: string; metier: string; ville: string };

const VOIX: Voix[] = [
  {
    citation:
      "Jules a saisi notre métier en une seule réunion. Le site nous ressemble enfin — pas un template de plus.",
    auteur: "Camille R.",
    metier: "Cave à vins",
    ville: "Aix-en-Provence",
  },
  {
    citation:
      "On a doublé les réservations en ligne dès le premier mois. Et je peux tout modifier moi-même, sans appeler personne.",
    auteur: "Thomas B.",
    metier: "Studio de pilates",
    ville: "Sisteron",
  },
  {
    citation:
      "Travailler avec une seule personne, du premier appel à la livraison, ça change tout. Zéro intermédiaire, zéro malentendu.",
    auteur: "Sophie M.",
    metier: "Maison d'hôtes",
    ville: "Lourmarin",
  },
  {
    citation:
      "La direction artistique se défendait à l'oral avant la première ligne de code. Du sur-mesure, vraiment.",
    auteur: "Karim D.",
    metier: "Torréfacteur",
    ville: "Marseille",
  },
  {
    citation:
      "Livré en trois semaines, publié au fil de l'eau. On commentait sur la vraie version, jamais sur une maquette figée.",
    auteur: "Élodie F.",
    metier: "Architecte d'intérieur",
    ville: "Aix-en-Provence",
  },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smootherstep = (x: number) => x * x * x * (x * (x * 6 - 15) + 10);
const fri = (cur: number, target: number, dt: number, diss = 0.78) =>
  cur + (target - cur) * (1 - Math.pow(diss, dt * 60));

// Le moteur tourne hors reduced-motion. Snapshot serveur = false → le SSR
// rend le repli (colonne lisible) ; le client bascule en "play" à l'hydratation.
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

export function Temoignages() {
  const play = useShouldPlay();
  const sectionRef = useRef<HTMLElement | null>(null);
  const voiceRefs = useRef<(HTMLElement | null)[]>([]);
  const progRef = useRef(0);
  const visibleRef = useRef(false);

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
    const runway = section.offsetHeight - window.innerHeight;
    if (runway <= 0) return;

    const rect = section.getBoundingClientRect();
    const target = clamp01(-rect.top / runway);
    const dt = Math.min(0.05, (deltaMs || 16) / 1000);
    progRef.current = fri(progRef.current, target, dt);
    const p = progRef.current;

    // Position de focus continue (0..N-1), avec un palier à chaque voix :
    // smootherstep ralentit au passage des entiers → temps de lecture.
    const N = VOIX.length;
    const s = p * (N - 1);
    const i0 = Math.min(Math.floor(s), N - 1);
    const focusF = i0 >= N - 1 ? N - 1 : i0 + smootherstep(s - i0);

    const gap = window.innerHeight * 0.32;

    for (let i = 0; i < N; i++) {
      const el = voiceRefs.current[i];
      if (!el) continue;
      const d = i - focusF;
      const ad = Math.abs(d);
      const prox = clamp01(1 - ad); // 1 au centre, 0 à une voix d'écart
      const far = clamp01(1 - ad / 2.2);
      const sc = 0.5 + prox * 0.5; // 0.5 (murmure) → 1 (active)
      const op = 0.07 + Math.pow(far, 2.6) * 0.93; // murmures faibles mais présents
      const wght = Math.round(320 + prox * 180); // 320 → 500
      el.style.setProperty("--ty", `${(d * gap).toFixed(1)}px`);
      el.style.setProperty("--sc", sc.toFixed(4));
      el.style.setProperty("--op", op.toFixed(3));
      el.style.setProperty("--wght", String(wght));
      el.style.setProperty("--foc", prox.toFixed(3));
    }
  });

  return (
    <section
      ref={sectionRef}
      data-tm={play ? "play" : undefined}
      className="tm-section border-t border-rule"
    >
      <div className="tm-stage px-gutter py-section-lg">
        <div className="tm-header max-w-default mx-auto">
          <div className="text-eyebrow uppercase text-ink/60 mb-4">
            Témoignages
          </div>
          <h2 className="tm-h2 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[18ch]">
            Ce qu&apos;on en dit.
          </h2>
        </div>

        <span className="tm-guillemet font-display" aria-hidden="true">
          «
        </span>

        <div className="tm-voices">
          {VOIX.map((v, i) => (
            <figure
              key={v.auteur}
              ref={(el) => {
                voiceRefs.current[i] = el;
              }}
              className="tm-voice"
            >
              <blockquote className="tm-quote font-display text-[clamp(1.45rem,3.1vw,2.7rem)] leading-[1.18] tracking-[-0.01em] text-ink">
                {v.citation}
              </blockquote>
              <figcaption className="tm-cap mt-6 font-sans text-body">
                <cite className="not-italic text-ink/80">{v.auteur}</cite>
                <span className="text-ink/45">
                  {" "}
                  · {v.metier} · {v.ville}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
