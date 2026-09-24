import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت ProfileMainDetails
 * ۴ ردیف لیبل/مقدار + ردیف آخر که معادل نوار پیشرفت امتیازه.
 */
function ProfileMainDetailsSkeletonBase() {
  return (
    <div className="h-full flex flex-col justify-between items-center 3xl:gap-4 tall:gap-10 xl:gap-6 lg:gap-4 md:gap-10 sm:gap-5 xs:gap-5">
      {/* ردیف بالا: شناسه شهروندی + دکمه اشتراک‌گذاری + کد */}
      <div className="flex flex-row justify-between w-full items-center 3xl:mt-2 xl:mt-2 md:mt-2 sm:mt-6 xs:mt-2">
        <Skeleton tone="standalone" className="h-4 w-24 rounded-md" />
        <div className="flex flex-row items-center gap-2">
          <Skeleton tone="standalone" className="h-8 w-20 rounded-[10px]" />
          <Skeleton tone="standalone" className="h-4 w-16 rounded-md" />
        </div>
      </div>

      {/* نام / تاریخ ورود / مسئولیت — ۳ ردیف لیبل + مقدار */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-row justify-between w-full items-center">
          <Skeleton tone="standalone" className="h-4 w-28 rounded-md" />
          <hr className="flex-grow mx-[10px] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed text-matn-2 opacity-10 dark:text-[#fff]" />
          <Skeleton tone="standalone" className="h-4 w-24 rounded-md" />
        </div>
      ))}

      {/* امتیاز کسب‌شده + نوار پیشرفت */}
      <div className="flex flex-row justify-between xl:mt-3 lg:mt-0 w-full items-center">
        <Skeleton tone="standalone" className="h-4 w-28 rounded-md" />
        <hr className="flex-grow mx-[10px] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed text-matn-2 opacity-10 dark:text-[#fff]" />
        <Skeleton
          tone="standalone"
          className="w-[40%] xl:h-[27px] lg:h-[25px] md:h-[26px] h-[24px] rounded-full"
        />
      </div>
    </div>
  );
}

export default memo(ProfileMainDetailsSkeletonBase);
