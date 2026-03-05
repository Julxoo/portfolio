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
      jobTitle: "AI-Augmented Software Engineer",
      description:
        "Ingénieur logiciel spécialisé dans les applications web sur-mesure, CRM métier, SaaS et automatisation augmentés par l'IA.",
      url: BASE_URL,
      // TODO: replace with actual photo URL once available
      // image: `${BASE_URL}/images/jules-toussenel.jpg`,
      telephone: "+33614533229",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aix-en-Provence",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: "13100",
        addressCountry: "FR",
      },
      sameAs: [
        "https://www.linkedin.com/in/julestoussenel/",
        "https://www.malt.fr/profile/julestoussenel",
        "https://github.com/Julxoo",
      ],
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "SaaS",
        "CRM",
        "Automatisation",
        "Intelligence artificielle",
      ],
      knowsLanguage: ["fr", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: "Jules Toussenel",
      url: BASE_URL,
      publisher: { "@id": `${BASE_URL}/#person` },
      inLanguage: "fr-FR",
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${BASE_URL}/#business`,
      name: "Jules Toussenel",
      description:
        "Développeur web freelance à Aix-en-Provence. Applications web sur-mesure, CRM métier, SaaS et automatisation.",
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

/* ── Service ───────────────────────────────────────────── */

interface ServiceOptions {
  name: string;
  description: string;
  slug: string;
  price?: string;
  priceCurrency?: string;
  priceLabel?: string;
}

export function createServiceSchema({
  name,
  description,
  slug,
  price,
  priceCurrency = "EUR",
  priceLabel,
}: ServiceOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${BASE_URL}/services/${slug}`,
    provider: { "@id": `${BASE_URL}/#person` },
    areaServed: { "@type": "Country", name: "France" },
  };

  if (price) {
    schema.offers = {
      "@type": "Offer",
      price,
      priceCurrency,
      ...(priceLabel ? { description: priceLabel } : {}),
    };
  }

  return schema;
}

/* ── BlogPosting ──────────────────────────────────────── */

interface BlogPostOptions {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
  wordCount?: number;
}

export function createBlogPostSchema({
  title,
  description,
  slug,
  date,
  updated,
  category,
  tags = [],
  wordCount,
}: BlogPostOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: updated ?? date,
    author: { "@id": `${BASE_URL}/#person` },
    publisher: { "@id": `${BASE_URL}/#person` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "fr-FR",
    ...(category ? { articleSection: category } : {}),
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
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