"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          backgroundColor: "#F5F1E8",
          color: "#1A1A1A",
          fontFamily: "Inter, system-ui, sans-serif",
          margin: 0,
        }}
      >
        <main
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "8rem 1.5rem 6rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#9E978A",
              marginBottom: "2rem",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
            }}
          >
            Erreur critique
          </p>
          <h1
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Une erreur inattendue est survenue
          </h1>
          <hr
            style={{
              height: "1px",
              border: "none",
              backgroundColor: "#D4CEC1",
              marginTop: "4rem",
            }}
          />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.75,
              color: "rgba(26, 26, 26, 0.75)",
              maxWidth: "42rem",
              marginTop: "3rem",
            }}
          >
            Le site a rencontr&eacute; un probl&egrave;me. Veuillez
            r&eacute;essayer.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#1A1A1A",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            R&eacute;essayer
          </button>
        </main>
      </body>
    </html>
  );
}
