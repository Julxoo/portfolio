"use client";

import localFont from "next/font/local";
import "./globals.css";
import "lenis/dist/lenis.css";

const clashDisplay = localFont({
  src: "./_fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  display: "swap",
  variable: "--font-clash",
});

const cabinetGrotesk = localFont({
  src: "./_fonts/CabinetGrotesk-Variable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-cabinet",
});

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

/**
 * global-error.tsx — fallback si le layout racine (app/layout.tsx) crashe.
 *
 * À ce niveau, ni Header, ni Footer, ni Lenis ne sont disponibles — on
 * rend une page nue qui contient son propre <html> et <body>. Objectif :
 * rester lisible et récupérable, rien de plus.
 *
 * generateMetadata() n'est pas supporté ici (Next 16 docs) — on met
 * juste un <title> via React 19.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${cabinetGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-bg">
        <title>Incident — Jules Toussenel</title>

        <section
          role="alert"
          className="flex-1 flex flex-col justify-center px-gutter py-section-xl"
        >
          <div className="max-w-default mx-auto w-full">
            <div
              aria-hidden
              className="font-display italic text-accent-deep/40 text-[clamp(8rem,18vw,14rem)] leading-none mb-8"
            >
              500
            </div>

            <h1 className="font-display text-display text-ink max-w-[18ch] mb-8">
              Un <em className="italic text-surface">incident majeur</em>.
            </h1>

            <p className="font-display text-lead text-ink/75 max-w-[52ch] mb-10">
              Le site est temporairement inaccessible. Réessayez dans
              un instant, ou écrivez à{" "}
              <a
                href="mailto:toussenelj@gmail.com"
                className="text-ink underline underline-offset-[3px]"
              >
                toussenelj@gmail.com
              </a>
              .
            </p>

            <button
              type="button"
              onClick={() => unstable_retry()}
              className="inline-flex items-center gap-2 bg-ink text-bg px-5 py-3 font-sans text-[15px] font-medium hover:bg-accent-deep transition-colors duration-quick ease-out-quint motion-reduce:transition-none"
            >
              Réessayer
              <span aria-hidden className="font-display italic">
                →
              </span>
            </button>

            {error.digest && (
              <p className="mt-16 pt-6 border-t border-rule font-mono text-caption text-ink/50">
                Référence incident : <code>{error.digest}</code>
              </p>
            )}
          </div>
        </section>
      </body>
    </html>
  );
}
