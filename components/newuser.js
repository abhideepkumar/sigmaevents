import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";

const Newuser = () => {
  const { data: session } = useSession();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    USN: "",
    email: session.user.email,
    phoneNo: "",
    branch: "",
    college: "",
    passoutYear: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // If data is sent successfully, update cookies and redirect
        Object.keys(formData).forEach((key) => {
          Cookies.set(key, formData[key], 30);
        });
        window.location.replace("/");
      } else {
        console.log("Error in response: ", response.data);
      }
    } catch (err) {
      console.error("Error saving data: ", err);
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col dark:bg-slate-800">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg dark:bg-slate-700">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium dark:text-white">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border dark:text-black dark:font-bold border-gray-200  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="USN" className="block text-gray-700 font-medium dark:text-white">
              USN:
            </label>
            <input
              type="text"
              name="USN"
              value={formData.USN}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200   dark:font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div></div>
          <div>
            <label htmlFor="phoneNo" className="block text-gray-700 font-medium dark:text-white">
              Phone Number(without +91):
            </label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200    dark:font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="branch" className="block text-gray-700 font-medium dark:text-white">
              Branch:
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200   dark:font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="college" className="block text-gray-700 font-medium dark:text-white">
              College:
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200   dark:font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="passoutYear" className="block text-gray-700 font-medium dark:text-white">
              Pass Out Year:
            </label>
            <input
              type="number"
              name="passoutYear"
              value={formData.passoutYear}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200   dark:font-bold rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Additional note for the user */}
          <p className="text-red-600 dark:text-green-300">
            After saving, You need to contact us on email{" "}
            <span className="text-blue-600 dark:text-red-300">returncode1@gmail.com</span> to make changes
          </p>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newuser;