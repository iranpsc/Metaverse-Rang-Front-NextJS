import React from 'react';
import Image from 'next/image';
type ArticleMetaProps = {
  author: string;
  date: string;
  excerpt: string;
  title:string;
};

export default function ArticleMeta({ author, date, excerpt, title }: ArticleMetaProps) {
  return (
    <div className='flex flex-col gap-5 w-full'>
       <h1>{title}</h1>
      <div className="flex items-center gap-2  text-sm text-gray-600">
        <div>
          <Image
            src="/rafiki-dark.png"
            alt="نویسنده"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className='flex flex-col '>
          <span>✍️ {author}</span>
          <span>📅 {date}</span>
        </div>
      </div>
      <div>
        <p>{excerpt}</p>
      </div>
    </div>
  );
}
