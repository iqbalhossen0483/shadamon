import mongoose from "mongoose";

export async function dbConnection() {
  const uri = `mongodb+srv://${process.env.mongo_db_username}:${process.env.mongo_db_password}@cluster0.1oxu8tx.mongodb.net/?retryWrites=true&w=majority`;
  await mongoose.connect(uri, { dbName: "shadamon" });
}
