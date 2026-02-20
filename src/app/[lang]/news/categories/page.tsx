// src/app/[lang]/news/categories/page.tsx

import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList"; // همون کامپوننت
import SearchComponent from "@/components/shared/SearchComponent";
import { supabase } from "@/utils/lib/supabaseClient";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  try {
    const baseUrl = "https://rgb.irpsc.com";
    const langPrefix = params.lang ? `/${params.lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/news/categories`;

    const title = "دسته‌بندی اخبار متاورس رنگ";
    const description =
      "در بخش دسته‌بندی اخبار متاورس رنگ، جدیدترین اخبار فناوری، متاورس، بلاک‌چین و هوش مصنوعی را دنبال کنید.";

    return {
      title,
      description,
      alternates: { canonical: fullPageUrl },
      openGraph: {
        title,
        description,
        url: fullPageUrl,
        siteName: "MetaRang",
        images: "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=128&q=75",
        locale: params.lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=128&q=75",
      },
    };
  } catch (error) {
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export const revalidate = 0;

export default async function NewsCategoriesPage({ params }: { params: { lang: string } }) {
  try {
    const [langData] = await Promise.all([getTranslation(params.lang)]);
    const mainData = await getMainFile(langData);

    const { data: newsData, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) console.error("Supabase fetch error:", error);


    const news = newsData || [];

    // دسته‌بندی‌ها
    const categories = [...new Set(news.map((n) => n.category).filter(Boolean))];

    const categoryImages: Record<string, string> = {};
    const categorySlugs: Record<string, string> = {};
    const subcategoryCounts: Record<string, number> = {};
    news.forEach((n) => {
      if (n.category) {
        if (n.categoryImage && !categoryImages[n.category]) {
          categoryImages[n.category] = n.categoryImage;
        }

        categorySlugs[n.category] = n.categorySlug
          ? n.categorySlug
          : encodeURIComponent(n.category);
      }
    });
    

news.forEach((n) => {
  if (n.category && n.subCategory) {
    subcategoryCounts[n.category] =
      (subcategoryCounts[n.category] || 0) + 1;
  }
});


    const baseUrl = "https://rgb.irpsc.com";
    const langPrefix = params.lang ? `/${params.lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/news/categories`;

    // JSON-LD
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}${langPrefix}` },
            { "@type": "ListItem", "position": 2, "name": "اخبار", "item": `${baseUrl}${langPrefix}/news` },
            { "@type": "ListItem", "position": 3, "name": "دسته‌بندی اخبار", "item": fullPageUrl },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${fullPageUrl}#webpage`,
          "url": fullPageUrl,
          "name": "دسته‌بندی اخبار متاورس رنگ",
          "isPartOf": { "@type": "WebSite", "name": "MetaRang", "url": baseUrl },
        },
        {
          "@type": "ItemList",
          "name": "دسته‌بندی‌های اخبار",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((cat, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${baseUrl}${langPrefix}/news/categories/${categorySlugs[cat]}`,
            "name": cat,
            "image": categoryImages[cat] || undefined,
          })),
        },
      ],
    };

    return (
      <section className="w-full bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <CleanAutoRetryParam />

        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} />
        </div>

        <div className="text-center mt-5">
          <h1 className="font-rokh font-bold text-[30px] dark:text-white">
            {findByUniqueId(mainData, 1516) || "دسته‌بندی اخبار"}
          </h1>
          <p className="text-lightGray text-lg mt-2">
            {findByUniqueId(mainData, 1592)}
          </p>
        </div>

        <div className="my-8">
          <SearchComponent
            searchLevel="news"
            articles={news}
            params={params}
            mainData={mainData}
          />
        </div>

        <CategoriesList
          categories={categories}
          categoryImages={categoryImages}
          categorySlugs={categorySlugs}
          subcategoryCounts={subcategoryCounts}
          params={params}
          mainData={mainData}
        />
      </section>
    );
  } catch (error) {
    return <CustomErrorPage />;
  }
}
