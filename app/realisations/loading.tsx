import { Rule } from "@/components/ui";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-warm-cream ${className ?? ""}`}
    />
  );
}

export default function RealisationsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <section className="pb-32 pt-32 md:pt-48">
        <Skeleton className="mb-6 h-4 w-20" />
        <Skeleton className="h-10 max-w-lg md:h-12" />

        <div className="mt-12 w-16 md:w-24">
          <Rule />
        </div>

        <div className="mt-12 border-t border-rule-light">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border-b border-rule-light py-8 md:flex-row md:items-start md:justify-between md:gap-8"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full max-w-xl" />
                <div className="flex gap-x-2 pt-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
              <div className="space-y-1 md:text-right">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
