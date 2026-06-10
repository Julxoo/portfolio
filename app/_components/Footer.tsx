import Link from "next/link";
import { SlideLink } from "../_lib/ui/Link";
import { EmailLink } from "./EmailLink";

// Footer — clôture éditoriale sur panneau kaki (sol de page) : signature +
// contact en tête, puis sommaire, réseaux et un colophon orienté artisan
// (polices + travail à la main, aucun nom de techno). Barre basse : copyright,
// mentions, signature géographique. Liens recolorés en crème via `.footer-dark`.

const SUMMARY_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/methode", label: "Méthode" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/carnet", label: "Carnet" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://instagram.com/julestoussenel", label: "Instagram" },
  { href: "https://linkedin.com/in/julestoussenel", label: "LinkedIn" },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-eyebrow uppercase text-bg/45 mb-5">{children}</div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-dark relative overflow-clip bg-surface text-bg">
      {/* Halo chaud — profondeur du panneau (écho de la lumière de Provence). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-[8%] h-[70vh] w-[70vh] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-warm), transparent 70%)",
        }}
      />

      <div className="relative max-w-default mx-auto px-gutter py-section-lg">
        {/* Tête — signature + contact direct. */}
        <div className="flex flex-col gap-10 border-b border-bg/15 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <div>
            <Link
              href="/"
              className="inline-block font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.015em] transition-[font-variation-settings] duration-standard ease-out-quint hover:[font-variation-settings:'wght'_600] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm"
            >
              Jules Toussenel
            </Link>
            <p className="mt-4 max-w-[30ch] font-display italic text-lead text-bg/60">
              Sites sur-mesure, dessinés depuis Aix-en-Provence.
            </p>
          </div>

          <div className="md:text-right">
            <div className="text-eyebrow uppercase text-bg/45 mb-2">Écrire</div>
            <div className="font-display text-[clamp(1.15rem,2vw,1.5rem)]">
              <EmailLink />
            </div>
            <p className="mt-2 font-sans text-[13px] text-bg/50">
              Une réponse sous deux jours.
            </p>
          </div>
        </div>

        {/* Colonnes. */}
        <div className="grid grid-cols-2 gap-10 pt-12 md:grid-cols-3 md:gap-12 md:pt-16">
          <div>
            <ColumnTitle>Sommaire</ColumnTitle>
            <ul className="flex flex-col gap-2.5 font-sans text-[15px]">
              {SUMMARY_LINKS.map((l) => (
                <li key={l.href}>
                  <SlideLink href={l.href}>{l.label}</SlideLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Réseaux</ColumnTitle>
            <ul className="flex flex-col gap-2.5 font-sans text-[15px]">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <SlideLink href={s.href} external>
                    {s.label}
                  </SlideLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <ColumnTitle>Le détail</ColumnTitle>
            <p className="max-w-[42ch] font-sans text-[13px] leading-relaxed text-bg/55">
              Composé en Clash Display et Cabinet Grotesk. Chaque page est
              dessinée puis montée à la main, jamais posée sur un modèle tout
              prêt.
            </p>
          </div>
        </div>

        {/* Barre basse. */}
        <div className="mt-16 flex flex-col gap-3 border-t border-bg/15 pt-6 font-sans text-[12px] text-bg/50 md:flex-row md:items-baseline md:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span>© {year} Jules Toussenel</span>
            <span className="opacity-40">·</span>
            <SlideLink href="/mentions-legales">Mentions légales</SlideLink>
            <span className="opacity-40">·</span>
            <SlideLink href="/confidentialite">Confidentialité</SlideLink>
          </div>
          <div className="font-display italic text-bg/55">
            Conçu et écrit à Aix-en-Provence
          </div>
        </div>
      </div>
    </footer>
  );
}
