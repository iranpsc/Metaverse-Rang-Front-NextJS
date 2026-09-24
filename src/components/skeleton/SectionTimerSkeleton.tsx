import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت کارت SectionTimer
 * نکته مهم: تمام کلاس‌های ابعادی (height/width/padding/rounded) دقیقاً
 * از خود SectionTimer کپی شده تا هیچ Layout Shift (CLS) بین حالت
 * اسکلت و حالت واقعی رخ نده. اگر ساختار SectionTimer عوض شد، این فایل
 * هم باید همراهش آپدیت بشه.
 *
 * این کامپوننت هیچ state، effect یا fetch نداره — کاملاً استاتیک و
 * سبک هست، برای همینه که می‌تونه به‌عنوان اولین چیزی که رندر میشه
 * (قبل از این‌که IntersectionObserver فعال بشه) استفاده بشه.
 */

function SectionTimerSkeletonBase() {
  return (
    <div
      style={{ background: "linear-gradient(-135deg, transparent, #9898a0, transparent)" }}
      className="p-[1px] rounded-[48px] lg:rounded-[50px] w-full"
    >
      <div className="flex flex-col lg:flex-row pb-5 px-5 lg:p-5 w-full bg-[#DEDEE9] dark:bg-[#313131] rounded-[48px] lg:rounded-[50px]">
        {/* عکس و توضیحات */}
        <div className="lg:h-[250px] 2xl:h-[280px] 3xl:h-[320px] overflow-y-hidden lg:me-5 relative p-[1px] w-full lg:w-1/2 xl:w-2/3 3xl:w-[70%]">
          <div className="h-full w-full py-5 md:py-0 lg:rounded-[48px] flex flex-col lg:flex-row gap-5 justify-center items-center">
            {/* تصویر */}
            <div className="w-full h-full flex justify-center max-w-[380px] max-h-[100%] lg:rounded-[32px] overflow-hidden relative">
              <Skeleton className="w-full h-[220px] lg:h-full rounded-[38px]" />
            </div>

            {/* عنوان و توضیحات */}
            <div className="w-full lg:mt-0 flex flex-col justify-between h-full md:py-4 gap-4 lg:gap-0">
              {/* عنوان - معادل text-lg lg:text-xl 3xl:text-3xl */}
              <div className="flex flex-col gap-2 ms-1 md:ms-5">
                <Skeleton className="h-4 lg:h-5 3xl:h-7 w-[85%] rounded-md" />
                <Skeleton className="h-4 lg:h-5 3xl:h-7 w-[55%] rounded-md" />
              </div>

              {/* توضیحات - معادل line-clamp-4 */}
              <div className="flex flex-col gap-2 ms-1 md:ms-5 mt-3 lg:mt-0">
                <Skeleton className="h-3 lg:h-4 w-full rounded-md" />
                <Skeleton className="h-3 lg:h-4 w-full rounded-md" />
                <Skeleton className="h-3 lg:h-4 w-[90%] rounded-md" />
                <Skeleton className="h-3 lg:h-4 w-[60%] rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* تایمر + دکمه‌ها */}
        <div className="lg:h-[250px] 2xl:h-[280px] 3xl:h-[320px] w-full lg:w-1/2 xl:w-1/3 3xl:w-[30%] rounded-[50px] p-[5px] relative">
          <div className="p-[20px] h-full rounded-3xl md:rounded-[50px] flex flex-col justify-around items-center relative bg-gradient-to-tl to-[#dfdfdf] from-white dark:to-[#FFFFFF17] dark:from-[#22222291]">
            {/* چهار باکس تایمر (روز/ساعت/دقیقه/ثانیه) */}
            {/* توجه: ابعاد این بخش تخمینی است چون به کد DynamicTimer دسترسی نداشتم.
                اگر بعد از تست، سایز واقعی DynamicTimer فرق داشت، فایل DynamicTimer.tsx
                رو هم بفرست تا این بخش رو دقیقاً منطبق کنم. */}
            <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton
                    variant="rect"
                    className="w-[46px] h-[46px] md:w-[58px] md:h-[58px] 3xl:w-[64px] 3xl:h-[64px] rounded-xl"
                  />
                  <Skeleton className="h-2.5 w-6 rounded-md" />
                </div>
              ))}
            </div>

            {/* دکمه‌ها */}
            <div className="w-full flex flex-col">
              <Skeleton className="!w-full h-[46px] lg:h-[50px] 3xl:h-[54px] rounded-[28px] mt-5" />
              <Skeleton className="!w-full h-[46px] lg:h-[50px] 3xl:h-[54px] rounded-[28px] mt-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// چون این کامپوننت کاملاً استاتیکه، memo می‌کنیم تا با re-render های
// والد (مثل تغییر currentIndex بعد از لود شدن) دوباره محاسبه نشه.
export const SectionTimerSkeleton = memo(SectionTimerSkeletonBase);