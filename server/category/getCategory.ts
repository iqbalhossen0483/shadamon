import { NextApiRequest, NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";

export async function getCategory(req: NextApiRequest, res: NextApiResponse) {
  try {
    dbConnection();
    if (req.query.id) {
      const result = await Category.findOne({ _id: req.query.id });
      res.send(result);
    } else if (req.query.filter && req.query.filter !== "All") {
      const result = await Category.find({ parent_category: req.query.filter });
      res.send(result);
    } else {
      const categories = await Category.find({}).sort({ created_at: -1 });
      res.send(categories);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server error" });
  }
}
