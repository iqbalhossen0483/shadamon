import path from "path";
import fs from "fs";

export function deleteImage(file_path: string) {
  const file = path.join(process.cwd(), "public", file_path);
  fs.unlink(file, (err) => {
    if (err) console.log("image deleted successfully");
    else {
      console.log("an error occured when deleting image");
    }
  });
}
