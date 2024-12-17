export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  let data = await archiveSchema.findById(id);

  if (!data) {
    data = await unconfirmedSchema.findById(id);
  }

  if (!data) {
    data = await deletedSchema.findById(id);
  }

  if (!data) {
    data = await backupSchema.findById(id);
  }

  if (!data) {
    data = await versionsSchema.findById(id);
  }

  if (!data)
    return {
      success: true,
      data: null,
      message: "Projektas nerastas",
    };

  return {
    success: true,
    data: data,
    message: "",
  };
});
