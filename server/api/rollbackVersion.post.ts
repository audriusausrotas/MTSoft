export default defineEventHandler(async (event) => {
  const { _id, projectId } = await readBody(event);

  const project = await projectSchema.findById(projectId);

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const rollbackVersion = await versionsSchema.findById(_id);

  if (!rollbackVersion) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  rollbackVersion.versions = [...project.versions];

  return { success: true, data: rollbackVersion, message: "" };
});
