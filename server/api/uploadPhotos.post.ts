export default defineEventHandler(async (event) => {
  const { photo, _id, category } = await readBody(event);

  let data: any;

  switch (category) {
    case "profile":
      data = await userSchema.findById(_id);
      break;
    case "projects":
      data = await projectSchema.findById(_id);
      break;
    case "production":
      data = await gamybaSchema.findById(_id);
      break;
    case "installation":
      data = await montavimasSchema.findById(_id);
      break;

    default:
      break;
  }

  if (!data)
    return {
      success: false,
      data: null,
      message: "Nerastas",
    };

  if (category === "profile") data.photo = photo;
  else data.files.push(photo);

  const result = await data.save();

  if (category === "profile") result.password = "";

  return { success: true, data: result, message: "Nuotrauka išsaugota" };
});
