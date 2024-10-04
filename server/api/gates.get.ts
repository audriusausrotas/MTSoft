export default defineEventHandler(async (event) => {
  const data = await gateSchema.find();

  if (!data) return { success: false, data: null, message: "Vartai nerasti" };

  return { success: true, data, message: "" };
});
