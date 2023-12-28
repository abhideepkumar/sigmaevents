import axios from "axios";

export default async function handler(req, res) {
  // Retrieve data from the request body
  const data = req.body;
  console.log("Data received:", data);

  try {
    // Construct the URL for inserting data
    const iUrl = `${process.env.MONGO_API}insertOne`;
    console.log("URL:", iUrl);

    // Send a POST request to insert data into the MongoDB collection
    const response = await axios.post(
      iUrl,
      {
        collection: "students",
        database: "profiles",
        dataSource: "Cluster1",
        document: {
          // Extract data from the request body
          name: data.name,
          USN: data.USN,
          email: data.email,
          phoneNo: data.phoneNo,
          branch: data.branch,
          college: data.college,
          LastYear: data.passoutYear,
          appliedEvents: [],
        },
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
