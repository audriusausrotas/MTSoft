import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project = await projectSchema.findById({ _id });
  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  const data = await projectSchema.findOneAndDelete({ _id });

  if (!data)
    return { success: false, data: null, message: "Klaida trinant projektą" };

  cloudinaryBachDelete(project.files);

  return { success: true, data: null, message: "Projektas ištrintas" };
});
