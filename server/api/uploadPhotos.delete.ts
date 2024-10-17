import { v2 as cloudinary } from "cloudinary";
import { Photo } from "~/data/interfaces";
export default defineEventHandler(async (event) => {
  const { _id, id, category } = await readBody(event);
  const config = useRuntimeConfig();

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
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  cloudinary.uploader.destroy(id);

  return { success: true, data: data, message: "Nuotrauka ištrinta" };
});
