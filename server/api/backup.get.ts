export default defineEventHandler(async (event) => {
  // Fetch the backup data
  const project = await backupSchema.findById("66acc34d60a217bd964843fd");

  if (!project) {
    return {
      success: false,
      data: null,
      message: "Backup not found",
    };
  }

  // Create a new project document using the same _id
  const newProject = new projectSchema(project.toObject()); // Includes the _id

  try {
    // Save the new project document
    const savedProject = await newProject.save();

    return {
      success: true,
      data: savedProject,
      message: "Backup created with the same ID",
    };
  } catch (error) {
    // Handle any errors, such as duplicate key errors if _id already exists
    return {
      success: false,
      data: null,
      message: `Error creating backup`,
    };
  }
});
