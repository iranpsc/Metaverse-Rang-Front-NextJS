import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function EventCardSkeletonBase() {
  return (
    <div className="items flex flex-col justify-center gap-3 items-center w-full">
      {/* تصویر ایونت — همون رپر دقیق خود کد */}
      <div className="mt-4 w-[97%] flex justify-center lg:w-[95%] mx-auto rounded-[20px] overflow-hidden shadow-lg lg:mt-6">
        <Skeleton className="w-full h-[226px] lg:h-[600px] aspect-[16/9] rounded-[20px]" />
      </div>

      {/* عنوان و لایک/دیسلایک/بازدید — دقیقاً همون دو ردیف اصلی */}
      <div className="flex flex-col w-[97%] lg:w-[95%] gap-3 sm:gap-0 items-center sm:flex-row-reverse sm:justify-between">
        <div className="w-[96%] flex justify-between text-base font-normal font-[Vazir] sm:w-[350px] sm:ml-2 sm:self-center">
          <div className="flex items-center gap-1">
            <Skeleton variant="circle"  className="!w-[15px] !h-[15px] md:!w-[18px] md:!h-[18px]" />
            <Skeleton  className="h-3 w-6 rounded-md" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton variant="circle"  className="!w-[15px] !h-[15px] md:!w-[18px] md:!h-[18px]" />
            <Skeleton  className="h-3 w-6 rounded-md" />
          </div>
          <div className="flex items-center size-7 gap-1">
            <Skeleton variant="circle"  className="!w-[15px] !h-[15px] md:!w-[18px] md:!h-[18px]" />
            <Skeleton  className="h-3 w-6 rounded-md" />
          </div>
        </div>

        <div className="flex items-center justify-between h-8 w-full font-[Rokh] my-2 sm:w-[60%] xl:h-11">
          <div className="flex items-center h-7 xl:h-9 2xl:h-10 overflow-hidden 3xl:rounded-s-[10px] w-full">
            <Skeleton  className="h-7 xl:h-9 2xl:h-10 aspect-square rounded-lg shrink-0" />
            <Skeleton  className="mx-2 h-5 lg:h-6 xl:h-7 2xl:h-8 w-[60%] max-w-[calc(100%-60px)] rounded-md" />
          </div>
        </div>
      </div>

      {/* توضیحات — همون عرض و همون تعداد خط تقریبی */}
      <div className="w-[97%] lg:w-[95%] flex flex-col gap-3">
        <Skeleton  className="h-3.5 w-full rounded-md" />
        <Skeleton  className="h-3.5 w-full rounded-md" />
        <Skeleton  className="h-3.5 w-full rounded-md" />
        <Skeleton  className="h-3.5 w-2/3 rounded-md" />
      </div>

      {/* باکس شمارش معکوس — دقیقاً همون کلاس‌های گرادینت/بوردر/رِیدیوس */}
      <div
        className="px-4 mb-2 w-[97%] lg:w-[95%] lg:px-7 font-[AzarMehrFD]
        bg-gradient-to-r from-[#CFCFCFE5] to-[#D8D8D800]
        dark:bg-gradient-to-r dark:from-[#ffffff09] dark:to-[#00000000] rounded-xl lg:rounded-[32px] border-[1px] border-solid dark:border-[#ffffff25] border-[#CFCFCFE5] shadow-lg p-4 flex flex-col sm:flex-row-reverse sm:h-[250px]"
      >
        {/* شروع */}
        <div className="flex flex-col justify-start sm:order-1 sm:content-start sm:w-[30%] sm:min-w-[194px]">
          <Skeleton  className="h-4 w-16 rounded-md self-center sm:self-start mb-6 sm:mt-4" />
          <div className="flex justify-center lg:px-5 items-center">
            <Skeleton  className="h-8 lg:h-9 xl:h-10 3xl:h-12 w-24 rounded-md" />
          </div>
        </div>

        {/* پایان / شمارش معکوس */}
        <div className="text-center mb-4 sm:w-[30%] sm:min-w-[194px]">
          <Skeleton  className="h-4 w-16 rounded-md mx-auto mb-6 sm:mt-4" />
          <div className="flex justify-between items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center flex flex-col items-center gap-2">
                <Skeleton  className="h-7 lg:h-9 xl:h-10 2xl:h-12 w-11 rounded-md" />
                <Skeleton  className="h-3 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* دکمه لینک */}
        <div className="flex text-center sm:justify-center mt-4 sm:w-2/5">
          <Skeleton  className="w-full h-11 rounded-[28px]" />
        </div>
      </div>

      <div className="mt-6 w-full lg:w-[95%] h-[2px] bg-gradient-to-r from-transparent via-[#DADADA] to-transparent" />
    </div>
  );
}

export default memo(EventCardSkeletonBase);