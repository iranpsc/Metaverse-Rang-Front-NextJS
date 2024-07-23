import Head from "next/head";
import { translateFooter } from "@/components/utils/education";
import TopTrainers from "src/components/module/education/TopTrainers";
import DynamicFooter from "@/components/module/education/DynamicFooter";
// import DynamicListEducation from "@/components/module/education/DynamicListEducation";
import DynamicListEducation from "@/components/module/education/ListEducation";
import Categories from "@/components/module/education/Categories";
import SearchComponent from "@/components/module/education/categories/SearchComponent";

export default async function EducationPage({
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
      const resCategories = await fetch(
        "https://api.rgb.irpsc.com/api/tutorials/categories?count=9"
      );

      const categoriesData = await resCategories.json();

    
      if (languageSelected === "en") {
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

      const footerData = resJson.modals.find(
        (modal: any) => modal.name === "footer-menu"
      ).tabs;

      const footerTabs = footerData.find(
        (item: any) => item.name === "our-systems"
      ).fields;

    

      return {
        categoriesData,
    
        footerTabs,
        translateData,
        localSite,
        nameSite,
      };
    } catch (error) {}
  }
 async function getVideos(page:any| 1){
  const resVideos = await fetch(
    `https://api.rgb.irpsc.com/api/tutorials?page=${page}`
  );
  const videosData = await resVideos.json();
  return videosData
  }
  const data = await fetchData();

  const categoriesData = data?.categoriesData.data;
  const videosData = await getVideos(1)
  const translateData = data?.translateData;
  const footerTabs = data?.footerTabs;
  const localSite = data?.localSite;
  const nameSite = data?.nameSite;
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
  return (
    <>
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
        // id={`${
        //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        // }`}
        // dir={languageSelected.dir}
        className={`overflow-auto relative `}
      >
        <section
          className={`relative flex  flex-col justify-start
          
            overflow-x-clip items-center bg-[#f8f8f8] dark:bg-[#000] bg-opacity20 w-full`}
        >
          {/* <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            /> */}
          <h1 className="mt-[70px] text-center  text-gray dark:text-dark-gray font-azarMehr font-bold 2xl:text-[26px] xl:text-[26px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] w-full">
            {translateFooter(translateData, "page title")}
          </h1>
          <p className=" 2xl:w-[30%] xl:w-[30%] lg:w-[40%] md:w-[40%] sm:w-[50%] xs:w-[50%] mt-5 font-azarMehr font-normal text-gray dark:text-dark-gray 2xl:text-[14px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[12px] xs:text-[10px]   text-center">
            {translateFooter(translateData, "description")}
          </p>
          <SearchComponent
            // themeDataActive={themeDataActive}
            translateData={translateData}
            // setActiveSearch={setActiveSearch}
            params={params}
          />
          <TopTrainers
            translateData={translateData}
            languageSelected={languageSelected}
          />
          <Categories
            categoriesData={categoriesData}
            translateData={translateData}
            languageSelected={languageSelected}
          />
          <DynamicListEducation
              //  getVideos={getVideos}
              translateData={translateData}
              videosData={videosData}
              languageSelected={languageSelected}
            />
          <div className="flex flex-col justify-center items-center">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </section>
    </>
  );
}
