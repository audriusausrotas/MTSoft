import { userSchema } from "~/server/models/userSchema";
import bcrypt from "bcrypt";
import { setCookie } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password)
    return { success: false, data: null, message: "užpildykite visus laukus" };
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
  if (password.length < 4)
    return {
      success: false,
      data: null,
      message: "slaptažodis per trumpas",
    };

  const data = await userSchema.findOne({ email });

  if (!data)
    return { success: false, data: null, message: "Vartotojas nerastas" };

  if (!data.verified)
    return { success: false, data: null, message: "Vartotojas nepatvirtintas" };

  if (await bcrypt.compare(password, data.password)) {
    const token = jwt.sign(
      {
        id: data._id,
        email: data.email,
        verified: data.verified,
        admin: data.admin,
      },
      process.env.TOKEN_SECRET! as string
    );

    data.password = "";

    await setCookie(event, "mtud", token, {
      maxAge: 2592000,
      domain: "modernitvora.vercel.app",
      path: "/",
      secure: true,
      sameSite: "none",
    });

    return { success: true, data: data, message: "" };
  }
});
