import type { Photo } from "~/data/interfaces";
import { v2 as cloudinary } from "cloudinary";
import { useRuntimeConfig } from "#imports";

export default async (photos: Photo[]) => {
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName as string,
    api_key: config.cloudinaryApiKey as string,
    api_secret: config.cloudinaryApiSecret as string,
  });

  const deletePromises = photos.map((photo) =>
    cloudinary.uploader.destroy(photo.id)
  );
  await Promise.all(deletePromises);
};
