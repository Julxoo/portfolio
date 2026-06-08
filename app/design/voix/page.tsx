import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  ChapterFooter,
  Eyebrow,
  SectionHead,
} from "../_components";

export const metadata: Metadata = {
  title: "Voix — Design",
  description:
    "Écrire comme on dessine un plan — à la règle, au calme, sans effets. Vouvoiement, « je », phrases courtes, zéro formule marketing. Fondée sur l'observation réelle des maisons FR premium.",
};

type Quote = {
  source: string;
  url: string;
  extract: string;
  note: string;
};

const REAL_VOICES: Quote[] = [
  {
    source: "Ressource Peintures",
    url: "https://www.ressource-peintures.com",
    extract:
      "Héritière d'un savoir-faire familial né en Provence il y a 80 ans, Ressource en perpétue l'exigence, entre héritage et création contemporaine.",
    note:
      "Triptyque rythmique en virgules, vouvoiement implicite, champ lexical du métier et de l'héritage. Aucun adjectif creux. Phrase unique, trois respirations.",
  },
  {
    source: "Hôtel de Buci",
    url: "https://www.buci-hotel.com",
    extract:
      "À l'hôtel de Buci on se retrouve : soi-même, à deux ou avec ses proches, dans le calme chaud d'un hôtel qui se découvre comme un appartement parisien.",
    note:
      "« On » affectif (pas de majesté), rythme ternaire, image concrète (« appartement parisien »). La chaleur vient du détail juste, jamais d'un point d'exclamation.",
  },
  {
    source: "Pierre Yovanovitch",
    url: "https://pierreyovanovitch.com",
    extract:
      "Pierre Yovanovitch fonde son agence en 2001, après une première carrière dans la mode auprès de Pierre Cardin.",
    note:
      "Biographie à la troisième personne, faits datés, lieux, pas d'adjectif. L'autorité naît de la retenue descriptive — pas de « passionné par », pas de « visionnaire ».",
  },
];

type Banned = {
  formule: string;
  realSource: string;
  replacement: string;
};

const BANNED: Banned[] = [
  { formule: "« tout-en-un »", realSource: "Qonto", replacement: "« qui réunit » — ou rien" },
  { formule: "« Place à la simplicité »", realSource: "Qonto", replacement: "« Simple, sans plus. »" },
  { formule: "« Gérez toutes vos finances »", realSource: "Pennylane, Qonto", replacement: "supprimer, préférer le constat factuel" },
  { formule: "« Gagnez en efficacité, simplifiez-vous le quotidien »", realSource: "Pennylane", replacement: "« Moins d'étapes, plus de calme. »" },
  { formule: "« divisez par trois le temps »", realSource: "Pennylane", replacement: "aucun chiffre marketing — jamais" },
  { formule: "« boosté à l'IA »", realSource: "Sumeria", replacement: "bannir l'IA comme argument de vente" },
  { formule: "« Ne cherchez plus »", realSource: "Sumeria", replacement: "« Voici. » — ou omettre" },
  { formule: "« Tout ce dont vous avez besoin »", realSource: "Sumeria", replacement: "« L'essentiel. »" },
  { formule: "« solution clé en main »", realSource: "topos SaaS", replacement: "« un site fini, pas un chantier »" },
  { formule: "« expérience utilisateur »", realSource: "topos SaaS", replacement: "« lecture », « usage », « manière de s'en servir »" },
  { formule: "« accompagnement sur-mesure »", realSource: "topos agence", replacement: "« un projet à deux » — ou omettre" },
  { formule: "« passionné(e) par »", realSource: "topos freelance", replacement: "jamais — on montre par les faits, on ne dit pas" },
  { formule: "« transformer votre entreprise »", realSource: "topos SaaS", replacement: "« votre site, refait »" },
  { formule: "« libérer votre potentiel »", realSource: "topos coaching", replacement: "jamais" },
  { formule: "« Démarrez maintenant », « dès maintenant »", realSource: "Pennylane, Shine", replacement: "« Commencer » — infinitif sec" },
];

type CtaRow = {
  label: string;
  observedOn: string;
  kept: boolean;
};

