import mongoose from "mongoose";
export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  const data = await gateSchema.findByIdAndDelete(_idObject);

  if (data)
    return {
      success: true,
      data: null,
      message: "Vartų užsakymas atšauktas",
    };
  else return { success: false, data: null, message: "Įvyko klaida" };
});
