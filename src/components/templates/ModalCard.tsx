import { useEffect, useRef, useState ,useContext} from "react";
import Image from "next/image";
import { Arrow, CLoseIcon } from "@/svgs/index";
import { useTheme } from "next-themes";
import { LangContext } from "@/context/LangContext";
import { translateFavorites } from "@/utils/targetDataName";

//ANIMATION
import { motion } from "framer-motion";
export default function ModalCard({
  setShowModal,
  dataModal,
  type,
  titleData,
}: any) {
  const { theme } = useTheme();
  const { data, profileData } = useContext(LangContext);
    const scrollContainer = useRef<HTMLDivElement>(null);

    

    const scrollRight = () => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    };

    const scrollLeft = () => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    };

  return (
    <div
      id={`${theme === "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
      className="absolute  backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 bottom-0 w-full xl:h-full lg:h-full md:h-full sm:min-h-max xs:min-h-max xl:pb-0 lg:pb-0 md:pb-0 sm:pb-[1000px] xs:pb-[1000px]"
    >
      <div className=" flex flex-col justify-center  h-screen  items-center w-full ">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className={` xl:w-[40%] lg:w-[40%] md:w-[70%] min-h-[350px] max-h-fit  rounded-[10px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0  ${
            dataModal.title === "about me" || dataModal.title === "درباره من"
          } items-center relative shadow-md bg-white dark:bg-dark-background  `}
        >
          <CLoseIcon
            className=" absolute w-[15px] h-[15px]  cursor-pointer stroke-2 m-2    stroke-gray top-2 start-2 z-50"
            onClick={() => setShowModal(false)}
            alt={titleData}
          />
          <div className="w-full h-full  flex flex-col justify-start  gap-4 top-0 absolute">
            <div className="flex flex-row justify-center items-center mt-3">
              <h1 className="font-azarMehr font-bold 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle text-[#00000096] dark:text-dark-gray">
                {dataModal.title}
              </h1>
            </div>

            {dataModal.type === "favorites" ? (
              <div className=" relative px-5 mt-10">
                <div
                  className="rounded-full cursor-pointer 3xl:w-[50px] 3xl:h-[10px] xl:w-[50px] xl:h-[50px] lg:w-[50px] lg:h-[50px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] xs:w-[40px] xs:h-[40px] absolute right-1 top-[20%]  z-50 flex justify-center items-center"
                  onClick={scrollRight}
                >
                  <Arrow className="stroke-gray stroke-[5px] rotate-[180deg] w-7 h-7" />
                </div>
                <div
                  className="rounded-full cursor-pointer  3xl:w-[50px] 3xl:h-[50px] xl:w-[50px] xl:h-[50px] lg:w-[50px] lg:h-[50px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] xs:w-[40px] xs:h-[40px] absolute left-1 top-[20%] z-50 flex justify-center items-center"
                  onClick={scrollLeft}
                >
                  <Arrow
                    className="stroke-gray stroke-[5px] w-7 h-7"
                    onClick={scrollLeft}
                  />
                </div>
                <div
                  className="  overflow-y-clip overflow-x-auto no-scrollbar relative w-full"
                  ref={scrollContainer}
                >
                  <div className="  grid grid-cols-5 justify-center gap-x-1 gap-y-10 items-center  w-max">
                    {Object.keys(dataModal.desc).map(
                      (item: any, index: any) => (
                        <div
                          key={index}
                          className=" col-span-1 flex flex-col gap-3 justify-center items-center di"
                        >
                          <Image
                            src={dataModal.desc[item]}
                            alt={translateFavorites(
                              data.data.selectedProfileData,
                              item
                            )}
                            width={1000}
                            height={1000}
                            className="w-[75px] h-[50px] mx-10 "
                          />
                          <p className="font-azarMehr 3xl:text-xl3Title lg:text-lgTitle  xl:text-xlTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle font-medium  text-[#000] dark:text-white">
                            {translateFavorites(
                              data.data.selectedProfileData,
                              item
                            )}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {" "}
                <p className="pb-16 px-2 pt-5 leading-[35px]  overflow-y-auto overflow-x-clip font-azarMehr font-medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle text-gray dark:text-dark-gray text-justify">
                  {dataModal.desc}
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
