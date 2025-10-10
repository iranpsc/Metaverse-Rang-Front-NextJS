"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ListData from "@/components/shared/ListData";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import SyncLoader from "react-spinners/SyncLoader";

const ShowAllCategoriesComponent = ({ categoriesData, params, mainData, theme }: any) => {
  const router = useRouter();

  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

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
        />
      </div>

      {/* دکمه لود مور */}
      <div className="w-full flex justify-center mt-[40px]">
        {!loading ? (
          <button
            type="button"
            disabled={isDisabled || loading}
            aria-disabled={isDisabled || loading}
            aria-label={isDisabled ? "تمام دسته‌بندی‌ها نمایش داده شده" : "نمایش موارد بیشتر"}
            title={isDisabled ? "صفحه آخر" : "موارد بیشتر"}
            className={`${
              isDisabled ? "cursor-not-allowed opacity-70" : ""
            } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] transition-colors border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        ) : (
          <SyncLoader
            color="currentColor"
            size={10}
            aria-label="در حال بارگذاری"
            className="text-light-primary dark:text-dark-yellow"
          />
        )}
      </div>
    </section>
  );
};

export default ShowAllCategoriesComponent;
