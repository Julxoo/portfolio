import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";
import { Field } from "../../_lib/ui/form/Field";
import { Input } from "../../_lib/ui/form/Input";
import { Textarea } from "../../_lib/ui/form/Textarea";
import { Button } from "../../_lib/ui/Button";

export const metadata: Metadata = {
  title: "Formulaires — Design",
  description:
    "Border-b 1 px uniquement, label toujours visible, zéro astérisque rouge. Style fiche d'inscription musée. Stack Server Actions + zod + Resend.",
};

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_FORMS: Banned[] = [
  { n: "01", title: "Placeholder-as-label", reason: "WCAG 1.3.1 violé — le label disparaît à la saisie, contraste faible, screen readers incohérents." },
  { n: "02", title: "Astérisque rouge pour required", reason: "Tic SaaS. Couleur rouge casse la DA kaki/lin, signalisation par code couleur seule violée (WCAG 1.4.1)." },
  { n: "03", title: "Labels en UPPERCASE", reason: "Illisible pour dyslexiques. Anti-éditorial — aucun site éditorial observé (Kinfolk, Apartamento, Cabana) ne l'utilise." },
  { n: "04", title: "Erreur en rouge tomate", reason: "Rupture chromatique violente, anxiogène. Le kaki ink + trait vertical suffit (doubler la signalisation sans couleur pure)." },
  { n: "05", title: "reCAPTCHA v2 visible", reason: "Friction (« cliquez sur les bus »), RGPD douteux (Google tracking). Honeypot invisible suffit, Turnstile en plan B." },
  { n: "06", title: "Confetti / 🎉 au succès", reason: "Infantilisant. Non cohérent avec voix « Message reçu. Une réponse sous deux jours. »" },
  { n: "07", title: "Form multi-step avec progress bar", reason: "Pattern Stripe B2B, inapproprié pour 5 champs. Crée une friction perçue (« combien d'étapes ? »)." },
  { n: "08", title: "« Congratulations! » / points d'exclamation", reason: "Zéro emoji, zéro « ! » — décidé dans voix. Pattern startup 2015, daté." },
  { n: "09", title: "Toast coin haut-droite après envoi", reason: "Invisible sur mobile, disparaît trop vite, non cohérent avec mise en page éditoriale. Remplacement in-place supérieur." },
  { n: "10", title: "Save draft automatique (localStorage)", reason: "Tic SaaS, anxiogène (« qui va voir mon brouillon ? »). Inutile pour un form qu'on remplit en 2 minutes." },
];

type Spec = {
  param: string;
  value: string;
};

const SPECS: Spec[] = [
  { param: "Largeur form", value: "max-width 560 px" },
  { param: "Colonnes", value: "1 (toujours, desktop + mobile)" },
  { param: "Gap vertical entre champs", value: "32 px" },
  { param: "Gap avant bouton submit", value: "48 px" },
  { param: "Label", value: "Instrument Serif 14 px, ink pur" },
  { param: "Mention facultatif", value: "Instrument Sans 13 px, ink/50, après label" },
  { param: "Input / textarea text", value: "Instrument Sans 16 px (pas de zoom iOS), ink pur" },
  { param: "Placeholder", value: "Instrument Sans 16 px, ink/30" },
  { param: "Border default", value: "border-bottom 1 px solid ink/30" },
  { param: "Border focus", value: "border-bottom 2 px solid accent-deep" },
  { param: "Border invalid", value: "border-bottom 1 px accent-deep + trait vertical dans FieldError" },
  { param: "Padding vertical input", value: "12 px (py-3)" },
  { param: "Padding horizontal input", value: "0 — toute la largeur du bloc" },
  { param: "Hauteur input", value: "~48 px (respect WCAG 2.2 tap target)" },
  { param: "Textarea auto-resize", value: "field-sizing: content (support fin 2026)" },
  { param: "Transition", value: "border-color 180 ms ease-out-quint" },
  { param: "Submit", value: "<Button variant=primary>Envoyer</Button>, right-aligned desktop, full-width mobile" },
];

type StackItem = {
  layer: string;
  choice: string;
  why: string;
};

