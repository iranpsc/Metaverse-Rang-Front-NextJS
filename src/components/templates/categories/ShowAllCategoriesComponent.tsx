"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import ListData from "@/components/shared/ListData";

const ShowAllCategoriesComponent = ({ categoriesData, params }: any) => {
  const router = useRouter();

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="p-2"
    >
      {/* breadcrumb */}
      <div className="w-[95%] xs:w-[90%] py-5 ms-2 flex flex-row justify-start gap-2">
        <p
          className="w-fit ms-5 font-normal font-azarMehr text-[15px] text-start text-[#575757] cursor-pointer relative z-50"
          onClick={() => router.push(`/${params.lang}/education`)}
        >
          آموزش
        </p>
        <span
          className="text-[#575757] font-normal font-azarMehr text-[15px]"
          onClick={() => router.push(`/${params.lang}/education`)}
        >
          /
        </span>
        <p
          className="w-fit font-normal font-azarMehr cursor-pointer text-[15px] text-start text-blueLink dark:text-dark-yellow"
          onClick={() => router.push(`/${params.lang}/education/category/all`)}
        >
          دسته بندی ها
        </p>
      </div>

      {/* استفاده از ListData */}
      <motion.div className="mt-5 gap-[64px] grid md:grid-cols-2 xl:grid-cols-3 w-full">
        <ListData
          nameComponent="categories"
          data={{ subcategories: categoriesData }}
          params={params}
        />
      </motion.div>
    </motion.div>
  );
};

export default ShowAllCategoriesComponent;
