import { useSession, signIn, signOut } from "next-auth/react";
import { React, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  // Fetch user details from cookies or display default values
  const clubname = Cookies.get("adminclubName") || "Can't Fetch";
  const adminclubKeywords = Cookies.get("adminclubKeywords") || "Can't Fetch";
  const adminsocialMedia = Cookies.get("adminsocialMedia") || "Can't Fetch";
  const adminwebsite = Cookies.get("adminwebsite") || "Can't Fetch";
  const adminclubContact = Cookies.get("adminclubContact") || "Can't Fetch";
  const adminclubCategory = Cookies.get("adminclubCategory") || "Can't Fetch";
  const adminclubFAQs = Cookies.get("adminclubFAQs") || "Can't Fetch";
  const adminclubDescription = Cookies.get("adminclubDescription") || "Can't Fetch";
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
          collection: "organizers",
          database: "profiles",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      data === null ? router.push("/admin/new_organizers") : data.role == "student" ? router.push("/") : Object.keys(data).forEach((key) => {
        Cookies.set("admin" + key, data[key], { expires: 30 });
        router.push("/admin");
      });
      
    } catch (error) {
      console.error("Error while fetching admin data from Login:", error);
    }
  };
  return (
    <div className=" flex justify-center items-center bg-gray-100">
      <div className="container mx-auto p-4">
        {session ? (
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-2">
              Welcome back, <span className="text-blue-500">{session.user.name}</span>!
            </h1>
            <p className="text-gray-600 mb-4">
              You are signed in with <span className="text-yellow-500">{session.user.email}</span>
            </p>
            <table className="mt-4 border-collapse border border-gray-200">
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">Club Name</td>
                  <td className="p-2 border border-gray-200">{clubname}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Club Description</td>
                  <td className="p-2 border border-gray-200">{adminclubDescription}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Club Contact</td>
                  <td className="p-2 border border-gray-200">{adminclubContact}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Club Category</td>
                  <td className="p-2 border border-gray-200">{adminclubCategory}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Club Keywords</td>
                  <td className="p-2 border border-gray-200">{adminclubKeywords}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Club FAQs</td>
                  <td className="p-2 border border-gray-200">{adminclubFAQs}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Website</td>
                  <td className="p-2 border border-gray-200">
                    {/* Display the website as a link */}
                    <a href={adminwebsite} target="_blank" rel="noreferrer">
                      {adminwebsite}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Social Media</td>
                  <td className="p-2 border border-gray-200">
                    {/* Display the social media as a link */}
                    <a href={adminsocialMedia} target="_blank" rel="noreferrer">
                      {adminsocialMedia}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                // Sign out user and remove all cookies
                signOut("google", { callbackUrl: process.env.ADMIN_NEXTAUTH_URL });
                const cookies = Cookies.get();
                for (const cookie in cookies) {
                  Cookies.remove(cookie);
                }
              }}
              className="px-4 py-2 mt-3 bg-red-500 rounded-md text-white font-medium shadow hover:bg-red-600 focus:outline-none"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Join the Community</h1>
            <p className="text-gray-600 mb-4">
              Sign in with your Google account to access all features.
            </p>
            <button
              onClick={() => signIn("google", process.env.ADMIN_NEXTAUTH_URL)}
              className="px-4 py-2 bg-blue-500 rounded-md text-white font-medium shadow hover:bg-blue-600 focus:outline-none"
            >
              Login with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
