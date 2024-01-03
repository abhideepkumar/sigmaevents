import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = Cookies.get("_id");
  let Allset = userId !== undefined;

  useEffect(() => {
    // Fetch events from the API
    fetchEvents();
  }, []);

  // Function to fetch events data
  const fetchEvents = () => {
    fetch("/api/auth/fetchevents")
      .then((response) => response.json())
      .then((data) => {
        const eventsData = data.documents.reverse();
        setEvents(eventsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching events data:", error);
        setLoading(false);
      });
  };

  // Function to check if the user is registered for an event
  const checkRegister = (eventRegistered) => {
    for (let i = 0; i < eventRegistered.length; i++) {
      for (let j = 0; j < eventRegistered[i].length; j++) {
        const objId = eventRegistered[i][j];
        if (objId["$id"] === userId) {
          return true;
        }
      }
    }
    return false;
  };

  // Function to handle event registration
  const handleRegister = async (event) => {
    try {
      const response = await fetch(`/api/auth/register?eventId=${event._id}&userId=${userId}`);
      if (response.ok) {
        window.location.reload();
      } else {
        console.log("Registration failed for event:", event.name);
        console.log("Response from server failed", response.data);
      }
    } catch (error) {
      console.error("Error while registering:", error);
    }
  };

  return (
    <main className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white ">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-200">Loading... Please Wait</h1>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg p-4 hover:bg-emerald-50 dark:bg-slate-700 dark:hover:bg-slate-600 transition shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="aspect-video">
                {/* Display event image */}
                <Image
                  src={`https://source.unsplash.com/480x360/?code?${event._id}`}
                  loader={() => `https://source.unsplash.com/480x360/?code?${event._id}`}
                  alt="Event Image"
                  width={480}
                  height={360}
                  className="rounded-lg"
                />
              </div>
              {/* Display event details */}
              <div>
                <h2 className="mt-1 text-xl font-semibold dark:text-white">{event.title || "Not Mentioned"}</h2>
                <p className="mt-1  dark:text-white">{event.desc || "Not Mentioned"}</p>
                <p className="mt-1 text-gray-600  dark:text-white">on {event.date || "Not Mentioned"}</p>
                <p className="mt-1 dark:text-white ">
                  <strong>Location:</strong> {event.location?.type || "Not Mentioned"}
                </p>
                <p className="mt-1  dark:text-white">
                  <strong>Deadline:</strong> {event.deadline || "Not Mentioned"}
                </p>
                <p className="mt-1  dark:text-white">
                  <strong>Date:</strong> {event.date || "Not Mentioned"}
                </p>
                <p className="mt-1  dark:text-white">
                  <strong>Time:</strong> {event.time || "Not Mentioned"}
                </p>
              </div>
              {/* Register button */}
              <div className="mt-4 flex justify-center">
                {session && (
                  <button
                    className={`px-6 py-2 rounded-3xl hover:shadow-2xl ${
                      checkRegister(event.registered)
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-black text-white shadow-md hover:shadow-2xl"
                    }`}
                    onClick={() => {
                      if (confirm('Do you want to confirm Registration for the event "' + event.title + `"`)) {
                        handleRegister(event);
                      } else {
                        console.log("Registration cancelled");
                      }
                    }}
                    disabled={checkRegister(event.registered)}
                  >
                    {checkRegister(event.registered) ? "Registered" : "Register"}
                  </button>
                )}
              </div>
              {/* Display message for users to login and fill data in settings */}
              {!Allset && !session && (
                <div className="text-red-600">Login and fill data in settings to Register</div>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default AllEvents;
