// import { useContext } from "react";
import Image from "next/image";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { LanguageDataItem } from "@/types/listMenu";
import { Tick } from "@/components/svgs";

const DropdownLanguageModule = ({
  languagesData,
  languageSelected,
  handleDirChange,
}: any) => {
  // const { state, toggleCollapseHandler } = useContext(SideBarContext);

  return (
    <>
      <div className="dropdown relative cursor-pointer ">
        <ul className=" dropdown-menu w-[50%] text-center ps-7 flex flex-col justify-start gap-4 items-center text-gray pt-2">
          {languagesData.map((item: LanguageDataItem) => (
            <li
              key={item.id}
              className={` border-none  w-full   ${
                languageSelected.name === item.name
                  ? "text-[#0066FF] dark:text-dark-yellow"
                  : ""
              } ${
                // state.isCollapsed ? "hidden" : "flex"
                false ? "hidden" : "flex"
              } flex flex-col items-center justify-start    cursor-pointer hover:text-[#0066FF]`}
              onClick={() => handleDirChange(item)}
            >
              <div className=" w-10">
                {languageSelected.name === item.name && <></>}
              </div>
              <div className="flex flex-row gap-2 justify-start  items-center w-full ms-16">
                <Image
                  src={item.icon}
                  alt=""
                  width={100}
                  height={100}
                  className={"w-6 h-6  3xl:w-7 3xl:h-7"}
                />
                {/* {languageSelected.name === item.name && (
                  <Tick className=" size-6 stroke-blueLink dark:stroke-dark-yellow" />
                )} */}

                <p
                  className={`font-azarMehr text-start w-full 3xl:text-[20px] ${
                    languageSelected.name === item.name
                      ? "text-blueLink dark:text-dark-yellow"
                      : "text-gray dark:text-dark-gray"
                  }  font-normal hover:text-[#0000ffd9] dark:hover:text-dark-yellow`}
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
