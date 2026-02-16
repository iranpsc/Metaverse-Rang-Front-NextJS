"use client";

import { useState } from "react";
import MainNewsCard from "../../../components/MainNewsCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export interface Author {
  name: string;
  citizenId: string;
  avatar?: string;
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
  tags?: Tag[];
  stats: Stats;
}

interface CategoryClientProps {
  articles: Article[];
  category: string;
  params: {
    lang: string;
  };
  mainData: any;
}

export default function CategoryClient({
  articles,
  category,
  params,
  mainData,
}: CategoryClientProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  const displayedArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <section className="w-full pb-5 lg:py-10 px-6">
      {/* 🔹 Title */}
      <p className="text-lg md:text-2xl font-bold dark:text-white mt-14 mb-9">
        {findByUniqueId(mainData, 1520)} {category}
      </p>

      {displayedArticles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          هیچ محتوایی یافت نشد.
        </p>
      ) : (
        <>
          {/* 🔹 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
            {displayedArticles.map((item) => (
              <MainNewsCard
                key={item.id}
                item={item}
                params={{ lang: params.lang }}
                activeLoadingId={activeLoadingId}
                setActiveLoadingId={setActiveLoadingId}
              />
            ))}
          </div>

          {/* 🔹 Load More */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
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
