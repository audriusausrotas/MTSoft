import { projectSchema } from "../models/projectSchema";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const order = await projectSchema.findById({ _id });

  if (!order)
    return { success: false, data: null, message: "Užsakymas nerastas" };

  order.confirmed = false;
  order.status = "Netinkamas";

  const data = await order.save();

  return { success: true, data: data, message: "Užsakymas atšauktas" };
});
