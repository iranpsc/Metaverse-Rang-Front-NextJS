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
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState({
    token: "",
    code: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Mount flag
  useEffect(() => {
    // console.log("Component mounted ✅");
    setIsMounted(true);
  }, []);

  // Returning from external login (SSO)
  useEffect(() => {
    if (isMounted) {
      let params = searchParams.toString();

      if (params) {
        const expires_at = Number(searchParams.get("expires_at"));
        const now = new Date();
        const realExpireTime = now.getTime() + expires_at * 60 * 1000;
        params += `&realExpireTime=${realExpireTime}`;
        setCookie("auth", params);

        // ✅ پاک کردن localStorage بعد از بازگشت از بک URL
        localStorage.removeItem("referral");
        localStorage.removeItem("isDirectReferral");
      }

      const urlToUse = `${window.location.origin}${pathname.toString()}`;
      router.push(urlToUse);
    }
  }, [isMounted]);

  // parse value in auth cookie
  function parsAuthCookieByName(
    _propName: string,
    _paramsString: string = cookies.auth
  ) {
    const params = new URLSearchParams(_paramsString);
    const val = params.get(_propName);
    // console.log(`Cookie parse [${_propName}]:`, val);
    return val;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const realExpireTime = Number(parsAuthCookieByName("realExpireTime"));

      if (realExpireTime && realExpireTime !== 0) {
        if (new Date().getTime() >= realExpireTime) {
          // console.log("Token expired, logging out...");
          handleLogout();
        }
      }

      const token = parsAuthCookieByName("token");
      if (!token) {
        // console.log("No token found, skipping fetchUserData");
        return;
      }

      try {
        // console.log("Fetching user data with token:", token);
        const response = await axios.post(
          "https://api.metarang.com/api/auth/me",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("User data fetched:", response.data);

        setLoggedInUserData({
          token: response.data.data.token,
          code: response.data.data.code,
        });

        // 🔹 بعد از لاگین موفق، اگه referral ذخیره شده بود بفرستش به API
        const savedReferral = localStorage.getItem("referral");
        if (savedReferral) {
          console.log(
            "%c[REFERRAL AFTER LOGIN]",
            "color:#FF9800;font-weight:bold;",
            savedReferral
          );
          await registerReferral(savedReferral);
          localStorage.removeItem("referral");
        }
      } catch (err) {
        // console.error("Error fetching user data:", err);
      }
    };

    if (isMounted) {
      fetchUserData();
    }
  }, [isMounted, cookies.auth]);

  const handleLogin = async () => {
     if (isLoading) return;

  setIsLoading(true);
    const token = parsAuthCookieByName("token");
    if (token) {
      // console.log("[ALREADY LOGGED IN]");
      return;
    }

    const currentUrl = window.location.href;
    const referralCode = localStorage.getItem("referral");
    const isDirectReferral = localStorage.getItem("isDirectReferral") === "true";

    // console.log("🧭 Login triggered", {
    //   referralCode,
    //   isDirectReferral,
    //   currentUrl,
    // });

    try {
      if (referralCode && isDirectReferral) {
        // ✅ اگر کاربر مستقیم وارد شده بود، ثبت با referral
        // console.log("🎯 [REGISTER WITH REFERRAL]", referralCode);

        const res = await axios.post(
          "https://api.metarang.com/api/auth/register",
          {
            referral: referralCode,
            back_url: currentUrl,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // console.log("✅ [REGISTER RESPONSE]", res.data);

        if (res.data?.url) {
          window.location.href = res.data.url;
        }
      } else {
        // 🚪 ورود معمولی (بدون referral)
        // console.log("🚫 [NORMAL LOGIN MODE]");

        const res = await axios.get(
          `https://api.metarang.com/api/auth/redirect?redirect_to=${encodeURIComponent(
            currentUrl
          )}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // console.log("✅ [LOGIN REDIRECT RESPONSE]", res.data);

        if (res.data?.url) {
          window.location.href = res.data.url;
        }
      }
    } catch (err) {
      // console.error("[LOGIN/REGISTER ERROR]", err);
       setIsLoading(false);
    }
  };



  // 🔹 تابع ارسال referral به API بعد از لاگین
  const registerReferral = async (referralCode: string) => {
    try {
      // console.log("📩 Sending referral to API:", referralCode);
      const res = await axios.post(
        "https://api.metarang.com/api/auth/referral",
        { referral: referralCode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUserData?.token}`,
          },
        }
      );
      // console.log("✅ Referral registered successfully:", res.data);
    } catch (err) {
      // console.error("❌ Error registering referral:", err);
    }
  };

  const handleLogout = async () => {
    // console.log("Logging out...");
    try {
      const res = await axios.post(
        "https://api.metarang.com/api/auth/logout",
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUserData?.token}`,
          },
        }
      );
      console.log("Logout response:", res.data);
    } catch (error) {
      console.error("Logout error:", error);
    }
    removeCookie("auth", { path: "/" });
  };

  const handleDropDown = () => {
    console.log("Dropdown toggled:", !dropDown);
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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {cookies.auth ? (
        <div className="base-transition-1 text-white dark:text-black">
          <ul
            className={`${dropDown ? "max-h-[160px]" : "max-h-0"} ${isClosed
              ? "min-w-[250px] rtl:rounded-l-[15px] ltr:rounded-r-[15px]"
              : ""
              } base-transition-1 overflow-hidden bg-blueLink dark:bg-dark-primary rounded-t-[15px] px-4 list-none`}
          >
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
                href="https://world.metarang.com/"
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
            className={`${isClosed ? "justify-center" : "justify-between"} ${dropDown
              ? "rounded-t-[1px] rounded-b-[15px]"
              : "rounded-t-[15px] rounded-b-[15px]"
              } w-full bg-blueLink dark:bg-dark-yellow cursor-pointer
                            h-[40px] flex flex-row-reverse xs:px-2 px-4 gap-5 items-center
                            text-white dark:text-dark-background font-azarMehr  text-center text-[15px] m-auto uppercase font-bold`}
            onClick={handleDropDown}
          >
            {isClosed ? "" : loggedInUserData?.code}
            <ArrowMenu
              className={`${dropDown ? "rotate-[90deg]" : "rotate-[270deg]"
                } w-[7px] h-[13px] stroke-white dark:stroke-black font-azarMehr`}
            />
          </button>
        </div>
      ) : (
        <button
          disabled={isLoading}
  onClick={handleLogin}
  className={`
    w-full
    rounded-[15px]
    h-[40px]
    flex
    items-center
    justify-center
    px-4
    bg-blueLink
    dark:bg-dark-yellow
    text-white
    dark:text-dark-background
    font-azarMehr
    font-medium
    text-[15px]
    transition-all
    ${
      isLoading
        ? "opacity-60 cursor-not-allowed pointer-events-none"
        : "cursor-pointer"
    }
  `}
        >
          {isLoading ? (
  <svg
    className="h-5 w-5 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      opacity=".2"
    />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
) : (
  params.lang === "fa" ? "ورود" : "Login"
)}
        </button>
      )}
    </>
  );
}