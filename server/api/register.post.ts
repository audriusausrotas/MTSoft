import { userSchema } from "~/server/models/userSchema";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { email, password, retypePassword, username } = await readBody(event);

  if (!email || !password || !retypePassword || !username)
    return {
      success: false,
      data: null,
      message: "užpildykite visus laukus",
    };
  if (!email.includes("@"))
    return {
      success: false,
      data: null,
      message: "neteisingas elektroninis paštas",
    };
  if (email.length < 4)
    return {
      success: false,
      data: null,
      message: "elektroninis paštas per trumpas",
    };

  if (password !== retypePassword)
    return {
      success: false,
      data: null,
      message: "slaptažodžiai nesutampa",
    };

  if (password.length < 4)
    return {
      success: false,
      data: null,
      message: "slaptažodis per trumpas",
    };

  const userExists = await userSchema.findOne({ email });

  if (userExists)
    return { success: false, data: null, message: "Vartotojas jau egzistuoja" };

  const user = new userSchema({
    username,
    email,
    password: await bcrypt.hash(password, +process.env.SALT! as number),
  });

  const data = await user.save();

  data.password = "";

  return { success: true, data: null, message: "sekmingai prisiregistruota" };
});
