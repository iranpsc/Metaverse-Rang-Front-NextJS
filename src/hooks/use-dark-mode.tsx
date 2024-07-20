import { useState } from "react";

const UseDarkMode = (defaultTheme = "dark") => {
  const [theme, setTheme] = useState(defaultTheme);
  const setAndSaveTheme = (themes: any) => {
    setTheme(themes);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themes);
  };
  const toggoleTheme = () => {
    setAndSaveTheme(theme === "dark" ? "light" : "dark");
  };
  return { theme, toggoleTheme };
};
export default UseDarkMode;
