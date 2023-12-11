import { useState,useContext } from "react";
import Image from "next/image";
import {
  selectLanguageAuthModule
} from "@/utils/textsLanguage";
import Link from "next/link";   
import Timer from "../templates/Timer";
import axios from "axios";
import { useToken } from "../context/TokenContext";



export default function ActiveMailModule({ data, lang }: any) {
  const [activeTimer,setActiveTimer] = useState<boolean>(false);
  const { token } = useToken();

  const domain = data.split("@")[1];
  const domainIcons: any = {
    "yahoo.com": "/mails/yahoo.png",
    "icloud.com": "/mails/icloud.png",
    "gmail.com": "/mails/gmail.png",
    "outlook.com": "/mails/outlook.png",
  };
  const iconSrc = domain in domainIcons ? domainIcons[domain] : "";

  const sendMail= async()=>{
 
    if (!activeTimer){
      const response = await axios.get(
        "https://api.rgb.irpsc.com/api/email/verification-notification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    
  }

    const handleTimeout = (): void => {
      //setColor("green");
      setActiveTimer(false)
    };

  return (
    <div className={`w-[95%] h-[100%] ${lang === "en" ? "mt-20" : "mt-16"}`}>
      <p className="text-[#4F4F4F] dark:text-white font-azarMehr text-[20px] font-bold text-center">
        {selectLanguageAuthModule(lang).ActiveMailTextTitleBe}

        <span className="dark:text-white font-azarMehr font-extrabold text-[20px] text-center">
          {" "}
          {data}{" "}
        </span>
        {selectLanguageAuthModule(lang).ActiveMailTextTitleAf}
      </p>
      <p className="mt-7 text-center text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[18px] font-normal">
        {selectLanguageAuthModule(lang).ActiveMailTextConfirm}
      </p>
      <p className="text-center mt-2 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[18px] font-normal">
        {selectLanguageAuthModule(lang).ActiveMailTextConfirm2}
      </p>
      <Link
        href="https://gmail.com"
        passHref={true}
        rel="noopener noreferrer"
        target="_blank"
      >
        <button
          className="relative mt-8 dark:bg-[#18C08F
        80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal"
        >
          {" "}
          <Image
            src={iconSrc}
            alt="mail"
            width={1000}
            height={1000}
            className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
          {selectLanguageAuthModule(lang).ActiveMailTextButton}
          {iconSrc === "/mails/gmail.png" ? "Gmail" : "Mail"}
        </button>
      </Link>
      <div
        className="flex flex-row items-center justify-center mt-3 gap-2 cursor-pointer"
        onClick={() => setActiveTimer(true)}
      >
        <p
          className={` ${
            !activeTimer ? "text-[#008BF8]" : "text-mediumGray"
          }  font-azarMehr text-[14px]  font-normal text-center `}
          onClick={sendMail}
        >
          {selectLanguageAuthModule(lang).ActiveMailResend}
        </p>
        {activeTimer && <Timer duration={300000} onTimeout={handleTimeout} />}
      </div>

      {lang === "en" ? (
        <p className="text-center px-1 mt-4 w-full text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-normal">
          {selectLanguageAuthModule(lang).footer}
          <span className="mx-1 text-[14px] font-azarMehr text-[#008BF8] cursor-pointer font-medium">
            website.
          </span>
        </p>
      ) : (
        <>
          <p className="w-ful text-center mt-4 text-[14px] font-azarMehr text-[#898989] font-medium">
            {selectLanguageAuthModule(lang).footerBe}
            <span className="mx-1 text-[14px] font-azarMehr  text-[#008BF8] cursor-pointer font-medium">
              وبسایت
            </span>
          </p>
          <p className="w-full text-center text-[14px]  font-azarMehr text-[#898989] font-medium">
            {selectLanguageAuthModule(lang).footerَAf}
          </p>
        </>
      )}
    </div>
  );
}
