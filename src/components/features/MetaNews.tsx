import React from "react";
import Image from "next/image";
import Link from "next/link";
import { View } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface NewsMetaProps {
  author: {
    name: string;
    citizenId: string;
    avatar: string;
    bio?: string;
    field?: string;
  } | string; // می‌تواند string (JSON) یا object باشد
  stats: {
    views: number;
    likes?: number;
    dislikes?: number;
    comments?: number;
  };
  // date?: string | null;
  title: string;
  excerpt?: string;
  content?: any;
  mainData: { mainData: string };
  lang: string;
}

// تابع کمکی برای تبدیل author به object
function parseAuthor(author: NewsMetaProps['author']): {
  name: string;
  citizenId: string;
  avatar: string;
  bio?: string;
  field?: string;
} {
  // اگر已經是 object
  if (typeof author === 'object' && author !== null && !Array.isArray(author)) {
    return {
      name: author.name || "نویسنده",
      citizenId: author.citizenId || "",
      avatar: author.avatar || "/clogo.png",
      bio: author.bio,
      field: author.field,
    };
  }
  
  // اگر string است، try to parse as JSON
  if (typeof author === 'string') {
    try {
      const parsed = JSON.parse(author);
      return {
        name: parsed.name || "نویسنده",
        citizenId: parsed.citizenId || "",
        avatar: parsed.avatar || "/clogo.png",
        bio: parsed.bio,
        field: parsed.field,
      };
    } catch (e) {
      console.error("Failed to parse author JSON:", e);
    }
  }
  
  // fallback
  return {
    name: "نویسنده",
    citizenId: "",
    avatar: "/clogo.png",
  };
}

export default function NewsMeta({
  author,
  // date,
  // excerpt,
  title,
  content,
  stats,
  mainData,
  lang
}: NewsMetaProps) {
  // تبدیل author به object معتبر
  const parsedAuthor = parseAuthor(author);
  
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
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div>
            <Image
              src={parsedAuthor.avatar || "/clogo.png"}
              alt={parsedAuthor.name}
              width={60}
              height={60}
              className="rounded-full aspect-square w-[50px] h-[50px] md:w-[80px] md:h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <span className="text-xs md:text-xl dark:text-white">
              {parsedAuthor.name}
            </span>
            {parsedAuthor.citizenId && (
              <Link 
                href={`/${lang}/citizens/${parsedAuthor.citizenId}`} 
                className="text-xs md:text-base text-blueLink dark:text-blue-500 uppercase"
              >
                {parsedAuthor.citizenId}
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex flex-col text-start justify-center">
          <span className="items-center gap-1 flex text-[10px] md:text-sm text-[#868B90] text-start md:hidden">
            <View className="stroke-textGray dark:stroke-[#888888] size-[16px]" />
            {stats?.views ?? 0}
          </span>
          <span className="text-[10px] md:text-sm text-[#868B90] text-start flex items-center gap-1">
            <span className="dark:text-white text-base mt-[4px] ms-[-1px]">
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  className="dark:stroke-[#888888] stroke-2" 
                  d="M15.5635 10.4375C15.5635 14.06 12.6235 17 9.00098 17C5.37848 17 2.43848 14.06 2.43848 10.4375C2.43848 6.815 5.37848 3.875 9.00098 3.875C12.6235 3.875 15.5635 6.815 15.5635 10.4375Z" 
                  stroke="#484950" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  className="dark:stroke-[#888888] stroke-2" 
                  d="M9 6.5V10.25" 
                  stroke="#484950" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                <path 
                  className="dark:stroke-[#888888] stroke-2" 
                  d="M6.75 2H11.25" 
                  stroke="#484950" 
                  strokeMiterlimit="10" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </span>
            <span>
              {findByUniqueId(mainData, 1503) || "زمان مطالعه"}: {readingTime} {findByUniqueId(mainData, 33) || "دقیقه"}
            </span>
          </span>
        </div>
      </div>
      
      <div className="space-y-7">
        <h1 className="text-base md:leading-10 md:text-[32px] dark:text-white">{title}</h1>
        {/* optionally uncomment excerpt */}
        {/* {excerpt && (
          <p className="text-[#484950] dark:text-[#868B90] text-sm md:text-[22px] leading-8">
            {excerpt}
          </p>
        )} */}
      </div>
    </div>
  );
}