"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowMenu } from "@/svgs/index";
import { useCookies } from "react-cookie";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginMenuModule({ isClosed, tabsMenu, params }: any) {
  const [dropDown, setDropDown] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [isMounted, setIsMounted] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState({
    token: "",
    code: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // HINT Set isMounted to true after the component mounts (window object is not available in server-side, React Rehydration Issues)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      let params = searchParams.toString();
      if (params) {
        const expires_at = Number(parsAuthCookieByName("expires_at", params));

        const now = new Date();
        // Add "expires_at" hour ("expires_at" minutes * 60 seconds * 1000 milliseconds) to the current time
        const realExpireTime = now.getTime() + expires_at * 60 * 1000;
        params += `&realExpireTime=${realExpireTime}`;
        setCookie("auth", params);
      }

      //remove auth data in URL and push to new
      const urlToUse = `${window.location.origin}${pathname.toString()}`;
      router.push(urlToUse);
    }
  }, [isMounted]);

  // parse value in auth cookie to use
  function parsAuthCookieByName(
    _propName: string,
    _paramsString: string = cookies.auth
  ) {
    // Parse the auth string
    const params = new URLSearchParams(_paramsString);
    return params.get(_propName);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const realExpireTime = Number(parsAuthCookieByName("realExpireTime"));

      // check to logout by realExpireTime(expires_at)
      if (realExpireTime && realExpireTime !== 0) {
        if (new Date().getTime() >= realExpireTime) {
          handleLogout();
        }
      }
      // if no token, no user data fetch
      const token = parsAuthCookieByName("token");
      if (!token) {
        return;
      }

      try {
        const response = await axios.post(
          "https://api.rgb.irpsc.com/api/auth/me",
          null, // No body data needed
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoggedInUserData(response.data.data);
      } catch (err) {}
    };
    if (isMounted) {
      fetchUserData(); // Fetch user data when the component is mounted
    }
  }, [isMounted, cookies.auth]);

  const handleLogin = async () => {
    let temp = pathname.split("/");
    let last = temp[temp.length - 1];
    let referral;
    if (last.startsWith("hm-") || last.startsWith("HM-")) {
      referral = last;
    }

    const urlToUse = `${window.location.origin}${pathname.toString()}`;
    const res = await axios.get(
      `https://api.rgb.irpsc.com/api/auth/redirect?redirect_to=${urlToUse}&referral=${referral}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res) {
      const redirectUrl = res.data.url;
      window.location.href = redirectUrl;
    } else {
      throw new Error("Failed to fetch redirectUrl, client!");
    }
  };

  const handleLogout = async () => {
    const res = await axios.post(
      "https://api.rgb.irpsc.com/api/auth/logout",
      null,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUserData?.token}`,
        },
      }
    );

    if (res.status === 204) {
      removeCookie("auth");
    }
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  function localFind(_name: any) {
    return tabsMenu.map((x: any) => {
      if (x.name === _name) {
        return x.translation;
      } else {
        return undefined;
      }
    });
  }

  // Don't render the component that depends on client-side operations until the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {cookies.auth ? (
        <div className="base-transition-1 text-white dark:text-black">
          <ul
            className={`${dropDown ? "max-h-[160px]" : "max-h-0"} ${
              isClosed
                ? "min-w-[250px] rtl:rounded-l-[15px] ltr:rounded-r-[15px]"
                : ""
            } base-transition-1 overflow-hidden bg-blueLink dark:bg-dark-primary rounded-t-[15px] px-4`}
          >
            {/* decide to show according to pathname (if user is in own citizen page)*/}
            {pathname != `/${params.lang}/citizen/${loggedInUserData?.code}` ? (
              <li className="border-b border-white dark:border-divider">
                <Link
                  href={`/${params.lang}/citizen/${loggedInUserData?.code}`}
                >
                  <p className="h-[30px] w-full block font-medium">
                    {localFind("citizen profile page") && params.lang == "fa"
                      ? "صفحه مشخصات شهروند"
                      : "Citizen profile page"}
                  </p>
                </Link>
              </li>
            ) : (
              <li className="border-b border-white dark:border-divider">
                <Link href={`/${params.lang}`}>
                  <p className="h-[30px] w-full block font-medium">
                    {localFind("home")}
                  </p>
                </Link>
              </li>
            )}
            <li className="border-b border-white dark:border-divider">
              <Link
                href="https://rgb.irpsc.com/metaverse/"
                className="h-[30px] w-full block font-medium"
              >
                {localFind("enter the metaverse") && params.lang == "fa"
                  ? "ورود به متاورس"
                  : "Enter the Metaverse"}
              </Link>
            </li>
            <li className="border-b border-white dark:border-divider">
              <span
                onClick={handleLogout}
                className="cursor-pointer h-[30px] w-full block font-medium"
              >
                {localFind("exit") && params.lang == "fa" ? "خروج" : "Exit"}
              </span>
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
            {isClosed ? "" : loggedInUserData?.code}
            <ArrowMenu
              className={`${
                dropDown ? "rotate-[90deg]" : "rotate-[270deg]"
              } w-[7px] h-[13px] stroke-white dark:stroke-black font-azarMehr`}
            />
          </button>
        </div>
      ) : (
        <button
          className={`${
            isClosed ? "justify-center" : "justify-center"
          } w-full bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
          h-[40px] flex flex-row xs:px-2 px-4 gap-5 items-center
          text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
          onClick={handleLogin}
        >
          {localFind("login") == ""
            ? ""
            : params.lang == "fa"
            ? "ورود"
            : "Login"}
        </button>
      )}
    </>
  );
}
