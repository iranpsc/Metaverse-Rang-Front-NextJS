import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface ArticleMetaProps {
  author: {
    name: string;
    citizenId: string;
    avatar: string;
  };
  stats: {
    views: number;
  };
  date: string;
  title: string;
  excerpt: string;
  content?: string;
   mainData:{mainData:string}
  // optional برای جلوگیری از ارور
}

export default function ArticleMeta({
  author,
  date,
  excerpt,
  title,
  content,
  stats,
  mainData,
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
            <Link href={""} className="text-xs md:text-base text-blueLink dark:text-blue-500">
              {author.citizenId}
            </Link>
          </div>
        </div>
        <div className="flex flex-col  text-start justify-center ">
          <span className=" items-center gap-1 flex text-[10px] md:text-sm text-[#868B90] text-start md:hidden">
            <View className="stroke-textGray dark:stroke-[#888888] size-[16px]" />
            {stats.views}
          </span>
          <span className="text-[10px] md:text-sm text-[#868B90] text-start flex items-center gap-1">
            <span className="dark:text-white  text-base mt-[4px] ms-[-1px]">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="dark:stroke-[#888888] stroke-2" d="M15.5635 10.4375C15.5635 14.06 12.6235 17 9.00098 17C5.37848 17 2.43848 14.06 2.43848 10.4375C2.43848 6.815 5.37848 3.875 9.00098 3.875C12.6235 3.875 15.5635 6.815 15.5635 10.4375Z" stroke="#484950" stroke-linecap="round" stroke-linejoin="round" />
                <path className="dark:stroke-[#888888] stroke-2" d="M9 6.5V10.25" stroke="#484950" stroke-linecap="round" stroke-linejoin="round" />
                <path className="dark:stroke-[#888888] stroke-2" d="M6.75 2H11.25" stroke="#484950" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span>
              {findByUniqueId(mainData, 1503)}: {readingTime} {findByUniqueId(mainData, 33)}
            </span>
          </span>
        </div>
      </div>
      <div className="space-y-7">
        <h1 className="text-base md:leading-10 md:text-[32px] dark:text-white ">{title}</h1>
        {/* <p className="text-[#484950] dark:text-[#868B90] text-sm md:text-[22px] leading-8">
          {excerpt}
        </p> */}
      </div>
    </div>
  );
}
