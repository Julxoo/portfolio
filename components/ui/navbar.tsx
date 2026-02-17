"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-serif text-xl text-dark-chocolate">
          Jules Toussenel
        </Link>

        {/* Desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} current={pathname === l.href || pathname.startsWith(l.href + "/")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-dark-chocolate md:hidden"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav aria-label="Navigation mobile" className="border-t border-rule-light bg-parchment px-6 pb-8 pt-6 md:hidden">
          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href || pathname.startsWith(l.href + "/") ? "page" : undefined}
                className="font-serif text-2xl text-dark-chocolate"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
