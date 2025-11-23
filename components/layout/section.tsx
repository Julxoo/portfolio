import { cn } from "@/lib/utils";

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  title,
  description,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border",
        className
      )}
    >
      {(title || description) && (
        <div className="mb-6 sm:mb-8">
          {title && (
            <h2 className="text-xs sm:text-sm text-primary mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
