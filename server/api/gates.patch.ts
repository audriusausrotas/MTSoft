//done

import mongoose from "mongoose";
export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const _idObject = new mongoose.Types.ObjectId(_id);

  await projectSchema.findOneAndUpdate(
    { _id },
    { status: "Vartai Sumontuoti" }
  );

  const data = await gateSchema.findOneAndUpdate(
    { _id: _idObject },
    { measure: "Baigtas" }
  );

  if (!data) {
    return { success: false, data: null, message: "Įvyko klaida" };
  }

  return {
    success: true,
    data: null,
    message: "Užsakymas baigtas",
  };
});
