import type { Project, Comment } from "~/data/interfaces";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  const { _id, comment, username } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);
  const data: Project | null = await projectSchema.findOne({ _id: _idObject });

  if (!data) return { success: false, data: null, message: "Projektas nerastas" };

  const newComment: Comment = {
    comment,
    date: new Date().toISOString(),
    creator: username,
  };

  data.comments.unshift(newComment);

  //@ts-ignore
  const savedData = await data.save();

  return { success: true, data: savedData, message: "Komentaras išsaugotas" };
});
