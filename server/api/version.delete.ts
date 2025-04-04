export default defineEventHandler(async (event) => {
  try {
    const { _id, projectId } = await readBody(event);

    await versionsSchema.findByIdAndDelete(_id);

    const project = await projectSchema.findById(projectId);

    if (!project) return { success: false, data: null, message: "Projektas nerastas" };

    project.versions = project.versions.filter(
      (version) => version.id.toString() !== _id.toString()
    );

    const newProject = await project.save();

    return { success: true, data: newProject, message: "Versija ištrinta" };
  } catch (error) {
    console.error("Klaida trinant projektą:", error);
    return { success: false, data: null, message: error };
  }
});
