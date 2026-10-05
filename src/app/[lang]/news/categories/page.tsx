// src/app/[lang]/news/categories/page.tsx

import { Suspense } from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import NewsCategoriesContent from "@/components/features/NewsCategoriesContent";
import ArticleCategoriesListSkeleton from "@/components/skeleton/ArticleCategoriesListSkeleton";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface NewsCategoriesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: NewsCategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  try {
    const baseUrl = "https://metarang.com";
    const fullPageUrl = `${baseUrl}/${lang}/news/categories`;

    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const title =
      `${findByUniqueId(mainData, 1516)} | ${findByUniqueId(mainData, 148)}`;

    const description =
      "در بخش دسته‌بندی اخبار متاورس رنگ، جدیدترین اخبار فناوری، متاورس، بلاک‌چین و هوش مصنوعی را دنبال کنید.";

    return {
      title,
      description,

      alternates: {
        canonical: fullPageUrl,
      },

      openGraph: {
        title,
        description,
        url: fullPageUrl,
        siteName: "MetaRang",
        images:
          "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images:
          "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (NewsCategoriesPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export const revalidate = 0;

export default async function NewsCategoriesPage({
  params,
}: NewsCategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const baseUrl = "https://metarang.com";
    const pageUrl = `${baseUrl}/${lang}/news/categories`;

    const pageTitle =
      `${findByUniqueId(mainData, 1516)} | ${findByUniqueId(mainData, 148)}`;

    const pageDescription =
      findByUniqueId(mainData, 1592) ||
      "دسته‌بندی اخبار متاورس رنگ، فناوری، متاورس، بلاک‌چین و هوش مصنوعی.";

    /*
     * Schema اصلی صفحه
     *
     * CollectionPage:
     * این صفحه مجموعه‌ای از دسته‌بندی‌های اخبار است.
     *
     * ItemList:
     * برای معرفی آیتم‌های داخل مجموعه استفاده می‌شود.
     *
     * توجه:
     * چون لیست واقعی دسته‌بندی‌ها داخل NewsCategoriesContent ساخته می‌شود،
     * ItemList را اینجا فقط در صورتی اضافه کن که URL دسته‌بندی‌ها را
     * از API/داده صفحه در اختیار داشته باشی.
     */
    const collectionPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: lang === "fa" ? "fa-IR" : "en-US",

      isPartOf: {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "MetaRang",
      },

      about: {
        "@type": "Thing",
        name: lang === "fa" ? "اخبار متاورس رنگ" : "MetaRang News",
      },
    };

    return (
      <section className="w-full bg-bg-primary px-5 3xl:px-10">
        <CleanAutoRetryParam />

        {/* CollectionPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionPageSchema),
          }}
        />

        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className="text-center mt-5">
          <h1 className="font-rokh font-bold text-[30px] dark:text-white">
            {pageTitle}
          </h1>

          <p className="text-matn-2 dark:text-matn-2 text-lg mt-2">
            {pageDescription}
          </p>
        </div>

        <Suspense fallback={<ArticleCategoriesListSkeleton />}>
          <NewsCategoriesContent
            lang={lang}
            mainData={mainData}
            params={resolvedParams}
          />
        </Suspense>
      </section>
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

    console.error(
      "❌ Error in NewsCategoriesPage:",
      serializedError
    );

    return <CustomErrorPage error={serializedError} />;
  }
}