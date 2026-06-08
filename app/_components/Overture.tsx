"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { animate, stagger } from "motion/react";
import { useLenis } from "lenis/react";
import { ProximityText } from "../_lib/motion/ProximityText";

// =====================================================================
// OVERTURE — préchargement → transition → hero. Bref, chaud, retenu.
//
//   1. LE NOM-FENÊTRE — panneau ink. « Jules Toussenel » fixe au centre (1
//      ligne desktop / 2 lignes mobile), DÉTOURÉ (background-clip:text) : à
//      l'intérieur des lettres, les photos de l'atelier CLAQUENT en coupes
//      sèches rapides (flashcut) — plein d'images vues à travers le nom.
//   2. LE REPLI — le panneau se replie (scaleY:0, expo.inOut) et révèle le hero.
//   3. LE HERO — le titre monte de son masque ; ProximityText reprend la main.
//
// Voile en PORTAIL sur <body> (z-[300]). Skippable, prefers-reduced-motion
// respecté, scroll verrouillé. Rejoue au reload, pas en nav SPA. Images
// préchargées → fondus nets. Hero dans le DOM (SEO/SR).
// =====================================================================

let hasPlayed = false;

const EOQ = [0.22, 1, 0.36, 1] as const;
const EXPO = [0.87, 0, 0.13, 1] as const; // ≈ expo.inOut
const FLASH_MS = 0.11; // durée d'une photo entre deux coupes
const FLASH_LOOPS = 2; // passages sur la série

const REEL = Array.from(
  { length: 12 },
  (_, i) => `/overture/reel-${String(i + 1).padStart(2, "0")}.webp`,
);

const hidden: CSSProperties = { opacity: 0 };
const clip: CSSProperties = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
};
// Le nom comme fenêtre : une ligne en desktop, deux lignes (Jules / Toussenel)
// en mobile. Mêmes classes sur les 3 couches → alignement parfait.
const WORD_CLS =
  "flex flex-col md:flex-row md:gap-x-[0.22em] items-center justify-center font-display text-[clamp(2.8rem,10vw,9rem)] leading-[0.86]";

export function Overture() {
  const [mounted, setMounted] = useState(false);
  const [showVeil, setShowVeil] = useState(true);
  const lenis = useLenis();

  const veilRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLDivElement | null>(null);
  const layerARef = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const revealingRef = useRef(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted || startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const showHero = () => {
      animate("[data-hero-h1]", { y: "0%" }, { duration: 0 });
      animate("[data-hero-block]", { opacity: 1, y: 0 }, { duration: 0 });
    };

    if (reduced || hasPlayed) {
      showHero();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowVeil(false);
      return;
    }
    hasPlayed = true;

    REEL.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    lenis?.stop();
    window.scrollTo(0, 0);
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

    const reveal = async () => {
      if (revealingRef.current) return;
      revealingRef.current = true;

      await document.fonts.ready;

      const veil = veilRef.current;
      if (veil) veil.style.transformOrigin = "top";
      const collapse = animate(
        veil,
        { scaleY: 0 },
        { duration: 0.9, ease: EXPO },
      );

      await wait(0.16);
      animate("[data-hero-h1]", { y: ["101%", "0%"] }, {
        duration: 1.1,
        ease: EXPO,
      });
      animate(
        "[data-hero-block]",
        { opacity: [0, 1], y: [32, 0] },
        { duration: 0.8, ease: EOQ, delay: stagger(0.1) },
      );

      await collapse;
      setShowVeil(false);
      html.style.overflow = prevOverflow;
      lenis?.start();
      window.dispatchEvent(new Event("resize")); // ProximityText remesure
      window.dispatchEvent(new Event("hero:intro")); // ① vague de poids
    };

    const run = async () => {
      // Entrée — le nom monte de sa ligne de coupe (révélation typographique).
      await animate(
        wordRef.current,
        { y: ["100%", "0%"] },
        { duration: 0.75, ease: EXPO },
      );

      // Flashcut + morph de graisse Clash (axe variable) synchronisés : à
      // mesure que ça charge, les lettres s'épaississent et laissent passer
      // davantage de photo. Le poids = la barre de chargement.
      const A = layerARef.current;
      const word = wordRef.current;
      const frames: string[] = [];
      for (let l = 0; l < FLASH_LOOPS; l++) frames.push(...REEL);
      for (let i = 0; i < frames.length; i++) {
        if (revealingRef.current) break;
        if (A) A.style.backgroundImage = `url(${frames[i]})`;
        const p = (i + 1) / frames.length;
        if (word)
          word.style.setProperty("--ov-w", String(Math.round(330 + p * 350)));
        await wait(FLASH_MS);
      }
      if (revealingRef.current) return;
      await wait(0.25);
      reveal();
    };

    const skip = () => {
      if (revealingRef.current) return;
      reveal();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    run();

    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative px-gutter min-h-[88svh] flex flex-col justify-center pt-section-lg pb-section-lg">
        <div className="max-w-default mx-auto w-full">
          <p
            data-hero-block
            style={hidden}
            className="font-display text-lead text-surface mb-8"
          >
            Développeur freelance, Aix-en-Provence.
          </p>

          <div className="overflow-hidden">
            <h1
              data-hero-h1
              style={{ transform: "translateY(101%)" }}
              className="text-display text-ink max-w-[15ch] sillage"
            >
              <ProximityText as="span">{"Des sites "}</ProximityText>
              <ProximityText as="span" className="text-surface">
                dessinés
              </ProximityText>
              <ProximityText as="span">{", pas décorés."}</ProximityText>
            </h1>
          </div>
        </div>
      </section>

      {/* ===================== VOILE (portail body) ===================== */}
      {mounted &&
        showVeil &&
        createPortal(
          <div
            ref={veilRef}
            className="overture-veil fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-surface text-bg [will-change:transform]"
            aria-hidden
          >
            {/* le NOM détouré, qui monte de sa coupe puis s'épaissit (wght) */}
            <div className="overflow-hidden">
              <div
                ref={wordRef}
                style={
                  {
                    transform: "translateY(100%)",
                    ["--ov-w"]: 330,
                  } as CSSProperties
                }
                className="relative px-gutter [will-change:transform]"
              >
                <span
                  aria-hidden
                  style={{ fontVariationSettings: "'wght' var(--ov-w, 400)" }}
                  className={`invisible ${WORD_CLS}`}
                >
                  <span className="whitespace-nowrap">Jules</span>
                  <span className="whitespace-nowrap">Toussenel</span>
                </span>
                <span
                  ref={layerARef}
                  style={{
                    ...clip,
                    fontVariationSettings: "'wght' var(--ov-w, 400)",
                  }}
                  className={`absolute inset-0 ${WORD_CLS}`}
                >
                  <span className="whitespace-nowrap">Jules</span>
                  <span className="whitespace-nowrap">Toussenel</span>
                </span>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Sécurité no-JS : hero visible (le voile n'est jamais monté sans JS). */}
      <noscript>
        <style>{`[data-hero-block]{opacity:1!important}[data-hero-h1]{transform:none!important}`}</style>
      </noscript>
    </>
  );
}
