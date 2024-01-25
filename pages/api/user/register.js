import axios from "axios";

export default async function handler(req, res) {
  // Extract eventId and userId from the query parameters
  const { eventId, userId } = req.query;
  console.log("Received EventId:", eventId);
  console.log("UserId: ", userId);

  try {
    // Send a POST request to update event registration in MongoDB
    const response = await axios.post(
      `${process.env.MONGO_API}updateOne`,
      {
        collection: "posted_events",
        database: "events",
        dataSource: "Cluster1",
        filter: {
          _id: { $oid: eventId }, // Filter by eventId
        },
        update: {
          $addToSet: {
            registered: [{ $ref: "profiles.students", $id: userId, $db: "profiles" }],
            // Add userId to the 'registered' array for the corresponding event
          },
        },
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
          "Content-Type": "application/ejson",
          Accept: "application/json",
        },
      }
    );

    // Check if the update was successful
    if (response.data) {
      // Send a success message if the update was successful
      res.status(200).json({ message: "User registered for the event" });
    } else {
      // Send an error message if the update failed
      res.status(500).json({ error: "Failed to update event" });
    }
  } catch (error) {
    // Handle errors if the request fails
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
