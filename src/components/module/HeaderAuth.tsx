import { useContext } from "react";
import { CloseAuth } from "../svgs";
import Image from "next/image";
import { useTheme } from "next-themes";
import { LangContext } from "./../../components/context/LangContext";

export default function HeaderAuth({ title, setShowAuthCardHeader }: any) {
  const { theme, setTheme } = useTheme();
  const { languageSelected } = useContext(LangContext);
  const lang = languageSelected.code;
  return (
    <>
      <div className="w-[95%] cursor-pointer mt-5 flex flex-row justify-start items-center gap-3">
        <CloseAuth
          className="w-[40px] h-[38px]"
          onClick={() => setShowAuthCardHeader(false)}
        />
        <Image
          src={theme === "dark" ? "/qIconDark.png" : "/qIconLight.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-[40px] h-[38px]"
        />
        <Image
          src={theme === "dark" ? "/eIconDark.png" : "/eIconLight.png"}
          alt=""
          width={1000}
          height={1000}
          className="w-[40px] h-[38px]"

        />
        <div className="flex-1">
          <p
            className="text-[#353535] text-end dark:text-[#E9E9E9] font-azarMehr font-normal text-[18px]"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {lang === "IR" ? title?.IR : title?.EN}
          </p>
        </div>
      </div>
    </>
  );
}
