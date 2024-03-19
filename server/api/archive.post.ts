export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project)
    return {
      success: false,
      data: null,
      message: "Projektas nerastas",
    };

  const projectData = project.toObject();

  const archivedProject = new archiveSchema(projectData);

  const data = await archivedProject.save();

  await projectSchema.findByIdAndDelete({ _id });

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į archyvą",
  };
});
