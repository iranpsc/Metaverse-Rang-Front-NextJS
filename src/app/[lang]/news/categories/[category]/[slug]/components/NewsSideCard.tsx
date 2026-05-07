"use client";

import Link from "next/link";
import Image from "next/image";
import { View, Like, Dislike } from "@/components/svgs/SvgEducation";

interface NewsSideCardProps {
    news: any;
    href: string;
    mainData?: any;
    activeLoadingId?: any;
    setActiveLoadingId?: any;
    isLoading?: boolean;
}

// کامپوننت اسکلت لودینگ با افکت shimmer
const SideCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#1A1A18] shadow-lg rounded-xl overflow-hidden w-full flex flex-col relative">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10 z-10" />
            
            <div className="w-full p-3">
                <div className="h-36 overflow-hidden aspect-video rounded-[10px] w-full bg-neutral-200 dark:bg-neutral-700 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                </div>
            </div>
            
            <div className="p-4 text-right space-y-3">
                <div className="flex items-center w-full justify-between">
                    <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-[14px]">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 w-8 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="h-5 w-full bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                    </div>
                    <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const NewsSideCard: React.FC<NewsSideCardProps> = ({
    news,
    href,
    mainData,
    activeLoadingId,
    setActiveLoadingId,
    isLoading
}) => {
    // اگر در حالت اسکلت لودینگ هستیم
    if (isLoading || !news) {
        return <SideCardSkeleton />;
    }

    const cleanDescription = (html: string, limit = 255): string => {
        if (!html) return "";

        let text = "";

        if (typeof window === "undefined") {
            text = html.replace(/<|>/g, " ");
        } else {
            const div = document.createElement("div");
            div.innerHTML = html;
            text = div.textContent || div.innerText || "";
        }

        text = text.replace(/\s+/g, " ").trim();

        return text.length > limit
            ? text.slice(0, limit).trim() + "…"
            : text;
    };

    const isLoadingState = activeLoadingId === news?.id;
    
    return (
        <Link
            href={href}
            onClickCapture={() => setActiveLoadingId?.(news?.id)}
            className={`${isLoadingState ? "rotating-border-card cursor-not-allowed" : ""} bg-white dark:bg-[#1A1A18] shadow-lg rounded-xl overflow-hidden w-full flex flex-col hover:scale-[1.02] transition-transform relative`}
        >
            {isLoadingState && (
                <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            )}
            <div className="w-full p-3 z-[1]">
                <div className="h-36 overflow-hidden aspect-video rounded-[10px] w-full relative">
                    <Image
                        src={news?.image || "/placeholder.jpg"}
                        alt={news?.title || "خبر"}
                        unoptimized={true}
                        width={300}
                        height={144}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <div className="p-4 text-right space-y-2 z-[1]">
                <div className="flex items-center w-full justify-between">
                    <div className="flex items-center text-xs lg:hidden xl:block">
                        {mainData && <span className="dark:text-white">{mainData} : </span>}
                        <span className="dark:text-white">{news?.date}</span>
                    </div>

                    <div className="flex items-center gap-[14px]">
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{news?.stats?.views ?? 0}</span>
                            <View className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{news?.stats?.likes ?? 0}</span>
                            <Like className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                        <div className="flex gap-1 items-center text-xs">
                            <span className="dark:text-white">{news?.stats?.dislikes ?? 0}</span>
                            <Dislike className="stroke-textGray dark:stroke-white size-[13px]" />
                        </div>
                    </div>
                </div>

                <h3 className="text-sm font-semibold dark:text-white">{news?.title}</h3>
                <p className="line-clamp-2 text-[#868B90] text-xs">{cleanDescription(news?.description)}</p>
            </div>
        </Link>
    );
};

export default NewsSideCard;