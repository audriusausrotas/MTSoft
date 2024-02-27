import { projectSchema } from "~/server/models/projectSchema";

export default defineEventHandler(async (event) => {
  const {
    client,
    fenceMeasures,
    results,
    creator,
    works,
    gates,
    totalPrice,
    totalCost,
    totalProfit,
    totalMargin,
    priceVAT,
    priceWithDiscount,
    discount,
    confirmed,
    payed,
    status,
    advance,
  } = await readBody(event);

  const currentDate = new Date();

  const dateCreated = currentDate.toISOString();
  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
  const dateExparation = expirationDate.toISOString();

  const firstThreeLetters = creator.username.substring(0, 3).toUpperCase();

  const userProjects = await projectSchema.find({ creator });
  const lastOrder = userProjects[userProjects.length - 1].orderNumber;
  let orderNumbers = parseInt(lastOrder.split("-")[1]);
  orderNumbers++;
  const newOrderNumbers = orderNumbers.toString().padStart(4, "0");

  const orderNumber = `${firstThreeLetters}-${newOrderNumbers}`;

  const project = new projectSchema({
    creator,
    client,
    fenceMeasures,
    results,
    orderNumber,
    works,
    gates,
    totalPrice,
    totalCost,
    totalProfit,
    totalMargin,
    priceVAT,
    priceWithDiscount,
    discount,
    confirmed,
    payed,
    status,
    advance,
    dateCreated,
    dateExparation,
  });

  const data = await project.save();

  return { success: true, data: data, message: "Projektas išsaugotas" };
});
