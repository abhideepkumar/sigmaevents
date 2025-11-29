import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";
import Feedback from "./feedback";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faMapPin, faCalendar, faClock, faLink } from '@fortawesome/free-solid-svg-icons'
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
    if (!eventRegistered || !userId) return false;
    // Assuming eventRegistered is an array of user objects or IDs.
    return eventRegistered.flat().some(reg => reg && reg['$id'] === userId);
  };

  const getEventTag = (event) => {
    const title = event.title?.toLowerCase() || '';
    if (event.location?.type === "Online") {
        return { text: "Online Seminar", color: "bg-emerald-500" };
    }
    if (title.includes("mixer")) {
        return { text: "Networking", color: "bg-purple-500" };
    }
    if (["code", "web", "tech", "dev"].some(keyword => title.includes(keyword))) {
        return { text: "Tech Workshop", color: "bg-blue-500" };
    }
    return null;
  }

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
    <main className="dark bg-slate-900">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array(3)
              .fill(0)
              .map((_, id) => (
                <div key={id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-52 w-full bg-slate-700"></div>
                  <div className="p-6">
                    <div className="h-8 bg-slate-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                    </div>
                    <div className="h-12 bg-slate-700 rounded-lg w-full mt-6"></div>
                  </div>
                </div>
              ))
          : events.map((event) => {
              const tag = getEventTag(event);
              const isRegistered = checkRegister(event.registered);
              return (
              <div
                key={event._id}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-shadow duration-300 flex flex-col"
              >
                <div className="relative">
                  <Image
                    src={`https://picsum.photos/seed/${event._id}/480/360`}
                    alt="Event Image"
                    width={480}
                    height={360}
                    className="w-full h-52 object-cover"
                  />
                  {tag && (
                    <span className={`absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}>
                      {tag.text}
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {event.title || "Not Mentioned"}
                  </h2>
                  <p className="text-slate-400 text-sm mb-6 flex-grow">
                    {event.desc || "No description available."}
                  </p>
                  
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-3 text-slate-400" />
                      <span>{event.date || "Not Mentioned"}</span>
                    </div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-3 text-slate-400" />
                      <span>{event.time || "Not Mentioned"}</span>
                    </div>
                    <div className="flex items-center">
                       <FontAwesomeIcon icon={faMapPin} className="w-4 h-4 mr-3 text-slate-400" />
                        {event.location?.type === "Online" ? (
                          <a href={event.location.link} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center">
                            {event.location?.type} <FontAwesomeIcon icon={faLink} className="w-3 h-3 ml-2"/>
                          </a>
                        ) : (
                          <span> {event.location?.link || "Not Mentioned"}</span>
                        )}
                    </div>
                     <div className="flex items-center">
                        <FontAwesomeIcon icon={faUsers} className="w-4 h-4 mr-3 text-slate-400" />
                        <span>{event.registered?.flat().length || 0} Registered</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    {session && (
                      <button
                        className={`w-full py-3 font-semibold text-white rounded-lg transition-colors ${
                          isRegistered
                            ? "bg-emerald-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={() => {
                          if (!isRegistered && confirm('Do you want to confirm Registration for the event "' + event.title + `"`)) {
                            handleRegister(event);
                          }
                        }}
                        disabled={isRegistered}
                      >
                        {isRegistered ? "Registered" : "Register Now"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback button and form logic remains unchanged */}
                {session && event.feedback && !isRegistered && (
                  <div className="p-6 pt-0">
                    <button
                      className="w-full py-3 font-semibold text-white rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowFeedbackForm(true);
                      }}
                    >
                      Feedback
                    </button>
                  </div>
                )}
                
                {!userCookie && !session && (
                  <div className="p-6 text-center text-red-500 font-semibold text-sm">
                    Login to Register
                  </div>
                )}

                {showFeedbackForm && (
                  <Feedback
                    event={selectedEvent}
                    userId={userId}
                    setShowFeedbackForm={setShowFeedbackForm}
                  />
                )}
              </div>
            )})}
      </div>
      <footer className="text-center py-10 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SigmaEvents. All rights reserved.</p>
          <p>Modern UI for College Club Events</p>
      </footer>
      </div>
    </main>
  );
};

export default AllEvents;
