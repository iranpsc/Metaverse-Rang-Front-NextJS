"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MenuIcon, ArrowMenu } from "@/svgs/index";
import Link from "next/link";
import ThemeMenuModule from "@/components/module/sidebar/ThemeMenuModule";
import { useCookies } from "react-cookie";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { Modals_fa, Modals_en } from "@/components/utils/modals-content";
interface DropdownLanguageModuleProps {
  languagesData: any;
  langArray: any[];
  params: any;
  isClosed: boolean;
  onLanguageChange?: () => void;   // جدید
}
function SideBarHeader({ isClosed, toggleSide, params, langData, langArray }: any) {


  const lang = params.lang;
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // آرایه زبان‌ها با پرچم و کد


  // بستن مودال وقتی کاربر بیرون کلیک کرد
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = langArray.find((l: { code: any; }) => l.code === lang) || langArray[0];



  // ترجمه‌های دستی
  const translations: Record<string, { title: string; subtitle: string }> = {
    fa: { title: "متارنگ", subtitle: "متاورس رنگ" },
    en: { title: "Meta RANG", subtitle: "Metaverse RANG" },
  };
  const t = translations[lang] || translations.fa;

  return (
    <div className="relative w-full !z-[101]">
      {/* آیکون منو */}
    <div className={`${isClosed ? " py-2 w-full" : "hidden  my-0"} `}>
            <MenuIcon
        className={`${isClosed ? "visible  mt-3 " : "hidden  my-0"} stroke-[#2B2B2B] dark:stroke-white cursor-pointer w-full menu-transition `}
        alt="toggle"
        onClick={toggleSide}
      />
    </div>

      {/* لوگو و متن */}
      <Link
        href={`/${params.lang}`}
        className={`${isClosed ? "mt-3" : "flex items-center justify-between"} relative overflow-hidden`}
      >
        <div className={`${isClosed ? "w-full justify-center" : "justify-start"} flex items-center gap-3 my-1 pb-1 menu-transition`}>
          <Image
            src="/logo.png"
            alt="rgb metaverse"
            width={71}
            height={70}
            className={`${isClosed ? "ms-2" : "ms-4"} w-[45px] h-[45px] menu-transition`}
          />
          <div className={`${isClosed ? "w-0 h-0" : "w-[100%] h-[100%] flex flex-col"} overflow-hidden`}>
            <p className="whitespace-nowrap visible leading-[25px] dark:text-white block font-azarMehr font-bold text-[14px] md:text-[16px]  text-black ">
              {t.title}
            </p>
            <p className="whitespace-nowrap leading-[25px] dark:text-dark-gray visible font-azarMehr font-normal text-gray text-[14px] md:text-[16px]  ">
              {t.subtitle}
            </p>
          </div>
        </div>
      </Link>

      <div className={`
    flex items-center absolute top-1 md:top-[1px] xl:top-1 rtl:left-[5px] ltr:right-[5px] mx-2 gap-2
    transition-opacity duration-1000
    ${isClosed ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"}
  `} >
       
        <div ref={langRef} className={`${isClosed ? "hidden" : "block"} relative`}>
          <div
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-[27px] h-[26px] md:w-[23px] md:h-[23px] xl:w-[27px] xl:h-[27px] rounded-full overflow-hidden border border-gray-300 dark:border-dark-gray flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          >
            <Image
              src={currentLang.icon}
              alt={currentLang.native_name}
              width={28}
              height={28}
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          {isLangOpen && (
            <div className="absolute flex flex-col top-full mt-2 ltr:right-0 rtl:left- w-36 bg-white dark:bg-textGray rounded-lg shadow-xl border border-gray-200 dark:border-dark-border p-3 z-[101]">
              {langArray.map((langItem: { code: any; }) => (
                <DropdownLanguageModule
                  key={langItem.code}
                  languagesData={langData}
                  langArray={[langItem]}
                  params={params}
                  isClosed={isClosed}
                // این پراپ اختیاریه، ولی بهتره داشته باشی که بعد از انتخاب بسته بشه
                // اگر خواستی بعداً اضافه کنی
                />))}
            </div>
          )}
        </div>
        <ThemeMenuModule isClosed={isClosed} defaultTheme={theme} params={params} />



        {/* Arrow Menu */}
        <div
          className={`${isClosed ? "invisible opacity-0" : "visible opacity-100 menu-transition"} h-[30px] w-[30px] cursor-pointer rounded-full flex justify-center items-center`}
          onClick={toggleSide}
        >
          <ArrowMenu className={`w-[16px] h-[16px] stroke-gray dark:stroke-white ltr:rotate-180 rtl:rotate-0`} />
        </div>
      </div>

      <hr className={`${isClosed ? "mx-3 mt-3" : "mx-2"} border-[1px] border-[#00000017] dark:border-[#3F3F3F] my-1`} />
    </div>
  );
}

export default SideBarHeader;
