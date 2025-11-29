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
    <nav className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold dark:text-white text-gray-900">
              SigmaEvents
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex justify-center items-center flex-grow">
            <div className="flex items-baseline space-x-4">
              <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/events" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Events
              </Link>
              <Link href="/about" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/setting" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Settings
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden lg:flex items-center justify-end">
            <div className="flex items-center space-x-3">
              <Darkmode />
              <Login />
            </div>
          </div>

          {/* Mobile menu button and icons */}
          <div className="lg:hidden flex items-center space-x-3">
            <Darkmode />
            <Login />
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Image
                src={menuOpen ? "/icon-close.svg" : "/icon-hamburger.svg"}
                width={24}
                height={24}
                alt="menu"
                className="block h-6 w-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {menuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
              Home
            </Link>
            <Link href="/events" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
              Events
            </Link>
            <Link href="/about" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
              About
            </Link>
            <Link href="/setting" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={closeMenu}>
              Settings
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
