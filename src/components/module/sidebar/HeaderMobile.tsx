"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CLoseIcon, MenuIcon } from "@/components/svgs";
import ThemeMenuModule from "@/components/module/sidebar/ThemeMenuModule";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";
import { useCookies } from "react-cookie";

interface ProfileHeaderMobileProps {
  isClosed: boolean;
  toggleSide: () => void;
  params: { lang: string };
  langData: any;
  langArray?: { code: string; icon: string; native_name: string }[];
}

export default function ProfileHeaderMobile({
  isClosed,
  toggleSide,
  params,
  langData,
  langArray = [],
}: ProfileHeaderMobileProps) {
  const lang = params.lang;
  const [cookies] = useCookies(["theme"]);
  const theme = cookies.theme || "dark";

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // بستن منوی زبان وقتی کاربر بیرون کلیک کند
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // پیدا کردن زبان فعلی با fallback امن
  const currentLang =
    langArray.find((l) => l.code === lang) ||
    langArray[0] || // اگر آرایه خالی نیست، اولین مورد
    { icon: "/default-flag.png", native_name: lang }; // fallback

  // ترجمه‌ها
  const translations: Record<string, { title: string; subtitle: string }> = {
    fa: { title: "متارنگ", subtitle: "متاورس رنگ" },
    en: { title: "Meta RANG", subtitle: "Metaverse RANG" },
  };
  const t = translations[lang] || translations.fa;

  return (
    <div className="xs:fixed px-5 sm:fixed top-0 dark:bg-dark-background shadow-md xl:hidden lg:hidden md:flex sm:flex xs:flex z-[51] w-full sm:h-[60px] xs:h-[60px] bg-white flex-rows justify-between items-center">
      <div className="flex items-center gap-5">
        <div className="mt-2">
          {!isClosed ? (
            <CLoseIcon
              className="fill-[#2B2B2B] dark:fill-dark-gray cursor-pointer sm:w-[25px] xs:w-[25px] md:w-[40px]"
              onClick={toggleSide}
              alt="closeIcon"
            />
          ) : (
            <MenuIcon
              className="stroke-[#2B2B2B] dark:stroke-white cursor-pointer sm:w-[35px] sm:h-[20px] xs:w-[35px] xs:h-[20px] md:w-[50px] md:h-[30px]"
              onClick={toggleSide}
              alt="menuIcon"
            />
          )}

        </div>
        <div className="flex items-center gap-5 ">
          {/* منوی زبان */}
          <div ref={langRef} className="relative">
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
              <div className="absolute flex flex-col top-full mt-2   w-36 bg-white dark:bg-textGray rounded-lg shadow-xl border border-gray-200 dark:border-dark-border p-3 z-[101]">
                {langArray.map((langItem) => (
                  <DropdownLanguageModule
                    key={langItem.code}
                    languagesData={langData}
                    langArray={[langItem]}
                    params={params}

                  />
                ))}
              </div>
            )}
          </div>

          {/* منوی مود */}
          <ThemeMenuModule defaultTheme={theme} params={params} />
        </div>
      </div>

      <Link href={`/${params.lang}`} className="flex flex-rows justify-center items-center">
        <div className="ml-1 flex flex-col justify-center items-center py-2">
          <p className="dark:text-white block font-azarMehr font-bold mb-[-3px] text-black sm:text-center">
            {t.title}
          </p>
          <p className="dark:text-dark-gray text-[12px] font-normal text-[#5A5858]">
            {t.subtitle}
          </p>
        </div>
        <Image
          src="/logo.png"
          width={71}
          height={70}
          className="xs:w-[40px] xs:h-[40px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] mx-1"
          alt="rgb metaverse"
        />
      </Link>


    </div>
  );
}
