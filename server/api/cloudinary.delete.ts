// done

import { v2 as cloudinary } from "cloudinary";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  await cloudinary.uploader.destroy(id);

  return { success: true, data: null, message: "Nuotrauka ištrinta" };
});
