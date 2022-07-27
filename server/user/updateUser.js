import { firebase_server_init } from "../firebase/firebase_server_init";

firebase_server_init();

export async function updateUser(req, res) {
  try {
    console.log(req.file);

    res.send({ message: "success" });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
}
