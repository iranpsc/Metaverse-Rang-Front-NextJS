import axios from "axios";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

import ShowAllCategoriesComponent from "@/components/module/education/categories/ShowAllCategoriesComponent";
import ProfileHeaderMobile from "@/components/module/profile/ProfileHeaderMobile";
import SearchComponent from "@/components/module/education/categories/SearchComponent";
import DynamicFooter from "@/components/module/footer/DynamicFooter";

export default async function CateAllPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const languageSelected = params.lang === "en" ? "en" : "fa";
  async function fetchData() {
    let languageSelectedUrl = "";
    let nameSite = "";
    let localSite = "fa_IR";
    try {
      const languageCode = languageSelected;

      const resCategories = await fetch(
        "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
      );
      const categoriesData = await resCategories.json();

      if (languageCode === "en") {
        localSite = "en-US";
        nameSite = "Metaverse Rgb";
        languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
      } else {
        nameSite = "متاورس رنگ";
        localSite = "fa_IR";
        languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
      }

      const res = await fetch(languageSelectedUrl);
      const resJson = await res.json();
      const translateRes = resJson.modals.find(
        (modal: any) => modal.name === "training"
      ).tabs;

      const translateData = translateRes.find(
        (item: any) => item.name === "central-school"
      ).fields;
      const translateHeader = translateRes.find(
        (item: any) => item.name === "categories"
      ).fields;

      const footerData = resJson.modals.find(
        (modal: any) => modal.name === "footer-menu"
      ).tabs;

      const footerTabs = footerData.find(
        (item: any) => item.name === "our-systems"
      ).fields;

      return {
        categoriesData,
        translateData,
        translateHeader,
        footerTabs,
        localSite,
        nameSite,
      };
    } catch (error) {}
  }
  const data = await fetchData();

  const categoriesData = data?.categoriesData.data;
  const translateData = data?.translateData;
  const translateHeader = data?.translateHeader;
  const footerTabs = data?.footerTabs;
  const localSite = data?.localSite;
  const nameSite = data?.nameSite;
  return (
    <>
      {/* <DefaultSeo
        title={
          nameSite +
          "|" +
          translateHeader.find(
            (item: any) => item.name === "metaverse educational categories"
          ).translation
        }
        description={
          translateHeader.find(
            (item: any) =>
              item.name ===
              "metaverse specialized training that is available in categories"
          ).translation
        }
        openGraph={{
          title:
            nameSite +
            "|" +
            translateHeader.find(
              (item: any) => item.name === "metaverse educational categories"
            ).translation,
          locale: localSite,
          siteName: nameSite,
          description: translateHeader.find(
            (item: any) =>
              item.name ===
              "metaverse specialized training that is available in categories"
          ).translation,
          type: "website",
          url: `http://localhost:5173/fa/education/category/all`,
          images: [
            {
              url: "https://irpsc.com/img-icon/rgb.png",
              alt: nameSite,
            },
          ],
        }}
      /> */}

      <Head>
        <title>
          {
            translateHeader.find(
              (item: any) => item.name === "metaverse educational categories"
            ).translation
          }
        </title>
        <meta
          name="description"
          content={
            translateHeader.find(
              (item: any) =>
                item.name ===
                "metaverse specialized training that is available in categories"
            ).translation
          }
          key="desc"
        />
        <meta
          name="google-site-verification"
          content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* id={`${theme == "dark" ? "dark-scrollbar" : "light-scrollbar"}`} */}
      <div className="w-full">
        {/* <BaseLayoutEducation translateData={translateData}> */}

        {/* ${ activeSearch ? "overflow-y-clip" : "overflow-y-auto" } */}
        <div
          className={`w-full  overflow-x-clip relative flex flex-col justify-start items-center bg-white dark:bg-black
              `}
        >
          {/* <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            /> */}

          <h1 className=" mt-10 font-azarMehr whitespace-nowrap  font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
            {
              translateHeader.find(
                (item: any) =>
                  item.name === "all categories of metaverse training"
              ).translation
            }
          </h1>
          <SearchComponent
            // themeDataActive={themeDataActive}
            translateData={translateData}
            // setActiveSearch={setActiveSearch}
            params={params}
          />

          <ShowAllCategoriesComponent
            categoriesData={categoriesData}
            languageSelected={languageSelected}
          />

          <DynamicFooter footerTabs={footerTabs} />
        </div>
        {/* </BaseLayoutEducation> */}
      </div>
    </>
  );
}
