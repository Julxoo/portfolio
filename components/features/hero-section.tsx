interface BadgeProps {
  text: string;
  href?: string;
}

interface HeroSectionProps {
  name: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badges?: BadgeProps[];
}

export function HeroSection({
  name,
  title,
  description,
  badges,
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
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) =>
                badge.href ? (
                  <a
                    key={badge.text}
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
                    key={badge.text}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border bg-background"
                    role="status"
                  >
                    <span>{badge.text}</span>
                  </span>
                )
              )}
            </div>
          )}
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
