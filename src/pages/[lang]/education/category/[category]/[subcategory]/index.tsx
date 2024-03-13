import { useContext, useEffect, useRef, useState } from "react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { LangContext } from "@/context/LangContext";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import axios from "axios";
import ProfileHeaderMobile from "@/components/module/profile/ProfileHeaderMobile";
import SearchComponent from "@/components/templates/categories/SearchComponent";
import Image from "next/image";
import Link from "next/link";
import { formatNumber } from "@/components/utils/education";
import { Dislike, Like, View, Video } from "@/components/svgs/SvgEducation";
import { DashboardHeaderModule } from "@/components/module/categories/DashboardHeaderModule";
import { useAnimation } from "framer-motion";
import DynamicFooter from "@/components/templates/education/DynamicFooter";
import router from "next/router";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const Index = ({
  CategoryData,
  translateData,
  footerTabs,
  translates,
  localSite,
  nameSite,
}: any) => {
  const { data, languageSelected } = useContext(LangContext);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [shows, setShows] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { lang, category, subcategory } = router.query;
  const [themeDataActive, setThemeDataActive] = useState<any>("light");
  const { theme } = useTheme();

  useEffect(() => {
    if (contentRef.current) {
      setHeight(shows ? contentRef.current.scrollHeight : 0);
    }
  }, [shows]);
  const controls = useAnimation();

  const pushRgb = (data: any) => {
    router.push(`https://rgb.irpsc.com/${lang}/citizen/${data}`);
  };

  useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);

  return (
    <>
      <DefaultSeo
        title={nameSite + "|" + CategoryData.name}
        description={CategoryData.description}
        openGraph={{
          title: nameSite + "|" + CategoryData.name,
          locale: localSite,
          siteName: nameSite,
          description: CategoryData.description,
          type: "website",
          url: `http://localhost:5173/fa/education/category/${CategoryData.slug}`,
          images: [
            {
              url: CategoryData.image,
              alt: CategoryData.name,
            },
          ],
        }}
      />
      <Head>
        <title>{CategoryData.name}</title>
        <meta
          name="description"
          content={CategoryData.description}
          key="desc"
        />
        <meta
          name="google-site-verification"
          content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <section
        dir={languageSelected.dir}
        className={`relative w-full`}
        id={`${
          themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        }`}
      >
        <BaseLayoutEducation translateData={translateData}>
          <div
            className={`w-full ${
              activeSearch ? "overflow-y-clip" : "overflow-y-auto"
            }  overflow-x-clip relative flex flex-col justify-start gap-10 items-center bg-white dark:bg-black`}
          >
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />
            <h1 className=" mt-10 font-azarMehr whitespace-nowrap  font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
              {CategoryData.name}
            </h1>
            <SearchComponent
              themeDataActive={"dark"}
              translateData={translateData}
              setActiveSearch={setActiveSearch}
            />
            <div
              className={`relative w-full px-4  bg-white dark:bg-black transition-all duration-300 ease-in-out`}
              style={{ height: shows ? `${height + 500}px` : "500px" }}
            >
              <Image
                src={CategoryData.image}
                alt="img"
                width={500}
                height={400}
                priority={true}
                className=" w-full h-[400px] rounded-xl object-cover"
              />
              <DashboardHeaderModule
                translates={translates}
                categoryData={CategoryData}
                shows={shows}
                setShows={setShows}
                contentRef={contentRef}
              />
            </div>

            <div className="flex flex-wrap justify-start items-center gap-2 w-full  relative z-50">
              <p
                className="w-fit ms-5 font-normal font-azarMehr text-[15px] text-start text-[#575757] cursor-pointer"
                onClick={() => router.push(`/${lang}/education`)}
              >
                آموزش
              </p>
              <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
                /
              </span>
              <p
                className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] text-start text-[#575757] whitespace-nowrap  hover:text-blueLink hover:dark:text-dark-yellow"
                onClick={() => router.push(`/${lang}/education/category/all`)}
              >
                دسته بندی ها
              </p>
              <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
                /
              </span>
              <p
                className="w-fit font-normal font-azarMehr text-[15px] text-start text-[#575757] whitespace-nowrap cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                onClick={() =>
                  router.push(
                    `/${lang}/education/category/${CategoryData.category.slug}`
                  )
                }
              >
                {CategoryData.category.name}
              </p>
              <span className="text-[#575757] font-normal font-azarMehr text-[15px]">
                /
              </span>
              <p className="w-fit font-normal font-azarMehr text-[15px] text-start text-blueLink dark:text-dark-yellow whitespace-nowrap">
                {CategoryData.name}
              </p>
            </div>

            <h1 className="w-full ms-5 mt-10 font-bold font-azarMehr text-[22px] text-start">
              {
                translates.find(
                  (item: any) => item.name === "training related to"
                ).translation
              }{" "}
              {CategoryData.name}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-full h-fit px-5 mt-10">
              {CategoryData &&
                CategoryData.videos.map((item: any) => (
                  <div
                    key={item.id}
                    className="w-[100%]   min-h-[240px]  shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
                  >
                    <div className=" group w-full h-[266px]   rounded-t-[10px] relative">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={600}
                        height={600}
                        priority={true}
                        className=" w-full h-full hover:blur-none transition-all duration-150 ease-in-out rounded-t-[10px]  object-cover"
                      />
                      <div className="w-full h-full backdrop-blur-[3px] bg-black/20 hover:backdrop-blur-none xs:backdrop-blur-none absolute z-0 top-0 flex justify-center items-center">
                        <Video className="w-[78px] h-[78px] p-3 fill-blueLink dark:fill-dark-yellow  rounded-full bg-white/80" />
                      </div>
                    </div>

                    <Link
                      className="w-[95%]"
                      href={`/${lang}/education/category/${CategoryData.category.slug}/${CategoryData.slug}/${item.slug}`}
                    >
                      <h1 className="text-start  w-full font-azarMehr truncate cursor-pointer font-bold mt-[8px] text-[18px] 3xl:text-[22px] ">
                        {item.title}
                      </h1>
                    </Link>
                    <div className="flex flex-row items-center justify-start  mt-[-8px] w-[98%]"></div>
                    <div className="w-[95%] pb-2 flex flex-row justify-between  items-center">
                      <>
                        <Link
                          href={`https://rgb.irpsc.com/${languageSelected.code}/citizen/${item.creator.code}`}
                          target="_blank"
                        >
                          <div className="flex flex-row justify-start items-center gap-2">
                            <Image
                              src={item.creator.image}
                              alt={item.creator.code}
                              width={1000}
                              height={1000}
                              loading="lazy"
                              className="w-[45px] h-[45px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
                              onClick={() => pushRgb(item.creator.code)}
                            />
                            <span
                              className="text-blueLink  cursor-pointer text-[14px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
                              onClick={() => pushRgb(item.creator.code)}
                            >
                              {item.creator.code}
                            </span>
                          </div>
                        </Link>
                        <div className="flex flex-row justify-start items-center gap-5">
                          <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                            {formatNumber(item.dislikes_count)}
                          </span>
                          <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px] " />
                          <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px] text-gray dark:text-dark-gray me-[-10px]">
                            {formatNumber(item.likes_count)}
                          </span>
                          <Dislike className="stroke-gray  dark:stroke-dark-gray stroke-2 " />

                          <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px] text-gray dark:text-dark-gray me-[-13px]">
                            {formatNumber(item.views_count)}
                          </span>
                          <View className="stroke-gray dark:stroke-dark-gray stroke-2 " />
                        </div>
                      </>
                    </div>
                  </div>
                ))}
            </div>
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </BaseLayoutEducation>
      </section>
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  let languageSelectedUrl = "";
  let nameSite = "";
  let localSite = "fa_IR";
  try {
    const languageCode = context.query.lang;
    const category = context.query.category;
    const subcategory = context.query.subcategory;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
    );

    const categoriesData = resCategories.data.data;

    const resCategory = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials/categories/${category}/${subcategory}`
    );
    if (languageCode === "en") {
      localSite = "en-US";
      nameSite = "Metaverse Rgb";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
    } else {
      nameSite = "متاورس رنگ";
      localSite = "fa_IR";
      languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
    }
    const res = await axios.get(languageSelectedUrl);

    const translateRes = res.data.modals.find(
      (modal: any) => modal.name === "training"
    ).tabs;

    const translateData = translateRes.find(
      (item: any) => item.name === "central-school"
    ).fields;

    const footerData = res.data.modals.find(
      (modal: any) => modal.name === "footer-menu"
    ).tabs;

    const footerTabs = footerData.find(
      (item: any) => item.name === "our-systems"
    ).fields;

    const translates = translateRes.find(
      (item: any) => item.name === "categories"
    ).fields;

    const CategoryData = resCategory.data.data;
    return {
      props: {
        categoriesData,
        CategoryData,
        footerTabs,
        translateData,
        translates,
        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
