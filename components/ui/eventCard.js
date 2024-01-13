import Image from "next/image";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { Calendar, Clock, Hourglass, Info, icons } from "lucide-react";

export default function EventCard({ event }) {

  const { data: session } = useSession();
  const userId = Cookies.get("_id");
  let Allset = userId !== undefined;
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
  return (
    <div className="border text-card-foreground max-w-md bg-white rounded-xl overflow-hidden md:max-w-2xl m-4 flex flex-col items-center shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-5 hover:scale-104">
      <div className="relative w-full">
        {/* Display event image */}
        
       <div key={event.id}>
          {/* Render event details */}
      </div>


        <div className="aspect-video m-5">
          {/* Display event image */}
          <Image
            src={`https://source.unsplash.com/480x360/?code?${event._id}`}
            loader={() =>
              `https://source.unsplash.com/480x360/?code?${event._id}`
            }
            alt="Event Image"
            width={480}
            height={360}
            className="rounded-lg h-50 w-50 object-cover transform transition duration-500 ease-in-out hover:scale-105 hover:grayscale"
          />
        </div>

        <div className="absolute bottom-0 left-0 bg-black bg-opacity-20 mx-10 translate-y-full delay-200 hover:translate-y-full hover:translate-x-1/4 hover:scale-150 duration-500">
          <h3 className="tracking-tight text-2xl font-semibold drop-shadow text-blue-600">
            {event.title || "Not Mentioned"}
          </h3>
        </div>
      </div>
      

      <div className="p-5 w-full">
        <div className="p-6 text-sm mt-4">
          <div className="flex items-center">
            {event.location?.type === "Online" ? (
              <div className="text-green-600 font-medium text-xl">
                {event.location?.type}
              </div>
            ) : (
              <div className="text-red-600 font-medium text-xl">
                {" "}
                {event.location?.type}
              </div>
            )}
          </div>
          <div className="flex mt-2 text-base font-normal leading-tight space-x-0.5 italic font-sans">
            <p className="mx-2 font-bold text-blue-400">
              <Info />
            </p>
            {event.description || "Not Mentioned"}
          </div>
          <div className="flex items-center mt-2 text-lg">
            <p className="mx-2 font-bold text-blue-400">
              <Calendar />
            </p>
            {event.date || "Not Mentioned"}
          </div>
          <div className="flex items-center mt-2 text-lg">
            <p className="mx-2 font-bold text-blue-400">
              <Clock />
            </p>
            {event.time || "Not Mentioned"}
          </div>
         
          <div className="flex items-center mt-2 text-lg">
            <p className="mx-2 font-bold text-red-600">
              <Hourglass />
            </p>
            {event.deadline || "Not Mentioned"} !!
          </div>

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
                {checkRegister(event.registered) ? "Registered" : "Register"}
              </button>
            )}
          </div>
          {/* Display message for users to login and fill data in settings */}
          {!Allset && !session && (
            <div className="text-red-600 font-bold animate-pulse text-base">
              Login and fill data in settings to Register
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
