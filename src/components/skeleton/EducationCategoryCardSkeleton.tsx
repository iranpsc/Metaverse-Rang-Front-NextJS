import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت هر کارت دسته‌بندی (معادل هر آیتم داخل ListData)
 * ابعاد (min-h-[240px], h-[250px] تصویر، پدینگ‌ها) عیناً از کد واقعی کپی شده.
 */
function EducationCategoryCardSkeletonBase() {
  return (
    <div className="w-full min-h-[240px] rounded-[12px] bg-white dark:bg-gray-1 flex flex-col justify-start gap-2 items-center">
      {/* تصویر */}
      <div className="w-full relative px-4 pt-4 overflow-hidden">
        <div className="relative w-full h-[250px]">
          <Skeleton className="w-full h-full rounded-[8px]" />
        </div>
      </div>

      {/* عنوان */}
      <div className="w-full pt-3 flex justify-center">
        <Skeleton className="h-5 w-2/3 rounded-md" />
      </div>

      {/* توضیحات دوخطی */}
      <div className="w-full flex flex-col items-center gap-2 px-4">
        <Skeleton className="h-3 w-4/5 rounded-md" />
        <Skeleton className="h-3 w-3/5 rounded-md" />
      </div>

      {/* آمار (ویدیو/لایک/دیسلایک/بازدید) */}
      <div className="w-full mt-2 px-5">
        <div className="flex flex-row justify-evenly items-center w-full py-3 border border-x-0 border-b-0 border-solid border-[#D9D9D9] dark:border-[#434343]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton variant="circle" className="w-[18px] h-[18px]" />
              <Skeleton className="h-3 w-6 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* دکمه مشاهده ویدیو */}
      <Skeleton className="w-24 h-[42px] rounded-[10px] mb-4" />
    </div>
  );
}

export default memo(EducationCategoryCardSkeletonBase);
