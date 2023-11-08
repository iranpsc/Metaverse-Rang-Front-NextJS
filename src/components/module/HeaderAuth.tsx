import Image from "next/image";
import { useTheme } from "next-themes";
import { CloseAuth } from "@/svgs/index";
import { LangContext } from '@/context/LangContext';
import { AuthContext } from "./../context/AuthContext";
import { useContext } from "react";

export default function HeaderAuth({ title, setShowAuthCardHeader }: any) {
    const { languageSelected, data } = useContext(LangContext);
      const { modalName, setModalName } = useContext(AuthContext);
  const lang = languageSelected.code;
  const { theme, setTheme } = useTheme();

   const submit = () => {
     setModalName({
       name: "AuthPage",
       data: "",
     });
     setShowAuthCardHeader(false)
   };
  return (
    <>
      <div className="w-[95%] cursor-pointer mt-5 flex flex-row justify-start items-center gap-3">
        <CloseAuth
          className="w-[40px] h-[38px]"
           onClick={submit}
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
            className="text-[#353535] text-center text-[13px] dark:text-[#E9E9E9] font-azarMehr font-normal w-full"
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {/* {languageSelected.code === "en"
              ? "Citizen Account Activation" :  " شهروندی فعال سازی حساب",
              }
             */}
          </p>
        </div>
      </div>
    </>
  );
}
