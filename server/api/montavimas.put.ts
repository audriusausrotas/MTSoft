import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const { _id, index, measureIndex, value } = await readBody(event);

    const objectId = new mongoose.Types.ObjectId(_id);

    const project = await montavimasSchema.findOneAndUpdate(
      { _id: objectId },
      { $set: { [`fences.${index}.measures.${measureIndex}.done`]: value } },
      { new: true }
    );

    if (!project) {
      return { success: false, data: null, message: "Projektas nerastas" };
    }

    return { success: true, data: project, message: "issaugota" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: null, message: "Klaida saugant duomenis" };
  }
});
