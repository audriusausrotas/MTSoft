export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });
  const users = await userSchema.find();
  let newUser = users.find((item) => item.username === value);

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  project.creator = newUser!;
  const data = await project.save();

  return { success: true, data: data, message: "Atsakingas amuo pakeistas" };
});
