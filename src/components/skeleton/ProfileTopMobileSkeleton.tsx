import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت ProfileTopMobile
 * بدون hook/state — پس نیازی به "use client" نداره و هزینه‌ی JS اضافه‌ای
 * برای هیدریشن نمی‌ذاره.
 */
function ProfileTopMobileSkeletonBase() {
  return (
    <div className="dark:bg-dark-background px-1 lg:mt-0 md:mt-1 sm:mt-1 xs:mt-1 flex flex-col bg-white justify-center items-center rounded-[10px]">
      <section className="w-full flex flex-row justify-around px-4 md:px-1 sm:px-0 xs:px-0 items-center">
        {/* آواتار + نام */}
        <div className="relative flex justify-center items-center">
          <Skeleton tone="standalone" variant="circle" className="w-[48px] h-[48px] my-1" />
        </div>

        <hr className="flex-grow mx-3 h-[1px] hidden sm:block border border-dashed text-matn-2 opacity-10 dark:text-[#fff]" />

        {/* آیکون ملیت */}
        <Skeleton
          tone="standalone"
          variant="circle"
          className="xl:w-9 xl:h-9 3xl:w-10 3xl:h-10 lg:w-10 lg:h-10 md:w-14 md:h-14 sm:w-10 sm:h-10 xs:w-10 xs:h-10"
        />

        <hr className="flex-grow mx-3 h-[1px] hidden sm:block border border-dashed text-matn-2 opacity-10 dark:text-[#fff]" />

        {/* لیبل سطح */}
        <Skeleton tone="standalone" className="h-4 w-14 rounded-md mx-1" />
        <Skeleton tone="standalone" className="h-4 w-14 rounded-md mx-1" />

        {/* آیکون شهروند + عدد سطح */}
        <Skeleton
          tone="standalone"
          variant="circle"
          className="xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-14 md:h-14 sm:w-10 sm:h-10 xs:w-10 xs:h-10"
        />
      </section>
    </div>
  );
}

export default memo(ProfileTopMobileSkeletonBase);
