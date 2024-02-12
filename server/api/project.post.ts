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

  const orderExist = await projectSchema.findById({ _id });

  let data = null;

  if (!orderExist) {
    const userProjects = await projectSchema.find({ creator });
    const projectQuantity = userProjects.length + 1;
    const formattedProjectQuantity = projectQuantity
      .toString()
      .padStart(4, "0");

    const firstThreeLetters = creator.substring(0, 3).toUpperCase();

    const orderNumber = `${firstThreeLetters}-${formattedProjectQuantity}`;

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

    data = await project.save();
    /////////////////////////////////////////////////////////
    // if (gates.length > 0) {
    //   const newGates = new gateSchema({
    //     creator,
    //     client: client.username,
    //     phone: client.phone,
    //     address: client.address,
    //     gates,
    //   });
    //   await newGates.save();
    // }
    ////////////////////////////////////////////////////////////
  } else {
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
    data = await orderExist.save();
  }

  // PADARYT turi pakeist vartu uzsakyma jei vartai pasikeite !!!!!!!!!

  return { success: true, data: data, message: "Projektas išsaugotas" };
});
