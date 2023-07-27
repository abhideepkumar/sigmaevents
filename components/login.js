import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Login = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center text-lg">
      {session ? (
        <>
          <button
            onClick={() => signOut("google", { callbackUrl: "http://localhost:3000" })}
            className="px-4 py-2 bg-red-500 rounded-md text-white font-medium shadow hover:bg-red-600"
          >
            Sign out
          </button>
          <Link
            href="/setting"
            className="px-4 py-2 ml-4 bg-yellow-500 rounded-md text-white font-medium shadow hover:bg-yellow-600"
          >
            Settings
          </Link>
        </>
      ) : (
        <button
          onClick={() => signIn("google", "http://localhost:3000")}
          className="px-4 py-1 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Login;
