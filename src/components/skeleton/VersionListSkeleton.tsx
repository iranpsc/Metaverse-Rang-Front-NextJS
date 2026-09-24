import { Skeleton } from "@/components/ui/skeleton";

const VERSION_ROWS = 8;

/**
 * بدون "use client" — Server Component خالص.
 * مطابق VersionBox (ستون چپ، لیست) + DescriptionBox (ستون راست، جزئیات).
 */
export default function VersionListSkeleton() {
  return (
    <div className="self-center justify-between flex flex-col lg:flex-row pt-8 w-full gap-8">
      {/* ستون چپ: جستجو + لیست نسخه‌ها — معادل VersionBox */}
      <div className="w-full px-2 lg:px-0 lg:mx-[20px] flex flex-col items-center lg:w-[35%] lg:flex-shrink-0">
        <Skeleton tone="standalone" className="w-full h-[50px] rounded-[12px]" />

        <div className="bg-white mt-[20px] rounded-[20px] w-full dark:bg-gray-1 min-h-[770px] p-[6%] flex flex-col gap-4">
          <Skeleton className="h-5 w-32 rounded-md mb-2" />

          {Array.from({ length: VERSION_ROWS }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 w-full">
              <Skeleton variant="circle" className="w-2.5 h-2.5 mt-2 flex-shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between w-full">
                  <Skeleton className="h-3.5 w-2/3 rounded-md" />
                  <Skeleton className="h-3.5 w-10 rounded-md" />
                </div>
                <Skeleton className="h-3 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ستون راست: جزئیات نسخه انتخابی — معادل DescriptionBox (فقط دسکتاپ) */}
      <div className="hidden lg:flex lg:flex-col lg:items-center h-[844px] pb-10 bg-white dark:bg-gray-1 lg:w-full pt-[15px] rounded-[20px] px-[15px] gap-6">
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-7 w-16 rounded-md" />
        </div>

        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-5 w-1/2 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>

        <Skeleton className="h-4 w-20 rounded-md self-start" />

        <div className="w-full flex flex-col gap-3">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}
