import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { userId, field, value } = await readBody(event);
  const config = useRuntimeConfig();

  const data = await userSchema.findById(userId);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  if (field === "phone") data.phone = value;
  if (field === "name") data.lastName = value;
  if (field === "password") {
    if (value.trim() !== "") {
      data.password = await bcrypt.hash(value, +config.salt!);
    }
  }

  const newData = await data.save();

  newData.password = "";

  return { success: true, data: newData, message: "Pakeitimai išsaugoti" };
});
