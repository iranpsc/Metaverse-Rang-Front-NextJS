
type Tag = {
  label: string;
  slug: string;
};

type ArticleContentProps = {
  content: string;
  tags?: Tag[];
};

/**
 * Convert non-breaking spaces to normal spaces.
 * Prevents incorrect text wrapping in Persian articles.
 */
function normalizeHtml(content: string): string {
  return content.replace(
    /&nbsp;|&#160;|&#xA0;|\u00A0/gi,
    " "
  );
}

export default function ArticleContent({
  content,
  tags = [],
}: ArticleContentProps) {
  const normalizedHtml = normalizeHtml(content);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {/* Article body */}
      <div
        dir="auto"
        className="
          prose
          max-w-none
          min-w-0
          space-y-5
          text-sm

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
          dark:prose-strong:text-[#868B90]

          dark:prose-h1:text-white
          dark:prose-h2:text-white
          dark:prose-h3:text-white
          dark:prose-h4:text-white

          dark:prose-a:text-primary

          prose-img:max-w-full
          prose-img:h-auto

          prose-table:block
          prose-table:max-w-full
          prose-table:overflow-x-auto
        "
        dangerouslySetInnerHTML={{
          __html: normalizedHtml,
        }}
      />

      {/* Article tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4">
          {tags.map((tag) => (
            <span
              key={tag.slug}
              className="
                flex
                items-center
                gap-1
                rounded-full
                px-3
                py-1
                text-sm
                text-[#868B90]
                md:text-xl
              "
            >
              <svg
                className="size-5 shrink-0"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  className="dark:stroke-white"
                  d="M4.17038 15.7998L8.70038 20.3298C10.5604 22.1898 13.5804 22.1898 15.4504 20.3298L19.8404 15.9398C21.7004 14.0798 21.7004 11.0598 19.8404 9.1898L15.3004 4.6698C14.3504 3.7198 13.0404 3.2098 11.7004 3.2798L6.70038 3.5198C4.70038 3.6098 3.11038 5.1998 3.01038 7.1898L2.77038 12.1898C2.71038 13.5398 3.22038 14.8498 4.17038 15.7998Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="dark:stroke-white"
                  d="M9.5 12.5C10.8807 12.5 12 11.3807 12 10C12 8.61929 10.8807 7.5 9.5 7.5C8.11929 7.5 7 8.61929 7 10C7 11.3807 8.11929 12.5 9.5 12.5Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <span>{tag.label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
