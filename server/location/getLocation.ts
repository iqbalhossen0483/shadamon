import { NextApiRequest, NextApiResponse } from "next";
import Location from "../schema/LocationSchema";
import { dbConnection } from "../services/mongoose/dbConnection";

export async function getLocation(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnection();
    if (req.query.id) {
      const result = await Location.findOne({ _id: req.query.id });
      res.send(result);
    } else {
      const result = await Location.find({}).sort({ ordering: 1 });
      res.send(result);
    }
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
}
