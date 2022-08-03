import { NextApiResponse } from "next";
import { deleteImage } from "../cloudinary/deleteImage";
import { imageUpload } from "../cloudinary/imageUpload";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { ordering } from "./ordering";

export async function updateCategory(req: any, res: NextApiResponse) {
  try {
    req.body.created_by = JSON.parse(req.body.created_by);
    if (!req.body.created_by.uid) {
      res.status(401).send({ message: "Athentication Failed" });
      return;
    }

    await dbConnection();
    const _id = req.body.id;
    delete req.body.id;
    req.body.sub_category = JSON.parse(req.body.sub_category);
    req.body.features = JSON.parse(req.body.features);
    req.body.ordering = parseInt(req.body.ordering);

    if (req.file) {
      req.imgId = req.body.imgId;
      delete req.body.imgId;
      const { error, result } = await imageUpload(
        req.file.path,
        "/icons",
        100,
        100
      );
      if (error) throw new Error(error.message);
      req.body.icon = {
        url: result.secure_url,
        id: result.public_id,
      };
    } else {
      req.body.icon = JSON.parse(req.body.icon);
    }

    await ordering(req.body.ordering, req.body.parent_category);

    const result = await Category.updateOne({ _id }, req.body);
    if (result.modifiedCount > 0) {
      deleteImage(req.imgId);
    }
    res.send(result);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send({ message: error.messsage || "server error" });
  }
}

// const ondImg = req.body.url.split("/");
// deleteImage(`icons/${ondImg[ondImg.length - 1]}`);
// req.body.icon = `http://localhost:3000/icons/${req.file.filename}`;
