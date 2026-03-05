"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "./link";

const links = [
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "Me découvrir" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* Close mobile menu on route change – the effect syncs with the external
     navigation system (Next.js router), which is exactly what effects are for. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);

  /* Transparent -> solid after 100px */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock body scroll when overlay is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname]
  );

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          transitionTimingFunction: "var(--ease-luxury)",
          backgroundColor:
            scrolled || open ? "rgba(240, 230, 217, 0.95)" : "transparent",
          backdropFilter: scrolled || open ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled || open ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-rule-light)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-serif text-xl text-dark-chocolate"
          >
            Jules Toussenel
          </Link>

          {/* Desktop */}
          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-8 md:flex"
          >
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                current={isCurrent(l.href)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative z-50 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-dark-chocolate md:hidden"
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-start justify-center bg-parchment px-6 transition-all duration-500 md:pointer-events-none md:hidden"
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label="Navigation mobile"
        style={{
          transitionTimingFunction: "var(--ease-luxury)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
        }}
      >
        <nav className="flex flex-col gap-8">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="font-serif text-dark-chocolate transition-colors duration-300 hover:text-camel"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                transitionTimingFunction: "var(--ease-hover)",
                ...(open
                  ? {
                      animation: `nav-link-enter 600ms var(--ease-enter) ${80 + i * 60}ms forwards`,
                    }
                  : { opacity: 0 }),
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact info */}
        <div
          className="mt-16"
          style={
            open
              ? {
                  opacity: 0,
                  animation: `nav-link-enter 600ms var(--ease-enter) ${80 + links.length * 60 + 100}ms forwards`,
                }
              : { opacity: 0 }
          }
        >
          <a
            href="mailto:toussenelj@gmail.com"
            className="font-sans text-xs text-taupe transition-colors duration-300 hover:text-camel"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            toussenelj@gmail.com
          </a>
          <p className="mt-1 font-sans text-xs text-taupe/50">
            Aix-en-Provence
          </p>
        </div>
      </div>
    </>
  );
}
