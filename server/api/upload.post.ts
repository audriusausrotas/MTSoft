import { v2 as cloudinary } from "cloudinary";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);
const tempDir = path.join(process.cwd(), "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default defineEventHandler(async (event) => {
  const form = new IncomingForm({
    keepExtensions: true,
    uploadDir: tempDir,
  });

  const parseForm = (req: any) => {
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err);
        }
        resolve({ fields, files });
      });
    });
  };

  //@ts-ignore
  const { files } = await parseForm(event.node.req);

  const uploadedFile = files.file[0];
  if (!uploadedFile) {
    throw new Error("Failas neįkeltas");
  }

  const result = await cloudinary.uploader.upload(uploadedFile.filepath, {
    resource_type: "auto",
    quality: "auto",
    fetch_format: "auto",
    transformation: [{ width: 800, crop: "limit" }],
  });

  await unlinkAsync(uploadedFile.filepath);

  if (result)
    return {
      success: true,
      data: result.url,
      message: "Nuotrauka įkelta",
    };
  else return { success: false, message: "Įvyko klaida" };
});
