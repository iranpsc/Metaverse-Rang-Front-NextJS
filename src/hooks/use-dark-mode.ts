"use client"
import { useState } from "react";
import { useCookies } from "react-cookie"

const UseDarkMode = (defaultTheme:any) => {
  const [theme, setTheme] = useState(defaultTheme);
  const [_,setCookies] = useCookies(['theme'])
  // 
  const setAndSaveTheme = (theme: any) => {
    setTheme(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    setCookies('theme', theme)
  };
  // 
  const toggoleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, toggoleTheme };
};
export default UseDarkMode;
