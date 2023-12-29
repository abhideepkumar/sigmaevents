import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    
    if (!session) {
      res.status(401).end();
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

    const userDataArray = response.data;
    console.log("userDataArray: ", userDataArray);

    res.status(200).json(userDataArray);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).end();
  }
}
