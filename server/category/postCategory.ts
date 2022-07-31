import { NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { imageUpload } from "../cloudinary/imageUpload";
import { deleteImage } from "../cloudinary/deleteImage";
import { ordering } from "./ordering";

export async function postCategory(req: any, res: NextApiResponse) {
  try {
    await dbConnection();

    //icon upload to cloudinary;
    const { error, result } = await imageUpload(
      req.file.path,
      "/icons",
      100,
      100
    );
    if (error) throw new Error(error.message);
    req.imgId = result.public_id;

    req.body.sub_category = JSON.parse(req.body.sub_category);
    req.body.features = JSON.parse(req.body.features);
    req.body.active_features = JSON.parse(req.body.active_features);
    req.body.buttons = JSON.parse(req.body.buttons);
    req.body.created_by = JSON.parse(req.body.created_by);
    req.body.ordering = parseInt(req.body.ordering);
    req.body.free_post = parseInt(req.body.free_post);
    req.body.icon = {
      url: result.secure_url,
      id: result.public_id,
    };

    await ordering(req.body.ordering);

    const newCategory = new Category(req.body);
    await newCategory.save((err: any) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "Added Successfully" });
      }
    });
  } catch (error) {
    await deleteImage(req.imgId);
    res.status(500).send({ message: "server error" });
  }
}
