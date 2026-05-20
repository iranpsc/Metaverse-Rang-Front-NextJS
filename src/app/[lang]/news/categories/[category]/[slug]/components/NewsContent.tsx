// components/news/NewsContent.tsx

"use client";

import React, { useMemo, useState, useEffect } from "react";
import NewsGallery from "./NewsGallery";

type NewsContentProps = {
  content: string;
  gallery?: string[] | null;
  mainImage?: string;
  galleryTitle?: string;
  params: any;
};

// کامپوننت اسکلت لودینگ گالری با افکت shimmer
const GallerySkeleton = () => {
  return (
    <div className="w-full my-8 relative overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative aspect-video rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function NewsContent({
  content,
  gallery,
  mainImage,
  params
}: NewsContentProps) {
  const [isGalleryLoading, setIsGalleryLoading] = useState(true);
  const [showRealGallery, setShowRealGallery] = useState(false);

  // شبیه‌سازی لودینگ گالری
  useEffect(() => {
    if (!gallery || gallery.length === 0) {
      setIsGalleryLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsGalleryLoading(false);
      setShowRealGallery(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [gallery]);

  // تابع برای پیدا کردن موقعیت مناسب بعد از پاراگراف سوم یا لیست دوم
  const findInsertPosition = (htmlContent: string): number => {
    const closingTags: { position: number; type: string }[] = [];
    let searchIndex = 0;

    // پیدا کردن پاراگراف‌ها
    while (true) {
      const pClose = htmlContent.indexOf("</p>", searchIndex);
      if (pClose === -1) break;
      closingTags.push({ position: pClose + 4, type: "p" });
      searchIndex = pClose + 4;
    }

    // پیدا کردن لیست‌های نامرتب (ul)
    searchIndex = 0;
    while (true) {
      const ulClose = htmlContent.indexOf("</ul>", searchIndex);
      if (ulClose === -1) break;
      closingTags.push({ position: ulClose + 5, type: "ul" });
      searchIndex = ulClose + 5;
    }

    // پیدا کردن لیست‌های مرتب (ol)
    searchIndex = 0;
    while (true) {
      const olClose = htmlContent.indexOf("</ol>", searchIndex);
      if (olClose === -1) break;
      closingTags.push({ position: olClose + 5, type: "ol" });
      searchIndex = olClose + 5;
    }

    closingTags.sort((a, b) => a.position - b.position);

    // پیدا کردن سومین عنصر (پاراگراف یا لیست)
    if (closingTags.length >= 3) {
      const thirdElement = closingTags[2];
      let insertPos = thirdElement.position;

      const remainingContent = htmlContent.slice(insertPos);
      const nextListIndex = Math.min(
        remainingContent.indexOf("<ul>") !== -1
          ? remainingContent.indexOf("<ul>")
          : Infinity,
        remainingContent.indexOf("<ol>") !== -1
          ? remainingContent.indexOf("<ol>")
          : Infinity
      );

      const nextPIndex = remainingContent.indexOf("<p>");

      if (
        nextListIndex !== Infinity &&
        (nextListIndex < nextPIndex || nextPIndex === -1)
      ) {
        const listTag =
          remainingContent[nextListIndex] === "<" &&
          remainingContent[nextListIndex + 1] === "u"
            ? "ul"
            : "ol";
        const listCloseTag = `</${listTag}>`;
        const listEndIndex = remainingContent.indexOf(listCloseTag);

        if (listEndIndex !== -1) {
          insertPos = insertPos + listEndIndex + listCloseTag.length;
        }
      }

      return insertPos;
    }

    if (closingTags.length > 0) {
      return closingTags[closingTags.length - 1].position;
    }

    return -1;
  };

  // تابع برای تقسیم محتوا
  const renderContentWithGallery = useMemo(() => {
    if (!gallery || gallery.length === 0) {
      return { before: content, after: null, showGallery: false };
    }

    const insertPosition = findInsertPosition(content);

    if (insertPosition !== -1 && insertPosition < content.length) {
      return {
        before: content.slice(0, insertPosition),
        after: content.slice(insertPosition),
        showGallery: true,
      };
    }

    return { before: content, after: null, showGallery: true };
  }, [content, gallery]);

  // اگر گالری وجود ندارد
  if (!renderContentWithGallery.showGallery || !gallery || gallery.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div
          className="prose max-w-none prose-strong:dark:text-[#868B90] dark:text-[#868B90] prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* بخش اول محتوا (قبل از گالری) */}
      <div
        className="prose max-w-none prose-strong:dark:text-[#868B90] dark:text-[#868B90] prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow"
        dangerouslySetInnerHTML={{ __html: renderContentWithGallery.before }}
      />

      {/* اسکلت لودینگ گالری */}
      {isGalleryLoading && <GallerySkeleton />}

      {/* گالری واقعی */}
      {!isGalleryLoading && showRealGallery && gallery && (
        <NewsGallery gallery={gallery} mainImage={mainImage}  params={params.lang}/>
      )}

      {/* بخش دوم محتوا (بعد از گالری) */}
      {renderContentWithGallery.after && (
        <div
          className="prose max-w-none prose-strong:dark:text-[#868B90] dark:text-[#868B90] prose-p:leading-9 space-y-5 text-sm prose-h1:text-sm prose-h2:text-sm prose-h3:text-sm prose-h4:text-sm lg:text-xl md:prose-h1:text-2xl md:prose-h2:text-2xl md:prose-h3:text-2xl md:prose-h-4:text-2xl md:prose-p:text-[#484950] dark:prose-p:text-[#868B90] dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white prose-a:text-blueLink dark:prose-a:text-dark-yellow"
          dangerouslySetInnerHTML={{ __html: renderContentWithGallery.after }}
        />
      )}
    </div>
  );
}