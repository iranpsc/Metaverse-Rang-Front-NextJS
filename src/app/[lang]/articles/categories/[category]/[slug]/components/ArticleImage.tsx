import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";
import Link from "next/link";

interface ArticleStats {
  comments: number;
  likes: number;
  dislikes: number;
  views: number;
}

interface Article {
  date: string;
  image?: string;
  title: string;
  category: string;
  stats: ArticleStats;
}

interface Params {
  lang: string;
  category?: string; // optional in case you want to fallback to article.category
}

interface ArticleImageProps {
  article: Article;
  params?: Params; // make params optional and provide fallbacks
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article, params }) => {
  // تبدیل و اعتبارسنجی تاریخ
  const dateObj = article.date ? new Date(article.date) : null;
  const formattedDate =
    dateObj && !isNaN(dateObj.getTime())
      ? format(dateObj, "yyyy/MM/dd")
      : "—";

  // fallback برای پارامترها
  const lang = params?.lang ?? "fa"; // یا "en" بسته به پیش‌فرض شما
  const categoryForLink = params?.category ?? article.category ?? "all";

  return (
    <div className="w-full">
      {/* تصویر مقاله */}
      <div className="w-full h-[270px] md:h-[380px] xl:h-[450px] 2xl:h-[500px] 3xl:h-[600px] relative overflow-hidden rounded-2xl">
        <Image
          src={article.image || "/images/fallback.jpg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center text-xs md:text-base w-full">
          <div className="flex items-center gap-4 md:gap-10 justify-between w-full text-textGray dark:text-[#888888] dark:text-gray-300">
            <div>
              <Link
                href={`/${lang}/articles/categories/${categoryForLink}`}
                className="md:px-4 px-2 py-1 rounded-full border border-solid "
              >
                {article.category}
              </Link>
            </div>

            <span>تاریخ انتشار : {formattedDate}</span>

            <span className="items-center gap-1 hidden md:flex">
              <Comment className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.comments}
            </span>
            <span className="items-center gap-1 hidden md:flex">
              <Like className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.likes}
            </span>
            <span className="items-center gap-1 hidden md:flex">
              <Dislike className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.dislikes}
            </span>
            <span className="items-center gap-1 hidden md:flex">
              <View className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleImage;
