"use client";
import { Arrow, Vector } from "@/components/svgs";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { motion } from "framer-motion";

export default function HeaderFirstPage({ mainData, params }: any) {
  return (
    <>
      {/* FIRST BOX */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-1 ">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className=" lg:w-[50%] font-bold text-[32px] sm:text-[32px] md:text-[38px] xl:text-[56px] 2xl:text-[78px]  text-light-primary dark:text-dark-yellow lg:whitespace-nowrap font-rokh mt-2 xl:mt-5"
        >
          {findByUniqueId(mainData, 1457)}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className=" w-full outline-none border-none"
        >
          <Vector className="w-[50%] h-2 md:h-5 2xl:h-10 stroke-light-primary dark:stroke-dark-yellow" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="w-full text-white text-[16px] sm:text-[18px] md:text-[24px] 2xl:text-[36px] 3xl:text-[40px] text-start font-bold "
        >
          {/* {localFind("integration of ideas and creativity")} */}
          {findByUniqueId(mainData, 481)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[22px]"
        >
          {/* {localFind("metaverse rang is a metaverse world platform")} */}
          {findByUniqueId(mainData, 482)}
        </motion.p>

        <a href="https://rgb.irpsc.com/metaverse/">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="!border-[2px]  border-solid mt-3 !border-white rounded-full  w-max xl gap-7  flex flex-row justify-between items-center p-1 ps-6"
          >
            <p className="w-fit text-start text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white font-azarMehr font-medium whitespace-nowrap">
              {/* {localFind("entering the metaverse world")} */}
              {findByUniqueId(mainData, 483)}
            </p>
            <div className="bg-light-primary dark:bg-dark-yellow size-[42px] md:size-[47px] lg:size-[53px]  xl:size-[70px] rounded-full flex justify-center items-center">
              <Arrow className="size-[20px] sm:size-[23px] md:size-[28px] lg:size-[32px]  xl:size-[36px] ltr:rotate-90" />
            </div>
          </motion.div>
        </a>
      </div>
      {/* LAST BOX */}

      {/* <div className="w-full flex justify-center items-center">
        // desktop
        <Image
          className="size-full object-cover hidden lg:block pt-[2vh] ltr:rotate-180"
          src="/firstpage/header.png"
          alt="header"
          width={1000}
          height={1000}
          priority={true}
        />
        // mobile
        <Image
          className="w-full pt-[40px] lg:hidden"
          src="/firstpage/header1.png"
          alt="header"
          width={1000}
          height={1000}
          priority={true}
        />
      </div> */}
    </>
  );
}
