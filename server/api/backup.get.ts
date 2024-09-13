export default defineEventHandler(async (event) => {
  const projects = await projectSchema.find();

  if (projects.length === 0)
    return {
      success: false,
      data: null,
      message: "Projektai nerasti",
    };

  const filteredProjects = projects.filter(
    (item) => item.status !== "Nepatvirtintas"
  );

  await backupSchema.insertMany(filteredProjects);

  return {
    success: true,
    data: null,
    message: "Backup created",
  };
});
