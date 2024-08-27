import { v2 as cloudinary } from "cloudinary";
import { Photo } from "~/data/interfaces";
export default defineEventHandler(async (event) => {
  const { _id, id, category } = await readBody(event);

  let data: any;

  switch (category) {
    case "projects":
      data = await projectSchema.findById(_id);
      break;
    case "production":
      data = await gamybaSchema.findById(_id);
      break;
    case "installation":
      data = await montavimasSchema.findById(_id);
      break;

    default:
      break;
  }

  if (!data)
    return {
      success: false,
      data: null,
      message: "Nerastas",
    };

  data.files = data.files.filter((item: Photo) => item.id !== id);

  await data.save();

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  cloudinary.uploader.destroy(id);

  return { success: true, data: null, message: "Nuotrauka ištrinta" };
});
