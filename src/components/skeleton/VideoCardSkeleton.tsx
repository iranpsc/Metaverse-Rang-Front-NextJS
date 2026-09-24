import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت VideoCard
 *
 * نکته: خود VideoCard یک لودینگ داخلی برای تصویرش داره (imgLoading با
 * animate-pulse) که مربوط به لود شدن خود عکس بعد از این‌که داده اومده و
 * کارت رندر شده — به اون کاری نداشتیم و دست‌نخورده باقی مونده. این
 * اسکلت برای قبل از اومدن خودِ داده (وقتی videos هنوز خالیه) استفاده
 * می‌شه، جایی که قبلاً هیچ‌چی رندر نمی‌شد.
 *
 * تمام کلاس‌های wrapper (gap-6 + مارجین‌های منفی جبرانی مثل mt-[-24px])
 * عیناً از VideoCard کپی شدن تا ارتفاع نهایی کارت با نسخه واقعی یکی
 * بمونه و CLS نداشته باشیم.
 */

function VideoCardSkeletonBase() {
  return (
    <div className="w-[100%] space-y-[2px] min-h-[240px] shadow-md rounded-[10px] overflow-hidden bg-white dark:bg-gray-1 flex flex-col justify-start gap-6 items-center">
      {/* تصویر — معادل h-[260px] px-4 pt-4 */}
      <div className="w-full h-[260px] overflow-hidden px-4 pt-4">
        <div className="relative h-full w-full">
          <Skeleton variant="rect" className="w-full h-full rounded-[10px]" />
        </div>
      </div>

      {/* دسته‌بندی / زیردسته — معادل mt-[-10px] pe-16 */}
      <div className="w-[95%] flex flex-row justify-start items-center gap-2 mt-[-10px] pe-16">
        <Skeleton className="h-3 w-14 rounded-md" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>

      {/* تیتر — معادل mt-[-24px] */}
      <div className="w-[95%] mt-[-24px]">
        <Skeleton className="h-5 w-4/5 rounded-md" />
      </div>

      {/* توضیحات دوخطی — معادل mt-[-20px] line-clamp-2 */}
      <div className="w-[95%] mt-[-20px] flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-md" />
        <Skeleton className="h-3 w-3/4 rounded-md" />
      </div>

      {/* سازنده + آمار (لایک/دیسلایک/بازدید) */}
      <div className="w-[95%] pb-2 flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start items-center gap-2">
          <Skeleton variant="circle" className="w-[45px] h-[45px]" />
          <Skeleton className="h-3 w-16 rounded-md" />
        </div>
        <div className="flex flex-row justify-start items-center gap-3 md:gap-5">
          <Skeleton className="h-3 w-9 rounded-md" />
          <Skeleton className="h-3 w-9 rounded-md" />
          <Skeleton className="h-3 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export const VideoCardSkeleton = memo(VideoCardSkeletonBase);
