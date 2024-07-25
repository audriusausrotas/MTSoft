import type { Gamyba } from "~/data/interfaces";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, status } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  const data: Gamyba | null = await gamybaSchema.findOneAndUpdate(
    { _id: _idObject },
    { $set: { status: status } },
    { new: true }
  );

  if (!data) return { success: false, data: null, message: "Įvyko klaida" };

  return { success: true, data, message: "Statusas pakeistas" };
});
