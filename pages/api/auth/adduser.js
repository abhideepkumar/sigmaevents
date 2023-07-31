import axios from "axios";
export default async function handler(req, res) {
  const data = req.body;
  console.log("data received", data);
  try {
    const iUrl = `${process.env.MONGO_API}insertOne`;
    console.log("Url is: ", iUrl);
    const response = await axios.post(
      iUrl,
      {
        collection: "students",
        database: "test",
        dataSource: "Cluster1",
        document: {
            "name": data.name,
            "USN": data.USN,
            "email": data.email,
            "phoneNo": data.phoneNo,
            "branch": data.branch,
            "college": data.college,
            "LastYear": data.passoutYear,
            "appliedEvents": []
          }
          
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
        },
      }
    );
    console.log("response after sending: ", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error data sent: ", data);
    console.error("Error checking user data:", error);
    res.status(500).end();
  }
}
