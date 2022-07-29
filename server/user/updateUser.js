import { firebase_server_init } from "../firebase/firebase_server_init";
import path from "path";
import base64ToImage from "base64-to-image";

firebase_server_init();

export async function updateUser(req, res) {
  try {
    if (req.query.camera) {
      const base64Str = req.body.image;
      const file_path = path.join(process.cwd(), "public", "users", "/");
      const optionalObj = { fileName: new Date().getTime(), type: "png" };
      const imageInfo = base64ToImage(base64Str, file_path, optionalObj);
      console.log(imageInfo);
    } else {
      console.log(req.file);
    }
    res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send(error);
  }
}
