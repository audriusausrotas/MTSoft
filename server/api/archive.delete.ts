import { archiveSchema } from "~/server/models/archiveSchema";

export default defineEventHandler(async (event) => {
  try {
    const { _id } = await readBody(event);
    const data = await archiveSchema.findOneAndDelete({ _id });

    if (!data)
      return { success: false, data: null, message: "Projektas nerastas" };

    return { success: true, data: null, message: "Projektas ištrintas" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, data: null, message: error };
  }
});
