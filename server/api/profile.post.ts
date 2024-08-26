import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { _id, field, value } = await readBody(event);

  const data = await userSchema.findById(_id);

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
      data.password = await bcrypt.hash(value, +process.env.SALT!);
    }
  }

  const newData = await data.save();

  newData.password = "";

  return { success: true, data: newData, message: "Pakeitimai išsaugoti" };
});
