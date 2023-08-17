import axios from "axios";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("Session fetched from NextAuth: ", session);
  try {
    const { email } = session.user;
    const response = await axios.post(
      `${process.env.MONGO_API}findOne`,
      {
        collection: "students",
        database: "profiles",
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
    const data = response.data.document;
    res.status(200).json(data);
  } catch (error) {
    console.error("checkuser file saying Error checking user data:", error);
    res.status(500).end();
  }
}
