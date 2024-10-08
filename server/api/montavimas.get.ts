import type { Montavimas } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const data: Montavimas[] = await montavimasSchema.find();

  if (!data) return { success: false, data: null, message: "Montavimo nėra" };

  const lightData = data.map((item) => {
    return {
      _id: item._id,
      client: { address: item.client.address },
      creator: { username: item.creator.username },
      orderNumber: item.orderNumber,
      status: item.status,
      workers: [...item.workers],
      fences: {},
      results: {},
      works: {},
      aditional: {},
      files: {},
    };
  });

  return { success: true, data: lightData, message: "" };
});
