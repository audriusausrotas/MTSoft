// import { socket } from "~/components/socket";

export default defineEventHandler(async (event) => {
  const { number, address, creator } = await readBody(event);

  const client = { address, username: "", phone: "", email: "" };
  const creatorNew = { username: creator, lastName: "", email: "", phone: "" };

  const newGamyba = new gamybaSchema({
    creator: creatorNew,
    client,
    orderNumber: number || "",
    status: "Negaminti",
  });

  // @ts-ignore
  const data = await newGamyba.save();

  if (!data) return { success: false, data, message: "Įvyko klaida" };

  // socket.emit("aaaa", data);

  return { success: true, data: newGamyba, message: "Užsakymas sukurtas" };
});
