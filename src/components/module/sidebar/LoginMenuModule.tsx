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
  return (
    <>
      {/* login */}
      <button
        className={`${isLogin ? "block" : "hidden"}
          w-[80%] bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
          h-[40px] flex flex-row xs:px-2 justify-around gap-5 items-center
          text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
        onClick={handleLogin}
      >
        login
      </button>
      {/* logout */}
      <div>
        <button
          className={`${isLogin ? "block" : "hidden"}
            w-[80%] bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[15px]
            h-[40px] flex flex-row xs:px-2 justify-around gap-5 items-center
            text-white dark:text-dark-background font-azarMehr font-medium text-center text-[15px] m-auto`}
          onClick={handleLogin}
        >
          login
        </button>
      </div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Options
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Edit
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Duplicate
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              Archive
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
            >
              Move
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-4"
            >
              Share
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
            >
              Add to favorites
            </a>
          </div>
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-6"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
