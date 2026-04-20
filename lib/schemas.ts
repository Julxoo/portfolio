/**
 * Centralized Schema.org JSON-LD factories for SEO & GEO.
 *
 * Usage:
 *   import { siteSchema, createBreadcrumbSchema, ... } from "@/lib/schemas";
 *   <JsonLd data={siteSchema} />
 */

const BASE_URL = "https://julestoussenel.com";

/* ── Site-wide schema (@graph) · used in layout.tsx ────── */

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Jules Toussenel",
      givenName: "Jules",
      familyName: "Toussenel",
      jobTitle: "AI-Augmented Software Engineer",
      description:
        "Développeur web freelance à Aix-en-Provence. Conception et développement d'applications web sur-mesure, sites vitrine, CRM métier, SaaS, référencement SEO et GEO, maintenance de sites existants.",
      url: BASE_URL,
      email: "toussenelj@gmail.com",
      telephone: "+33614533229",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aix-en-Provence",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: "13100",
        addressCountry: "FR",
      },
      nationality: "FR",
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "EPITECH Marseille",
          sameAs: "https://www.epitech.eu/",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/in/julestoussenel/",
        "https://www.malt.fr/profile/julestoussenel",
        "https://github.com/Julxoo",
      ],
      knowsAbout: [
        "Développement web",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Bun",
        "PostgreSQL",
        "Tailwind CSS",
        "Site vitrine",
        "CRM métier",
        "SaaS",
        "Automatisation",
        "Référencement SEO",
        "Generative Engine Optimization",
        "Intelligence artificielle",
      ],
      knowsLanguage: ["fr", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Jules Toussenel",
      url: BASE_URL,
      description:
        "Portfolio de Jules Toussenel, développeur web freelance à Aix-en-Provence.",
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: "fr-FR",
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${BASE_URL}/#business`,
      name: "Jules Toussenel",
      alternateName: "Jules Toussenel · Développeur Web Freelance",
      description:
        "Développeur web freelance à Aix-en-Provence. Sites vitrine sur-mesure, applications métier, CRM, SaaS, SEO et GEO, maintenance.",
      url: BASE_URL,
      founder: { "@id": `${BASE_URL}/#person` },
      telephone: "+33614533229",
      email: "toussenelj@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aix-en-Provence",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: "13100",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.5297,
        longitude: 5.4474,
      },
      areaServed: [
        { "@type": "Country", name: "France" },
        { "@type": "City", name: "Aix-en-Provence" },
        { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
      ],
      serviceType: [
        "Création de site vitrine",
        "Développement d'application web sur-mesure",
        "Développement de CRM métier",
        "Référencement SEO et GEO",
        "Maintenance de sites web",
      ],
      sameAs: [
        "https://www.linkedin.com/in/julestoussenel/",
        "https://www.malt.fr/profile/julestoussenel",
        "https://github.com/Julxoo",
      ],
      priceRange: "$$",
    },
  ],
};

/* ── Breadcrumbs ───────────────────────────────────────── */

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `${BASE_URL}${item.path}`,
        name: item.name,
      },
    })),
  };
}

/* ── WebPage variants ──────────────────────────────────── */

interface WebPageOptions {
  type?: string;
  url: string;
  name: string;
  description: string;
}

export function createWebPageSchema({
  type = "WebPage",
  url,
  name,
  description,
}: WebPageOptions) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${BASE_URL}${url}/#webpage`,
    url: `${BASE_URL}${url}`,
    name,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#person` },
    inLanguage: "fr-FR",
  };
}

/* ── Project / Realisation ─────────────────────────────── */

interface ProjectOptions {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags?: string[];
}

export function createProjectSchema({
  title,
  description,
  slug,
  date,
  tags = [],
}: ProjectOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${BASE_URL}/realisations/${slug}`,
    dateCreated: date,
    creator: { "@id": `${BASE_URL}/#person` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "fr-FR",
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  };
}

/* ── ItemList (services, etc.) ─────────────────────────── */

interface ItemListItem {
  name: string;
  url: string;
}

export function createItemListSchema(items: ItemListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/* ── FAQ ───────────────────────────────────────────────── */

interface FaqItem {
  question: string;
  answer: string;
}

export function createFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}