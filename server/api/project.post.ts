import { projectSchema } from "~/server/models/projectSchema";

export default defineEventHandler(async (event) => {
  const {
    _id,
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

  if (_id.length === 0) {
    const firstThreeLetters = creator.substring(0, 3).toUpperCase();

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
    });

    const data = await project.save();

    return { success: true, data: data, message: "Projektas išsaugotas" };
  } else {
    const orderExist = await projectSchema.findById({ _id });
    if (!orderExist)
      return { success: false, data: null, message: "Projektas nerastas" };

    orderExist.creator = creator;
    orderExist.client = client;
    orderExist.fenceMeasures = fenceMeasures;
    orderExist.results = results;
    orderExist.works = works;
    orderExist.gates = gates;
    orderExist.totalPrice = totalPrice;
    orderExist.totalCost = totalCost;
    orderExist.totalProfit = totalProfit;
    orderExist.totalMargin = totalMargin;
    orderExist.priceVAT = priceVAT;
    orderExist.priceWithDiscount = priceWithDiscount;
    orderExist.discount = discount;
    const data = await orderExist.save();
    return { success: true, data: data, message: "Projektas išsaugotas" };
  }
});