const STACK: StackItem[] = [
  { layer: "Transport", choice: "Server Actions Next.js 16", why: "Progressive enhancement natif (le form marche sans JS), types partagés client/serveur." },
  { layer: "Validation", choice: "zod safeParse côté serveur", why: "Single source of truth, erreurs structurées, types inférés pour UI." },
  { layer: "State client", choice: "useActionState (React 19)", why: "Hook officiel, gère pending + errors retournés, compatible SSR." },
  { layer: "Contrôle", choice: "Uncontrolled FormData natif", why: "Pas de React Hook Form pour 5 champs — évite +25 kB de bundle." },
  { layer: "Anti-spam 1", choice: "Honeypot invisible (input sr-only)", why: "Stoppe 80 % des bots basiques, zéro friction utilisateur." },
  { layer: "Anti-spam 2", choice: "Rate limit Upstash (3 / IP / heure)", why: "Simple, gratuit, stoppe les loops." },
  { layer: "Anti-spam 3", choice: "Cloudflare Turnstile (plan B)", why: "Invisible, activé uniquement si spam constaté en production." },
  { layer: "Envoi email", choice: "Resend + React Email", why: "Templates JSX, free tier 3000/mois largement suffisant pour un solo." },
  { layer: "Persistance", choice: "Aucune — inbox = DB", why: "Volume attendu < 20/mois. Postgres/Neon plus tard si besoin analytique." },
  { layer: "Feedback", choice: "Remplacement in-place du form", why: "Pas de redirect vers /merci (rupture narrative, SEO bruit). Pas de toast (tic SaaS)." },
];

