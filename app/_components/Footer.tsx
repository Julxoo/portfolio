import { SlideLink } from "../_lib/ui/Link";
import { EmailLink } from "./EmailLink";

/**
 * Footer — trois colonnes éditoriales + barre basse.
 *
 * Inspiration : Pentagram (trois blocs) + tradition colophon magazine
 * (Apartamento, Cabana, Kinfolk) transposée à un site freelance solo.
 *
 * Col 1 · Sommaire  — 5 liens nav + 1 secondaire
 * Col 2 · Contact   — email protégé, ville, lang, réseaux en toutes lettres
 * Col 3 · Colophon  — fontes, tech, licence photo
 * Barre basse       — © année · mentions · confidentialité · signature géographique
 */

const SUMMARY_LINKS = [
  { href: "/projets", label: "Projets" },
  { href: "/carnet", label: "Carnet" },
  { href: "/methode", label: "Méthode" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

// Liens secondaires — vide pour l'instant.
// /design est volontairement hors du footer (robots.ts le bloque à
// l'indexation, il reste accessible par URL directe).
const SECONDARY_LINKS: { href: string; label: string }[] = [];

const SOCIALS = [
  { href: "https://instagram.com/julestoussenel", label: "Instagram" },
  { href: "https://linkedin.com/in/julestoussenel", label: "LinkedIn" },
  { href: "https://are.na/jules-toussenel", label: "Are.na" },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[11px] tracking-[0.1em] uppercase text-ink/60 mb-6">
      {children}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-rule">
      <div className="max-w-default mx-auto px-gutter py-section-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Colonne 1 — Sommaire */}
          <div>
            <ColumnTitle>Sommaire</ColumnTitle>
            <ul className="flex flex-col gap-2.5 font-sans text-[15px] text-ink">
              {SUMMARY_LINKS.map((l) => (
                <li key={l.href}>
                  <SlideLink href={l.href}>{l.label}</SlideLink>
                </li>
              ))}
            </ul>

            {SECONDARY_LINKS.length > 0 && (
              <ul className="flex flex-col gap-2.5 font-sans text-[15px] text-ink/70 mt-8 pt-6 border-t border-rule">
                {SECONDARY_LINKS.map((l) => (
                  <li key={l.href}>
                    <SlideLink href={l.href}>{l.label}</SlideLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Colonne 2 — Contact */}
          <div>
            <ColumnTitle>Contact</ColumnTitle>
            <div className="font-sans text-[15px] text-ink mb-2">
              <EmailLink />
            </div>
            <div className="font-sans text-[15px] text-ink/70">Aix-en-Provence</div>

            {/* Lang switcher — FR actif, EN désactivé tant qu'on n'a pas l'EN. */}
            <div className="mt-8 pt-6 border-t border-rule font-sans text-[13px] text-ink/70 flex items-center gap-2">
              <span className="text-ink">Français</span>
              <span className="opacity-40">—</span>
              <span
                className="opacity-40 cursor-not-allowed"
                title="Version anglaise à venir"
                aria-disabled="true"
              >
                English
              </span>
            </div>

            {/* Réseaux sociaux — en toutes lettres, un par ligne. */}
            <ul className="mt-6 flex flex-col gap-2 font-sans text-[15px] text-ink">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <SlideLink href={s.href} external>
                    {s.label}
                  </SlideLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Colophon */}
          <div>
            <ColumnTitle>Colophon</ColumnTitle>
            <p className="font-sans text-[13px] leading-relaxed text-ink/80 max-w-[42ch]">
              Composé en{" "}
              <em className="italic">Instrument Serif</em> et{" "}
              <em className="italic">Instrument Sans</em>, dessinés par
              Instrument et distribués par Google Fonts.
            </p>
            <p className="font-sans text-[13px] leading-relaxed text-ink/80 max-w-[42ch] mt-4">
              Bâti avec Next.js, mis en page avec Tailwind, hébergé sur
              Vercel. Scroll par Lenis.
            </p>
            <p className="font-sans text-[13px] leading-relaxed text-ink/80 max-w-[42ch] mt-4">
              Photographies de l&apos;auteur, sauf mention contraire. Code
              source sous licence MIT.
            </p>
          </div>
        </div>

        {/* Barre basse — copyright, mentions, signature géographique. */}
        <div className="mt-16 pt-6 border-t border-rule flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 font-sans text-[12px] text-ink/70">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span>© {year} — Jules Toussenel</span>
            <span className="opacity-40">·</span>
            <SlideLink href="/mentions-legales">Mentions légales</SlideLink>
            <span className="opacity-40">·</span>
            <SlideLink href="/confidentialite">
              Politique de confidentialité
            </SlideLink>
          </div>
          <div className="font-display italic text-ink/70">
            Conçu et écrit à Aix-en-Provence
          </div>
        </div>
      </div>
    </footer>
  );
}
