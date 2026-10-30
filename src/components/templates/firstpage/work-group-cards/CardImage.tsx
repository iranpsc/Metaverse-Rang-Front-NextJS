"use client";

import Image from "next/image";
import { useState } from "react";

interface CardImageProps {
  src: string;
  alt: string;
}

/** Client component only because it needs an onError fallback; the card itself stays on the server. */
export default function CardImage({ src, alt }: CardImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl bg-primary/10">
      {failed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-primary/40 via-primary/10 to-primary/5"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.07] motion-reduce:transition-none"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
