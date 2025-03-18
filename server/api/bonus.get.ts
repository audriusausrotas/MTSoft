import type { Bonus } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const data: Bonus[] = await bonusSchema.find();

  if (!data) return { success: false, data: null, message: "Klaida" };

  //@ts-ignore
  data.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished));

  return { success: true, data: data, message: "" };
});
