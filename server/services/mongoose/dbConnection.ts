import mongoose from "mongoose";

export async function dbConnection() {
  try {
    const uri = `mongodb+srv://shadamon:${process.env.mongo_db_password}@cluster0.1oxu8tx.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(uri);
    return { error: false };
  } catch (error) {
    return { error: true };
  }
}
