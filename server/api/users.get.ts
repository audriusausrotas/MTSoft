import { userSchema } from "../models/userSchema";

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

interface User {
  _id: string;
  email: string;
  password: string;
  username: string;
  verified: boolean;
  admin: boolean;
  photo: string;
}
