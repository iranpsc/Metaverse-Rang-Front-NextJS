// src/app/[lang]/articles/categories/[category]/page.tsx
import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategorySorted from "./components/CategorySorted";
import CategoryHeader from "./components/CategoryHeader";
import SearchComponent from "@/components/shared/SearchComponent";
import Footer from "@/components/module/footer/Footer";
import { getTranslation, getMainFile, getFooterData } from "@/components/utils/actions";
import { supabase } from "@/utils/lib/supabaseClient";

interface CategoryPageProps {
  params: {
    lang: string;
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rgb.irpsc.com";

  // ✅ گرفتن داده از Supabase
  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("date", { ascending: false });

  const categoryArticles = articlesData || [];

  if (categoryArticles.length === 0) {
    return {
      title: `دسته ${category} | مقالات`,
      description: `هیچ مقاله‌ای در دسته ${category} یافت نشد.`,
      alternates: {
        canonical: `${siteUrl}/${params.lang}/articles/categories/${category}`,
      },
    };
  }

  const { category: catName, categoryDec, categoryImage } = categoryArticles[0];
  const title = `${catName} | مقالات`;
  const description = categoryDec || `مطالب و مقالات مرتبط با ${catName}`;
  const image = categoryImage?.startsWith("http")
    ? categoryImage
    : `${siteUrl}${categoryImage?.startsWith("/") ? "" : "/"}${categoryImage || "default.jpg"}`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${params.lang}/articles/categories/${category}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${params.lang}/articles/categories/${category}`,
      type: "website",
      siteName: "متاورس رنگ",
      locale: params.lang === "fa" ? "fa_IR" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: catName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);

  const [footerTabs, langData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
  ]);
  const mainData = await getMainFile(langData);

  // ✅ گرفتن مقالات از Supabase
  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("date", { ascending: false });

  const categoryArticles = articlesData || [];

  if (categoryArticles.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-2xl font-semibold mb-4">
          دسته‌ای با نام «{category}» پیدا نشد 😕
        </h2>
        <Link
          href={`/${params.lang}/articles`}
          className="text-blue-600 hover:underline"
        >
          بازگشت به لیست مقالات
        </Link>
      </div>
    );
  }

  const { category: catName, subCategory, categoryImage, categoryDec } =
    categoryArticles[0];

  const totalLikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.likes ?? 0), 0);
  const totalDislikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.dislikes ?? 0), 0);
  const totalViews = categoryArticles.reduce((sum, a) => sum + (a.stats?.views ?? 0), 0);
  const totalArticles = categoryArticles.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": catName,
    "description": categoryDec || `مقالات مرتبط با ${catName}`,
    "url": `https://rgb.irpsc.com/${params.lang}/articles/categories/${category}`,
    "image": categoryImage || "/default-bg.jpg",
    "mainEntity": {
      "@type": "ItemList",
      "name": `مقالات دسته ${catName}`,
      "itemListOrder": "Descending",
      "numberOfItems": categoryArticles.length,
      "itemListElement": categoryArticles.map((a, index) => {
        const published = a.date ? new Date(a.date).toISOString() : new Date().toISOString();
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "BlogPosting",
            "headline": a.title,
            "description": a.description || categoryDec || "این یک مقاله آموزشی است",
            "url": `https://rgb.irpsc.com/${params.lang}/articles/categories/${category}/${a.slug}`,
            "datePublished": published,
            "dateModified": published,
            "image": a.image || "/default-bg.jpg",
            "author": {
              "@type": "Person",
              "name": a.author?.name || "مدیر سایت",
              "url": a.author?.citizenId
                ? `https://rgb.irpsc.com/${params.lang}/citizens/${a.author.citizenId}`
                : undefined,
              "identifier": a.author?.citizenId || "CIT-0000",
            },
            "publisher": {
              "@type": "Organization",
              "name": "متاورس رنگ",
              "logo": { "@type": "ImageObject", "url": "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75" },
            },
            "inLanguage": params.lang || "fa",
            "isAccessibleForFree": true,
            "genre": a.category || "مقاله آموزشی",
            "keywords": a.tags?.join(", ") || `${catName}, آموزش, مقاله`,
            "commentCount": a.stats?.comments ?? 0,
            "interactionStatistic": [
              { "@type": "InteractionCounter", "interactionType": "https://schema.org/LikeAction", "userInteractionCount": a.stats?.likes ?? 0 },
              { "@type": "InteractionCounter", "interactionType": "https://schema.org/DislikeAction", "userInteractionCount": a.stats?.dislikes ?? 0 },
              { "@type": "InteractionCounter", "interactionType": "https://schema.org/ViewAction", "userInteractionCount": a.stats?.views ?? 0 },
            ],
          },
        };
      }),
    },
  };

  return (
    <section className="w-full h-screen overflow-y-auto relative bg-[#f8f8f8] dark:bg-black light-scrollbar dark:dark-scrollbar">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
        <BreadCrumb params={params} />
      </div>

      <CategoryHeader
        data={{
          category: catName,
          subCategory,
          categoryImage: categoryImage || "/default-bg.jpg",
          categoryDec: categoryDec || "توضیحی برای این دسته موجود نیست.",
          totalLikes,
          totalDislikes,
          totalViews,
          totalArticles,
        }}
      />

      <div className="flex flex-col-reverse justify-start gap-7 lg:gap-5 lg:flex-row lg:justify-between items-start lg:items-center w-full px-5 lg:pe-4 mt-[-100px] lg:mt-0">
        <h2 className="md:w-1/2 lg:ms-5 mt-5 lg:mt-0 lg:mb-[-45px] font-azarMehr text-lg md:text-2xl font-bold text-start dark:text-white text-black ps-2 lg:ps-[2px]">
          زیر دسته‌های {catName}
        </h2>

        <SearchComponent searchLevel="articles" mainData={categoryArticles} params={params} />
      </div>

      <div className="mt-10 lg:px-5">
        <CategorySorted params={params} category={category} articles={categoryArticles} />
      </div>

      <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
      </div>
    </section>
  );
}
