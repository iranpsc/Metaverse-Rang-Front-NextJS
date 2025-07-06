// "use client";
// import { useContext } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { LanguageDataItem } from "@/types/listMenu";
import { Tick } from "@/components/svgs";

const DropdownLanguageModule = ({ langArray, params, isClosed }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const { state, toggleCollapseHandler } = useContext(SideBarContext);

  const handleDirChange = (item: any) => {
    // Split the current path into segments
    const segments = pathname.split("/");

    // Update the [lang] segment (assumes it's the first segment)
    segments[1] = item.code;

    // Reconstruct the path
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <>
      <div className="dropdown relative cursor-pointer ">
        <ul className=" dropdown-menu text-center flex flex-col justify-start items-center text-gray pt-2">
          {langArray &&
            langArray.map((item: LanguageDataItem) => (
              <li
                key={item.id}
                className={` border-none w-full py-[12px] ${
                  params.lang === item.name
                    ? "text-[#0066FF] dark:text-dark-yellow"
                    : ""
                } ${
                  // state.isCollapsed ? "hidden" : "flex"
                  false ? "hidden" : "flex"
                } flex flex-col items-center justify-start    cursor-pointer hover:text-[#0066FF]`}
                onClick={() => handleDirChange(item)}
              >
                {/* <div className="w-10">{params.lang === item.name && <></>}</div> */}
                <div
                  className={`${
                    isClosed ? "justify-center" : "justify-start ms-[20%]"
                  } flex flex-row items-center w-full`}
                >
                  <Image
                    src={item.icon}
                    alt="lang"
                    width={100}
                    height={100}
                    className={"w-6 h-6 3xl:w-7 3xl:h-7"}
                  />
                  {/* {languageSelected.name === item.name && (
                  <Tick className=" size-6 stroke-blueLink dark:stroke-dark-yellow" />
                )} */}

                  <p
                    className={`${isClosed ? "max-w-0" : "max-w-max ps-3"} 
                      ${
                        params.lang === item.name
                          ? "text-blueLink dark:text-dark-yellow"
                          : "text-gray dark:text-dark-gray"
                      }  font-normal hover:text-[#0000ffd9] dark:hover:text-dark-yellow font-azarMehr text-start w-full 3xl:text-[20px] menu-transition overflow-hidden`}
                  >
                    {item.native_name}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownLanguageModule;
