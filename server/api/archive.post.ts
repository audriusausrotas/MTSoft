import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";
import { deleteVersions } from "~/utils/deleteProjectVersions";

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

  projectData.dateExparation = new Date().toISOString();

  const archivedProject = new archiveSchema({ ...projectData });

  const data = await archivedProject.save();

  await projectSchema.findByIdAndDelete({ _id });

  cloudinaryBachDelete(project.files);

  const response = await deleteVersions(project.versions);

  if (!response.success)
    return { success: false, data: null, message: "Klaida trinant versijas" };

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į archyvą",
  };
});
