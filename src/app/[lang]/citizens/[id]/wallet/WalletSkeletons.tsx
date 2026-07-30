import { CARD_HEIGHT } from "./walletHistory.types";

const pulseBlock = "rounded bg-[#EFEFEF] dark:bg-[#2A2B32]";

/** Skeleton matching WalletSummaryCard's front-face layout 1:1. */
export function WalletSummaryCardSkeleton() {
  return (
    <div
      className={`relative w-full ${CARD_HEIGHT} bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col gap-4 overflow-hidden animate-pulse`}
      role="status"
      aria-label="در حال بارگذاری کارت دارایی"
    >
      <div className="flex items-center gap-3">
        <div className="w-full flex items-center justify-center absolute right-0 left-0 top-[-20px]">
          <div className={`w-11 h-11 rounded-xl ${pulseBlock}`} />
        </div>
        <div className="flex flex-col items-center w-full gap-2 mt-8">
          <div className={`h-4 w-24 ${pulseBlock}`} />
          <div className={`h-3 w-16 ${pulseBlock}`} />
        </div>
      </div>

      <div className="flex items-end justify-between border-t border-solid border-x-0 border-b-0 border-[#EFEFEF] dark:border-[#2A2B32] mt-auto pt-3">
        <div className="flex flex-col items-center gap-2 mx-auto">
          <div className={`h-4 w-10 ${pulseBlock}`} />
          <div className={`h-3 w-14 ${pulseBlock}`} />
        </div>
        <div className="h-full w-[1px] bg-[#EFEFEF] dark:bg-[#2A2B32]" />
        <div className="flex flex-col items-center gap-2 mx-auto">
          <div className={`h-4 w-10 ${pulseBlock}`} />
          <div className={`h-3 w-14 ${pulseBlock}`} />
        </div>
      </div>
    </div>
  );
}

/** Renders `count` card skeletons in the same grid used for real cards. */
export function WalletSummaryGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <WalletSummaryCardSkeleton key={i} />
      ))}
    </>
  );
}

/** Skeleton for the line chart area — mimics bars so the loading state
 *  still reads as "a chart is coming", not just a blank box. */
export function WalletChartSkeleton() {
  const bars = [38, 62, 48, 80, 55, 70, 42, 58, 74, 50, 66, 44];

  return (
    <div
      className="w-full h-[420px] bg-white dark:bg-darkGray rounded-2xl p-6 flex items-end gap-3 animate-pulse"
      role="status"
      aria-label="در حال بارگذاری نمودار"
    >
      {bars.map((h, i) => (
        <div key={i} className={`flex-1 rounded-t-md ${pulseBlock}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}
