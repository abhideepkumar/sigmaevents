import { signIn } from "next-auth/react";
import React from "react";
const Access = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="w-1/4 h-1/4 bg-emerald-200 rounded-xl flex justify-center items-center flex-col">
          <h1>Login to access this page</h1>
          <button
          onClick={() => {
            signIn("google", process.env.NEXTAUTH_URL);
          }}
          className="px-4 py-1 bg-emerald-500 rounded-md text-white font-medium shadow hover:bg-emerald-600"
        >
          Login
        </button>
        </div>
      </div>
    </>
  );
};

export default Access;
