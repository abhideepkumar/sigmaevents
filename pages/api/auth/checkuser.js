import axios from "axios";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session);
  console.log(req);
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

    const userData = response.data;
    const userExists = userData !== null;
    console.log({ userExists, userData });

    res.status(200).json({ userExists, userData });
  } catch (error) {
    console.error("Error checking user data:", error);
    res.status(500).end();
  }
}
