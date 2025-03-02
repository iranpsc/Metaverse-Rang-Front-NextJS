import Image from "next/image";
// import { motion } from "framer-motion";
import Masonry from "react-masonry-css";

import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import Head from "next/head";
import Link from "next/link";

const ShowAllCategoriesComponent = ({ categoriesData, params }: any) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={categoriesData[0]?.image} />
      </Head>
      <div className="p-2 flex flex-wrap justify-between gap-2 mt-4">
        {/* <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid mt-5"
          columnClassName="my-masonry-grid_column"
        > */}
        {categoriesData &&
          categoriesData.map((category: any, index: any) => (
            <div className="w-full md:w-[48%] lg:w-[31%]">
              <Link
                href={`/${params.lang}/education/category/${category.slug}`}
                key={index}
                className="flex flex-col justify-start items-center gap-2 shadow-xl rounded-md bg-white dark:bg-dark-background cursor-pointer hover:shadow-2xl"
              >
                <figure>
                  <Image
                    // style={{ backgroundColor: colors[index] }}
                    className="max-w-full max-h-auto rounded-md"
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    quality={75}
                    priority={index === 0} // ✅ PRIORITIZE FIRST IMAGE
                    loading={index === 0 ? "eager" : "lazy"} // ✅ Lazy load non-critical images
                  />
                </figure>
                <p className="font-azarMehr font-bold w-full text-center my-3 dark:text-white text-black">
                  {category.name}
                </p>
                <div className="px-3 flex flex-row justify-evenly items-center w-full h-fit pb-3">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-white">
                      {formatNumber("2222")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Like className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-white">
                      {formatNumber("2222")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Dislike className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-white">
                      {formatNumber("2222")}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-3">
                    <View className="stroke-gray dark:stroke-dark-gray stroke-2 w-[18px] h-[18px]" />
                    <span className="whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray dark:text-white">
                      {formatNumber("2222")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        {/* </Masonry> */}
      </div>
    </>
  );
};

export default ShowAllCategoriesComponent;
