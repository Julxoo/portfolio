interface BlogPostJsonLdProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  locale: string;
  tags: string[];
  readingTime?: string;
}

export function BlogPostJsonLd({
  title,
  description,
  date,
  slug,
  locale,
  tags,
  readingTime,
}: BlogPostJsonLdProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: "Jules Toussenel",
      url: "https://julestoussenel.com",
      email: "toussenelj@gmail.com",
      jobTitle: "Développeur Full-Stack",
      sameAs: [
        "https://github.com/Julxoo",
        "https://www.linkedin.com/in/julestoussenel/",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Jules Toussenel",
      url: "https://julestoussenel.com",
    },
    url: `https://julestoussenel.com/${locale}/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://julestoussenel.com/${locale}/blog/${slug}`,
    },
    keywords: tags.join(", "),
    articleSection: tags[0] || "Technology",
    inLanguage: locale === "en" ? "en-US" : "fr-FR",
    ...(readingTime && {
      timeRequired: readingTime,
    }),
    image: {
      "@type": "ImageObject",
      url: "https://julestoussenel.com/og-image.png",
      width: 1200,
      height: 630,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
