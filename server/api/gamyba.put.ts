import type { Gamyba } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);
  const data: Gamyba[] = await gamybaSchema.find();

  if (!data) return { success: false, data: null, message: "Gamybos nėra" };

  return { success: true, data, message: "" };
});
