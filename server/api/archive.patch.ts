//done

export default defineEventHandler(async (event) => {
  const { _id, location } = await readBody(event);

  let archivedProject = null;

  if (location === "archive") {
    archivedProject = await archiveSchema.findById(_id);
  } else if (location === "unconfirmed") {
    archivedProject = await unconfirmedSchema.findById(_id);
  } else if (location === "deleted") {
    archivedProject = await deletedSchema.findById(_id);
  } else if (location === "backup") {
    archivedProject = await backupSchema.findById(_id);
  }

  if (!archivedProject)
    return {
      success: false,
      data: null,
      message: "Archyvuyotas projektas nerastas",
    };

  const currentDate = new Date();
  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
  const dateExparation = expirationDate.toISOString();

  archivedProject.dateExparation = dateExparation;
  const projectData = archivedProject.toObject();

  const project = new projectSchema(projectData);

  const data = await project.save();

  if (location === "archive") {
    await archiveSchema.findByIdAndDelete({ _id });
  } else if (location === "unconfirmed") {
    await unconfirmedSchema.findByIdAndDelete({ _id });
  } else if (location === "deleted") {
    await deletedSchema.findByIdAndDelete({ _id });
  } else if (location === "backup") {
    await backupSchema.findByIdAndDelete({ _id });
  }

  return {
    success: true,
    data: data,
    message: "Projektas perkeltas į projektus",
  };
});
