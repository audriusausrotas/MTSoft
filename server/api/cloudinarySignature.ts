import { v2 as cloudinary } from "cloudinary";

export default eventHandler(async (event) => {
  const { paramsToSign } = await readBody(event);
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return { signature };
});
