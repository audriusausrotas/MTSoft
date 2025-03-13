// done

export default defineEventHandler(async (event) => {
  const data = await clientSchema.find();

  if (data.length === 0) return { success: false, data: null, message: "Klientai nerasti" };

  return { success: true, data, message: "" };
});
