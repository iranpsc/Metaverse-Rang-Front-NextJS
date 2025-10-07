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

      {/* استفاده از ListData */}
      <motion.div className="mt-12 gap-[64px] grid md:grid-cols-2 xl:grid-cols-3 w-full">
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
