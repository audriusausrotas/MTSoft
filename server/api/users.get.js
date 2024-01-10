import { userSchema } from "../models/userSchema";

export default defineEventHandler(async (event) => {
  const data = await userSchema.find();

  if (!data)
    return { success: false, data: null, message: "Vartotojai nerasti" };

  const updatedData = data.map((item) => {
    item.password = "";
    return item;
  });

  return { success: true, data: updatedData, message: "" };
});
