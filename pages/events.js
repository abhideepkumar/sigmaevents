import React from "react";
import { useSession } from "next-auth/react";

const events = [
  {
    id: 1,
    title: "Sample Event 1",
    description: "This is the description of Event 1.",
    date: "July 22, 2023",
  },
  {
    id: 2,
    title: "Sample Event 2",
    description: "This is the description of Event 2.",
    date: "July 23, 2023",
  },
];

const Events = () => {
  const { data: session } = useSession();

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600">{event.date}</p>
            <p className="mt-2">{event.description}</p>
            {session && (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={()=>alert("You can register soon ;)")}>
                Register
              </button>
            )}
             {!session && (
              <div className="text-red-600">Login to Register</div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Events;
