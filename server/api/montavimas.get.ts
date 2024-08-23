import type { Montavimas } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const data: Montavimas[] = await montavimasSchema.find();

  if (!data) return { success: false, data: null, message: "Montavimo nėra" };

  return { success: true, data, message: "" };
});
