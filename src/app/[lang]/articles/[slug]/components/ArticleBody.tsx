import React from 'react';

type ArticleContentProps = {
  content: string;
};

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div
      className="prose max-w-none space-y-5 prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white  dark:prose-h2:text-white  dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
