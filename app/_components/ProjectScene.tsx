"use client";

import Image from "next/image";
import Link from "next/link";
import { useTempus } from "tempus/react";
import { useEffect, useRef } from "react";
import { Tag } from "../_lib/ui/Tag";

// =====================================================================
// ProjectScene — scène scroll-driven inspirée de wodniack.dev.
//
// Principe : section haute de (N+1) viewports, conteneur sticky interne
// de 1 viewport avec `perspective`, cartes en absolute qui traversent
// la scène au passage du scroll. On écrit les transforms en direct via
// useTempus — pas de re-render React par frame.
//
// Chorégraphie (toutes dérivées d'un seul scalaire `current`, l'indice
// fractionnaire de la carte au centre) :
//   1. Scrub inertiel — `current` POURSUIT la cible avec un amortissement
//      indépendant du framerate (1 - e^(-k·dt)). Les cartes traînent puis
//      se posent au lieu de coller au scroll.
//   2. Aimantation au repos — quand la vélocité tombe, la cible est tirée
//      vers l'entier le plus proche : le projet se présente bien cadré.
//   3. Smear de vitesse — cisaillement + étirement X dans le sens du
//      voyage, proportionnel à la vélocité, résorbé à l'arrêt.
//   4. Profondeur de champ — désaturation/assombrissement/flou des cartes
//      hors focus, piloté par la var CSS --focus (voir globals.css).
//   5. HUD — compteur 0X/0N + filet de progression, parallaxe de l'image.
//
// La vélocité est calculée localement (variation de l'index par frame),
// donc l'effet est identique avec ou sans Lenis — desktop ET mobile.
//
// Fallback : sur prefers-reduced-motion, la scène se dissout en empilement
// vertical via CSS et la boucle ne fait rien. Sur mobile (< 768px) la scène
// 3D tourne, avec des paramètres adoucis (SCENE_PARAMS).
// =====================================================================

export type SceneProject = {
  slug: string;
  eyebrow: string;
  title: string;
  year: string;
  teaser?: string;
  tags?: string[];
  imageSrc?: string;
  imageAlt?: string;
};

