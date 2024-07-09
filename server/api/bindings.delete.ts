import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, bindingId } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const order = await gamybaSchema.findById(objectId);

  if (!order)
    return { success: false, data: null, message: "Užsakymas nerastas" };

  order!.bindings = order.bindings!.filter((item) => item.id !== bindingId);

  //@ts-ignore
  const data = await order.save();

  return { success: true, data: data, message: "Apkaustas ištrintas" };
});
