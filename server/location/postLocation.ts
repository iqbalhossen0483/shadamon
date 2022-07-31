import { NextApiRequest, NextApiResponse } from "next";
import Location from "../schema/LocationSchema";
import { dbConnection } from "../services/mongoose/dbConnection";
import { ordering } from "./ordering";

export async function postLocation(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnection();
    // check if exist
    const isExist = await Location.findOne({
      location_name: req.body.location_name,
    });
    if (isExist) {
      res.status(409).send({ message: "Already exist this Location" });
      return;
    }

    req.body.ordering = parseInt(req.body.ordering);
    await ordering(req.body.ordering);

    const DbLocation = new Location(req.body);
    await DbLocation.save((err: any) => {
      if (err) {
        res.status(err.status || 500).send({ message: err.message });
      } else {
        res.send({ message: "Location added successfully" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: "server error" });
  }
}
