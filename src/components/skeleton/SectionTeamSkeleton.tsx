import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت SectionTeam
 *
 * این کامپوننت برخلاف SectionTimer، داده‌ش (mainData) از پدر و به‌صورت
 * سینک میاد، پس "لودینگ" واقعی نداره؛ تنها حالت انتظار، قبل از رسیدن
 * IntersectionObserver به viewport هست (برای دیفر کردن رندر تصاویر).
 * قبلاً توی اون حالت یک div خالی با minHeight نمایش داده می‌شد که باعث
 * می‌شد کاربر قبل از اسکرول یک فضای خالی سفید ببینه. این اسکلت جایگزین
 * همون فضای خالی می‌شه تا هم CLS نداشته باشیم هم تجربه بصری بهتری باشه.
 */

function SectionTeamSkeletonBase() {
  return (
    <div className="flex flex-column justify-center flex-wrap px-5 lg:px-0 w-full">
      {/* تصویر تیم — معادل w-full md:w-[50%] lg:w-[35%], نسبت تصویر اصلی 500x357 */}
      <div className="w-full md:w-[50%] lg:w-[35%]">
        <Skeleton
          tone="standalone"
          variant="rect"
          className="!w-full aspect-[500/357] md:!h-auto 3xl:!aspect-square !rounded-3xl lg:!rounded-[32px]"
        />
      </div>

      <div className="w-full lg:w-[65%] flex flex-col justify-between items-start md:pb-3 md:ps-10 gap-1">
        {/* تیتر + خط Vector زیرش */}
        <div className="flex flex-col w-full gap-3 mt-5">
          <Skeleton tone="standalone" className="h-5 md:h-7 lg:h-8 w-3/4 rounded-md" />
          <Skeleton tone="standalone" className="w-[20%] h-10 rounded-md" />
        </div>

        {/* زیرتیتر */}
        <Skeleton tone="standalone" className="h-6 md:h-7 lg:h-8 w-2/3 rounded-md mt-2" />

        {/* پاراگراف توضیحات */}
        <div className="w-full flex flex-col gap-3 pt-5 md:pt-3">
          <Skeleton tone="standalone" className="h-4 md:h-5 lg:h-6  w-4/6  rounded-md" />
          <Skeleton tone="standalone" className="h-4 md:h-5 lg:h-6  w-4/6 rounded-md" />
          <Skeleton tone="standalone" className="h-4 md:h-5 lg:h-6 w-3/6 rounded-md" />
        </div>

        {/* آواتارهای هم‌پوشان تیم + متن +۴۰ */}
        <div className="w-full flex flex-row justify-start items-center pt-5 md:pt-3">
          <div className="relative flex flex-row justify-start items-start">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
          tone="standalone"
                key={i}
                variant="circle"
                className={`!xl:size-[60px] xl:!size-[60px] lg:!size-[50px] md:!size-[70px] sm:!size-[50px] !size-[44px] !border-2 !border-white dark:!border-gray-1 ${
                  i > 0 ? "!ms-[-20px]" : ""
                }`}
                style={{ zIndex: 50 - i * 10 }}
              />
            ))}
          </div>
          <Skeleton tone="standalone" className="ms-2 h-4 md:h-5 lg:h-6 w-20 md:w-24 lg:w-28 rounded-md" />
        </div>

        {/* دکمه CTA */}
        <Skeleton tone="standalone" className="!w-32 h-[42px] md:h-[46px] lg:h-[52px] rounded-[24px] mt-5" />
      </div>
    </div>
  );
}

export const SectionTeamSkeleton = memo(SectionTeamSkeletonBase);