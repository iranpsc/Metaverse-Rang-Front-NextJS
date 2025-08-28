import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ArticleMetaProps {
  author: {
    name: string;
    citizenId: string;
    avatar:string;
  };
  date: string;
  title: string;
  excerpt: string;
  content?: string; // optional برای جلوگیری از ارور
}

export default function ArticleMeta({
  author,
  date,
  excerpt,
  title,
  content,
}: ArticleMetaProps) {
  // پاک کردن HTML و محاسبه تعداد کلمات
const plainText = content
  ? content
      .replace(/<[^>]+>/g, " ") // حذف تگ‌های HTML
      .replace(/\s+/g, " ") // همه فاصله‌ها و خطوط جدید را به یک فاصله تبدیل کن
      .trim()
  : "";

const words = plainText ? plainText.split(" ").length : 0;
const readingTime = Math.max(1, Math.ceil(words / 200)); // 200 کلمه در دقیقه


  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-base md:text-[32px] dark:text-white">{title}</h1>
      <div className="flex justify-between w-full ">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <Image
            src={author.avatar || "/articles/author/fallback-avatar.jpg"}
              alt={author.name}
              width={60}
              height={60}
              className="rounded-full aspect-square w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <span className="text-xs md:text-xl dark:text-white">
              {author.name}
            </span>
            <Link href={""} className="text-xs md:text-base text-blueLink">
              {author.citizenId}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-start justify-center ">
          <span className="text-xs md:text-base dark:text-white">
            تاریخ انتشار : <span className="text-[#868B90]">{date}</span>
          </span>
          <span className="text-xs md:text-sm text-[#868B90] text-start">
            ⏱ زمان مطالعه: {readingTime} دقیقه
          </span>
        </div>
      </div>
      <div>
        <p className="text-[#484950] dark:text-[#868B90] text-sm md:text-2xl">
          {excerpt}
        </p>
      </div>
    </div>
  );
}
