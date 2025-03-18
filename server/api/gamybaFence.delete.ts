import mongoose from "mongoose";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  try {
    const { _id, index, userId } = await readBody(event);

    const user: User | null = await userSchema.findById(userId);

    if (!user)
      return {
        success: false,
        data: null,
        message: "Vartotojas nerastas",
      };

    if (user?.accountType !== "Administratorius")
      return {
        success: false,
        data: null,
        message: "Vartotojas neturi teisių",
      };

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
