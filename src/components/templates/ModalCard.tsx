import { useEffect, useState } from "react";
import Image from "next/image";
import { CLoseIcon } from "@/svgs/index";
import { useTheme } from "next-themes";

//ANIMATION
import { motion } from "framer-motion";
export default function ModalCard({
  setShowModal,
  dataModal,
  type,
  titleData,
}: any) {
  const { theme } = useTheme();

  return (
    <div className="absolute  backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 bottom-0 w-full xl:h-full lg:h-full md:h-full sm:min-h-max xs:min-h-max xl:pb-0 lg:pb-0 md:pb-0 sm:pb-[1000px] xs:pb-[1000px]">
      <div className=" flex flex-col justify-center  h-screen  items-center w-full ">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className={` xl:w-[40%] lg:w-[40%] md:w-[70%] min-h-[250px] max-h-fit  rounded-[10px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0  ${
            dataModal.title === "about me" || dataModal.title === "درباره من"
          } items-center relative shadow-md bg-white dark:bg-dark-background  `}
        >
          <CLoseIcon
            className=" absolute w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray top-2 start-2 z-50"
            onClick={() => setShowModal(false)}
            alt={titleData}
          />
          <div
            id="light-scrollbar"
            className={`${
              theme === "dark" ? "dark-scrollbar" : "light-scrollbar"
            }  w-full h-full overflow-auto flex flex-col justify-start  gap-4 top-0 absolute`}
          >
            <div className="flex flex-row justify-center items-center mt-3">
              <h1 className="font-azarMehr font-bold 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle text-[#00000096] dark:text-gray">
                {dataModal.title}
              </h1>
            </div>

            {dataModal.type === "favorites" ? (
              <>
                {" "}
                <div className="flex flex-row justify-center items-center gap-3 pb-10 mt-10 ">
                  {Object.keys(dataModal.desc).map((item: any, index: any) => (
                    <Image
                      key={index}
                      src={dataModal.desc[item]}
                      alt={titleData}
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                {" "}
                <p className="pb-16 px-2 font-azarMehr font-medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle text-[#00000096] dark:text-gray text-justify">
                  {dataModal.desc}
                </p>
              </>
            )}

            {/* {typeof dataModal.desc === "string" ? (
               
              ) : (
             
              )} */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
