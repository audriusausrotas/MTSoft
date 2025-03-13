//done

export default defineEventHandler(async (event) => {
  const { value, field } = await readBody(event);

  if (!(field in defaultValuesSchema.schema.paths)) {
    return {
      success: false,
      message: `Field "${field}" does not exist in the schema.`,
    };
  }

  const data = await defaultValuesSchema.findOneAndUpdate(
    {},
    { [field]: value },
    { new: true, upsert: true }
  );

  return { success: true, data, message: "Pakeitimai atlikti" };
});
