import React from "react";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";

const User = () => {
  const userDetails = {
    "Full Name": Cookies.get("name") || "Not available",
    "Email Address": Cookies.get("email") || "Not available",
    "USN": Cookies.get("USN") || "Not available",
    "Phone Number": Cookies.get("phoneNo") || "Not available",
    "Branch": Cookies.get("branch") || "Not available",
    "College": Cookies.get("college") || "Not available",
    "Passout Year": Cookies.get("passoutYear") || "Not available", // Corrected cookie name if it was wrong
  };

  const handleSignOut = () => {
    signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
      <div className="space-y-6">
        {Object.entries(userDetails).map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
            <dt className="text-sm font-medium text-slate-400">{label}</dt>
            <dd className="md:col-span-2 text-md text-white">{value}</dd>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-700 text-center">
         <p className="text-sm text-slate-500 mb-4">
            Need to change something? Contact us at <a href="mailto:returncode1@gmail.com" className="text-emerald-400 hover:underline">returncode1@gmail.com</a>.
        </p>
        <button
          onClick={handleSignOut}
          className="w-full max-w-xs mx-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default User;
