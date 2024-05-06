import mongoose from "mongoose";
export default defineEventHandler(async (event) => {
  const { _id, provider } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  let data;
  if (provider === "Vartonas") {
    data = await gateSchemaVartonas.findOne({ _id: _idObject });
    if (!data) return { success: false, data: null, message: "Įvyko klaida" };
    data.measure = data.measure === "Eilėje" ? "Galima matuoti" : "Eilėje";
    data = await data.save();
  } else if (provider === "Gigasta") {
    data = await gateSchemaGigasta.findOne({ _id: _idObject });
    if (!data) return { success: false, data: null, message: "Įvyko klaida" };
    data.measure = data.measure === "Eilėje" ? "Galima matuoti" : "Eilėje";
    data = await data.save();
  }

  if (!data) return { success: false, data: null, message: "Įvyko klaida" };

  return {
    success: true,
    data: data,
    message: "Būsena atnaujinta",
  };
});
