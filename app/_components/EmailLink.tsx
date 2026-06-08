"use client";

/**
 * EmailLink — adresse email composée côté client pour limiter le scrape
 * des bots naïfs. Les utilisateurs voient l'adresse en clair, les crawlers
 * basiques ne voient que des fragments.
 *
 * Concaténation au runtime (dans le JSX), pas dans un useEffect : le hook
 * garantit juste que le code s'exécute côté client via 'use client'.
 */
export function EmailLink() {
  const user = "toussenelj";
  const domain = ["gmail", "com"].join(".");
  const email = `${user}@${domain}`;

  return (
    <a
      href={`mailto:${email}`}
      className="text-ink underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep transition-[text-decoration-color] duration-quick ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
    >
      {email}
    </a>
  );
}
