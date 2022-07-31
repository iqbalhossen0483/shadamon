import { NextApiRequest, NextApiResponse } from "next";
import Category from "../schema/CategorySchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { deleteImage } from "../cloudinary/deleteImage";

export async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnection();
    const result = await Category.deleteOne({ _id: req.headers.id });
    if (result.deletedCount > 0) {
      if (req.headers.icon) {
        await deleteImage(req.headers.icon);
      }
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
}

// const icon = (<string>req.headers.icon).split("/");
// deleteImage(`icons/${icon[icon.length - 1]}`);
