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
          <Link href="/setting" className="px-4">
            Settings
          </Link>
        </>
      ) : (
        <button
          onClick={() => {
            signIn("google", process.env.NEXTAUTH_URL);
          }}
          className="px-4 py-1 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
