"use client";

import axios from "axios";
import { useState } from "react";

export default function LoginMenu() {
  const [isLogin, setIsLogin] = useState(true);
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
  const handleDropDown = {};
  return (
    <>
      {/* login */}
      {!isLogin ? (
        <button
          className={`w-full bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
          h-[40px] flex flex-row xs:px-2 justify-around gap-5 items-center
          text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
          onClick={handleLogin}
        >
          login
        </button>
      ) : (
        // logout
        <div className="dropdown">
          <ul className="list">
            <li>صفحه مشخصات شهروندی</li>
            <li>صفحه نخست</li>
            <li>خروج</li>
          </ul>
          <button
            className={`w-full bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
                      h-[40px] flex flex-row xs:px-2 justify-around gap-5 items-center
                      text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
            onClick={handleDropDown}
          >
            HM-2000001
          </button>
        </div>
      )}
    </>
  );
}
