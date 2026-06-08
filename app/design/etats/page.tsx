import type { Metadata } from "next";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";
import { Button, ButtonLink } from "../../_lib/ui/Button";
import { SlideLink } from "../../_lib/ui/Link";
import { ThinFilet } from "../../_components/states/ThinFilet";
import { EmptyState } from "../../_components/states/EmptyState";

export const metadata: Metadata = {
  title: "États — Design",
  description:
    "404, 500, loading, empty. Chaque état est une page éditoriale — typographie pure, aligné gauche, aucune illustration, aucune excuse.",
};

type StateText = {
  state: string;
  title: string;
  body: string;
  cta: string;
};

const STATE_TEXTS: StateText[] = [
  { state: "404 — page inexistante", title: "Cette page n'existe pas — ou plus.", body: "Elle a peut-être changé d'adresse, peut-être disparu. Le sommaire est resté là.", cta: "Revenir au sommaire + Parcourir les projets" },
  { state: "500 — incident serveur", title: "Un incident côté serveur.", body: "Vous pouvez réessayer dans un instant, ou revenir au sommaire.", cta: "Réessayer + Revenir au sommaire + email direct" },
  { state: "403 — accès refusé", title: "Accès non autorisé.", body: "Cette ressource demande une authentification.", cta: "Se connecter + Revenir au sommaire" },
  { state: "Loading (≥400 ms)", title: "—", body: "Filet kaki 1 px, animation translateX 1.2 s. Aucun texte, silence.", cta: "—" },
  { state: "Empty — liste filtrée", title: "Rien sous ce filtre.", body: "(aucune description)", cta: "Retirer les filtres" },
  { state: "Empty — carnet", title: "Le carnet est vide pour l'instant.", body: "Les premières entrées arriveront au printemps.", cta: "(aucun)" },
  { state: "Empty — recherche", title: "Aucun résultat pour « terme ».", body: "Essayez un autre mot-clé, ou consultez le sommaire.", cta: "Voir le sommaire" },
  { state: "Offline (PWA futur)", title: "Vous êtes hors ligne.", body: "Certaines pages restent consultables en cache.", cta: "(aucun)" },
];

type Banned = {
  n: string;
  title: string;
  reason: string;
};

const BANNED_STATES: Banned[] = [
  { n: "01", title: "« Oups ! 😕 »", reason: "Ton SaaS friendly. Cliché. Contredit la voix infinitif sec déjà décidée." },
  { n: "02", title: "Grande illustration 404 (dino, astronaute, robot)", reason: "Pattern SaaS 2015-2020, daté. Aucun studio premium FR observé ne le fait." },
  { n: "03", title: "Compteur « retry in 5… »", reason: "Paraît cassé, stressant, inutile. Next 16 unstable_retry est manuel — mieux." },
  { n: "04", title: "« Vous n'avez pas de permission »", reason: "Ton accusatoire. On préfère « Accès non autorisé » — factuel." },
  { n: "05", title: "Spinner rotatif centré seul", reason: "Cliché web 2010. Aucune info de structure. Filet ou skeleton sont supérieurs." },
  { n: "06", title: "Confetti après un success", reason: "Infantilisant. Contraire au vouvoiement sec de la voix." },
  { n: "07", title: "« Our team has been notified »", reason: "Malhonnête pour un dev solo. Signal d'une boîte qui se cache." },
  { n: "08", title: "Lien « Home » tout seul sans contexte", reason: "Nom technique en anglais. Incohérent avec « Revenir au sommaire »." },
  { n: "09", title: "Stack trace visible en prod", reason: "Leak de sécurité. Next 16 masque déjà (error.message générique)." },
  { n: "10", title: "GIFs animés de chats", reason: "Humour de 2012. Casse l'autorité éditoriale du site." },
];

