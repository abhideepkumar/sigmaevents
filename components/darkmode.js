import Image from "next/image";
import React, { useEffect, useState } from "react";

const Darkmode = () => {
  const [theme, settheme] = useState("");
  useEffect(() => {
    const storetheme = window.localStorage.getItem("theme");
    if (storetheme) {
      settheme(storetheme);
      if (storetheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else {
      const is_system_theme_dark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (is_system_theme_dark) {
        document.documentElement.classList.add("dark");
        settheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        settheme("light");
      }
    }
  }, []);

  const handletoggle = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      settheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      settheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={handletoggle}
      className=" fixed    bottom-10 right-5 md:bottom-20 md:right-5 lg:bottom-[3.7rem] w-[2.5rem]  bot bg-white h-[2.5rem] bg-opacity-80  rounded-md flex items-center justify-center
   border  border-black border-opacity-40 shadow-2xl
    hover:scale-[1.15] active:scale-105
 transition-all dark:bg-gray-950 dark:border-white/5"
    >
      {theme === "dark" ? (
        <Image src="/moon.svg" alt="" width={25} height={25} />
      ) : (
        <Image src="/sun.svg" alt="" height={25} width={25} />
      )}
    </button>
  );
};

export default Darkmode;