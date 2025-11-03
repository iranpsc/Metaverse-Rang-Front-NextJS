import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { articles } from "@/components/utils/articles";
import CategorySorted from "./components/CategorySorted";
import CategoryHeader  from "./components/CategoryHeader";
import SearchComponent from "@/components/shared/SearchComponent";
import Footer from "@/components/module/footer/Footer";

import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";

interface CategoryPageProps {
  params: {
    lang: string;
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);
  const [footerTabs, langData,] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);
  const mainData = await getMainFile(langData);
  const categoryArticles = articles.filter(
    (a) => a.category.trim() === category.trim()
  );

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

  // گرفتن تصویر و توضیحات از اولین مقاله
  const { category: catName, subCategory, categoryImage, categoryDec } = categoryArticles[0];
  // استخراج آمار کلی
  const totalLikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.likes ?? 0), 0);
  const totalDislikes = categoryArticles.reduce((sum, a) => sum + (a.stats?.dislikes ?? 0), 0);
  const totalViews = categoryArticles.reduce((sum, a) => sum + (a.stats?.views ?? 0), 0);
  const totalArticles = categoryArticles.length;


  // استخراج زیر‌دسته‌ها بدون تکرار
  const subCategories = Array.from(
    new Set(
      categoryArticles
        .map((a) => a.subCategory?.trim())
        .filter((s): s is string => !!s)
    )
  );

  return (
    <section className=" w-full h-screen overflow-y-auto relative  mt-[60px] lg:mt-0 lg:pt-0  bg-[#f8f8f8] dark:bg-black light-scrollbar dark:dark-scrollbar">
      <div className="px-6">
        <BreadCrumb params={params} />
      </div>
      {/* کارت معرفی دسته‌بندی */}
      <CategoryHeader
        data={{
          category: catName,
          subCategory,
          categoryImage: categoryImage || "/default-bg.jpg", // 👈 مقدار پیش‌فرض
          categoryDec: categoryDec || "توضیحی برای این دسته موجود نیست.",
          totalLikes,
          totalDislikes,
          totalViews,
          totalArticles,
        }}
      />

      <div className="flex flex-col-reverse lg:gap-5 lg:flex-row lg:justify-between items-center w-full px-5 lg:pe-4">
        <h2 className="md:w-1/2 lg:ms-5 mt-5 font-bold font-azarMehr text-[22px] text-start dark:text-white text-black">
          زیر دسته های {catName}
        </h2>

        <SearchComponent searchLevel="articles" mainData={mainData} params={params} />

      </div>
      {/* لیست مقالات دسته */}
      <div className="mt-10 lg:px-5">
        <CategorySorted
        params={params}
        category={category}
        articles={categoryArticles}
      />
      </div>
      <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
      </div>
    </section>
  );
}
