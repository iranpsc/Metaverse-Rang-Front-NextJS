// app/[lang]/version/[version]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full">
      <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary bg-opacity20">
        {/* Breadcrumb skeleton */}
        <div className="px-12">
          <div className="flex items-center gap-2 py-4">
            <Skeleton className="h-3.5 w-[50px] rounded-md" />
            <Skeleton className="h-3.5 w-[10px] rounded-md" />
            <Skeleton className="h-3.5 w-[70px] rounded-md" />
          </div>
        </div>

        <div className="mainContainer w-full lg:h-auto flex flex-col gap-[10px] lg:flex-row lg:items-start lg:justify-between">
          <div className="centerItem w-full lg:px-7">
            <div className="self-center justify-between flex pt-8 w-full gap-8">
              {/* ---------- ستون راست: VersionBox (سرچ + لیست) ---------- */}
              <div className="w-full px-2 lg:px-0 lg:mx-[20px] self-center flex flex-col items-center lg:w-[35%] lg:h-full lg:flex-shrink-0 lg:rounded-[20px]">
                {/* search box */}
                <div className="w-full flex items-center border-solid border-[#00000024] border-[1px] justify-between bg-white dark:bg-gray-1 lg:w-full h-[50px] rounded-[12px] px-4">
                  <Skeleton variant="circle"  className="!w-5 !h-5 shrink-0" />
                  <Skeleton  className="h-3 flex-1 mx-3 rounded-md" />
                </div>

                {/* version list box */}
                <div className="bg-white mt-[20px] rounded-[20px] w-full dark:bg-gray-1 min-h-[770px] p-[6%] pt-[4%]">
                  <Skeleton  className="h-6 w-[60%] rounded-md mb-6" />

                  <div className="flex flex-col w-[92%] gap-5 mx-auto pt-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex w-full justify-between py-2 gap-3">
                        <div className="flex flex-col items-center pt-[10px] w-[10px] shrink-0">
                          <Skeleton variant="circle"  className="!w-[10px] !h-[10px]" />
                          <div className="w-[1.5px] flex-1 bg-[rgb(var(--color-gray-3))] mt-1" />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                          <div className="flex justify-between">
                            <Skeleton  className="h-3.5 w-[55%] rounded-md" />
                            <Skeleton  className="h-3.5 w-[15%] rounded-md" />
                          </div>
                          <Skeleton  className="h-3 w-[35%] rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---------- ستون چپ: DescriptionBox (فقط دسکتاپ) ---------- */}
              <div className="h-[844px] pb-10 hidden lg:flex lg:flex-col lg:items-center lg:w-full bg-white dark:bg-gray-1 lg:pt-[15px] lg:rounded-[20px]">
                <div className="flex justify-between items-center w-full min-h-[48px] px-[15px]">
                  <Skeleton  className="h-6 w-[35%] rounded-md" />
                  <Skeleton  className="h-6 w-[15%] rounded-md" />
                </div>

                <div className="flex justify-between items-center w-full min-h-[48px] px-[15px]">
                  <Skeleton  className="h-5 w-[45%] rounded-md" />
                  <Skeleton  className="h-4 w-[20%] rounded-md" />
                </div>

                <div className="flex items-center w-full min-h-[48px] px-[15px]">
                  <Skeleton  className="h-4 w-[15%] rounded-md" />
                </div>

                <div className="w-full px-3 lg:px-[30px] flex flex-col gap-4 mt-2">
                  <Skeleton  className="h-3.5 w-full rounded-md" />
                  <Skeleton  className="h-3.5 w-full rounded-md" />
                  <Skeleton  className="h-3.5 w-full rounded-md" />
                  <Skeleton  className="h-3.5 w-[80%] rounded-md" />
                  <Skeleton  className="h-3.5 w-full rounded-md" />
                  <Skeleton  className="h-3.5 w-[60%] rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}