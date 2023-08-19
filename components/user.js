import React from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

const User = () => {
  const name = Cookies.get("name") || "Can't Fetch";
  const email = Cookies.get("email") || "Can't Fetch";
  const usn = Cookies.get("USN") || "Can't Fetch";
  const phoneNo = Cookies.get("phoneNo") || "Can't Fetch";
  const branch = Cookies.get("branch") || "Can't Fetch";
  const college = Cookies.get("college") || "Can't Fetch";
  const passoutYear = Cookies.get("LastYear") || "Can't Fetch";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {name}</h2>
        <div className="mb-4">
          <p className="font-semibold">Email</p>
          <p className="text-gray-600">{email}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">USN</p>
          <p className="text-gray-600">{usn}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Phone No</p>
          <p className="text-gray-600">{phoneNo}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Branch</p>
          <p className="text-gray-600">{branch}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">College</p>
          <p className="text-gray-600">{college}</p>
        </div>
        <div className="mb-6">
          <p className="font-semibold">Passout Year</p>
          <p className="text-gray-600">{passoutYear}</p>
        </div>
        <button
          onClick={() => {
            signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
            const cookies = Cookies.get();
            for (const cookie in cookies) {
              Cookies.remove(cookie);
            }
          }}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:shadow-xl hover:bg-red-600"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default User;
