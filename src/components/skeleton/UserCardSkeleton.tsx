import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت UserCard
 *
 * نکته مهم درباره override سایز:
 * چون Skeleton.tsx برای هر variant یک سایز پیش‌فرض داره (مثلاً circle => h-12 w-12)
 * و ترکیب کلاس‌ها با یک cn ساده (بدون tailwind-merge) انجام میشه، ترتیب کلاس‌ها
 * توی خروجی HTML تضمینی برای override کردن نیست. برای همین هر جا خواستیم سایز
 * پیش‌فرض یک variant رو override کنیم از پیشوند "!" (important) استفاده کردیم؛
 * مثلاً !w-[33px] !h-[33px]. این تنها راه مطمئنه مگر این‌که tailwind-merge رو به
 * پروژه اضافه کنید (که پیشنهاد می‌کنم برای پروژه‌های بزرگ همینو اضافه کنید).
 *
 * ساختار badge سطح (LevelBadge) رو دقیق نمی‌دونم چون کدش رو نداشتم، برای همین
 * یک بج ساده گذاشتم. اگه LevelBadge.tsx رو هم بفرستی این بخش رو دقیق منطبق می‌کنم.
 */

interface UserCardSkeletonProps {
  minWidth?: string;
  hidePreviousLevels?: boolean;
}

function UserCardSkeletonBase({ minWidth, hidePreviousLevels = false }: UserCardSkeletonProps) {
  return (
    <div className="px-2 !max-w-[281px]" style={minWidth ? { width: minWidth, minWidth } : {}}>
      <div
        className="
          border border-solid border-transparent shadow-lg mt-10 relative
          bg-[#fff] dark:bg-gray-1 flex flex-col justify-between gap-3
          py-3 sm:py-4 md:py-5 items-center rounded-[20px]
        "
      >
        {/* آواتار — معادل figure w-[120px] h-[120px] mt-10 */}
        <Skeleton variant="circle" className="!w-[120px] !h-[120px] mt-10" />

        {/* نام — معادل p text-[20px] */}
        <div className="w-full flex justify-center px-3">
          <Skeleton className="!h-5 !w-20 rounded-md" />
        </div>

        {/* کد شهروندی (لینک) — معادل text-[16px] */}
        <Skeleton className="!h-4 !w-28 rounded-md" />

        {/* ردیف جواهرات — معادل min-h-[75px] با ۱۳ آیتم ۳۳px */}
        {!hidePreviousLevels && (
          <div className="w-full min-h-[75px] pb-2">
            <div className="w-full flex flex-wrap justify-center gap-1 px-1">
              {Array.from({ length: 13 }).map((_, i) => (
                <Skeleton key={i}  className="!w-[27px] !h-[33px] rounded-[6px]" />
              ))}
            </div>
          </div>
        )}

        {/* دکمه — معادل w-[80%] h-[55px] rounded-[10px] */}
        <Skeleton className="!w-[80%] h-[55px] rounded-[10px]" />

        {/* نشانگر سطح — تقریبی، منتظر کد LevelBadge برای دقیق‌سازی */}
        <Skeleton className="!h-10 !w-36 rounded-full" />
      </div>
    </div>
  );
}

export const UserCardSkeleton = memo(UserCardSkeletonBase);
