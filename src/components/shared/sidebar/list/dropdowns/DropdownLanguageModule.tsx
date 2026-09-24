"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { LanguageDataItem } from "@/types/listMenu";



const ADMIN_FLAG_BASE =
  "https://dev-admin.metarang.com/assets/images/flags/";

const getFlagSrc = (icon: string, lang: string) => {
  if (!icon) return icon;

  if (icon.startsWith(ADMIN_FLAG_BASE)) {
    const filename = icon.slice(ADMIN_FLAG_BASE.length);

    return `/${lang}/api/flag/${encodeURIComponent(filename)}`;
  }

  return icon;
};

const DropdownLanguageModule = ({
  langArray,
  params,
  isClosed,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleDirChange = (item: any) => {
    const safePathname = pathname || "/";
    const segments = safePathname.split("/");

    segments[1] = item.code;

    const newPath = segments.join("/");

    router.push(newPath);
  };

  return (
    <div className="dropdown relative cursor-pointer">
      <ul className="dropdown-menu text-center flex flex-col justify-start items-center text-matn-2 pt-2">
        {langArray &&
          langArray.map((item: LanguageDataItem) => (
            <li
              key={item.id}
              className={`border-none w-full ${
                params.lang === item.code ? "text-primary" : ""
              } flex flex-col items-center justify-start cursor-pointer hover:text-primary`}
              onClick={() => handleDirChange(item)}
            >
              <div
                className={`${
                  isClosed
                    ? "justify-center"
                    : "justify-start ms-[20%]"
                } flex flex-row items-center w-full`}
              >
                <Image
                   src={getFlagSrc(item.icon, params.lang)}
                  alt="lang"
                  width={28}
                  height={28}
                  className="w-6 h-6 3xl:w-7 3xl:h-7"
                />

                <p
                  className={`${
                    isClosed
                      ? "max-w-0"
                      : "max-w-max ps-3"
                  } ${
                    params.lang === item.code
                      ? "text-primary"
                      : "text-matn-2"
                  } font-normal hover:text-[#0000ffd9] dark:hover:text-primary font-azarMehr text-start w-full 3xl:text-[20px] menu-transition overflow-hidden`}
                >
                  {item.native_name}
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DropdownLanguageModule;