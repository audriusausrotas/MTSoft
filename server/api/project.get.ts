export default defineEventHandler(async () => {
  const data = await projectSchema.find();

  if (!data) return { success: false, data: null, message: "Projektai nerasti" };

  data.reverse();

  const lightData = data.map((item) => {
    const lightGates = item.gates.map((gate) => {
      return { _id: gate._id };
    });
    return {
      _id: item._id,
      orderNumber: item.orderNumber,
      client: item.client,
      discount: item.discount,
      priceVAT: item.priceVAT,
      priceWithDiscount: item.priceWithDiscount,
      advance: item.advance,
      status: item.status,
      creator: item.creator,
      gates: lightGates,
      dateExparation: item.dateExparation,
    };
  });

  return { success: true, data: lightData, message: "" };
});
