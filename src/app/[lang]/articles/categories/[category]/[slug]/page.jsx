import dynamic from "next/dynamic";
import NotFoundPage from "@/components/shared/NotFoundPage";
import { supabase } from "@/utils/lib/supabaseClient";

import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import BreadCrumb from "@/components/shared/BreadCrumb";

import AuthorSection from "./components/AuthorSection";
import ArticleHeader from "./components/ArticleHeader";
import ArticleImage from "./components/ArticleImage";
import ArticleContent from "./components/ArticleContent";
import SideCard from "./components/SideCard";
import PopularArticlesSlider from "../../../components/PopularArticlesSlider";
import RelatedArticlesSlider from "./components/RelatedArticlesSlider";
import PrevNextArticles from "./components/PrevNextArticles";
import AuthorCard from "./components/AuthorCard";
import ShowSocialWrapper from "./components/ShowSocialWrapper";


// ======================================
// ✅ Metadata از Supabase
// ======================================
export async function generateMetadata({ params }) {
  const { slug } = params;

  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) return { title: "مقاله یافت نشد" };

  return {
    title: article.title,
    description: article.excerpt || article.description || "",
    authors: [{ name: article.author?.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt || article.description || "",
      images: article.image ? [{ url: article.image }] : [],
      url: `https://rgb.irpsc.com/${params.lang}/articles/categories/${decodeURIComponent(
        params.category
      )}/${article.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.description || "",
      images: article.image ? [article.image] : [],
    },
  };
}


// ======================================
// ✅ صفحه مقاله
// ======================================
export default async function ArticlePage({ params , mainData}) {
  try {
    const { slug , category } = params;

    // --- گرفتن مقاله اصلی ---
    const { data: article } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();
    // گرفتن همه مقالات همان دسته‌بندی برای Prev/Next
    const { data: categoryArticles } = await supabase
      .from("articles")
      .select("*")
      .eq("category", category) // ← حالا category درست کار می‌کند
      .order("date", { ascending: true });

    const [ langData, langArray] = await Promise.all([
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    // ❌ اگر مقاله نبود
    if (!article) {
      return (
        <NotFoundPage
          lang={params.lang}
          params={params}
          langData={langData}
          langArray={langArray}
          footerTabs={footerTabs}
          mainData={mainData}
        />
      );
    }


    // ======================================
    // ✅ JSON-LD Schema
    // ======================================
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt || article.description || "",
      image: article.image ? [article.image] : undefined,
      author: {
        "@type": "Person",
        name: article.author?.name ?? "نویسنده",
      },
      datePublished: article.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://rgb.irpsc.com/${params.lang}/articles/categories/${decodeURIComponent(
          params.category
        )}/${article.slug}`,
      },
      publisher: {
        "@type": "Organization",
        name: "متاورس رنگ",
        logo: {
          "@type": "ImageObject",
          url: "https://rgb.irpsc.com/logo.png",
        },
      },
    };


    // ======================================
    // ✅ رندر صفحه
    // ======================================
    return (
      <div className="w-full h-screen  relative bg-[#f8f8f8] dark:bg-black" dir={langData.direction}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <section className="w-full overflow-y-auto relative bg-[#f8f8f8] dark:bg-black mt-[60px] lg:mt-0">

          <div className="px-5 2xl:px-10">
            <BreadCrumb params={params} />
          </div>

          <div className="mainContainer w-full flex flex-col gap-5 items-center lg:flex-row lg:items-start px-5 lg:px-10">

            {/* ستون اصلی */}
            <div className="lg:w-[70%] 3xl:w-[80%]">

              <div className="flex flex-col gap-10 w-full items-center rounded-xl bg-white dark:bg-[#1A1A18] shadow-lg p-5 xl:p-10">

                <AuthorSection
                  author={article.author}
                  date={article.date}
                  excerpt={article.excerpt}
                  title={article.title}
                  content={article.content}
                  stats={article.stats}
                  mainData={mainData}
                />

                <ArticleHeader
                  title={article.title}
                  author={article.author}
                  date={article.date}
                  description={article.description}
                />

                <ArticleImage key={article.id} article={article} mainData={mainData}/>

                <ArticleContent content={article.content} tags={article.tags} />
              </div>


              {/* بخش‌های جانبی پایین مقاله */}
              <div className="w-full mt-10 space-y-28">
                <ShowSocialWrapper params={params} mainData={mainData} article={article} />
                <PrevNextArticles  params={params} articles={categoryArticles || []}  mainData={mainData}/>
                <AuthorCard lang={params.lang} article={article} mainData={mainData} />
              </div>
            </div>

            {/* سایدبار */}
            <div className="w-full hidden lg:block lg:w-[30%] 3xl:w-[20%] sticky top-5">
              <SideCard params={params} mainData={mainData} />
            </div>

          </div>

          {/* اسلایدرها */}
          <div className="ps-5 lg:ps-10 w-full flex items-center mt-14 lg:mt-20 flex-col gap-14">
            <PopularArticlesSlider params={params} mainData={mainData} />
            <RelatedArticlesSlider params={params} mainData={mainData} />
          </div>

        </section>
      </div>
    );

  } catch (error) {
    return (
      <div className="text-center text-red-600 mt-20 p-5">
        خطایی رخ داد: {String(error)}
      </div>
    );
  }
}
