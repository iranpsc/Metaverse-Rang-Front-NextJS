// src/app/[lang]/articles/page.jsx
import Link from "next/link";
import Footer from "@/components/module/footer/Footer";
import SideBar from "@/components/module/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { cookies } from "next/headers";
import { articles } from "@/components/utils/articles";

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";

export default async function ArticlesPage({ params }) {
  // گرفتن داده‌ها از سرور
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  // گرفتن منوی مرکزی
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = centralPageModal ? await findByTabName(centralPageModal, "before-login") : [];

  // استفاده از شناسه پیش‌فرض برای getStaticMenu در صفحات بدون id
  const staticMenuToShow = getStaticMenu(params.id || "articles");

  // ترکیب منوهای داینامیک و استاتیک
  const updatedTabsMenu = (tabsMenu || []).map((tab) => {
    const staticTab = (staticMenuToShow || []).find(
      (val) => val.unique_id === tab.unique_id
    );
    if (staticTab) {
      return {
        ...tab,
        url: staticTab.url,
        order: staticTab.order,
        toShow: true,
      };
    }
    return tab;
  });

  // گرفتن token از کوکی‌ها (در صورت نیاز)
  const cookieStore = cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  return (
    <div className="flex h-screen overflow-hidden min-w-[340px]" dir={langData.direction}>
      {/* Sidebar */}
      <SideBar
        tabsMenu={updatedTabsMenu}
        langData={langData}
        langArray={langArray}
        params={params}
        pageSide="citizen"
      />

      {/* Main content */}
      <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20">
        {/* Breadcrumb */}
        <div className="px-12">
          <BreadCrumb params={params} />
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold mb-8">📚 لیست مقالات</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white shadow rounded-2xl overflow-hidden border">
                <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                  <Link href={`/${params.lang}/articles/${article.slug}`} className="inline-block mt-3 text-blue-600 font-medium hover:underline">
                    ادامه مطلب →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <Footer footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </div>
  );
}
