import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, index, measureIndex } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const project = await gamybaSchema.findById(objectId);

  if (!project)
    return { success: false, data: null, message: "užsakymas nerastas" };

  project.fences[index].measures = project.fences[index].measures.filter(
    (item, index) => index !== measureIndex
  );

  const data = await project.save();

  return { success: true, data: data, message: "Mavatimas istrintas" };
});
