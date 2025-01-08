export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const user = await potentialClientSchema.findByIdAndDelete(_id);

  if (!user) {
    return { success: false, data: null, message: "Klaida trinant klientą" };
  }

  return { success: true, data: null, message: "Klientas ištrintas" };
});
