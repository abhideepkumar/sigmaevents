import React, { useState } from "react";

const Feedback = ({ event, userId, setShowFeedbackForm }) => {
  const [rating, setRating] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");

  const handleFeedback = async () => {
    try {
      if (!rating || !detailedFeedback) {
        console.log("Please provide both rating and detailed feedback.");
        return;
      }

      const feedbackData = {
        eventId: event._id,
        userId: userId,
        rating: rating,
        detailedFeedback: detailedFeedback,
      };

      console.log("Feedback data:", feedbackData);

      setShowFeedbackForm(false);

      setRating("");
      setDetailedFeedback("");
    } catch (error) {
      console.error("Error while submitting feedback:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">
          Feedback Form for {event.title}
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
  );
};

export default Feedback;
