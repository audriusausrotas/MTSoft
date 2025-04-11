export default defineEventHandler(async (event) => {
  const data = await gateSchema.find();

  if (!data) return { success: false, data: null, message: "Vartai nerasti" };

  const lightData = data.map((item) => {
    return {
      _id: item._id,
      client: { address: item.client.address },
      measure: item.measure,
      manager: item.manager,
      orderNr: item.orderNr,
      dateCreated: item.dateCreated,
    };
  });

  return { success: true, data: lightData, message: "" };
});
