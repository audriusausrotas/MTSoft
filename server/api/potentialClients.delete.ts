export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const user = await potentialClientSchema.findById(_id);

  if (!user) {
    return { success: false, data: null, message: "Klientas nerastas" };
  }
  await new potentialUnsuscribedSchema(user.toObject()).save();
  await potentialClientSchema.findByIdAndDelete(_id);

  return {
    success: true,
    data: null,
    message: "Klientas perkeltas į atsisakiusiųjų sąrašą",
  };
});
