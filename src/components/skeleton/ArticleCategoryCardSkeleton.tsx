import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function ArticleCategoryCardSkeletonBase() {
  return (
    <div className="relative w-full flex p-[3px] rounded-xl">
      <div className="relative w-full h-[200px] rounded-xl overflow-hidden">
        <Skeleton tone="standalone" className="w-full h-full rounded-xl" />

        <div className="absolute bottom-4 right-4 flex gap-3">
          <div className="border-r-0 border-solid border-y-0 border-l border-[#969696] pl-3 h-min">
            <Skeleton variant="circle" className="h-10 w-10" />
          </div>
          <div className="flex flex-col items-start justify-center gap-1.5">
            <Skeleton className="h-3.5 w-20 rounded-md" />
            <Skeleton className="h-3 w-14 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ArticleCategoryCardSkeletonBase);
