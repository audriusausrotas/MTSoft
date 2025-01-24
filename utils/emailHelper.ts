import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, user }: any) {
  const config = useRuntimeConfig();

  let fromPass: string = "";

  if (user.email.includes("audrius")) {
    fromPass = config.nodemailerPassAudrius!;
  } else if (user.email.includes("andrius")) {
    fromPass = config.nodemailerPassAndrius!;
  } else if (user.email.includes("pardavimai")) {
    fromPass = config.nodemailerPassHaris!;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.email,
      pass: fromPass,
    },
  });

  try {
    await transporter.sendMail({
      from: "Moderni Tvora " + user.email,
      to,
      subject: subject,
      html,
    });
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error: " + error.message,
    };
  }
}
