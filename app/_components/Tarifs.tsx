"use client";

import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { useTempus } from "tempus/react";
import { SlideLink, InlineLink } from "../_lib/ui/Link";

// =====================================================================
// Tarifs — « Le prix qui s'ouvre ».
//
// Le chiffre « 500 € » arrive PLEIN (encre kaki, graisse haute). À mesure
// que la section se pose, sa graisse retombe et il passe en CONTOUR : ses
// contre-formes s'ouvrent comme des fenêtres. Trois inclus s'y encrent en
// cascade (nom de domaine / hébergement / mise en ligne). Le prix CONTIENT
// ce qu'il comprend — aucune carte, aucun prix barré, aucune checklist.
//
// SCROLL DÉCOUPLÉ : la progression n'est pas collée 1:1 au scroll — un lerp
// Tempus la lisse vers la cible. Même lancé vite, le chiffre ouvre/ferme
// sans saut (même principe que Services/ProjectScene).
//
// Sémantique : le contenu réel (prix + inclus + lien) vit en flux sous la
// figure, lisible. La figure géante est décor (aria-hidden). Repli sans JS /
// reduced-motion ET mobile (< md) : pas de nichage — chiffre plein lisible,
// inclus en liste dessous, zéro chevauchement. data-prix="play" posé au
// montage hors reduced-motion.
// =====================================================================

// Ancres calées sur les centres de glyphes du « 500 € » (mesurés : les deux
// ronds des 0 à ~18 % et ~32 %, le € à ~48 % de la largeur de la figure).
// Les mots se posent DANS le chiffre, répartis sur toute sa course.
const INCLUS = [
  { mot: "nom de domaine", x: "18%", y: "50%" },
  { mot: "hébergement", x: "32%", y: "50%" },
  { mot: "mise en ligne", x: "48%", y: "50%" },
];

const SURFACE = "83, 80, 64"; // --color-surface #535040, en RGB (l'encre kaki)

// Géométrie de l'ouverture (progression locale 0..1, lissée).
const OPEN_START = 0.18; // le chiffre commence à s'ouvrir
const OPEN_END = 0.62; // contour atteint
const WORD_START = 0.4; // le premier mot s'encre
const WORD_STAGGER = 0.12; // décalage entre mots
const WORD_DUR = 0.26; // durée d'encrage d'un mot

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
// lerp indépendant du frame-rate (même formule que Services/PourQui).
const fri = (cur: number, target: number, dt: number, diss = 0.8) =>
  cur + (target - cur) * (1 - Math.pow(diss, dt * 60));

// Le moteur tourne hors reduced-motion. Snapshot serveur = false → le SSR
// rend le repli (état calme) ; le client bascule "play" à l'hydratation.
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

export function Tarifs() {
  const play = useShouldPlay();
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLLIElement | null)[]>([]);
  const progRef = useRef(0); // progression LISSÉE (ce qu'on affiche)
  const visibleRef = useRef(false);
  const desktopRef = useRef(false);

  // Le nichage n'a lieu qu'au-dessus de md (≥ 768px). En dessous, le JS ne
  // touche à rien : le CSS de base affiche l'état calme.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      desktopRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Coupe la boucle quand la section est hors champ.
  useEffect(() => {
    const node = sectionRef.current;
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

  useTempus((_time: number, deltaMs: number) => {
    const section = sectionRef.current;
    const number = numberRef.current;
    if (!play || !section || !number || !visibleRef.current) return;
    if (!desktopRef.current) return; // mobile = état calme (CSS only)

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 quand la section entre par le bas ; 1 quand elle s'est posée (haut
    // remonté à ~30% du viewport). Lissé ensuite pour interdire tout saut.
    const target = clamp01((vh - rect.top) / (vh * 0.7));
    const dt = Math.min(0.05, (deltaMs || 16) / 1000);
    progRef.current = fri(progRef.current, target, dt);
    const p = progRef.current;

    // Le chiffre s'ouvre : graisse retombe, le plein se vide, le contour monte.
    const open = clamp01((p - OPEN_START) / (OPEN_END - OPEN_START));
    const e = easeOutCubic(open);
    const wght = 640 - e * (640 - 240);
    const fill = 1 - e; // alpha du remplissage : plein → contour
    const stroke = e * 0.55; // alpha du contour : 0 → visible
    number.style.fontVariationSettings = `"wght" ${Math.round(wght)}`;
    number.style.color = `rgba(${SURFACE}, ${fill.toFixed(3)})`;
    number.style.webkitTextStrokeColor = `rgba(${SURFACE}, ${stroke.toFixed(3)})`;

    // Les inclus s'encrent dans les ouvertures, en cascade.
    for (let i = 0; i < INCLUS.length; i++) {
      const el = wordRefs.current[i];
      if (!el) continue;
      const localP = clamp01((p - (WORD_START + i * WORD_STAGGER)) / WORD_DUR);
      const ease = easeOutCubic(localP);
      el.style.opacity = ease.toFixed(3);
      el.style.fontVariationSettings = `"wght" ${Math.round(
        200 + ease * (560 - 200),
      )}`;
      el.style.transform = `translate(-50%, calc(-50% + ${(
        (1 - ease) *
        0.5
      ).toFixed(3)}rem))`;
    }
  });

  return (
    <section
      ref={sectionRef}
      data-prix={play ? "play" : undefined}
      className="prix-section px-gutter py-section-lg border-t border-rule overflow-clip"
    >
      <div className="max-w-default mx-auto">
        <div className="text-eyebrow uppercase text-ink/60 mb-4">Tarifs</div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.04] text-ink max-w-[20ch]">
          Combien ça coûte.
        </h2>

        {/* La figure — décor : le chiffre qui s'ouvre et laisse voir ce qu'il
            contient. Masquée aux lecteurs d'écran ; le contenu réel vit en
            dessous (prix + inclus + lien), lisible et en flux. */}
        <div className="prix-figure" aria-hidden="true">
          <span ref={numberRef} className="prix-number font-display">
            500&nbsp;€
          </span>
          <ul className="prix-inclus">
            {INCLUS.map((it, i) => (
              <li
                key={it.mot}
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                style={{ "--sx": it.x, "--sy": it.y } as CSSProperties}
                className="prix-inclus-item font-display"
              >
                {it.mot}
              </li>
            ))}
          </ul>
        </div>

        {/* Contenu réel — la ligne calme, sémantique, toujours lisible. */}
        <div className="prix-line max-w-[44ch]">
          <p className="font-display text-lead text-ink">
            Dès <strong>500 €</strong>, mise en ligne comprise
            <sup className="align-super text-[0.7em] text-accent-deep">*</sup>.
          </p>
          <p className="font-sans text-[13px] text-ink/55 mt-3">
            <span aria-hidden="true">* </span>Ce que comprend chaque projet —
            nom de domaine, hébergement, mise en ligne — en détail sur la{" "}
            <InlineLink href="/tarifs">page Tarifs</InlineLink>.
          </p>
          <div className="mt-8">
            <SlideLink href="/tarifs">Voir les tarifs</SlideLink>
          </div>
        </div>
      </div>
    </section>
  );
}
