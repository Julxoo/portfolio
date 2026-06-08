import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Typographie — Design",
  description:
    "Instrument Serif + Instrument Sans — le duo typographique retenu pour julestoussenel.com, et les raisons derrière.",
};

type Sample = {
  label: string;
  content: string;
  cls: string;
  italic?: boolean;
  upper?: boolean;
};

const SERIF_SAMPLES: Sample[] = [
  { label: "Roman · 400",    content: "Jules Toussenel",                                        cls: "font-display text-[clamp(1.8rem,2.8vw,2.4rem)] leading-none" },
  { label: "Italic · 400",   content: "Jules Toussenel",                                        cls: "font-display text-[clamp(1.8rem,2.8vw,2.4rem)] leading-none", italic: true },
  { label: "Pangramme",      content: "Portez ce vieux whisky au juge blond qui fume.",         cls: "font-display text-lead leading-snug",                        italic: true },
  { label: "Ligature &",     content: "Savoir-faire & patience",                                cls: "font-display text-[clamp(2.2rem,3.5vw,3rem)] leading-none",  italic: true },
];

const SANS_SAMPLES: Sample[] = [
  { label: "Caption · 12 / 400", content: "Étude de cas · refonte complète",                        cls: "text-caption" },
  { label: "Texte · 15 / 400",   content: "Des sites taillés pour les artisans et les commerces",   cls: "text-body" },
  { label: "Lead · 18 / 400",    content: "Des sites taillés pour les artisans",                    cls: "text-lead" },
  { label: "Lead · 18 / 500",    content: "Des sites taillés pour les artisans",                    cls: "text-lead font-medium" },
  { label: "Eyebrow · 11 / 500", content: "Design system · Typographie",                            cls: "text-eyebrow", upper: true },
];

type Scale = { name: string; size: string; meta: string; cls: string };

const TYPE_SCALE: Scale[] = [
  { name: "Eyebrow", size: "11 px · 500", meta: "tracking 0.2em", cls: "text-eyebrow uppercase" },
  { name: "Caption", size: "12 px · 400", meta: "line-height 1.5", cls: "text-caption" },
  { name: "Body",    size: "15 px · 400", meta: "line-height 1.65", cls: "text-body" },
  { name: "Lead",    size: "clamp 18–23 px", meta: "éditorial fluide", cls: "text-lead font-display" },
  { name: "H3",      size: "clamp 28–42 px", meta: "tracking -0.015em", cls: "font-display text-h3" },
  { name: "Display", size: "clamp 48–152 px", meta: "tracking -0.035em", cls: "font-display text-display" },
];

function SampleRow({ s }: { s: Sample }) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-ink/10 last:border-b-0">
      <span className="text-eyebrow uppercase text-ink/65 w-36 shrink-0">
        {s.label}
      </span>
      <span
        className={`${s.cls} text-ink ${s.italic ? "italic" : ""} ${s.upper ? "uppercase" : ""}`}
      >
        {s.content}
      </span>
    </div>
  );
}

