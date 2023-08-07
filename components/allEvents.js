import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const AllEvents = () => {
  const [EventAll, setEventAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/fetchevents")
      .then((response) => response.json())
      .then((data) => {
        const reversed_data = data.documents.reverse();
        setEventAll(reversed_data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching user data:", error);
        setLoading(false);
      });
  }, []);
  const { data: session } = useSession();

  return (
    <main className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <h1 className="text-2xl font-semibold text-gray-600">Loading... Please Wait</h1>
        ) : (
          EventAll.map((event) => (
            <div
              key={event._id}
              className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {event.title || "Not Mentioned"}
              </h2>
              <p className="text-gray-600">{event.date || "Not Mentioned"}</p>
              <p className="mt-2">{event.description || "Not Mentioned"}</p>
              <p className="mt-2">
                <strong>Location:</strong> {event.location.type || "Not Mentioned"}
              </p>
              <p className="mt-2">
                <strong>Deadline:</strong> {event.deadline || "Not Mentioned"}
              </p>
              <p className="mt-2">
                <strong>Date:</strong> {event.date || "Not Mentioned"}
              </p>
              <p className="mt-2">
                <strong>Time:</strong> {event.time || "Not Mentioned"}
              </p>
              {session && (
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => {
                    if (
                      confirm(
                        'Do you want to confirm for the event  "' + event.title + `"`
                      )
                    ) {
                      console.log("Confirmed registration");
                    } else {
                      console.log("Registration cancelled");
                    }
                  }}
                >
                  Register
                </button>
              )}
              {!session && <div className="text-red-600">Login to Register</div>}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default AllEvents;
