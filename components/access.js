import Link from "next/link";
import React from "react";

const Access = () => {
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="w-1/4 h-1/4 bg-blue-50 rounded-xl flex justify-center items-center flex-col">
          <h1>Login to access this page</h1>
          <Link href="/api/auth/signin">
            <div className="px-3 bg-blue-100 mx-2 rounded-md py-2">Login </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Access;
