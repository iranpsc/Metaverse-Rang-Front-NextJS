import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileTopMobileSkeleton from "@/components/skeleton/ProfileTopMobileSkeleton";
import ProfileImagesSkeleton from "@/components/skeleton/ProfileImagesSkeleton";
import ProfileMainDetailsSkeleton from "@/components/skeleton/ProfileMainDetailsSkeleton";

const GEMS_COUNT = 6;

function ProfileSkeletonBase() {
  return (
    <>
      <div className="w-full">
        <ProfileTopMobileSkeleton />
      </div>

      <div className="w-full my-[5px]">
        <ProfileImagesSkeleton />
      </div>

      <div className="w-full h-full border shadow-md rounded-[10px] dark:bg-dark-background bg-white px-3 flex flex-col justify-between gap-5">
        <ProfileMainDetailsSkeleton />

        <div className="flex justify-evenly">
          {Array.from({ length: GEMS_COUNT }).map((_, i) => (
            <Skeleton
              key={i}
              tone="standalone"
              variant="circle"
              className="w-[64px] h-[64px] md:w-[96px] md:h-[96px]"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(ProfileSkeletonBase);