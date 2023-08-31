import { useContext } from "react";
import HeaderAuth from "../module/HeaderAuth";
import AuthCard from "./../templates/AuthCard";
import ActiveMailModule from "../module/ActiveMailModule";
//CONTEXT
import { AuthContext } from "./../context/AuthContext";
import { selectLanguageAuthModule } from "@/components/utils/textsLanguage";

import IpPage from '../module/IpPage';
import CheckIp from "../module/CheckIp";
import { LangContext } from '@/components/context/LangContext';

export default function AuthCards({setShowAuthCard}:any) {
  const { modalName, setModalName } = useContext(AuthContext);
  const { languageSelected } = useContext(LangContext);
  const lang = languageSelected.code;
 
  return (
    <div className=" absolute  z-50  top-0 w-full h-full" dir="ltr">
      <div className=" flex  justify-center backdrop-blur-sm  bg-black/20  items-center w-full h-full">
        <div
          className={`absolute  z-50 w-[340px] 
          ${modalName.name === "ActiveEmailPage" && "h-[490px] w-[450px]"}
          ${modalName.name === "AuthPage" && "h-[540px] w-[340px]"}
          ${modalName.name === "CheckIp" && "h-[490px] w-[450px]"}
          ${modalName.name === "IpPage" && "h-[490px] w-[450px]"}
           rounded-[10px]  bg-white dark:bg-dark-backgroundModules`}
        >
          <section className=" w-full h-full flex flex-col justify-between items-center ">
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
                    IR: "فعال سازی حساب شهروندی",
                    EN: "Citizen Account Activation",
                  }}
                />
                <ActiveMailModule data={modalName.data} lang={lang} />
              </>
            )}
            {modalName.name === "IpPage" && (
              <>
                <HeaderAuth  setShowAuthCardHeader={setShowAuthCard}
                  title={{
                    IR: "سطح دسترسی",
                    EN: "َAccess Level",
                  }}
                />
                <IpPage />
              </>
            )}

            {modalName.name === "CheckIp" && (
              <>
                <HeaderAuth  setShowAuthCardHeader={setShowAuthCard}
                  title={{
                    IR: "سطح دسترسی",
                    EN: "َAccess Level",
                  }}
                />
                <CheckIp />
              </>
            )}

            {modalName.name === "AuthPage" ? (
              <footer className="w-[95%]  mb-7 h-[50px]">
                {lang === "EN" ? (
                  <>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).loginFooter}
                      <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
                        system's service contract.
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).loginFooterBe}
                      <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
                        با شرایط قرارداد خدمات
                      </span>
                    </p>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).loginFooterAf}
                    </p>
                  </>
                )}
              </footer>
            ) : (
              <footer
                className={`
                ${modalName.name === "CheckIp" && "w-[85%] mb-1 h-[50px]"}
                ${modalName.name === "IpPage" && "w-[80%] mb-1 h-[50px]"}
                ${
                  modalName.name === "ActiveEmailPage" &&
                  "w-[80%] mb-3 h-[50px]"
                }
               
                 `}
              >
                {lang === "EN" ? (
                  <>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).footer}
                      <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
                        website.
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).footerBe}
                      <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
                        وبسایت
                      </span>
                    </p>
                    <p className="w-full text-center text-[14px] font-azarMehr text-[#898989] font-medium">
                      {selectLanguageAuthModule(lang).footerَAf}
                    </p>
                  </>
                )}
              </footer>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
