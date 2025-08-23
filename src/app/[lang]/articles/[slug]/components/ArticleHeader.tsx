type ArticleHeaderProps = {

  description: string;
};

export default function ArticleHeader({ description }: ArticleHeaderProps) {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
