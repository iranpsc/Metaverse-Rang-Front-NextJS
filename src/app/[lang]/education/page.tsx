import { Suspense } from "react";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SearchComponent from "@/components/Search/SearchComponent";
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import TopTrainersSkeleton from "@/components/skeleton/TopTrainersSkeleton";
import EducationCategoriesContent from "@/components/list/EducationCategoriesContent";
import EducationCategoriesSkeleton from "@/components/skeleton/EducationCategoriesSkeleton";
import EducationListContent from "@/components/list/EducationListContent";
import EducationListSkeleton from "@/components/skeleton/EducationListSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface CitizensPageProps {
  params: Promise<{ lang: string }>;
}

export default async function CitizensPage({ params }: CitizensPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    // ⚠️ این تنها زنجیره‌ی غیرقابل‌موازی‌سازی صفحه‌ست: mainData به خروجی
    // langData نیاز داره (getMainFile(langData))، پس این دو مجبورن سری
    // اجرا بشن. همه‌ی بخش‌های دیگه (تاپ‌ترینرها، دسته‌بندی‌ها، لیست
    // ویدیوها) هرکدوم فچ خودشون رو در یک کامپوننت async مستقل، زیر
    // Suspense جدا انجام می‌دن — یعنی به‌محض رسیدن به این نقطه از رندر،
    // هر سه فچ هم‌زمان (موازی) شروع می‌شن، نه سری پشت‌سرهم مثل قبل.
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    return (
      <>
        <div className="flex w-full" dir={langData.direction}>
          <section
            className={`w-full  relative  mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20 xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1`}
          >
            <CleanAutoRetryParam />

            {/* Breadcrumb */}
            <div className="">
              <BreadCrumb params={resolvedParams} />
            </div>
            <div className="mt-[60px] lg:mt-[40px] xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
              <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
                {findByUniqueId(mainData, 166)}
              </h1>
              <p className="text-matn-2  dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                {findByUniqueId(mainData, 164)}
              </p>
              <div className="flex justify-center w-full px-5 lg:px-0">
                <SearchComponent
                  searchLevel='education'
                  mainData={mainData}
                  params={resolvedParams}
                />
              </div>
            </div>

            <div className="h-fit mt-[60px]  xl:mt-[100px] 2xl:mt-[150px]">
              <Suspense fallback={<TopTrainersSkeleton />}>
                <TopTrainersFirstPage params={resolvedParams} mainData={mainData} />
              </Suspense>
            </div>

            <Suspense fallback={<EducationCategoriesSkeleton />}>
              <EducationCategoriesContent mainData={mainData} params={resolvedParams} />
            </Suspense>

            <Suspense fallback={<EducationListSkeleton />}>
              <EducationListContent lang={lang} mainData={mainData} params={resolvedParams} />
            </Suspense>

          </section>
        </div>
      </>
    );
  }
  catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack:
        error instanceof Error ? error.stack : null,
      name:
        error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in EductionPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}

// SEO**
export async function generateMetadata({ params }: CitizensPageProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const langData = await getTranslation(lang);

    const mainData = await getMainFile(langData);

    async function makeLessCharacter() {
      let temp = findByUniqueId(mainData, 164);
      temp = temp.slice(0, 200);
      return temp;
    }

    return {
      title: await findByUniqueId(mainData, 165),
      description: await makeLessCharacter(),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 593),
        description: await makeLessCharacter(),
        locale: lang == "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/education`,
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