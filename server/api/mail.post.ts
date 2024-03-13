import { userSchema } from "~/server/models/userSchema";
import type { User } from "~/data/interfaces";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: any) => {
  const { _id, to, link } = await readBody(event);
  const data: User | null = await userSchema.findById(_id);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  let fromPass: string = "";

  if (data.email.includes("audrius"))
    fromPass = process.env.NODEMAILER_PASS_AUDRIUS!;
  else if (data.email.includes("andrius"))
    fromPass = process.env.NODEMAILER_PASS_ANDRIUS!;
  else if (data.email.includes("pardavimai"))
    fromPass = process.env.NODEMAILER_PASS_HARIS!;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: data.email,
      pass: fromPass,
    },
  });

  try {
    await transporter.sendMail({
      from: "Moderni Tvora",
      to: "sopuku@gmail.com",
      subject: "Tvoros pasiūlymas",
      text:
        "Laba diena. Tvoros pasiūlymą galite peržiūrėti čia: https://modernitvora.vercel.app/pasiulymas/" +
        link,
    });
    return {
      success: true,
      data: null,
      message: "Meilas issiustas",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
});
