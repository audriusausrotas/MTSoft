export default defineEventHandler(async (event) => {
  const { url, _id, public_id } = await readBody(event);

  const data = await userSchema.findById(_id);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  data.photo = { url, id: public_id };

  const newData = await data.save();

  newData.password = "";

  return { success: true, data: newData, message: "Nuotrauka išsaugota" };
});
