import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton } from "@/components/skeleton/VideoCardSkeleton";

// تعداد کارت اسکلت برای گرید اولیه ویدیوها — معادل تعداد معمول یک صفحه
const VIDEO_COUNT = 6;

function EducationListSkeletonBase() {
  return (
    <div className="w-[95%] xs:w-[90%] h-fit mt-24 flex flex-col justify-center items-center mx-auto">
      <Skeleton tone="standalone" className="mt-2 mb-7 h-5 md:h-6 lg:h-8 xl:h-9 w-48 md:w-64 rounded-md self-start" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
        {Array.from({ length: VIDEO_COUNT }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default memo(EducationListSkeletonBase);
