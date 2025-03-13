//done

export default defineEventHandler(async (event) => {
  const data = await deletedSchema.find();

  if (!data)
    return {
      success: false,
      data: null,
      message: "Ištrintų projektų nerasta",
    };

  data.reverse();

  const lightData = data.map((item) => {
    return {
      _id: item._id,
      orderNumber: item.orderNumber,
      client: item.client,
      priceVAT: item.priceVAT,
      priceWithDiscount: item.priceWithDiscount,
      status: item.status,
      discount: item.discount,
    };
  });

  return {
    success: true,
    data: lightData,
    message: "",
  };
});
