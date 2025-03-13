//done

import mongoose from "mongoose";
import { Gamyba } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const project: Gamyba[] | null = await gamybaSchema.findById(_id);

  if (!project) {
    return { success: false, data: null, message: "Projektas nerastas" };
  }

  return { success: true, data: project, message: "" };
});
