"use client";

import Link from "next/link";
import Image from "next/image";
import { View, Like, Dislike } from "@/components/svgs/SvgEducation";

interface ArticleSideCardProps {
    article: any;
    href: string;
    mainData?: any;
    activeLoadingId?: any;
    setActiveLoadingId?: any;
}

const ArticleSideCard: React.FC<ArticleSideCardProps> = ({
    article,
    href,
    mainData,
    activeLoadingId,
    setActiveLoadingId
}) => {
    const cleanDescription = (html: string, limit = 255) => {
        if (!html) return "";
        const text = html.replace(/<[^>]*>/g, "").trim();
        return text.length > limit ? text.slice(0, limit).trim() + "…" : text;
    };
    const isLoading = activeLoadingId === article.id;
    return (
        <Link
            href={href}
            onClickCapture={() => setActiveLoadingId(article.id)}
            className={`${isLoading ? "rotating-border-card cursor-not-allowed" : ""} bg-white dark:bg-[#1A1A18] shadow-lg rounded-xl overflow-hidden w-full flex flex-col hover:scale-[1.02] transition-transform`}
        >
            {isLoading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/20 " />
                </div>
            )}
            <div className="w-full p-3 z-[1]">
                <div className="h-36 overflow-hidden aspect-video rounded-[10px] w-full">
                    <Image
                        src={article.image}
                        alt={article.title}
                        width={300}
                        height={144}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <div className="p-4 text-right space-y-2  z-[1]">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center text-xs lg:hidden xl:block">
                        {mainData && <span className="dark:text-white">{mainData} : </span>}
                        <span className="dark:text-white">{article.date}</span>
                    </div>

                    <div className="flex items-center gap-[14px]">
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{article.stats?.views ?? 0}</span>
                            <View className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{article.stats?.likes ?? 0}</span>
                            <Like className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{article.stats?.dislikes ?? 0}</span>
                            <Dislike className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                    </div>
                </div>

                <h3 className="text-sm font-semibold dark:text-white">{article.title}</h3>
                <p className="line-clamp-2 text-[#868B90] text-xs">{cleanDescription(article.description)}</p>
            </div>
        </Link>
    );
};

export default ArticleSideCard;
