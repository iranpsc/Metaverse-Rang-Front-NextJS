// src/app/[lang]/articles/page.jsx

import Footer from "@/components/module/footer/Footer";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { articles } from "@/components/utils/articles";
import LatestArticlesSlider from "./components/LatestArticlesSlider";
import PopularArticlesSlider from "./components/PopularArticlesSlider";
import CategoriesGrid from "./components/CategoriesGrid";
import SearchComponent from "@/components/shared/SearchComponent";

import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";

export default async function ArticlesPage({ params }) {
  const [footerTabs, langData,] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

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
            <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
          </div>
        </section>
      </div>
    );
  }

  // استخراج دسته‌ها و تصاویر یکتا
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
  const categoryImages = {};
  articles.forEach((a) => {
    if (a.category && a.categoryImage && !categoryImages[a.category]) {
      categoryImages[a.category] = a.categoryImage;
    }
  });

  return (

    <section className="w-full h-screen overflow-y-auto relative  mt-[60px] lg:mt-0 lg:pt-0  bg-[#f8f8f8] dark:bg-black light-scrollbar dark:dark-scrollbar" dir={langData.direction}>
      <div className="px-12">
        <BreadCrumb params={params} />
      </div>


      <div className="px-5 2xl:px-10 mt-5">
        <h1 className=" text-lg md:text-2xl dark:text-white font-bold">مقالات متاورس رنگ</h1>
        <p className=" test-sm md:text-xl text-[#656565] dark:text-[#A0A0A0] mt-5">در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید</p>
      </div>
      {/* دسته‌بندی‌ها */}
      <div className="mb-10 mt-10 space-y-14">

        <div className="flex flex-col-reverse lg:gap-5 lg:flex-row lg:justify-between items-center w-full px-5 lg:pe-4">
          <h2 className="md:w-1/2 lg:ms-5 mt-5 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
            دسته بندی های مقالات
          </h2>
   
            <SearchComponent searchLevel="articles" mainData={mainData} params={params} />

        </div>
       <div className="px-5  2xl:px-10">
         <CategoriesGrid params={params} mainData={mainData} />
       </div>
      </div>

      <div className="ps-5 2xl:ps-10 space-y-14 mt-28">
        <PopularArticlesSlider params={params} mainData={mainData} />
        <LatestArticlesSlider params={params} mainData={mainData} />
      </div>

      {/* Footer */}
      <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
      </div>
    </section>
  );
}
