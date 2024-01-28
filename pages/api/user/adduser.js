import axios from "axios";

export default async function handler(req, res) {
  const data = req.body;
  console.log("Data received:", data);
  try {
    // Send a POST request to insert data into the MongoDB collection
    const response = await axios.post(
      `${process.env.MONGO_API}insertOne`,
      {
        collection: data.collection,
        database: data.database,
        dataSource: "Cluster1",
        document:data.document,
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      }
    );

    console.log("Response after sending:", response.data);

    // Send a success response with the data returned from the MongoDB insertion
    res.status(200).json(response.data);
  } catch (error) {
    // Log the error and send a server error response
    console.error("Error uploading user data:", error);
    res.status(500).end();
  }
}
