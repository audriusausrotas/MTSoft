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

  if (to.length === 0) {
    return {
      success: false,
      message: "Gavėjų sąrašas yra tuščias",
    };
  }

  let html = `
  <html>
<body>
    <p style="font-weight: 500"">Labas.</p> 
    <p style="font-weight: 500"">${message}</p>
</body>

  </html>
`;

  const success = [];

  for (const recipient of to) {
    const emailResult = await sendEmail({
      to: recipient.email,
      subject: title || "Tvoros pasiūlymas",
      html,
      user,
    });

    success.push({ success: emailResult.success, email: recipient.email });
  }

  const allSuccess = success.every((status) => {
    if (status.success) return true;
    else {
    }
  });

  if (allSuccess)
    return {
      success: true,
      data: null,
      message: "Pasiūlymai išsiūsti",
    };
  else {
    success.forEach((status) => {
      if (!status.success) console.log(status.email);
    });

    return {
      success: false,
      data: null,
      message: "Kai kurie pasiūlymai neišsiūsti",
    };
  }
});
