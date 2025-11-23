# Portfolio Jules Toussenel - Documentation Claude

> **Dernière mise à jour** : Janvier 2025
> **Domaine** : https://julestoussenel.com

---

## 🎯 Vue d'ensemble

Portfolio minimaliste et performant de Jules Toussenel, développeur web. Architecture scalable avec Next.js 16, design épuré en nuances de gris, typographie monospace.

**Principes fondamentaux :**
- ✨ Minimalisme absolu - chaque élément a une raison d'être
- 📱 Mobile-first responsive
- ⚡ Performance maximale (Server Components)
- 🔍 SEO optimisé (toujours)
- 🎨 Cohérence visuelle stricte

---

## 🏗️ Architecture

### Structure des dossiers

```
portfolio/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── projects/
│   │   ├── page.tsx              # Liste projets
│   │   └── [slug]/page.tsx       # Détail projet
│   ├── blog/
│   │   ├── page.tsx              # Liste articles
│   │   └── [slug]/page.tsx       # Article détaillé
│   ├── layout.tsx                # Root layout + metadata SEO
│   ├── globals.css               # Thème + design tokens
│   ├── sitemap.ts                # Sitemap dynamique
│   ├── robots.ts                 # Robots.txt
│   └── manifest.ts               # PWA manifest
│
├── components/
│   ├── layout/                   # Composants structure
│   │   ├── nav.tsx               # Navigation principale
│   │   ├── footer.tsx            # Footer avec copyright dynamique
│   │   └── section.tsx           # Wrapper section réutilisable
│   └── features/                 # Composants métier
│       ├── hero-section.tsx      # Hero homepage
│       ├── project-card.tsx      # Card projet (liste)
│       ├── experience-item.tsx   # Item expérience
│       └── blog-card.tsx         # Card article blog
│
├── lib/
│   ├── data/                     # Couche d'accès données
│   │   ├── projects.ts           # getProjects(), getProjectBySlug()
│   │   ├── experiences.ts        # getExperiences()
│   │   └── blog.ts               # getBlogPosts(), getBlogPost()
│   ├── schemas/                  # Validation Zod
│   │   ├── project.schema.ts
│   │   ├── experience.schema.ts
│   │   └── blog.schema.ts
│   ├── constants.ts              # Config centralisée (SITE_CONFIG)
│   └── utils.ts                  # cn() pour Tailwind
│
├── types/                        # Types TypeScript
│   ├── project.ts
│   ├── experience.ts
│   ├── blog.ts
│   └── index.ts
│
├── content/                      # ⭐ CONTENU MODIFIABLE
│   ├── projects/                 # Fichiers JSON projets
│   │   ├── portfolio-nextjs.json
│   │   └── exemple-projet.json
│   ├── experiences.json          # Liste expériences
│   └── blog/                     # Articles MDX
│       ├── bienvenue.mdx
│       └── exemple-article.mdx
│
└── public/
    └── images/                   # Assets statiques
```

### Rôle de chaque dossier

| Dossier | Rôle | Modification |
|---------|------|--------------|
| `app/` | Routing et pages Next.js | ⚠️ Rarement |
| `components/` | Composants UI réutilisables | ⚠️ Rarement |
| `lib/` | Logique métier et utilitaires | ⚠️ Rarement |
| `types/` | Types TypeScript | ⚠️ Rarement |
| **`content/`** | **Contenu projets/blog** | ✅ **Souvent** |
| `public/` | Images et assets | ✅ Régulièrement |

---

## 🎨 Design System & Design Tokens

### Couleurs (globals.css)

**⚠️ NE JAMAIS MODIFIER sans confirmation explicite**

```css
:root {
  --background: oklch(0.16 0.007 265);     /* #222428 - fond principal */
  --foreground: oklch(0.95 0 0);           /* Texte clair */
  --card: oklch(0.20 0.007 265);           /* Cards légèrement plus clair */
  --border: oklch(0.29 0.007 265);         /* Bordures subtiles */
  --muted: oklch(0.22 0.007 265);          /* Éléments discrets */
  --muted-foreground: oklch(0.62 0 0);     /* Texte secondaire */
  --accent: oklch(0.92 0 0);               /* Accent clair */
}
```

