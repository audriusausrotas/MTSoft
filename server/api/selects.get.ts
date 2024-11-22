export default defineEventHandler(async (event) => {
  const data = await selectSchema.find();

  if (data.length === 0) {
    return { success: false, data: null, message: "Nustatymai nerasti" };
  }

  return { success: true, data: data[0], message: "" };
});
