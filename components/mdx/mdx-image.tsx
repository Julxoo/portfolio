import Image from "next/image";

/** 8x8 parchment-colored placeholder (matches site background) */
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAB3RJTUUH6QMEAAEAATkMogAAAAxJREFUGFdjYKAeAAAAeAAB7tJRhAAAAABJRU5ErkJggg==" as const;

type MdxImageVariant = "inline" | "wide" | "full" | "mobile";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Optional caption shown below the image. If omitted, no caption is displayed. */
  caption?: string;
  /**
   * `inline` (default) · fits inside the article column.
   * `wide` · breaks out slightly with negative margin (desktop only).
   * `full` · maximum breakout, full article grid width.
   * `mobile` · capped width, centered · for portrait phone screenshots.
   */
  variant?: MdxImageVariant;
}

const figureClass: Record<MdxImageVariant, string> = {
  inline: "my-10",
  wide: "my-12 md:-mx-8 lg:-mx-16",
  full: "my-14 md:-mx-12 lg:-mx-24",
  mobile: "my-10 mx-auto max-w-[260px] md:max-w-[300px]",
};

export function MdxImage({
  src,
  alt,
  width = 1440,
  height = 900,
  caption,
  variant = "inline",
}: MdxImageProps) {
  return (
    <figure className={figureClass[variant]}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={
          variant === "inline"
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 720px"
            : "(max-width: 768px) 100vw, 1000px"
        }
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        className="w-full border border-rule-light"
      />
      {caption && (
        <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
