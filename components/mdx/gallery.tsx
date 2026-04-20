import Image from "next/image";

const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAB3RJTUUH6QMEAAEAATkMogAAAAxJREFUGFdjYKAeAAAAeAAB7tJRhAAAAABJRU5ErkJggg==" as const;

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** Natural width of the source image. Used to preserve aspect ratio. Default 1440. */
  width?: number;
  /** Natural height of the source image. Default 900. */
  height?: number;
}

interface GalleryProps {
  images: GalleryImage[];
  /** Number of columns on md+. Mobile always stacks to 1 col. Default 2. */
  columns?: 2 | 3;
  /** Optional caption below the full grid. */
  caption?: string;
  /**
   * `inline` (default) · stays inside the article column.
   * `wide` · breaks out slightly on desktop for more breathing room.
   */
  variant?: "inline" | "wide";
}

const colsClass: Record<2 | 3, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

const figureClass: Record<"inline" | "wide", string> = {
  inline: "my-12",
  wide: "my-14 md:-mx-8 lg:-mx-16",
};

export function Gallery({
  images,
  columns = 2,
  caption,
  variant = "inline",
}: GalleryProps) {
  const sizes =
    columns === 3
      ? "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px";

  return (
    <figure className={figureClass[variant]}>
      <div className={`grid gap-3 md:gap-4 ${colsClass[columns]}`}>
        {images.map((img) => (
          <div key={img.src} className="flex flex-col">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width ?? 1440}
              height={img.height ?? 900}
              sizes={sizes}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="w-full border border-rule-light"
            />
            {img.caption && (
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.12em] text-taupe">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
      {caption && (
        <figcaption className="mt-5 font-sans text-[11px] uppercase tracking-[0.12em] text-taupe">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
