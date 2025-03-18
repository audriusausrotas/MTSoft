import mongoose from "mongoose";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id, bindingId, userId } = await readBody(event);

  const user: User | null = await userSchema.findById(userId);

  if (!user)
    return {
      success: false,
      data: null,
      message: "Vartotojas nerastas",
    };

  if (user?.accountType !== "Administratorius")
    return {
      success: false,
      data: null,
      message: "Vartotojas neturi teisių",
    };

  const objectId = new mongoose.Types.ObjectId(_id);

  const order = await gamybaSchema.findById(objectId);

  if (!order) return { success: false, data: null, message: "Užsakymas nerastas" };

  order!.bindings = order.bindings!.filter((item) => item.id !== bindingId);

  //@ts-ignore
  const data = await order.save();

  return { success: true, data: data, message: "Apkaustas ištrintas" };
});