**Utilisation :**
- `bg-background` - Fond principal
- `text-foreground` - Texte principal
- `text-muted-foreground` - Texte secondaire
- `border-border` - Bordures
- `bg-card` - Fonds cards

### Typographie

**Police principale :** Geist Mono (Google Fonts)
```tsx
className="font-mono" // Déjà appliqué au body
```

**Tailles de texte :**
- `text-xs sm:text-sm` - Texte standard
- `text-2xl sm:text-3xl md:text-4xl` - Titres H1
- Toujours responsive avec préfixes `sm:` et `md:`

### Espacements

**Padding sections :**
```tsx
className="px-4 sm:px-6 py-12 sm:py-16"
```

**Max width container :**
```tsx
className="max-w-4xl mx-auto"
```

### Bordures

**TOUJOURS carrées** (radius: 0)
```tsx
// ✅ BON
className="border border-border"

// ❌ MAUVAIS - Ne jamais arrondir
className="rounded-lg"
```

---

## ♻️ RÈGLE FONDAMENTALE : Réutilisation

### ⚠️ TOUJOURS réutiliser les composants existants

**Avant de créer un nouveau composant, VÉRIFIER :**
1. ✅ `components/layout/section.tsx` - Wrapper section
2. ✅ `components/features/project-card.tsx` - Card projet
3. ✅ `components/features/blog-card.tsx` - Card blog
4. ✅ `components/features/experience-item.tsx` - Item expérience

**Exemple CORRECT :**
```tsx
// ✅ BON - Réutilise Section existant
import { Section } from "@/components/layout/section";

<Section title="nouveau titre" id="nouvelle-section">
  {/* Contenu */}
</Section>
```

**Exemple INCORRECT :**
```tsx
// ❌ MAUVAIS - Recrée un wrapper section
<section className="max-w-4xl mx-auto px-4 sm:px-6...">
  {/* Ne jamais faire ça */}
</section>
```

### Design Tokens - TOUJOURS utiliser les variables CSS

```tsx
// ✅ BON - Utilise les tokens
className="bg-background text-foreground border-border"

// ❌ MAUVAIS - Couleurs hardcodées
className="bg-[#222428] text-white border-gray-700"
```

---

## 📦 Ajouter du contenu

### Ajouter un projet

1. **Créer** `content/projects/nom-du-projet.json` :
```json
{
  "id": "nom-du-projet",
  "title": "Titre du Projet",
  "description": "Description courte (1 ligne)",
  "longDescription": "Description détaillée pour la page projet...",
  "tags": ["React", "TypeScript", "Next.js"],
  "images": [],
  "githubUrl": "https://github.com/Julxoo/projet",
  "liveUrl": "https://demo.com",
  "featured": true,
  "date": "2025-01-20T00:00:00.000Z",
  "status": "completed"
}
```

2. **C'est tout !** Le projet apparaît automatiquement :
   - Sur la homepage si `featured: true`
   - Sur `/projects`
   - Accessible via `/projects/nom-du-projet`
   - Dans le sitemap

### Modifier les expériences

**Éditer** `content/experiences.json` :
```json
[
  {
    "id": "exp-1",
    "role": "Développeur Full Stack",
    "company": "Entreprise",
    "companyUrl": "https://example.com",
    "period": "2024 - présent",
    "startDate": "2024-01-01T00:00:00.000Z",
    "description": "Description du poste...",
    "technologies": ["Next.js", "React", "TypeScript"],
    "current": true
  }
]
```

### Publier un article de blog

1. **Créer** `content/blog/titre-article.mdx` :
```mdx
---
title: "Titre de l'article"
description: "Description courte"
date: "2025-01-20T00:00:00.000Z"
tags: ["Next.js", "Tutorial"]
published: true
readingTime: "5 min"
---

# Contenu Markdown ici

Votre article en **Markdown** avec du code :

\`\`\`typescript
const example = "code";
\`\`\`
```

2. **Mettre `published: true`** pour le rendre visible
3. L'article apparaît automatiquement sur `/blog`

---

## 👤 Informations personnelles

**GitHub :** https://github.com/Julxoo
**LinkedIn :** https://www.linkedin.com/in/julestoussenel/
**Email :** toussenelj@gmail.com
**Domaine :** https://julestoussenel.com

