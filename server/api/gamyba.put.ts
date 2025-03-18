import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  try {
    const { _id, index, measureIndex, value, field, option } = await readBody(event);

    const objectId = new mongoose.Types.ObjectId(_id);

    let updatePath = "";

    if (option === "bindings") updatePath = `bindings.${index}.${field}`;
    else updatePath = `fences.${index}.measures.${measureIndex}.${field}`;

    const project = await gamybaSchema.findOneAndUpdate(
      { _id: objectId },
      { $set: { [updatePath]: value } },
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
