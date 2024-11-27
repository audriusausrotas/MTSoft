import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";

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

  const unconfirmedProject = new unconfirmedSchema({ ...projectData });

  const data = await unconfirmedProject.save();

  await projectSchema.findByIdAndDelete({ _id });

  cloudinaryBachDelete(project.files);

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į nepatvirtintus",
  };
});
