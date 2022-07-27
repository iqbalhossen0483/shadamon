import type { NextApiRequest, NextApiResponse } from "next";
import { bodyParser } from "../../../server/services/body_parser";
import { getUser } from "../../../server/user/getUser";
import { updateUser } from "../../../server/user/updateUser";
import nc from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const multer = bodyParser("users", 300000);

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .get(getUser)
  .put(multer.single("profile"), updateUser);

export default handler;
