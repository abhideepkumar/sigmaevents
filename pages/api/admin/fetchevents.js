import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    console.log("Session on server: ", session);
    if (!session) {
      res.json({ status: 401, message: "Unauthorized" });
      return;
    }

    const email = session.user.email;
    console.log("email: ", email);

    const response = await axios.post(
      `${process.env.MONGO_API}find`,
      {
        collection: "posted_events",
        database: "events",
        dataSource: "Cluster1",
        filter: { admin: email },
      },
      {
        headers: {
          apiKey: process.env.MONGO_KEY,
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
