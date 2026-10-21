
type ArticleHeaderProps = {
  title: string;
  author: string;
  description: string;
  date: string;
};

/**
 * Normalize non-breaking spaces in HTML.
 * Fixes incorrect Persian text wrapping.
 */
function normalizeHtml(content: string): string {
  return content.replace(
    /&nbsp;|&#160;|&#xA0;|\u00A0/gi,
    " "
  );
}

export default function ArticleHeader({
  description,
}: ArticleHeaderProps) {
  const normalizedDescription = normalizeHtml(description);

  return (
    <div
      dir="auto"
      className="
        prose
        max-w-none
        min-w-0
        space-y-5
        text-sm
        break-normal
        whitespace-normal

        prose-p:leading-9

        prose-h1:text-sm
        prose-h2:text-sm
        prose-h3:text-sm
        prose-h4:text-sm

        md:prose-h1:text-2xl
        md:prose-h2:text-2xl
        md:prose-h3:text-2xl
        md:prose-h4:text-2xl

        lg:text-xl

        prose-p:text-[#484950]
        prose-a:text-primary

        dark:text-[#868B90]
        dark:prose-p:text-[#868B90]

        dark:prose-strong:text-white

        dark:prose-h1:text-white
        dark:prose-h2:text-white
        dark:prose-h3:text-white
        dark:prose-h4:text-white

        dark:prose-a:text-primary
      "
      dangerouslySetInnerHTML={{
        __html: normalizedDescription,
      }}
    />
  );
}
