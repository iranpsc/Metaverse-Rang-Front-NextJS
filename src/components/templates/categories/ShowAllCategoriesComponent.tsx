"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";

import { Like, Dislike, View } from "@/components/svgs/SvgEducation";
import { formatNumber } from "@/components/utils/education";
import randomcolor from "randomcolor";

const ShowAllCategoriesComponent = ({ categoriesData, params }: any) => {
  const [randomHeights, setRandomHeights] = useState([]);
  const [colors, setColors] = useState([]);

  const router = useRouter();
  //   const { lang } = router.query;
  const pusher = (link: string) => {
    router.push(`/${params.lang}/education/category/${link}`);
  };

  useEffect(() => {
    const heights = ["566px", "598px", "388px", "520px", "422px", "464px"];
    const randomHeights = categoriesData.map(
      () => heights[Math.floor(Math.random() * heights.length)]
    );
    setRandomHeights(randomHeights);
  }, [categoriesData]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    const generateRandomColors = () => {
      const newColors = categoriesData.map(() =>
        randomcolor({
          format: "rgba",
          alpha: 0.1,
          luminosity: "bright",
        })
      );
      setColors(newColors);
    };

    generateRandomColors();
  }, [categoriesData]);

  return (
    <div className="p-2">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid mt-5"
        columnClassName="my-masonry-grid_column"
      >
        {categoriesData &&
          categoriesData.map((category: any, index: any) => (
            <div
              key={index}
              className="flex flex-col justify-start items-center gap-2 shadow-xl rounded-md bg-white dark:bg-dark-background cursor-pointer hover:shadow-2xl"
              onClick={() => pusher(category.slug)}
            >
              <figure>
                <Image
                  style={{ backgroundColor: colors[index] }}
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
            </div>
          ))}
      </Masonry>
    </div>
  );
};

export default ShowAllCategoriesComponent;
