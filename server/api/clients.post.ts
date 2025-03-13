//done

export default defineEventHandler(async (event) => {
  const { username, email, phone, address } = await readBody(event);

  const doesExist = await clientSchema.findOne({ email });

  if (doesExist) return { success: false, data: null, message: "Klientas jau egzistuoja" };

  const client = new clientSchema({
    username,
    email,
    phone,
    address,
  });

  const data = await client.save();

  return { success: true, data: data, message: "Klientas išsaugotas" };
});
