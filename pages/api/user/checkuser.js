import axios from "axios";

export default async function handler(req, res) {
  const email = req.body.email;
  const database = req.body.database;
  const collection = req.body.collection;

  try {
    // Send a POST request to fetch user data from MongoDB
    const response = await axios.post(
      `${process.env.MONGO_API}findOne`,
      {
        collection: collection,
        database: database,
        dataSource: "Cluster1",
        filter: { email },
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
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
