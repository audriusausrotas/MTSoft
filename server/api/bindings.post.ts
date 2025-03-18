import mongoose from "mongoose";
import type { Gamyba } from "~/data/interfaces";
import { v4 } from "uuid";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const order: Gamyba | null = await gamybaSchema.findById(objectId);

  if (!order) return { success: false, data: null, message: "užsakymas nerastas" };

  const newBinding = {
    id: v4(),
    type: undefined,
    height: undefined,
    quantity: undefined,
    color: undefined,
    cut: undefined,
    done: undefined,
    postone: false,
  };

  order.bindings?.push(newBinding);

  //@ts-ignore
  const data = await order.save();

  return { success: true, data: data, message: "Apkaustas pridėtas" };
});
