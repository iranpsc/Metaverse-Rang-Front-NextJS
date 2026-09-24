// components/templates/referral/skeletons/InviteChartSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function InviteChartSkeleton() {
  return (
    <div className="w-full pt-7 flex flex-col gap-3">
      <div className="w-full pt-7 flex flex-col gap-3">

        {/* Title */}
        <Skeleton
          tone="standalone"
          className="h-[22px] lg:h-[28px] w-[180px] rounded-md"
        />

        {/* Description */}
        <Skeleton
          tone="standalone"
          className="h-[16px] w-[60%] my-3 rounded-md"
        />

        {/* Stats */}
        <div className="flex justify-between gap-4 md:max-w-[50%] lg:max-w-[30%] h-[64px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              tone="surface"
              className="h-full w-full rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-start md:justify-end gap-6 mt-6">

        <div className="flex items-center gap-3">
          <Skeleton
            tone="standalone"
            variant="circle"
            className="w-2 h-2 lg:w-3 lg:h-3"
          />

          <Skeleton
            tone="standalone"
            className="h-[14px] w-[50px] rounded"
          />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton
            tone="standalone"
            variant="circle"
            className="w-2 h-2 lg:w-3 lg:h-3"
          />

          <Skeleton
            tone="standalone"
            className="h-[14px] w-[50px] rounded"
          />
        </div>

      </div>

      {/* Summary Cards */}
      <div className="w-full pt-2 flex flex-col gap-3 md:flex-row">
        <Skeleton
          tone="surface"
          className="h-[96px] lg:h-44 w-full rounded-xl"
        />

        <Skeleton
          tone="surface"
          className="h-[96px] lg:h-44 w-full rounded-xl"
        />
      </div>

      {/* Chart */}
      <div className="overflow-x-auto light-scrollbar dark:dark-scrollbar">
        <div className="flex justify-center md:justify-end lg:w-full min-w-[800px]">
          <Skeleton
            tone="surface"
            className="w-full h-[420px] rounded-2xl"
          />
        </div>
      </div>

    </div>
  );
}