const CTA_OBSERVED: CtaRow[] = [
  { label: "Découvrir", observedOn: "Ressource, Buci", kept: true },
  { label: "Voir le projet", observedOn: "variations observées", kept: true },
  { label: "Lire", observedOn: "magazines éditoriaux", kept: true },
  { label: "Prendre rendez-vous", observedOn: "Ressource", kept: true },
  { label: "Écrire", observedOn: "adaptation freelance", kept: true },
  { label: "Revenir", observedOn: "navigation éditoriale", kept: true },
  { label: "OUVRIR UN COMPTE", observedOn: "Qonto, Sumeria, Shine", kept: false },
  { label: "Démarrer mon inscription", observedOn: "Shine", kept: false },
  { label: "Ouvrir mon compte", observedOn: "Sumeria", kept: false },
  { label: "Me connecter", observedOn: "Sumeria", kept: false },
  { label: "Comment en profiter", observedOn: "Sumeria", kept: false },
  { label: "Parler à notre équipe", observedOn: "Shine", kept: false },
];

type TypoRule = {
  signe: string;
  regle: string;
  exemple: string;
};

const TYPO_RULES: TypoRule[] = [
  { signe: "Guillemets", regle: "« … » français uniquement, avec espace fine insécable intérieure", exemple: "« Pinède sur toile »" },
  { signe: "Apostrophe", regle: "Typographique ’ partout, jamais droite '", exemple: "l’atelier, d’abord" },
  { signe: "Avant ; : ! ? »", regle: "Espace fine insécable (U+202F)", exemple: "Il écrit : calmement." },
  { signe: "Après «", regle: "Espace fine insécable", exemple: "« bonjour »" },
  { signe: "Cadratin —", regle: "Incises, respirations — entouré d'espaces normales en FR", exemple: "le filet — celui de 1 px — tient." },
  { signe: "Majuscules accentuées", regle: "Toujours (À, É, Ê, Ç, Ù)", exemple: "À propos" },
  { signe: "Chiffres en lettres", regle: "Jusqu'à neuf en prose ; chiffres pour dates, prix, mesures", exemple: "trois projets, 12 mois, 1 px" },
  { signe: "Capitalisation des titres", regle: "Pas de capitalisation à l'anglaise — uniquement la première lettre", exemple: "« Les projets récents », pas « Les Projets Récents »" },
  { signe: "Point d'exclamation", regle: "Banni en prose éditoriale", exemple: "— aucun exemple" },
  { signe: "Emoji", regle: "Bannis partout — sur les pages, dans les erreurs, nulle part", exemple: "— aucun exemple" },
];

type MicroText = {
  moment: string;
  write: string;
};

const MICRO_TEXTS: MicroText[] = [
  {
    moment: "404 — page inexistante",
    write:
      "« Cette page n'existe pas — ou plus. Revenir au sommaire. »",
  },
  {
    moment: "Formulaire envoyé",
    write: "« Message reçu. Une réponse sous deux jours. »",
  },
  {
    moment: "Adresse email confirmée",
    write: "« Adresse confirmée. »",
  },
  {
    moment: "Placeholder champ email",
    write: "« prénom@maison.fr » — jamais « votre@email.com »",
  },
  {
    moment: "Erreur de validation",
    write: "« Ce champ attend une adresse email. » — descriptif, pas « Oups ! »",
  },
  {
    moment: "Chargement",
    write: "Silence + filet animé discret — pas de « Patientez… »",
  },
  {
    moment: "État vide (liste filtrée)",
    write: "« Rien sous ce filtre. Revenir au sommaire. »",
  },
];

