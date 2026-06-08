import type { Metadata } from "next";
import { Field } from "../_lib/ui/form/Field";
import { Input } from "../_lib/ui/form/Input";
import { Textarea } from "../_lib/ui/form/Textarea";
import { Button } from "../_lib/ui/Button";
import { EmailLink } from "../_components/EmailLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Un mot sur votre projet, votre structure, votre échéance. Une réponse sous deux jours ouvrés.",
};

export default function Contact() {
  return (
    <div className="flex-1 bg-bg text-ink">
      <section className="px-gutter pt-section-lg pb-section-md">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Un mot, une réponse sous deux jours.
          </p>
          <h1 className="font-display text-display text-ink max-w-[14ch] mb-10">
            Écrire.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch]">
            Un mot sur votre projet, votre structure, votre échéance.
            Une réponse sous deux jours ouvrés. Les premiers échanges se
            font par écrit — si on doit se parler, on prendra un appel
            ensuite.
          </p>
        </div>
      </section>

      <section className="px-gutter pb-section-xl">
        <div className="max-w-default mx-auto grid md:grid-cols-[1.4fr_1fr] gap-16 md:gap-24 items-start">
          {/*
            Form /contact — composants prêts, Server Action à brancher
            quand on installe resend + zod (voir /design/formulaires).
            L'attribut name= est posé pour que FormData fonctionne
            dès le câblage de l'action.
          */}
          <form className="flex flex-col gap-8 max-w-[560px]">
            <Field id="nom" label="Nom complet">
              <Input
                id="nom"
                name="nom"
                type="text"
                required
                placeholder="Marie Lenoir"
                autoComplete="name"
              />
            </Field>

            <Field id="email" label="Email">
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="prénom@maison.fr"
                autoComplete="email"
              />
            </Field>

            <Field id="entreprise" label="Entreprise" optional>
              <Input
                id="entreprise"
                name="entreprise"
                type="text"
                placeholder="Lenoir & Associés"
                autoComplete="organization"
              />
            </Field>

            <Field id="projet" label="Projet" optional>
              <Input
                id="projet"
                name="projet"
                type="text"
                placeholder="Site vitrine pour cabinet d'architecture"
              />
            </Field>

            <Field
              id="message"
              label="Message"
              hint="Un mot sur votre structure, votre échéance, ce qui vous amène."
            >
              <Textarea id="message" name="message" rows={5} required />
            </Field>

            {/* Honeypot anti-bot — invisible aux humains. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="mt-4 flex">
              <Button
                type="submit"
                trailingArrow
                className="w-full md:w-auto md:ml-auto"
              >
                Envoyer
              </Button>
            </div>
          </form>

          <aside className="flex flex-col gap-10 border-t md:border-t-0 md:border-l border-rule md:pl-10 pt-8 md:pt-0">
            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-4">
                Écrire directement
              </div>
              <div className="font-sans text-[15px]">
                <EmailLink />
              </div>
              <p className="text-caption text-ink/65 mt-3 max-w-[32ch]">
                Un email arrive toujours — je n&apos;utilise pas de
                système de tickets ni de chatbot.
              </p>
            </div>

            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-4">
                Délai de réponse
              </div>
              <p className="font-sans text-[15px] text-ink/85 leading-relaxed max-w-[32ch]">
                Deux jours ouvrés. Si rien n&apos;arrive au troisième
                jour, vérifiez vos spams — ou renvoyez, c&apos;est sans
                doute un souci de serveur côté moi.
              </p>
            </div>

            <div>
              <div className="text-eyebrow uppercase text-ink/60 mb-4">
                Disponibilité
              </div>
              <p className="font-sans text-[15px] text-ink/85 leading-relaxed max-w-[32ch]">
                Prochaine plage disponible&nbsp;: automne 2026. Les
                projets urgents (&lt; 4 semaines) sont rarement pris
                sauf exception.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