export default function Etats() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "États" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Le vide est un plan fixe.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            Chaque état <em className="italic text-surface">se tient</em>.
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            404, 500, loading, liste vide&nbsp;— traités comme des pages
            éditoriales à part entière. Glyphe Instrument Serif italique
            XL, texte aligné gauche, kaki sur toile. Aucune illustration,
            aucune excuse, aucun <em className="italic">« Oups »</em>.
            La maison n&apos;est pas en panne — elle attend simplement
            que vous reveniez sur vos pas.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Typographie pure</span>
            <span>Filet kaki 1 px au loading</span>
            <span>unstable_retry Next 16.2</span>
            <span>Zéro illustration</span>
          </div>
        </div>
      </section>

      {/* 01 — 404 DÉMO */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="01" label="404 — aperçu live" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            La page{" "}
            <code className="font-mono text-accent-deep">app/not-found.tsx</code>{" "}
            s&apos;active automatiquement pour toute URL non matchée, ou
            manuellement via{" "}
            <code className="font-mono text-accent-deep">
              notFound()
            </code>{" "}
            depuis une page. Essayez{" "}
            <SlideLink href="/page-inexistante">
              une URL qui n&apos;existe pas
            </SlideLink>
            .
          </p>

          <div className="border-t border-rule-strong pt-10">
            <div
              aria-hidden
              className="font-display italic text-accent-deep/40 text-[clamp(6rem,12vw,10rem)] leading-none mb-6"
            >
              404
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink max-w-[18ch] mb-6">
              Cette page{" "}
              <em className="italic text-surface">n&apos;existe pas</em>
              {" — ou plus."}
            </h2>
            <p className="font-display text-lead text-ink/75 max-w-[52ch] mb-8">
              Elle a peut-être changé d&apos;adresse, peut-être disparu
              tout simplement. Le sommaire est resté là.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/" trailingArrow>
                Revenir au sommaire
              </ButtonLink>
              <SlideLink href="/projets">Parcourir les projets</SlideLink>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — 500 DÉMO */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="500 — incident serveur" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            La page{" "}
            <code className="font-mono text-accent-deep">app/error.tsx</code>{" "}
            est un{" "}
            <em className="italic">error boundary</em> client qui reçoit
            l&apos;erreur + une fonction{" "}
            <code className="font-mono text-accent-deep">
              unstable_retry()
            </code>{" "}
            — nouvelle API Next&nbsp;16.2 qui re-fetch et re-render les
            children, sans recharger toute la page. Le{" "}
            <code className="font-mono text-accent-deep">error.digest</code>{" "}
            sert à corréler aux logs serveur si le client signale
            l&apos;incident.
          </p>

          <div className="border-t border-rule-strong pt-10">
            <div
              aria-hidden
              className="font-display italic text-accent-deep/40 text-[clamp(6rem,12vw,10rem)] leading-none mb-6"
            >
              500
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-tight text-ink max-w-[18ch] mb-6">
              Un <em className="italic text-surface">incident</em>{" "}
              côté serveur.
            </h2>
            <p className="font-display text-lead text-ink/75 max-w-[52ch] mb-8">
              Vous pouvez réessayer dans un instant, ou revenir au
              sommaire. Si l&apos;incident persiste, écrivez à{" "}
              <span className="underline underline-offset-[3px] decoration-1 decoration-ink/40">
                toussenelj@gmail.com
              </span>
              .
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button trailingArrow>Réessayer</Button>
              <SlideLink href="/">Revenir au sommaire</SlideLink>
            </div>
            <p className="mt-16 pt-6 border-t border-rule font-mono text-caption text-ink/50 max-w-[52ch]">
              Référence incident : <code>a7f3b2c</code>
            </p>
          </div>
        </div>
      </section>

      {/* 03 — LOADING */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Loading — filet kaki, pas skeleton" />
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Un rail <code className="font-mono text-accent-deep">
                  bg-ink/10
                </code>{" "}
                1&nbsp;px, une barre <code className="font-mono text-accent-deep">
                  accent-deep/60
                </code>{" "}
                qui traverse en 1.2&nbsp;s. Aucun spinner, aucun
                skeleton gris pour un composant isolé — c&apos;est un
                souffle discret, pas un point d&apos;arrêt.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch] mb-6">
                <strong>Seuil d&apos;affichage&nbsp;: 400 ms</strong>.
                Avant ça, silence. Au-delà, le filet apparaît. OneThing
                Design rappelle que 90&nbsp;% des utilisateurs attendent
                un feedback sous 50&nbsp;ms — mais afficher un loader
                sous 400&nbsp;ms flashe inutilement.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Avec{" "}
                <code className="font-mono text-accent-deep">
                  prefers-reduced-motion
                </code>
                , l&apos;animation se fige en filet pulsé statique.
              </p>
            </div>

            <div className="border-t border-rule-strong pt-10">
              <Eyebrow>En action</Eyebrow>
              <div className="mt-6 space-y-8">
                <div>
                  <p className="text-caption text-ink/60 mb-3">
                    Pleine largeur — avant un bloc qui se charge
                  </p>
                  <ThinFilet />
                </div>
                <div>
                  <p className="text-caption text-ink/60 mb-3">
                    Contraint — sous un titre de card
                  </p>
                  <div className="max-w-[240px]">
                    <ThinFilet />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-rule pt-6">
                <Eyebrow>Décision architecture Next.js</Eyebrow>
                <p className="text-caption text-ink/70 max-w-[42ch] mt-4">
                  <strong>Pas de{" "}
                    <code className="font-mono">app/loading.tsx</code>{" "}
                    racine</strong>
                  . Le site est quasi-statique — un loading global
                  flasherait entre deux pages pré-rendues. Création
                  ciblée dans les segments à données runtime
                  (admin, portail client plus tard).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — EMPTY STATES */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Empty states — aligné gauche, pas d'illustration" onSurface />
          <p className="text-body opacity-80 max-w-[58ch] mb-16">
            Trois cas : une liste filtrée qui renvoie rien, une section
            pas encore publiée, une recherche sans résultat. On traite
            chacun avec un titre sans ponctuation finale (convention
            Cloudscape), une description courte, un seul CTA au plus.
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12 border-t border-surface-foreground/25 pt-10">
            <div className="bg-bg text-ink p-8 min-h-[200px]">
              <EmptyState
                title="Rien sous ce filtre"
                description="Essayez une autre catégorie, ou retirez les filtres pour tout voir."
                action={
                  <SlideLink href="/projets">Retirer les filtres</SlideLink>
                }
                as="h3"
              />
            </div>
            <div className="bg-bg text-ink p-8 min-h-[200px]">
              <EmptyState
                title="Le carnet est vide pour l'instant"
                description="Les premières entrées arriveront au printemps."
                as="h3"
              />
            </div>
            <div className="bg-bg text-ink p-8 min-h-[200px]">
              <EmptyState
                title="Aucun résultat pour « instrument »"
                description="Essayez un autre mot-clé, ou consultez le sommaire."
                action={<SlideLink href="/">Voir le sommaire</SlideLink>}
                as="h3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 05 — TEXTES EXACTS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Textes exacts — par état" />
          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1.2fr_1.4fr_1.8fr_1.3fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>État</div>
              <div>Titre</div>
              <div>Corps</div>
              <div>CTA</div>
            </div>
            {STATE_TEXTS.map((s) => (
              <div
                key={s.state}
                className="grid md:grid-cols-[1.2fr_1.4fr_1.8fr_1.3fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] text-ink leading-tight">
                  {s.state}
                </div>
                <div className="font-display italic text-[1rem] text-surface leading-snug">
                  {s.title}
                </div>
                <div className="text-body text-ink/75 leading-snug">
                  {s.body}
                </div>
                <div className="font-sans text-caption text-ink/70">
                  {s.cta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — FICHIERS NEXT.JS */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Fichiers Next.js 16 retenus" />
          <div className="flex flex-col gap-10 max-w-[72rem] border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>app/not-found.tsx — 404 global</Eyebrow>
              <p className="text-body text-ink/75 max-w-[60ch] mt-4 mb-4">
                Server Component. Déclenché automatiquement pour toute
                URL non matchée, ou manuellement via{" "}
                <code className="font-mono text-accent-deep">
                  notFound()
                </code>
                . Conserve{" "}
                <code className="font-mono text-accent-deep">&lt;Header&gt;</code>{" "}
                et{" "}
                <code className="font-mono text-accent-deep">&lt;Footer&gt;</code>{" "}
                (on ne passe pas par{" "}
                <code className="font-mono text-accent-deep">
                  global-not-found.js
                </code>
                , expérimental et qui bypass le layout).
              </p>
            </div>

            <div className="border-t border-rule pt-6">
              <Eyebrow>app/error.tsx — error boundary root</Eyebrow>
              <p className="text-body text-ink/75 max-w-[60ch] mt-4 mb-4">
                <code className="font-mono text-accent-deep">
                  &apos;use client&apos;
                </code>{" "}
                obligatoire. Reçoit{" "}
                <code className="font-mono text-accent-deep">
                  {"{ error, unstable_retry }"}
                </code>{" "}
                — la nouvelle prop{" "}
                <code className="font-mono text-accent-deep">
                  unstable_retry
                </code>{" "}
                (Next 16.2) re-fetch et re-render les children de la
                boundary sans reload complet. L&apos;ancien{" "}
                <code className="font-mono text-accent-deep">reset</code>{" "}
                est déprécié.
              </p>
            </div>

            <div className="border-t border-rule pt-6">
              <Eyebrow>app/global-error.tsx — fallback layout crash</Eyebrow>
              <p className="text-body text-ink/75 max-w-[60ch] mt-4 mb-4">
                Doit contenir son propre{" "}
                <code className="font-mono text-accent-deep">
                  &lt;html&gt;&lt;body&gt;
                </code>{" "}
                — on n&apos;a ni Header, ni Footer, ni Lenis à ce
                niveau.{" "}
                <code className="font-mono text-accent-deep">
                  generateMetadata
                </code>{" "}
                n&apos;est pas supporté — on pose un{" "}
                <code className="font-mono text-accent-deep">
                  &lt;title&gt;
                </code>{" "}
                inline via React 19.
              </p>
            </div>

            <div className="border-t border-rule pt-6">
              <Eyebrow>app/loading.tsx — NE PAS créer</Eyebrow>
              <p className="text-body text-ink/75 max-w-[60ch] mt-4">
                Ne se déclenche que quand le segment{" "}
                <em className="italic">suspend</em>. Notre site étant
                quasi-statique (portfolio + carnet MDX), les pages
                sont pré-rendues et ne suspendent jamais — un{" "}
                <code className="font-mono text-accent-deep">
                  loading.tsx
                </code>{" "}
                racine ne s&apos;affichera jamais. Création ciblée
                dans les segments à données runtime (admin à venir).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — BANNIS */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="07" label="Dix patterns bannis" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Observés en tentant d&apos;accéder aux 404 de sites SaaS et
            premium. Chaque interdit vient d&apos;un pattern réel
            qu&apos;on refuse pour julestoussenel.com.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            {BANNED_STATES.map((b) => (
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
        prev={{ label: "Relire — Formulaires", href: "/design/formulaires" }}
        next={{ label: "Lire ensuite — Clair", href: "/design/clair" }}
      />
    </div>
  );
}