function QuoteCard({ q }: { q: Quote }) {
  return (
    <article className="flex flex-col border-t border-rule-strong pt-6">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <Eyebrow>{q.source}</Eyebrow>
        <Link
          href={q.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-caption text-ink/65 hover:text-accent-deep transition-colors"
        >
          {q.url.replace(/^https?:\/\//, "")}
        </Link>
      </div>
      <blockquote className="font-display italic text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.25] text-surface mb-6">
        « {q.extract} »
      </blockquote>
      <p className="text-body text-ink/75 max-w-[58ch]">{q.note}</p>
    </article>
  );
}

export default function Voix() {
  return (
    <div className="flex-1 bg-bg text-ink">
      {/* Breadcrumb */}
      <section className="px-gutter pt-section-lg pb-10">
        <div className="max-w-default mx-auto">
          <Breadcrumb
            items={[
              { label: "Design", href: "/design" },
              { label: "Voix" },
            ]}
          />
        </div>
      </section>

      {/* HERO */}
      <section className="px-gutter pb-section-lg">
        <div className="max-w-default mx-auto">
          <p className="font-display italic text-lead text-surface mb-6">
            Écrire comme on dessine un plan.
          </p>
          <h1 className="font-display text-display text-ink max-w-[16ch] mb-10">
            À la règle, <em className="italic text-surface">au calme.</em>
          </h1>
          <p className="font-display text-lead text-ink/85 max-w-[58ch] mb-8">
            Une voix qui s&apos;adresse à une cliente qui choisit un carreau de
            ciment, pas à un CTO qui compare des stacks. Jamais marketing,
            jamais gourou, jamais &laquo;&nbsp;fun&nbsp;&raquo; — précise,
            posée, et qui tient debout sans adverbes. Si la phrase a besoin
            d&apos;un bouton orange ou d&apos;un émoji pour fonctionner, elle
            est fausse.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-caption text-accent-deep tracking-[0.06em]">
            <span>Vouvoiement absolu</span>
            <span>&laquo;&nbsp;je&nbsp;&raquo; assumé, rare</span>
            <span>Phrases courtes, virgules rythmiques</span>
            <span>Zéro point d&apos;exclamation</span>
          </div>
        </div>
      </section>

      {/* 01 — TROIS VOIX OBSERVÉES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead
            n="01"
            label="Trois voix françaises — observées, pas imaginées"
          />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 mb-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                On a regardé — vraiment regardé, page par page — comment
                parlent les maisons FR premium. Surprise : Studio KO, Joseph
                Dirand, Vincent Van Duysen, Festen ne publient{" "}
                <em className="italic">quasiment aucune prose</em>. Juste des
                menus et des noms de projets. Le silence est leur posture.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Trois maisons font exception, et c&apos;est sur elles qu&apos;on
                s&apos;appuie : Ressource Peintures (la couleur qui raconte),
                l&apos;Hôtel de Buci (le refuge parisien), Pierre Yovanovitch
                (la biographie tierce institutionnelle).
              </p>
            </div>
            <div className="flex flex-col gap-12">
              {REAL_VOICES.map((q) => (
                <QuoteCard key={q.source} q={q} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — LES RÈGLES DE LA VOIX */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="02" label="Vouvoiement, « je », triptyques" />
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <Eyebrow>Vouvoiement absolu</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                Le tutoiement B2B = marqueur néobanque pour jeunes actifs
                (Sumeria). Pour des clients PME, artisans, restaurateurs,
                architectes — c&apos;est le vouvoiement sans exception.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Qonto vouvoie. Ressource vouvoie. Buci, Yovanovitch : aucune
                familiarité jamais.
              </p>
            </div>
            <div>
              <Eyebrow>« Je » assumé, rare</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                Jules est seul. Le « nous » de majesté est mensonger,
                l&apos;impersonnel gomme la signature. Donc &laquo;&nbsp;je&nbsp;&raquo;
                — en 1<sup>re</sup> personne dans l&apos;intime (À propos,
                Méthode, Contact), en 3<sup>e</sup> sur la home et les balises
                SEO.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Modèle mesuré : Yovanovitch. Modèle assumé : Apartamento.
              </p>
            </div>
            <div>
              <Eyebrow>Triptyques rythmiques</Eyebrow>
              <p className="text-body text-ink/80 max-w-[36ch] mt-4 mb-4">
                Énumérations à trois éléments en virgules. Phrase principale au
                présent, propositions subordonnées courtes. Jamais plus de 25
                mots d&apos;une traite.
              </p>
              <p className="text-caption text-ink/60 max-w-[36ch]">
                Listes à puces bannies en prose éditoriale — remplacées par
                phrases numérotées ou chapitres courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — TROIS TERRITOIRES */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="03" label="Trois territoires lexicaux — pas plus" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Une métaphore par paragraphe maximum. Les champs lexicaux qu&apos;on
            entretient sont{" "}
            <em className="italic">peinture, architecture, livre</em> — parce
            qu&apos;ils dialoguent naturellement avec notre DA et notre métier.
            On n&apos;ouvre surtout pas d&apos;autres territoires.
          </p>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 border-t border-rule-strong pt-10">
            <div>
              <Eyebrow>Peinture, dessin</Eyebrow>
              <p className="font-display italic text-[1.4rem] leading-tight text-surface mt-4 mb-4">
                toile, lin, règle, pinceau, teinte, filet, trait, tracé
              </p>
              <p className="text-caption text-ink/70 max-w-[36ch]">
                Référence directe à notre DA &laquo;&nbsp;Pinède sur
                toile&nbsp;&raquo;. La couleur raconte, le trait pose.
              </p>
            </div>
            <div>
              <Eyebrow>Architecture</Eyebrow>
              <p className="font-display italic text-[1.4rem] leading-tight text-surface mt-4 mb-4">
                ossature, cloison, plan, élévation, seuil, linteau, plein, vide
              </p>
              <p className="text-caption text-ink/70 max-w-[36ch]">
                La page est un bâtiment. La grille est son plan. Le blanc
                structure autant que le trait.
              </p>
            </div>
            <div>
              <Eyebrow>Livre</Eyebrow>
              <p className="font-display italic text-[1.4rem] leading-tight text-surface mt-4 mb-4">
                chapitre, page, marge, mesure, interligne, couverture, sommaire
              </p>
              <p className="text-caption text-ink/70 max-w-[36ch]">
                Le site se lit comme un ouvrage relié — d&apos;où le chapitrage
                latin et le folio, signatures système visibles partout.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-rule-strong pt-10 grid md:grid-cols-2 gap-10">
            <div>
              <Eyebrow>À ne pas ouvrir</Eyebrow>
              <p className="text-body text-ink/75 max-w-[42ch] mt-4">
                <strong>Culinaire</strong> — risque Top Chef.{" "}
                <strong>Musical</strong> — risque prétention{" "}
                (&laquo;&nbsp;l&apos;harmonie typographique&nbsp;&raquo;).{" "}
                <strong>Botanique méditerranéen</strong> — saturé par Jacquemus
                et Sézane. On tient trois territoires, on les entretient.
              </p>
            </div>
            <div>
              <Eyebrow>Règle d&apos;usage</Eyebrow>
              <p className="text-body text-ink/75 max-w-[42ch] mt-4">
                Une image rhétorique par paragraphe — maximum. Plusieurs,
                c&apos;est de la parure. Et la parure, c&apos;est l&apos;inverse
                de la rigueur qu&apos;on défend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — FORMULES BANNIES */}
      <section className="px-gutter py-section-md bg-surface text-surface-foreground">
        <div className="max-w-default mx-auto">
          <SectionHead n="04" label="Quinze formules bannies — observées sur SaaS FR" onSurface />
          <p className="text-body opacity-80 max-w-[58ch] mb-16">
            Recensées en visitant concrètement Qonto, Shine, Pennylane,
            Sumeria. Chaque ligne est une phrase qui existe{" "}
            <em className="italic">vraiment</em> sur un site SaaS français en
            2026 — et qu&apos;on ne veut{" "}
            <em className="italic">jamais</em> voir sur julestoussenel.com.
          </p>

          <div className="flex flex-col border-t border-surface-foreground/25">
            <div className="hidden md:grid md:grid-cols-[1.4fr_1fr_1.6fr] gap-6 py-4 border-b border-surface-foreground/15 text-eyebrow uppercase opacity-55">
              <div>Formule bannie</div>
              <div>Source réelle</div>
              <div>Remplacement</div>
            </div>
            {BANNED.map((b) => (
              <div
                key={b.formule}
                className="grid md:grid-cols-[1.4fr_1fr_1.6fr] gap-6 py-5 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.05rem] leading-snug">
                  {b.formule}
                </div>
                <div className="text-caption opacity-65">{b.realSource}</div>
                <div className="text-body opacity-85">{b.replacement}</div>
              </div>
            ))}
          </div>

          {/* CTA tableau */}
          <div className="mt-20">
            <Eyebrow>
              <span className="text-accent-warm">
                CTA réellement observés — retenus et rejetés
              </span>
            </Eyebrow>
            <p className="text-body opacity-75 max-w-[58ch] mt-4 mb-10">
              Jules retient l&apos;infinitif sec haut de gamme. Jamais de
              capitales SaaS (&laquo;&nbsp;OUVRIR UN COMPTE&nbsp;&raquo;),
              jamais d&apos;impératif tutoyé, jamais de point d&apos;exclamation.
            </p>
            <div className="flex flex-col border-t border-surface-foreground/25">
              {CTA_OBSERVED.map((c) => (
                <div
                  key={c.label}
                  className="grid md:grid-cols-[2fr_1.5fr_80px] gap-6 py-4 border-b border-surface-foreground/15 last:border-b-0 items-baseline"
                >
                  <div
                    className={`font-display ${
                      c.kept
                        ? "italic text-[1.15rem]"
                        : "text-[1rem] line-through decoration-[0.5px] opacity-55"
                    }`}
                  >
                    {c.label}
                  </div>
                  <div className="text-caption opacity-60">{c.observedOn}</div>
                  <div
                    className={`text-eyebrow uppercase ${
                      c.kept ? "text-accent-warm" : "opacity-45"
                    }`}
                  >
                    {c.kept ? "Retenu" : "Rejeté"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — TYPOGRAPHIE FRANÇAISE */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto">
          <SectionHead n="05" label="Typographie française — non négociable" />
          <p className="text-body text-ink/80 max-w-[58ch] mb-16">
            Règles issues du{" "}
            <em className="italic">
              Lexique des règles typographiques en usage à l&apos;Imprimerie
              nationale
            </em>{" "}
            et des conventions CNRS. Le FR n&apos;est pas l&apos;EN — guillemets
            différents, espaces insécables avant la ponctuation double,
            apostrophe courbe, majuscules accentuées obligatoires. Ces règles
            ne sont pas du style, elles sont le socle.
          </p>

          <div className="flex flex-col border-t border-rule-strong">
            <div className="hidden md:grid md:grid-cols-[1fr_2fr_1.3fr] gap-6 py-4 border-b border-rule text-eyebrow uppercase text-ink/65">
              <div>Signe</div>
              <div>Règle</div>
              <div>Exemple</div>
            </div>
            {TYPO_RULES.map((r) => (
              <div
                key={r.signe}
                className="grid md:grid-cols-[1fr_2fr_1.3fr] gap-6 py-5 border-b border-rule last:border-b-0 items-baseline"
              >
                <div className="font-display italic text-[1.1rem] text-ink">
                  {r.signe}
                </div>
                <div className="text-body text-ink/75">{r.regle}</div>
                <div className="font-display italic text-[1.05rem] text-surface">
                  {r.exemple}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Eyebrow>Sources</Eyebrow>
            <ul className="flex flex-col gap-2 mt-4">
              <li>
                <Link
                  href="https://mardi-inspi.fr/lexique-des-regles-typographiques-en-usage-a-limprimerie-nationale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  mardi-inspi.fr — Lexique Imprimerie nationale ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://fr.wikipedia.org/wiki/Guillemet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  fr.wikipedia.org — Guillemet ↗
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.sciencespo.fr/ecole-doctorale/sites/sciencespo.fr.ecole-doctorale/files/CNRStypo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-caption text-accent-deep hover:text-ink transition-colors"
                >
                  sciencespo.fr — CNRS, Règles typographiques (PDF) ↗
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 06 — MICRO-TEXTES */}
      <section className="px-gutter py-section-md bg-accent-warm/25">
        <div className="max-w-default mx-auto">
          <SectionHead n="06" label="Micro-textes — là où personne n'écrit vraiment" />
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-16">
            <div>
              <p className="text-body text-ink/80 max-w-[42ch] mb-6">
                Une découverte de l&apos;enquête : aucune des maisons FR
                premium visitées n&apos;a de 404 éditorialisée. Ressource,
                Buci, Jacquemus, Sézane — toutes délèguent au serveur une page
                d&apos;erreur brute. Opportunité de{" "}
                <em className="italic">différenciation</em> directe pour Jules.
              </p>
              <p className="text-body text-ink/75 max-w-[42ch]">
                Les micro-textes (404, toasts, placeholders, états vides) sont
                des pages à part entière. On y tient la voix — sobre,
                descriptive, jamais &laquo;&nbsp;funny&nbsp;&raquo;. Zéro
                &laquo;&nbsp;Oups&nbsp;&raquo;, zéro emoji, zéro point
                d&apos;exclamation.
              </p>
            </div>

            <div className="flex flex-col border-t border-rule-strong">
              {MICRO_TEXTS.map((m) => (
                <div
                  key={m.moment}
                  className="grid md:grid-cols-[1fr_1.5fr] gap-6 py-6 border-b border-rule last:border-b-0 items-baseline"
                >
                  <div className="text-eyebrow uppercase text-ink/65">
                    {m.moment}
                  </div>
                  <div className="font-display italic text-[1.1rem] text-ink leading-snug">
                    {m.write}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE — TEST DU PAPIER */}
      <section className="px-gutter py-section-md">
        <div className="max-w-default mx-auto border-t border-rule-strong pt-12">
          <p className="font-display italic text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.3] text-surface max-w-[36ch]">
            Cette voix passe le test du papier. Imprimée sur une feuille, sans
            couleur ni filet ni motion, elle tient debout comme une page de
            magazine.
          </p>
        </div>
      </section>

      <ChapterFooter
        prev={{ label: "Relire — Mouvements", href: "/design/mouvements" }}
        next={{ label: "Lire ensuite — Imagerie", href: "/design/imagerie" }}
      />
    </div>
  );
}
