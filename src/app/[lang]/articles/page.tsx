import { Suspense } from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import LatestArticlesSlider from "../../../components/shared/slider/LatestArticlesSlider";
import PopularArticlesSlider from "../../../components/shared/slider/PopularArticlesSlider";
import SearchComponent from "@/components/Search/SearchComponent";
import TopWritersArticles from "../../../components/features/TopWritersArticles";
import TopWritersSkeleton from "@/components/skeleton/TopWritersSkeleton";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { articles } from "@/components/utils/articles";
const baseUrl = "https://metarang.com";
const imageUrl = "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75";
interface ArticlesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ArticlesPageProps) {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const url = `${baseUrl}/${lang}/articles`;

    return {
      title: lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles",
      description: lang === "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید" : "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
      openGraph: {
        title: lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles",
        description: lang === "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید" : "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
        url,
        siteName: "Metaverse Rang",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: "مقالات متاورس رنگ",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "مقالات متاورس رنگ",
        description:
          "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
        images: [imageUrl],
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


export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    // ❌ قبلاً یه Promise.all روی فقط یک پرامیس بود (بی‌فایده، فقط گیج‌کننده).
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/articles`;

    // ❌ قبلاً: const topWritersArticles = await TopWritersArticles({params, mainData})
    // این یه ضدالگوی جدی بود — TopWritersArticles یه Server Component
    // (تابع async که JSX برمی‌گردونه) هست، نه یه تابع داده‌ای معمولی.
    // await کردنش این‌جوری باعث می‌شد کل صفحه، قبل از رندر شدن هر خط
    // JSX، منتظر فچ getTopWritersUsers بمونه — و امکان Suspense/اسکلت
    // هم اصلاً وجود نداشت. الان به‌عنوان JSX عادی، زیر <Suspense> رندر
    // می‌شه؛ بقیه‌ی صفحه فوراً میاد و فقط همین بخش تا رسیدن دیتا اسکلت
    // نشون می‌ده.

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "صفحه اصلی",
              item: `${baseUrl}${langPrefix}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "مقالات",
              item: fullPageUrl,
            },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${fullPageUrl}#webpage`,
          url: fullPageUrl,
          name: "مقالات متاورس رنگ",
          description:
            "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
          isPartOf: {
            "@type": "WebSite",
            name: "Metaverse Rang",
            url: baseUrl,
          },
        },
        {
          "@type": "ItemList",
          name: "لیست مقالات متاورس رنگ",
          itemListOrder: "Descending",
          numberOfItems: articles.length,
          itemListElement: articles.map((a, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}${langPrefix}/articles/categories/${a.category}/${a.slug}`,
            name: a.title,
            image: a.image || undefined,
          })),
        },
      ],
    };

    return (
      <section
        className="w-full relative lg:pt-0 bg-bg-primary  "
        dir={langData.direction}
      >
        <CleanAutoRetryParam />
        <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className=" 2xl:px-10 mt-5">
          <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
            {findByUniqueId(mainData, 1513)}
          </h1>
          <p className="text-matn-2  dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
            {findByUniqueId(mainData, 1514)}
          </p>
        </div>

        <div className="mb-10 mt-[-50px] lg:mt-5 space-y-7">
          <div className="flex flex-col-reverse  lg:gap-5 lg:flex-row lg:justify-between lg:items-center w-full px-5 lg:pe-4">
            <h2 className="md:w-1/2 lg:ms-5 mt-5 lg:mt-0 lg:mb-[-45px] font-azarMehr text-lg md:text-2xl font-bold text-start dark:text-white text-black ps-[2px]">
              {findByUniqueId(mainData, 1516)}
            </h2>
            <SearchComponent
              searchLevel="articles"
              mainData={mainData}
              params={resolvedParams}
            />
          </div>
        </div>
        <div className="w-full h-fit mt-[60px] lg:mt-20">
          <Suspense fallback={<TopWritersSkeleton />}>
            <TopWritersArticles params={resolvedParams} mainData={mainData} />
          </Suspense>
        </div>
        <div className="ps-5 2xl:ps-10 space-y-14 mt-28">
          <PopularArticlesSlider params={resolvedParams} mainData={mainData} />
          <LatestArticlesSlider params={resolvedParams} mainData={mainData} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
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

    console.error("❌ Error in EductionPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}