import Image from "next/image";
import { useTheme } from "next-themes";
import { CLoseIcon, MenuIcon } from "./../../svgs/index";

export default function HeaderMenuModule({ isCollapsed, toggleCollapseHandler }: any) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className=" flex justify-between mt-2 flex-row items-center p-2 pb-4">
        {!isCollapsed ? (
          <CLoseIcon
            className="fill-[#2B2B2B] dark:fill-gray ms-5  cursor-pointer w-[27px]"
            onClick={toggleCollapseHandler}
          />
        ) : (
          <MenuIcon
            className="stroke-[#2B2B2B] dark:stroke-gray cursor-pointer w-full"
            onClick={toggleCollapseHandler}
          />
        )}
        <Image
          src={theme === "dark" ? "/light.png" : "/moon.png"}
          alt=""
          width={20}
          height={20}
          className={`${
            isCollapsed ? "hidden" : "visible cursor-pointer mx-4"
          }`}
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        />
      </div>
    </>
  );
}
