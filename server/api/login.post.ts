import bcrypt from "bcrypt";
import { setCookie } from "h3";
import jwt from "jsonwebtoken";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email, password } = await readBody(event);

  if (!email || !password)
    return { success: false, data: null, message: "Užpildykite visus laukus" };
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
  if (password.length < 4)
    return {
      success: false,
      data: null,
      message: "Slaptažodis per trumpas",
    };

  const data = await userSchema.findOne({ email });

  if (!data) return { success: false, data: null, message: "Vartotojas nerastas" };

  if (!data.verified) return { success: false, data: null, message: "Vartotojas nepatvirtintas" };

  if (await bcrypt.compare(password, data.password)) {
    const token = jwt.sign(
      {
        id: data._id,
        email: data.email,
        verified: data.verified,
        accountType: data.accountType,
      },
      config.tokenSecret
    );

    data.password = "";

    setCookie(event, "mtud", token, {
      maxAge: 7776000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Token Secret:", process.env.TOKEN_SECRET);

    return { success: true, data: data, message: "" };
  } else {
    return { success: false, data: null, message: "Neteisingas slaptažodis" };
  }
});
