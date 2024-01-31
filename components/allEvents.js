import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Feedback from "./feedback";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo,faMapLocationDot,faCalendarPlus,faClock,faHourglassHalf,faLink } from '@fortawesome/free-solid-svg-icons'
import toast from "react-hot-toast";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const userId = Cookies.get("_id");
  let userCookie = userId !== undefined;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("/api/db/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
      },
      body: JSON.stringify({
        filter: {},
        collection:"posted_events",
        database:"events"
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const eventsData = data.data.reverse();
        setEvents(eventsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error while fetching events data:", error);
        setLoading(false);
      });
  };

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

  const handleRegister = async (event) => {
    try {
        const response = await fetch(`/api/db/updateOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
        body: JSON.stringify({
          collection: "posted_events",
          database: "events",
          eventId: event._id,
          userId: userId,
          dbRef: "profiles",
          collectionRef: "students",
        }),
      });
      if (response.ok) {
        window.location.reload();
        toast.success('Successfully registered!');
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
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-300">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(3)
              .fill(0)
              .map((event, id) => (
                <div
                  key={id}
                  className="bg-white rounded-lg p-4 hover:bg-emerald-50 transition shadow-lg hover:shadow-2xl flex flex-col justify-between animate-pulse"
                >
                  <div className="h-52 w-auto bg-gray-400 rounded-lg"></div>
                  <div className="px-6 py-4">
                    <div className="h-6 bg-gray-300 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-2/3"></div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 w-1/2"></div>
                  </div>
                </div>
              ))
          : events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-slate-600 rounded-lg p-4 hover:bg-green-50 transition shadow-lg hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="flex justify-center items-center">
                  {/* Display event image */}
                  <Image
                    src={`https://source.unsplash.com/480x360/?code?${event._id}`}
                    alt="Event Image"
                    width={480}
                    height={360}
                    className="rounded-lg aspect-video"
                  />
                </div>
                {/* Display event details */}
                <div className="dark:text-white tracking-tight text-xl drop-shadow ">
                  <h2 className="mt-3 text-2xl font-semibold dark:text-green-300">
                    {event.title || "Not Mentioned"}
                  </h2>

                  <div className="flex items-center mt-3">
                    <p className="mx-2">
                      <FontAwesomeIcon icon={faMapLocationDot} />
                    </p>
                    {event.location?.type === "Online" ? (
                      <a href={event.location.link} className="">
                        {event.location?.type}
                        <FontAwesomeIcon icon={faLink} />
                      </a>
                    ) : (
                      <div className="text-xl"> {event.location?.link || "Not Mentioned"}</div>
                    )}
                  </div>

                  <div className="flex items-center mt-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-2 text-base font-sans">
                    <p className="mx-2">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </p>
                    {event.desc || "Not Mentioned"}
                  </div>
                  <div className="flex justify-between mt-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-2">
                    <div className="flex items-center text-base">
                      <p className="mx-2">
                        <FontAwesomeIcon icon={faCalendarPlus} />
                      </p>
                      {event.date || "Not Mentioned"}
                    </div>

                    <div className="flex items-center  text-base">
                      <p className="mx-2">
                        <FontAwesomeIcon icon={faClock} />
                      </p>
                      {event.time || "Not Mentioned"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-2 text-base dark:text-white">
                  <p className="mx-2  ">
                    <FontAwesomeIcon icon={faHourglassHalf} />
                  </p>
                  {event.deadline || "Not Mentioned"}
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
                        confirm(
                          'Do you want to confirm Registration for the event "' + event.title + `"`
                        )
                          ? handleRegister(event) 
                          : console.log("Registration cancelled"); 
                      }}
                      disabled={checkRegister(event.registered)}
                    >
                      {checkRegister(event.registered) ? "Registered" : "Register"}
                    </button>
                  )}
                  {/* Feedback button */}
                  {session && event.feedback && (
                    <button
                      className="ml-4 px-6 py-2 rounded-3xl hover:shadow-2xl bg-blue-500 text-white"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowFeedbackForm(true);
                      }}
                    >
                      Feedback
                    </button>
                  )}
                </div>
                {/* Display message for users to login and fill data in settings */}
                {!userCookie && !session && (
                  <div className="dark:text-red-500 text-red-600 font-bold animate-pulse text-base">
                    Login and fill data in settings to Register
                  </div>
                )}

                {/* Feedback Form */}
                {showFeedbackForm && (
                  <Feedback
                    event={selectedEvent}
                    userId={userId}
                    setShowFeedbackForm={setShowFeedbackForm}
                  />
                )}
              </div>
            ))}{" "}
      </div>
    </main>
  );
};

export default AllEvents;
