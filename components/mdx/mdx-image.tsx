import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function MdxImage({
  src,
  alt,
  width = 800,
  height = 450,
}: MdxImageProps) {
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        placeholder="empty"
        className="w-full border border-rule-light"
      />
      {alt && (
        <figcaption className="mt-3 text-center font-sans text-xs text-taupe">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
