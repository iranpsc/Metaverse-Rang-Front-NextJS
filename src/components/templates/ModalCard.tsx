import Image from "next/image";
import { CLoseIcon } from "../svgs";
//ANIMATION
import { motion } from "framer-motion";
export default function ModalCard({setShowModal,dataModal}:any){

    return (
      <div className="absolute backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 bottom-0 w-full xl:h-full lg:h-full md:h-full sm:h-max xs:h-max xl:pb-0 lg:pb-0 md:pb-0 sm:pb-[300px] xs:pb-[300px]">
        <div className=" flex justify-center   items-center w-full h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
            className=" xl:w-[40%] lg:w-[40%] md:w-[40%] min-h-[250px] max-h-fit  rounded-[10px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0 sm:mt-[1000px] xs:mt-[1500px] items-center shadow-md bg-white dark:bg-dark-background text-center"
          >
            <div className=" w-full h-full  flex flex-col justify-start  gap-4 top-0 absolute">
              <div className="flex flex-col justify-between items-start mx-3 mt-2 gap-5">
                <CLoseIcon
                  className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray"
                  onClick={() => setShowModal(false)}
                />
                <h1 className="font-azarMehr font-bold text-[16px] text-[#00000096] dark:text-gray">
                  {dataModal.title}
                </h1>
              </div>

              {typeof dataModal.desc === "string" ? (
                <p className="pb-16 px-2 font-azarMehr font-medium text-[14px] text-[#00000096] dark:text-gray">
                  {dataModal.desc}
                </p>
              ) : (
                <div className="flex flex-row justify-center items-center gap-3 pb-10 mt-10 ">
                  {Object.keys(dataModal.desc).map((item: any, index: any) => (
                    <Image
                      key={index}
                      src={dataModal.desc[item]}
                      alt=""
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
}