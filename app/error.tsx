"use client";

import { useEffect } from "react";
import { Button } from "./_lib/ui/Button";
import { SlideLink } from "./_lib/ui/Link";

type ErrorProps = {
  error: Error & { digest?: string };
  /** Next.js 16.2+ — relance la requête et re-rend les children. */
  unstable_retry: () => void;
  /** API historique — réinitialise l'error boundary sans re-fetcher. */
  reset?: () => void;
};

/**
 * error.tsx — error boundary root (toutes les routes sauf layout racine).
 *
 * Client component obligatoire. Reçoit l'erreur + la fonction de retry
 * Next.js 16.2 `unstable_retry()` qui re-fetch et re-render la boundary.
 *
 * Affichage aligné gauche, cohérent avec la 404 et les heros. Pas de
 * stack trace en prod (Next masque déjà `error.message`). `error.digest`
 * sert à corréler aux logs serveur si le client signale l'incident.
 */
export default function ErrorBoundary({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    // Hook d'intégration future (Sentry, logs, analytics).
    // En dev, on laisse la stack visible dans la console Next.
    if (process.env.NODE_ENV === "development") {
      console.error("[error.tsx]", error);
    }
  }, [error]);

  return (
    <section
      role="alert"
      className="flex-1 flex flex-col justify-center px-gutter py-section-xl bg-bg"
    >
      <div className="max-w-default mx-auto w-full">
        <div
          aria-hidden
          className="font-display italic text-accent-deep/40 text-[clamp(8rem,18vw,14rem)] leading-none mb-8"
        >
          500
        </div>

        <h1 className="font-display text-display text-ink max-w-[18ch] mb-8">
          Un <em className="italic text-surface">incident</em>
          {" "}côté serveur.
        </h1>

        <p className="font-display text-lead text-ink/75 max-w-[52ch] mb-10">
          Vous pouvez réessayer dans un instant, ou revenir au sommaire.
          Si l&apos;incident persiste, écrivez à{" "}
          <a
            href="mailto:toussenelj@gmail.com"
            className="text-ink underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep transition-[text-decoration-color] duration-quick ease-out-quint motion-reduce:transition-none"
          >
            toussenelj@gmail.com
          </a>
          .
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button onClick={() => unstable_retry()} trailingArrow>
            Réessayer
          </Button>
          <SlideLink href="/">Revenir au sommaire</SlideLink>
        </div>

        {error.digest && (
          <p className="mt-16 pt-6 border-t border-rule font-mono text-caption text-ink/50">
            Référence incident : <code>{error.digest}</code>
          </p>
        )}
      </div>
    </section>
  );
}
