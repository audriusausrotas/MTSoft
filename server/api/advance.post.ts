export default defineEventHandler(async (event) => {
  const { _id, advance } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project)
    return {
      success: false,
      data: null,
      message: "Projektas nerastas",
    };

  project.advance = advance;

  const data = await project.save();

  return {
    success: true,
    data: data,
    message: "",
  };
});
