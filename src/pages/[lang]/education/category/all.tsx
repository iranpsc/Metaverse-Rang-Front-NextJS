import { useContext, useState } from "react";
import axios from "axios";
import { DefaultSeo } from "next-seo";
import Head from "next/head";

import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";
import { LangContext } from "@/context/LangContext";
import ProfileHeaderMobile from "@/components/module/profile/ProfileHeaderMobile";
import SearchComponent from "@/components/templates/categories/SearchComponent";
import DynamicFooter from "@/components/templates/education/DynamicFooter";

export default function xxx({
  categoriesData,
  translateData,
  translateHeader,
  footerTabs,
  localSite,
  nameSite,
}: any) {
  const { data, languageSelected } = useContext(LangContext);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  return (
    <>
      <DefaultSeo
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
      />

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

      <div dir={languageSelected.dir} id="light-scrollbar" className="w-full">
        <BaseLayoutEducation translateData={translateData}>
          <div
            className={`w-full ${
              activeSearch ? "overflow-y-clip" : "overflow-y-auto"
            }  overflow-x-clip relative flex flex-col justify-start items-center bg-white dark:bg-black `}
          >
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />

            <h1 className=" mt-10 font-azarMehr whitespace-nowrap  font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
              {
                translateHeader.find(
                  (item: any) =>
                    item.name === "all categories of metaverse training"
                ).translation
              }
            </h1>

            <SearchComponent
              themeDataActive={"dark"}
              translateData={translateData}
              setActiveSearch={setActiveSearch}
            />

            <ShowAllCategoriesComponent categoriesData={categoriesData} />

            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </BaseLayoutEducation>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  let languageSelectedUrl = "";
  let nameSite = "";
  let localSite = "fa_IR";
  try {
    const languageCode = context.query.lang;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=20"
    );
    const categoriesData = resCategories.data.data;

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
    const translateHeader = translateRes.find(
      (item: any) => item.name === "categories"
    ).fields;

    const footerData = res.data.modals.find(
      (modal: any) => modal.name === "footer-menu"
    ).tabs;

    const footerTabs = footerData.find(
      (item: any) => item.name === "our-systems"
    ).fields;

    return {
      props: {
        categoriesData,
        translateData,
        translateHeader,
        footerTabs,
        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
