"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Reveal, NavLink, CtaLink, Rule } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════ */

const palette = {
  core: [
    { name: "Parchment", hex: "#F0E6D9", desc: "Fond principal" },
    { name: "Warm Cream", hex: "#E8DCCF", desc: "Surface secondaire" },
    { name: "Dark Chocolate", hex: "#2C2420", desc: "Texte principal" },
    { name: "Espresso", hex: "#1A1714", desc: "Accent sombre profond" },
    { name: "Antique Ivory", hex: "#E8E0D4", desc: "Surface claire alternative" },
    { name: "Charcoal", hex: "#2B2B2B", desc: "Texte alternatif" },
  ],
  accent: [
    { name: "Hunter Green", hex: "#2D4A3E", desc: "Accent discret" },
    { name: "Camel", hex: "#C4A882", desc: "Highlights, hover" },
    { name: "Taupe", hex: "#8C7E6E", desc: "Texte secondaire" },
    { name: "Matte Gold", hex: "#B8A088", desc: "Highlights rares" },
    { name: "Muted Burgundy", hex: "#6B3A3A", desc: "États actifs" },
  ],
  functional: [
    { name: "Border Light", hex: "#D6CFC5", desc: "Séparateurs" },
    { name: "Border Dark", hex: "#3A3430", desc: "Séparateurs sur surface sombre" },
    { name: "Hover Surface", hex: "#332C26", desc: "Surface au survol (sombre)" },
  ],
};

const spacingScale = [8, 16, 24, 32, 48, 64, 80, 120, 160];

/* ═══════════════════════════════════════════════════════════
   Page-Specific Helpers
   ═══════════════════════════════════════════════════════════ */

function DSSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="mb-16 flex items-baseline gap-4">
            <span className="font-sans text-sm tabular-nums text-taupe">
              {number}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe">
              {title}
            </span>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════ */

const navSections = [
  { id: "palette", number: "01", label: "Palette" },
  { id: "typographie", number: "02", label: "Typographie" },
  { id: "espacement", number: "03", label: "Espacement" },
  { id: "composants", number: "04", label: "Composants" },
  { id: "animation", number: "05", label: "Animation" },
  { id: "courbes", number: "06", label: "Courbes" },
  { id: "patterns", number: "07", label: "Patterns" },
  { id: "boutons", number: "08", label: "Boutons" },
  { id: "formulaire", number: "09", label: "Formulaire" },
  { id: "galerie", number: "10", label: "Galerie" },
  { id: "cards", number: "11", label: "Cards" },
  { id: "temoignages", number: "12", label: "Témoignages" },
  { id: "accordeon", number: "13", label: "Accordéon" },
  { id: "statistiques", number: "14", label: "Statistiques" },
  { id: "badges", number: "15", label: "Badges" },
  { id: "tableau", number: "16", label: "Tableau" },
];

