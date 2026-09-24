import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton } from "@/components/skeleton/VideoCardSkeleton";

/**
 * اسکلت بخش «هدر + گرید ۳ کارت» (مقاله‌ها / آموزش‌ها).
 * همان markup که قبلاً داخل page.tsx تکرار شده بود؛ اینجا یک جا نگه‌داری می‌شود.
 */
export default function CardsSectionSkeleton() {
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <Skeleton className="h-6 md:h-7 lg:h-9 xl:h-10 w-40 md:w-56 rounded-md" />

        <Skeleton className="h-5 md:h-6 lg:h-7 w-24 md:w-32 rounded-md" />
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
