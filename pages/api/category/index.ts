import type { NextApiRequest, NextApiResponse } from "next";
import { bodyParser } from "../../../server/services/multer/multer";
import nc from "next-connect";
import { postCategory } from "../../../server/category/postCategory";
import { getCategory } from "../../../server/category/getCategory";
import { deleteCategory } from "../../../server/category/deleteCategory";
import { updateCategory } from "../../../server/category/updateCategory";

export const config = {
  api: {
    bodyParser: false,
  },
};

const multer = bodyParser("icons", 100000);

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(404).send({ message: "Page is not found" });
  },
})
  .use(multer.single("icon"))
  .post(postCategory)
  .get(getCategory)
  .delete(deleteCategory)
  .put(updateCategory);

export default handler;
