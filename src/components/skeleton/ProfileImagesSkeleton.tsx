import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت ProfileImages
 *
 * نکته مهم درباره LCP: تصویر اصلی توی نسخه واقعی با priority={true} لود
 * می‌شه و معمولاً همون LCP element صفحه‌ست. این اسکلت (چون فقط یه
 * background-color سادست، بدون background-image) جزو کاندیدهای LCP
 * حساب نمی‌شه؛ یعنی نمایش این اسکلت به‌عنوان placeholder، امتیاز LCP رو
 * خراب نمی‌کنه — فقط تا رسیدن تصویر واقعی، بلافاصله یه پینت (paint) به
 * کاربر می‌ده که جلوی صفحه‌ی سفید خالی رو می‌گیره (به نفع FCP).
 * تصویر واقعی، هروقت برسه، خودش LCP element می‌مونه.
 */
function ProfileImagesSkeletonBase() {
  return (
    <section className="dark:bg-dark-background shadow-md relative bg-white rounded-[10px] flex flex-col justify-center items-center lg:flex-row lg:justify-between">
      {/* تصویر اصلی */}
      <div className="relative w-[100%] md:w-[77%] aspect-square lg:aspect-auto lg:[height:-webkit-fill-available] lg:[height:-moz-available] dark:bg-dark-background bg-white overflow-clip flex justify-center items-center rounded-[10px]">
        <Skeleton tone="standalone" className="w-full h-full rounded-[10px]" />
      </div>

      {/* ۵ تصویر بندانگشتی */}
      <div className="flex items-center flex-col lg:flex-row w-[100%] lg:w-[23%] justify-center lg:justify-end gap-5 pe-5">
        <hr className="ms-12 h-[1.5px] w-[35vh] lg:w-[1.5px] lg:h-[35vh] 2xl:h-[40vh] mt-2 border-none xl:bg-gradient-to-b lg:bg-gradient-to-b md:bg-gradient-to-r mb-1 sm:bg-gradient-to-l xs:bg-gradient-to-l from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00]" />

        <div className="flex lg:flex-col flex-row max-lg:mb-2 gap-2 justify-center items-center pt-3 w-full 3xl:gap-4 tall:gap-3 xl:gap-2 lg:gap-1 md:gap-3 sm:gap-5 xs:gap-2 md:pb-3 sm:pb-3 xs:pb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              tone="standalone"
              variant="circle"
              className="w-12 h-12 3xl:w-[50px] 3xl:h-[50px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProfileImagesSkeletonBase);