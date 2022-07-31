import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { deleteLocation } from "../../../server/location/deleteLocation";
import { getLocation } from "../../../server/location/getLocation";
import { postLocation } from "../../../server/location/postLocation";
import { updateLocation } from "../../../server/location/updateLocation";

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(404).send({ message: "Page is not found" });
  },
})
  .post(postLocation)
  .get(getLocation)
  .delete(deleteLocation)
  .put(updateLocation);

export default handler;
