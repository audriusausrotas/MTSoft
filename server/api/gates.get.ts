export default defineEventHandler(async (event) => {
  const dataVartonas = await gateSchemaVartonas.find();
  const dataGigasta = await gateSchemaGigasta.find();

  const data = { vartonas: dataVartonas, gigasta: dataGigasta };

  if (!data) return { success: false, data: null, message: "Vartai nerasti" };

  return { success: true, data, message: "" };
});
