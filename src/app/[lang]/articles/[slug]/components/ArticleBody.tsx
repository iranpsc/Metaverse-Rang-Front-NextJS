import React from 'react';

type ArticleContentProps = {
  content: string;
};

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div
      className="prose max-w-none space-y-5"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
