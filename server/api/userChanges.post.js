import { userSchema } from "../models/userSchema";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { _id, password, userId, changeType } = await readBody(event);

  const data = await userSchema.findById(_id);

  if (!data.admin)
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

  const selectedUser = await userSchema.findById(userId);

  if (changeType === "admin") {
    selectedUser.admin = !selectedUser.admin;

    const newUser = await selectedUser.save();

    newUser.password = "";

    return {
      success: true,
      data: newUser,
      message: "Pakeitimai atlikti",
    };
  } else if (changeType === "verify") {
    selectedUser.verified = !selectedUser.verified;

    const newUser = await selectedUser.save();

    newUser.password = "";

    return {
      success: true,
      data: newUser,
      message: "Pakeitimai atlikti",
    };
  } else if (changeType === "delete") {
    if (await bcrypt.compare(password, data.password)) {
      await userSchema.findByIdAndDelete(userId);

      return {
        success: true,
        data: userId,
        message: "Pakeitimai atlikti",
      };
    } else {
      return { success: false, data: null, message: "Klaidingas slaptažodis" };
    }
  } else {
    return {
      success: false,
      data: null,
      message: "Neteisinga užklausa",
    };
  }
});
