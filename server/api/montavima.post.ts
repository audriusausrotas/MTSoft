import type { Montavimas } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const data: Montavimas | null = await montavimasSchema.findById(_id);

  if (!data) return { success: false, data: null, message: "Montavimo nėra" };

  return { success: true, data, message: "" };
});
