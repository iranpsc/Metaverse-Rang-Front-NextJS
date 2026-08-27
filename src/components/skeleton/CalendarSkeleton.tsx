import { Skeleton } from "@/components/ui/skeleton";
import EventCardSkeleton from "@/components/skeleton/EventCardSkeleton";

const INITIAL_COUNT = 3;

export default function CalendarSkeleton() {
  return (
    <div className="centerItem w-[95%] lg:w-full pt-6 text-black dark:text-white bg-white dark:bg-gray-1 flex flex-col items-center rounded-[20px] gap-2 font-['Montserrat']">
      <div className="w-[97%] flex flex-col items-start sm:flex-row-reverse lg:w-[95%] lg:gap-4">
        {/* تقویم — چون کد داخلی Calendar.tsx رو ندارم، یک گرید ماهانه تقریبی می‌سازم:
            هدر (ماه/سال + دو فلش) + گرید ۷ ستونی روزها */}
        <div className="w-full sm:w-[45%] flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <Skeleton variant="circle"  className="!w-6 !h-6" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton variant="circle"  className="!w-6 !h-6" />
          </div>
          <div className="grid grid-cols-7 gap-2 px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={`h-${i}`}  className="h-3 w-full rounded-md" />
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={`d-${i}`}  variant="circle" className="!w-full aspect-square !h-auto" />
            ))}
          </div>
        </div>

        {/* پنل فیلترها — دقیقاً همون searchBoxContainer + بخش legend */}
        <div className="EventFilters w-full sm:w-[90%] mt-4 sm:mt-0 sm:ml-4">
          <div className="searchBoxContainer my-5 flex items-center flex-row justify-between border-[1px] border-solid border-[#00000024] dark:bg-gray-1 w-full h-[50px] rounded-[12px] sm:m-0 px-4">
            <Skeleton variant="circle"  className="!w-5 !h-5 shrink-0" />
            <Skeleton  className="h-3 flex-1 mx-3 rounded-md" />
          </div>

          <div className="flex flex-col text-[14px] items-center content-center gap-1 xl:gap-2 w-full max-w-full h-auto py-4 2xl:gap-3 font-[Vazir]">
            <Skeleton  className="h-5 w-28 self-start mr-4 rounded-md" />

            {/* ردیف "همه رویدادها" با آیکون لایه‌ای */}
            <div className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%] rounded-md sm:h-[34px] xl:h-11">
              <div className="flex items-center h-7 xl:h-9 2xl:h-10">
                <Skeleton  className="h-7 xl:h-9 2xl:h-10 aspect-square rounded-lg" />
                <Skeleton  className="mx-2 h-3 w-20 rounded-md" />
              </div>
            </div>

            {/* ۵ ردیف رنگی legend */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between h-11 2xl:h-12 px-2 w-[96%] rounded-md sm:h-[34px] xl:h-11"
              >
                <div className="flex items-center h-full">
                  <Skeleton className="h-7 xl:h-9 2xl:h-10 aspect-square rounded-lg" />
                  <Skeleton  className="mx-2 h-3 w-16 rounded-md" />
                </div>
                <Skeleton  className="h-3 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="line mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent" />

      {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}