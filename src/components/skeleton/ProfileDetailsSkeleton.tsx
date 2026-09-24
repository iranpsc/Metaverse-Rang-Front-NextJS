import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت ProfileDetails (ستون وسط)
 *
 * این کامپوننت از سه بخش تشکیل شده: SecondDetails (۶ ردیف: تاریخ تولد،
 * تلفن، ایمیل، آدرس، شغل، تحصیلات)، DetailsInterest (۳ ردیف: شهر/کشور/
 * زبان مورد علاقه)، و ReadMore (دکمه).
 *
 * ⚠️ کد دقیق DetailsInterest و detailsReadMore رو نداشتم — فقط
 * SecondDetails رو دقیق پیاده کردم (چون کدش رو فرستادی: کارت h-[70%]
 * با ردیف‌های key + خط‌چین + value). برای DetailsInterest همون الگوی
 * ردیفی رو با ارتفاع کمتر تقریب زدم و ReadMore رو یه دکمه‌ی ساده گذاشتم.
 * اگه کد اون دو تا رو هم بفرستی، این فایل رو دقیق می‌کنم.
 */

function DetailRowsCardSkeleton({
  rows,
  heightClass,
}: {
  rows: number;
  heightClass: string;
}) {
  return (
    <div
      className={`${heightClass} dark:bg-dark-background flex flex-col shadow-md justify-evenly items-center 3xl:py-0 sm:py-3 xs:py-3 bg-white w-full rounded-[10px]`}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex flex-row px-3 xl:mt-3 lg:mt-3 md:mt-2 sm:mt-1 xs:mt-1 justify-between w-full items-center xl:py-[0px] lg:py-[4px] md:py-[4px] sm:py-[5px] xs:py-[5px]"
        >
          <Skeleton tone="standalone" className="h-4 w-20 rounded-md" />
          <hr className="flex-grow mx-3 h-[1px] xl:visible lg:visible md:invisible sm:invisible xs:invisible border border-dashed text-matn-2 opacity-10 dark:text-[#fff]" />
          <Skeleton tone="standalone" className="h-4 w-24 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function ProfileDetailsSkeletonBase() {
  return (
    <div className="3xl:h-screen xl:h-screen lg:h-screen md:h-fit sm:h-fit xs:h-fit flex flex-col justify-between gap-[10px] items-center bg-bg-primary">
      {/* معادل SecondDetails — ۶ ردیف، دقیق مطابق کد واقعی */}
      <DetailRowsCardSkeleton rows={6} heightClass="h-[70%]" />

      {/* معادل DetailsInterest — ۳ ردیف، تقریبی (کد دقیقش رو نداشتم) */}
      <DetailRowsCardSkeleton rows={3} heightClass="h-[20%]" />

      {/* معادل ReadMore — دکمه، تقریبی (کد دقیقش رو نداشتم) */}
      <Skeleton tone="standalone" className="w-full h-[46px] rounded-[10px]" />
    </div>
  );
}

export default memo(ProfileDetailsSkeletonBase);
