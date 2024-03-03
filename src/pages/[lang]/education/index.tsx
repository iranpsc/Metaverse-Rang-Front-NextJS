import { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { DefaultSeo } from "next-seo";
import axios from "axios";
//CONTAXT
import { LangContext } from "@/context/LangContext";
//COMPONENTS
import ProfileHeaderMobile from "@/module/profile/ProfileHeaderMobile";
import TopTrainers from "@/components/templates/education/TopTrainers";
import Categories from "./../../../components/templates/education/Categories";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
import { translateFooter } from "@/components/utils/education";
import SearchComponent from "@/components/templates/categories/SearchComponent";
import DynamicFooter from "@/components/templates/education/DynamicFooter";
import DynamicListEducation from "@/components/templates/education/DynamicListEducation";
type IndexProps = {};

const Index: React.FC<IndexProps> = ({
  categoriesData,
  videosData,
  footerTabs,
  translateData,
  localSite,
  nameSite,
  setShowLogOut,
}: any) => {
  const { data, languageSelected } = useContext(LangContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState(videosData);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  const [themeDataActive, setThemeDataActive] = useState<any>("light");
  const { theme } = useTheme();

  useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(`${languageSelected.file_url}`);
        // const res = await axios.get(
        //   "https://admin.rgb.irpsc.com/api/translations"
        // );
        // console.log(res);
        const res2 = await axios.get(
          "https://api.rgb.irpsc.com/api/citizen/hm-2000003"
        );
        console.log(res2);
        //setTesty(res);
        // await dispatch({
        //   type: "SET_DATA_HEADER",
        //   payload: { pageName, dataHeader: res.data.modals },
        // });
        // await dispatch({
        //   type: "SET_DATA_ITEMS",
        //   payload: { pageName, dataMenu: res.data.modals },
        // });
        // await dispatch({
        //   type: "SET_DATA_THEME",
        //   payload: { dataTheme: res.data.modals },
        // });
        // await dispatch({
        //   type: "SET_DATA_LOGIN",
        //   payload: { dataLogin: res.data.modals },
        // });
        // await dispatch({
        //   type: "SUB_ITEMS_MENU_DATA",
        //   payload: { dataSubItems: res.data.modals },
        // });
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchData();
  }, [languageSelected.file_url]);

  function addPageJsonLd() {
    return {
      __html: `{
  "@context": "http://schema.org",
  "@type": "WebPage",
  "mainEntity": [
    {
      "@type": "VideoObject",
      "name": "عنوان ویدیو اول",
      "description": "توضیحات کوتاه ویدیو اول",
      "thumbnailUrl": "http://example.com/path/to/thumbnail1.jpg",
      "contentUrl": "http://example.com/path/to/video1.mp4",
      "uploadDate": "2023-10-01",
      "publisher": {
        "@type": "Organization",
        "name": "نام انتشار دهنده اول"
      },
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/LikeAction",
          "userInteractionCount": "100"
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/DislikeAction",
          "userInteractionCount": "10"
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/WatchAction",
          "userInteractionCount": "1000"
        }
      ]
    },
    {
      "@type": "VideoObject",
      "name": "عنوان ویدیو دوم",
      "description": "توضیحات کوتاه ویدیو دوم",
      "thumbnailUrl": "http://example.com/path/to/thumbnail2.jpg",
      "contentUrl": "http://example.com/path/to/video2.mp4",
      "uploadDate": "2023-10-05",
      "publisher": {
        "@type": "Organization",
        "name": "نام انتشار دهنده دوم"
      },
      "interactionStatistic": [
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/LikeAction",
          "userInteractionCount": "150"
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/DislikeAction",
          "userInteractionCount": "5"
        },
        {
          "@type": "InteractionCounter",
          "interactionType": "http://schema.org/WatchAction",
          "userInteractionCount": "2000"
        }
      ]
    }
  ]
}`,
    };
  }

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=${nextPage}`
    );

    const newVideosData = resVideos.data.data;
    setVideos((prevVideos: any) => [...prevVideos, ...newVideosData]);
    setLoading(false);
  };

  return (
    <>
      <DefaultSeo
        title={translateFooter(translateData, "page title")}
        description={translateFooter(translateData, "description")}
        openGraph={{
          title: translateFooter(translateData, "page title"),
          locale: localSite,
          siteName: nameSite,
          description: translateFooter(translateData, "description"),
          type: "website",
          url: `https://rgb.irpsc.com/en/education`,
          images: [
            {
              url: "https://irpsc.com/img-icon/rgb.png",
              alt: translateFooter(translateData, "page title"),
            },
          ],
        }}
      />
      <Head>
        <title>{translateFooter(translateData, "page title")}</title>
        <meta
          name="description"
          content={translateFooter(translateData, "description")}
          key="desc"
        />
        <meta
          name="google-site-verification"
          content="lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4"
        />
        <link rel="icon" href="/logo.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addPageJsonLd()}
          key="job-jsonld"
        />
      </Head>
      <section
        id={`${
          themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        }`}
        dir={languageSelected.dir}
        className={`overflow-auto relative `}
      >
        <BaseLayoutEducation>
          <section
            className={`relative flex  flex-col justify-start ${
              activeSearch ? "overflow-y-clip" : "overflow-y-auto"
            } overflow-x-clip items-center bg-[#f8f8f8] dark:bg-[#000] bg-opacity20 w-full`}
          >
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />
            <h1 className="mt-[70px] text-center  text-gray dark:text-dark-gray font-azarMehr font-bold 2xl:text-[26px] xl:text-[26px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] w-full">
              {translateFooter(translateData, "page title")}
            </h1>
            <p className=" 2xl:w-[30%] xl:w-[30%] lg:w-[40%] md:w-[40%] sm:w-[50%] xs:w-[50%] mt-5 font-azarMehr font-normal text-gray dark:text-dark-gray 2xl:text-[14px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[12px] xs:text-[10px]   text-center">
              {translateFooter(translateData, "description")}
            </p>
            <SearchComponent
              themeDataActive={themeDataActive}
              translateData={translateData}
              setActiveSearch={setActiveSearch}
            />
            <TopTrainers translateData={translateData} />
            <Categories
              categoriesData={categoriesData}
              translateData={translateData}
            />
            <DynamicListEducation
              loadMore={loadMore}
              P
              videosData={videos}
              loading={loading}
              translateData={translateData}
            />
            <div className="flex flex-col justify-center items-center">
              <DynamicFooter footerTabs={footerTabs} />
            </div>
          </section>
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

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories?count=9"
    );

    const categoriesData = resCategories.data.data;

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=1`
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

    const videosData = resVideos.data.data;

    return {
      props: {
        categoriesData,
        videosData,
        footerTabs,
        translateData,
        localSite,
        nameSite,
      },
    };
  } catch (error) {}
}
