"use client";

import Image from "next/image";
import Link from "next/link";
import { useTempus } from "tempus/react";
import { useEffect, useRef } from "react";
import { Tag } from "../_lib/ui/Tag";

// =====================================================================
// ProjectScene — galerie horizontale pilotée par le scroll vertical.
//
// Version allégée (l'ancienne scène 3D saccadait sur iOS) : la rangée se
// déplace via UNE SEULE transform translate3d (composée GPU), lissée par un
// lerp. Aucune 3D, aucun filtre blur, aucun calcul par-carte → fluide mobile.
//
// Fallback prefers-reduced-motion : scroll horizontal natif (swipe + snap),
// zéro JS (voir .ps-* dans globals.css).
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

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function ProjectScene({ projects }: { projects: SceneProject[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const distanceRef = useRef(0); // largeur de translation horizontale (px)
  const currentRef = useRef(0); // translation lissée (px)
  const visibleRef = useRef(false);
  const reducedRef = useRef(false);

  // Mesure la distance horizontale et fixe la hauteur de scroll (1:1).
  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    if (!section || !row) return;

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const measure = () => {
      reducedRef.current = mqReduced.matches;
      if (reducedRef.current) {
        section.style.height = "";
        row.style.transform = "";
        return;
      }
      const distance = Math.max(0, row.scrollWidth - window.innerWidth);
      distanceRef.current = distance;
      // Hauteur = 1 viewport (sticky) + la distance horizontale → mapping 1:1.
      section.style.height = `${window.innerHeight + distance}px`;
    };

    measure();
    document.fonts?.ready?.then(measure);
    window.addEventListener("resize", measure);
    mqReduced.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mqReduced.removeEventListener("change", measure);
    };
  }, [projects.length]);

  // Gate hors-champ.
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

  // Une transform, lissée. rAF partagé (Tempus) — marche avec/sans Lenis.
  useTempus((_t: number, deltaTime: number) => {
    if (!visibleRef.current || reducedRef.current) return;
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
  });

  if (projects.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="ps-section relative bg-bg"
      aria-label="Projets récents"
    >
      <div className="ps-sticky sticky top-0 h-[100svh] overflow-hidden flex items-center">
        <div
          ref={rowRef}
          className="ps-row flex items-center gap-[var(--grid-gap)] px-gutter [will-change:transform]"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="shrink-0 w-[80vw] sm:w-[58vw] lg:w-[34vw] max-w-[440px]"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({
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
    <article className="group relative bg-bg border border-rule-strong">
      <div className="relative aspect-[4/5] overflow-hidden bg-accent-warm/25">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover transition-transform duration-deliberate ease-out-quint group-hover:scale-[1.03] motion-reduce:transition-none"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 58vw, 80vw"
          />
        ) : (
          <div className="size-full bg-surface" aria-hidden />
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <span className="font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
            {eyebrow}
          </span>
          <span className="font-display text-[0.95rem] text-ink/70">{year}</span>
        </div>

        <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.75rem)] leading-tight text-ink mb-3">
          <Link
            href={href}
            className="pb-1 border-b border-transparent transition-[border-color] duration-quick ease-out-quint group-hover:border-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
          >
            {title}
          </Link>
        </h3>

        {teaser && <p className="text-body text-ink/70 max-w-[42ch]">{teaser}</p>}

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
