export default defineEventHandler(async (event) => {
  const { _id, values } = await readBody(event);

  const data = await selectSchema.findById(_id);

  if (!data) {
    return { success: false, data: null, message: "Užsakymas nerastas" };
  }

  const newData = await data.save();

  return { success: true, data: newData, message: "Sukurta" };
});
