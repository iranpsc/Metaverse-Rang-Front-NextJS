"use client";

import axios from "axios";
import { useState } from "react";
import { ArrowMenu } from "@/svgs/index";

export default function LoginMenuModule({ isClosed, tabsMenu }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const handleLogin = async () => {
    // try {
    const res = await axios.get("https://api.rgb.irpsc.com/api/auth/redirect", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      const redirectUrl = res.data.url;
      window.location.href = redirectUrl;
    } else {
      throw new Error("Failed to fetch redirectUrl, client");
    }
  };
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  function localFind(_name: any) {
    return tabsMenu.map((x: any) => {
      if (x.name == _name) {
        return x.translation;
      }
    });
  }

  return (
    <>
      {/* login */}
      {!isLogin ? (
        <button
          className={`${
            isClosed ? "justify-center" : "justify-between"
          } w-full bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
          h-[40px] flex flex-row xs:px-2 px-4 gap-5 items-center
          text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
          onClick={handleLogin}
        >
          login
        </button>
      ) : (
        // logout
        <div className="base-transition-1 text-white dark:text-black">
          <ul
            className={`${dropDown ? "max-h-[160px]" : "max-h-0"} ${
              isClosed
                ? "min-w-[250px] rtl:rounded-l-[15px] ltr:rounded-r-[15px]"
                : ""
            } base-transition-1 overflow-hidden bg-blueLink dark:bg-dark-primary rounded-t-[15px] px-4`}
          >
            <li className="border-b border-white dark:border-divider">
              <a href="" className="h-[30px] w-full block font-medium">
                {localFind("citizen profile page")}
              </a>
            </li>
            <li className="border-b border-white dark:border-divider">
              <a href="" className="h-[30px] w-full block font-medium">
                {localFind("home")}
              </a>
            </li>
            <li className="border-b border-white dark:border-divider">
              <a href="" className="h-[30px] w-full block font-medium">
                {localFind("exit")}
              </a>
            </li>
          </ul>
          <button
            className={`${isClosed ? "justify-center" : "justify-between"} ${
              dropDown
                ? "rounded-t-[1px] rounded-b-[15px]"
                : "rounded-t-[15px] rounded-b-[15px]"
            } w-full bg-blueLink dark:bg-dark-yellow cursor-pointer
                      h-[40px] flex flex-row-reverse xs:px-2 px-4 gap-5 items-center
                      text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
            onClick={handleDropDown}
          >
            {isClosed ? "" : "HM-2000001"}
            <ArrowMenu
              className={`${
                dropDown ? "rotate-[90deg]" : "rotate-[270deg]"
              } w-[7px] h-[13px] stroke-white dark:stroke-black font-azarMehr`}
            />
          </button>
        </div>
      )}
    </>
  );
}
