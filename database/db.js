import mongoose from "mongoose";

const Db = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    if (db.readyState == 1) {
      console.log("db connection successful");
      return db.Promise.resolve(true);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default Db;
