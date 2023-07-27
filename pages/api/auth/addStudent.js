import Db from "@/database/db";
import Student from "@/models/studentData";

const handler = async (req, res) => {
  Db().catch((error) => {
    res.json({ error: "Mongodb connection failed" });
  });
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "req body empty" });
    try {
      const data = req.body;
      console.log(data);
      Student.create(data);
      res.status(200).json({ message: "Data saved successfully!" });
    } catch (error) {
      console.error("Error parsing data: ", error);
      res.status(500).json({ error: "Error parsing data" });
    }
  } else {
    res.status(500).json({ error: "post accepted http failed" });
  }
};

export default handler;