export default function Typographie() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Typographie" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Deux polices, un seul parti pris.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Instrument Serif <em className="italic text-surface">+</em>{" "}
            Instrument Sans.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Après analyse des sites d&apos;architecture, de mode et de
            décoration premium qu&apos;on admire — Dirand, Yovanovitch, Van
            Duysen, Humbert &amp; Poyet, Aesop, Jacquemus, Sézane, Loewe,
            Ressource — nous avons retenu un duo qui les accompagne sans jamais
            les singer.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Google Fonts · gratuit</span>
            <span>next/font/google</span>
            <span>1 poids display · 3 poids + italiques pour texte</span>
            <span>≈ 35 Ko total</span>
          </div>
        </div>
      </section>

      {/* 01 — CE QU'ON A ÉCARTÉ */}
      <section className="px-gutter py-section-md bg-accent-warm/20">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Ce qu'on a écarté" />
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <Eyebrow>Inter · le signal &laquo;SaaS&raquo;</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4">
                Inter est devenue la police de Figma, Vercel, Linear, Stripe.
                Techniquement excellente, mais elle envoie un signal
                inconscient « ceci est un tableau de bord » — l&apos;inverse du
                message qu&apos;on veut porter à un artisan ou un restaurateur.
                Sur les dix sites premium qu&apos;on a inspectés, aucun ne
                l&apos;utilise.
              </p>
            </div>
            <div>
              <Eyebrow>Fraunces · trop &laquo;dev portfolio&raquo;</Eyebrow>
              <p className="text-body text-ink/80 max-w-[42ch] mt-4">
                Fraunces reste une merveille — variable, chaude, éditoriale.
                Mais le pairing Fraunces + Inter est devenu en 2024-2025 la
                signature reconnaissable des portfolios de développeurs. Pour
                sortir du lot, il fallait un duo qu&apos;on ne reconnaît pas à
                cent mètres.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — INSTRUMENT SERIF */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Instrument Serif · display" />
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-16">
            <div>
              <p className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em] text-surface mb-12">
                <em className="italic">Hôtel particulier</em> — devenu maison
                d&apos;hôtes.
              </p>
              <p className="text-body text-ink/80 max-w-[48ch] mb-6">
                Dessinée par l&apos;agence Instrument (Portland), gratuite,
                open source. Un seul poids, une seule italique. Sa condensation
                et son contraste élevé la rendent théâtrale aux grandes tailles,
                illisible aux petites — elle est donc strictement réservée aux
                titres.
              </p>
              <p className="text-body text-ink/80 max-w-[48ch]">
                On la voit en 2024-2025 chez Buci Hôtel Paris, Muse (art
                institutionnel), Panaille (restaurant parisien). Sa fenêtre de
                pertinence est confortable jusqu&apos;en 2027.
              </p>
            </div>
            <div>
              <Eyebrow>Échantillons</Eyebrow>
              <div className="mt-4 border-t border-ink/15">
                {SERIF_SAMPLES.map((s) => (
                  <SampleRow key={s.label} s={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — INSTRUMENT SANS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Instrument Sans · texte courant" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16">
            <div>
              <p className="text-lead text-ink/85 max-w-[42ch] mb-6">
                Du même studio que la serif — conçue pour dialoguer avec elle.
                Humaniste moderne, trois poids (400, 500, 600), italiques
                complètes. Elle porte tout le texte courant, les légendes, les
                capitales espacées.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Neutre sans être tiède, elle sort du signal
                «&nbsp;dashboard SaaS&nbsp;» tout en restant parfaitement
                lisible à toutes les tailles — même 11 px en capitales espacées
                pour les eyebrows.
              </p>
            </div>
            <div>
              <Eyebrow>Échantillons</Eyebrow>
              <div className="mt-4 border-t border-ink/15">
                {SANS_SAMPLES.map((s) => (
                  <SampleRow key={s.label} s={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — TYPE SCALE */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Type scale — six rôles" onSurface />
          <p className="text-body opacity-75 max-w-[58ch] mb-16">
            Chaque rôle est un token qui embarque taille + line-height +
            tracking + poids. Une seule classe Tailwind applique les quatre
            propriétés d&apos;un coup — plus d&apos;oubli, plus de dérive.
          </p>

          <div
            className="grid gap-px bg-surface-foreground/15"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {TYPE_SCALE.map((s) => (
              <div
                key={s.name}
                className="bg-surface p-8 flex flex-col justify-between min-h-[220px]"
              >
                <div className="text-eyebrow uppercase opacity-55 mb-6">
                  {s.name}
                </div>
                <div className={`${s.cls} leading-none`}>Aa</div>
                <div className="flex flex-col gap-1 text-caption opacity-65 mt-6">
                  <span>{s.size}</span>
                  <span>{s.meta}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-body opacity-65 max-w-[58ch] mt-16">
            Définis dans{" "}
            <code className="font-mono text-surface-foreground bg-surface-foreground/10 px-1.5 py-0.5">
              app/globals.css
            </code>{" "}
            via <code className="font-mono">@theme inline</code>. Modifier une
            valeur = un seul endroit, propagation instantanée.
          </p>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Index design", href: "/design" }}
        next={{ label: "Lire ensuite — Palette", href: "/design/palette" }}
      />
    </div>
  );
}
