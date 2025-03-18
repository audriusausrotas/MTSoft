//done

import mongoose from "mongoose";
import type { User } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id, index, measureIndex, userId } = await readBody(event);

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

  if (!project)
    return { success: false, data: null, message: "užsakymas nerastas" };

  project.fences[index].measures = project.fences[index].measures.filter(
    (item, index) => index !== measureIndex
  );

  const data = await project.save();

  return { success: true, data: data, message: "Mavatimas istrintas" };
});
