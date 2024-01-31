import axios from "axios";
export default async function handler(req, res) {
  try {
    console.log(req.body)
    console.log(req.body.filter)

    const response = await axios.post(
      `${process.env.MONGODB_URL_ENDPOINT}find`,
      {
        collection: req.body.collection,
        database: req.body.database,
        dataSource: "Cluster1",
        filter: req.body.filter,
      },
      {
        headers: {
          apiKey: process.env.MONGODB_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const userDataArray = response.data.documents;

    if (userDataArray) {
      console.log("userDataArray: ", userDataArray);
      res.json({ status: 200, data: userDataArray });
    } else {
      res.json({ status: 404, message: "No data found" });
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.json({ status: 500, message: "Server error" });
  }
}
