import mongoose from "mongoose";
import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";

export default defineEventHandler(async (event) => {
  const { _id, completed } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const data = await gamybaSchema.findOneAndDelete(objectId);

  if (!data)
    return { success: false, data: null, message: "užsakymas nerastas" };

  cloudinaryBachDelete(data.files);

  if (completed) {
    const project = await projectSchema.findById(objectId);

    if (!project) {
      return { success: true, data: null, message: "Projektas neegzistuoja" };
    }

    project.status = "Pagamintas";
    project.save();
  }
  return { success: true, data: null, message: "Uzsakymas istrintas" };
});
