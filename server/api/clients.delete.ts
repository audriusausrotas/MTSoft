//done

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const data = await clientSchema.findOneAndDelete({ _id });

  if (!data) return { success: false, data: null, message: "Klientas nerastas" };

  return { success: true, data: null, message: "Klientas ištrintas" };
});
