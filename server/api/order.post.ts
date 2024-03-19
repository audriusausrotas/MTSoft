export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const data = await projectSchema.findById({ _id });

  if (!data)
    return { success: false, data: null, message: "Užsakymas nerastas" };

  return { success: true, data: data, message: "Užsakymas rastas" };
});
