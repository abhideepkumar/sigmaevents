import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Fetch user data and set cookies if the user is logged in
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/db/findOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          fliter: {email: session.user.email},
          collection:"students",
          database:"profiles"
        })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();

      if (data === null) {
        router.push("/setting");
      } else {
        // Set cookies for user data
        Object.keys(data).forEach((key) => {
          Cookies.set(key, data[key], { expires: 30 });
        });
      }
    } catch (error) {
      console.error("Error while fetching user data from Login:", error);
    }
  };

  return (
    <div className="flex items-center">
      {session ? (
        // Display settings link if the user is logged in
        <Link href="/setting" className="dark:bg-gray-500 rounded-sm md:p-1">
          <Image
            src="/profile.svg"
            width={0}
            height={0}
            alt="settings"
            className="w-6"
            priority
          />
        </Link>
      ) : (
        // Display login button if the user is not logged in
        <button
          onClick={() => {
            signIn("google", { callbackUrl: process.env.NEXTAUTH_URL });
          }}
          className="font-extrabold text-xs lg:text-sm border border-black dark:border-green-300 px-4 py-1 lg:px-8 lg:py-2 hover:bg-black hover:text-white transition-colors duration-200  dark:bg-green-900 text-black dark:text-white dark:hover:bg-slate-700"
        >
          LOGIN
        </button>
      )}
    </div>
  );
};

export default Login;
