"use client";
import { Arrow, Vector } from "@/components/svgs";
import { motion } from "framer-motion";

export default function HeaderFirstPage({
  firstPageArrayContent,
  params,
}: any) {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  return (
    <>
      {/* FIRST BOX */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start items-start gap-1">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-[50%] font-bold text-[28px] sm:text-[32px] md:text-[38px] xl:text-[56px] 2xl:text-[78px] 3xl:text-[108px] text-dark-yellow whitespace-nowrap font-rokh mt-2 xl:mt-5"
        >
          {params.lang == "fa" ? "متاورس رنگ" : "Color Metaverse"}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className=" w-full outline-none border-none"
        >
          <Vector className="w-[50%] h-2 md:h-5 2xl:h-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="w-full text-white text-[16px] sm:text-[18px] md:text-[24px] 2xl:text-[36px] 3xl:text-[48px] text-start font-bold "
        >
          {localFind("integration of ideas and creativity")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full text-justify text-white font-azarMehr font-medium text-[14px] md:text-[16px] 2xl:text-[24px]"
        >
          {localFind("metaverse rang is a metaverse world platform")}
        </motion.p>

        <a href="https://rgb.irpsc.com/metaverse/">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border-[1px] mt-3 border-white rounded-full w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px] xl:w-[305px] h-[50px] md:h-[55px] lg:h-[60px] xl:h-[77px] flex flex-row justify-between items-center ps-6 pe-1"
          >
            <p className="w-fit text-start text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] text-white font-azarMehr font-medium ">
              {localFind("entering the metaverse world")}
            </p>
            <div className="bg-dark-yellow size-[42px] md:size-[47px] lg:size-[53px]  xl:size-[70px] rounded-full flex justify-center items-center">
              <Arrow className="size-[20px] sm:size-[23px] md:size-[28px] lg:size-[32px]  xl:size-[36px]" />
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
