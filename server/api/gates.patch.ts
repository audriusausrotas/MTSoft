import mongoose from "mongoose";
export default defineEventHandler(async (event) => {
  const { _id, provider } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  await projectSchema.findOneAndUpdate(
    { _id },
    { status: "Vartai Sumontuoti" },
    { new: true }
  );

  let data;
  if (provider === "Vartonas") {
    data = await gateSchemaVartonas.findByIdAndDelete(_idObject);
  } else if (provider === "Gigasta") {
    data = await gateSchemaGigasta.findByIdAndDelete(_idObject);
  }

  if (!data) return { success: false, data: null, message: "Įvyko klaida" };

  return {
    success: true,
    data: null,
    message: "Užsakymas baigtas",
  };
});
