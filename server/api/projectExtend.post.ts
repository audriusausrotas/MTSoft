export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: any = await projectSchema.findById(_id);

  if (!project)
    return {
      success: false,
      data: null,
      message: "Projektas nerastas",
    };

  const currentDate = new Date();
  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
  const dateExparation = expirationDate.toISOString();

  project.dateExparation = dateExparation;

  const data = await project.save();

  return {
    success: true,
    data: data,
    message: "Galiojimo laikas pratęstas",
  };
});
