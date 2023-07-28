import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Access from "@/components/access";
import Newuser from "@/components/newuser";
import User from "@/components/user";

const Setting = () => {
  const { data: session, status } = useSession();
  const [userExist, setUserExist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/checkuser")
      .then((response) => response.json())
      .then((data) => {
        setUserExist(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching user data:", error);
        setLoading(false);
      });
  }, [status]);

  if (loading) {
    return <div className="text-center">Loading</div>;
  } else {
    if (status == "authenticated") {
      if (userExist && userExist.userData.document != null) {
        return <User userExist={userExist} />;
      } else {
        return <Newuser />;
      }
    } else {
      return <Access />;
    }
  }
};

export default Setting;
