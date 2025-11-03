"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Like, Dislike, View } from "@/components/svgs/SvgEducation";

export interface Author {
  name: string;
  citizenId: string;
  avatar?: string;
  field?: string;
  bio?: string;
  socials?: {
    telegram?: string;
    whatsapp?: string;
    email?: string;
  };
}

export interface Tag {
  label: string;
  slug: string;
}

export interface Stats {
  likes: number;
  dislikes: number;
  views: number;
  comments: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  description: string;
  content: string;
  author: Author;
  category: string;
  subCategory?: string;
  tags?: Tag[];
  stats: Stats;
}

interface CategoryClientProps {
  articles: Article[];
  category: string;
  params: { lang: string };
}

export default function CategoryClient({ articles, category, params }: CategoryClientProps) {
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);

  const categoryArticles = useMemo(() => {
    const filtered = articles.filter(
      (a) => a.category.trim().toLowerCase() === category.trim().toLowerCase()
    );
    return Array.from(new Map(filtered.map((a) => [a.id, a])).values());
  }, [articles, category]);

  const subCategories = useMemo(() => {
    const subs = categoryArticles
      .map((a) => a.subCategory?.trim())
      .filter((sc): sc is string => !!sc);
    return Array.from(new Set(subs));
  }, [categoryArticles]);

  const filteredArticles = useMemo(() => {
    if (!activeSub) return categoryArticles;
    return categoryArticles.filter(
      (a) =>
        a.subCategory?.trim().toLowerCase() ===
        activeSub.trim().toLowerCase()
    );
  }, [categoryArticles, activeSub]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <section className="w-full py-10 px-6">
      {subCategories.length > 0 && (
        <div className="flex flex-wrap gap-3 lg:gap-6 mb-8">
          <button
            onClick={() => {
              setActiveSub(null);
              setVisibleCount(9);
            }}
            className={`px-4 py-2 rounded-lg transition ${
              activeSub === null
                ? "dark:border-[#969696] border border-solid border-[#808080] text-black dark:text-[#F2F2F2] dark:bg-[#0E0E0E] bg-white"
                : "bg-white border border-solid border-[#D9D9D9] dark:border-[#434343] dark:bg-[#0E0E0E] text-[#A0A0A0] dark:text-white"
            }`}
          >
            همه
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setActiveSub(sub);
                setVisibleCount(9);
              }}
              className={`px-4 py-2 rounded-lg transition ${
                activeSub === sub
                  ? "dark:border-[#969696] border border-solid border-[#808080] text-black dark:text-[#F2F2F2] dark:bg-[#0E0E0E] bg-white"
                  : "bg-white border border-solid border-[#D9D9D9] dark:border-[#434343] dark:bg-[#0E0E0E] text-[#A0A0A0] dark:text-white"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <p className="text-3xl font-bold dark:text-white mt-14 mb-9">
        پربازدیدترین مقالات {category}
      </p>

      {displayedArticles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">هیچ مقاله‌ای یافت نشد.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
            {displayedArticles.map((item) => (
              <Link
                key={item.id}
                href={`/${params.lang}/articles/categories/${item.category}/${item.slug}`}
                className="bg-white dark:bg-[#1A1A18] shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] w-full"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <p className="text-xs text-gray-500 mb-1 text-[#888888]">
                    {item.category} / {item.subCategory}
                  </p>
                  <h3 className="text-lg font-semibold line-clamp-1 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 dark:text-[#868B90] mt-2">
                    {item.excerpt}
                  </p>

                  <div className="flex flex-row-reverse items-center justify-between mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-3 text-[#888888]">
                      <span className="flex items-center gap-1">
                        <View className="stroke-[#888888] size-[14px]" />
                        {item.stats?.views ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Like className="stroke-[#888888] size-[14px]" />
                        {item.stats?.likes ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Dislike className="stroke-[#888888] size-[14px]" />
                        {item.stats?.dislikes ?? 0}
                      </span>
                    </div>

                    {/* ✅ اصلاح‌شده برای جلوگیری از Hydration Error */}
                    <Link
                      href={`/${params.lang}/citizens/${item.author.citizenId}`}
                      className="flex items-center gap-2 text-blue-500 text-xs font-bold"
                    >
                      <span className="relative inline-block w-[35px] h-[35px] bg-lightGray rounded-full overflow-hidden border shadow-md">
                        <Image
                          src={
                            item.author.avatar ||
                            "/articles/author/fallback-avatar.jpg"
                          }
                          alt={item.author.name}
                          fill
                          className="object-cover"
                        />
                      </span>
                      {item.author.citizenId}
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow"
              >
                نمایش بیشتر
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