**⚠️ Ces infos sont dans :**
- `lib/constants.ts` - SITE_CONFIG
- `components/json-ld.tsx` - SEO structured data

---

## 🛠️ Stack Technique

### Core
- **Next.js** 16.0.3 (App Router, Server Components)
- **React** 19.2.0
- **TypeScript** 5.x (strict mode)
- **Tailwind CSS** v4 (nouvelle syntaxe @import)

### Validation & Data
- **Zod** - Validation runtime type-safe
- **next-mdx-remote** - Rendu MDX blog
- **gray-matter** - Front matter parsing

### Autres
- **Geist Mono** (Google Fonts)
- **lucide-react** - Icônes (si besoin)
- **clsx + tailwind-merge** - Gestion classes CSS

### Configuration
- `tsconfig.json` : strict mode, path aliases `@/*`
- `next.config.ts` : Configuration minimale
- `eslint.config.mjs` : ESLint Next.js

---

## ⚠️ Règles strictes

### Design
1. ✅ **TOUJOURS** utiliser les composants existants
2. ✅ **TOUJOURS** utiliser les design tokens (variables CSS)
3. ❌ **JAMAIS** modifier `#222428` sans confirmation
4. ❌ **JAMAIS** arrondir les bordures (radius: 0)
5. ❌ **JAMAIS** changer la police Geist Mono
6. ✅ Garder le design minimaliste et épuré

### Code
1. ✅ **TOUJOURS** valider avec Zod (schemas dans `lib/schemas/`)
2. ✅ **TOUJOURS** typer avec TypeScript
3. ✅ **TOUJOURS** optimiser SEO (metadata, JSON-LD)
4. ✅ Server Components par défaut, Client Components si nécessaire
5. ✅ Mobile-first responsive (`sm:`, `md:` breakpoints)

### Workflow
1. ✅ Tester avec `npm run build` avant de finir
2. ✅ Vérifier que le sitemap se génère correctement
3. ✅ Valider le responsive (mobile, tablette, desktop)
4. ✅ S'assurer que le SEO est optimal

---

## 📝 Commandes utiles

```bash
# Développement
npm run dev              # Serveur dev sur http://localhost:3000

# Production
npm run build            # Build production (TOUJOURS tester avant de finir)
npm run start            # Serveur production

# Linting
npm run lint             # Vérifier ESLint
```

---

## 🎯 Patterns de code

### Ajouter une nouvelle page

```tsx
// app/nouvelle-page/page.tsx
import { Metadata } from "next";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Titre Page",
  description: "Description page",
};

export default function NouvellePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Section title="section titre">
          {/* Contenu */}
        </Section>
      </main>
      <Footer />
    </div>
  );
}
```

### Créer un nouveau composant feature

**Uniquement si AUCUN composant existant ne convient**

```tsx
// components/features/nouveau-composant.tsx
import type { MonType } from "@/types";

interface NouveauComposantProps {
  data: MonType;
}

export function NouveauComposant({ data }: NouveauComposantProps) {
  return (
    <div className="space-y-4">
      {/* Utiliser design tokens */}
      <h3 className="text-xs sm:text-sm text-foreground">
        {data.title}
      </h3>
      <p className="text-xs text-muted-foreground">
        {data.description}
      </p>
    </div>
  );
}
```

### Accéder aux données

```tsx
// Dans un Server Component
import { getProjects } from "@/lib/data/projects";

const projects = await getProjects();
const featured = await getFeaturedProjects();
const project = await getProjectBySlug("slug");
```

---

## 🚨 Points d'attention

1. **Validation Zod** : Tous les JSON sont validés au runtime
2. **Type Safety** : TypeScript strict mode activé
3. **SEO** : Toujours optimiser (metadata, JSON-LD, sitemap)
4. **Performance** : Préférer Server Components
5. **Responsive** : Mobile-first obligatoire
6. **Design tokens** : Ne jamais hardcoder les couleurs
7. **Composants** : Toujours réutiliser l'existant

---

## 📚 Ressources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zod Documentation](https://zod.dev)
- [MDX Documentation](https://mdxjs.com)

---

**Dernière règle :** Si tu hésites, demande plutôt que de modifier le design ou l'architecture existante. La cohérence est primordiale.
