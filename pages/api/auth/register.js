import axios from "axios";

export default async function handler(req, res) {
  const { eventId, userId } = req.query;
  console.log("Received EventId:", req.query);
  console.log("UserId: ", userId);

  try {
    const response = await axios.post(
      `${process.env.MONGO_API}updateOne`,
      {
        collection: "posted_events",
        database: "events",
        dataSource: "Cluster1",
        filter: {
          _id: { $oid: eventId },
        },
        update: {
          $addToSet: {
            registered: [{ $ref: "profiles.students", $id: userId, $db: "profiles" }],
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
    console.log("resonse from server:", response.data);
    if (response.data) {
      res.status(200).json({ message: "User registered for the event" });
    } else {
      res.status(500).json({ error: "Failed to update event" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
