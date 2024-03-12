import { userSchema } from "~/server/models/userSchema";
import type { User } from "~/data/interfaces";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event: any) => {
  const { _id, password, userId } = await readBody(event);

  const data: User | null = await userSchema.findById(_id);


  if (data?.accountType !== "Administratorius")
    return {
      success: false,
      data: null,
      message: "Vartotojas neturi teisiu",
    };

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  const selectedUser: any = await userSchema.findById(userId);

  if (!selectedUser)
    return {
      success: false,
      data: null,
      message: "Pasirinktas vartotojas nerastas",
    };

  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (isPasswordValid) {
    await userSchema.findByIdAndDelete(userId);

    return {
      success: true,
      data: userId,
      message: "Pakeitimai atlikti",
    };
  } else {
    return {
      success: false,
      data: null,
      message: "Klaidingas slaptažodis",
    };
  }
});
