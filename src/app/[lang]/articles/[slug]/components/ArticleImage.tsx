import React from 'react';
import Image from 'next/image';
type ArticleImageProps = {
  src: string;
  alt: string;
};

export default function ArticleImage({ src, alt }: ArticleImageProps) {
  return (
    <div className="w-full h-64 relative">
      <Image
        src="/rafiki-dark.png" // مسیر تصویر رو عوض کن (از تصویر آپلودیت استفاده کن)
        alt="هوش مصنوعی"
        fill
        className="object-cover"
      />
    </div>
  );
}
