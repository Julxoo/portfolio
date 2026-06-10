"use client";

import Image from "next/image";
import Link from "next/link";
import { useTempus } from "tempus/react";
import { useEffect, useRef } from "react";
import { Tag } from "../_lib/ui/Tag";
import { SlideLink } from "../_lib/ui/Link";

// =====================================================================
// ProjectScene — « Le défilé de l'atelier ».
//
// LE SCROLL VERTICAL PILOTE LE DÉFILÉ HORIZONTAL (sur tout appareil). La
// section est épinglée et rendue haute ; en scrollant, la rangée se translate
// latéralement. Geste signature, intégré au scroll normal.
//
// Moteur du mouvement, par ordre de préférence :
//  1. CSS scroll-driven (`animation-timeline: view()`) quand supporté
//     (iOS 26 Safari, Chrome) → piloté par le COMPOSITEUR, hors main thread :
//     impossible de saccader, même pendant l'inertie tactile iOS.
//  2. Repli JS (lerp Tempus) pour les moteurs sans support (Firefox).
//
// reduced-motion → on abandonne le scroll-jack : scroll horizontal natif
// (swipe + snap), zéro mouvement imposé.
//
// La numérotation géante (01–04) fait colonne vertébrale (écho du Manifeste).
// Survol desktop = morph de graisse du titre (Clash variable, « matière
// vivante »). HUD = filet de progression, lui aussi compositor-driven.
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
  /** Site live : si présent, la card ouvre ce lien externe (sinon /projets/{slug}). */
  url?: string;
  /** Libellé du repli kaki quand il n'y a pas de capture (défaut « Étude à venir »). */
  imageLabel?: string;
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function ProjectScene({ projects }: { projects: SceneProject[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  const distanceRef = useRef(0); // largeur de translation horizontale (px)
  const currentRef = useRef(0); // translation lissée (px) — repli JS
  const visibleRef = useRef(false);
  const modeRef = useRef<"native" | "pan">("native");
  const cssDrivenRef = useRef(false); // true → CSS gère le mouvement, le JS se tait

  // Choix du mode + mesure (--ps-x + hauteur de section).
  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    cssDrivenRef.current =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: view()");

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const apply = () => {
      if (mqReduce.matches) {
        // Mode natif : scroll horizontal au doigt, aucun mouvement imposé.
        modeRef.current = "native";
        section.dataset.mode = "native";
        section.style.height = "";
        section.style.removeProperty("--ps-x");
        row.style.transform = "";
        return;
      }

      modeRef.current = "pan";
      section.dataset.mode = "pan";
      // clientWidth exclut la scrollbar → translation exacte (pas de débord).
      const clientW = document.documentElement.clientWidth;
      const distance = Math.max(0, row.scrollWidth - clientW);
      distanceRef.current = distance;
      section.style.setProperty("--ps-x", `${distance}px`);
      // Hauteur = 1 viewport épinglé + distance horizontale → mapping 1:1.
      section.style.height = `${window.innerHeight + distance}px`;
    };

    apply();
    document.fonts?.ready?.then(apply);
    window.addEventListener("resize", apply);
    mqReduce.addEventListener("change", apply);
    return () => {
      window.removeEventListener("resize", apply);
      mqReduce.removeEventListener("change", apply);
    };
  }, [projects.length]);

  // Gate hors-champ (repli JS uniquement).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (e) => {
        visibleRef.current = e[0]?.isIntersecting ?? false;
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Repli JS (Firefox & co.) : lerp de la translate + du filet. Ne tourne PAS
  // quand le CSS scroll-driven pilote déjà (cssDrivenRef), ni en mode natif.
  useTempus((_t: number, deltaTime: number) => {
    if (
      cssDrivenRef.current ||
      modeRef.current !== "pan" ||
      !visibleRef.current
    ) {
      return;
    }
    const section = sectionRef.current;
    const row = rowRef.current;
    const distance = distanceRef.current;
    if (!section || !row || distance <= 0) return;

    const rect = section.getBoundingClientRect();
    const totalScroll = section.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    const progress = clamp(-rect.top / totalScroll, 0, 1);
    const target = -progress * distance;
    const dt = Math.min(deltaTime / 1000, 0.05);
    currentRef.current += (target - currentRef.current) * (1 - Math.exp(-14 * dt));
    row.style.transform = `translate3d(${currentRef.current.toFixed(2)}px, 0, 0)`;
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }
  });

  if (projects.length === 0) return null;

  const total = String(projects.length).padStart(2, "0");

  return (
    <>
      {/* Intro éditoriale — flux vertical normal (jamais de texte à lire dans
          la zone qui défile : NN/g). */}
      <section
        aria-labelledby="projets-titre"
        className="px-gutter pt-section-lg pb-section-md border-t border-rule"
      >
        <div className="max-w-default mx-auto">
          <div className="flex items-end justify-between gap-x-10 gap-y-6 flex-wrap">
            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-3">
                Projets récents
              </div>
              <h2
                id="projets-titre"
                className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.98] text-ink max-w-[16ch]"
              >
                Ce qui sort de{" "}
                <span className="text-surface">l&apos;atelier.</span>
              </h2>
            </div>
            <div className="flex items-center gap-5">
              <span className="font-display text-ink/40 text-[0.95rem] tabular-nums">
                {total} études
              </span>
              <SlideLink href="/projets">Tous les projets</SlideLink>
            </div>
          </div>
        </div>
      </section>

      {/* Le défilé. data-mode posé en JS ("native" par défaut = baseline
          sans-JS scrollable + reduced-motion). Styles dans globals.css. */}
      <section
        ref={sectionRef}
        data-mode="native"
        className="ps-section relative bg-bg"
        aria-label="Galerie des projets récents"
      >
        <div className="ps-viewport">
          <div
            ref={rowRef}
            className="ps-row flex items-stretch gap-[var(--grid-gap)] px-gutter [will-change:transform]"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} index={i} {...project} />
            ))}
            <EndCard />
          </div>

          {/* HUD — filet de progression. Visible en mode pan (CSS). En CSS
              scroll-driven, .ps-fill est animé par le compositeur ; en repli
              JS, son scaleX est posé dans la boucle Tempus. */}
          <div className="ps-hud pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] px-gutter">
            <span className="relative block h-px w-full bg-rule overflow-hidden">
              <span
                ref={fillRef}
                aria-hidden
                className="ps-fill absolute inset-0 origin-left bg-surface"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  index,
  slug,
  eyebrow,
  title,
  year,
  teaser,
  tags = [],
  imageSrc,
  imageAlt,
  url,
  imageLabel,
}: SceneProject & { index: number }) {
  const external = Boolean(url);
  const href = url ?? `/projets/${slug}`;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="ps-card group relative shrink-0 w-[78vw] sm:w-[58vw] lg:w-[34vw] max-w-[440px] flex flex-col">
      {/* Bande index — numéro géant (colonne vertébrale) + filet + année. */}
      <div className="flex items-baseline gap-4 mb-4">
        <span
          aria-hidden
          className="font-display text-surface text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none tabular-nums"
        >
          {num}
        </span>
        <span aria-hidden className="flex-1 h-px bg-rule-strong" />
        <span className="font-display text-ink/55 text-[0.9rem] tabular-nums">
          {year}
        </span>
      </div>

      {/* Image — cadre net, sans bordure. Aplat kaki tant que pas de capture. */}
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover transition-transform duration-deliberate ease-out-quint group-hover:scale-[1.04] motion-reduce:transition-none"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 78vw"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" aria-hidden>
            <span className="font-display text-bg/10 text-[clamp(5rem,20vw,11rem)] leading-none tabular-nums select-none">
              {num}
            </span>
            <span className="absolute bottom-5 left-5 text-eyebrow uppercase text-bg/55">
              {imageLabel ?? "Étude à venir"}
            </span>
          </div>
        )}
      </div>

      {/* Texte. */}
      <div className="pt-5">
        <div className="text-eyebrow uppercase text-ink/55 mb-2">{eyebrow}</div>
        <h3 className="font-display text-[clamp(1.45rem,2.2vw,1.9rem)] leading-[1.05] text-ink mb-3 [font-variation-settings:'wght'_480] lg:group-hover:[font-variation-settings:'wght'_660] transition-[font-variation-settings] duration-deliberate ease-out-quint motion-reduce:transition-none">
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[4px] focus-visible:outline-accent-deep"
          >
            {title}
          </Link>
        </h3>
        {teaser && (
          <p className="font-sans text-body text-ink/70 max-w-[42ch]">{teaser}</p>
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

// Fin du défilé : panneau kaki-CTA. Le défilé se conclut sur une invitation.
function EndCard() {
  return (
    <Link
      href="/projets"
      className="ps-card group relative shrink-0 w-[78vw] sm:w-[48vw] lg:w-[24vw] max-w-[360px] min-h-[24rem] flex flex-col justify-between bg-surface text-surface-foreground p-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm"
    >
      <span className="text-eyebrow uppercase text-bg/55">Et la suite</span>
      <span className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-[1.02] text-bg [font-variation-settings:'wght'_500] lg:group-hover:[font-variation-settings:'wght'_660] transition-[font-variation-settings] duration-deliberate ease-out-quint motion-reduce:transition-none">
        Voir tous
        <br />
        les projets
        <span className="inline-block transition-transform duration-quick ease-out-quint lg:group-hover:translate-x-1">
          {" "}
          →
        </span>
      </span>
    </Link>
  );
}
