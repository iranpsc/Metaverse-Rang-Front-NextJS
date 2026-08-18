"use client";
import { useState } from "react";
import ListData from "@/components/card/EducationCategoriesCard";
import EducationCategoryCardSkeleton from "@/components/skeleton/EducationCategoryCardSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// تعداد کارت اسکلت هنگام لود بیشتر — دقیقاً معادل افزایش visibleCount (۹)
const LOAD_MORE_COUNT = 9;

const ShowAllCategoriesEducationList = ({ categoriesData, params, mainData, theme }: any) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);
  const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setLoading(false);
    }, 500);
  };

  const isDisabled = visibleCount >= categoriesData.length;

  return (
    <section className="p-2">
      {/* لیست دسته‌بندی‌ها */}
      <div className="mt-12 gap-[64px] grid md:grid-cols-2 xl:grid-cols-3 w-full">
        <ListData
          nameComponent="categories"
          data={{ subcategories: categoriesData.slice(0, visibleCount) }}
          params={params}
          activeLoadingId={activeLoadingId} setActiveLoadingId={setActiveLoadingId}
        />

        {/* موقع لود بیشتر، به‌جای اسپینر، همون تعداد کارت اسکلت که قراره
            اضافه بشن (۹ تا) نشون داده می‌شه — انگار آیتم‌های بعدی دارن میان */}
        {loading &&
          Array.from({ length: LOAD_MORE_COUNT }).map((_, i) => (
            <EducationCategoryCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* دکمه لود مور */}
      <div className="w-full flex justify-center mt-[40px]">
        {!loading && (
          <button
            type="button"
            disabled={isDisabled || loading}
            aria-disabled={isDisabled || loading}
            aria-label={isDisabled ? "تمام دسته‌بندی‌ها نمایش داده شده" : "نمایش موارد بیشتر"}
            title={isDisabled ? "صفحه آخر" : "موارد بیشتر"}
            className={`${isDisabled ? "cursor-not-allowed opacity-70" : ""
              } bg-white dark:bg-gray-1 text-primary md:text-lg  rounded-[12px] px-[40px] py-[16px] transition-colors border-2 border-transparent hover:border-primary hover:text-primary hover:`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        )}
      </div>
    </section>
  );
};

export default ShowAllCategoriesEducationList;