
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Link from "next/link";
interface NewsStatsProps {
  stats: {
    views?: number;
    likes?: number;
    dislikes?: number;
    comments?: number;
  };
  category?: string | null;
  categorySlug?: string | null;
  date?: string | null;
  readingTime?: string | number | null;
  mainData: any;
  lang?: string;
  className?: string;
  showIcons?: boolean;
}

export default function NewsStats({
  stats,
  category,
categorySlug,
  date,
  readingTime,
  mainData,
  lang,
  className = "",
  showIcons = true,
}: NewsStatsProps) {
  // مقداردهی پیش‌فرض
  const views = stats?.views ?? 0;
  const likes = stats?.likes ?? 0;
  const dislikes = stats?.dislikes ?? 0;
  const comments = stats?.comments ?? 0;

  // فرمت کردن تاریخ شمسی


  return (
    <div className={`flex flex-wrap justify-between w-full items-center gap-4  text-xs md:text-base text-textGray dark:text-[#888888] ${className}`}>
      {/* دسته‌بندی */}
      {category && (
        <div className="flex items-center gap-1.5">
          <Link href={`/${lang}/news/categories/${categorySlug}`} className="font-medium text-light-primary dark:text-dark-yellow md:px-4 px-2 py-1 rounded-full border border-solid ">
            {category}
          </Link>
        </div>
      )}

      {/* تاریخ */}
      {date && (
        <div className="flex items-center gap-1.5">
          {showIcons && (
            <svg 
              className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" 
              />
            </svg>
          )}
          <span>{date}</span>
        </div>
      )}

      {/* زمان مطالعه */}
      {readingTime && (
        <div className="flex items-center gap-1.5">
          {showIcons && (
            <svg 
              className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )}
          <span>
            {findByUniqueId(mainData, 1503) || "زمان مطالعه"}: {readingTime}{" "}
            {findByUniqueId(mainData, 33) || "دقیقه"}
          </span>
        </div>
      )}

      {/* جداساز */}
      

      {/* بازدیدها */}
      <div className="flex items-center gap-1.5">
        {showIcons && <View className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" />}
        <span>{views.toLocaleString("fa-IR")}</span>
      </div>

      {/* لایک‌ها */}
      {likes >= 0 && (
        <div className="flex items-center gap-1.5">
          {showIcons && <Like className="fstroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" />}
          <span>{likes.toLocaleString("fa-IR")}</span>
        </div>
      )}

      {/* دیسلایک‌ها */}
      {dislikes >= 0 && (
        <div className="flex items-center gap-1.5">
          {showIcons && <Dislike className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" />}
          <span>{dislikes.toLocaleString("fa-IR")}</span>
        </div>
      )}

      {/* کامنت‌ها */}
      {comments >= 0 && (
        <div className="flex items-center gap-1.5">
          {showIcons && <Comment className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[20px]" />}
          <span>{comments.toLocaleString("fa-IR")}</span>
        </div>
      )}
    </div>
  );
}