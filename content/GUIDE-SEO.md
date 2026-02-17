# Guide : creer un article de blog optimise SEO/GEO

Ce guide explique comment creer un article dans le blog du portfolio,
avec une approche 100% orientee referencement naturel (SEO) et
Generative Engine Optimization (GEO : etre cite par ChatGPT, Perplexity, Google AI Overviews).

---

## 1. Creer le fichier

Chaque article est un fichier `.mdx` dans `content/posts/`.

```
content/posts/mon-article.mdx
```

Le nom du fichier n'a pas d'importance pour le SEO (c'est le champ `slug` qui definit l'URL).

---

## 2. Le frontmatter (tous les champs)

```yaml
---
title: Titre affiche sur la page (H1)
seoTitle: Titre optimise pour Google (balise <title>), max 70 caracteres
slug: mon-slug-optimise
description: Meta description avec le mot-cle principal, max 160 caracteres idealement
keyword: mot-cle principal cible
date: 2026-02-17
updated: 2026-03-01  # optionnel, ajouter quand on met a jour l'article
published: true
category: Developpement web
tags:
  - next.js
  - seo
  - freelance
faq:
  - question: Ma premiere question ?
    answer: Reponse concise et complete.
  - question: Ma deuxieme question ?
    answer: Reponse concise et complete.
cover: ./image.jpg  # optionnel
---
```

### Detail de chaque champ

| Champ | Obligatoire | Role SEO/GEO |
|---|---|---|
| `title` | oui | Balise H1 de la page. Doit contenir le mot-cle principal naturellement. |
| `seoTitle` | non | Ecrase le `<title>` et les meta OG/Twitter. Utile quand le H1 est accrocheur mais pas optimal pour la SERP. Max 70 chars pour ne pas etre tronque. |
| `slug` | oui | Definit l'URL : `/blog/mon-slug`. Court (3-5 mots), en francais, avec le keyword. Pas de date, pas d'accents, pas de stop words. |
| `description` | oui | Meta description + OG description. Le keyword doit apparaitre dans les 120 premiers caracteres. Max 260 chars (schema Velite), viser 150-160 pour la SERP. |
| `keyword` | oui | Mot-cle principal cible. Sert de reference pour la coherence de l'article. Un seul keyword par article. |
| `date` | oui | `datePublished` dans le schema BlogPosting. Format ISO : YYYY-MM-DD. |
| `updated` | non | `dateModified` dans le schema. A renseigner a chaque mise a jour significative. Google favorise le contenu frais. |
| `published` | oui | `false` = brouillon, l'article n'apparait nulle part (listing, sitemap, RSS). |
| `category` | oui | `articleSection` dans le schema BlogPosting. Sert au maillage interne (articles lies) et aux topic clusters. Exemples : "Developpement web", "IA", "Freelance". |
| `tags` | oui | `keywords` dans le schema. Servent aussi au calcul des articles lies. Utiliser des tags normalises et coherents entre articles. |
| `faq` | non | Genere automatiquement un schema `FAQPage` JSON-LD + une section FAQ visible. Pages avec FAQPage : 3.2x plus citees dans les AI Overviews. |
| `cover` | non | Image de couverture. Sera utilisee pour l'OG image quand configuree. |

---

## 3. Structure ideale d'un article SEO/GEO

```
1. Introduction (100-150 mots)
   - Accroche avec le mot-cle dans les 100 premiers mots
   - Annonce du contenu

2. Section principale (H2)
   -> ANSWER CAPSULE (1-2 phrases, 20-25 mots, reponse directe)
   - Developper le sujet
   - Keyword dans le H2
   - 300-500 mots par section
   - Paragraphes de 40-60 mots (taille optimale pour extraction LLM)

3. Sous-sections (H3)
   - Details, exemples, code
   - Keywords secondaires (tags) places naturellement

4. Autres sections H2
   -> ANSWER CAPSULE apres chaque H2
   - Couvrir les sous-sujets
   - Varier les angles
   - Inclure des donnees originales (chiffres, benchmarks, retours clients)

5. FAQ (automatique via frontmatter)
   - 2-5 questions ciblees
   - Reponses concises (40-60 mots)
   - Questions que les gens tapent reellement dans Google

6. Articles lies (automatique)
   - Generes par le systeme selon la categorie + les tags
```

### Answer capsules (GEO)

