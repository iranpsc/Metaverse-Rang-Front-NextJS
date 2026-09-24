// src/app/[lang]/articles/categories/page.tsx
import { Suspense } from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ArticleCategoriesContent from "@/components/features/ArticleCategoriesContent";
import ArticleCategoriesListSkeleton from "@/components/skeleton/ArticleCategoriesListSkeleton";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface CategoriesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: CategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const baseUrl = "https://metarang.com";
    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);
    const title = findByUniqueId(mainData, 1516);
    const description =
      "در بخش دسته‌بندی مقالات متاورس رنگ، با موضوعات مختلفی از فناوری متاورس، هوش مصنوعی، بلاک‌چین و دنیای دیجیتال آشنا شوید.";

    return {
      title,
      description,
      alternates: { canonical: fullPageUrl },
      openGraph: {
        title,
        description,
        url: fullPageUrl,
        siteName: "MetaRang",
        images: "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
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

export const revalidate = 0;

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    // ❌ قبلاً یه Promise.all روی فقط یک پرامیس بود (بی‌فایده).
    // ❌ فچ Supabase (کندترین بخش صفحه) هم بالا بود و کل صفحه رو بلاک
    // می‌کرد. الان رفته داخل ArticleCategoriesContent زیر <Suspense>.
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    return (
      <section className="w-full  bg-bg-primary  px-5 3xl:px-10 ">
        <CleanAutoRetryParam />
        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className="text-center mt-5">
          <h1 className="font-rokh font-bold text-[30px] dark:text-white">{findByUniqueId(mainData, 1516)} </h1>
          <p className="text-matn-2 dark:text-matn-2 text-lg mt-2">
            {findByUniqueId(mainData, 1592)}
          </p>
        </div>

        <Suspense fallback={<ArticleCategoriesListSkeleton />}>
          <ArticleCategoriesContent lang={lang} mainData={mainData} params={resolvedParams} />
        </Suspense>
      </section>
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

    console.error("❌ Error in ArticlesCategoriesPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}