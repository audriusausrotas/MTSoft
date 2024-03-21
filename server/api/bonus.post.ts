export default defineEventHandler(async (event) => {
  const {} = await readBody(event);

  return { success: true, data: null, message: "Vartai užsakyti" };
});
