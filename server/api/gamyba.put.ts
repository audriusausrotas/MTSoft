import type { Gamyba } from "~/data/interfaces";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, index, measureIndex, value } = await readBody(event);

  const objectId = new mongoose.Types.ObjectId(_id);

  const project: Gamyba | null = await gamybaSchema.findById(objectId);

  if (!project)
    return { success: false, data: null, message: "Projektas nerastas" };

  project.fences[index].measures[measureIndex].cut = +value;

  console.log(project.fences[index].measures[measureIndex]);

  //@ts-ignore
  const data = await project.save();

  return { success: true, data, message: "issaugota" };
});
