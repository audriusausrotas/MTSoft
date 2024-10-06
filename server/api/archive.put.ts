export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);
  const data = await archiveSchema.findById(id);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Archyvuotų projektų nerasta",
    };

  return {
    success: true,
    data: data,
    message: "Archyvuoti projektai rasti",
  };
});
