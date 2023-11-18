import Image from "next/image";
import {
  selectLanguageAuthModule
} from "@/utils/textsLanguage";


export default function ActiveMailModule({ data, lang }: any) {

  const domain = data.split("@")[1];
  const domainIcons: any = {
    "yahoo.com": "/mails/yahoo.png",
    "icloud.com": "/mails/icloud.png",
    "gmail.com": "/mails/gmail.png",
    "outlook.com": "/mails/outlook.png",
  };
  const iconSrc = domain in domainIcons ? domainIcons[domain] : "";

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
      <button className="relative mt-8 dark:bg-[#18C08F80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal">
        <Image
          src={iconSrc}
          alt="mail"
          width={1000}
          height={1000}
          className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        {selectLanguageAuthModule(lang).ActiveMailTextButton}{" "}
        {iconSrc === "/mails/gmail.png" ? "Gmail" : "Mail"}
      </button>
      <p className="text-[#008BF8] font-azarMehr text-[14px] mt-3  font-normal text-center">
        {selectLanguageAuthModule(lang).ActiveMailResend}
      </p>
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
