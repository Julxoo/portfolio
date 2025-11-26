import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function Section({
  title,
  description,
  children,
  className,
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  // Generate heading ID for aria-labelledby
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      className={cn(
        "max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border",
        className
      )}
      aria-label={ariaLabel}
      aria-labelledby={!ariaLabel && title ? headingId : undefined}
    >
      {(title || description) && (
        <header className="mb-6 sm:mb-8">
          {title && (
            <h2
              id={headingId}
              className="text-xs sm:text-sm text-primary mb-2"
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
