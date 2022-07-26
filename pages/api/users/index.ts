import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "../../../server/user/getUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  switch (req.method) {
    case "GET":
      getUser(req, res);
      break;

    case "POST":
      // addUser(req, res);
      break;

    case "PUT":
      // updateUser(req, res);
      break;

    case "DELETE":
      // deleteUser(req, res);
      break;

    default:
      res.status(404).send({ message: "not found" });
      break;
  }
}
