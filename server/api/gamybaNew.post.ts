import type { Gamyba, GamybaFence, Project, Bindings } from "~/data/interfaces";
import { v4 } from "uuid";
import { fenceBoards } from "~/data/selectFieldData";

export default defineEventHandler(async (event) => {
  const { number, address, creator } = await readBody(event);

  const client = { address, username: "", phone: "", email: "" };
  const creatorNew = { username: creator, lastName: "", email: "", phone: "" };

  const newGamyba = new gamybaSchema({
    creator: creatorNew,
    client,
    orderNumber: number || "",
  });

  // @ts-ignore
  const data = await newGamyba.save();

  if (!data) return { success: false, data, message: "Įvyko klaida" };

  return { success: true, data: newGamyba, message: "Perduota gamybai" };
});
