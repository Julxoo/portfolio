import type { Metadata } from "next";
import { SlideLink } from "../_lib/ui/Link";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Les études de cas arriveront à mesure que les projets sortent. En attendant, écrivez-moi pour en discuter.",
};

export default function Projets() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Ce qui a été dessiné et livré.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Projets.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch]">
            Les études de cas s&apos;écrivent à mesure que les projets
            sortent de l&apos;atelier. Chacune raconte un site tel
            qu&apos;il a été dessiné — le client, le contexte, les choix,
            ce qui a marché, ce qu&apos;on referait autrement.
          </p>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-section-md">
          <div className="flex flex-col gap-4 max-w-[52ch]">
            <h2 className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-ink">
              Les premiers projets se finalisent
            </h2>
            <p className="font-sans text-[15px] text-ink/70 leading-relaxed">
              Rien à montrer en vitrine pour l&apos;instant — les
              premières études de cas paraîtront à l&apos;automne 2026.
              D&apos;ici là, la conversation se fait directement.
            </p>
            <div className="mt-4">
              <SlideLink href="/contact">
                Écrire pour en discuter
              </SlideLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
