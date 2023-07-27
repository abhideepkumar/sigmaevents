import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button
          onClick={() =>
            signOut("google", { callbackUrl: "http://localhost:3000" })
          }
          className="px-1 mx-2 bg-blue-500 rounded-md"
        >
          Sign out
        </button>
        <a
          href="http://localhost:3000/setting"
          className="px-2 mx-2 bg-yellow-300 rounded-md"
        >
          Settings
        </a>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => {
          signIn("google", "http://localhost:3000");
        }}
      >
        Login
      </button>
    </>
  );
};

export default Login;
