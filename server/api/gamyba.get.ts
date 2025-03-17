//done

import type { Gamyba } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const data: Gamyba[] = await gamybaSchema.find();

  if (!data) return { success: false, data: null, message: "Gamybos nėra" };

  const lightData = data.map((item) => {
    return {
      _id: item._id,
      client: { address: item.client.address },
      creator: { username: item.creator.username },
      orderNumber: item.orderNumber,
      status: item.status,
    };
  });

  return { success: true, data: lightData, message: "" };
});
