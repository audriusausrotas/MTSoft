import { projectSchema } from "../models/projectSchema";

export default defineEventHandler(async (event) => {
  const { order } = await readBody(event);

  const data = await projectSchema.findOne({ orderNumber: order });

  if (!data)
    return { success: false, data: null, message: "Užsakymas nerastas" };

  return { success: true, data: data, message: "Užsakymas rastas" };
});
