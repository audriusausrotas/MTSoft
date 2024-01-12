import { userSchema } from "~/server/models/userSchema";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event: any) => {
  const { _id, password, userId, changeType } = await readBody(event);

  const data: User | null = await userSchema.findById(_id);

  if (!data?.admin)
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

  if (changeType === "admin" || changeType === "verify") {
    selectedUser[changeType] = !selectedUser[changeType];

    const newUser = await selectedUser.save();

    newUser.password = "";

    return {
      success: true,
      data: newUser,
      message: "Pakeitimai atlikti",
    };
  } else if (changeType === "delete") {
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
  } else {
    return {
      success: false,
      data: null,
      message: "Neteisinga užklausa",
    };
  }
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
