import { useContext } from "react"
//COMPONENTS
import { AuthContext } from "@/components/context/AuthContext"
import { LangContext } from "@/components/context/LangContext";
//UTILE
import { selectLanguageAuthModule } from "@/components/utils/textsLanguage";
import Persian from "persianjs";



export default function IpPage(){

    const {myIp,setModalName} = useContext(AuthContext)
    const { languageSelected } = useContext(LangContext);
    const lang = languageSelected.code;

    return (
      <div className=" w-[95%] h-[100%] mt-14">
        <h1 className="text-center font-azarMehr font-extrabold text-[25px] text-[#FF3E3E]">
          {selectLanguageAuthModule(lang).ipTextTitle}
        </h1>
        <h2 className=" mt-4 text-center font-azarMehr font-bold text-[25px] text-[#757575] dark:text-white">
          {languageSelected?.code !== "IR"
            ? myIp
            : Persian(myIp).englishNumber().toString()}
        </h2>
        <p className="mt-2 text-center font-azarMehr font-medium text-[14px] text-[#0000005C] dark:text-[#5B5B5B] ">
          {selectLanguageAuthModule(lang).ipTextP}
        </p>
        <p className="mt-10 text-center font-azarMehr font-bold text-[15px] px-1 text-[#000000A1] dark:text-[#969696]">
          {selectLanguageAuthModule(lang).ipTextDateailsBe}
          <span className="text-error font-azarMehr font-bold text-[15px] px-1">
            {" "}
            VPN{" "}
          </span>
          {selectLanguageAuthModule(lang).ipTextDateailsAf}
        </p>
        <button
          className="relative mt-7 dark:bg-[#18C08F80] bg-[#D7FBF0] text-[#18C08F] border-[#18C08F] border-[1px] w-full h-[50px]  rounded-[5px] font-azarMehr font-normal"
          onClick={() => setModalName({ name: "CheckIp", data: myIp })}
        >
          {selectLanguageAuthModule(lang).ipTextButton}
        </button>

        {lang === "EN" ? (
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