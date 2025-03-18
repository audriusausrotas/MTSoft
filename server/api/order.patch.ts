export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const order: any = await projectSchema.findById({ _id });

  if (!order) return { success: false, data: null, message: "Užsakymas nerastas" };

  order.confirmed = true;
  order.status = "Tinkamas";

  const data = await order.save();

  return { success: true, data: data, message: "Užsakymas patvirtintas" };
});