export default function Formulaires() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Formulaires" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Une fiche d&apos;inscription, pas un form sales.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Remplie <em className="italic text-surface">avec soin</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Entre Van Duysen (pas de form, juste un email) et Yovanovitch
            (sept champs tous requis), on se place au milieu. Un
            formulaire minimal tenu, qui aide les clients non-tech à
            écrire sans friction de qualification B2B. Border-b 1&nbsp;px
            uniquement, label toujours visible, zéro astérisque rouge, zéro
            « Congratulations! 🎉 ».
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>5 champs max</span>
            <span>1 colonne · 560 px</span>
            <span>border-b 1 px uniquement</span>
            <span>Server Actions + zod</span>
          </div>
        </div>
      </section>

      {/* 01 — FORMULAIRE COMPLET EN DÉMO */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="Formulaire /contact — démo complète" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Le formulaire type, prêt à être posé sur{" "}
            <code className="font-mono text-accent-deep">/contact</code>.
            Non fonctionnel ici (pas encore branché à Resend) — cliquez{" "}
            <em className="italic">Envoyer</em> pour voir le focus-state,
            les champs invalides apparaissent en démo plus bas.
          </p>

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

            {/* Honeypot — invisible, stoppe les bots basiques. */}
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
        </div>
      </section>

      {/* 02 — ÉTATS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="États — default, focus, invalid, disabled" />
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="flex flex-col gap-8">
              <Field id="demo-default" label="Default">
                <Input
                  id="demo-default"
                  name="demo-default"
                  placeholder="prénom@maison.fr"
                />
              </Field>
              <Field id="demo-optional" label="Default" optional>
                <Input
                  id="demo-optional"
                  name="demo-optional"
                  placeholder="Lenoir & Associés"
                />
              </Field>
              <Field
                id="demo-invalid"
                label="Invalid"
                error="Ce champ attend une adresse email."
              >
                <Input
                  id="demo-invalid"
                  name="demo-invalid"
                  invalid
                  defaultValue="pas-un-email"
                  placeholder="prénom@maison.fr"
                />
              </Field>
              <Field id="demo-disabled" label="Disabled">
                <Input
                  id="demo-disabled"
                  name="demo-disabled"
                  disabled
                  defaultValue="lecture seule"
                />
              </Field>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <Eyebrow>Erreur — signalisation doublée</Eyebrow>
                <p className="text-body text-ink/75 max-w-[42ch] mt-4">
                  Couleur <code className="font-mono text-accent-deep">ink</code>{" "}
                  pur (pas rouge tomate), plus un{" "}
                  <em className="italic">trait vertical</em>{" "}
                  <code className="font-mono text-accent-deep">
                    accent-deep
                  </code>{" "}
                  1&nbsp;px à gauche. Respecte WCAG 1.4.1 — on ne repose pas
                  sur la couleur seule pour indiquer l&apos;erreur.
                </p>
              </div>
              <div className="border-t border-rule pt-6">
                <Eyebrow>Timing de validation</Eyebrow>
                <ul className="flex flex-col gap-2 mt-4 text-body text-ink/75">
                  <li>
                    <strong>onBlur</strong> — erreurs de format (email
                    invalide) dès que l&apos;utilisateur quitte le champ
                  </li>
                  <li>
                    <strong>onSubmit</strong> — erreurs de champ vide,
                    affichées après clic Envoyer
                  </li>
                  <li>
                    <strong>Jamais onChange</strong> — anxiogène, distrait
                    la saisie
                  </li>
                </ul>
              </div>
              <div className="border-t border-rule pt-6">
                <Eyebrow>Focus programmatique</Eyebrow>
                <p className="text-body text-ink/75 max-w-[42ch] mt-4">
                  Après soumission avec erreurs, le focus passe
                  automatiquement sur le{" "}
                  <em className="italic">premier champ invalide</em>. WCAG
                  3.3.1 + 3.3.3.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — SUCCESS BLOCK */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Après l'envoi — remplacement in-place" />
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Pas de redirection vers{" "}
                <code className="font-mono text-accent-deep">
                  /contact/merci
                </code>{" "}
                (rupture narrative, bruit SEO). Pas de toast coin
                haut-droite (invisible mobile, tic SaaS). Le formulaire se
                remplace in-place par un bloc message à la même largeur.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Toujours une{" "}
                <em className="italic">escape hatch email direct</em> —
                si le serveur fait défaut, le client a le moyen de
                nous joindre autrement.
              </p>
            </div>

            <div className="max-w-[560px] border-t border-rule-strong pt-10">
              <h3 className="font-display text-[clamp(1.6rem,3vw,2rem)] leading-tight text-ink mb-4">
                Message reçu.
              </h3>
              <p className="font-sans text-[16px] text-ink/85 mb-6">
                Une réponse sous deux jours.
              </p>
              <p className="font-sans text-[14px] text-ink/65 max-w-[42ch]">
                Si rien n&apos;arrive, écrivez-moi directement à{" "}
                <span className="underline underline-offset-[3px] decoration-1 decoration-ink/40">
                  toussenelj@gmail.com
                </span>
                .
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-rule-strong pt-10 max-w-[560px]">
            <Eyebrow>Cas d&apos;échec serveur</Eyebrow>
            <div className="mt-6 py-4 pl-4 border-l border-accent-deep">
              <p className="font-sans text-[14px] text-ink/85 max-w-[48ch]">
                Le message n&apos;a pas pu être envoyé. Réessayez dans un
                instant, ou écrivez directement à{" "}
                <span className="underline underline-offset-[3px] decoration-1 decoration-ink/40">
                  toussenelj@gmail.com
                </span>
                .
              </p>
            </div>
            <p className="text-caption text-ink/60 mt-4 max-w-[48ch]">
              Bandeau sobre au-dessus du formulaire qui reste affiché — le
              client ne perd pas sa saisie.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — SPÉCIFICATIONS */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Spécifications" onSurface />
          <div className="flex flex-col border-t border-surface-foreground/25">
            {SPECS.map((s) => (
              <div
                key={s.param}
                className="grid md:grid-cols-[14rem_1fr] gap-6 py-4 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem]">
                  {s.param}
                </div>
                <div className="text-body opacity-80 font-mono text-caption">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — STACK TECHNIQUE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Stack technique — Server Actions + zod + Resend" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Pas de React Hook Form (overkill pour 5 champs, +25 kB de
            bundle). Pas de reCAPTCHA (friction, RGPD douteux). Le stack
            retenu tient sur une page, progressive enhancement natif —
            le form fonctionne même sans JavaScript.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1fr_1.3fr_2fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Couche</div>
              <div>Choix</div>
              <div>Raison</div>
            </div>
            {STACK.map((s) => (
              <div
                key={s.layer}
                className="grid md:grid-cols-[1fr_1.3fr_2fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.1rem] text-ink">
                  {s.layer}
                </div>
                <div className="text-body text-ink/85 font-mono text-caption">
                  {s.choice}
                </div>
                <div className="text-body text-ink/75">{s.why}</div>
              </div>
            ))}
          </div>

          <p className="text-caption text-ink/60 mt-12 max-w-[58ch]">
            Ces libs seront installées quand on créera vraiment la page{" "}
            <code className="font-mono text-accent-deep">/contact</code>{" "}
            (tâche de contenu, pas design). Les composants de form
            ci-dessus sont déjà prêts à recevoir la Server Action —{" "}
            <code className="font-mono text-accent-deep">{"<Input/>"}</code>
            ,{" "}
            <code className="font-mono text-accent-deep">{"<Textarea/>"}</code>
            ,{" "}
            <code className="font-mono text-accent-deep">
              {"<Field/>"}
            </code>{" "}
            et{" "}
            <code className="font-mono text-accent-deep">
              {"<SubmitButton/>"}
            </code>{" "}
            (avec{" "}
            <code className="font-mono text-accent-deep">
              useFormStatus
            </code>
            ).
          </p>
        </div>
      </section>

      {/* 06 — BANNIS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Observés en visitant concrètement Stripe, Vercel, Linear,
            Ressource Peintures. Chaque ligne décrit un pattern qui existe
            sur ces sites et qu&apos;on refuse pour julestoussenel.com.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_FORMS.map((b) => (
              <div
                key={b.n}
                className="grid md:grid-cols-[60px_1.2fr_1.8fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="text-eyebrow uppercase text-ink/65">{b.n}</div>
                <div className="font-display italic text-[1.15rem] text-ink leading-snug">
                  {b.title}
                </div>
                <div className="text-body text-ink/75">{b.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Footer", href: "/design/footer" }}
        next={{ label: "Lire ensuite — États", href: "/design/etats" }}
      />
    </div>
  );
}
