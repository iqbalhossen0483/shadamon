import { NextApiRequest, NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";

export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    dbConnection();
    const categories = await Category.deleteOne({ _id: req.headers.id });
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
}
