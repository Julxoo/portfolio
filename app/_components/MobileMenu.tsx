"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";

export type NavLink = { href: string; label: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

const EXPO = [0.87, 0, 0.13, 1] as const;
// Centre de l'éclosion ≈ position du toggle (haut-droite). Le menu naît du bouton.
const BLOOM = (r: string) => `circle(${r} at 88% 4%)`;

/**
 * MobileMenu — réinventé. Le menu ÉCLOT en kaki depuis le toggle (clip-path),
 * puis les liens montent en cascade (mask-rise) en Clash géant, avec un
 * réglage de graisse à la montée — la langue du site (type variable + kaki +
 * geste de l'Ouverture). Page active = accent sable.
 *
 * A11y (WCAG 2.2) : role=dialog + aria-modal + aria-label, Escape ferme, body
 * scroll locké + Lenis pausé, `inert` sur header/main/footer (le toggle est
 * hors header → reste actif), focus initial sur le dialog, focus retour sur le
 * toggle à la fermeture, changement de route ferme. prefers-reduced-motion :
 * Motion neutralise les transitions globalement (globals.css).
 */
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const toInert = [
      document.querySelector("header"),
      document.getElementById("main"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => el !== null);
    toInert.forEach((el) => el.setAttribute("inert", ""));

    // Focus dans le dialog une fois l'éclosion entamée.
    const t = setTimeout(() => dialogRef.current?.focus(), 250);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      toInert.forEach((el) => el.removeAttribute("inert"));
      triggerRef.current?.focus();
    };
  }, [open, lenis, onClose]);

  // Ferme au changement de route.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.div
      id="mobile-menu"
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden={!open}
      className="fixed inset-0 z-50 bg-surface text-bg md:hidden flex flex-col outline-none"
      initial={false}
      animate={{ clipPath: open ? BLOOM("150%") : BLOOM("0%") }}
      transition={{ duration: 0.6, ease: EXPO }}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <nav
        aria-label="Menu principal"
        className="flex-1 flex flex-col justify-center px-gutter"
      >
        <motion.ul
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={{
            open: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
            closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
          }}
        >
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href} className="overflow-hidden">
                <motion.div
                  variants={{
                    closed: { y: "110%", fontWeight: 360 },
                    open: { y: "0%", fontWeight: 500 },
                  }}
                  transition={{ duration: 0.7, ease: EXPO }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`block py-1.5 font-display leading-[1.08] text-[clamp(2.6rem,11vw,4rem)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm ${
                      active ? "text-accent-warm" : "text-bg"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>
      </nav>
    </motion.div>
  );
}
