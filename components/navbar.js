import React from "react";
import Link from "next/link";
import Login from "./login";
import Image from "next/image";

const Navbar = () => {
  return (
    <ul className="flex text-lg rounded-md p-2 items-center theme">
      <div className="flex justify-start w-full items-center">
        <Image href="/" src="/logo.svg" width={250} height={250} alt="logo" className="mix-blend-multiply" />
      </div>
      <div className="flex flex-row items-center justify-end w-full">
        <li>
          <Link href="/" className="px-3  mx-2 rounded-md py-2 hover:underline hover:decoration-emerald-400">
            Home
          </Link>
        </li>
        <li>
          <Link href="/events" className="px-3  mx-2 rounded-md py-2 hover:underline hover:decoration-emerald-400">
            Events
          </Link>
        </li>
        <li>
          <div className="mx-2 rounded-md hover:underline hover:decoration-emerald-400">
            <Login />
          </div>
        </li>
      </div>
    </ul>
  );
};

export default Navbar;
