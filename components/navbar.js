import React from "react";
import Link from "next/link";
import Login from "./login";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-end text-lg rounded-md p-2 items-center">
        <li>
          <Link href="/" className="px-3 bg-yellow-100 mx-2 rounded-md py-2 hover:bg-yellow-200">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/events" className="px-3 bg-red-100 mx-2 rounded-md py-2 hover:bg-red-200">
            Events
          </Link>
        </li>
        <li>
          <div className="mx-2 rounded-md ">
            <Login />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
