import type { User } from "~/data/interfaces";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: any) => {
  const { _id, to, message, title } = await readBody(event);
  const data: User | null = await userSchema.findById(_id);
  console.log(to);
  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  let fromPass: string = "";

  if (data.email.includes("audrius")) {
    fromPass = process.env.NODEMAILER_PASS_AUDRIUS!;
  } else if (data.email.includes("andrius")) {
    fromPass = process.env.NODEMAILER_PASS_ANDRIUS!;
  } else if (data.email.includes("pardavimai")) {
    fromPass = process.env.NODEMAILER_PASS_HARIS!;
  }

  let htmlContent = `
  <html>
<body>
    <p style="font-weight: 500"">Labas.</p> 
    <p style="font-weight: 500"">${message}</p>
</body>

  </html>
`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: data.email,
      pass: fromPass,
    },
  });

  try {
    await transporter.sendMail({
      from: "Moderni Tvora " + data.email,
      to: to,
      subject: title,
      html: htmlContent,
    });
    return {
      success: true,
      data: null,
      message: "Pasiūlymas išsiūstas",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Klaida: " + error,
    };
  }
});
