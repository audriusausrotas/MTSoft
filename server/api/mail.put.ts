import type { User } from "~/data/interfaces";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event: any) => {
  const { userId, to, message, title } = await readBody(event);
  const data: User | null = await userSchema.findById(userId);
  const config = useRuntimeConfig();

  if (!data)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  let fromPass: string = "";

  if (data.email.includes("audrius")) {
    fromPass = config.nodemailerPassAudrius!;
  } else if (data.email.includes("andrius")) {
    fromPass = config.nodemailerPassAndrius!;
  } else if (data.email.includes("pardavimai")) {
    fromPass = config.nodemailerPassHaris!;
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
