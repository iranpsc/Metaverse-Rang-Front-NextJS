import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Like, Dislike, View, Comment } from "@/components/svgs/SvgEducation";

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
  stats: ArticleStats;
}

interface ArticleImageProps {
  article: Article;
}

const ArticleImage: React.FC<ArticleImageProps> = ({ article }) => {
  const formattedDate = format(new Date(article.date), "yyyy/MM/dd");

  return (
    <div className="w-full">
      {/* تصویر مقاله */}
      <div className="w-full h-[270px] md:h-[380px] xl:h-[450px] 2xl:h-[500px] 3xl:h-[600px] relative overflow-hidden rounded-2xl">
        <Image
          src={article.image || "/images/fallback.jpg"}
          alt={article.title}
          fill
          className="object-cover "
        />
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col gap-3">
        {/* آمار */}
        <div className="flex items-center text-xs md:text-base">
          <div className="flex items-center gap-4 md:gap-10 3xl:gap-20 text-textGray dark:text-[#888888] dark:text-gray-300">
            <div>
              <p className="md:px-4 px-2 py-1 rounded-full bg-dark-gray dark:bg-textGray hidden md:block">
                انجمن متاورس ایران
              </p>
            </div>
            <span>تاریخ انتشار : {formattedDate}</span>
            <span className="flex items-center gap-1">
              <Comment className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.comments}
            </span>
            <span className="flex items-center gap-1">
              <Like className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.likes}
            </span>
            <span className="flex items-center gap-1">
              <Dislike className="stroke-textGray dark:stroke-[#888888] size-[14px] md:size-[16px]" />
              {article.stats.dislikes}
            </span>
            <span className="flex items-center gap-1">
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
