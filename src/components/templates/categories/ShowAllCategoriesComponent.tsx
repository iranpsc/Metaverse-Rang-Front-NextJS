import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";

import { Like, Dislike, View } from "@/components/svgs";
import { formatNumber } from "@/components/utils/education";
import { useRouter } from "next/router";

const ShowAllCategoriesComponent = ({ categoriesData }: any) => {
  const [randomHeights, setRandomHeights] = useState([]);

  const router = useRouter();
  const { lang } = router.query;
  const pusher = (link: string) => {
    router.push(`/${lang}/education/category/${link}`);
  };

  useEffect(() => {
    const heights = ["566px", "598px", "388px", "520px", "422px", "464px"];
    const randomHeights = categoriesData.map(
      () => heights[Math.floor(Math.random() * heights.length)]
    );
    setRandomHeights(randomHeights);
  }, [categoriesData]);

  const breakpointColumnsObj = {
    default: 5,
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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="p-2 overflow-x-clip bg-[#e1e1e1] dark:bg-black "
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid "
        columnClassName="my-masonry-grid_column"
      >
        {categoriesData &&
          categoriesData.map((category: any, index: any) => (
            <motion.div
              variants={items}
              key={index}
              className="flex flex-col justify-start items-center gap-2 shadow-xl rounded-md bg-white dark:bg-dark-background cursor-pointer hover:shadow-2xl"
              onClick={() => pusher(category.name)}
            >
              <Image
                style={{ height: randomHeights[index] }}
                className="max-w-full h-auto rounded-md  bg-error/30"
                src={category.image}
                alt={category.name}
                width={1000}
                height={1000}
              />
              <p className="font-azarMehr font-bold  w-full text-start ms-3">
                {category.name}
              </p>
              <div className=" px-3  flex flex-row justify-evenly items-center w-full h-fit pb-3">
                <div className="flex flex-row items-center justify-center gap-2">
                  <View className="w-[18px] h-[18px] stroke-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray">
                    {formatNumber("2222")}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Like className="w-[18px] h-[18px] stroke-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray">
                    {formatNumber("2222")}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Dislike className="w-[18px] h-[18px] stroke-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray">
                    {formatNumber("2222")}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-3">
                  <View className="w-[18px] h-[18px] stroke-gray" />
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-[14px] text-gray">
                    {formatNumber("2222")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
      </Masonry>
    </motion.div>
  );
};

export default ShowAllCategoriesComponent;