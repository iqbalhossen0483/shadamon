import type { NextApiRequest, NextApiResponse } from "next";
import { bodyParser } from "../../../server/services/multer/multer";
import nc from "next-connect";
import { postCategory } from "../../../server/category/postCategory";
import { getCategory } from "../../../server/category/getCategory";
import { deleteCategory } from "../../../server/category/deleteCategory";

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
  .post(multer.single("icon"), postCategory)
  .get(getCategory)
  .delete(deleteCategory);

export default handler;
