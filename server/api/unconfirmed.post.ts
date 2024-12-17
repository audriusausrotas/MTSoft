import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";
import { deleteVersions } from "~/utils/deleteProjectVersions";

export default defineEventHandler(async (event) => {
  try {
    // Parse the request body
    const { _id } = await readBody(event);

    // Fetch the project by ID
    const project = await projectSchema.findById(_id);
    if (!project) {
      return {
        success: false,
        data: null,
        message: "Project not found",
      };
    }

    // Backup project data to the unconfirmed schema
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

    // Delete project from the main schema
    await projectSchema.findByIdAndDelete(_id);
    await backupSchema.findByIdAndDelete({ _id });

    // Delete associated files in Cloudinary
    await cloudinaryBachDelete(project.files);

    cloudinaryBachDelete(project.files);

    // delete project versions
    const response = await deleteVersions(project.versions);

    if (!response.success)
      return { success: false, data: null, message: "Klaida trinant versijas" };

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
