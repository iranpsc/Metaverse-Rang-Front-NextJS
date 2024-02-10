import { useState, useEffect } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { Like } from "@/components/svgs/SvgEducation";

export const ItemsSearch = ({ searchData }: any) => {
  const [isDataReady, setIsDataReady] = useState(false);

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
        <motion.div
          key={item.id}
          className="w-[99%] h-[65px] mt-2 hover:dark:shadow-darkSearch transition-all duration-300  bg-white dark:bg-dark-background border-b-[1px] border-mediumGray dark:border-mediumGray hover:shadow-md  cursor-pointer flex flex-row justify-between items-center"
          variants={items}
        >
          <p className="ms-7 font-azarMehr truncate  text-[16px] xs:text-[12px] font-medium ">
            {item.title}
          </p>
          <div className="flex flex-row justify-between items-center gap-3 min-w-fit ">
            <div className="h-full flex flex-col gap-0 ">
              <p className="uppercase  font-azarMehr text-[14px] xs:text-[10px] font-bold  text-blueLink">
                {item.creator.code}
              </p>
              <div className="flex flex-row items-center justify-end gap-1 ">
                <span className=" whitespace-nowrap font-azarMehr font-light 3xl:text-[18px] xs:text-[12px]">
                  {item.likes}
                </span>
                <Like />
              </div>
            </div>
            <Image
              src={item.creator.image}
              alt={item.creator.title}
              loading="lazy"
              width={1000}
              height={1000}
              className=" w-[50px] h-[50px] xs:w-[40px] xs:h-[40px] me-2 my-5  shadow-sm shadow-gray rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  ) : null;
};