function FloatingNav() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Pick the section with the highest ratio
        let best = "";
        let bestRatio = 0;
        visibleSections.forEach((ratio, sId) => {
          if (ratio > bestRatio) {
            best = sId;
            bestRatio = ratio;
          }
        });
        if (best) setActiveId(best);
      },
      { threshold: [0, 0.2, 0.4, 0.6], rootMargin: "-10% 0px -40% 0px" }
    );

    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:right-12">
      <ul className="space-y-1">
        {navSections.map(({ id, number, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center gap-2.5 py-[3px] transition-colors duration-300"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                <span
                  className={`font-mono text-[10px] tabular-nums transition-colors duration-300 ${
                    isActive ? "text-camel" : "text-taupe/40 group-hover:text-taupe"
                  }`}
                >
                  {number}
                </span>
                <span
                  className={`font-sans text-[11px] tracking-[0.04em] transition-all duration-300 ${
                    isActive
                      ? "text-dark-chocolate translate-x-0 opacity-100"
                      : "text-taupe/0 -translate-x-1 opacity-0 group-hover:text-taupe group-hover:translate-x-0 group-hover:opacity-60"
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileDisclaimer() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const isMobile = useSyncExternalStore(
    (cb) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); },
    () => window.innerWidth < 1024,
    () => false,
  );

  useEffect(() => {
    if (!isMobile || !visible) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [isMobile, visible, countdown]);

  if (!isMobile || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 px-8 backdrop-blur-sm">
      <div className="max-w-sm text-center">
        <p
          className="font-normal text-antique-ivory"
          style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
        >
          Pour une meilleure exp&eacute;rience, nous recommandons
          de visualiser cette page depuis un ordinateur.
        </p>
        <p className="mt-4 font-sans text-sm leading-[1.7] text-antique-ivory/50">
          Les composants, animations et d&eacute;tails sont plus
          appr&eacute;ciables sur un &eacute;cran large. Rien ne vous
          emp&ecirc;che de continuer ici.
        </p>
        <button
          onClick={() => countdown <= 0 && setVisible(false)}
          className={`mt-8 inline-block border px-6 py-3 font-sans text-[12px] uppercase tracking-[0.1em] transition-all duration-300 ${
            countdown > 0
              ? "cursor-not-allowed border-antique-ivory/10 text-antique-ivory/20"
              : "border-antique-ivory/30 text-antique-ivory hover:border-camel hover:text-camel"
          }`}
          style={{ transitionTimingFunction: "var(--ease-hover)" }}
        >
          {countdown > 0
            ? `Continuer (${countdown})`
            : "Continuer quand m\u00eame"}
        </button>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [animKey, setAnimKey] = useState(0);

  return (
    <div className="min-h-screen font-sans">
      <MobileDisclaimer />
      <FloatingNav />

      {/* ── Header ─────────────────────────────────────── */}
      <header className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:px-12 md:pt-40">
        <Reveal>
          <p className="mb-6 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Jules Toussenel &middot; Identit&eacute; visuelle
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)" }}>
            Design System
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="max-w-xl font-sans text-lg leading-relaxed text-taupe">
            R&eacute;f&eacute;rence visuelle compl&egrave;te : palette, typographie, composants et
            animations. Esth&eacute;tique &laquo;&nbsp;quiet luxury&nbsp;&raquo;, chocolat &amp; cr&egrave;me.
          </p>
        </Reveal>
      </header>

      <Rule />

      {/* ── 01 ·Palette ───────────────────────────────── */}
      <DSSection id="palette" number="01" title="Palette">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Couleurs principales
          </p>
        </Reveal>
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {palette.core.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div>
                <div
                  className="mb-4 aspect-[3/4] border border-rule-light"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="font-sans text-sm">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-taupe">{c.hex}</p>
                <p className="mt-1 font-sans text-xs text-taupe">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Accents
          </p>
        </Reveal>
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {palette.accent.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div>
                <div
                  className="mb-4 aspect-[3/4] border border-rule-light"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="font-sans text-sm">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-taupe">{c.hex}</p>
                <p className="mt-1 font-sans text-xs text-taupe">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Fonctionnels
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {palette.functional.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <div>
                <div
                  className="mb-4 aspect-[3/4] border border-rule-light"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="font-sans text-sm">{c.name}</p>
                <p className="mt-0.5 font-mono text-xs text-taupe">{c.hex}</p>
                <p className="mt-1 font-sans text-xs text-taupe">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </DSSection>

      <Rule />

      {/* ── 02 ·Typographie ───────────────────────────── */}
      <DSSection id="typographie" number="02" title="Typographie">
        <div className="space-y-16">
          <Reveal>
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Hero · Cormorant Garamond · Light 300
              </p>
              <h2
                className="font-light"
                style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)" }}
              >
                Crafting Digital Experiences
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Heading 1 · Cormorant Garamond · Regular 400
              </p>
              <h2
                className="font-normal"
                style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}
              >
                Services & Réalisations
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Subheading · Inter · Medium 500 · Uppercase
              </p>
              <p
                className="font-sans font-medium uppercase tracking-[0.1em]"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
              >
                Développement sur-mesure
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Body · Inter · Regular 400 · 18px / 1.7
              </p>
              <p className="font-sans text-lg leading-[1.7] opacity-80">
                Je conçois et développe des applications web sur-mesure pour les
                entreprises : CRM m&eacute;tier, plateformes SaaS, outils
                d&apos;automatisation, bots intelligents. De l&apos;architecture
                au déploiement en production, je prends en charge
                l&apos;intégralité du développement.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Caption · Inter · Regular 400 · 14px · Taupe
              </p>
              <p className="font-sans text-sm text-taupe">
                Aix-en-Provence, France · 2026
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Pull Quote · Cormorant Garamond · Italic 400
              </p>
              <blockquote
                className="border-l border-camel pl-8 font-serif italic leading-[1.3] text-dark-chocolate"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Chaque projet est construit pour durer : code propre,
                performances optimisées, maintenance facilitée.
              </blockquote>
            </div>
          </Reveal>
        </div>
      </DSSection>

      <Rule />

      {/* ── 03 ·Espacement ────────────────────────────── */}
      <DSSection id="espacement" number="03" title="Espacement">
        <Reveal>
          <p className="mb-12 font-sans text-sm text-taupe">
            Grille de base : 8px. Tous les espacements sont des multiples de 8.
          </p>
        </Reveal>
        <div className="space-y-4">
          {spacingScale.map((s, i) => (
            <Reveal key={s} delay={i * 40}>
              <div className="flex items-center gap-6">
                <span className="w-12 shrink-0 text-right font-mono text-xs text-taupe">
                  {s}px
                </span>
                <div
                  className="h-3 bg-dark-chocolate/20"
                  style={{ width: `${Math.min(s * 2, 600)}px` }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </DSSection>

      <Rule />

      {/* ── 04 ·Composants ────────────────────────────── */}
      <DSSection id="composants" number="04" title="Composants">
        {/* 04.1 ·Navigation */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.1 ·Navigation
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 border border-rule-light bg-parchment p-6">
            <nav className="flex items-center justify-between">
              <span className="font-serif text-xl">Jules Toussenel</span>
              <div className="hidden items-center gap-8 md:flex">
                <NavLink href="#">Services</NavLink>
                <NavLink href="#">Projets</NavLink>
                <NavLink href="#">Expérience</NavLink>
                <NavLink href="#">Contact</NavLink>
              </div>
            </nav>
          </div>
        </Reveal>

        {/* 04.2 ·Hero */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.2 ·Section Hero
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 border border-rule-light bg-warm-cream px-8 py-24 md:px-16 md:py-40">
            <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
              AI-Augmented Software Engineer ·Aix-en-Provence
            </p>
            <h2
              className="mb-12 font-light"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)" }}
            >
              Applications web sur-mesure,
              <br />
              de l&apos;idée à la production
            </h2>
            <CtaLink href="#">Découvrir mes services</CtaLink>
            <hr className="mt-16 h-px border-0 bg-rule-light" />
          </div>
        </Reveal>

        {/* 04.3 ·Project Entry */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.3 ·Entrée Projet · Survolez pour voir les transitions
          </p>
        </Reveal>
        <Reveal>
          <a href="#" className="group mb-16 block">
            <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-end md:gap-12">
              <h3
                className="font-normal transition-colors duration-[600ms] group-hover:text-camel"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  transitionTimingFunction: "var(--ease-luxury)",
                }}
              >
                CRM Sur-Mesure ·ATC Immobilier
              </h3>
              <p className="shrink-0 font-sans text-sm text-taupe">
                2025 ·En cours
              </p>
            </div>
            <p className="mb-8 max-w-2xl font-sans text-base text-taupe">
              CRM immobilier commercial full-stack remplaçant Salesforce.
              Matching intelligent, cartographie interactive, enrichissement
              automatisé.
            </p>
            <div className="overflow-hidden">
              <div
                className="aspect-[16/9] border border-rule-light bg-warm-cream transition-transform duration-[600ms] group-hover:scale-[1.02]"
                style={{ transitionTimingFunction: "var(--ease-luxury)" }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">
                    Image du projet
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        <Rule />

        {/* 04.4 ·Editorial Text Section */}
        <Reveal>
          <p className="mb-8 mt-24 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.4 ·Section Éditoriale
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 bg-warm-cream px-8 py-24 md:px-16">
            <div className="max-w-[720px]">
              <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Approche
              </p>
              <h3
                className="mb-8 font-normal"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                Un développement pensé pour durer
              </h3>
              <p className="mb-8 font-sans text-lg leading-[1.7] opacity-70">
                Chaque projet commence par une phase d&apos;écoute et de
                cadrage. Je traduis vos besoins métier en spécifications
                techniques claires, puis je développe en cycles courts avec des
                livraisons régulières.
              </p>
              <p className="mb-12 font-sans text-lg leading-[1.7] opacity-70">
                Le résultat : une application robuste, performante et évolutive,
                accompagnée d&apos;une documentation complète pour garantir son
                autonomie.
              </p>
              <blockquote
                className="border-l-2 border-camel pl-8 font-serif italic leading-[1.3]"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                &ldquo;Code propre, performances optimisées, maintenance
                facilitée.&rdquo;
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* 04.5 ·Contact */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.5 ·Section Contact
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 border border-rule-light bg-warm-cream px-8 py-24 md:px-16">
            <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
              Contact
            </p>
            <h3
              className="mb-12 font-light"
              style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
            >
              Parlons de votre projet
            </h3>
            <a
              href="mailto:toussenelj@gmail.com"
              className="group inline-flex items-center gap-3 font-serif text-camel transition-colors duration-[400ms] hover:text-matte-gold"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              toussenelj@gmail.com
              <span
                className="inline-block transition-transform duration-[400ms] group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-hover)" }}
              >
                &rarr;
              </span>
            </a>

            {/* Minimal form */}
            <div className="mt-20 max-w-lg space-y-8">
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Ou écrivez directement
              </p>
              {["Votre nom", "Votre email", "Décrivez votre projet"].map(
                (placeholder) => (
                  <div key={placeholder}>
                    <input
                      type={
                        placeholder.includes("email") ? "email" : "text"
                      }
                      placeholder={placeholder}
                      className="w-full border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none"
                      style={{
                        transitionTimingFunction: "var(--ease-hover)",
                      }}
                    />
                  </div>
                )
              )}
              <CtaLink href="#">Envoyer</CtaLink>
            </div>
          </div>
        </Reveal>

        {/* 04.6 ·Footer */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.6 ·Pied de page
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 p-6">
            <Rule />
            <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <span className="font-sans text-sm text-taupe">
                &copy; 2026 Jules Toussenel
              </span>
              <div className="flex gap-6">
                {["GitHub", "LinkedIn", "Email"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-sans text-sm text-taupe transition-colors duration-300 hover:text-dark-chocolate"
                    style={{
                      transitionTimingFunction: "var(--ease-hover)",
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* 04.7 ·Links & CTAs */}
        <Reveal>
          <p className="mb-8 mt-24 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.7 ·Liens & Appels à l&apos;action
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 space-y-8">
            <div>
              <CtaLink href="#">Voir mes services</CtaLink>
            </div>
            <div>
              <CtaLink href="#" className="text-dark-chocolate">
                Découvrir le projet
              </CtaLink>
            </div>
            <div>
              <CtaLink href="#" className="text-matte-gold">
                Demander un devis
              </CtaLink>
            </div>
          </div>
        </Reveal>

        {/* 04.8 ·Dividers */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            04.8 ·Séparateurs
          </p>
        </Reveal>
        <Reveal>
          <div className="space-y-12">
            <div>
              <p className="mb-4 font-sans text-xs text-taupe">
                Sur fond Parchment
              </p>
              <Rule />
            </div>
            <div className="bg-warm-cream p-8">
              <p className="mb-4 font-sans text-xs text-taupe">
                Sur fond Warm Cream
              </p>
              <hr className="h-px border-0 bg-dark-chocolate/10" />
            </div>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 05 ·Animation ─────────────────────────────── */}
      <DSSection id="animation" number="05" title="Animation">
        <Reveal>
          <p className="mb-12 font-sans text-sm text-taupe">
            Animations subtiles et intentionnelles. Chaque mouvement suit un
            rythme lent et délibéré.
          </p>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Scroll Reveal · Fade in + translate Y
          </p>
        </Reveal>
        <div className="mb-24 space-y-4" key={animKey}>
          {["Premier élément", "Deuxième élément", "Troisième élément"].map(
            (text, i) => (
              <Reveal key={`${text}-${animKey}`} delay={i * 100}>
                <div className="border border-rule-light bg-warm-cream p-6">
                  <p className="font-sans text-sm">{text}</p>
                </div>
              </Reveal>
            )
          )}
        </div>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            Image Clip Reveal · Dévoilement du bas vers le haut
          </p>
        </Reveal>
        <ClipRevealDemo key={`clip-${animKey}`} />

        <Reveal>
          <button
            onClick={() => setAnimKey((k) => k + 1)}
            className="mt-16 font-sans text-sm text-taupe underline underline-offset-4 transition-colors duration-300 hover:text-dark-chocolate"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            Rejouer les animations
          </button>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 06 ·Courbes ───────────────────────────────── */}
      <DSSection id="courbes" number="06" title="Courbes d'animation">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              name: "Luxury",
              css: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
              desc: "Transitions principales, mouvement lent et délibéré",
            },
            {
              name: "Enter",
              css: "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
              desc: "Éléments entrants, apparitions au scroll",
            },
            {
              name: "Hover",
              css: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              desc: "États hover, interactions rapides mais douces",
            },
          ].map((curve, i) => (
            <Reveal key={curve.name} delay={i * 80}>
              <EasingDemo
                name={curve.name}
                css={curve.css}
                desc={curve.desc}
              />
            </Reveal>
          ))}
        </div>
      </DSSection>

      <Rule />

      {/* ── 07 ·Patterns ─────────────────────────────── */}
      <DSSection id="patterns" number="07" title="Patterns récurrents">
        {/* Label small caps */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.1 ·Label small caps
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 space-y-4">
            <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Services
            </p>
            <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">
              Inclus dans toutes les formules
            </p>
            <p className="font-sans text-xs text-taupe">
              Variante : Inter 13px · Uppercase · Tracking 0.15em · Taupe
            </p>
          </div>
        </Reveal>

        {/* Partial rule */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.2 ·Rule partielle (signature)
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 space-y-8">
            <div>
              <div className="w-16 md:w-24"><Rule /></div>
              <p className="mt-3 font-sans text-xs text-taupe">w-16 / md:w-24 ·séparateur de sections</p>
            </div>
            <div>
              <Rule />
              <p className="mt-3 font-sans text-xs text-taupe">Pleine largeur ·séparateur principal</p>
            </div>
          </div>
        </Reveal>

        {/* Price display */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.3 ·Affichage prix
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-16">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">à partir de</p>
              <p className="font-normal" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>300&thinsp;€</p>
              <p className="mt-1 font-sans text-xs text-taupe">Variable</p>
            </div>
            <div>
              <p className="font-sans text-[8px] uppercase tracking-[0.12em] text-taupe">prix fixe</p>
              <p className="font-normal" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>150&thinsp;€</p>
              <p className="mt-1 font-sans text-xs text-taupe">Fixe ·&ldquo;Tout compris, sans surprise.&rdquo;</p>
            </div>
          </div>
        </Reveal>

        {/* List border-b */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.4 ·Liste à séparateurs
          </p>
        </Reveal>
        <Reveal>
          <ul className="mb-16 border-t border-rule-light">
            {["Élément un", "Élément deux", "Élément trois"].map((item) => (
              <li key={item} className="border-b border-rule-light py-4 font-sans text-sm text-dark-chocolate/70">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Grid includes */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.5 ·Grille inclus (2 colonnes)
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid gap-x-8 gap-y-3 md:grid-cols-2">
            {["Design sur-mesure", "Responsive", "Tracker Analytics", "Hébergement inclus", "Optimisation performance", "Favicon sur-mesure"].map((item) => (
              <p key={item} className="font-sans text-sm leading-[1.6] text-dark-chocolate/70">{item}</p>
            ))}
          </div>
        </Reveal>

        {/* Steps */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.6 ·Étapes / Déroulement
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid gap-10 md:grid-cols-3 md:gap-12">
            {[
              { n: "01", t: "Échange", d: "Discussion du projet et des objectifs." },
              { n: "02", t: "Conception", d: "Design et développement itératif." },
              { n: "03", t: "Livraison", d: "Mise en ligne et configuration." },
            ].map((s) => (
              <div key={s.n}>
                <p className="font-mono text-xs text-taupe">{s.n}</p>
                <h3 className="mt-3 font-normal" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>{s.t}</h3>
                <p className="mt-3 font-sans text-sm leading-[1.7] text-dark-chocolate/60">{s.d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Collapsible */}
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            07.7 ·Liste dépliable
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-8">
            <CollapsibleListDemo />
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 08 ·Boutons & Actions ────────────────────── */}
      <DSSection id="boutons" number="08" title="Boutons & Actions">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            08.1 ·CTA texte + flèche (principal)
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-8">
            <CtaLink href="#">Action principale</CtaLink>
            <CtaLink href="#">Découvrir</CtaLink>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            08.2 ·Bouton contour
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-6">
            <button className="border border-dark-chocolate px-6 py-3 font-sans text-[13px] uppercase tracking-[0.1em] text-dark-chocolate transition-all duration-300 hover:bg-dark-chocolate hover:text-parchment" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Contour standard
            </button>
            <button className="border border-camel px-6 py-3 font-sans text-[13px] uppercase tracking-[0.1em] text-camel transition-all duration-300 hover:bg-camel hover:text-parchment" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Contour accent
            </button>
            <button className="border border-rule-light px-6 py-3 font-sans text-[13px] uppercase tracking-[0.1em] text-taupe cursor-not-allowed opacity-50">
              Désactivé
            </button>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            08.3 ·Bouton plein
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-6">
            <button className="bg-dark-chocolate px-6 py-3 font-sans text-[13px] uppercase tracking-[0.1em] text-parchment transition-colors duration-300 hover:bg-espresso" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Plein sombre
            </button>
            <button className="bg-camel px-6 py-3 font-sans text-[13px] uppercase tracking-[0.1em] text-parchment transition-colors duration-300 hover:bg-matte-gold" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Plein accent
            </button>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            08.4 ·Bouton texte (ghost)
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-8">
            <button className="font-sans text-sm text-dark-chocolate underline underline-offset-4 transition-colors duration-300 hover:text-camel" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Lien texte
            </button>
            <button className="font-sans text-sm text-taupe underline underline-offset-4 transition-colors duration-300 hover:text-dark-chocolate" style={{ transitionTimingFunction: "var(--ease-hover)" }}>
              Lien secondaire
            </button>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 09 ·Formulaire ───────────────────────────── */}
      <DSSection id="formulaire" number="09" title="Formulaire">
        <Reveal>
          <div className="max-w-lg space-y-10">
            <div>
              <p className="mb-6 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Champs de saisie
              </p>
              <div className="space-y-8">
                <input type="text" placeholder="Texte" className="w-full border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none" />
                <input type="email" placeholder="Email" className="w-full border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none" />
                <input type="tel" placeholder="Téléphone" className="w-full border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none" />
                <textarea placeholder="Message" rows={4} className="w-full resize-none border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base leading-[1.7] transition-colors duration-300 placeholder:text-taupe/40 focus:border-camel focus:outline-none" />
              </div>
            </div>

            <div>
              <p className="mb-6 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Sélection
              </p>
              <select className="w-full appearance-none border-0 border-b border-rule-light bg-transparent pb-3 font-sans text-base text-dark-chocolate transition-colors duration-300 focus:border-camel focus:outline-none">
                <option>Choisir une option</option>
                <option>Site vitrine</option>
                <option>Identité visuelle</option>
                <option>Autre</option>
              </select>
            </div>

            <div>
              <p className="mb-6 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
                Cases & Bascules
              </p>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 accent-camel" defaultChecked />
                  <span className="font-sans text-sm text-dark-chocolate/70">Option activée</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 accent-camel" />
                  <span className="font-sans text-sm text-dark-chocolate/70">Option désactivée</span>
                </label>
                <div className="mt-4 flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="ds-radio" className="h-4 w-4 accent-camel" defaultChecked />
                    <span className="font-sans text-sm text-dark-chocolate/70">Choix A</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="ds-radio" className="h-4 w-4 accent-camel" />
                    <span className="font-sans text-sm text-dark-chocolate/70">Choix B</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 10 ·Galerie & Images ─────────────────────── */}
      <DSSection id="galerie" number="10" title="Galerie & Images">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            10.1 ·Grille 2 colonnes
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid grid-cols-2 gap-4">
            {[1, 2].map((n) => (
              <div key={n} className="aspect-[4/3] border border-rule-light bg-warm-cream flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">Image {n}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            10.2 ·Grille 3 colonnes
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-square border border-rule-light bg-warm-cream flex items-center justify-center">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">{n}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            10.3 ·Grille maçonnerie
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 columns-2 gap-4 md:columns-3">
            {[
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-square",
              "aspect-[4/5]",
              "aspect-[3/4]",
              "aspect-[4/3]",
            ].map((aspect, i) => (
              <div key={i} className={`mb-4 break-inside-avoid border border-rule-light bg-warm-cream flex items-center justify-center ${aspect}`}>
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">{i + 1}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            10.4 ·Image avec légende
          </p>
        </Reveal>
        <Reveal>
          <figure className="mb-16">
            <div className="aspect-[16/9] border border-rule-light bg-warm-cream flex items-center justify-center">
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">Image</span>
            </div>
            <figcaption className="mt-3 font-sans text-xs text-taupe">
              Légende de l&apos;image ·Description du contexte ou du projet
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            10.5 ·Image avec overlay au survol
          </p>
        </Reveal>
        <Reveal>
          <div className="group relative mb-16 aspect-[16/9] cursor-pointer overflow-hidden border border-rule-light bg-warm-cream">
            <div className="flex h-full w-full items-center justify-center transition-transform duration-[600ms] group-hover:scale-[1.02]" style={{ transitionTimingFunction: "var(--ease-luxury)" }}>
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">Image</span>
            </div>
            <div className="absolute inset-0 flex items-end bg-dark-chocolate/0 p-6 transition-colors duration-[400ms] group-hover:bg-dark-chocolate/60" style={{ transitionTimingFunction: "var(--ease-luxury)" }}>
              <p className="font-sans text-sm text-parchment opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">Voir le projet &rarr;</p>
            </div>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 11 ·Cards ────────────────────────────────── */}
      <DSSection id="cards" number="11" title="Cards">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            11.1 ·Card minimale (border-top)
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {["Titre un", "Titre deux", "Titre trois"].map((t) => (
              <div key={t} className="border-t border-rule-light pt-6">
                <h3 className="font-normal" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>{t}</h3>
                <p className="mt-3 font-sans text-sm leading-[1.6] text-dark-chocolate/60">
                  Description courte du contenu de cette card.
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            11.2 ·Card avec fond
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            {["Warm Cream", "Antique Ivory"].map((bg, i) => (
              <div key={bg} className={`p-8 ${i === 0 ? "bg-warm-cream" : "bg-antique-ivory"}`}>
                <p className="mb-4 font-sans text-[13px] uppercase tracking-[0.15em] text-taupe">Label</p>
                <h3 className="font-normal" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>Titre de la card</h3>
                <p className="mt-4 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                  Contenu plus long avec description détaillée du sujet abordé dans cette card.
                </p>
                <div className="mt-6">
                  <CtaLink href="#">En savoir plus</CtaLink>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            11.3 ·Card horizontale
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 border-t border-rule-light">
            <div className="flex flex-col gap-6 py-8 md:flex-row md:gap-12">
              <div className="aspect-[4/3] w-full shrink-0 border border-rule-light bg-warm-cream flex items-center justify-center md:w-64">
                <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">Image</span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-normal" style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}>Titre du contenu</h3>
                <p className="mt-3 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
                  Description accompagnant l&apos;image. Ce format est idéal pour les articles de blog ou les entrées de portfolio.
                </p>
                <div className="mt-4">
                  <CtaLink href="#">Lire la suite</CtaLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 12 ·Témoignages ──────────────────────────── */}
      <DSSection id="temoignages" number="12" title="Témoignages">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            12.1 ·Citation large
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16">
            <blockquote className="border-l-2 border-camel pl-8 font-serif italic leading-[1.3]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              &ldquo;Un travail remarquable, une écoute parfaite et un résultat qui dépasse nos attentes.&rdquo;
            </blockquote>
            <div className="mt-6 pl-8">
              <p className="font-sans text-sm">Prénom Nom</p>
              <p className="font-sans text-xs text-taupe">Fondateur, Entreprise</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            12.2 ·Grille témoignages
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {[
              { quote: "Professionnel, rapide, à l\u2019écoute.", name: "Client A", role: "CEO, Startup" },
              { quote: "Le design system a transformé notre image de marque.", name: "Client B", role: "Directrice, Agence" },
              { quote: "Je recommande sans hésiter.", name: "Client C", role: "Artisan, Commerce" },
            ].map((t) => (
              <div key={t.name} className="border-t border-rule-light pt-6">
                <p className="font-serif italic leading-[1.4]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-sans text-sm">{t.name}</p>
                <p className="font-sans text-xs text-taupe">{t.role}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 13 ·Accordéon / FAQ ──────────────────────── */}
      <DSSection id="accordeon" number="13" title="Accordéon / FAQ">
        <Reveal>
          <AccordionDemo />
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 14 ·Statistiques ─────────────────────────── */}
      <DSSection id="statistiques" number="14" title="Statistiques & Chiffres">
        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            14.1 ·Grands chiffres
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50+", label: "Projets livrés" },
              { value: "150€", label: "Identité visuelle" },
              { value: "24h", label: "Temps de réponse" },
              { value: "100%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-normal" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>{s.value}</p>
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.1em] text-taupe">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <p className="mb-8 font-sans text-xs uppercase tracking-[0.15em] text-taupe">
            14.2 ·Statistiques en ligne
          </p>
        </Reveal>
        <Reveal>
          <div className="mb-16 flex flex-wrap gap-12 border-t border-rule-light pt-8">
            {[
              { value: "300€", label: "Site vitrine dès" },
              { value: "< 1 KB", label: "Script analytics" },
              { value: "0", label: "Cookie déposé" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl">{s.value}</p>
                <p className="mt-1 font-sans text-xs text-taupe">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 15 ·Badges & Tags ────────────────────────── */}
      <DSSection id="badges" number="15" title="Badges & Tags">
        <Reveal>
          <div className="mb-16 space-y-8">
            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">Badges</p>
              <div className="flex flex-wrap gap-3">
                <span className="border border-rule-light px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-dark-chocolate">Next.js</span>
                <span className="border border-rule-light px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-dark-chocolate">React</span>
                <span className="border border-rule-light px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-dark-chocolate">TypeScript</span>
                <span className="border border-rule-light px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-dark-chocolate">Tailwind CSS</span>
              </div>
            </div>

            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">Tags accent</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-camel/10 px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-camel">Populaire</span>
                <span className="bg-hunter-green/10 px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-hunter-green">Nouveau</span>
                <span className="bg-muted-burgundy/10 px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-muted-burgundy">Complet</span>
              </div>
            </div>

            <div>
              <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-taupe">Indicateurs de statut</p>
              <div className="flex flex-wrap gap-6">
                <span className="flex items-center gap-2 font-sans text-sm text-dark-chocolate/70">
                  <span className="h-2 w-2 rounded-full bg-hunter-green" />
                  En ligne
                </span>
                <span className="flex items-center gap-2 font-sans text-sm text-dark-chocolate/70">
                  <span className="h-2 w-2 rounded-full bg-camel" />
                  En cours
                </span>
                <span className="flex items-center gap-2 font-sans text-sm text-dark-chocolate/70">
                  <span className="h-2 w-2 rounded-full bg-taupe" />
                  Terminé
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </DSSection>

      <Rule />

      {/* ── 16 ·Tableau ──────────────────────────────── */}
      <DSSection id="tableau" number="16" title="Tableau">
        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dark-chocolate/20">
                  <th className="pb-3 pr-8 font-sans text-xs uppercase tracking-[0.1em] text-taupe">Service</th>
                  <th className="pb-3 pr-8 font-sans text-xs uppercase tracking-[0.1em] text-taupe">Délai</th>
                  <th className="pb-3 font-sans text-xs uppercase tracking-[0.1em] text-taupe">Prix</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { service: "Identité visuelle", delai: "1 semaine", prix: "150 €" },
                  { service: "Site vitrine", delai: "1–3 semaines", prix: "Dès 300 €" },
                  { service: "Application web", delai: "Sur devis", prix: "Sur devis" },
                ].map((row) => (
                  <tr key={row.service} className="border-b border-rule-light">
                    <td className="py-4 pr-8 font-sans text-sm">{row.service}</td>
                    <td className="py-4 pr-8 font-sans text-sm text-dark-chocolate/60">{row.delai}</td>
                    <td className="py-4 font-serif text-base">{row.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </DSSection>

      {/* ── End ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <Rule />
        <Reveal>
          <p className="mt-12 text-center font-sans text-sm text-taupe">
            Fin du design system · 16 sections · Prêt pour validation
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page-Specific Animation Demos
   ═══════════════════════════════════════════════════════════ */

function ClipRevealDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-16">
      <div
        className="aspect-[16/9] border border-rule-light bg-warm-cream"
        style={
          {
            clipPath: visible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            transition: "clip-path 800ms var(--ease-enter)",
          } as CSSProperties
        }
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-taupe/40">
            Image révélée
          </span>
        </div>
      </div>
    </div>
  );
}

function CollapsibleListDemo() {
  const [expanded, setExpanded] = useState(false);
  const allItems = [
    "Design sur-mesure",
    "Responsive (mobile, tablette, desktop)",
    "CTA directs (téléphone, email, réseaux sociaux)",
    "Tracker Analytics intégré",
    "Optimisation performance",
    "Favicon sur-mesure",
    "Mentions légales + politique de confidentialité",
    "Hébergement inclus",
  ];
  const previewCount = 4;
  const visible = expanded ? allItems : allItems.slice(0, previewCount);

  return (
    <div>
      <ul className="space-y-2">
        {visible.map((item) => (
          <li
            key={item}
            className="font-sans text-sm leading-[1.6] text-dark-chocolate/70"
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 font-sans text-xs uppercase tracking-[0.1em] text-taupe transition-colors duration-300 hover:text-camel"
        style={{ transitionTimingFunction: "var(--ease-hover)" }}
      >
        {expanded ? "Réduire" : `Voir tout (${allItems.length})`}
      </button>
    </div>
  );
}

function AccordionDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    {
      question: "Quel est le délai pour un site vitrine ?",
      answer:
        "Comptez entre 1 et 3 semaines selon la complexité du projet. Je vous donne un délai précis dès le devis.",
    },
    {
      question: "Le prix inclut-il l\u2019hébergement ?",
      answer:
        "Oui, l\u2019hébergement est inclus. Seul le coût du nom de domaine reste à votre charge (renouvelable chaque année).",
    },
    {
      question: "Puis-je modifier mon site après livraison ?",
      answer:
        "Absolument. Votre site est livré avec un accès complet. Vous pouvez me contacter pour des modifications ultérieures.",
    },
    {
      question: "Qu\u2019est-ce que Tracker Analytics ?",
      answer:
        "Mon propre outil d\u2019analyse : pas de cookies, pas de bannière RGPD, un script de moins d\u20191 KB. Tableau de bord et rapports inclus.",
    },
  ];

  return (
    <div className="border-t border-rule-light">
      {items.map((item, i) => (
        <div key={i} className="border-b border-rule-light">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left transition-colors duration-300 hover:text-camel"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            <span
              className="font-normal pr-4"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}
            >
              {item.question}
            </span>
            <span
              className="shrink-0 font-sans text-sm text-taupe transition-transform duration-300"
              style={{
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              +
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-[400ms]"
            style={{
              maxHeight: openIndex === i ? "200px" : "0px",
              opacity: openIndex === i ? 1 : 0,
              transitionTimingFunction: "var(--ease-luxury)",
            }}
          >
            <p className="pb-6 font-sans text-sm leading-[1.7] text-dark-chocolate/60">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EasingDemo({
  name,
  css,
  desc,
}: {
  name: string;
  css: string;
  desc: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
    >
      <p className="mb-2 font-sans text-sm">{name}</p>
      <p className="mb-4 font-mono text-xs text-taupe">{css}</p>
      <div className="relative mb-4 h-px bg-rule-light">
        <div
          className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-camel transition-all duration-[800ms]"
          style={{
            left: playing ? "calc(100% - 12px)" : "0px",
            transitionTimingFunction: css,
          }}
        />
      </div>
      <p className="font-sans text-xs text-taupe">{desc}</p>
      <p className="mt-2 font-sans text-[11px] text-taupe/50">
        Survolez pour prévisualiser
      </p>
    </div>
  );
}
