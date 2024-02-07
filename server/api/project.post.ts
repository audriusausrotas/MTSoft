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

  const userProjects = await projectSchema.find({ creator });
  const projectQuantity = userProjects.length + 1;
  const formattedProjectQuantity = projectQuantity.toString().padStart(4, "0");

  const firstThreeLetters = creator.substring(0, 3).toUpperCase();

  const orderNumber = `${firstThreeLetters}-${formattedProjectQuantity}`;

  const product = new projectSchema({
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
  });

  const data = await product.save();

  return { success: true, data: data, message: "Projektas išsaugotas" };
});
