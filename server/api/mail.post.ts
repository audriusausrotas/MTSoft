import { sendEmail } from "~/utils/emailHelper";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event: any) => {
  const { userId, to, link, title } = await readBody(event);

  const user: User | null = await userSchema.findById(userId);

  if (!user)
    return {
      success: false,
      message: "Vartotojas nerastas",
    };

  let html = `
  <html>
<body>
    <p style="font-weight: 500"">Laba diena.</p> 
    <p style="font-weight: 500"">Tvoros pasiūlymą galite peržiūrėti paspaudę ant žemiau esančios nuorodos:</p>
    <a href="https://mtsoft.lt/pasiulymas/${link}" style="font-size: large; font-weight: 500"> Tvoros pasiūlymas</a>
    <br/>
    <br/>
    <br/>
    <br/>
    <div dir="auto">
        <span style="color:rgb(34, 34, 34);font-family:Arial, Helvetica, sans-serif;font-size: small">--</span>
        <span style="font-size: small"><br/></span>
        <span style="color:rgb(34, 34, 34);font-family:Arial, Helvetica, sans-serif;font-size: small">Pagarbiai,</span>
        <span style="font-size: small"><br/></span>
        <span style="font-size: small"><br/></span>
        <img height="auto" src="https://ci3.googleusercontent.com/mail-sig/AIorK4zCu_lclbKFFFaK1zc3I3KLAa0ziF68nA82jn1EFei1wF9QSJorYDnoF8DsH2GJm4mGsk5a0vM"/>
        <span style="font-size: small"><br/></span>
        <span style="font-size: small"><br/></span>
        <span style="color:var(--textColor);background-color:var(--backgroundColor);font-family:Arial, Helvetica, sans-serif;font-size: small">${user.username} ${user.lastName}</span>
        <span style="font-size: small"><br/></span>
        <a style="color:rgb(10, 132, 255);font-family:Arial, Helvetica, sans-serif;font-size: small" href="tel:${user.phone}">${user.phone}</a>
        <span style="font-size: small"><br/></span>
        <a style="font-family:Arial, Helvetica, sans-serif;font-size: small" href="mailto:${user.email}" target="_blank">${user.email}</a>
        <span style="font-size: small"><br/></span>
        <a style="font-family:Arial, Helvetica, sans-serif;font-size: small" href="mailto:info@modernitvora.lt" target="_blank">info@modernitvora.lt</a>
        <span style="font-size: small"><br/></span>
        <a style="font-family:Arial, Helvetica, sans-serif;font-size: small" href="http://www.modernitvora.lt/" target="_blank">www.modernitvora.lt</a>
        <span style="font-size: small"><br/></span>
        <span style="font-size: small"><br/></span>
        <img height="auto" src="https://ci3.googleusercontent.com/mail-sig/AIorK4wfuU34RbqGXJR-ortQoI9YmGMfkpKL-hY5fDONfReBjW39FIiEkWwLZ-q-ynS_GE-v_phA_5c"/>
        <span style="font-size: small"><br/></span>
        <span style="font-size: small"><br/></span>
        <span style="color:var(--textColor);background-color:var(--backgroundColor);font-family:Arial, Helvetica, sans-serif;font-size: small">PASTABA DĖL KONFIDENCIALUMO. Šis el. laiškas ir jo priedas (-ai) yra skirti tik tam asmeniui, kuriam jie adresuoti, o juose esanti informacija gali būti slapta ir (ar) konfidenciali. Tokios informacijos atskleidimas gali būti draudžiamas įstatymų. Griežtai draudžiama peržiūrėti, atskleisti, kopijuoti, platinti ar imtis bet kokių veiksmų, susijusių su šios informacijos panaudojimu, asmenims, kurie nėra numatyti kaip šio el. laiško gavėjai. Jei šį el. laišką gavote per klaidą, prašome apie tokios žinutės gavimą nedelsiant pranešti siuntėjui ir ištrinti žinutę ir visus jos priedus iš savo informacinės sistemos. Ačiū.</span>
    </div>
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
