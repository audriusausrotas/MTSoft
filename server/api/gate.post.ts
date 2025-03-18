//done

import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const gate = await gateSchema.findById(objectId);

  if (!gate)
    return { success: false, data: null, message: "Užsakymas nerastas" };

  return { success: true, data: gate, message: "Vartai užsakyti" };
});
