import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

const Newuser = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    USN: "",
    email: session.user.email,
    phoneNo: "",
    branch: "",
    college: "",
    passoutYear: "",
    role: "student",
    appliedEvents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/db/insertOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document: formData,
          collection: "students",
          database: "profiles",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const docId = data.data.insertedId;
        Object.keys(formData).forEach((key) => {
          Cookies.set(key, formData[key], { expires: 30 });
        });
        Cookies.set("_id", docId, { expires: 30 });
        window.location.reload();
      } else {
        console.error("Failed to save profile.");
        alert("There was an error saving your profile. Please try again.");
      }
    } catch (err) {
      console.error("Error saving data: ", err);
      alert("An unexpected error occurred. Please check the console and try again.");
    } finally {
      setIsSubmitting(false);
      window.location.href = "/";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCancel = () => {
    signOut("google", { callbackUrl: process.env.NEXTAUTH_URL });
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
          {/* USN */}
          <div>
            <label htmlFor="USN" className="block text-sm font-medium text-slate-300 mb-2">USN</label>
            <input type="text" name="USN" id="USN" value={formData.USN} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phoneNo" className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
            <input type="tel" name="phoneNo" id="phoneNo" value={formData.phoneNo} onChange={handleChange} required placeholder="e.g., 9876543210" className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-slate-300 mb-2">Branch</label>
            <input type="text" name="branch" id="branch" value={formData.branch} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
          {/* College */}
          <div className="md:col-span-2">
            <label htmlFor="college" className="block text-sm font-medium text-slate-300 mb-2">College</label>
            <input type="text" name="college" id="college" value={formData.college} onChange={handleChange} required className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
          {/* Passout Year */}
          <div>
            <label htmlFor="passoutYear" className="block text-sm font-medium text-slate-300 mb-2">Pass Out Year</label>
            <input type="number" name="passoutYear" id="passoutYear" value={formData.passoutYear} onChange={handleChange} required placeholder="e.g., 2025" className="w-full bg-slate-700 border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"/>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700">
          <p className="text-sm text-slate-500 mb-4">
            Please ensure all details are correct. To apply for any changes after submission, you will need to contact us at <a href="mailto:returncode1@gmail.com" className="text-emerald-400 hover:underline">returncode1@gmail.com</a>.
          </p>
          <div className="flex flex-col sm:flex-row-reverse gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 border border-slate-600 rounded-lg shadow-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Cancel & Sign Out
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Newuser;