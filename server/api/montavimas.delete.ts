import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const data = await montavimasSchema.findOneAndDelete(objectId);

  if (!data)
    return { success: false, data: null, message: "užsakymas nerastas" };

  return { success: true, data: null, message: "Uzsakymas istrintas" };
});
