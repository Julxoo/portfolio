interface HeroSectionProps {
  name: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  badge?: {
    text: string;
    href?: string;
  };
}

export function HeroSection({ name, title, description, badge }: HeroSectionProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div className="space-y-4">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl">{name}</h1>
          {badge && (
            badge.href ? (
              <a
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-primary text-primary hover:bg-primary hover:text-background transition-colors">
                  <span>{badge.text}</span>
                </span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border bg-background">
                <span>{badge.text}</span>
              </span>
            )
          )}
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md">
          {title}
        </p>
        <div className="text-muted-foreground text-xs sm:text-sm max-w-md leading-relaxed">
          {description}
        </div>
      </div>
    </section>
  );
}
