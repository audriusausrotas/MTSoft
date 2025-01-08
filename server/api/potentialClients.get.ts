export default defineEventHandler(async (event) => {
  const users = await potentialClientSchema.find();

  if (users.length === 0) {
    return { success: true, data: null, message: "Vartotojai nerasti" };
  }

  const statusOrder = ["Nežinoma", "Domina", "Nelabai domina", "Nedomina"];

  users.sort((a, b) => {
    const statusA = statusOrder.indexOf(a.status);
    const statusB = statusOrder.indexOf(b.status);
    return statusA - statusB;
  });

  return { success: true, data: users, message: "" };
});
