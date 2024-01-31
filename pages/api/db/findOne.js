import axios from "axios";

export default async function handler(req, res) {
  try {
    // Send a POST request to fetch user data from MongoDB
    const response = await axios.post(
      `${process.env.MONGODB_URL_ENDPOINT}findOne`,
      {
        collection: req.body.collection,
        database: req.body.database,
        dataSource: "Cluster1",
        filter: req.body.fliter,
      },
      {
        headers: {
          apiKey: process.env.MONGODB_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // Get the user data from the response
    const data = response.data.document;
    console.log("Response after sending:", data);

    // Send the user data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while checking user data:", error);
    res.status(500).end();
  }
}
