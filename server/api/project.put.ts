import { Project } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const {
    _id,
    client,
    fenceMeasures,
    results,
    works,
    gates,
    totalPrice,
    totalCost,
    totalProfit,
    totalMargin,
    priceVAT,
    priceWithDiscount,
    discount,
    retail,
  } = await readBody(event);

  const currentDate = new Date();

  const dateCreated = currentDate.toISOString();
  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
  const dateExparation = expirationDate.toISOString();

  const orderExist = await projectSchema.findById({ _id });

  if (!orderExist)
    return { success: false, data: null, message: "Projektas nerastas" };

  const versionObject: Project = orderExist.toObject();
  delete versionObject._id;

  const newVersion = new versionsSchema(versionObject);
  const version = await newVersion.save();

  if (!version)
    return {
      success: false,
      data: null,
      message: "Klaida išsaugant versiją",
    };

  orderExist.versions?.push({
    id: version._id,
    date: dateCreated,
  });
  orderExist.dateCreated = dateCreated;
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
  orderExist.dateExparation = dateExparation;
  orderExist.retail = retail;

  const data = await orderExist.save();
  return { success: true, data: data, message: "Projektas išsaugotas" };
});
