import React, { useState } from "react";
import Link from "next/link";
import Login from "./login";
import Image from "next/image";

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
      <div className="lg:hidden flex justify-between items-center p-6 theme">
        <Image
          href="/"
          src="/logo.svg"
          width={125}
          height={125}
          alt="logo"
          className="mix-blend-multiply"
        />
        <div className="flex gap-6 items-center">
          <Login />
          <Image
            src={menuOpen ? "/icon-close.svg" : "/icon-hamburger.svg"}
            width={0}
            height={0}
            alt="menu"
            className="mix-blend-multiply w-6 z-50 menu-icon"
            onClick={toggleMenu}
          />
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-0 right-0 w-full h-full z-40 bg-white menu`}
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
      <div className="hidden lg:flex p-8 px-12 items-center justify-between theme">
        {/* Logo */}
        <Image
          href="/"
          src="/logo.svg"
          width={175}
          height={175}
          alt="logo"
          className="mix-blend-multiply"
        />
        {/* Navigation Links */}
        <div className="flex items-center gap-16">
          <Link
            href="/"
            className="font-extrabold text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            HOME
          </Link>
          <Link
            href="/about"
            className="font-extrabold text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            ABOUT
          </Link>
          <Link
            href="/events"
            className="font-extrabold text-sm opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            EVENTS
          </Link>
          <Login />
        </div>
      </div>
    </>
  );
};

export default Navbar;
