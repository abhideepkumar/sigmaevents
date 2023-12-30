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
    fetchUserData();
  }, [status]);

  const fetchUserData = () => {
    fetch("/api/auth/checkuser")
      .then((response) => response.json())
      .then((data) => {
        // Redirect to settings if user data is not available
        if (data == null) {
          router.push("/setting");
        } else {
          // Set cookies for user data
          Object.keys(data).forEach((key) => {
            Cookies.set(key, data[key], { expires: 30 });
          });
        }
      })
      .catch((error) => {
        console.error("Error while fetching user data from Login:", error);
      });
  };

  return (
    <div className="flex items-center">
      {session ? (
        // Display settings link if the user is logged in
        <Link href="/setting" className="">
          <Image
            href="/"
            src="/profile.svg"
            width={0}
            height={0}
            alt="settings"
            className="w-6"
          />
        </Link>
      ) : (
        // Display login button if the user is not logged in
        <button
          onClick={() => {
            signIn("google", process.env.NEXTAUTH_URL);
          }}
          className="font-extrabold text-xs lg:text-sm border border-black px-4 py-1 lg:px-8 lg:py-2 hover:bg-black hover:text-white transition-colors duration-200"
        >
          LOGIN
        </button>
      )}
    </div>
  );
};

export default Login;
