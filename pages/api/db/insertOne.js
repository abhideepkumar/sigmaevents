import axios from "axios";

export default async function handler(req, res) {
  console.log("Data received:", req.body);
  try {
    // Send a POST request to insert data into the MongoDB collection
    const response = await axios.post(
      `${process.env.MONGODB_URL_ENDPOINT}insertOne`,
      {
        collection: req.body.collection,
        database: req.body.database,
        dataSource: "Cluster1",
        document:req.body.document,
      },
      {
        headers: {
          apiKey: process.env.MONGODB_API_KEY,
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
