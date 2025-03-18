//done
import type { Gamyba, Comment } from "~/data/interfaces";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, comment, username } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);
  const data: Gamyba | null = await gamybaSchema.findOne({ _id: _idObject });

  if (!data) return { success: false, data: null, message: "Gamybos nėra" };

  const newComment: Comment = {
    comment,
    date: new Date().toISOString(),
    creator: username,
  };

  data.aditional.unshift(newComment);

  //@ts-ignore
  await data.save();

  return { success: true, data, message: "Komentaras išsaugotas" };
});
