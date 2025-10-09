"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import ListData from "@/components/shared/ListData";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import SyncLoader from "react-spinners/SyncLoader";

const ShowAllCategoriesComponent = ({ categoriesData, params, mainData, theme }: any) => {
  const router = useRouter();

  const [visibleCount, setVisibleCount] = useState(9); // اول ۱۵ تا
  const [loading, setLoading] = useState(false);

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

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 9);
      setLoading(false);
    }, 500); // یه افکت لودینگ کوچیک
  };

  const isDisabled = visibleCount >= categoriesData.length;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="p-2"
    >
      <motion.div className="mt-12 gap-[64px] grid md:grid-cols-2 xl:grid-cols-3 w-full">
        <ListData
          nameComponent="categories"
          data={{ subcategories: categoriesData.slice(0, visibleCount) }}
          params={params}
        />
      </motion.div>

      {/* دکمه لود مور */}
      <div className="w-full flex justify-center mt-[40px]">
        {!loading ? (
          <button
            disabled={isDisabled || loading}
            title={isDisabled ? "صفحه آخر" : ""}
            className={`${isDisabled ? "cursor-not-allowed" : ""
              } bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow`}
            onClick={handleLoadMore}
          >
            {findByUniqueId(mainData, 271)}
          </button>
        ) : (
          <SyncLoader
            color="currentColor"
            size={10}
            className="text-light-primary dark:text-dark-yellow"
          />

        )}
      </div>
    </motion.div>
  );
};

export default ShowAllCategoriesComponent;
