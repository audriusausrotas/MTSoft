import { userSchema } from "../models/userSchema";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event: any) => {
  const data: User[] = await userSchema.find();

  if (!data)
    return { success: false, data: null, message: "Vartotojai nerasti" };

  const updatedData = data.map((item) => {
    item.password = "";
    return item;
  });

  return { success: true, data: updatedData, message: "" };
});
