"use client";

import { useState, useMemo } from "react";
import ArticleCard from "../../../components/ArticleCard"; // ✅ اضافه شد
import { findByUniqueId } from "@/components/utils/findByUniqueId";
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

  params: {
    lang: string;
  };
    mainData:{mainData:string}
  
}

export default function CategoryClient({ articles, category, params , mainData }: CategoryClientProps) {
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
    <section className="w-full pb-5 lg:py-10 px-6">
      {subCategories.length > 0 && (
        <div className="flex flex-wrap gap-3 lg:gap-6 mb-8">
          <button
            onClick={() => {
              setActiveSub(null);
              setVisibleCount(9);
            }}
            className={`px-4 py-2 rounded-lg transition ${activeSub === null
                ? "dark:border-dark-yellow border border-solid border-light-primary text-light-primary  dark:text-dark-yellow dark:bg-[#0E0E0E] bg-white"
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
              className={`px-4 py-2 rounded-lg transition ${activeSub === sub
                  ? "dark:border-dark-yellow border border-solid border-light-primary text-light-primary  dark:text-dark-yellow dark:bg-[#0E0E0E] bg-white"
                  : "bg-white border border-solid border-[#D9D9D9] dark:border-[#434343] dark:bg-[#0E0E0E] text-[#A0A0A0] dark:text-white"
                }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <p className="text-lg md:text-2xl font-bold dark:text-white mt-14 mb-9">
        {findByUniqueId(mainData, 1520)}{category}
      </p>

      {displayedArticles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">هیچ مقاله‌ای یافت نشد.</p>
      ) : (
        <>
          {/* ✅ استفاده از ArticleCard به جای کد تکراری */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
            {displayedArticles.map((item) => (
              <ArticleCard
                key={item.id}
                item={item}
                params={{ lang: params.lang }}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow"
              >
                {findByUniqueId(mainData, 1456)}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
