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
  } = await readBody(event);

  const currentDate = new Date();

  const dateCreated = currentDate.toISOString();
  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);
  const dateExparation = expirationDate.toISOString();

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
  orderExist.dateCreated = dateCreated;
  orderExist.dateExparation = dateExparation;

  const data = await orderExist.save();
  return { success: true, data: data, message: "Projektas išsaugotas" };
});
