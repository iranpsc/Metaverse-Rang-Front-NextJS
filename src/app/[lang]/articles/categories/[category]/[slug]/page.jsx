import dynamic from "next/dynamic";
import NotFoundPage from "@/components/shared/NotFoundPage";
import { articles } from "@/components/utils/articles";

import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";


import BreadCrumb from "@/components/shared/BreadCrumb";

import ArticleHeader from "./components/ArticleHeader";
import AuthorSection from "./components/AuthorSection";
import ArticleImage from "./components/ArticleImage";
import ArticleBody from "./components/ArticleBody";
import SideCard from "./components/SideCard";
import PopularArticlesSlider from "../../../components/PopularArticlesSlider";
import RelatedArticlesSlider from "./components/RelatedArticlesSlider";
import PrevNextArticles from "./components/PrevNextArticles";
import AuthorCard from "./components/AuthorCard";
import ShowSocialWrapper from "./components/ShowSocialWrapper";

const DynamicFooter = dynamic(() => import("@/components/module/footer/Footer"));

export async function generateMetadata({ params }) {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) return { title: "مقاله یافت نشد" };

  return {
    title: article.title,
    description: article.excerpt || article.description || "",
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt || article.description || "",
      images: article.image ? [{ url: article.image }] : [],
      url: `rgb.irpsc.com/${params.lang}/articles/categories/${decodeURIComponent(params.category)}/${article.slug}`,
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

export default async function ArticlePage({ params }) {
  try {
    const article = articles.find(a => a.slug === params.slug);

    const [footerTabs, langData, langArray] = await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);
   
    ;

    if (!article) {
      return (
        <NotFoundPage
          lang={params.lang}
          params={params}
          langData={langData}
          langArray={langArray}
          updatedTabsMenu={updatedTabsMenu}
          footerTabs={footerTabs}
          mainData={mainData}
        />
      );
    }

    // ✅ JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt || article.description || "",
      image: article.image ? [article.image] : undefined,
      author: {
        "@type": "Person",
        name: article.author.name,
      },
      datePublished: article.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `rgb.irpsc.com/${params.lang}/articles/categories/${decodeURIComponent(params.category)}/${article.slug}`,
      },
      publisher: {
        "@type": "Organization",
        name: "متاورس رنگ",
        logo: {
          "@type": "ImageObject",
          url: "/logo.png",
        },
      },
    };

    return (
      <div className="flex h-screen overflow-hidden min-w-[340px]" dir={langData.direction}>
        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar bg-[#f8f8f8] dark:bg-black mt-[60px] lg:mt-0 lg:pt-0">
          <div className="px-5 2xl:px-10">
            <BreadCrumb params={params} />
          </div>

          <div className="mainContainer w-full h-auto flex flex-col gap-5 items-center font-['AzarMehr'] lg:flex-row lg:items-start px-5 lg:px-10">
            <div className="lg:w-[70%] 3xl:w-[80%]">
              <div className="flex flex-col gap-10 w-full items-center rounded-xl bg-white dark:bg-[#1A1A18] shadow-lg p-5 xl:p-10 3xl:py-11">
                <AuthorSection author={article.author}  date={article.date} excerpt={article.excerpt} title={article.title} content={article.content} stats={article.stats}/>
                <ArticleHeader title={article.title} author={article.author} date={article.date} description={article.description} />

                <ArticleImage key={article.id} article={article} />

                <ArticleBody content={article.content}  tags={article.tags}/>
              </div>
              <div className="w-full mt-10 space-y-28">
                <ShowSocialWrapper params={params} mainData={mainData} key={article.id} article={article} />
                <PrevNextArticles params={params} mainData={mainData} />
                <AuthorCard lang={params.lang} slug={params.slug} />
              </div>
            </div>
            <div className="w-full hidden lg:block lg:w-[30%] 3xl:w-[20%] sticky top-5">
              <SideCard params={params} mainData={mainData}/>
            </div>
          </div>

          <div className="ps-5 lg:ps-10 w-full flex items-center mt-14 lg:mt-20 flex-col gap-14">
            <PopularArticlesSlider params={params} mainData={mainData}/>
            <RelatedArticlesSlider params={params} mainData={mainData}/>
          </div>
          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} mainData={mainData} params={params} />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600 mt-20 p-5 text-base">
        خطایی رخ داد: {String(error)}
      </div>
    );
  }
}
