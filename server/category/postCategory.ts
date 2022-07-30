import { NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { deleteImage } from "../services/shared/deleteImage";

export async function postCategory(req: any, res: NextApiResponse) {
  try {
    dbConnection();
    req.body.sub_category = JSON.parse(req.body.sub_category);
    req.body.features = JSON.parse(req.body.features);
    req.body.active_features = JSON.parse(req.body.active_features);
    req.body.buttons = JSON.parse(req.body.buttons);
    req.body.created_by = JSON.parse(req.body.created_by);
    req.body.icon = `http://localhost:3000/icons/${req.file.filename}`;

    const newCategory = new Category(req.body);
    await newCategory.save((err: any) => {
      if (err) {
        deleteImage(`/icons/${req.file.filename}`);
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "Added Successfully" });
      }
    });
  } catch (error) {
    deleteImage(`/icons/${req.file.filename}`);
    res.status(500).send({ message: "server error" });
  }
}
