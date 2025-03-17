import { sendEmail } from "~/utils/emailHelper";

export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  project.status = value;
  const data = await project.save();

  if (!data) return { success: true, data: null, message: "Klaida" };

  if (value === "Patvirtintas") {
    const backupProject = await backupSchema.findById({ _id });
    if (!backupProject) {
      const projectData = data.toObject();
      const newBackup = new backupSchema(projectData);
      await newBackup.save();
    }
  }

  if (value === "Apmokėjimas") {
    let comments = project.comments
      .map(
        (comment) => `
    <tr>
      <td>${comment.date.slice(0, 16).replace("T", " ")}</td>
      <td>${comment.creator}</td>
      <td>${comment.comment}</td>


    </tr>`
      )
      .join("");

    let materialsList = project.results
      .map(
        (result) => `
    <tr>
      <td>${result.type}</td>
      <td>${result.color}</td>
      <td>${result.quantity}</td>
      <td>${result.cost} €</td>
      <td>${result.price} €</td>
      <td>${result.totalCost} €</td>
      <td>${result.totalPrice} €</td>
    </tr>`
      )
      .join("");

    let workList = project.works
      .map(
        (result) => `
    <tr>
      <td>${result.name}</td>
      <td>${result.quantity}</td>
      <td>${result.cost} €</td>
      <td>${result.price} €</td>
      <td>${result.totalCost} €</td>
      <td>${result.totalPrice} €</td>
    </tr>`
      )
      .join("");

    let html = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
      }
      h2 {
        color: #333;
      }
      .section-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .info-table, .finance-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .info-table th, .info-table td,
      .finance-table th, .finance-table td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
      }
      .info-table th, .finance-table th {
        background-color: #f4f4f4;
        font-weight: bold;
      }
      .highlight {
        font-weight: bold;
        color: #2c3e50;
      }
    </style>
  </head>
  <body>
    
    <h2>Baigtas objektas</h2>

    <table class="info-table">
      <tr>
        <th>Klientas</th>
        <td>${project.client.username}</td>
      </tr>
      <tr>
        <th>Adresas</th>
        <td>${project.client.address}</td>
      </tr>
      <tr>
        <th>Telefono numeris</th>
        <td>${project.client.phone}</td>
      </tr>
      <tr>
        <th>Elektroninio pašto adresas</th>
        <td>${project.client.email}</td>
      </tr>
      <tr>
        <th>Objektą administravo</th>
        <td>${project.creator.username}</td>
      </tr>
    </table>

    <h2>Komentarai</h2>
    <table class="info-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Autorius</th>
          <th>Komentaras</th>
        </tr>
      </thead>
      <tbody>
        ${comments}
      </tbody>
    </table>

    <h2>Medžiagos</h2>
    <table class="info-table">
      <thead>
        <tr>
          <th>Pavadinimas</th>
          <th>Spalva</th>
          <th>Kiekis</th>
          <th>Savikaina</th>
          <th>Kaina</th>
          <th>Savikaina viso</th>
          <th>Kaina viso</th>
        </tr>
      </thead>
      <tbody>
        ${materialsList}
      </tbody>
    </table>

    <h2>Darbai</h2>
    <table class="info-table">
      <thead>
        <tr>
          <th>Pavadinimas</th>
          <th>Kiekis</th>
          <th>Savikaina</th>
          <th>Kaina</th>
          <th>Savikaina viso</th>
          <th>Kaina viso</th>
        </tr>
      </thead>
      <tbody>
        ${workList}
      </tbody>
    </table>

    <h2>Finansinė informacija</h2>
    <table class="finance-table">
      <tr>
        <th>Projekto savikaina</th>
        <td class="highlight">${project.totalCost} €</td>
      </tr>
      <tr>
        <th>Projekto Kaina</th>
        <td class="highlight">${project.totalPrice} €</td>
      </tr>
      <tr>
        <th>Paliktas avansas</th>
        <td class="highlight">${project.advance} €</td>
      </tr>
      <tr>
        <th>Galutinė kaina klientui</th>
        <td class="highlight">${
          project.discount ? project.priceWithDiscount : project.priceVAT
        } €</td>
      </tr>
      <tr>
        <th>Atsiskaityti likę</th>
        <td class="highlight">${
          project.discount
            ? project.priceWithDiscount - project.advance
            : project.priceVAT - project.advance
        } €</td>
      </tr>
    </table>

  </body>
  </html>
`;

    const emailResult = await sendEmail({
      to: "vaida@modernitvora.lt",
      subject: "Baigtas objektas",
      user: project.creator,
      html,
    });
  }

  if (value === "Baigtas") {
    await backupSchema.findByIdAndDelete(_id);

    if (project.creator.username === "Audrius") {
      const currentDate = new Date();
      const dateFinished = currentDate.toISOString();

      const bonus = new bonusSchema({
        address: project.client.address,
        dateFinished: dateFinished,
        price: project.totalPrice,
        cost: project.totalCost,
        profit: project.totalProfit,
        margin: project.totalMargin,
        bonus: Math.round(project.totalProfit * 0.03),
      });

      const bonusData = await bonus.save();
      if (!bonusData)
        return {
          success: true,
          data: null,
          message: "Klaida išsaugant bonusus",
        };
    }
  }

  return { success: true, data: data, message: "Būsena atnaujinta" };
});
