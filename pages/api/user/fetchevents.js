import axios from "axios";

export default async function handler(req, res) {
  try {
    // Send a POST request to retrieve all events from MongoDB
    const response = await axios.post(
      `${process.env.MONGO_API}find`,
      {
        collection: "posted_events",
        database: "events",
        dataSource: "Cluster1",
        filter: {}, // Empty filter to fetch all events
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the retrieved events as a JSON response
    res.status(200).json(response.data);
    console.log("events fetched are: ", response.data);
  } catch (error) {
    // Handle errors if the request fails
    console.error("Error retrieving all events:", error);
    res.status(500).end();
  }
}
