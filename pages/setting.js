import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Access from "@/components/access";
import User from "@/components/user";
import Newuser from "@/components/newuser";
const Setting = () => {
  const { data: session, status } = useSession();
  return status !== "authenticated" ? (
    <Access />
  ) : Cookies.get("_id") !== undefined ? (
    <User />
  ) : (
    <Newuser />
  );
};

export default Setting;
