import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    fetch("/api/auth/checkuser")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data, " is the data from login");
        if (data == null) {
          router.push("/setting");
        } else {
          Object.keys(data).forEach((key) => {
            Cookies.set(key, data[key], 30);
          });
        }
      })
      .catch((error) => {
        console.error("Error while fetching user data from Login :", error);
      });
  }, [status]);
  return (
    <div className="flex items-center text-lg">
      {session ? (
        <>
          <button
            onClick={() => {
              signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
              const cookies = Cookies.get();
              for (const cookie in cookies) {
                Cookies.remove(cookie);
              }
            }}
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
          onClick={() => {
            signIn("google", process.env.NEXTAUTH_URL);
            // status !== "authenticated"
            //   ? console.log("Checking the status!")
            //   : Cookies.get("_id") !== undefined
            //   ? console.log("All Good!")
            //   : router.push("/setting");
            // console.log("At least I am working");
          }}
          className="px-4 py-1 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Login;
