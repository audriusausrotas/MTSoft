export default defineEventHandler(async () => {
  const data = await projectSchema.find();

  if (!data) return { success: false, data: null, message: "Projektai nerasti" };

  data.reverse();

  const lightData = data.map((item) => {
    return {
      _id: item._id,
      orderNumber: item.orderNumber,
      client: { address: item.client.address, email: item.client.email, phone: item.client.phone },
      discount: item.discount,
      priceVAT: item.priceVAT,
      priceWithDiscount: item.priceWithDiscount,
      advance: item.advance,
      status: item.status,
      creator: item.creator,
    };
  });

  return { success: true, data: lightData, message: "" };
});
