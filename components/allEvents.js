import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = Cookies.get("_id");
  let Allset = false;
  if (userId !== undefined) {
    Allset = true;
  }
  // console.log("UserId: ", userId);
  useEffect(() => {
    fetch("/api/auth/fetchevents")
      .then((response) => response.json())
      .then((data) => {
        const events_data = data.documents.reverse();
        setEvents(events_data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching user data:", error);
        setLoading(false);
      });
  }, []);
  const checkregister = (eventregistered) => {
    for (let i = 0; i < eventregistered.length; i++) {
      for (let j = 0; j < eventregistered[i].length; j++) {
        const objid = eventregistered[i][j];
        if (objid["$id"] === userId) {
          return true;
        }
      }
    }
    return false;
  };
  const handleRegister = async (event) => {
    try {
      const response = await fetch(`/api/auth/register?eventId=${event._id}&userId=${userId}`);
      if (response.ok) {
        window.location.reload();
        // console.log("Registered for event:", eventId);
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
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <h1 className="text-2xl font-semibold text-gray-600">Loading... Please Wait</h1>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg p-4 hover:bg-emerald-50 transition shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="aspect-video">
                <Image
                  src={`https://source.unsplash.com/480x360/?code?${event._id}`}
                  loader={() => `https://source.unsplash.com/480x360/?code?${event._id}`}
                  alt="Event Image"
                  width={480}
                  height={360}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="mt-1 text-xl font-semibold">{event.title || "Not Mentioned"}</h2>
                <p className="mt-1">{event.desc || "Not Mentioned"}</p>
                <p className="mt-1 text-gray-600">on {event.date || "Not Mentioned"}</p>
                <p className="mt-1">
                  <strong>Location:</strong> {event.location?.type || "Not Mentioned"}
                </p>
                <p className="mt-1">
                  <strong>Deadline:</strong> {event.deadline || "Not Mentioned"}
                </p>
                <p className="mt-1">
                  <strong>Date:</strong> {event.date || "Not Mentioned"}
                </p>
                <p className="mt-1">
                  <strong>Time:</strong> {event.time || "Not Mentioned"}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                {session && (
                  <button
                    className={`px-6 py-2 rounded-3xl hover:shadow-2xl ${
                      checkregister(event.registered)
                        ? "bg-green-700 text-white hover:bg-green-800"
                        : "bg-black text-white shadow-md hover:shadow-2xl"
                    }`}
                    onClick={() => {
                      if (confirm('Do you want to confirm Registration for the event  "' + event.title + `"`)) {
                        handleRegister(event);
                      } else {
                        console.log("Registration cancelled");
                      }
                    }}
                    disabled={checkregister(event.registered)}
                  >
                    {checkregister(event.registered) ? "Registered" : "Register"}
                  </button>
                )}
              </div>
              {!Allset && !session && <div className="text-red-600">Login and fill data in settings to Register</div>}
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default AllEvents;
