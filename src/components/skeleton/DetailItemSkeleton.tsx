import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت دقیق DetailItem — مطابق کد واقعی:
 * ردیف flex-row justify-between با خط پایین (border-b-2)، بدون کارت/
 * بک‌گراند/گردی. عرض دقیقاً "sm:w-[47%]" (نه چیز دیگه‌ای که قبلاً
 * حدس زده بودم) یا w-full برای fullBox.
 */
export function DetailItemSkeleton({
  showCheck = false,
  fullBox = false,
}: {
  showCheck?: boolean;
  fullBox?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap flex-row gap-2 justify-between py-3 border-solid border-t-0 border-x-0 border-b-2 border-[#ECECEC] dark:border-gray-1 items-center w-full ${
        fullBox ? "w-full" : "sm:w-[47%]"
      }`}
    >
      {/* تیتر */}
      <Skeleton className="h-4 w-24 rounded-md" />

      {/* مقدار — اگه showCheck باشه یه آیکون کوچیک هم قبلش میاد */}
      <div className="flex items-center gap-1.5 min-w-max">
        {showCheck && <Skeleton variant="circle" className="w-3.5 h-3.5" />}
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
    </div>
  );
}