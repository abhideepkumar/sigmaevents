import React from "react";
import { useSession, signOut } from "next-auth/react";

const User = ({ userExist }) => {
  const { data: session, status } = useSession();
  if (!userExist) {
    return <div>Loading...</div>;
  }
  // console.log(userExist.userData.document);
  const metadata = userExist.userData.document;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {metadata.name}
        </h2>
        <p>Email: {session?.user?.email}</p>
        <p>USN: {metadata.USN}</p>
        <p>Phone No: {metadata.phoneNo}</p>
        <p>Branch: {metadata.branch}</p>
        <p>College: {metadata.college}</p>
        {/* <p>Passout Year: {metadata.passoutYear}</p> */}
      </div>
      <button
        onClick={() =>
          signOut("google", { callbackUrl: "http://localhost:3000" })
        }
        className="mt-4 px-4 py-2 bg-red-400 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none"
      >
        Sign out
      </button>
    </div>
  );
};

export default User;
