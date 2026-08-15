import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت LevelCard
 * - بدون هیچ state/hook، بدون next/image، بدون کتابخونه‌ی اضافه — فقط
 *   چند div با Skeleton، پس سبک‌ترین حالت ممکنه و هزینه‌ی رندر ۱۳ تا
 *   از این‌ها (تعداد سطوح) ناچیزه.
 * - با memo پیچیده شده تا re-render های غیرضروری نداشته باشه.
 * - سایزها (w-[147px]/[180px], h-[216px]/[239px], padding‌ها) عیناً از
 *   LevelCard واقعی کپی شدن تا صفر Layout Shift داشته باشیم.
 */
function LevelCardSkeletonBase() {
  return (
    <div className="py-[10px] px-[14px] w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 flex justify-center">
      <div className="w-full max-w-[296px] lg:max-w-[333px] py-[25px] flex flex-col items-center rounded-[20px] box-border border border-solid border-transparent">
        {/* تصویر مدال سطح */}
        <Skeleton
         
          className="z-[2] w-[110px] h-[155px]  translate-y-2 rounded-xl lg:translate-y-6"
        />

        {/* کارت اطلاعات پایین */}
        <div className="boxDataLevel w-full h-[216px] lg:h-[239px] rounded-[20px] flex flex-col justify-end items-center gap-3 bg-white border border-[rgba(0,0,0,0.14)] dark:bg-gray-1 mt-[-65px] pb-5">
          {/* عنوان سطح */}
          <Skeleton className="h-5 lg:h-6 w-2/3 rounded-md" />

          {/* امتیاز لازم */}
          <Skeleton className="h-4 lg:h-5 w-1/2 rounded-md" />

          {/* دو بج رتبه/سطح */}
          <div className="w-full flex items-center justify-evenly">
            <Skeleton className="h-8 w-5/12 rounded-[20px]" />
            <Skeleton className="h-8 w-5/12 rounded-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LevelCardSkeletonBase);
