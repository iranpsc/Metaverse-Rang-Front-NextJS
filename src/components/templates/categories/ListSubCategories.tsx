"use client";

import ListData from "@/components/shared/ListData";
import { useTheme } from "next-themes";
import SyncLoader from "react-spinners/SyncLoader";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface ListSubCategoriesProps {
  loadMore: () => void;
  CategoryData: any;
  loading: boolean;
  params: any;
  mainData: any;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
}

export default function ListSubCategories({
  loadMore,
  CategoryData,
  loading,
  params,
  mainData,
  visibleCount,
  setVisibleCount,
}: ListSubCategoriesProps) {
  const { theme } = useTheme();

  const isDisabled =
    !CategoryData?.subcategories ||
    visibleCount >= CategoryData.subcategories.length;

  const handleLoadMore = () => {
    if (!isDisabled && !loading && CategoryData?.subcategories) {
      const remaining =
        CategoryData.subcategories.length - visibleCount;
      const increment = remaining >= 9 ? 9 : remaining;
      setVisibleCount(visibleCount + increment);

      // اگر هنوز نیاز به fetch بیشتر داریم
      if (increment < 9) {
        loadMore?.();
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-5 px-4 3xl:pe-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[64px] w-full h-fit">
        <ListData
          params={params}
          nameComponent="subCategories"
          activeLoadingId={null}
          setActiveLoadingId={() => {}}
          data={{
            ...CategoryData,
            subcategories: CategoryData.subcategories?.slice(
              0,
              visibleCount
            ),
          }}
        />
      </div>

      {CategoryData?.subcategories &&
        visibleCount < CategoryData.subcategories.length && (
          <div className="w-full flex justify-center mt-[40px] relative">
            {!loading ? (
              <button
                disabled={isDisabled || loading}
                onClick={handleLoadMore}
                className={`${
                  isDisabled ? "cursor-not-allowed opacity-50" : ""
                } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
              >
                {findByUniqueId(mainData, 271)}
              </button>
            ) : (
              <SyncLoader
                color="currentColor"
                size={10}
                className="text-light-primary dark:text-dark-yellow h-14"
              />
            )}
          </div>
        )}
    </div>
  );
}
