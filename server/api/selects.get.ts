export default defineEventHandler(async (event) => {
  const data = await selectSchema.find();

  if (!data) {
    return { success: false, data: null, message: "" };
  }
  return { success: true, data, message: "" };
});
