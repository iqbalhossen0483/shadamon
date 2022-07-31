import { NextApiRequest, NextApiResponse } from "next";
import Location from "../schema/LocationSchema";
import { dbConnection } from "../services/mongoose/dbConnection";

export async function deleteLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await dbConnection();
    const result = await Location.deleteOne({ _id: req.headers.id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
}
