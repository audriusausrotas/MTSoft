import { projectSchema } from "~/server/models/projectSchema";
import { archiveSchema } from "~/server/models/archiveSchema";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const archivedProject = await archiveSchema.findById({ _id });

  if (!archivedProject)
    return {
      success: false,
      data: null,
      message: "Archyvuyotas projektas nerastas",
    };

  const projectData = archivedProject.toObject();

  const project = new projectSchema(projectData);

  const data = await project.save();

  await archiveSchema.findByIdAndDelete({ _id });

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į projektus",
  };
});
