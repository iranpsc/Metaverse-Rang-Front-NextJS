// components/templates/referral/skeletons/InviteListSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function InviteListSkeleton() {
  return (
    <>
      <div className="flex flex-col py-8 leading-[24px] gap-4 w-full lg:self-start mt-[64px] mb-[32px]">
        
        {/* Title */}
        <Skeleton
          tone="surface"
          className="h-[24px] lg:h-[28px] w-[220px] rounded-md"
        />

        {/* Description */}
        <Skeleton
          tone="surface"
          className="h-[16px] w-[70%] lg:w-[45%] rounded-md"
        />

        {/* Search / Input */}
        <Skeleton
          tone="surface"
          className="lg:w-[49%] w-full h-[50px] rounded-[12px]"
        />
      </div>

      {/* Invite List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="dark:bg-gray-1 bg-white p-3 rounded-xl flex items-center w-full h-[56px] lg:h-[128px]"
          >
            {/* Avatar */}
            <Skeleton
              tone="surface"
              variant="circle"
              className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] shrink-0"
            />

            {/* User Info */}
            <div className="flex-1 mx-4 flex flex-col gap-2">
              <Skeleton
                tone="surface"
                className="h-[10px] lg:h-[20px] w-[60%] rounded"
              />

              <Skeleton
                tone="surface"
                className="h-[10px] lg:h-[16px] w-[35%] rounded"
              />
            </div>

            {/* Status / Value */}
            <Skeleton
              tone="surface"
              className="h-[16px] lg:h-[24px] w-[50px] me-1 rounded"
            />

            {/* Action */}
            <Skeleton
              tone="surface"
              variant="circle"
              className="w-[32px] h-[32px] shrink-0"
            />
          </div>
        ))}
      </div>
    </>
  );
}