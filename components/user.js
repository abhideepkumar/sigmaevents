import React from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

const User = () => {
  // Fetch user details from cookies or display default values
  const name = Cookies.get("name") || "Can't Fetch";
  const email = Cookies.get("email") || "Can't Fetch";
  const usn = Cookies.get("USN") || "Can't Fetch";
  const phoneNo = Cookies.get("phoneNo") || "Can't Fetch";
  const branch = Cookies.get("branch") || "Can't Fetch";
  const college = Cookies.get("college") || "Can't Fetch";
  const passoutYear = Cookies.get("LastYear") || "Can't Fetch";

  return (
    <div className="max-h-screen bg-gray-100 flex items-center justify-center dark:bg-slate-800">
      <div className="bg-white dark:bg-gray-600 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Welcome, {name}</h2>
        {/* Display user information */}
        <div className="mb-4">
          <p className="font-semibold dark:text-white ">Email</p>
          <p className="text-gray-600  dark:text-gray-200">{email}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold dark:text-white">USN</p>
          <p className="text-gray-600  dark:text-gray-200">{usn}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold dark:text-white">Phone No</p>
          <p className="text-gray-600  dark:text-gray-200">{phoneNo}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold dark:text-white">Branch</p>
          <p className="text-gray-600  dark:text-gray-200">{branch}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold dark:text-white">College</p>
          <p className="text-gray-600  dark:text-gray-200">{college}</p>
        </div>
        <div className="mb-6">
          <p className="font-semibold dark:text-white">Passout Year</p>
          <p className="text-gray-600  dark:text-gray-200">{passoutYear}</p>
        </div>
        {/* Button to sign out user */}
        <button
          onClick={() => {
            // Sign out user and remove all cookies
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
