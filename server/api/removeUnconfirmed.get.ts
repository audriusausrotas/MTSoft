import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";
import { deleteVersions } from "~/utils/deleteProjectVersions";

export default defineEventHandler(async () => {
  try {
    const projects = await projectSchema.find();
    if (!projects.length) {
      return {
        success: false,
        data: null,
        message: "Project not found",
      };
    }

    const currentDate = new Date();

    const deletionPromises = projects.map(async (project) => {
      if (project.status === "Nepatvirtintas" || project.status === "Netinkamas") {
        const expirationDate = new Date(project.dateExparation);

        if (currentDate > expirationDate) {
          await cloudinaryBachDelete(project.files);
          await deleteVersions(project.versions);

          const projectData = project.toObject();
          const unconfirmedProject = new unconfirmedSchema({ ...projectData });
          await unconfirmedProject.save();

          await projectSchema.findByIdAndDelete(project._id);
          await backupSchema.findByIdAndDelete(project._id);
        }
      }
    });

    await Promise.all(deletionPromises);

    return {
      success: true,
      data: null,
      message: "Projects cleaned up successfully",
    };
  } catch (err: any) {
    console.error("Error cleaning up projects: ", err.message);
    return {
      success: false,
      data: null,
      message: "Error cleaning up projects: " + err.message,
    };
  }
});
