import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت ProfileAbout — دو باکس با همون ارتفاع‌های vh واقعی (h-[37vh] و
 * h-[60vh]) تا هیچ CLS ای بین اسکلت و نسخه‌ی واقعی رخ نده.
 */
function ProfileAboutSkeletonBase() {
  return (
    <section className="flex flex-col justify-start gap-[10px] items-center h-screen">
      {/* باکس توضیحات */}
      <div className="dark:bg-dark-background w-full h-[37vh] shadow-md bg-white px-1 rounded-[10px] pt-5">
        <Skeleton tone="standalone" className="h-5 w-1/3 rounded-md mx-2 mb-5" />
        <div className="flex flex-col gap-2 mx-1">
          <Skeleton tone="standalone" className="h-3.5 w-full rounded-md" />
          <Skeleton tone="standalone" className="h-3.5 w-full rounded-md" />
          <Skeleton tone="standalone" className="h-3.5 w-full rounded-md" />
          <Skeleton tone="standalone" className="h-3.5 w-2/3 rounded-md" />
        </div>
      </div>

      {/* باکس تصویر مرکزی */}
      <div className="dark:bg-dark-background h-[60vh] shadow-md bg-white items-center flex flex-col justify-center w-full rounded-[10px] p-2 md:p-0">
        <Skeleton
          tone="standalone"
          className="w-[130px] h-[160px] md:w-[170px] md:h-[210px] rounded-[10px]"
        />
      </div>
    </section>
  );
}

export default memo(ProfileAboutSkeletonBase);
