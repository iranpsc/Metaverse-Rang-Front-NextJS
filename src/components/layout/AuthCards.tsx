import { useContext,useEffect } from "react";
import HeaderAuth from "../module/HeaderAuth";
import AuthCard from "./../templates/AuthCard";
import ActiveMailModule from "../module/ActiveMailModule";
//CONTEXT
import { AuthContext } from "./../context/AuthContext";
import { LangContext } from '@/context/LangContext';
//ANIMATION
import { motion } from "framer-motion";
//MODULES
import IpPage from '@/module/IpPage';
import CheckIp from "@/module/CheckIp";

export default function AuthCards({setShowAuthCard}:any) {
  const { modalName,setModalName } = useContext(AuthContext);
  const { languageSelected,data } = useContext(LangContext);
  const lang = languageSelected.code;

  useEffect(()=>{

  },[modalName])

    const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };
 
 
  return (
    <div
      className=" absolute  xl:z-50 lg:z-50 md:z-50 xs:z-[100] sm:z-[100]   top-0 w-full h-full"
      dir={`${lang === "fa" ? "rtl" : "ltr"}`}
    >
      <div className=" flex   justify-center backdrop-blur-sm  bg-black/20  items-center w-full h-full">
        <motion.div
           variants={modalVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  transition={{
    duration: 0.5,
    ease: "backInOut",
  }}
          className={`absolute z-50
          ${
            modalName.name === "ActiveEmailPage" &&
            "h-[490px] w-[340px] max-sm:w-[300px] "
          }
          ${
            modalName.name === "AuthPage" &&
            "  w-[340px] h-fit max-sm:w-[300px]"
          }
          ${
            modalName.name === "CheckIp" &&
            "h-[490px] w-[430px] max-sm:w-[300px]"
          }
          ${
            modalName.name === "IpPage" &&
            "h-[489px] w-[340px] max-sm:w-[300px]"
          }
           rounded-[10px]  bg-white dark:bg-dark-backgroundModules`}
        >
          <section className=" w-full h-full flex flex-col justify-between items-center ">
            {modalName.name === "AuthPage" && (
              <>
                <HeaderAuth setShowAuthCardHeader={setShowAuthCard} />
                <AuthCard setShowAuthCard={setShowAuthCard} />
              </>
            )}
            {modalName.name === "ActiveEmailPage" && (
              <>
                <HeaderAuth
                  setShowAuthCardHeader={setShowAuthCard}
                  title={{
                    fa: " شهروندی فعال سازی حساب",
                    en: "Citizen Account Activation",
                  }}
                />
                <ActiveMailModule data={modalName.data} lang={lang} />
              </>
            )}
            {modalName.name === "IpPage" && (
              <>
                <HeaderAuth
                  setShowAuthCardHeader={setShowAuthCard}
                  title={
                    data.data.checkIpLang.find(
                      (item: any) => item.name === "access level"
                    ).translation
                  }
                />
                <IpPage />
              </>
            )}

            {modalName.name === "CheckIp" && (
              <>
                <HeaderAuth
                  setShowAuthCardHeader={setShowAuthCard}
                  title={
                    data.data.checkIpPageLang.find(
                      (item: any) => item.name === "access level"
                    ).translation
                  }
                />
                <CheckIp />
              </>
            )}
          </section>
        </motion.div>
      </div>
    </div>
  );
}
