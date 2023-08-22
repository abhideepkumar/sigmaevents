import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Access from "@/components/access";
import User from "@/components/user";
import Newuser from "@/components/newuser";

const Setting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (status !== "authenticated") {
    return null;
  }

  return Cookies.get("_id") !== undefined ? <User /> : <Newuser />;
};

export default Setting;
