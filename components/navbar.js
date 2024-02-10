import React, { useState } from "react";
import Link from "next/link";
import Login from "./login";
import Image from "next/image";
import Darkmode from "./darkmode";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
    <div className="navbar">
      <div className="lg:hidden flex justify-between items-center p-6 theme bg-amber-400 dark:bg-slate-800">
      <Link href="/" className="md:text-3xl font-bold  text-center dark:text-white">Sigma<span className="text-green-300 font-mono md:text-4xl">Events</span> </Link>
        <div className="flex gap-6 items-center">
          <Login />
          <Image
            src={menuOpen ? "/icon-close.svg" : "/icon-hamburger.svg"}
            width={0}
            height={0}
            alt="menu"
            className="w-6 z-50 dark:bg-gray-500 rounded-sm"
            onClick={toggleMenu}
          />
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-0 right-0 w-full h-full z-40 bg-white dark:bg-gray-500 dark:text-white menu`}
          >
            <div className="flex flex-col items-center gap-12 mt-32">
              <Link href="/" className="font-extrabold text-sm" onClick={closeMenu}>
                HOME
              </Link>
              <Link
                href="/about"
                className="font-extrabold text-sm"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link href="/events" className="font-extrabold text-sm" onClick={closeMenu}>
                EVENTS
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
        <Darkmode/>
      <div className="hidden lg:flex p-8 px-12 items-center justify-between theme dark:bg-slate-800">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold  text-center dark:text-white">Sigma<span className="text-green-300 font-mono text-4xl">Events</span> </Link>
        {/* Navigation Links */}
        <div className="flex items-center gap-16">
          <Link
            href="/"
            className="font-extrabold  dark:text-white text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            HOME
          </Link>
          <Link
            href="/events"
            className="font-extrabold  dark:text-white text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            EVENTS
          </Link>
          <Link
            href="/about"
            className="font-extrabold  dark:text-white text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            ABOUT
          </Link>
          <Login />
        </div>
      </div>
    </>
  );
};

export default Navbar;
