import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div className=" flex justify-center items-center bg-gray-100">
      <div className="container mx-auto p-4">
        {session ? (
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-2">
              Welcome back, <span className="text-blue-500">{session.user.name}</span>!
            </h1>
            <p className="text-gray-600 mb-4">
              You are signed in with <span className="text-yellow-500">{session.user.email}</span>
            </p>
            <button
              onClick={() => signOut("google", { callbackUrl: process.env.NEXTAUTH_URL })}
              className="px-4 py-2 bg-red-500 rounded-md text-white font-medium shadow hover:bg-red-600 focus:outline-none"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Join the Community</h1>
            <p className="text-gray-600 mb-4">Sign in with your Google account to access all features.</p>
            <button
              onClick={() => signIn("google", process.env.NEXTAUTH_URL)}
              className="px-4 py-2 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600 focus:outline-none"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
