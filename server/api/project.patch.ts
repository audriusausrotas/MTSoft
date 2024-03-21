export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);

  const project = await projectSchema.findById({ _id });

  if (!project) {
    return { success: true, data: null, message: "Projektas nerastas" };
  }

  project.status = value;
  const data = await project.save();

  if (!data) return { success: true, data: null, message: "Klaida" };

  if (value === "Baigtas" && project.creator.username === "Audrius") {
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
      return { success: true, data: null, message: "Klaida išsaugant bonusus" };
  }

  return { success: true, data: data, message: "Būsena atnaujinta" };
});
