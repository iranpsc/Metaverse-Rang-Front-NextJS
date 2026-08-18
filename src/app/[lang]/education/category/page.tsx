import dynamic from "next/dynamic";
import { Suspense } from "react";

const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"));
const SearchComponent = dynamic(() => import("@/components/Search/SearchComponent"));

import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";

import EducationCategoryAllContent from "@/components/list/EducationCategoryAllContent";
import ShowAllCategoriesEducationListSkeleton from "@/components/skeleton/ShowAllCategoriesEducationListSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface EducationCategoryAllProps {
  params: Promise<{ lang: string }>;
}

export default async function EducationCategoryAll({ params }: EducationCategoryAllProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    // ❌ قبلاً اینجا getAllCategories() هم جزو Promise.all بود؛ این فچ
    // الان رفته داخل EducationCategoryAllContent که خودش زیر <Suspense>
    // رندر می‌شه. یعنی breadcrumb/عنوان/سرچ دیگه منتظرش نمی‌مونن، و روی
    // رفرش هم (نه فقط کلیک "موارد بیشتر") اسکلت به‌درستی دیده می‌شه.
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    return (
      <>
        <div className="flex w-full" dir={langData.direction}>
          <section
            className={`w-full mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20 xl:px-8 lg:px-8 px-5 `}
          >
            <CleanAutoRetryParam />
            {/* Breadcrumb */}
            <div className="ps-2 lg:ps-4">
              <BreadCrumb params={resolvedParams} />
            </div>

            <div className="mt-[60px] lg:mt-[40px] xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
                {findByUniqueId(mainData, 340)}
              </h1>
              <p className="text-matn-2  dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                {findByUniqueId(mainData, 1466)}
              </p>
              <div className="mt-[-60px] md:mt-0 px-2">
                <SearchComponent
                  searchLevel="education"
                  mainData={mainData}
                  params={resolvedParams}
                />
              </div>
            </div>

            <Suspense fallback={<ShowAllCategoriesEducationListSkeleton />}>
              <EducationCategoryAllContent
                lang={lang}
                mainData={mainData}
                params={resolvedParams}
              />
            </Suspense>

          </section>
        </div>
      </>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in EductionCategoriesPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}

// SEO**
export async function generateMetadata({ params }: EducationCategoryAllProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    return {
      title: findByUniqueId(mainData, 340),
      description: findByUniqueId(mainData, 340),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 340),
        description: findByUniqueId(mainData, 340),
        locale: lang == "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/education/category`,
        images: [
          {
            url: "/logo.png",
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}