type ProjectSceneProps = {
  projects: SceneProject[];
  /** Hauteur de scroll allouée par carte, en vh. Default 85 = ~6 viewports pour 6 cartes. */
  scrollPerCard?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

// Paramètres géométriques de la chorégraphie, adoucis sous 768px : moins de
// translation horizontale (sinon les cartes débordent l'écran), profondeur et
// rotation réduites, perspective plus courte. Bascule via matchMedia, pas de
// re-render — les valeurs vivent dans une ref lue par la boucle rAF.
const SCENE_PARAMS = {
  desktop: { tx: 55, tz: 220, ry: 14, perspective: 1400 },
  mobile: { tx: 40, tz: 160, ry: 10, perspective: 900 },
} as const;

// Réglages du mouvement. Tout est ici pour pouvoir accorder au feeling.
const MOTION = {
  damp: 7, // raideur du suivi inertiel (s⁻¹). + haut = + collé au scroll.
  snap: 0.2, // force d'aimantation au repos (0 = aucune, 1 = snap dur).
  velRef: 3.2, // vitesse (index/s) au-delà de laquelle la vélocité sature à 1.
  velDamp: 9, // lissage de la vélocité (s⁻¹).
  maxSkew: 4.5, // cisaillement max (deg) à pleine vitesse.
  maxStretch: 0.07, // étirement X max (fraction) à pleine vitesse.
  velTrail: 2.6, // sur-décalage (vw) des cartes lointaines à pleine vitesse.
  scaleFalloff: 0.07, // réduction d'échelle par unité d'éloignement du centre.
  opFalloff: 2.6, // distance (en index) à laquelle l'opacité atteint 0.
} as const;

export function ProjectScene({
  projects,
  scrollPerCard = 85,
}: ProjectSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const isVisibleRef = useRef(false);
  const reducedRef = useRef(false);
  const paramsRef = useRef<(typeof SCENE_PARAMS)[keyof typeof SCENE_PARAMS]>(
    SCENE_PARAMS.desktop,
  );

  // État continu de la chorégraphie, vit hors React (pas de re-render/frame).
  const currentRef = useRef(0); // indice lissé de la carte au centre
  const prevTargetRef = useRef(0); // cible brute de la frame précédente
  const velRef = useRef(0); // vélocité signée lissée, normalisée [-1, 1]
  const needsResetRef = useRef(true); // ré-amorce l'état à l'entrée dans le viewport

  const total = projects.length;

  // Jeu de paramètres selon la largeur + perspective du sticky. Capte aussi
  // prefers-reduced-motion : si actif, la boucle se met en sommeil et le CSS
  // de fallback prend tout en charge.
  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedRef.current = mqReduced.matches;
      paramsRef.current = mqMobile.matches
        ? SCENE_PARAMS.mobile
        : SCENE_PARAMS.desktop;
      if (stickyRef.current) {
        stickyRef.current.style.perspective = `${paramsRef.current.perspective}px`;
      }
    };
    apply();
    mqMobile.addEventListener("change", apply);
    mqReduced.addEventListener("change", apply);
    return () => {
      mqMobile.removeEventListener("change", apply);
      mqReduced.removeEventListener("change", apply);
    };
  }, []);

  // IntersectionObserver : court-circuite le calcul hors-champ. À la ré-entrée,
  // on ré-amorce l'état pour éviter un pic de vélocité parasite.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !isVisibleRef.current) needsResetRef.current = true;
        isVisibleRef.current = visible;
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Boucle rAF partagée (Tempus). `deltaTime` en ms, fourni par Tempus.
  useTempus((_time: number, deltaTime: number) => {
    if (!isVisibleRef.current || reducedRef.current) return;
    const section = sectionRef.current;
    if (!section || total === 0) return;

    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    // Δt en secondes, clampé pour absorber les gros sauts (onglet en arrière-plan).
    const dt = Math.min(deltaTime / 1000, 0.05);

    const progress = clamp(-rect.top / totalScroll, 0, 1);
    const rawTarget = progress * (total - 1);

    // Ré-amorçage : aligne l'état sur la position réelle sans transition.
    if (needsResetRef.current) {
      currentRef.current = rawTarget;
      prevTargetRef.current = rawTarget;
      velRef.current = 0;
      needsResetRef.current = false;
    }

    // Vélocité du scrub (index/s), normalisée puis lissée — garde le signe
    // pour orienter le smear dans le sens du voyage.
    const rawVel = (rawTarget - prevTargetRef.current) / Math.max(dt, 0.001);
    prevTargetRef.current = rawTarget;
    const velTarget = clamp(rawVel / MOTION.velRef, -1, 1);
    velRef.current +=
      (velTarget - velRef.current) * (1 - Math.exp(-MOTION.velDamp * dt));
    const vel = velRef.current;
    const speed = Math.abs(vel); // 0 (immobile) → 1 (rapide)

    // Aimantation : d'autant plus forte qu'on est immobile.
    const stillness = 1 - speed;
    const snapped =
      rawTarget +
      (Math.round(rawTarget) - rawTarget) * stillness * MOTION.snap;

    // Suivi inertiel, indépendant du framerate.
    currentRef.current +=
      (snapped - currentRef.current) * (1 - Math.exp(-MOTION.damp * dt));
    const current = currentRef.current;

    const { tx: txStep, tz: tzStep, ry: ryStep } = paramsRef.current;
    const skew = vel * MOTION.maxSkew; // signé
    const stretchX = 1 + speed * MOTION.maxStretch;

    for (let i = 0; i < total; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;
      const delta = i - current;
      const absDelta = Math.abs(delta);
      const focus = clamp(1 - absDelta, 0, 1); // 1 au centre, 0 dès |delta|≥1

      // Position dans le couloir + traînée de vitesse (cartes lointaines
      // décrochent un peu plus dans le sens du voyage).
      const trail = vel * MOTION.velTrail * Math.min(absDelta + 0.3, 2);
      const tx = delta * txStep + trail; // vw
      const tz = -absDelta * tzStep; // px
      const ry = delta * -ryStep; // deg
      const scale = 1 - absDelta * MOTION.scaleFalloff;

      // Opacité : falloff en courbe (douce au centre, franche au bord).
      const op = Math.pow(clamp(1 - absDelta / MOTION.opFalloff, 0, 1), 1.4);

      card.style.transform = `translate(-50%, -50%) translate3d(${tx}vw, 0, ${tz}px) rotateY(${ry}deg) skewX(${skew}deg) scale(${scale * stretchX}, ${scale})`;
      card.style.opacity = op.toFixed(3);
      card.style.zIndex = String(Math.round(100 - absDelta * 10));
      card.style.pointerEvents = absDelta < 0.5 ? "auto" : "none";
      // Pilote la profondeur de champ (filter CSS) et la parallaxe de l'image.
      card.style.setProperty("--focus", focus.toFixed(3));
      card.style.setProperty("--px", `${clamp(-delta * 13, -14, 14).toFixed(1)}px`);
    }

    // HUD — compteur + filet de progression.
    if (counterRef.current) {
      const n = clamp(Math.round(current) + 1, 1, total);
      const label = String(n).padStart(2, "0");
      if (counterRef.current.textContent !== label) {
        counterRef.current.textContent = label;
      }
    }
    if (progressRef.current && total > 1) {
      progressRef.current.style.transform = `scaleX(${(current / (total - 1)).toFixed(4)})`;
    }
  });

  if (total === 0) return null;

  const heightVh = scrollPerCard * total + 100;

  return (
    <section
      ref={sectionRef}
      className="scene-projects relative bg-bg"
      style={{ height: `${heightVh}vh` }}
      aria-label="Projets récents"
    >
      <div
        ref={stickyRef}
        className="scene-sticky sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: `${SCENE_PARAMS.desktop.perspective}px` }}
      >
        <div
          className="scene-stage relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="scene-card absolute left-1/2 top-1/2 w-[min(80vw,400px)] md:w-[min(72vw,560px)]"
              style={{
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
                transformOrigin: "50% 50%",
                backfaceVisibility: "hidden",
              }}
            >
              <ProjectCard3D {...project} />
            </div>
          ))}
        </div>

        {/* HUD éditorial — compteur de progression dans le couloir. Décoratif :
            l'info reste dans le DOM des cartes pour l'accessibilité. */}
        <div
          className="scene-hud pointer-events-none absolute inset-x-0 bottom-[clamp(1.5rem,4vh,3rem)] px-gutter z-[60]"
          aria-hidden
        >
          <div className="max-w-default mx-auto flex items-center gap-4 font-sans text-[11px] tracking-[0.16em] small-caps text-ink/55">
            <span className="tabular-nums">
              <span ref={counterRef}>01</span>
              <span className="text-ink/30"> / {String(total).padStart(2, "0")}</span>
            </span>
            <span className="relative block h-px w-[clamp(3rem,8vw,5rem)] overflow-hidden bg-rule">
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left bg-accent-deep"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// ProjectCard3D — visuel de carte dans la scène.
// Composant stateless, utilisable aussi hors-scène (grid mobile fallback).
// data-card-visual / data-card-media sont ciblés par le CSS de la scène
// (profondeur de champ + parallaxe) ; hors `.scene-card`, sans effet.
// =====================================================================

export function ProjectCard3D({
  slug,
  eyebrow,
  title,
  year,
  teaser,
  tags = [],
  imageSrc,
  imageAlt,
}: SceneProject) {
  const href = `/projets/${slug}`;
  return (
    <article
      data-card-visual
      className="group relative bg-bg border border-rule-strong"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-accent-warm/25">
        <div data-card-media className="absolute inset-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 72vw"
            />
          ) : (
            <div className="size-full bg-surface" aria-hidden />
          )}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <span className="font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
            {eyebrow}
          </span>
          <span className="font-display italic text-[0.95rem] text-ink/70">
            {year}
          </span>
        </div>

        <h3 className="font-display italic text-[clamp(1.4rem,2.2vw,1.75rem)] leading-tight text-ink mb-3">
          <Link
            href={href}
            className="pb-1 border-b border-transparent transition-[border-color] duration-quick ease-out-quint group-hover:border-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
          >
            {title}
          </Link>
        </h3>

        {teaser && (
          <p className="text-body text-ink/70 max-w-[42ch]">{teaser}</p>
        )}

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 relative z-[2]">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
