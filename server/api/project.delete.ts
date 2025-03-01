import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";
import { deleteVersions } from "~/utils/deleteProjectVersions";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project = await projectSchema.findById({ _id });
  if (!project) return { success: false, data: null, message: "Projektas nerastas" };
  cloudinaryBachDelete(project.files);

  await deleteVersions(project.versions);

  const projectData = project.toObject();

  projectData.dateExparation = new Date().toISOString();

  const deletedProject = new deletedSchema({ ...projectData });

  const deletedData = await deletedProject.save();

  if (!deletedData) return { success: false, data: null, message: "Klaida trinant projektą" };

  const data = await projectSchema.findByIdAndDelete({ _id });

  if (!data) return { success: false, data: null, message: "Klaida trinant projektą" };

  await montavimasSchema.findByIdAndDelete(_id);

  return { success: true, data: null, message: "Projektas ištrintas" };
});
