import { useContext, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Dark, Light } from "@/svgs/index";
//CONTEXT
import { SideBarContext } from "@/context/SidebarContext";

const ThemeMenuModule = () => {
  const { theme, setTheme } = useTheme();
  const { state } = useContext(SideBarContext);

  const [themeDataActive, setThemeDataActive] = useState<any>("light");

  useEffect(() => {
    setThemeDataActive(theme);
  }, [theme]);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div
      className={`${
        state.isCollapsed ? "w-[70px]" : "w-[90%]"
      } h-[50px]  flex justify-center items-center `}
    >
      {state.isCollapsed ? (
        <>
          <div
            className={` ${
              themeDataActive === "dark" ? "bg-black" : "bg-[#e9eef8]"
            } w-[40px] mx-2 h-[40px] rounded-full  flex justify-center items-center `}
            onClick={changeTheme}
          >
            {themeDataActive === "dark" ? (
              <Dark
                className={` ${
                  themeDataActive === "dark" ? "stroke-white" : "stroke-gray"
                }  stroke-[2px] `}
              />
            ) : (
              <Light
                className={` ${
                  themeDataActive === "dark"
                    ? "stroke-gray fill-gray"
                    : "stroke-black fill-black"
                }`}
              />
            )}
          </div>
        </>
      ) : (
        <div className="bg-[#e9eef8] dark:bg-black w-[90%] rounded-full flex flex-row  justify-center items-center gap-3">
          <div
            className={`
          ${themeDataActive === "dark" ? "#1A1A18" : "bg-[#fcfcfc]"}
          w-[135px] h-[28px] my-1 ms-1 rounded-full flex flex-row  justify-center items-center cursor-pointer `}
            onClick={() => setTheme("light")}
          >
            <Light
              className={` ${
                themeDataActive === "dark"
                  ? "stroke-[#F8F8F8] fill-[#F8F8F8]"
                  : "stroke-black fill-black"
              }`}
            />
            <p
              className={` ${
                themeDataActive === "dark" ? "text-[#F8F8F8]" : "text-black"
              } font-azarMehr font-medium xl:text-[14px] lg:text-[14px] md:text-[14px] xs:text-[12px] sm:text-[12px] mb-1  ms-2 `}
            >
              {state.dataTheme[0]?.name && state.dataTheme[0].translation}
            </p>
          </div>

          <div
            className={`
          ${themeDataActive === "dark" ? "bg-[#1A1A18]" : ""}
          w-[135px] h-[28px] my-1 rounded-full flex flex-row  justify-center items-center gap-3 me-1  cursor-pointer `}
            onClick={() => setTheme("dark")}
          >
            <Dark
              className={` ${
                themeDataActive === "dark" ? "stroke-[#F8F8F8]" : "stroke-gray"
              }  stroke-[2px] `}
            />
            <p
              className={` ${
                themeDataActive === "dark" ? "text-[#F8F8F8]" : "text-black"
              } font-azarMehr xl:text-[14px] lg:text-[14px] md:text-[14px] xs:text-[12px] sm:text-[12px] font-medium  `}
            >
              {state.dataTheme[1]?.name && state.dataTheme[1].translation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeMenuModule;