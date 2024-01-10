import { productSchema } from "../models/productSchema";

export default defineEventHandler(async () => {
  const data = await productSchema.find();

  if (!data)
    return { success: false, data: null, message: "Produktai nerasti" };
  
  return { success: true, data, message: "done" };
});
