//done

export default defineEventHandler(async (event) => {
  const data = await defaultValuesSchema.find();

  return { success: true, data: data[0], message: "" };
});
