// این کامپوننت "use client" نداره — چون Skeleton فقط CSS/شیمر هست و هیچ
// hook یا state ای لازم نداره، می‌تونه یک Server Component خالص باشه.
// یعنی صفر بایت جاوااسکریپت برای رندر این fallback به کلاینت فرستاده می‌شه؛
// بهترین حالت ممکن برای LCP وقتی این‌جوری با <Suspense> استفاده بشه:
//
//   <Suspense fallback={<TopTrainersSkeleton />}>
//     <TopTrainersFirstPage params={params} mainData={mainData} />
//   </Suspense>

import { Skeleton } from "@/components/ui/skeleton";
import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";

// دقیقاً به تعداد codes توی getTopTrainerUsers (۲ کاربر)
const TRAINER_COUNT = 2;

export default function TopTrainersSkeleton() {
  return (
    <>
      <div className="w-full flex justify-between items-center lg:px-[42px] px-5">
        <Skeleton tone="standalone" className="h-5 md:h-8 w-32 md:w-56 rounded-md" />

        <div className="flex items-center gap-4 md:hidden">
          <Skeleton tone="standalone" className="h-3 w-10 rounded-md" />
          <Skeleton tone="standalone" variant="circle" className="w-6 h-6" />
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row pb-10 gap-1 items-center">
        {Array.from({ length: TRAINER_COUNT }).map((_, i) => (
          <div key={i} style={{ minWidth: 280 }}>
            <UserCardSkeleton minWidth="280px" />
          </div>
        ))}
      </div>
    </>
  );
}
