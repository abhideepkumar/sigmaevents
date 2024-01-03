import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Image from "next/image";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = Cookies.get("_id");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");
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
      const response = await fetch(
        `/api/auth/register?eventId=${event._id}&userId=${userId}`
      );
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

  // Function to handle feedback submission
  const handleFeedback = async () => {
    try {
      // Ensure both rating and detailed feedback are provided
      if (!rating || !detailedFeedback) {
        console.log("Please provide both rating and detailed feedback.");
        return;
      }

      // Feedback data to be submitted
      const feedbackData = {
        eventId: selectedEvent._id,
        userId: userId,
        rating: rating,
        detailedFeedback: detailedFeedback,
      };

      // Send POST request to submit feedback
      // You need to implement the server-side logic for this part
      console.log("Feedback data:", feedbackData);

      // Close the feedback form
      setShowFeedbackForm(false);

      // Reset the feedback form state
      setRating("");
      setDetailedFeedback("");
    } catch (error) {
      console.error("Error while submitting feedback:", error);
    }
  };

  return (
    <main className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <h1 className="text-2xl font-semibold text-gray-600">
            Loading... Please Wait
          </h1>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg p-4 hover:bg-emerald-50 transition shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="aspect-video">
                {/* Display event image */}
                <Image
                  src={`https://source.unsplash.com/480x360/?code?${event._id}`}
                  loader={() =>
                    `https://source.unsplash.com/480x360/?code?${event._id}`
                  }
                  alt="Event Image"
                  width={480}
                  height={360}
                  className="rounded-lg"
                />
              </div>
              {/* Display event details */}
              <div>
                <h2 className="mt-1 text-xl font-semibold">
                  {event.title || "Not Mentioned"}
                </h2>
                <p className="mt-1">{event.desc || "Not Mentioned"}</p>
                <p className="mt-1 text-gray-600">
                  on {event.date || "Not Mentioned"}
                </p>
                <p className="mt-1">
                  <strong>Location:</strong>{" "}
                  {event.location?.type || "Not Mentioned"}
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
                      if (
                        confirm(
                          'Do you want to confirm Registration for the event "' +
                            event.title +
                            `"`
                        )
                      ) {
                        handleRegister(event);
                      } else {
                        console.log("Registration cancelled");
                      }
                    }}
                    disabled={checkRegister(event.registered)}
                  >
                    {checkRegister(event.registered)
                      ? "Registered"
                      : "Register"}
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
              {!Allset && !session && (
                <div className="text-red-600">
                  Login and fill data in settings to Register
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4">
              Feedback Form {/*for {event.title}*/}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Rating:
              </label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Enter rating (1-5)"
                className="mt-1 p-2 border rounded-md w-full"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Detailed Feedback:
              </label>
              <textarea
                className="mt-1 p-2 border rounded-md w-full"
                value={detailedFeedback}
                onChange={(e) => setDetailedFeedback(e.target.value)}
              ></textarea>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleFeedback}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AllEvents;
