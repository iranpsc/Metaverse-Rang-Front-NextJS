import { useContext } from "react";
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
  const { modalName } = useContext(AuthContext);
  const { languageSelected,data } = useContext(LangContext);
  const lang = languageSelected.code;

 
  return (
    <div
      className=" absolute  z-50 max-sm:z-[110]  top-0 w-full h-full"
      dir={`${lang === "fa" ? "rtl" : "ltr"}`}
    >
      <div className=" flex  justify-center backdrop-blur-sm  bg-black/20  items-center w-full h-full">
        <div
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
          <motion.section
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
            className=" w-full h-full flex flex-col justify-between items-center "
          >
            {modalName.name === "AuthPage" && (
              <>
                <HeaderAuth setShowAuthCardHeader={setShowAuthCard} />
                <AuthCard />
              </>
            )}
            {modalName.name === "ActiveEmailPage" && (
              <>
                <HeaderAuth
                  setShowAuthCardHeader={setShowAuthCard}
                  title={{
                    fa: "فعال سازی حساب",
                    en: "Account Activation",
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
                    data.data.checkIpLang.find((item:any) => item.name === "access level")
                      .translation
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
                    data.data.checkIpPageLang.find((item:any) => item.name === "access level")
                      .translation
                  }
                />
                <CheckIp />
              </>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
