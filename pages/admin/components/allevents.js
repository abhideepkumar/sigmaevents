import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
const AllEvents = () => {
  const [EventAll, setEventAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/db/find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
          },
          body: JSON.stringify({
            filter: {admin: session.user.email},
            collection:"posted_events",
            database:"events"
          })
        });
        const data = await response.json();
        const reversed_data = data.data.reverse();
        setEventAll(reversed_data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching user data:", error);
        setLoading(false);
        alert("Some Error occurred, Try refreshing/relogin the page");
      }
    }
    fetchData();
  }, []);

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
              className="bg-white rounded-lg p-4 hover:bg-yellow-50 transition shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h2 className="mt-2 text-xl font-semibold">{event.title || "Not Mentioned"}</h2>
                <p className="mt-2">{event.desc || "Not Mentioned"}</p>
                <p className="text-gray-600 mt-2">on {event.date || "Not Mentioned"}</p>
                <p className="mt-2">
                  <strong>Location:</strong> {event.location?.type || "Not Mentioned"}
                  {"  "}
                  <Link href={event.location?.link}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </Link>
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
                <p className="mt-2">
                  <strong>No of Registeration:</strong> {event.registered.length}
                </p>
              </div>
            </div>
          ))
        )}
        {!loading && Object.keys(EventAll).length === 0 && (
          <h1 className="text-2xl font-semibold text-gray-600">
            No Events. Starts scheduling your events
          </h1>
        )}
      </div>
    </main>
  );
};

export default AllEvents;
