import React, { useState, useEffect } from "react";
import EventCard from "@/components/ui/eventCard";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


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
            <EventCard event={event} />       
          ))
         )}
      </div>
    </main>
  );
};

export default AllEvents;
