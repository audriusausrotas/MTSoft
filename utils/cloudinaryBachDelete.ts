import type { Photo } from "~/data/interfaces";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (photos: Photo[]) => {
  const deletePromises = photos.map((photo) =>
    cloudinary.uploader.destroy(photo.id)
  );
  await Promise.all(deletePromises);
};
