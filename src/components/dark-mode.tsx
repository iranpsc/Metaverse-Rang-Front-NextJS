"use client";
import { Dark, Light } from "@/svgs/index";
import { useState } from "react";
import useDarkMode from "./../hooks/use-dark-mode";

export default function DarkMode() {
  const { theme, toggoleTheme } = useDarkMode();

  return (
    <>
      {theme === "dark" ? (
        <Dark
          onClick={toggoleTheme}
          className={` ${
            theme === "dark" ? "stroke-white" : "stroke-gray"
          }  stroke-[2px] `}
        />
      ) : (
        <Light
          onClick={toggoleTheme}
          className={` ${
            theme === "dark"
              ? "stroke-gray fill-gray"
              : "stroke-black fill-black"
          }`}
        />
      )}
    </>
  );
}
