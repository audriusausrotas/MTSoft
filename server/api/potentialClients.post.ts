export default defineEventHandler(async (event) => {
  const { name, email, phone, address, status } = await readBody(event);

  const user = await potentialClientSchema.findOne({ email });
  const userUnsuscribed = await potentialUnsuscribedSchema.findOne({ email });

  if (user) {
    return { success: false, data: null, message: "Klientas jau egzistuoja" };
  }

  if (userUnsuscribed) {
    return {
      success: false,
      data: null,
      message: "Klientas atsisakė prenumeratos",
    };
  }

  const newUser = new potentialClientSchema({
    name,
    email,
    phone,
    address,
    status,
  });

  const data = await newUser.save();

  return { success: true, data, message: "Klientas sukurtas" };
});
