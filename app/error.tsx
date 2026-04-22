"use client";

import Link from "next/link";
import { Rule } from "@/components/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 md:px-12">
      <div className="pb-24 pt-32 md:pt-48">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
          Erreur
        </p>
        <h1
          className="font-serif font-light leading-[1.02] tracking-[-0.025em]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Quelque chose s&rsquo;est mal pass&eacute;
        </h1>
        <div className="mt-16 w-16 md:w-24">
          <Rule />
        </div>
        <p className="mt-12 max-w-2xl font-sans text-lg leading-[1.75] text-ink/75">
          Une erreur inattendue est survenue. Vous pouvez r&eacute;essayer ou
          revenir &agrave; l&rsquo;accueil.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          <button
            onClick={reset}
            className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:text-ochre"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            R&eacute;essayer
          </button>
          <Link
            href="/"
            className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:text-ochre"
            style={{ transitionTimingFunction: "var(--ease-hover)" }}
          >
            Retour &agrave; l&rsquo;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
