import { sendEmail } from "~/utils/emailHelper";
import type { User } from "~/data/interfaces";
import path from "path";

export default defineEventHandler(async (event: any) => {
  const { userId, to, message, title } = await readBody(event);

  const user: User | null = await userSchema.findById(userId);

  if (!user)
    return {
      success: false,
      message: "Vartotojas nerastas",
    };

  const filePath = path.resolve("data/Kainininkas.pdf");

  const success = [];

  for (const recipient of to) {
    let html = `
    <html>
  <body>
      <p >Sveiki,</p> 
      <br/>
      <br/>
      <p>Mes esame vieni didžiausių skardinių tvorų gamintojai Lietuvoje. Specializuojamės populiariausių tvorų modelių gamyboje. 
      Didžiausią dėmesį kreipiame į gaminių kokybę ir pristatymo terminą, kuris reikalui esant gali būti ir 2 darbo dienos.
      Keletas faktų, kodėl verta rinktis mus:</p>
      <br/>
      <ol>
        <li>Kokybė - gamybai naudojami naujiausi įrengimai su inovatyvia gamybos valdymo sistema, 
            kuri užtikrina gamybos procesą be klaidų.</li>
        <li>Patogumas - tvora gaminama pagal kliento pateiktą tarpų numeraciją ir visi pakai yra supakuojami ir sunumeruojami, 
            jog atitiktų jūsų pateiktą numeraciją ir nereikėtų objekte gaišti laiko atisrenkant, kur kokios lamelės turi dėtis.</li>
        <li>Lankstumas - tvoros gaminius galime pasiūlyti iš PREMIUM klasės skardos su 45m. garantija ir ECO variantą su 5m. garantija.</li>
        <li>Greitis - gamybos su pristatymu terminas - 7 darbo dienos, reikalui esant, galim pagaminti per 2 darbo dienas. Taip pat, pristatome gaminius visoje Lietuvoje.</li>
        <li>Inovatyvumas - mes nuolat atnaujiname tiek gaminių dizainą, tiek pačius procesus, jog pagerintume montavimo greitį, gaminių kokybę 
            ir visada atsižvelgiame į mūsų klientų pasiūlymus.</li>
        <li>Pagalba - į pagalbą galime pasiūlyti vieną iš savo betonuotojų ar montuotojų brigadų.</li>
      </ol>
      <br/>
      <p>Prašome patyrinėti mūsų didmenos kainyną, ir jei nuspręsite pasirinkti mus kaip savo tvorų tiekėją, mes dėsime visas pastangas, 
          kad atitiktume jūsų lūkesčius.</p> 
      <br/>
      <p>Kainininką galite peržiūrėti paspaudę šią nuorodą: <a href="https://modernitvora.vercel.app/didmena" style="font-size: large; font-weight: 500">Kainininkas</a></p> 
      
      <br/>
      <p> Jei turėsite klausimų, nedvejodami kreipkitės.</p>
      <br/>
      <br/>
      <a href="https://modernitvora.vercel.app/didmena/atsisakyti/${recipient._id}" style="font-size: large; font-weight: 500">Atsisakyti naujienlaikraščio prenumeratos</a>
  </body>
    </html>
  `;

    const emailResult = await sendEmail({
      to: recipient.email,
      subject: title,
      html,
      user,
      attachments: [
        {
          filename: "Kainininkas.pdf",
          path: filePath,
          contentType: "application/pdf",
        },
      ],
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
