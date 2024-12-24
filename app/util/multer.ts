import { randomUUID } from "crypto";
import multer from "multer";
import { resolve } from "path";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, resolve("files"));
  },
  filename(req, file, callback) {
    const ext = file?.originalname?.split(".").pop() ?? "";
    const filename = randomUUID().concat(".").concat(ext);
    callback(null, filename);
  },
});
