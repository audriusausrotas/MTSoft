import type { Montavimas } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id, measureIndex, value } = await readBody(event);

  const data = await montavimasSchema.findById(_id);

  if (!data) return { success: false, data: null, message: "Montavimo nėra" };

  data.results[measureIndex].delivered = value;

  const newData = await data.save();

  if (!newData)
    return { success: false, data: null, message: "Klaida saugant projekta" };

  return { success: true, data, message: "Išsaugota" };
});
