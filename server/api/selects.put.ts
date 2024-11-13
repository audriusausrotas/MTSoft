export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const data = await selectSchema.findById(_id);

  if (!data) {
    return { success: false, data: null, message: "Užsakymas nerastas" };
  }
  const newValues = data.values.filter((item) => item.value !== value.value);
  data.values = [...newValues];

  const newData = await data.save();

  return { success: true, data: newData, message: "Ištrinta" };
});
