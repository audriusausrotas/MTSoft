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
    <p style="font-weight: 500"">Laba diena. Tvoros pasiūlymą galite peržiūrėti paspaudę and žemiau esančios nuorodos:</p>
    <a href="https://modernitvora.vercel.app/pasiulymas/${link}" style="font-size: large; font-weight: 500"> Tvoros pasiūlymas</a>
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
        <span style="color:var(--textColor);background-color:var(--backgroundColor);font-family:Arial, Helvetica, sans-serif;font-size: small">${data.username} ${data.lastName}</span>
        <span style="font-size: small"><br/></span>
        <a style="color:rgb(10, 132, 255);font-family:Arial, Helvetica, sans-serif;font-size: small" href="tel:${data.phone}">${data.phone}</a>
        <span style="font-size: small"><br/></span>
        <a style="font-family:Arial, Helvetica, sans-serif;font-size: small" href="mailto:${data.email}" target="_blank">${data.email}</a>
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
      // pakeist gaveja i to
      to: data.email,
      subject: "Tvoros pasiūlymas",
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
