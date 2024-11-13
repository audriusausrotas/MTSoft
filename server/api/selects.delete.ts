export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const select = await selectSchema.findByIdAndDelete(_id);

  if (!select) return { success: false, data: null, message: "Klaida" };

  return { success: true, data: null, message: "Ištrinta" };
});
