import { useContext } from "react";
//ANIMATION
import { motion } from "framer-motion";
import { useToken } from "../context/TokenContext";
import { LangContext } from "@/context/LangContext";

export default function Log({ showLogOut, setShowLogOut }: any) {

   const {removeToken} = useToken();
  const logout = () => {
    removeToken();
    setShowLogOut(false);
  };
const { data } = useContext(LangContext);
 const title = data.data.menu.find(
   (item: any) => item.name === "are you sure you want to exit"
 ).translation;
 const yes = data.data.menu.find(
   (item: any) => item.name === "yes"
 ).translation;
 const no = data.data.menu.find(
   (item: any) => item.name === "no"
 ).translation;


  return (
    <div className="absolute backdrop-blur-sm bg-blackTransparent/30  top-0 w-full h-screen z-[900]">
      <div className="w-full h-full overflow-clip">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className=" flex flex-col justify-center   items-center w-full h-full"
        >
          <div
            className="3xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[60%] min-h-[250px] max-h-fit  rounded-[15px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[80%] xs:me-0 xs:w-[80%] justify-center xl:mt-0 lg:mt-0 md:mt-0 
              mt-[100px]    items-center shadow-md bg-white dark:bg-dark-background "
          >
            <div className="w-full h-full flex flex-col justify-center items-center ">
              <h1 className="font-azarMehr font-bold 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle mt-2 text-[#00000096] dark:text-gray w-full text-center gap-5">
               {title}
              </h1>

              <div className="flex flex-row items-center justify-between mt-10 gap-[10] 3xl:w-[40%] xl:w-[40%] lg:w-[30%] md:w-[70%] sm:w-[70%] xs:w-[70%] ">
                <button
                  className="border px-10 py-4 rounded-[20px] text-black border-blueLink dark:text-white  dark:border-dark-yellow font-azarMehr font-medium medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle"
                  onClick={() => setShowLogOut(false)}
                >
                  {no}
                </button>
                <button className="border px-10 py-4 rounded-[20px] text-white bg-blueLink dark:text-black  dark:bg-dark-yellow  font-azarMehr font-medium medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc  sm:text-smTitle xs:text-smTitle"
               onClick={logout}
                >
                  {yes}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
