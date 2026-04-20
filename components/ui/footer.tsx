import Link from "next/link";
import { Logo } from "./logo";
import { Rule } from "./rule";

const navLinks = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://github.com/Julxoo", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/julestoussenel/",
    label: "LinkedIn",
  },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24">
      <Rule />

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8">
        {/* Identité */}
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={22} className="text-dark-chocolate" />
            <p className="font-serif text-xl text-dark-chocolate">
              Jules Toussenel
            </p>
          </div>
          <p className="mt-2 font-sans text-xs text-taupe">
            D&eacute;veloppeur web freelance
          </p>
          <p className="font-sans text-xs text-taupe">Aix-en-Provence</p>
        </div>

        {/* Navigation */}
        <nav aria-label="Navigation pied de page">
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.15em] text-taupe/60">
            Navigation
          </p>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-sans text-sm text-dark-chocolate/70 transition-colors duration-300 hover:text-camel"
                  style={{
                    transitionTimingFunction: "var(--ease-hover)",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.15em] text-taupe/60">
            Contact
          </p>
          <a
            href="mailto:toussenelj@gmail.com"
            className="block font-sans text-sm text-dark-chocolate/70 transition-colors duration-300 hover:text-camel"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            toussenelj@gmail.com
          </a>
          <div className="mt-4 flex gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-taupe transition-colors duration-300 hover:text-camel"
                style={{
                  transitionTimingFunction: "var(--ease-hover)",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-rule-light pt-6 md:mt-16">
        <p className="font-sans text-[11px] text-taupe/50">
          &copy; {new Date().getFullYear()} Jules Toussenel
        </p>
      </div>
    </footer>
  );
}
