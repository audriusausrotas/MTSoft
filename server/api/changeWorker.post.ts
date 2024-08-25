import type { Montavimas } from "~/data/interfaces";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, value } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  const data: Montavimas | null = await montavimasSchema.findOneAndUpdate(
    { _id: _idObject },
    { $set: { worker: value } },
    { new: true }
  );

  if (!data) return { success: false, data: null, message: "Įvyko klaida" };

  return { success: true, data, message: "Montuotojas pakeistas" };
});
