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
          backgroundColor: "#F0E6D9",
          color: "#2C2420",
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
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#8C7E6E",
              marginBottom: "2rem",
            }}
          >
            Erreur critique
          </p>
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Une erreur inattendue est survenue
          </h1>
          <hr
            style={{
              height: "1px",
              border: "none",
              backgroundColor: "#D6CFC5",
              marginTop: "4rem",
            }}
          />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(44, 36, 32, 0.8)",
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
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#2C2420",
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
