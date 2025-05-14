import mongoose from "mongoose";
const connectDatabase = () => {
  mongoose.connect(process.env.MONGO_DB_URL);
};

module.exports = connectDatabase;
