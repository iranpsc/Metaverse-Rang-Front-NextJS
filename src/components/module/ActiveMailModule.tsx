import Image from "next/image";
import {
  textMailBeEn,
  textMailAfEn,
  textActiveMailEn,
  textResendEn,
  textButtonEn,
  selectLanguageAuthModule,
} from "../utils/textsLanguage";


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
    <div className=" w-[65%] h-[70%] mt-16">
      <p className="text-[#4F4F4F] dark:text-white font-azarMehr text-[20px] font-semibold text-center">
         {selectLanguageAuthModule(lang).ActiveMailTextTitleBe}
        <span className="dark:text-white font-azarMehr font-extrabold text-[20px] text-center">
          {" "}{data}{" "}
        </span>
      {selectLanguageAuthModule(lang).ActiveMailTextTitleAf}
      </p>
      <p className="mt-5 text-[#000000A1] dark:text-[#FFFFFFA1] font-azarMehr text-[14px] font-medium text-center">
        {selectLanguageAuthModule(lang).ActiveMailTextConfirm}
      </p>
      <button className="relative mt-10 dark:bg-[#18C08F80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal">
        <Image
          src={iconSrc}
          alt=""
          width={1000}
          height={1000}
          className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        {selectLanguageAuthModule(lang).ActiveMailTextButton}
      </button>
      <p className="text-[#008BF8] nt-azarMehr text-[12px] mt-3 font-medium text-center">
       {selectLanguageAuthModule(lang).ActiveMailResend}
      </p>
    </div>
  );
}
