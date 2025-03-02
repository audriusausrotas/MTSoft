import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";
import { deleteVersions } from "~/utils/deleteProjectVersions";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = await readBody(event);

    const project = await projectSchema.findById(_id);
    if (!project) {
      return {
        success: false,
        data: null,
        message: "Project not found",
      };
    }
    cloudinaryBachDelete(project.files);
    await deleteVersions(project.versions);

    const projectData = project.toObject();
    const unconfirmedProject = new unconfirmedSchema({ ...projectData });
    const savedData = await unconfirmedProject.save();

    if (!savedData) {
      return {
        success: false,
        data: null,
        message: "Klaida perkeliant projektą",
      };
    }

    await projectSchema.findByIdAndDelete(_id);
    await backupSchema.findByIdAndDelete(_id);

    return {
      success: true,
      data: savedData,
      message: "Projektas perkeltas ",
    };
  } catch (err: any) {
    console.error("Klaida perkeliant projektą: ", err.message);
    return {
      success: false,
      data: null,
      message: "Klaida perkeliant projektą: " + err.message,
    };
  }
});
