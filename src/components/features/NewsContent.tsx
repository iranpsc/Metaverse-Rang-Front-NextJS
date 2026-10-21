
"use client";

import { useEffect, useMemo, useState } from "react";
import NewsGallery from "./NewsGallery";

type NewsContentProps = {
  content: string;
  gallery?: string[] | null;
  mainImage?: string;
  galleryTitle?: string;
  params: any;
};

type ClosingTag = {
  position: number;
};

/**
 * Normalize non-breaking spaces without changing HTML structure.
 */
function normalizeHtml(content: string): string {
  return content.replace(
    /&nbsp;|&#160;|&#xA0;|&#x0*A0;|&#x0*160;|\u00A0/gi,
    " ",
  );
}

/**
 * Shared styles for all news content sections.
 */
const contentClassName = `
  prose
  max-w-none
  min-w-0
  break-words
  [overflow-wrap:anywhere]
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
`;

/**
 * Find a suitable insertion position after the third paragraph/list,
 * keeping the original HTML unchanged.
 */
function findInsertPosition(htmlContent: string): number {
  const closingTags: ClosingTag[] = [];
  const closingTagRegex = /<\/(?:p|ul|ol)\s*>/gi;

  let match: RegExpExecArray | null;

  while ((match = closingTagRegex.exec(htmlContent)) !== null) {
    closingTags.push({
      position: match.index + match[0].length,
    });
  }

  if (closingTags.length >= 3) {
    return closingTags[2].position;
  }

  if (closingTags.length > 0) {
    return closingTags[closingTags.length - 1].position;
  }

  return -1;
}

const GallerySkeleton = () => (
  <div
    className="relative my-8 w-full overflow-hidden"
    aria-hidden="true"
  >
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            relative
            aspect-video
            overflow-hidden
            rounded-xl
            bg-neutral-200
            dark:bg-neutral-800
          "
        >
          <div
            className="
              absolute
              inset-0
              -translate-x-full
              animate-[shimmer_1.5s_infinite]
              bg-linear-to-r
              from-transparent
              via-white/20
              to-transparent
            "
          />
        </div>
      ))}
    </div>
  </div>
);

export default function NewsContent({
  content,
  gallery,
  mainImage,
  params,
}: NewsContentProps) {
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [showRealGallery, setShowRealGallery] = useState(false);

  const normalizedContent = useMemo(
    () => normalizeHtml(content),
    [content],
  );

  const hasGallery = Boolean(gallery?.length);

  useEffect(() => {
    if (!hasGallery) {
      setIsGalleryLoading(false);
      setShowRealGallery(false);
      return;
    }

    setIsGalleryLoading(true);
    setShowRealGallery(false);

    const timer = setTimeout(() => {
      setIsGalleryLoading(false);
      setShowRealGallery(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [hasGallery, gallery]);

  const renderContentWithGallery = useMemo(() => {
    if (!hasGallery) {
      return {
        before: normalizedContent,
        after: null as string | null,
      };
    }

    const insertPosition = findInsertPosition(normalizedContent);

    if (
      insertPosition > 0 &&
      insertPosition < normalizedContent.length
    ) {
      return {
        before: normalizedContent.slice(0, insertPosition),
        after: normalizedContent.slice(insertPosition),
      };
    }

    return {
      before: normalizedContent,
      after: null as string | null,
    };
  }, [normalizedContent, hasGallery]);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      {/* Content before the gallery */}
      <div
        dir="auto"
        className={contentClassName}
        dangerouslySetInnerHTML={{
          __html: renderContentWithGallery.before,
        }}
      />

      {/* Gallery and loading skeleton */}
      {hasGallery && (
        <>
          {isGalleryLoading && <GallerySkeleton />}

          {!isGalleryLoading && showRealGallery && (
            <NewsGallery
              gallery={gallery!}
              mainImage={mainImage}
              params={params.lang}
            />
          )}
        </>
      )}

      {/* Content after the gallery */}
      {renderContentWithGallery.after && (
        <div
          dir="auto"
          className={contentClassName}
          dangerouslySetInnerHTML={{
            __html: renderContentWithGallery.after,
          }}
        />
      )}
    </div>
  );
}
