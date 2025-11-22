type ArticleHeaderProps = {

  description: string;
};

export default function ArticleHeader({ description }: ArticleHeaderProps) {
  return (
    <div
      className="prose max-w-none dark:text-[#868B90] prose-strong:dark:text-[#868B90] prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white  dark:prose-h2:text-white  dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow dark:prose-strong:text-white"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
