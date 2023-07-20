import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email}
        <button
          onClick={() =>
            signOut("google", { callbackUrl: "http://localhost:3000" })
          }
          className="px-3 mx-2 bg-blue-500 rounded-md"
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={ () =>  signIn("google", { callbackUrl: "http://localhost:3000" })}
      >
        Login
      </button>
    </>
  );
};

export default Login;
