import cloudinaryBachDelete from "~/utils/cloudinaryBachDelete";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = await readBody(event);
    const data = await unconfirmedSchema.findOneAndDelete({ _id });

    if (!data) return { success: false, data: null, message: "Projektas nerastas" };

    cloudinaryBachDelete(data.files);

    return { success: true, data: null, message: "Projektas ištrintas" };
  } catch (error) {
    console.error("Klaida trinant projektą:", error);
    return { success: false, data: null, message: error };
  }
});
