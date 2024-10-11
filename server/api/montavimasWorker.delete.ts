import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, worker } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const data = await montavimasSchema.findById(objectId);

  if (!data) return { success: false, data: null, message: "užsakymas nerastas" };

  const newWorkers = data?.workers.filter((item) => item !== worker);

  data.workers = newWorkers;

  const newData = await data?.save();

  return { success: true, data: newData, message: "Daruotojas ištrintas" };
});
