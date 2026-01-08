"use client";

import Link from "next/link";
import Image from "next/image";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";

interface ArticleNavCardProps {
    href: string;
    article: any;
    onClickCapture?: () => void;
    activeLoadingId?: any;
    setActiveLoadingId?: any;
}

const ArticleNavCard = ({ href, article, activeLoadingId, setActiveLoadingId}: ArticleNavCardProps) => {
    const isLoading = activeLoadingId === article.id;
    return (
        <div className="relative w-full">
            <Link
                onClickCapture={() => setActiveLoadingId(article.id)}
                href={href}

                className={`${isLoading ? "rotating-border-card cursor-not-allowed" : ""}  flex flex-col gap-1 bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden w-full h-[390px]`}
            >
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center">
                        {/* بک‌گراند محو */}
                        <div className="absolute inset-0 bg-black/20 " />
                    </div>
                )}
                {/* IMAGE */}
                <div className="p-3 w-full z-[1]">
                    <div className="w-full h-60 overflow-hidden">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover rounded-lg !static"
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 pt-0 flex flex-col justify-between gap-2 z-[1]">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2 dark:text-[#868B90]">
                        <span>تاریخ انتشار: {article.date}</span>

                        <div className="flex items-center gap-3 text-[#888888]">
                            <span className="flex items-center gap-1">
                                <View className="stroke-[#888888] size-[14px]" />
                                {article.stats?.views ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <Like className="stroke-[#888888] size-[14px]" />
                                {article.stats?.likes ?? 0}
                            </span>
                            <span className="flex items-center gap-1">
                                <Dislike className="stroke-[#888888] size-[14px]" />
                                {article.stats?.dislikes ?? 0}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm lg:text-xl line-clamp-1 dark:text-white">
                            {article.title}
                        </h4>
                        <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2 text-[#868B90]">
                            {article.excerpt}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ArticleNavCard;
