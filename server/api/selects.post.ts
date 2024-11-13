export default defineEventHandler(async (event) => {
  const { name } = await readBody(event);

  const doesExist = await selectSchema.findOne({ name });

  if (doesExist) {
    return { success: false, data: null, message: "Nustatymas jau egzistuoja" };
  }

  const newSelect = new selectSchema({ name, values: [] });

  const data = await newSelect.save();

  return { success: true, data, message: "" };
});
