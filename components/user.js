import React from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

const User = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {Cookies.get("name") || "Can't Fetch"}
        </h2>
        <p>Email: {Cookies.get("email") || "Can't Fetch"}</p>
        <p>USN: {Cookies.get("USN") || "Can't Fetch"}</p>
        <p>Phone No: {Cookies.get("phoneNo") || "Can't Fetch"}</p>
        <p>Branch: {Cookies.get("branch") || "Can't Fetch"}</p>
        <p>College: {Cookies.get("college") || "Can't Fetch"}</p>
        <p>Passout Year: {Cookies.get("LastYear") || "Can't Fetch"}</p>
      </div>
      <button
        onClick={() => {
          signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
          const cookies = Cookies.get();
          for (const cookie in cookies) {
            Cookies.remove(cookie);
          }
        }}
        className="mt-4 px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
      >
        Sign out
      </button>
    </div>
  );
};

export default User;
