"use client";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const UseDarkMode = (defaultTheme: any) => {
  const [cookies, setCookies] = useCookies(["theme"]);
  const [theme, setTheme] = useState(cookies.theme || defaultTheme);

  // Apply theme to <html> when it changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Function to set and save theme
  const setAndSaveTheme = (newTheme: any) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    setCookies("theme", newTheme, { path: "/" }); // ✅ Update cookie instantly

    // Ensure state is updated after cookie change
    setTimeout(() => {
      setTheme(newTheme);
    }, 0);
  };

  // Toggle theme
  const toggoleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setAndSaveTheme(newTheme);
  };

  return { theme, toggoleTheme };
};

export default UseDarkMode;





// "use client"
// import { useState } from "react";
// import { useCookies } from "react-cookie"

// const UseDarkMode = (defaultTheme:any) => {
//   const [theme, setTheme] = useState(defaultTheme);
//   const [_,setCookies] = useCookies(['theme'])
//   // 
//   const setAndSaveTheme = (theme: any) => {
//     setTheme(theme);
//     document.documentElement.classList.remove("light", "dark");
//     document.documentElement.classList.add(theme);
//     setCookies('theme', theme)
//   };
//   // 
//   const toggoleTheme = () => {
//     setAndSaveTheme(theme === "dark" ? "light" : "dark");
//   };
//   return { theme, toggoleTheme };
// };
// export default UseDarkMode;
