import { signIn } from "next-auth/react";
import React from "react";

const Access = () => {
  // Function to handle user login
  const handleLogin = () => {
    // Sign in using Google provider from next-auth
    signIn("google", process.env.NEXTAUTH_URL);
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/4 h-1/4 bg-emerald-200 rounded-xl flex justify-center items-center flex-col">
        <h1>Login to access this page</h1>
        {/* Login button */}
        <button
          onClick={handleLogin} // Call handleLogin function on button click
          className="px-4 py-1 bg-emerald-500 rounded-md text-white font-medium shadow hover:bg-emerald-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Access;
