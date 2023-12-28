import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // Get the session information using NextAuth
  const session = await getSession({ req });
  console.log("Session fetched from NextAuth: ", session);

  try {
    // Extract the email from the user session
    const { email } = session.user;

    // Send a POST request to fetch user data from MongoDB
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

    // Get the user data from the response
    const data = response.data.document;

    // Send the user data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while checking user data:", error);
    res.status(500).end();
  }
}
