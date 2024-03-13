import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useTheme } from "next-themes";

import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";
import { LangContext } from "@/context/LangContext";
import ProfileHeaderMobile from "@/components/module/profile/ProfileHeaderMobile";
import SearchComponent from "@/components/templates/categories/SearchComponent";
import DynamicFooter from "@/components/templates/education/DynamicFooter";
import VideoSection from "@/components/templates/singleVideo/VideoSection";
import SingleVideoSlugModule from "@/components/module/singleVideo/SingleVideoSlugModule";
import SharedPageVideos from "@/components/module/singleVideo/SharedPageVideos";
import { AnimatePresence } from "framer-motion";

export default function xxx({
  DataVideo,
  translateData,
  footerTabs,
  localSite,
  nameSite,
  DataVideos,
  newEducationsVideos,
}: any) {
  const { data, languageSelected } = useContext(LangContext);
  const [openSharedPage, setOpenSharedPage] = useState<boolean>(false);
  const [themeDataActive, setThemeDataActive] = useState<any>("light");
  const { theme } = useTheme();

  useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);

  return (
    <>
      <div
        dir={languageSelected.dir}
        id={`${
          themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        }`}
        className={`w-full h-fit ${
          openSharedPage ? "overflow-y-clip" : "overflow-y-auto"
        }`}
      >
        <BaseLayoutEducation translateData={translateData}>
          <AnimatePresence>
            {openSharedPage && (
              <SharedPageVideos
                setOpenSharedPage={setOpenSharedPage}
                DataVideo={DataVideo}
              />
            )}
          </AnimatePresence>
          <section
            className={`w-full relative overflow-y-auto flex flex-col justify-start items-center bg-[#F5F5F5] dark:bg-black`}
          >
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />

            <VideoSection
              setOpenSharedPage={setOpenSharedPage}
              DataVideo={DataVideo}
              DataVideos={DataVideos}
              newEducationsVideos={newEducationsVideos}
            />

            <DynamicFooter footerTabs={footerTabs} />
          </section>
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

    const videoSlug = context.query.videoId;

    const resVideo = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials/${videoSlug}`
    );
    const DataVideo = resVideo.data.data;

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

    const category = context.query.category;
    const subcategory = context.query.subcategory;

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials/categories/${category}/${subcategory}`
    );

    const newEducations = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials?page=1"
    );

    const newEducationsVideos = newEducations.data.data;

    const DataVideos = resVideos.data.data;

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
        DataVideo,
        translateData,
        translateHeader,
        footerTabs,
        localSite,
        nameSite,
        DataVideos,
        newEducationsVideos,
      },
    };
  } catch (error) {}
}
