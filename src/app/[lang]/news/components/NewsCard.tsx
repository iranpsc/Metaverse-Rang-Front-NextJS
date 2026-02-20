import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calender, Timer } from "@/components/svgs/SvgEducation";

type News = {
    id: number;
    title: string;
    slug: string;
    image?: string;
    date?: string;
    readingTime?: string;
    category?: string;
    categorySlug?: string;
};

interface NewsCardProps {
    item: News;
    lang: string;
    variant?: "featured" | "list";
}

const NewsCard: React.FC<NewsCardProps> = ({
    item,
    lang,
    variant = "list",
}) => {
    const href = `/${lang}/news/categories/${item.categorySlug}/${item.slug}`;
    const [linkLoading, setLinkLoading] = useState(false);
    return (
        <div>
            {linkLoading && (
                <div className="fixed top-0 left-0 bottom-0  w-full  h-screen !z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" >
                    <div className="container flex w-full h-screen items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
                        <div className="holder">
                            <div className="box"></div>
                        </div>
                        <div className="holder">
                            <div className="box"></div>
                        </div>
                        <div className="holder">
                            <div className="box"></div>
                        </div>
                    </div>
                </div>
            )}
            <Link
                href={href} onClickCapture={() => setLinkLoading(true)}
                className={`group block hover:opacity-90 transition ${variant === "featured" ? "flex flex-col gap-6" : "flex gap-4 items-start"
                    }`}
                aria-label={`خواندن خبر: ${item.title}`}
            >

                <div
                    className={`relative overflow-hidden rounded-xl ${variant === "featured" ? "w-full h-[258px]" : "w-[30%] h-[113px] shrink-0"
                        }`}
                >
                    <Image
                        src={item.image || "/placeholder.jpg"}
                        alt={item.title || "تصویر خبر"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105 !z-0"
                        sizes={
                            variant === "featured"
                                ? "(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                                : "30vw"
                        }
                        quality={78}
                        priority={variant === "featured" && item.id <= 2}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM0NDQ0NDQiLz48L3N2Zz4="
                    />
                </div>

                <div
                    className={`${variant === "featured"
                        ? "px-4 flex flex-col gap-4 dark:text-white"
                        : "flex-1 flex flex-col gap-2"
                        }`}
                >
                    {variant === "featured" ? (
                        <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
                    ) : (
                        <h4 className="font-medium text-base line-clamp-2 dark:text-white">
                            {item.title}
                        </h4>
                    )}

                    <div className="flex flex-wrap gap-5 text-sm text-neutral-700 dark:text-neutral-400 items-center">
                        {item.date && (
                            <div className="flex items-center gap-2">
                                <time dateTime={item.date}>
                                    {item.date}
                                </time>
                                <Calender className="size-5 fill-current" aria-hidden="true" />
                            </div>
                        )}
                        {item.readingTime && (
                            <div className="flex items-center gap-2">
                                <span>{item.readingTime} دقیقه</span>
                                <Timer className="size-5 stroke-current" aria-hidden="true" />
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>


    );
};

export default NewsCard;