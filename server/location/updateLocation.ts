import { NextApiRequest, NextApiResponse } from "next";
import Location from "../schema/LocationSchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { ordering } from "./ordering";

export async function updateLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body.created_by.uid) {
      res.status(401).send({ message: "Athentication Failed" });
      return;
    }

    await dbConnection();
    req.body.ordering = parseInt(req.body.ordering);
    await ordering(req.body.ordering);
    const result = await Location.updateOne({ _id: req.query.id }, req.body);
    res.send(result);
  } catch (error: any) {
    res
      .status(error.status || 500)
      .send({ message: error.message || "server error" });
  }
}
