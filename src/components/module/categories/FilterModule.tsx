import Image from "next/image";
import { useState } from "react";
import { Like, Dislike, View, Search } from "@/components/svgs/SvgEducation";
import { ArrowMenu } from "@/components/svgs";

import { motion } from "framer-motion";
import { SortModule } from "./SortModule";
import { SearchTrainersModule } from "./SearchTrainersModule";

export const FilterModule = ({
  translateData,
  showFilterItems,
  setShowFilterItems,
  setShowFilter,
  showFilter,
}: any) => {
  const modalVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      <div className=" absolute w-full h-screen backdrop-blur-sm bg-black/20 end-0 z-[70]">
        <motion.div
          variants={modalVariants}
          initial="exit"
          animate={showFilter ? "visible" : "hidden"}
          exit="exit"
          className="absolute end-0 top-0 h-screen w-[300px] bg-white flex flex-col justify-start items-center gap-5 rounded-xl"
        >
          <div className="flex flex-row justify-between items-center w-full px-4">
            <p className="font-azarMehr font-bold text-[24px]  text-center py-3 ">
              فیلترها
            </p>
            <p
              className="font-azarMehr font-bold text-[16px]  text-center py-3 "
              onClick={() => setShowFilter(false)}
            >
              close
            </p>
          </div>

          <SortModule
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            setShowFilterItems={setShowFilterItems}
          />

          <hr className="w-[90%] h-[1px] bg-gray" />

          <SearchTrainersModule
            translateData={translateData}
            showFilterItems={showFilterItems}
          />

          <div className="w-[90%] rounded-xl bg-blueLink h-[50px] absolute bottom-3 flex items-center justify-center">
            <p className="text-white font-azarMehr font-bold text-[16px]">
              اعمال فلیتر
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};
