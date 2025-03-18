import mongoose from "mongoose";
import type { Comment } from "~/data/interfaces";

export default defineEventHandler(async (event) => {
  const { _id, change, value, username } = await readBody(event);
  const _idObject = new mongoose.Types.ObjectId(_id);

  const data = await gateSchema.findById(_idObject);

  if (!data) {
    return { success: false, data: null, message: "Įvyko klaida" };
  }

  switch (change) {
    case "status":
      data.measure = value;
      break;
    case "orderNr":
      data.orderNr = value;
      break;
    case "manager":
      data.manager = value;
      break;
    case "comment":
      const newComment: Comment = {
        comment: value as string,
        date: new Date().toISOString(),
        creator: username,
      };
      data.comments.unshift(newComment);
      break;
    case "deleteComment":
      data.comments = data.comments.filter(
        (item) => item.date !== value.date && item.comment !== value.comment
      );
      break;
    default:
      return {
        success: false,
        data: null,
        message: "Nežinoma pakeitimo rūšis",
      };
  }

  await data.save();

  return {
    success: true,
    data: data,
    message: "Būsena atnaujinta",
  };
});
