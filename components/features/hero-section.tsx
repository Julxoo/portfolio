interface HeroSectionProps {
  name: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badge?: {
    text: string;
    href?: string;
  };
}

export function HeroSection({
  name,
  title,
  description,
  badge,
}: HeroSectionProps) {
  return (
    <header
      className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32"
      role="banner"
      aria-label="Introduction"
    >
      <div className="space-y-4">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">{name}</h1>
          {badge &&
            (badge.href ? (
              <a
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
                aria-label={`${badge.text} - Lien externe vers l'article`}
              >
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-primary text-primary hover:bg-primary hover:text-background transition-colors"
                  role="status"
                  aria-live="polite"
                >
                  <span aria-hidden="true">🏆</span>
                  <span>{badge.text}</span>
                </span>
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border bg-background"
                role="status"
              >
                <span>{badge.text}</span>
              </span>
            ))}
        </div>
        <p
          className="text-muted-foreground text-xs sm:text-sm max-w-md"
          role="doc-subtitle"
        >
          {title}
        </p>
        <div
          className="text-muted-foreground text-xs sm:text-sm max-w-md leading-relaxed"
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content={typeof name === "string" ? name : ""} />
          {description}
        </div>
      </div>
    </header>
  );
}
