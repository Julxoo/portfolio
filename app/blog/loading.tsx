import { Rule } from "@/components/ui";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-warm-cream ${className ?? ""}`}
    />
  );
}

export default function BlogLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <section className="pb-32 pt-32 md:pt-48">
        <Skeleton className="mb-6 h-4 w-16" />
        <Skeleton className="h-10 max-w-lg md:h-12" />

        <div className="mt-12 w-16 md:w-24">
          <Rule />
        </div>

        <div className="mt-12 border-t border-rule-light">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 border-b border-rule-light py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 max-w-md" />
                <Skeleton className="h-4 w-full max-w-xl" />
              </div>
              <div className="space-y-1 md:text-right">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
