import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";

const NewOrganizer = () => {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    clubName: "",
    clubDescription: "",
    clubLogo: "",
    clubBackground: "",
    clubContact: "",
    clubCategory: "",
    clubKeywords: [],
    clubFAQs: [],
    website: "",
    socialMedia: "",
    email: session?.user?.email || "",
    role: "",
    createdEvents: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base64Logo = await convertToBase64(formData.clubLogo);
      const base64bg = await convertToBase64(formData.clubBackground);
      const response = await fetch("/api/db/insertOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          document: { ...formData, clubLogo: base64Logo, clubBackground: base64bg },
          collection: "organizers",
          database: "profiles",
        }),
      });
      if (response.ok) {
        Object.keys(formData).forEach((key) => {
          Cookies.set("admin" + key, formData[key], 30);
        });
      } else {
      if(response.status===413)alert("Image size is exceeded, try changing the image size");
        throw new Error("Error in response: " + response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      window.location.replace("/admin");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.split(","),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 flex-col dark:bg-slate-800">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg dark:bg-slate-700">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create Your Club</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clubName" className="block text-gray-700 font-medium dark:text-white">
              Club Name:
            </label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-black dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="clubDescription"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Club Description:
            </label>
            <textarea
              name="clubDescription"
              value={formData.clubDescription}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label htmlFor="clubLogo" className="block text-gray-700 font-medium dark:text-white">
              Club Logo(under 1 MB):
            </label>
            <input
              type="file"
              name="clubLogo"
              onChange={handleFileChange}
              required
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="clubBackground"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Club Background Image (under 1 MB):
            </label>
            <input
              type="file"
              name="clubBackground"
              onChange={handleFileChange}
              required
              accept="image/*"
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="clubContact"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Club Contact:
            </label>
            <input
              type="text"
              name="clubContact"
              value={formData.clubContact}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="clubCategory"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Club Category:
            </label>
            <input
              type="text"
              name="clubCategory"
              value={formData.clubCategory}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="clubKeywords"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Club Keywords (separated by commas):
            </label>
            <input
              type="text"
              name="clubKeywords"
              value={formData.clubKeywords.join(",")}
              onChange={handleArrayChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label htmlFor="clubFAQs" className="block text-gray-700 font-medium dark:text-white">
              Club FAQs (separated by commas):
            </label>
            <input
              type="text"
              name="clubFAQs"
              value={formData.clubFAQs.join(",")}
              onChange={handleArrayChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-gray-700 font-medium dark:text-white">
              Website:
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <div>
            <label
              htmlFor="socialMedia"
              className="block text-gray-700 font-medium dark:text-white"
            >
              Social Media:
            </label>
            <input
              type="url"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:font-bold"
            />
          </div>
          <h1 className="text-red-500 font-semibold">
            We will verify your account and send you a confirmation email and then only you will be
            able to create and manage events. Please check your inbox regularly after creating an
            account.
          </h1>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
            <button
              onClick={() => {
                window.location.replace("/");
                signOut("google", { callbackUrl: process.env.ADMIN_NEXTAUTH_URL });
              }}
              className=" bg-red-500 text-white p-2 mx-5 rounded-md hover:shadow-xl hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrganizer;
