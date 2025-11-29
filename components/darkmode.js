import Image from "next/image";
import React, { useEffect, useState } from "react";

const Darkmode = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!theme) return null;

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Image src="/sun.svg" alt="Switch to light mode" width={24} height={24} />
      ) : (
        <Image src="/moon.svg" alt="Switch to dark mode" width={24} height={24} />
      )}
    </button>
  );
};

export default Darkmode;