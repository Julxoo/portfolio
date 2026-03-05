"use client";

import { useMemo, useState } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { PostSummary } from "@/lib/blog";
import { BlogPostList } from "./post-list";

interface BlogSearchViewProps {
  posts: PostSummary[];
  categories: string[];
}

const fuseOptions: IFuseOptions<PostSummary> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.25 },
    { name: "keyword", weight: 0.2 },
    { name: "tags", weight: 0.1 },
    { name: "category", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  ignoreDiacritics: true,
};

export function BlogSearchView({ posts, categories }: BlogSearchViewProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const fuse = useMemo(() => new Fuse(posts, fuseOptions), [posts]);

  const filtered = useMemo(() => {
    let result = posts;

    if (query.trim()) {
      result = fuse.search(query.trim()).map((r) => r.item);
    }

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }

    return result;
  }, [posts, fuse, query, activeCategory]);

  const isFiltering = query.trim() !== "" || activeCategory !== null;
  const filterKey = `${query}-${activeCategory}`;

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un article..."
          className="w-full border-b border-rule-light bg-transparent py-3 pl-7 pr-8 font-sans text-sm text-dark-chocolate placeholder:text-taupe/50 focus:border-camel focus:outline-none"
          style={{ transition: "border-color 300ms var(--ease-hover)" }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-taupe/60 transition-colors duration-200 hover:text-dark-chocolate"
            aria-label="Effacer la recherche"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : cat)}
              aria-pressed={isActive}
              className="font-sans text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 border transition-colors duration-300"
              style={{
                borderColor: isActive
                  ? "var(--color-camel)"
                  : "var(--color-rule-light)",
                backgroundColor: isActive
                  ? "var(--color-camel)"
                  : "transparent",
                color: isActive
                  ? "var(--color-parchment)"
                  : "var(--color-taupe)",
                transitionTimingFunction: "var(--ease-hover)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      {isFiltering && (
        <p className="mt-5 font-sans text-xs text-taupe/70">
          {filtered.length} {filtered.length > 1 ? "articles" : "article"}
          {filtered.length > 1 ? " correspondent" : " correspond"} à votre recherche
        </p>
      )}

      {/* Results */}
      <div className="mt-8" key={filterKey}>
        {filtered.length > 0 ? (
          <div className={isFiltering ? "animate-fade-in" : ""}>
            <BlogPostList posts={filtered} />
          </div>
        ) : (
          <p className="animate-fade-in py-12 text-center font-sans text-sm text-taupe/70">
            Aucun article ne correspond à votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}
