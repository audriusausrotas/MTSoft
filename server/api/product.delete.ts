export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const data = await productSchema.findOneAndDelete({ _id });

  if (!data)
    return { success: false, data: null, message: "Produktas nerastas" };

  return { success: true, data: null, message: "Produktas ištrintas" };
});
