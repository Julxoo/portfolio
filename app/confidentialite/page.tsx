import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Ce que le site collecte, conserve, partage. Spoiler : presque rien. Conforme RGPD, aucun traqueur publicitaire.",
};

export default function Confidentialite() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Ce que le site collecte — spoiler, presque rien.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Politique de <em className="italic text-surface">confidentialité</em>.
          </h1>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-[42rem] mx-auto flex flex-col gap-10 font-display text-body text-ink/85 leading-[1.75]">
          <p>
            Ce site ne collecte pas plus de données qu&apos;il
            n&apos;en a besoin. Pas de tracker publicitaire, pas de
            Google Analytics, pas de Facebook Pixel, pas de remarketing
            — rien de tout ça.
          </p>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4 mt-4">
              Ce qui est collecté
            </h2>
            <p>
              <strong>Quand vous écrivez via le formulaire de contact</strong>&nbsp;:
              nom, email, entreprise, projet, message. Ces informations
              sont envoyées par email et ne sont pas stockées dans une
              base de données. Elles restent dans ma boîte mail et
              servent uniquement à vous répondre.
            </p>
            <p className="mt-4">
              <strong>Logs techniques côté hébergeur</strong>&nbsp;:
              Vercel conserve des logs techniques (IP, user-agent,
              URL visitée) pendant 30 jours pour la détection
              d&apos;incidents. Je n&apos;y ai pas accès individuellement.
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Ce qui n&apos;est pas collecté
            </h2>
            <ul className="flex flex-col gap-2 font-sans text-[15px]">
              <li>— Aucun cookie de tracking publicitaire</li>
              <li>— Aucun cookie analytics (pas de Google Analytics)</li>
              <li>— Aucun cookie de session (pas de compte utilisateur)</li>
              <li>— Aucun partage de données avec des tiers</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Vos droits RGPD
            </h2>
            <p>
              Conformément au Règlement général sur la protection des
              données, vous pouvez à tout moment demander à consulter,
              rectifier, ou supprimer les informations que vous
              m&apos;avez envoyées via le formulaire de contact. Écrivez
              à{" "}
              <a
                href="mailto:toussenelj@gmail.com"
                className="underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep"
              >
                toussenelj@gmail.com
              </a>
              {" "}— la suppression est effective sous 72 heures.
            </p>
          </div>

          <div>
            <h2 className="font-display italic text-[1.4rem] text-ink mb-4">
              Polices Google Fonts
            </h2>
            <p>
              Les polices Instrument Serif et Instrument Sans sont
              chargées depuis Google Fonts. Google peut collecter votre
              adresse IP au moment du chargement (comportement standard
              des CDN). Je travaille à servir les polices en local
              quand le volume le justifiera.
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
