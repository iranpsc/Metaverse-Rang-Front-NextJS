import { useEffect, useContext } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
//Types
import { LoginMenu, ArrowMenu } from "@/svgs/index";
import { useToken } from "@/context/TokenContext";
import { SideBarContext } from "@/components/context/SidebarContext";

export default function LoginMenuModule({
  setShowAuthCard,
  setShowLogOut,
}: any) {
  // const { state, showFullModalHandler, showFullModalOutMenuHandler } =
  //   useContext(SideBarContext);
  const { theme } = useTheme();
  const { code, token } = useToken();
  const router = useRouter();

  // const submit = () => {
  //   if (state.isCollapsed) {
  //     // toggleCollapseHandler();
  //     showFullModalOutMenuHandler();
  //   } else {
  //     showFullModalHandler();
  //   }
  // };

  // const checkLogin = () => {
  //   if (code && code.length > 1) {
  //     submit();
  //   } else {
  //     if (token && !code) {
  //       submit();
  //     } else {
  //       setShowAuthCard(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (state.isCollapsed && state.showFullModal) {
  //     showFullModalHandler();
  //   } else {
  //   }
  // }, [state.isCollapsed, code]);

  // const logout = () => {
  //   setShowLogOut(true);
  // };

  return (
    <div className={`w-full h-fit  flex justify-center items-center`}>
      <div
        className={`${
          state.showFullModal && token
            ? "h-[200px] w-[80%]   start-[50px] z-[900]"
            : "h-fit w-[80%]"
        } bg-blueLink dark:bg-dark-yellow rounded-[10px] flex flex-col justify-evenly items-center transition-all duration-300 ease-linear`}
      >
        {state.showFullModal && token && (
          <div className=" flex flex-col gap-2 w-[80%] pt-2">
            {token && !code && (
              <Link href={`https://gmail.com`} target="_blank">
                <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer">
                  فعال سازی حساب کاربری
                </p>
                <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
              </Link>
            )}
            {code && code !== router.query.userId && (
              <Link
                href={`https://rgb.irpsc.com/${router.query.lang}/citizen/${code}`}
                target="_blank"
              >
                <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap">
                  {state.dataLogin[3] &&
                    state.dataLogin.find(
                      (item: any) => item.name === "my profile page"
                    ).translation}
                </p>
                <hr className=" text-white dark:text-[#2D2D2A38] mt-1" />
              </Link>
            )}
            <a href="https://rgb.irpsc.com/">
              <p className="text-white dark:text-black text-[14px] hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap">
                {state.dataLogin[1] &&
                  state.dataLogin.find(
                    (item: any) => item.name === "enter the metaverse"
                  ).translation}
              </p>
            </a>
            <hr className=" text-white dark:text-[#2D2D2A38]" />
            <a href="https://rgb.irpsc.com/metaverse">
              <p className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal  cursor-pointer xs:text-[12px] whitespace-nowrap">
                {state.dataLogin[2] &&
                  state.dataLogin.find((item: any) => item.name === "home page")
                    .translation}
              </p>
            </a>
            <hr className=" text-white dark:text-[#2D2D2A38]" />
            <p
              className="text-white dark:text-black text-[14px]  hover:text-[15px] font-azarMehr font-normal cursor-pointer xs:text-[12px] whitespace-nowrap"
              onClick={logout}
            >
              {state.dataLogin[2] &&
                state.dataLogin.find((item: any) => item.name === "logout")
                  .translation}
            </p>
            <hr className=" text-white dark:text-[#2D2D2A38]" />
          </div>
        )}

        <div
          className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px] w-[95%] h-[40px]  flex flex-row xs:px-2 justify-around gap-5 items-center"
          onClick={checkLogin}
        >
          {code && code.length > 1 ? (
            <>
              <p className="text-white dark:text-dark-background font-azarMehr uppercase font-medium text-center xs:text-[13px] whitespace-nowrap">
                {state.isCollapsed ? "HM" : code}
              </p>
              <ArrowMenu
                className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-[10px] ${
                  state.showFullModal ? "rotate-90" : "-rotate-90"
                } ${state.isCollapsed ? "hidden" : "visibale"}`}
              />
            </>
          ) : (
            <>
              {token && !code ? (
                <>
                  {state.isCollapsed ? (
                    <Image
                      src={
                        theme === "dark"
                          ? "/mail-send-dark.png"
                          : "/mail-send-light.png"
                      }
                      width={1000}
                      height={1000}
                      alt="active-mail"
                      className="w-[35px] h-[35px]"
                    />
                  ) : (
                    <p className="text-white dark:text-dark-background text-[13px] font-azarMehr  font-normal text-start ">
                      حساب خود را فعال کنید
                    </p>
                  )}
                </>
              ) : (
                <>
                  <LoginMenu
                    className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 ${
                      state.isCollapsed ? "hidden" : "visibale"
                    }`}
                  />
                  <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px]">
                    {(state.dataLogin.find(
                      (item: any) => item.name === "login"
                    ) &&
                      state.dataLogin.find((item: any) => item.name === "login")
                        .translation) ||
                      "undefine"}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
