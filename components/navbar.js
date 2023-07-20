import React from "react";
import Link from "next/link";
import Login from "./login";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-end text-lg nav-font text-right rounded-md p-2">
        <Link href="/" className="px-3 bg-yellow-100 mx-2 rounded-md py-2">
          Dashboard
        </Link>
        <Link href="/events" className="px-3 bg-red-100 mx-2 rounded-md py-2">
          Events
        </Link>
        <div className="px-3 bg-blue-100 mx-2 rounded-md py-2">
          <Login />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
