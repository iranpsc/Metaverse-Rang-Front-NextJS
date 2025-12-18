// src/app/[lang]/articles/categories/page.tsx
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList"; // Client Component
import SearchComponent from "@/components/shared/SearchComponent"; // Client Component
import { supabase } from "@/utils/lib/supabaseClient";
import { getTranslation, getMainFile, getFooterData } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
export async function generateMetadata({ params }: { params: { lang: string } }) {
  const baseUrl = "https://rgb.irpsc.com";
  const langPrefix = params.lang ? `/${params.lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;

  const title = "دسته‌بندی مقالات متاورس رنگ";
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
}

export default async function CategoriesPage({ params  }: { params: { lang: string } }) {
  const [ langData] = await Promise.all([
    getTranslation(params.lang),
  ]);
  const mainData = await getMainFile(langData);
  // ✅ اصلاح ستون تاریخ: 'date' به جای 'created_at'
  const { data: articlesData, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
  }

  const articles = articlesData || [];

  // دسته‌بندی‌ها
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
  const categoryImages: Record<string, string> = {};
  articles.forEach((a) => {
    if (a.category && a.categoryImage && !categoryImages[a.category]) {
      categoryImages[a.category] = a.categoryImage;
    }
  });

  const subcategoryCounts: Record<string, number> = {};
  articles.forEach((a) => {
    if (a.category && a.subCategory) {
      subcategoryCounts[a.category] = (subcategoryCounts[a.category] || 0) + 1;
    }
  });

  const baseUrl = "https://rgb.irpsc.com";
  const langPrefix = params.lang ? `/${params.lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/articles/categories`;

  // console.log("articlesData:", articlesData);
  // console.log("categories:", categories);
  // console.log("categoryImages:", categoryImages);
  // console.log("subcategoryCounts:", subcategoryCounts);

  // ✅ JSON-LD schema
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
          "url": `${baseUrl}${langPrefix}/articles/categories/${encodeURIComponent(cat)}`,
          "name": cat,
          "image": categoryImages[cat] || undefined,
        })),
      },
    ],
  };

  return (
    <section className="w-full  bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10 ">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <div className="mb-6 mt-[60px] lg:mt-0">
        <BreadCrumb params={params} />
      </div>

      <div className="text-center mt-5">
        <h1 className="font-rokh font-bold text-[30px] dark:text-white">{findByUniqueId(mainData, 1516)} </h1>
        <p className="text-lightGray dark:text-lightGray text-lg mt-2">
          {findByUniqueId(mainData, 1592)}
        </p>
      </div>

      {/* کامپوننت Client برای جستجو */}
      <div className="my-8">
        <SearchComponent searchLevel="articles" articles={articles} params={params} mainData={mainData}/>
      </div>

      {/* لیست دسته‌بندی‌ها */}
      <CategoriesList
        categories={categories}
        categoryImages={categoryImages}
        subcategoryCounts={subcategoryCounts}
        params={params}
        mainData={mainData}
      />
    </section>
  );
}
