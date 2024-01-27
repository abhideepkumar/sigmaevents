import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Event = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <Link href="/admin/fillevent">
        <div className="flex items-center p-3 border rounded-md border-blue-500 hover:bg-blue-50 transition">
          <FontAwesomeIcon icon={faPlus} className="mr-2 text-blue-500" />
          <h1 className="text-lg font-semibold">Schedule Events</h1>
        </div>
      </Link>
    </div>
  );
};

export default Event;
