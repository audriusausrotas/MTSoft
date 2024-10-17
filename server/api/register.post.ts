import { userSchema } from "~/server/models/userSchema";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password, retypePassword, username } = await readBody(event);
  const config = useRuntimeConfig();

  if (!email || !password || !retypePassword || !username)
    return {
      success: false,
      data: null,
      message: "Užpildykite visus laukus",
    };
  if (!email.includes("@"))
    return {
      success: false,
      data: null,
      message: "Neteisingas elektroninis paštas",
    };
  if (email.length < 4)
    return {
      success: false,
      data: null,
      message: "Elektroninis paštas per trumpas",
    };

  if (password !== retypePassword)
    return {
      success: false,
      data: null,
      message: "Slaptažodžiai nesutampa",
    };

  if (password.length < 4)
    return {
      success: false,
      data: null,
      message: "Slaptažodis per trumpas",
    };

  const userExists = await userSchema.findOne({ email });

  if (userExists)
    return { success: false, data: null, message: "Vartotojas jau egzistuoja" };

  const user = new userSchema({
    username,
    email,
    password: await bcrypt.hash(password, +config.salt! as number),
  });

  const data = await user.save();

  data.password = "";

  return { success: true, data: null, message: "Sėkmingai prisiregistruota" };
});
