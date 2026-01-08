"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface CategoriesGridClientProps {
  categories: string[];
  categoryImages: Record<string, string>;
  categorySlugs: Record<string, string>;
  subcategoryCounts: Record<string, number>;
  params: { lang: string };
  mainData: { mainData: string };
}

export default function CategoriesGridClient({
  categories,
  categoryImages,
  categorySlugs,
  subcategoryCounts,
  params,
  mainData,
}: CategoriesGridClientProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const visibleCategories = categories.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  // ✅ state مشترک برای لودر
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

  return (
    <>
      <div className="w-full mt-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 3xl:gap-10 mt-10">
          {visibleCategories.map((cat, index) => {
            const slug = categorySlugs[cat] || cat;
            const [imgSrc, setImgSrc] = useState(categoryImages[cat] || "/default.png"); // ✅ برگشت
            const isLoading = activeLoadingId === cat;

            return (
              <div
                key={cat}
                className={`relative w-full flex p-[3px] rounded-xl ${
                  isLoading ? "cursor-not-allowed rotating-border-card" : ""
                }`}
              >
                <Link
                  onClickCapture={() => setActiveLoadingId(cat)}
                  href={`/${params.lang}/articles/categories/${encodeURIComponent(
                    slug
                  )}`}
                  className={`relative w-full h-[200px] rounded-xl overflow-hidden shadow-lg group`}
                >
                  {/* 🔥 Loader Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/20 rounded-xl" />
                      
                    </div>
                  )}

                  <Image
                    src={imgSrc}
                    alt={cat}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    onError={() => setImgSrc("/default.png")} // ✅ برگشت
                  />

                  <div className="absolute inset-0 bg-gradient-to-br to-black/90 via-black/60 from-black/5 transition" />

                  <div className="absolute bottom-4 right-4 flex gap-3">
                    <div className="border-r-0 border-solid border-y-0 border-l border-[#969696] pl-3 h-min">
                      <div className="rounded-full bg-[#969696] aspect-square h-10 w-10 flex items-center justify-center rtl:rotate-180">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.21484 2.96484L10.2498 5.99984L7.21484 9.03484"
                            stroke="black"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1.75 6H10.165"
                            stroke="black"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start z-10">
                      <span className="text-white font-bold mt-[-6px]">{cat}</span>
                      <span className="text-[#9A9A9A] text-xs">
                        {findByUniqueId(mainData, 1517)} {subcategoryCounts[cat] || 0}{" "}
                        {findByUniqueId(mainData, 1518)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {visibleCount < categories.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow"
          >
            مشاهده بیشتر
          </button>
        </div>
      )}
    </>
  );
}
