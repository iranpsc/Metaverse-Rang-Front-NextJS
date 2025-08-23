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

import { getStaticMenu } from "@/components/utils/constants";

import BreadCrumb from "@/components/shared/BreadCrumb";

// جداشده به کامپوننت‌های مستقل
import ArticleHeader from "./components/ArticleHeader";
import AuthorSection from "./components/AuthorSection";
import ArticleImage from "./components/ArticleImage";
import ArticleBody from "./components/ArticleBody";
import ListingsGrid from "./components/ListingsGrid";


const DynamicSideBar = dynamic(() => import("@/components/module/sidebar/SideBar"));
const DynamicFooter = dynamic(() => import("@/components/module/footer/Footer"));

export default async function ArticlePage({ params }) {
  try {
    const article = articles.find(a => a.slug === params.slug);

    const [footerTabs, langData, langArray] = await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    const centralPageModal = await findByModalName(mainData, "central-page");
    const tabsMenuRaw = centralPageModal ? await findByTabName(centralPageModal, "before-login") : [];
    const tabsMenu = Array.isArray(tabsMenuRaw) ? tabsMenuRaw : [];

    const staticMenuToShow = getStaticMenu("articles");
    const safeStaticMenu = Array.isArray(staticMenuToShow) ? staticMenuToShow : [];

    const updatedTabsMenu = tabsMenu.map(tab => {
      const staticTab = safeStaticMenu.find(val => val.unique_id === tab.unique_id);
      return staticTab ? { ...tab, url: staticTab.url, order: staticTab.order, toShow: true } : tab;
    });

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

    return (
      <div className="flex h-screen overflow-hidden min-w-[340px]" dir={langData.direction}>
        <DynamicSideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />

        <section className="w-full overflow-y-auto relative light-scrollbar bg-[#f8f8f8] mt-[60px] lg:mt-0 lg:pt-0">
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          <div className="mainContainer w-full h-auto flex flex-col gap-5  items-center  font-['AzarMehr'] lg:flex-row lg:items-start p-5 xl:px-10">
            <div className="flex flex-col gap-10 w-full items-center px-5 lg:px-10 py-5 lg:w-[70%] 3xl:w-[80%] rounded-xl bg-white shadow-lg">
              <AuthorSection author={article.author} date={article.date} excerpt={article.excerpt} title={article.title}/>
              <ArticleHeader title={article.title}
                author={article.author}
                date={article.date}
                description={article.description} />

              <ArticleImage src={article.image} alt={article.title} />
              <ArticleBody content={article.content} />
            </div>
            <div className="w-full lg:w-[30%] 3xl:w-[20%]">
                <ListingsGrid/>
            </div>
          </div>

          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
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
