import multer from "multer";
import path from "path";

export function bodyParser(folder: string, fileSize: number) {
  const parser = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", folder));
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const imgName =
          file.originalname.replace(ext, "").replace(" ", "_").toLowerCase() +
          new Date().getTime() +
          ext;
        cb(null, imgName);
      },
    }),
    limits: {
      fileSize: fileSize,
    },
  });
  return parser;
}
