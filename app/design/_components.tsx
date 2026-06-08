import Link from "next/link";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-eyebrow uppercase text-accent-deep">{children}</span>
  );
}

export function SectionHead({
  n,
  label,
  onSurface = false,
}: {
  n: string;
  label: string;
  onSurface?: boolean;
}) {
  const muted = onSurface ? "opacity-60" : "text-ink/65";
  const border = onSurface ? "border-surface-foreground/15" : "border-ink/15";
  const ink = onSurface ? "" : "text-ink";
  return (
    <div
      data-chapter={n}
      className={`flex items-baseline gap-6 pb-6 mb-16 border-b ${border}`}
    >
      <span className={`text-eyebrow uppercase ${muted}`}>{n}</span>
      <h2 className={`font-display text-h3 ${ink}`}>{label}</h2>
    </div>
  );
}

type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-3 text-eyebrow uppercase text-ink/65">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-accent-deep transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="opacity-40">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function ChapterFooter({
  prev,
  next,
}: {
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
}) {
  return (
    <section className="px-gutter py-section-sm border-t border-ink/15">
      <div className="max-w-default mx-auto flex items-baseline justify-between flex-wrap gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="text-eyebrow uppercase text-ink/65 hover:text-accent-deep transition-colors"
          >
            ← {prev.label}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={next.href}
            className="font-display italic text-base text-surface hover:text-accent-deep transition-colors"
          >
            {next.label} →
          </Link>
        )}
      </div>
    </section>
  );
}
