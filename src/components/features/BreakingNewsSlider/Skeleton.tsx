"use client";
export default function BreakingNewsSkeleton() {
  return (
      <div className="w-full mt-10 relative px-4 sm:px-6 lg:px-8">

        <div className="relative w-full flex justify-center h-[480px] rounded-x-xl">
          <div className="skeleton-slide prev w-[200px] h-[84%] mt-[40px] rounded-xl overflow-hidden bg-neutral-300  dark:bg-neutral-800/70 shimmer shadow-2xl me-[-15px]" />
          {/* کارت مرکزی */}
          <div className="skeleton-slide z-10 !w-[82%] sm:!w-[75%] md:!w-[65%] lg:!w-[58%] xl:!w-[60%] h-full rounded-xl overflow-hidden bg-neutral-300  dark:bg-neutral-800 shimmer shadow-2xl flex items-end ">
            {/* محتوای placeholder همان قبلی */}
            <div className="w-full  z-20 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center gap-5">
              {/* بج فوری خبر - سعی کن اندازه واقعی رو بگیری */}

              <div className="w-5/6 lg:w-4/5 h-9 lg:h-11 bg-white/25 rounded-lg shimmer" />
              <div className="w-3/5 lg:w-2/3 h-7 lg:h-9 bg-white/15 rounded-lg shimmer mt-1" />

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2 text-sm md:text-base opacity-80">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-16 h-5 bg-white/25 rounded shimmer" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1" />
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-24 h-5 bg-white/25 rounded shimmer" />
                </div>
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full mt-1" />
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-white/35 rounded-full" />
                  <div className="w-32 h-5 bg-white/25 rounded shimmer" />
                </div>
              </div>
            </div>
          </div>
          <div className="skeleton-slide prev w-[200px] h-[84%] mt-[40px] rounded-xl overflow-hidden bg-neutral-300 dark:bg-neutral-800/70 shimmer shadow-2xl ms-[-15px]" />
          {/* کارت‌های دورتر اگر می‌خواهی */}
          {/* <div className="skeleton-slide other hidden lg:block ..." style={{ transform: 'translateX(-140%) scale(0.85)' }} /> */}
          {/* <div className="skeleton-slide other hidden lg:block ..." style={{ transform: 'translateX(140%) scale(0.85)' }} /> */}

        </div>
      </div>
  );
}
