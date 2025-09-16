// src/app/[lang]/articles/page.jsx
import Link from "next/link";
import Footer from "@/components/module/footer/Footer";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { articles } from "@/components/utils/articles";
import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";

export default async function ArticlesPage({ params }) {
  // گرفتن داده‌ها از سرور
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  // چک کردن وجود langData
  if (!langData) {
    console.error("langData is null or undefined:", langData);
    return (
      <div className="min-h-screen overflow-hidden min-w-[340px]">
        <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black">
          <div className="container mx-auto px-6 py-10">
            <p className="text-red-500">خطا: داده‌های زبان قابل بارگذاری نیست.</p>
          </div>
        </section>
      </div>
    );
  }

  const mainData = await getMainFile(langData);

  // چک کردن وجود articles
  if (!articles || !Array.isArray(articles)) {
    console.error("articles is not defined or not an array:", articles);
    return (
      <div className="min-h-screen overflow-hidden min-w-[340px]" dir={langData.direction}>
        <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-8 dark:text-white">لیست مقالات</h1>
            <p className="text-red-500">خطا: لیست مقالات قابل بارگذاری نیست.</p>
          </div>
          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <Footer footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden min-w-[340px]" dir={langData.direction}>
      {/* Main content */}
      <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black">
        {/* Breadcrumb */}
        <div className="px-12">
          <BreadCrumb params={params} />
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold mb-8 dark:text-white">لیست مقالات</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white shadow rounded-xl overflow-hidden border">
                <img src={article.image} alt={article.title} className="w-full h-[250px] object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                  <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.author.name}</span>
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