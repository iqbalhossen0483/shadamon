import { NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { deleteImage } from "../services/shared/deleteImage";

export async function updateCategory(req: any, res: NextApiResponse) {
  try {
    dbConnection();
    const _id = req.body.id;
    delete req.body.id;
    req.body.sub_category = JSON.parse(req.body.sub_category);
    req.body.features = JSON.parse(req.body.features);
    req.body.active_features = JSON.parse(req.body.active_features);
    req.body.buttons = JSON.parse(req.body.buttons);
    req.body.created_by = JSON.parse(req.body.created_by);

    const ondImg = req.body.url.split("/");
    if (req.file) {
      deleteImage(`icons/${ondImg[ondImg.length - 1]}`);
      req.body.icon = `http://localhost:3000/icons/${req.file.filename}`;
    } else {
      req.body.icon = req.body.url;
    }
    delete req.body.url;
    const result = await Category.updateOne({ _id }, req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
}
