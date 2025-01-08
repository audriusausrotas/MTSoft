export default defineEventHandler(async (event) => {
  const { _id, name, email, phone, address, status } = await readBody(event);

  const user = await potentialClientSchema.findByIdAndUpdate(
    _id,
    { name, email, phone, address, status },
    { new: true }
  );

  if (!user) {
    return {
      success: false,
      data: null,
      message: "Klaida atnaujinant duomenis",
    };
  }

  return { success: true, data: user, message: "Klientas atnaujintas" };
});
