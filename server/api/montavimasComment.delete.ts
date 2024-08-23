import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, comment } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const data = await montavimasSchema.findOne(objectId);

  if (!data)
    return { success: false, data: null, message: "užsakymas nerastas" };

  data.aditional = data.aditional.filter(
    (item) => item.date !== comment.date && item.comment !== comment.comment
  );

  await data.save();

  return { success: true, data, message: "Komentaras ištrintas" };
});
