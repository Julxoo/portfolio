import Link from "next/link";
import Image from "next/image";
import { Tag } from "./Tag";

// =====================================================================
// CardProject — vignette projet, deux modes.
//
// Mode "image" (featured) : eyebrow + image + titre serif italique + teaser + tags + flèche.
// Mode "silence" (archive, à la Joseph Dirand) : ligne typographique, filet top, pas d'image.
//
// Zone cliquable : <a> autour du titre uniquement, étendue à toute la card via
// ::after { inset: 0 }. Pattern Kitty Giraudel / Heydon Pickering — le screen
// reader n'annonce que le titre, pas toute la prose.
// =====================================================================

type Ratio = "3/2" | "4/5";

type CardProjectImageProps = {
  mode?: "image";
  ratio?: Ratio;
  eyebrow: string;
  title: string;
  teaser?: string;
  tags?: string[];
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

type CardProjectSilenceProps = {
  mode: "silence";
  eyebrow: string;
  title: string;
  typeLabel: string;
  href: string;
};

type CardProjectProps = CardProjectImageProps | CardProjectSilenceProps;

export function CardProject(props: CardProjectProps) {
  if (props.mode === "silence") {
    const { eyebrow, title, typeLabel, href } = props;
    return (
      <article className="group relative border-t border-rule">
        <Link
          href={href}
          className="grid md:grid-cols-[8rem_1fr_8rem_auto] items-baseline gap-x-6 gap-y-2 py-6 after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep"
        >
          <span className="font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
            {eyebrow}
          </span>
          <h3 className="font-display italic text-[1.3rem] text-ink leading-tight">
            {title}
          </h3>
          <span className="font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
            {typeLabel}
          </span>
          <span
            aria-hidden
            className="font-display italic text-[1.1rem] text-ink transition-transform duration-quick ease-out-quint group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </Link>
      </article>
    );
  }

  const {
    ratio = "3/2",
    eyebrow,
    title,
    teaser,
    tags = [],
    href,
    imageSrc,
    imageAlt,
  } = props;

  const aspectClass = ratio === "3/2" ? "aspect-[3/2]" : "aspect-[4/5]";

  return (
    <article className="group relative transition-transform duration-quick ease-out-quint hover:-translate-y-[2px] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="mb-3 font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
        {eyebrow}
      </p>

      <div className={`relative mb-5 ${aspectClass} overflow-hidden bg-accent-warm/25`}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
        ) : (
          <div className="size-full bg-surface" aria-hidden />
        )}
      </div>

      <h3 className="font-display italic text-[clamp(1.4rem,2.4vw,1.75rem)] leading-tight text-ink">
        <Link
          href={href}
          className="pb-1 border-b border-transparent transition-[border-color] duration-quick ease-out-quint group-hover:border-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
        >
          {title}
        </Link>
      </h3>

      {teaser && (
        <p className="mt-3 max-w-[48ch] text-body text-ink/70">{teaser}</p>
      )}

      <div className="mt-5 flex items-baseline justify-between gap-4">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 relative z-[2]">
            {tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : (
          <span />
        )}
        <span
          aria-hidden
          className="font-display italic text-[1.3rem] text-ink transition-transform duration-quick ease-out-quint group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          →
        </span>
      </div>
    </article>
  );
}

// =====================================================================
// CardArticle — card article blog / journal.
// Structure proche de CardProject mais : image facultative, pas de tags
// (catégorie dans l'eyebrow), date à la fin.
// =====================================================================

type CardArticleProps = {
  eyebrow: string;
  title: string;
  excerpt?: string;
  date: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function CardArticle({
  eyebrow,
  title,
  excerpt,
  date,
  href,
  imageSrc,
  imageAlt,
}: CardArticleProps) {
  return (
    <article className="group relative transition-transform duration-quick ease-out-quint hover:-translate-y-[2px] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <p className="mb-3 font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
        {eyebrow}
      </p>

      {imageSrc && (
        <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-accent-warm/25">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
        </div>
      )}

      <h3 className="font-display italic text-[1.4rem] leading-tight text-ink">
        <Link
          href={href}
          className="pb-1 border-b border-transparent transition-[border-color] duration-quick ease-out-quint group-hover:border-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-deep motion-reduce:transition-none"
        >
          {title}
        </Link>
      </h3>

      {excerpt && (
        <p className="mt-3 max-w-[48ch] text-body text-ink/70">{excerpt}</p>
      )}

      <time className="mt-4 block font-sans text-[11px] tracking-[0.12em] small-caps text-ink/65">
        {date}
      </time>
    </article>
  );
}

// =====================================================================
// CardTestimonial — citation client avec attribution.
// Pas d'image. Structure <figure> + <blockquote> + <figcaption>.
// =====================================================================

type CardTestimonialProps = {
  quote: string;
  author: string;
  role: string;
  projectHref?: string;
  projectLabel?: string;
};

export function CardTestimonial({
  quote,
  author,
  role,
  projectHref,
  projectLabel,
}: CardTestimonialProps) {
  return (
    <figure className="max-w-[56ch]">
      <blockquote className="font-display italic text-[clamp(1.4rem,2.3vw,1.85rem)] leading-[1.3] text-ink">
        « {quote} »
      </blockquote>
      <figcaption className="mt-6 text-body text-ink/75">
        — {author}, {role}
        {projectHref && projectLabel && (
          <>
            {" · "}
            <Link
              href={projectHref}
              className="underline underline-offset-[3px] decoration-1 decoration-ink/40 hover:decoration-accent-deep transition-[text-decoration-color] duration-quick ease-out-quint motion-reduce:transition-none"
            >
              {projectLabel}
            </Link>
          </>
        )}
      </figcaption>
    </figure>
  );
}
