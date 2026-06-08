import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergeur, propriété intellectuelle — les mentions obligatoires en droit français pour julestoussenel.com.",
};

export default function MentionsLegales() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Les mentions obligatoires.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Mentions légales.
          </h1>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-[42rem] mx-auto flex flex-col gap-10">
          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Éditeur du site
            </h2>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed">
              Jules Toussenel, entrepreneur individuel.
              <br />
              SIREN&nbsp;: 942&nbsp;488&nbsp;891.
              <br />
              Adresse&nbsp;: 29 rue de Cuques, 13100 Aix-en-Provence, France.
              <br />
              Contact&nbsp;:{" "}
              <a
                href="mailto:toussenelj@gmail.com"
                className="underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep"
              >
                toussenelj@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Directeur de la publication
            </h2>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed">
              Jules Toussenel.
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Hébergeur
            </h2>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed">
              Vercel Inc.
              <br />
              440 N Barranca Avenue #4133, Covina, CA 91723, United
              States.
              <br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep"
              >
                vercel.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Propriété intellectuelle
            </h2>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed">
              L&apos;ensemble des textes, photographies, graphismes et
              éléments composant le site julestoussenel.com est la
              propriété de Jules Toussenel, sauf mention contraire. Toute
              reproduction, même partielle, est soumise à autorisation
              écrite préalable.
            </p>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed mt-4">
              Le code source du site est publié sous licence MIT, dans
              le dépôt public associé.
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Polices typographiques
            </h2>
            <p className="font-sans text-[15px] text-ink/85 leading-relaxed">
              Instrument Serif et Instrument Sans, dessinées par
              Instrument, distribuées par Google Fonts sous licence SIL
              Open Font License 1.1.
            </p>
          </div>

          <p className="text-caption text-ink/60 mt-6 pt-6 border-t border-rule">
            Dernière mise à jour&nbsp;: avril 2026.
          </p>
        </div>
      </section>
    </div>
  );
}
