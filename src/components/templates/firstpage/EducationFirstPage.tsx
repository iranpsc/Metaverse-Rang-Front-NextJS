import { ArrowRight } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Link from "next/link";
import EducationVideosClient from "./EducationVideosClient";
import { getHomeTutorials } from "./homeData";

interface Params {
  lang: "fa" | "en";
}

const EducationFirstPage = async ({
  mainData,
  params,
}: {
  mainData: any;
  params: Params;
}) => {
  // قبلاً fetch با cache:"no-store" بود و کل صفحه‌ی اصلی رو dynamic می‌کرد.
  // getHomeTutorials کش دارد (revalidate: 300) و در صورت خطا [] برمی‌گرداند.
  const videos = await getHomeTutorials();

  const direction = params.lang === "fa" ? "rtl" : "ltr";

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 1462)}
        </p>

        <Link href={`/${params.lang}/education/category`}>
          <div className="flex justify-center items-center gap-4">
            <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)}
            </p>

            <ArrowRight
              className={`dark:stroke-white stroke-black w-[24px] h-full ${
                direction === "rtl" ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-10 mt-6 md:mt-12">
        <EducationVideosClient videos={videos} params={params} />
      </div>
    </div>
  );
};

export default EducationFirstPage;