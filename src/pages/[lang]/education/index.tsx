
import { useContext, useState, useEffect } from "react";
import { LangContext } from "@/context/LangContext";
import ProfileHeaderMobile from "@/module/profile/ProfileHeaderMobile";
import { Search } from "@/components/svgs";
import axios from "axios";
import Image from "next/image";
import { Like } from "@/components/svgs";
import SyncLoader from "react-spinners/SyncLoader";
import { useTheme } from "next-themes";
//COMPONENTS
import TopTrainers from "@/components/templates/education/TopTrainers";
import Categories from "./../../../components/templates/education/Categories";
import ListEducation from "@/components/templates/education/ListEducation";
import Footer from "@/components/templates/education/Footer";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
type IndexProps = {};

const Index: React.FC<IndexProps> = ({
  categoriesData,
  videosData,
  footerTabs,
  setShowLogOut,
}: any) => {
  const { data,languageSelected } = useContext(LangContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState(videosData);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [themeDataActive, setThemeDataActive] = useState<any>("light");
    const { theme } = useTheme();
     useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);


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

  useEffect(() => {
    if (searchTerm.length >= 4) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      axios
        .post("https://api.rgb.irpsc.com/api/tutorials/search", formData)
        .then((response) => {
          setLoadingSearch(false);
          setSearchData(response.data.data);
        })
        .catch((error) => {
          setLoadingSearch(false);
        });
    } else {
      setSearchData([]);
      setLoadingSearch(false);
    }
  }, [searchTerm]);

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
 
  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
  };
  return (
    <>
     <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addPageJsonLd()}
            key="job-jsonld"
          />
      <section
        id={`${themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
        dir={languageSelected.dir}
        className={`overflow-auto relative `}
      >
        <BaseLayoutEducation>
          <section className="relative flex flex-col justify-start overflow-y-auto overflow-x-hidden items-center bg-[#f8f8f8] dark:bg-[#000] bg-opacity20">
            <div
              className={`${
                searchData.length >= 1 ? "visible" : "invisible"
              }  w-full backdrop-blur-sm  bg-blackTransparent/30 h-screen absolute top-0 z-10 `}
              onClick={removeSearch}
            ></div>
            <ProfileHeaderMobile
              menuData={data}
              profileData={[]}
              profileName={[]}
            />
            <div
              id={`${theme === "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
              className="mt-[50px] flex flex-col  relative z-20"
            >
              <div className=" w-[724px] xs:w-[300px] h-[50px] py-4 rounded-[67px] shadow-md hover:shodow-2xl bg-white dark:bg-[#1A1A18] flex flex-row justify-between items-center">
                <Search className="ms-8 fill-blueLink dark:fill-dark-yellow" />
                <input
                  placeholder="آموزش مورد نیاز خود را جستجو کنید"
                  className="w-[80%]  outline-none border-none 
              placeholder-[#868B90] text-[14px] xs:text-[10px] ms-2  font-azarMehr font-medium  dark:bg-[#1A1A18]  dark:placeholder-dark-gray "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loadingSearch && (
                  <SyncLoader
                    color={`${theme == "dark" ? "#fff" : "gray"}`}
                    className="me-1 "
                    size={5}
                    speedMultiplier={0.5}
                  />
                )}

                <span className="text-blueLink dark:text-dark-activeButton  me-5  font-azarMehr font-medium">
                  جستجو
                </span>
              </div>
              <div className="w-full bg-[#EFEFEF] dark:bg-black max-h-[600px] overflow-y-auto overflow-x-clip absolute mt-[53px] flex flex-col justify-start items-center gap-1 z-10 rounded-2xl shadow-md ">
                {searchData.length >= 1 &&
                  searchData.map((item: any) => (
                    <div
                      key={item.id}
                      className="w-[99%] h-[70px]  bg-white dark:bg-[#1A1A18] shadow-md hover:shadow-xl  cursor-pointer rounded-xl m-1 flex flex-row justify-between items-center"
                    >
                      <p className="ms-2 font-azarMehr truncate  text-[16px] xs:text-[12px] font-medium ">
                        {item.title}
                      </p>
                      <div className="flex flex-row justify-between items-center gap-3 min-w-fit ">
                        <div className="my-4  h-full flex flex-col gap-2 ">
                          <p className="uppercase  font-azarMehr text-[14px] xs:text-[10px] font-bold">
                            {item.creator_code}
                          </p>
                          <div className="flex flex-row items-center justify-end gap-1 ">
                            <span className=" whitespace-nowrap font-azarMehr font-light 3xl:text-[18px] xs:text-[12px]">
                              {item.likes}
                            </span>
                            <Like />
                          </div>
                        </div>
                        <Image
                          src={item.creator_image}
                          alt={item.creator_image}
                          loading="lazy"
                          width={1000}
                          height={1000}
                          className=" w-[50px] h-[50px] xs:w-[40px] xs:h-[40px] me-1  shadow-sm shadow-gray rounded-full"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <TopTrainers />
            <Categories categoriesData={categoriesData} />

            <ListEducation
              loadMore={loadMore}
              videosData={videos}
              loading={loading}
            />

            <footer className="flex flex-col justify-center items-center">
              <Footer footerTabs={footerTabs} />
            </footer>
          </section>
        </BaseLayoutEducation>
      </section>
    </>
  );
};

export default Index;

export async function getServerSideProps(context: any) {
  let languageSelectedUrl = "";
  try {
    const languageCode = context.query.lang;

    const resCategories = await axios.get(
      "https://api.rgb.irpsc.com/api/tutorials/categories"
    );

    const categoriesData = resCategories.data.data;

    const resVideos = await axios.get(
      `https://api.rgb.irpsc.com/api/tutorials?page=1`
    );
    if (languageCode === "en") {
      languageSelectedUrl = "https://rgb.irpsc.com/lang/en.json";
    } else {
      languageSelectedUrl = "https://rgb.irpsc.com/lang/fa.json";
    }
    const res = await axios.get(languageSelectedUrl);

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
      },
    };
  } catch (error) {}
}
