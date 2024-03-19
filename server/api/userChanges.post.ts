import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event: any) => {
  const { _id, value, userId, changeType } = await readBody(event);

  const data: User | null = await userSchema.findById(_id);

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

  const selectedUser: any = await userSchema.findById(userId);

  if (!selectedUser)
    return {
      success: false,
      data: null,
      message: "Pasirinktas vartotojas nerastas",
    };

  if (changeType === "admin") {
    selectedUser.accountType = value;

    const newUser = await selectedUser.save();
    newUser.password = "";

    return {
      success: true,
      data: newUser,
      message: "Pakeitimai atlikti",
    };
  }

  if (changeType === "verify") {
    selectedUser.verified = !selectedUser.verified;

    const newUser = await selectedUser.save();
    newUser.password = "";

    return {
      success: true,
      data: newUser,
      message: "Pakeitimai atlikti",
    };
  } else {
    return {
      success: false,
      data: null,
      message: "Neteisinga užklausa",
    };
  }
});
