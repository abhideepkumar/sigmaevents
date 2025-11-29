import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import User from "@/components/user";
import Newuser from "@/components/newuser";

const Setting = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="dark bg-slate-900 w-full min-h-screen flex items-center justify-center">
        <p className="text-white animate-pulse">Loading settings...</p>
      </div>
    );
  }

  if (status === "authenticated") {
    const hasProfile = Cookies.get("_id") !== undefined;
    return (
      <main className="dark bg-slate-900 w-full min-h-screen py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            {hasProfile ? "My Profile" : "Create Your Profile"}
          </h1>
          {hasProfile ? <User /> : <Newuser />}
        </div>
      </main>
    );
  }

  return null;
};

export default Setting;
