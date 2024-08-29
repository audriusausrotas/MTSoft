import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const { _id, index } = await readBody(event);
    const objectId = new mongoose.Types.ObjectId(_id);

    const project = await gamybaSchema.findById(objectId);
    if (!project) {
      return { success: false, data: null, message: "Projektas nerastas" };
    }

    project.fences = project.fences.filter((fence, i) => i !== index);

    const data = await project.save();

    return { success: true, data, message: "issaugota" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: null, message: "Klaida saugant duomenis" };
  }
});
