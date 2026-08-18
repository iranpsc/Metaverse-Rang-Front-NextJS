import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// دقیقاً به تعداد slice(0,9) + ۱ کارت "مشاهده همه" = ۱۰ کارت
const CATEGORY_COUNT = 9;

function EducationCategoriesSkeletonBase() {
  return (
    <div className="w-[95%] mx-auto h-fit mt-36 flex flex-col justify-center items-center">
      <Skeleton tone="standalone" className="w-full h-5 md:h-6 lg:h-8 xl:h-9 max-w-xs rounded-md" />

      <div className="mt-10 grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 sm:place-items-center xs:place-items-center xs:gap-x-3 w-full gap-3">
        {Array.from({ length: CATEGORY_COUNT + 1 }).map((_, i) => (
          <div
            key={i}
            className="col-span-1 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-[200px] xs:w-full h-[80px] bg-white dark:bg-gray-1 rounded-[20px] flex flex-row items-center gap-5 xs:gap-2 px-3"
          >
            <Skeleton variant="rect" className="w-[32px] h-[32px] xs:w-[28px] xs:h-[28px] rounded-md flex-shrink-0" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(EducationCategoriesSkeletonBase);