C'est le signal le plus fort pour etre cite par les LLMs.
72.4% des posts cites par ChatGPT contiennent un "answer capsule" : un bloc de texte autonome
de 20-25 mots place juste apres un heading H2, qui repond directement a la question implicite du titre.

**Exemple :**

```mdx
## Pourquoi Next.js est ideal pour le SEO

Next.js genere du HTML statique au build, ce qui donne le meilleur TTFB possible
et permet a Google d'indexer le contenu sans executer de JavaScript.

Le rendu statique (SSG) est la methode...
```

La premiere phrase apres le H2 est l'answer capsule. Elle doit :
- Etre autonome (comprehensible sans le reste de l'article)
- Ne contenir aucun lien (91% des capsules citees n'en ont pas)
- Faire 20-25 mots
- Repondre directement a la question du heading

### Bonnes pratiques de redaction

- **Longueur** : 800-2000 mots minimum. Google et les LLMs favorisent le contenu approfondi.
- **Mot-cle** : dans le H1, la description, le premier paragraphe, au moins un H2, et le slug.
- **Paragraphes courts** : 40-60 mots par paragraphe. C'est la taille optimale pour l'extraction semantique par les LLMs.
- **Donnees originales** : 52.2% des posts cites par ChatGPT contiennent des donnees propres. Inclure des chiffres reels (temps de livraison, resultats clients, benchmarks).
- **Maillage interne** : lier vers d'autres articles du blog et vers les pages de services :
  ```mdx
  Decouvrez aussi mon [service de creation de site vitrine](/services/site-vitrine).
  ```
- **Pas d'em dashes** : jamais de `—`. Utiliser `.`, `:`, ou restructurer.
- **Images** : toujours un alt text descriptif avec le keyword quand pertinent.
- **Sources** : citer les sources quand on avance un chiffre ou une affirmation technique. Les LLMs privilegient le contenu avec des donnees verifiables.

---

## 4. Topic clusters (strategie de contenu)

Le blog fonctionne en **topic clusters** via le champ `category` :

```
Categorie : "Developpement web"
  ├── Pilier : /services/site-vitrine (page existante)
  ├── Article : /blog/pourquoi-nextjs-freelance
  ├── Article : /blog/optimiser-vitesse-site-web
  └── Article : /blog/seo-technique-checklist

Categorie : "IA"
  ├── Pilier : /services/bot-affiliation (page existante)
  ├── Article : /blog/automatiser-taches-ia
  └── Article : /blog/chatbot-telegram-guide

Categorie : "Freelance"
  ├── Pilier : /a-propos (page existante)
  ├── Article : /blog/comment-devenir-freelance-dev
  └── Article : /blog/fixer-ses-tarifs-freelance
```

Chaque article doit lier vers :
1. La page pilier de sa categorie
2. Au moins 1-2 autres articles du meme cluster
3. La page contact ou un service pertinent (CTA)

Les articles lies sont generes automatiquement en bas de page selon la categorie et les tags communs.

---

## 5. FAQ : maximiser les rich snippets et les AI Overviews

La FAQ est l'outil SEO/GEO le plus puissant du blog :
- Schema `FAQPage` JSON-LD = rich snippets FAQ dans la SERP Google
- Pages avec FAQPage = **3.2x plus citees** dans les Google AI Overviews
- Les LLMs extraient les paires question/reponse comme source prioritaire

### Regles pour une bonne FAQ

- **2 a 5 questions** par article
- **Questions reelles** : celles que les gens tapent dans Google. Utiliser Google Suggest, People Also Ask, ou AnswerThePublic
- **Reponses autonomes** : chaque reponse doit fonctionner sans contexte (Google et les LLMs les affichent seules)
- **40-60 mots par reponse** : assez pour etre utile, assez court pour les rich snippets
- **Inclure le keyword** : dans au moins une question
- **Pas de liens dans les reponses** : les LLMs ignorent les blocs qui contiennent des liens

### Exemple

```yaml
faq:
  - question: Combien coute un site vitrine en freelance ?
    answer: Un site vitrine sur-mesure coute entre 500 et 2000 EUR selon la complexite. Cela inclut le design, le developpement, l'hebergement et l'optimisation SEO de base.
  - question: Quel est le meilleur framework pour un site vitrine ?
    answer: Next.js est le meilleur choix pour un site vitrine performant. Il offre le rendu statique (SSG), une optimisation SEO native, et un deploiement gratuit sur Vercel.
```

---

## 6. Protections contenu IA : regles absolues

Google ne penalise pas le contenu IA en soi. Il penalise le contenu inutile, peu importe
comment il a ete produit. Mais des regles strictes s'appliquent pour rester en securite.

### Ce que Google detecte (SpamBrain)

- Publication de masse (des dizaines d'articles d'un coup)
- Contenu sans insight original, sans experience de premiere main
- Hallucinations et erreurs factuelles non corrigees
- Keyword stuffing (l'IA a tendance a sur-optimiser)
- Contenu quasi-identique a d'autres sites
- Absence de signaux E-E-A-T (pas de bio auteur, pas de sources)

### Les tics IA a eliminer systematiquement

Avant de publier, relire l'article et supprimer ces patterns qui signalent
du contenu IA brut :

- "Il est important de noter que..."
- "Dans le monde actuel..."
- "Il convient de souligner..."
- "De nos jours..."
- "En fin de compte..."
- "Il est essentiel de..."
- "Cela dit, il est crucial de..."
- "Force est de constater..."
- Listes a puces generiques sans donnees concretes
- Phrases qui commencent par "En tant que developpeur..."
- Conclusions qui repetent l'introduction mot pour mot
- Vocabulaire trop uniforme (varier les tournures)
- Phrases toutes de la meme longueur (varier court/long)

### E-E-A-T : ce que l'IA ne peut pas fournir

Le premier "E" (Experience) est le critere impossible a satisfaire avec du contenu IA brut.
Chaque article doit contenir au moins 2-3 de ces elements :

- **Retour d'experience personnel** : "Sur ce projet, j'ai..."
- **Donnees clients reelles** : temps de livraison, resultats mesures, avant/apres
- **Opinions argumentees** : ton avis technique, tes choix et pourquoi
- **Captures d'ecran ou exemples concrets** de tes projets
- **Chiffres personnels** : benchmarks, metriques, resultats de tests
- **Anecdotes de terrain** : problemes rencontres, solutions trouvees

### Rythme de publication

- **1-2 articles par semaine maximum**. Pas 20 d'un coup.
- Publier regulierement est mieux que publier massivement.
- Chaque article doit passer par : draft IA -> reecriture personnelle -> verification des faits -> relecture.

### Workflow recommande

```
1. Definir le keyword cible (Google Suggest, People Also Ask)
2. Generer un draft avec l'IA (structure + premier jet)
3. Reecrire chaque section avec ta voix et ton expertise
4. Ajouter tes donnees originales (retours clients, chiffres, exemples)
5. Inserer les answer capsules apres chaque H2
6. Rediger la FAQ avec des vraies questions de terrain
7. Ajouter 2+ liens internes (service + autre article)
8. Relire pour eliminer les tics IA
9. Verifier chaque fait et chiffre avance
10. Build + verification JSON-LD
```

---

## 7. GEO : etre cite par les LLMs

Le trafic IA (ChatGPT, Perplexity, Google AI Overviews) convertit **4.4x mieux**
que le trafic organique classique. Voici comment maximiser les chances d'etre cite.

### Ce que les LLMs privilegient

| Signal | Impact | Comment l'appliquer |
|---|---|---|
| Answer capsules | 72.4% des posts cites en ont | 1-2 phrases autonomes apres chaque H2 |
| Donnees originales | +22% de citations | Chiffres reels, benchmarks, etudes de cas |
| Citations directes | +37% de citations | Quotes d'experts, retours clients verbatim |
| Schema.org JSON-LD | +33% de citations | Deja gere par le systeme (BlogPosting + FAQ) |
| FAQPage markup | 3.2x plus de citations | Champ `faq` dans le frontmatter |
| Paragraphes 40-60 mots | Extraction optimale | Decouper les blocs longs |
| Pas de liens dans les answer blocks | 91% des capsules citees | Garder les capsules clean |
| Contenu SSG/SSR | Indexation facile | Deja le cas (Next.js SSG) |

### Ce que les LLMs ignorent

- Contenu rendu en JavaScript cote client (pas notre cas)
- Blocs de texte tres longs sans structure (paragraphes 200+ mots)
- Contenu sans donnees verifiables
- Pages sans structured data

### Diversifier la presence

Les LLMs citent des sources differentes. Seulement 11% des domaines
sont cites a la fois par ChatGPT et Perplexity.

Pour maximiser la visibilite :
- **ChatGPT** : favorise Wikipedia, sites educatifs, documentation technique
- **Perplexity** : favorise Reddit (46.7% des sources), contenu recent (< 90 jours)
- **Google AI Overviews** : favorise les pages avec structured data + FAQ

Poster aussi sur LinkedIn, GitHub, et participer aux discussions Reddit
pertinentes augmente la surface de citation.

---

## 8. Ce que le systeme genere automatiquement

Pour chaque article publie, le systeme produit :

| Element | Source | Impact SEO | Impact GEO |
|---|---|---|---|
| `<title>` | `seoTitle` ou `title` | Balise title dans la SERP | Headline extraite par les LLMs |
| Meta description | `description` | Snippet sous le titre | Resume utilise par Perplexity |
| Canonical URL | `/blog/{slug}` | Evite le contenu duplique | - |
| JSON-LD `BlogPosting` | Frontmatter | Rich results, Knowledge Graph | +33% de citations LLM |
| JSON-LD `BreadcrumbList` | Auto (3 niveaux) | Breadcrumbs dans la SERP | Structure hierarchique |
| JSON-LD `FAQPage` | `faq` du frontmatter | Rich snippets FAQ | 3.2x plus de citations AI Overviews |
| `articleSection` | `category` | Categorisation thematique | Contexte topical pour les LLMs |
| OG / Twitter cards | `seoTitle` + `description` | Preview sur les reseaux | Metadata pour les crawlers IA |
| Entree sitemap.xml | Auto | Indexation Google | Decouverte par les bots IA |
| Entree RSS | Auto | Syndication du contenu | - |
| Articles lies | Auto (categorie + tags) | Maillage interne | Renforce l'autorite topicale |
| Temps de lecture | Auto (Velite metadata) | UX, engagement signal | - |
| Word count | Auto (schema BlogPosting) | Signal de profondeur | - |
| HTML statique (SSG) | Auto (generateStaticParams) | Meilleur TTFB | Indexation LLM facile |

---

## 9. Checklist avant publication

### SEO

- [ ] Le `keyword` est dans : le title, la description, le slug, le premier paragraphe, au moins un H2
- [ ] Le `seoTitle` fait moins de 70 caracteres et contient le keyword
- [ ] La `description` fait 150-160 caracteres et contient le keyword dans les 120 premiers chars
- [ ] Le `slug` est court (3-5 mots), sans accent, sans date
- [ ] La `category` est coherente avec les autres articles du meme cluster
- [ ] Les `tags` sont normalises (minuscules, coherents entre articles)
- [ ] La FAQ contient 2-5 vraies questions que les gens cherchent
- [ ] L'article fait 800+ mots
- [ ] Au moins 2 liens internes (vers une page service + un autre article)
- [ ] Pas d'em dashes (`—`)

### GEO

- [ ] Chaque H2 est suivi d'un answer capsule (20-25 mots, autonome, sans lien)
- [ ] L'article contient des donnees originales (chiffres, benchmarks, retours clients)
- [ ] Les paragraphes font 40-60 mots en moyenne
- [ ] Les FAQ sont des vraies questions sans liens dans les reponses

### Qualite / Anti-detection IA

- [ ] L'article a ete reecrit avec ta voix (pas du IA brut)
- [ ] Aucun tic IA ("il est important de noter", "dans le monde actuel", etc.)
- [ ] Au moins 2 elements d'experience personnelle (retour terrain, donnees clients, anecdote)
- [ ] Tous les faits et chiffres sont verifies
- [ ] Les phrases varient en longueur (court/moyen/long)
- [ ] Le vocabulaire est varie (pas de repetitions mecaniques)

### Technique

- [ ] `npm run build` passe sans erreur
- [ ] Le JSON-LD est present dans le HTML source (BlogPosting + FAQ si applicable)

---

## 10. Commandes utiles

```bash
# Lancer le dev (IMPORTANT: --webpack car Velite incompatible Turbopack)
npm run dev

# Build production
npm run build

# Verifier le sitemap
curl http://localhost:3000/sitemap.xml

# Verifier le RSS
curl http://localhost:3000/feed.xml

# Verifier le JSON-LD (dans le HTML source de la page)
curl -s http://localhost:3000/blog/mon-slug | grep "application/ld+json"
```
