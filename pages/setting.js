import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Access from "@/components/access";
import Newuser from "@/components/newuser";
import User from "@/components/user";

const Setting = () => {
  const { data: session, status } = useSession();
  const [userExist, setUserExist] = useState(null);
  const [components, setComponents] = useState("");

  useEffect(() => {
    // console.log("status:", status);
    fetch("/api/auth/checkuser")
      .then((response) => response.json())
      .then((data) => {
        // console.log("User already exists", data.userExists);
        // console.log("User has data", data.userData);
        if (data.userData.document != null) {
          setUserExist(data);
          setComponents("User");
        } else {
          setUserExist(data);
          setComponents("NewUser");
        }
      })
      .catch((error) => {
        console.error("Error while fetching user data:", error);
      });
  }, [status]);

  // console.log("Components:", components);
  // console.log("UserExist:", userExist);
  if (status == "loading") {
    return <div className="text-center">Loading</div>;
  } else {
    if (status == "authenticated") {
      if (components === "User" && userExist) {
        // console.log(userExist);
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
