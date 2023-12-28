import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

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
    <div className="flex items-center text-lg">
      {session ? (
        // Display settings link if the user is logged in
        <Link href="/setting" className="px-4">
          Settings
        </Link>
      ) : (
        // Display login button if the user is not logged in
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
