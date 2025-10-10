"use client";

import ListData from "@/components/shared/ListData";
import { useTheme } from "next-themes";
import SyncLoader from "react-spinners/SyncLoader";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useState } from "react";

export default function ListSubCategories({
  loadMore,
  CategoryData,
  loading,
  params,
  mainData,
}: any) {
  const { theme } = useTheme();
  const [visibleCount, setVisibleCount] = useState(9); // اول ۹ تا

  const isDisabled = !CategoryData?.subcategories || visibleCount >= CategoryData.subcategories.length;

  const handleLoadMore = () => {
    if (!isDisabled && !loading) {
      setVisibleCount((prev) => prev + 9); // هر بار ۹ تا اضافه کن
      loadMore?.(); // اگر loadMore لازم باشه برای fetch بیشتر
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-5 px-4 3xl:pe-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[64px] w-full h-fit">
        <ListData
          params={params}
          nameComponent="subCategories"
          data={{
            ...CategoryData,
            subcategories: CategoryData.subcategories?.slice(0, visibleCount),
          }}
        />
      </div>

      {/* Load More Button */}
      <div className="w-full flex justify-center mt-[40px] relative">
        {!loading ? (
          <button
            disabled={isDisabled || loading}
            className={`${
              isDisabled ? "cursor-not-allowed" : ""
            } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        ) : (
          <SyncLoader
            color="currentColor"
            size={10}
            className="text-light-primary dark:text-dark-yellow"
          />
        )}

      </div>
    </div>
  );
}
