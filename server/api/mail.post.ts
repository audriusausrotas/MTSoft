import { userSchema } from "~/server/models/userSchema";
import type { User } from "~/data/interfaces";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: any) => {
  const { _id, to } = await readBody(event);
  const data: User | null = await userSchema.findById(_id);

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "audrius@modernitvora.lt",
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: "MT",
      to: "sopuku@gmail.com",
      subject: "test",
      text: "asdasd",
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
