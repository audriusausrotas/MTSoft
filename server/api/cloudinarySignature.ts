import { v2 as cloudinary } from "cloudinary";

export default eventHandler(async (event) => {
  const { paramsToSign } = await readBody(event);
  const config = useRuntimeConfig();
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    config.cloudinaryApiSecret!
  );

  return { signature };
});
