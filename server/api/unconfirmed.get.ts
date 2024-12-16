export default defineEventHandler(async (event) => {
  const data = await unconfirmedSchema.find();

  if (!data)
    return {
      success: false,
      data: null,
      message: "Nepatvirtintų projektų nerasta",
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
