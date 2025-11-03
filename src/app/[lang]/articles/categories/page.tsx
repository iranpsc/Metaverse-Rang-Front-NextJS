import Footer from "@/components/module/footer/Footer";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList";
import { articles } from "@/components/utils/articles";
import { getTranslation, getMainFile, getFooterData } from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";

interface CategoriesPageProps {
  params: { lang: string };
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const [footerTabs, langData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);

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

  return (
    <section className="w-full h-screen overflow-y-auto bg-[#f8f8f8] dark:bg-black  px-5 3xl:px-10 light-scrollbar dark:dark-scrollbar" dir={langData.direction}>
      <div>
        <div className="mb-6">
          <BreadCrumb params={params} />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="mt-5 text-center  whitespace-nowrap dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[18px]">
            دسته‌بندی‌ مقالات
          </h1>
          <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
            در سامانه مقالات متاورس رنگ، مجموعه‌ای از مطالب تخصصی و به‌روز در زمینه فناوری‌های نوین، دنیای متاورس، هوش مصنوعی، دارایی‌های دیجیتال و اقتصاد مجازی گردآوری شده است. هدف این بخش، ارتقای دانش شهروندان متاورسی و فراهم‌سازی بستری برای آشنایی عمیق‌تر با تحولات دنیای دیجیتال است. با مطالعه این مقالات، می‌توانید دیدگاهی روشن‌تر نسبت به آینده تعاملات انسان و فناوری پیدا کرده و همگام با موج پیشرفت‌های جهانی حرکت کنید.
          </p>
        </div>
        
        <div className="w-full ">
          <SearchComponent searchLevel="articles" mainData={mainData} params={params} />
        </div>

        <CategoriesList
          categories={categories}
          categoryImages={categoryImages}
          subcategoryCounts={subcategoryCounts}
          params={params}
        />

        <div className="mt-20">
          <Footer footerTabs={footerTabs} mainData={mainData} params={params} />
        </div>
      </div>
    </section>
  );
}
