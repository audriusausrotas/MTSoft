import mongoose from "mongoose";
export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  const gatesVartonas = await gateSchemaVartonas.find();
  const gatesGigasta = await gateSchemaGigasta.find();

  let isSuccess;

  if (gatesVartonas.some((item) => item._id.toString() === _id.toString())) {
    isSuccess = await gateSchemaVartonas.findByIdAndDelete(_idObject);
  }
  if (gatesGigasta.some((item) => item._id.toString() === _id.toString())) {
    isSuccess = await gateSchemaGigasta.findByIdAndDelete(_idObject);
  }

  if (isSuccess)
    return {
      success: true,
      data: null,
      message: "Vartų užsakymas atšauktas",
    };
  else return { success: false, data: null, message: "Įvyko klaida" };
});
