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
  let newOrderNumbers = "0001";

  const userProjects = await projectSchema.find({
    "creator.username": creator.username,
  });

  if (userProjects.length > 0) {
    function extractOrderNumber(item: any) {
      return parseInt(item.orderNumber.split("-")[1], 10);
    }

    const sortedOrderNumbers = userProjects.sort(
      (a, b) => extractOrderNumber(a) - extractOrderNumber(b)
    );

    const lastOrder =
      sortedOrderNumbers[sortedOrderNumbers.length - 1]?.orderNumber;

    let orderNumbers = parseInt(lastOrder.split("-")[1]);
    orderNumbers++;

    newOrderNumbers = orderNumbers.toString().padStart(4, "0");
  }

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
