import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { userId } = await readBody(event);

  if (!userId)
    return {
      success: false,
      data: null,
      message: "Žetonas neegzistuoja",
    };

  const data: User | null = await userSchema.findById(userId);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  data.password = "";

  return { success: true, data: data, message: "" };
});
