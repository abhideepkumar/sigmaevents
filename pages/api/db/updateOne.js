import axios from "axios";

export default async function handler(req, res) {
console.log(req.body)
  try {
    const response = await axios.post(
      `${process.env.MONGODB_URL_ENDPOINT}updateOne`,
      {
        collection: req.body.collection,
        database: req.body.database,
        dataSource: "Cluster1",
        filter: {
          _id: { $oid: req.body.eventId },
        },
        update: {
          $addToSet: {
            registered: [{ $ref:req.body.dbRef+"."+req.body.collectionRef, $id: req.body.userId, $db: req.body.dbRef }],
          },
        },
      },
      {
        headers: {
          apiKey: process.env.MONGODB_API_KEY,
          "Content-Type": "application/ejson",
          Accept: "application/json",
        },
      }
    );

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
