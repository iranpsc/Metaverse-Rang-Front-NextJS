import { useContext, useState } from "react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { LangContext } from "@/context/LangContext";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import CategoryComponent from "@/components/templates/categories/CategoryComponent";
import axios from "axios";
import { HeaderComponent } from "@/components/templates/categories/HeaderComponent";
import ProfileHeaderMobile from "@/components/module/profile/ProfileHeaderMobile";
import SearchComponent from "@/components/templates/categories/SearchComponent";
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
  const { theme } = useTheme();
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
        id={`${theme == "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
      >
        <BaseLayoutEducation translateData={translateData}>
          <div
            className={`w-full ${
              activeSearch ? "overflow-y-clip" : "overflow-y-auto"
            }  overflow-x-clip relative flex flex-col justify-start items-center bg-white dark:bg-black`}
          >
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />
            <h1 className=" mt-10 font-azarMehr whitespace-nowrap  font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
              {
                translates.find(
                  (item: any) => item.name === "training categories"
                ).translation
              }{" "}
              {CategoryData.name}
            </h1>

            <SearchComponent
              themeDataActive={"dark"}
              translateData={translateData}
              setActiveSearch={setActiveSearch}
            />
            <CategoryComponent
              translates={translates}
              CategoryData={CategoryData}
              translateData={translateData}
              footerTabs={footerTabs}
            />
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
    const slug = context.query.category;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
    );

    const categoriesData = resCategories.data.data;

    const resCategory = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials/categories/${slug}`
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
