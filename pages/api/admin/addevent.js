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
        collection: "posted_events",
        database: "events",
        dataSource: "Cluster1",
        document: {
          admin: data.admin,
          title: data.title,
          desc: data.desc,
          location: { type: data.location.type, link: data.location.link },
          deadline: data.deadline,
          date: data.date,
          time: data.time,
          registered: [],
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
    console.log("response after sending: ", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log("error data sent: ", data);
    console.error("Error checking user data:", error);
    res.status(500).end();
  }
}
