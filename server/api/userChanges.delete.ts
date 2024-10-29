import type { User } from "~/data/interfaces";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event: any) => {
  const { selectedUserId, password, userId } = await readBody(event);

  const data: User | null = await userSchema.findById(userId);

  if (data?.accountType !== "Administratorius")
    return {
      success: false,
      data: null,
      message: "Vartotojas neturi teisių",
    };

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  const selectedUser: any = await userSchema.findById(selectedUserId);

  if (!selectedUser)
    return {
      success: false,
      data: null,
      message: "Pasirinktas vartotojas nerastas",
    };

  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (isPasswordValid) {
    await userSchema.findByIdAndDelete(selectedUserId);

    return {
      success: true,
      data: selectedUserId,
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
