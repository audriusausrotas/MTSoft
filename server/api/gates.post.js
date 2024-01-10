import { gateSchema } from "../models/gateSchema";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  const data = await gateSchema.findOne({ id });

  if (!data)
    return { success: false, data: null, message: "Produktas nerastas" };


  return { success: true, data: data, message: "Pakeitimai atlikti" };
});
