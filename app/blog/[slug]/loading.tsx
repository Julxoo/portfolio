import { Rule } from "@/components/ui";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-warm-cream ${className ?? ""}`}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 md:px-12">
      {/* Header */}
      <header className="pt-32 md:pt-48">
        <Skeleton className="mb-6 h-4 w-24" />
        <Skeleton className="h-10 w-full max-w-xl md:h-12" />
        <div className="mt-6 flex gap-x-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="mt-10 w-16 md:w-24">
          <Rule />
        </div>
      </header>

      {/* Content skeleton */}
      <div className="space-y-4 pb-16 pt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
        <div className="py-2" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        <div className="py-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </main>
  );
}
