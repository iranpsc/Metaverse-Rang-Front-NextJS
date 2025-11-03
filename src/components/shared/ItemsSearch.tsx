"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Like } from "../svgs/SvgEducation";

export const ItemsSearch = ({ searchLevel, searchData, params }: any) => {
  const [isDataReady, setIsDataReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchData.length >= 1) {
      setIsDataReady(true);
    } else {
      setIsDataReady(false);
    }
  }, [searchData]);

  const pusherRgb = (code: any) => {
    router.push(`/${params.lang}/citizen/${code}`);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const items = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return isDataReady ? (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {searchData.map((item: any) => {
        // ---------------------------------
        // 1️⃣ Citizen Level
        // ---------------------------------
        if (searchLevel === "citizen") {
          return (
            <motion.div key={item?.id} variants={items}>
              <Link
                href={`/${params.lang}/citizens/${item.code}`}
                className="w-[99%] h-[65px] mt-2 transition-all duration-300 border-b border-stone-300 dark:border-mediumGray cursor-pointer flex justify-between items-center dark:text-white"
              >
                <p className="dark:text-white text-black font-medium truncate text-[16px]">
                  {item?.name}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <p className="uppercase font-bold text-blueLink text-[14px]">
                      {item?.code}
                    </p>
                    <span className="text-[13px] text-gray-400">
                      {item.level || "--"}
                    </span>
                  </div>
                  <Image
                    src={item.photo || "/firstpage/temp-1.webp"}
                    alt={item?.name}
                    width={50}
                    height={50}
                    className="rounded-full shadow-sm"
                  />
                </div>
              </Link>
            </motion.div>
          );
        }

        // ---------------------------------
        // 2️⃣ Education Level
        // ---------------------------------
        else if (searchLevel === "education") {
          return (
            <Link
              href={`/${params.lang}/education/category/${item.category.slug}/${item.sub_category.slug}/${item.slug}`}
              key={item.id}
              className="w-[99%] h-[65px] mt-2 transition-all duration-300 bg-white dark:bg-dark-background border-b border-mediumGray flex justify-between items-center p-3 rounded-lg"
            >
              <p className="dark:text-white text-black font-medium truncate text-[16px]">
                {item.title}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <p className="uppercase font-bold text-blueLink text-[14px]">
                    {item.creator.code}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-[12px] text-gray-400">
                      {item.likes_count}
                    </span>
                    <Like className="w-[15px] h-[15px] stroke-gray dark:stroke-dark-gray" />
                  </div>
                </div>
                <Image
                  src={item.creator.image}
                  alt={item.creator.title}
                  width={50}
                  height={50}
                  className="rounded-full shadow-sm"
                />
              </div>
            </Link>
          );
        }

        // ---------------------------------
        // 3️⃣ Articles Level
        // ---------------------------------
        else if (searchLevel === "articles") {
          return (
            <motion.div key={item.id} variants={items}>
              <Link
                href={`/${params.lang}/articles/${item.slug}`}
                className="w-[99%] mt-2 hover:shadow-md transition-all duration-300 
                bg-white dark:bg-dark-background border-b border-mediumGray 
                flex justify-between items-center p-3 rounded-lg"
              >
                <div className="flex flex-col">
                  <h3 className="text-black dark:text-white text-[16px] font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] truncate">
                    {item.excerpt || item.category}
                  </p>
                </div>
                <Image
                  src={item.image || "/placeholder.png"}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />
              </Link>
            </motion.div>
          );
        }

        return null;
      })}
    </motion.div>
  ) : null;
};
