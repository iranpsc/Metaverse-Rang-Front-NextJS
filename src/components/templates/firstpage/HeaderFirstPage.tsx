"use client";
import { Arrow, Discord, Vector } from "@/components/svgs";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeaderFirstPage({ firstPageArrayContent }: any) {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  return (
    <>
      <div className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12  xl:order-1 lg:order-1 md:order-2  sm:order-2 xs:order-2 xs:col-span-12 w-full flex flex-col justify-start items-start gap-5">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-[50%] md:text-center font-bold text-[28px] sm:text-[32px] md:text-[38px] lg:test-[46px]  xl:text-[56px] text-dark-yellow whitespace-nowrap font-rokh mt-5"
        >
          متاورس رنگ
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className=" w-full outline-none border-none"
        >
          <Vector className="w-[50%] h-10" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-white text-[16px] sm:text-[18px] md:text-[24px] lg:text-[30px] xl:text-[36px] text-start  xl:w-[50%] font-bold "
        >
          {localFind("integration of ideas and creativity")}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full   text-justify   text-white font-azarMehr font-medium text-[12px] sm:text-[14px] md:text-[16px]"
        >
          {localFind("metaverse rang is a metaverse world platform")}
        </motion.p>

        <a href="https://rgb.irpsc.com/metaverse/">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border-[1px] border-white rounded-full w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[305px] h-[50px] md:h-[55px] lg:h-[60px] xl:h-[77px] flex flex-row justify-between items-center ps-6 pe-1"
          >
            <p className="w-fit text-start text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white font-azarMehr font-medium ">
              {localFind("entering the metaverse world")}
            </p>
            <div className="bg-dark-yellow size-[42px] md:size-[47px] lg:size-[53px]  xl:size-[70px] rounded-full flex justify-center items-center">
              <Arrow className="size-[20px] sm:size-[23px] md:size-[28px] lg:size-[32px]  xl:size-[36px]" />
            </div>
          </motion.div>
        </a>
        <Discord className="size-[50px] mb-10 lg:mb-0" />
      </div>

      <div
        className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 w-full flex justify-center items-center 
       xl:order-2 lg:order-2 md:order-1  sm:order-1 xs:order-1
      "
      >
        <Image
          className="size-full object-contain"
          src="/firstpage/header.png"
          alt="header"
          width={1000}
          height={1000}
          priority={true}
        />
      </div>
    </>
  );
}
