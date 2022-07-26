import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { firebase_server_init } from "../firebase/firebase_server_init";

firebase_server_init();

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    // if (req.query.uid) {
    // const user = await admin.auth().getUser(req.query.uid as string);
    //   res.status(200).send({ role: user.customClaims?.role || "User" });
    // }
    const allUser = await admin.auth().listUsers();
    res.send(allUser);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "server error" });
  }
}
