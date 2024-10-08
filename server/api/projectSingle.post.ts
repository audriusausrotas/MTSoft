export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project = await projectSchema.findById(_id);

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  return { success: true, data: project, message: "" };
});
