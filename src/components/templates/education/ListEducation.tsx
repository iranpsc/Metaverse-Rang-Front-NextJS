import "atropos/css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import SyncLoader from "react-spinners/SyncLoader";

import { Like, Dislike, View } from "@/components/svgs";
import { formatNumber } from "@/components/utils/education";
import { translateFooter } from "@/components/utils/education";

export default function ListEducation({ loadMore, videosData, loading , translateData}: any) {
  const { theme } = useTheme();

  const router = useRouter();
  const { lang } = router.query;
  const pusher = (data: any) => {
    router.push(`/${lang}/education/category/${data}`);
  };

  const pushRgb = (data: any) => {
    router.push(`https://rgb.irpsc.com/${lang}/citizen/${data}`);
  };

  return (
    <>
      <div className="w-[95%] h-fit mt-24  flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {videosData &&
            videosData.map((item: any) => (
              <div
                key={item.id}
                className="w-[100%] min-h-[240px] shadow-md hover:shadow-xl hover:dark:shadow-dark  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-start gap-6 items-center"
              >
                <div className=" group w-full h-[250px] 2xl:h-[300px] relative rounded-t-[10px]  ">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="w-full h-[250px]  2xl:h-[300px] brightness-75 blur-[1.5px] p-[0.5px] transition-all duration-150 ease-in-out	  group-hover:p-0  group-hover:blur-none rounded-t-[10px]  object-cover"
                  />
                  <Image
                    src="/video-play.png"
                    alt={item.category_slug}
                    width={600}
                    height={600}
                    loading="lazy"
                    className=" w-[78px] h-[78px] absolute top-[40%] start-[40%] z-40 cursor-pointer"
                  />
                </div>
                <div className="flex flex-row justify-start items-center gap-1 w-[95%] mt-[-10px]">
                  <p
                    className="text-start  font-medium font-azarMehr text-[14px]  3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                    onClick={() => pusher(item.category_slug)}
                  >
                    {item.category_name}
                  </p>
                  <span className="font-azarMehr font-medium text-[14px] 3xl:text-[16px]">
                    /
                  </span>

                  <p
                    className="text-start truncate  font-medium font-azarMehr text-[14px] 3xl:text-[16px] cursor-pointer hover:text-blueLink hover:dark:text-dark-yellow"
                    onClick={() =>
                      pusher(`${item.category_slug}/${item.sub_category_slug}`)
                    }
                  >
                    {item.sub_category_name}
                  </p>
                </div>

                <h1 className="text-start w-[95%] font-azarMehr cursor-pointer font-bold mt-[-10px] text-[18px] 3xl:text-[22px] ">
                  {item.title}
                </h1>

                <p className="text-[16px] 3xl:text-[18px] font-azarMehr font-normal text-start w-[95%] mt-1">
                  {item.description.slice(0, 45)} ...{" "}
                  <span className="font-normal 3xl:text-[18px] font-azarMehr text-blueLink dark:text-dark-yellow cursor-pointer">
                    {" "}
                    بیشتر
                  </span>
                </p>
                <div className="w-[95%] mb-[-3%]  flex flex-row justify-between  items-center">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <Image
                      src={item.creator_image}
                      alt={item.creator_image}
                      width={1000}
                      height={1000}
                      loading="lazy"
                      className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out hover:rotate-12"
                      onClick={() => pushRgb(item.creator_code)}
                    />
                    <span
                      className="text-blueLink dark:text-dark-yellow cursor-pointer text-[16px] 3xl:text-[22px] whitespace-nowrap font-medium hover:font-bold uppercase "
                      onClick={() => pushRgb(item.creator_code)}
                    >
                      {item.creator_code}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-3">
                    <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px]">
                      {formatNumber(item.likes)}
                    </span>
                    <Like />
                    <span className="whitespace-nowrap font-azarMehr font-normal  3xl:text-[18px]">
                      {formatNumber(item.dislikes)}
                    </span>
                    <Dislike />

                    <span className="whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px]">
                      {formatNumber(item.views)}
                    </span>
                    <View />
                  </div>
                </div>
                <div className="glow" />
              </div>
            ))}
        </div>
        <button
          className=" text-center rounded-full flex items-center justify-center mt-10 w-[170px] h-[60px] shadow-sm hover:shadow-md bg-white dark:bg-[#1A1A18] text-blueLink dark:text-dark-yellow font-azarMehr font-semibold hover:opacity-90"
          onClick={loadMore}
        >
          {!loading ? (
            `${translateFooter(translateData, "view more")}`
          ) : (
            <SyncLoader
              color={`${theme == "dark" ? "#FFC700" : "#0000FF"}`}
              size={10}
            />
          )}
        </button>
      </div>
    </>
  );
}
