import { sendEmail } from "~/utils/emailHelper";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event: any) => {
  const { userId, to, message, title } = await readBody(event);

  const user: User | null = await userSchema.findById(userId);

  if (!user)
    return {
      success: false,
      message: "Vartotojas nerastas",
    };

  let html = `
  <html>
<body>
    <p style="font-weight: 500"">Labas.</p> 
    <p style="font-weight: 500"">${message}</p>
</body>

  </html>
`;

  const emailResult = await sendEmail({
    to,
    subject: title || "Tvoros pasiūlymas",
    html,
    user,
  });

  return {
    success: emailResult.success,
    data: null,
    message: emailResult.success ? "Pasiūlymas išsiūstas" : emailResult.message,
  };
});
