"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLenis } from "lenis/react";
import { MobileMenu, type NavLink } from "./MobileMenu";

/**
 * Architecture de l'info — 5 liens top-level uniquement.
 * `/design` reste hors nav (accessible par URL directe, interne/technique).
 */
const LINKS: NavLink[] = [
  { href: "/projets", label: "Projets" },
  { href: "/carnet", label: "Carnet" },
  { href: "/methode", label: "Méthode" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

/**
 * Header — sticky PERSISTANT (toujours visible). Choix assumé : sur un site
 * court orienté contact, la nav reste à portée en permanence.
 * - Transparent en haut, puis fond frosté + compact + filet dès qu'on scrolle.
 * - Pas de hide-on-scroll : il ne disparaît jamais.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useLenis((lenis) => {
    const atTop = lenis.scroll <= 8;
    if (scrolled !== !atTop) setScrolled(!atTop);
  });

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`sticky top-0 z-40 relative transition-colors duration-standard ease-out-quint ${
          scrolled ? "text-bg" : "text-ink"
        } motion-reduce:transition-none`}
      >
        {/* Le bandeau kaki qui SE POSE depuis le haut (geste du rideau). Plus
            rapide que l'inversion du texte → le kaki couvre avant que le texte
            passe en crème, donc zéro flicker. */}
        <span
          aria-hidden
          className={`absolute inset-0 origin-top bg-surface transition-transform duration-quick ease-out-quint motion-reduce:transition-none ${
            scrolled ? "scale-y-100" : "scale-y-0"
          }`}
        />
        {/* Le filet sable qui SE TRACE le long du bas (couture signature). */}
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent-warm/70 transition-transform duration-deliberate ease-out-quint motion-reduce:transition-none ${
            scrolled ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <div
          className={`relative max-w-default mx-auto px-gutter flex items-center justify-between transition-[height] duration-standard ease-out-quint motion-reduce:transition-none ${
            scrolled ? "h-12 md:h-14" : "h-14 md:h-16"
          }`}
        >
          <Link
            href="/"
            className="font-display text-[18px] leading-none font-[500] transition-[font-weight] duration-standard ease-out-quint hover:font-[640] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
          >
            Jules Toussenel
          </Link>

          {/* Nav — hover morphe la graisse (Clash/Cabinet variable) ; les
              voisins s'estompent (focus). Actif = graisse soutenue, pas de
              filet. C'est la « spell » : le type vivant, langue du site. */}
          <nav
            aria-label="Menu principal"
            className="group hidden md:flex items-center gap-x-8 font-sans text-[15px] leading-none"
          >
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-[opacity,font-weight] duration-standard ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-deep motion-reduce:transition-none ${
                    active
                      ? "opacity-100 font-[620]"
                      : "opacity-65 font-[440] group-hover:opacity-35 hover:!opacity-100 hover:!font-[680]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

        </div>
      </header>

      {/* Toggle mobile — hors <header> (donc non-inerté quand le menu s'ouvre),
          au-dessus du menu (z-60), morphe hamburger ↔ X. Aligné sur la gouttière. */}
      <button
        type="button"
        aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        onClick={() => setMobileOpen((s) => !s)}
        className="fixed top-0 right-0 z-[60] md:hidden h-14 flex items-center px-gutter focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep"
      >
        <span className="relative block w-6 h-[14px]" aria-hidden>
          <span
            className={`absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-standard ease-out-quint motion-reduce:transition-none ${
              mobileOpen || scrolled ? "bg-bg" : "bg-ink"
            } ${mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute left-0 right-0 h-[1.5px] rounded-full transition-all duration-standard ease-out-quint motion-reduce:transition-none ${
              mobileOpen || scrolled ? "bg-bg" : "bg-ink"
            } ${mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}
          />
        </span>
      </button>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={LINKS}
      />
    </>
  );
}
