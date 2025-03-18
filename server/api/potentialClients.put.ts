export default defineEventHandler(async (event) => {
  const { _id, send, all, value } = await readBody(event);

  if (all) {
    const response = await potentialClientSchema.updateMany({}, { send: value });

    if (response.modifiedCount > 0)
      return {
        success: true,
        data: response,
        message: "Atnaujinta",
      };
    else
      return {
        success: false,
        data: null,
        message: "Klaida atnaujinant duomenis",
      };
  } else {
    const user = await potentialClientSchema.findByIdAndUpdate(_id, { send }, { new: true });

    if (!user) {
      return {
        success: false,
        data: null,
        message: "Klaida atnaujinant duomenis",
      };
    }

    return { success: true, data: user, message: "Atnaujinta" };
  }
});
