import type { Metadata } from "next";
import { SlideLink } from "../_lib/ui/Link";

export const metadata: Metadata = {
  title: "Carnet",
  description:
    "Notes sur la typographie, le design web, les choix de stack. Les premières entrées arriveront au printemps 2026.",
};

export default function Carnet() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Les notes qu&apos;on prend pour soi, relues, publiées.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Carnet.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch]">
            Des textes sur ce qui fait un site tenu — typographie,
            système de design, choix de stack, méthodes de travail. On
            écrit quand une idée tient sur plusieurs jours, jamais pour
            remplir un calendrier éditorial.
          </p>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-section-md">
          <div className="flex flex-col gap-4 max-w-[52ch]">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
              Le carnet commence au printemps
            </h2>
            <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
              Les premières entrées paraîtront en mars 2026. On y
              reviendra sur le choix des polices Instrument, le refus
              des templates, l&apos;intégration de Lenis sans tomber
              dans l&apos;agence 2022.
            </p>
            <div className="mt-4">
              <SlideLink href="/contact">
                Être prévenu quand le carnet ouvre
              </SlideLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
