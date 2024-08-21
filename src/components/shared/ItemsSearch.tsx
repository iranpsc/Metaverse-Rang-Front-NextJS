"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { Like } from "@/components/svgs/SvgEducation";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ItemsSearch = ({ searchData, params }: any) => {
  const [isDataReady, setIsDataReady] = useState(false);
  const router = useRouter();
  console.log("searchData", searchData);

  // const pusherRgb = (code: any) => {
  //   router.push(`/${params.lang}/citizen/${code}`);
  // };

  useEffect(() => {
    if (searchData.length >= 1) {
      setIsDataReady(true);
    } else {
      setIsDataReady(false);
    }
  }, [searchData]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  return isDataReady ? (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {searchData.map((item: any, index: any) => (
        <motion.div key={item?.id} variants={items}>
          <Link
            href={`/${params.lang}/citizen/${item.code}`}
            className="w-[99%] h-[65px] mt-2 hover:dark:shadow-darkSearch transition-all duration-300  bg-white dark:bg-dark-background border-b-[1px] border-mediumGray dark:border-mediumGray hover:shadow-md  cursor-pointer flex flex-row justify-between items-center dark:text-white"
          >
            <p className="ms-7 font-azarMehr truncate  text-[16px] xs:text-[12px] font-medium ">
              {item?.name}
            </p>
            <div className="flex flex-row justify-between items-center gap-3 min-w-fit ">
              <div className="h-full flex flex-col gap-0 ">
                <p className="uppercase  font-azarMehr text-[14px] xs:text-[10px] font-bold  text-blueLink">
                  {item?.code}
                </p>
                <div className="flex flex-row items-center justify-end gap-1 ">
                  <span className=" whitespace-nowrap font-azarMehr font-normal text-black dark:text-white 3xl:text-[18px] xs:text-[12px]">
                    {item?.followers}
                  </span>
                  <Like className="w-[15px] h-[15px] stroke-gray dark:stroke-dark-gray" />
                </div>
              </div>
              <Image
                src={item.photo || "/temp.png"}
                alt={item?.name}
                loading="lazy"
                width={1000}
                height={1000}
                className=" w-[50px] h-[50px] xs:w-[40px] xs:h-[40px] me-2 my-5  shadow-sm shadow-gray rounded-full"
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  ) : null;
};
