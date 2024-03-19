export default defineEventHandler(async () => {
  const data = await projectSchema.find();

  if (!data)
    return { success: false, data: null, message: "Projektai nerasti" };

  data.reverse();

  return { success: true, data, message: "" };
});
