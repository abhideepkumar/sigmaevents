import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import User from "@/components/user";
import Newuser from "@/components/newuser";

const Setting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to the homepage if the user is not authenticated
  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  // If user is not authenticated, return null
  if (status !== "authenticated") {
    return null;
  }

  // Render User component if _id cookie exists, else render Newuser component
  return Cookies.get("_id") !== undefined ? <User /> : <Newuser />;
};

export default Setting;
