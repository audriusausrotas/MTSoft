// done

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

  cloudinaryBachDelete(project.files);
  await deleteVersions(project.versions);

  project.versions = [];

  const projectData = project.toObject();

  projectData.dateExparation = new Date().toISOString();

  const archivedProject = new archiveSchema({ ...projectData });

  const data = await archivedProject.save();

  await projectSchema.findByIdAndDelete(_id);
  await montavimasSchema.findByIdAndDelete(_id);

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į archyvą",
  };
});
