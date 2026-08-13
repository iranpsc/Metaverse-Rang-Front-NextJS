import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت هدر موبایل سایدبار (معادل ProfileHeaderMobile)
 *
 * نکات پرفورمنسی که رعایت شده:
 * - هیچ state، effect، آیکون SVG واقعی یا next/image ای نداره — کاملاً
 *   استاتیکه، پس این کامپوننت هیچ هزینه‌ی JS اضافه‌ای برای هیدریشن نداره
 *   و تاثیری روی LCP/TBT نمی‌ذاره.
 * - با memo پیچیده شده تا با re-render های احتمالی والد دوباره محاسبه نشه.
 * - از tone="standalone" همه‌جا استفاده شده چون bg این نوار (bg-white /
 *   dark:bg-dark-background) یه رنگ اختصاصیه که توی سیستم متغیرهای رنگی
 *   شما تعریف نشده، پس نمی‌تونیم مطمئن باشیم gray-3 روش کنتراست کافی داره.
 *
 * تمام کلاس‌های ابعادی (w/h هر آیتم) عیناً از ProfileHeaderMobile کپی
 * شدن تا صفر Layout Shift داشته باشیم.
 */

function SideBarHeaderMobileSkeletonBase() {
  return (
    <div className="xs:fixed px-5 sm:fixed top-0 dark:bg-dark-background shadow-md xl:hidden lg:hidden md:flex sm:flex xs:flex z-[51] w-full sm:h-[60px] xs:h-[60px] bg-white flex-rows justify-between items-center">
      <div className="flex items-center gap-5">
        {/* آیکون منو — معادل MenuIcon */}
        <Skeleton
          tone="standalone"
          className="sm:w-[35px] sm:h-[20px] xs:w-[35px] xs:h-[20px] md:w-[50px] md:h-[30px] rounded-md"
        />

        <div className="flex items-center gap-5">
          {/* دایره پرچم زبان */}
          <Skeleton
            tone="standalone"
            variant="circle"
            className="w-[27px] h-[26px] md:w-[23px] md:h-[23px] xl:w-[27px] xl:h-[27px]"
          />

          {/* دایره تغییر تم (معادل ThemeMenuModule حالت بسته) */}
          <Skeleton
            tone="standalone"
            variant="circle"
            className="w-[31px] h-[31px] md:w-[25px] md:h-[25px] xl:w-[31px] xl:h-[31px]"
          />
        </div>
      </div>

      {/* لوگو + عنوان/زیرعنوان */}
      <div className="flex flex-row justify-center items-center">
        <div className="ml-1 flex flex-col justify-center items-center py-2 gap-1.5">
          <Skeleton tone="standalone" className="h-3 w-12 rounded-md" />
          <Skeleton tone="standalone" className="h-2.5 w-16 rounded-md" />
        </div>
        <Skeleton
          tone="standalone"
          className="xs:w-[40px] xs:h-[40px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] mx-1 rounded-full"
        />
      </div>
    </div>
  );
}

export default memo(SideBarHeaderMobileSkeletonBase);