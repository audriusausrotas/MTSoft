export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  project.status = value;
  const data = await project.save();

  return { success: true, data: data, message: "Būsena atnaujinta" };
});
