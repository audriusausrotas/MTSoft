import { Project } from "~/data/interfaces";

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
    retail,
  } = await readBody(event);

  let projectExist = null;

  if (_id) projectExist = await projectSchema.findById(_id);

  const creatorUsername = projectExist ? projectExist.creator.username : creator.username;

  const currentDate = new Date();

  const dateCreated = currentDate.toISOString();

  let expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 30);

  const dateExparation = expirationDate.toISOString();

  const firstThreeLetters = creatorUsername.substring(0, 3).toUpperCase();
  let newOrderNumbers = "0001";

  const userProjects = await projectSchema.find({
    $and: [
      { "creator.username": creatorUsername },
      { orderNumber: { $regex: `^${firstThreeLetters}`, $options: "i" } },
    ],
  });

  if (userProjects.length > 0) {
    function extractOrderNumber(item: any) {
      return parseInt(item.orderNumber.split("-")[1], 10);
    }

    const sortedOrderNumbers = userProjects.sort(
      (a, b) => extractOrderNumber(a) - extractOrderNumber(b)
    );

    let lastOrder = sortedOrderNumbers[sortedOrderNumbers.length - 1]?.orderNumber;

    let orderNumbers = parseInt(lastOrder.split("-")[1]);
    orderNumbers++;

    newOrderNumbers = orderNumbers.toString().padStart(4, "0");
  }

  const orderNumber = `${firstThreeLetters}-${newOrderNumbers}`;

  if (projectExist) {
    const newProjectData = projectExist.toObject() as Project;

    delete newProjectData._id;
    newProjectData.dateCreated = dateCreated;
    newProjectData.orderNumber = orderNumber;
    newProjectData.dateExparation = dateExparation;
    newProjectData.status = "Nepatvirtintas";
    newProjectData.advance = 0;
    newProjectData.versions = [];

    const newProject = new projectSchema(newProjectData);
    const data = await newProject.save();

    return { success: true, data: data, message: "Projektas nukopijuotas" };
  } else {
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
      retail,
    });

    const data = await project.save();

    return { success: true, data: data, message: "Projektas išsaugotas" };
  }
});
