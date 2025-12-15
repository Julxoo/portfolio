interface CollectionItem {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  image?: string;
}

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  locale: string;
  items: CollectionItem[];
  type: "projects" | "blog";
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  locale,
  items,
  type,
}: CollectionPageJsonLdProps) {
  const baseUrl = "https://www.julestoussenel.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${baseUrl}${url}`,
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Jules Toussenel",
      url: baseUrl,
    },
    about: {
      "@type": type === "blog" ? "Blog" : "CreativeWork",
      name:
        type === "blog"
          ? locale === "en"
            ? "Technical Blog"
            : "Blog Technique"
          : locale === "en"
          ? "Development Projects"
          : "Projets de Développement",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": type === "blog" ? "BlogPosting" : "CreativeWork",
          name: item.name,
          description: item.description,
          url: item.url,
          ...(item.datePublished && { datePublished: item.datePublished }),
          ...(item.image && {
            image: {
              "@type": "ImageObject",
              url: item.image,
            },
          }),
          author: {
            "@type": "Person",
            name: "Jules Toussenel",
            url: baseUrl,
          },
        },
      })),
      numberOfItems: items.length,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "en" ? "Home" : "Accueil",
          item: `${baseUrl}/${locale}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}




