"use client";

import Link from "next/link";
import Image from "next/image";
import { articles } from "@/components/utils/articles";

interface CategoriesGridProps {
  params: { lang: string };
}

export default function CategoriesGrid({ params }: CategoriesGridProps) {
  // استخراج کتگوری‌های یکتا
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];

  // نگاشت عکس برای هر کتگوری
  const categoryImages: Record<string, string> = {};
  articles.forEach((a) => {
    if (a.category && a.categoryImage && !categoryImages[a.category]) {
      categoryImages[a.category] = a.categoryImage;
    }
  });

  // شمارش واقعی زیر‌دسته‌ها برای هر کتگوری
  const subcategorySets: Record<string, Set<string>> = {};
  const subcategoryCounts: Record<string, number> = {};

  articles.forEach((a) => {
    if (a.category && a.subCategory) {
      if (!subcategorySets[a.category]) {
        subcategorySets[a.category] = new Set();
      }
      subcategorySets[a.category].add(a.subCategory);
    }
  });

  Object.keys(subcategorySets).forEach((cat) => {
    subcategoryCounts[cat] = subcategorySets[cat].size;
  });

  // فقط ۷ تای اول + کارت مشاهده بیشتر
  const visibleCategories = categories.slice(0, 7);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-7 xl:gap-10 3xl:gap-12">
        {visibleCategories.map((cat, index) => (
          <Link
            key={cat}
            href={`/${params.lang}/articles/categories/${encodeURIComponent(cat)}`}
            className="relative w-full h-[200px] rounded-xl overflow-hidden shadow-lg group"
          >
            {/* ✅ تصویر LCP بهینه‌سازی‌شده */}
            <Image
              src={categoryImages[cat] || "/default.png"}
              alt={cat}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              // فقط برای اولین تصویر (LCP image)
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
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
                  دارای {subcategoryCounts[cat] || 0} زیر‌دسته مرتبط
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* 🔹 کارت مشاهده بیشتر */}
        {categories.length > 7 && (
          <Link
            href={`/${params.lang}/articles/categories`}
            className="relative w-full h-[200px] rounded-xl overflow-hidden flex flex-col gap-3 items-center justify-center transition bg-[#fff] dark:bg-[#1A1A18] hover:scale-105 base-transition-1 shadow-lg cursor-pointer"
          >
            <div className="rounded-full bg-[#0066FF30] dark:bg-[#483D13] aspect-square h-12 w-12 lg:h-14 lg:w-14 flex items-center justify-center rtl:rotate-180">
              <svg
                className="size-5 lg:size-7"
                width="39"
                height="30"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke-light-primary dark:stroke-dark-yellow"
                  d="M7.21484 2.96484L10.2498 5.99984L7.21484 9.03484"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className="stroke-light-primary dark:stroke-dark-yellow"
                  d="M1.75 6H10.165"
                  stroke="black"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-azarMehr text-light-primary dark:text-dark-primary lg:text-xl">
              مشاهده همه
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
