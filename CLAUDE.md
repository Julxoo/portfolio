# Instructions Projet Portfolio

## SEO
- Always optimise SEO

## Internationalisation (i18n)

### Architecture
Le portfolio utilise **next-intl** pour la gestion multilingue avec Next.js 16.

**Structure des fichiers :**
```
i18n/
  ├── routing.ts          # Configuration des locales (fr, en)
  └── request.ts          # Chargement des messages
messages/
  ├── fr.json            # Traductions UI en français
  └── en.json            # Traductions UI en anglais
content/
  ├── projects/
  │   ├── fr/            # Projets en français
  │   └── en/            # Projets en anglais
  ├── experiences/
  │   ├── fr.json        # Expériences en français
  │   └── en.json        # Expériences en anglais
  └── blog/
      ├── fr/            # Articles blog en français
      └── en/            # Articles blog en anglais
```

### Ajouter une nouvelle langue

**Exemple : Ajouter l'espagnol (es)**

1. **Configuration** (`i18n/routing.ts`)
   ```typescript
   locales: ["fr", "en", "es"]
   ```

2. **Traductions UI** : Créer `messages/es.json` (copier `en.json` et traduire)

3. **Contenu** :
   - Créer `content/projects/es/`
   - Créer `content/experiences/es.json`
   - Créer `content/blog/es/`
   - Traduire tous les fichiers

4. **Description hero** (optionnel) : Adapter `app/[locale]/page.tsx:42-181` pour ajouter la condition `locale === "es"`

5. **Build** : `npm run build`

✅ Le système génère automatiquement toutes les routes, le sitemap et le LanguageSwitcher.

### LanguageSwitcher
Le composant utilise un **dropdown minimaliste** scalable :
- Affiche la locale courante (ex: "fr") avec chevron
- Menu déroulant au clic avec toutes les locales disponibles
- Fermeture automatique au clic extérieur
- Labels complets : "fr → français", "en → english", etc.
- **100% automatique** : lit directement depuis `routing.locales`

Pour ajouter le label d'une nouvelle langue, éditer `LOCALE_LABELS` dans le composant.

### Bonnes pratiques
- **Traductions simples** : Utiliser `messages/{locale}.json`
- **Contenu complexe** (avec liens, formatage) : Gérer inline avec conditions `locale === "fr"` / `locale === "en"`
- **Data loaders** : Tous acceptent le paramètre `locale` en premier argument
- **Navigation** : Toujours utiliser `Link` depuis `@/i18n/routing` (pas `next/link`)
- **Metadata** : Toujours générer avec locale pour SEO optimal (hreflang, alternates.languages)