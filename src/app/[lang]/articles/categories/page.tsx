// src/app/[lang]/articles/categories/page.tsx
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList"; // Client Component
import SearchComponent from "@/components/shared/SearchComponent"; // Client Component
import { supabase } from "@/utils/lib/supabaseClient";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
interface CategoriesPageProps {
  params: Promise<{ lang: string }>;
}
export async function generateMetadata({ params}: CategoriesPageProps
) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const baseUrl = "https://metarang.com";
    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;
    const [langData] = await Promise.all([getTranslation(lang)]);
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
    const [langData] = await Promise.all([getTranslation(lang)]);
    const mainData = await getMainFile(langData);

    const { data: articlesData, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false });

    if (error) console.error("Supabase fetch error:", error);

    const articles = articlesData || [];

    // دسته‌بندی‌ها
    const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
    const categoryImages: Record<string, string> = {};
    const categorySlugs: Record<string, string> = {}; // اضافه شد
    articles.forEach((a) => {
      if (a.category) {
        if (a.categoryImage && !categoryImages[a.category]) {
          categoryImages[a.category] = a.categoryImage;
        }
        // اگر slug وجود دارد از آن استفاده کن، در غیر این صورت خود name را encode کن
        categorySlugs[a.category] = a.categorySlug ? a.categorySlug : encodeURIComponent(a.category);
      }
    });

    const subcategoryCounts: Record<string, number> = {};
    articles.forEach((a) => {
      if (a.category && a.subCategory) {
        subcategoryCounts[a.category] = (subcategoryCounts[a.category] || 0) + 1;
      }
    });

    const baseUrl = "https://metarang.com";
    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;

    // JSON-LD schema
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}${langPrefix}` },
            { "@type": "ListItem", "position": 2, "name": "مقالات", "item": `${baseUrl}${langPrefix}/articles` },
            { "@type": "ListItem", "position": 3, "name": "دسته‌بندی مقالات", "item": fullPageUrl },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${fullPageUrl}#webpage`,
          "url": fullPageUrl,
          "name": "دسته‌بندی مقالات متاورس رنگ",
          "isPartOf": { "@type": "WebSite", "name": "Metaverse Rang", "url": baseUrl },
        },
        {
          "@type": "ItemList",
          "name": "دسته‌بندی‌های مقالات",
          "itemListOrder": "Ascending",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((cat, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${baseUrl}${langPrefix}/articles/categories/${categorySlugs[cat]}`, // slug استفاده شد
            "name": cat,
            "image": categoryImages[cat] || undefined,
          })),
        },
      ],
    };

    return (
      <section className="w-full  bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10 ">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <CleanAutoRetryParam />
        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className="text-center mt-5">
          <h1 className="font-rokh font-bold text-[30px] dark:text-white">{findByUniqueId(mainData, 1516)} </h1>
          <p className="text-lightGray dark:text-lightGray text-lg mt-2">
            {findByUniqueId(mainData, 1592)}
          </p>
        </div>

        {/* کامپوننت Client برای جستجو */}
        <div className="my-8">
          <SearchComponent searchLevel="articles" articles={articles} params={resolvedParams} mainData={mainData} />
        </div>

        {/* لیست دسته‌بندی‌ها */}
        <CategoriesList
          categories={categories}
          categoryImages={categoryImages}
          categorySlugs={categorySlugs} // اضافه شد
          subcategoryCounts={subcategoryCounts}
          params={resolvedParams}
          mainData={mainData}
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

    console.error("❌ Error in ArticlesCategoriesPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
