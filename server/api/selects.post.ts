export default defineEventHandler(async (event) => {
  const { field, value } = await readBody(event);

  const data = await selectSchema.findOneAndUpdate(
    {},
    { $push: { [field]: value } },
    { new: true, upsert: true }
  );

  if (!data) return { success: true, data: null, message: "Klaida" };

  return { success: true, data, message: "Išsaugota" };
});
