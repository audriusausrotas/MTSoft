//done

import mongoose from "mongoose";
import type { Gamyba } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  try {
    const { _id, index } = await readBody(event);

    const objectId = new mongoose.Types.ObjectId(_id);

    const project: Gamyba | null = await gamybaSchema.findById(objectId);

    if (!project) {
      return { success: false, data: null, message: "Projektas nerastas" };
    }

    const newMeasure = {
      length: 0,
      height: 0,
      MeasureSpace: 0,
      elements: 0,
      gates: {
        exist: false,
        type: "",
        automatics: "",
        aditional: "",
        direction: "",
        lock: "",
        bankette: "",
        option: "",
      },
      cut: 0,
      done: 0,
      postone: false,
      kampas: {
        exist: false,
        value: 0,
        aditional: "",
      },
      laiptas: {
        exist: false,
        value: 0,
        direction: "",
      },
    };

    project.fences[index].measures.push(newMeasure);

    //@ts-ignore
    const data = await project.save();

    return { success: true, data: data, message: "issaugota" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, data: null, message: "Klaida saugant duomenis" };
  }
});
