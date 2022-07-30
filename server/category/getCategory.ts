import { NextApiRequest, NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";

export async function getCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    dbConnection();
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
}
