// components/shared/NewsGallerySimple.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";

interface NewsGallerySimpleProps {
  gallery?: string[] | null;
  mainImage?: string;
}

export default function NewsGallerySimple({ gallery,  mainImage }: NewsGallerySimpleProps) {
  if (!gallery || gallery.length === 0) {
    return null;
  }

  const allImages = mainImage && !gallery.includes(mainImage) 
    ? [mainImage, ...gallery] 
    : gallery;

  return (
    <div className="w-full my-8">


      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {allImages.map((image, index) => (
          <div
            key={index}
            className="relative  rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 w-full aspect-video"
          >
            <Image
              src={image}
              alt={`${ "گالری"} - ${index + 1}`}
              fill
              className="object-cover "
              unoptimized={true}
              sizes="(max-width: 768px) 10vw, 15vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}