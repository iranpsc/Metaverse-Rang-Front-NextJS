// app/[lang]/levels/citizen/page.tsx

import { Suspense } from "react";

import {
  getAllLevels,
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";

import Footer from "@/components/shared/footer/DynamicFooter";
import LevelsContent from "@/components/features/levels/LevelsContent";
import LevelsClientSkeleton from "@/components/skeleton/LevelsClientSkeleton";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

/* -------------------------------------------------------------------------- */
/*                                   Metadata                                 */
/* -------------------------------------------------------------------------- */

interface PageParams {
  lang: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  try {
    const { lang } = await params;

    // توجه: generateMetadata جدا از خود صفحه اجرا می‌شه، پس اینجا
    // getAllLevels همچنان لازمه (مستقل از LevelsContent).
    const levelArray = await getAllLevels();
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const description =
      findByUniqueId(mainData, 1417)?.slice(0, 200) || "";

    return {
      title: findByUniqueId(mainData, 587),
      description,
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 587),
        description,
        locale: lang === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/levels/citizen`,
        images: [
          {
            url: levelArray?.[0]?.image || "/logo.png",
            width: 800,
            height: 600,
            alt: findByUniqueId(mainData, 587),
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

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

interface LevelsPageProps {
  params: Promise<PageParams>;
}

export default async function LevelsPage({ params }: LevelsPageProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;

    /* ----------------------------- Fetch Data ------------------------------ */
    // ❌ قبلاً اینجا getAllLevels() هم جزو Promise.all بود؛ این فچ
    // (که کندترین بخش صفحه‌ست) الان رفته داخل LevelsContent که خودش
    // زیر <Suspense> رندر می‌شه. یعنی breadcrumb/عنوان/فوتر منتظرش
    // نمی‌مونن؛ فقط بخش کارت‌های سطح تا رسیدن دیتا اسکلت نشون می‌ده.
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    /* ------------------------------ Content -------------------------------- */

    /* -------------------------------- Render ------------------------------- */

    return (
      <>
        <CleanAutoRetryParam />

        <section
          className="h-[calc(100vh-60px)] lg:h-screen overflow-y-auto mt-[60px] lg:mt-0  bg-bg-primary light-scrollbar dark:dark-scrollbar"
          dir={langData.direction}
        >
          <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
            <BreadCrumb params={resolvedParams} />
          </div>

          <div className="mt-[40px] xl:px-8 lg:px-8 px-5 text-center">
            <h2 className="font-rokh font-bold text-[32px] dark:text-white mb-4 ">
              {findByUniqueId(mainData, 587)}
            </h2>
            <p className="text-lightGrey dark:text-matn-2 text-[20px]">
              {findByUniqueId(mainData, 1417)}
            </p>
          </div>

          <div className="flex justify-center flex-wrap mt-8">
            <Suspense fallback={<LevelsClientSkeleton />}>
              <LevelsContent
                params={resolvedParams}
                mainData={mainData}
              />
            </Suspense>
          </div>


          <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1 mt-10">
            <Footer
              mainData={mainData}
              params={resolvedParams}
            />
          </div>
        </section>
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

    console.error("❌ Error in LevelPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}