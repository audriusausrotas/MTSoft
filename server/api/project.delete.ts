import { projectSchema } from "~/server/models/projectSchema";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);

  const data = await projectSchema.findOneAndDelete({ _id });

  if (!data)
    return { success: false, data: null, message: "Projektas nerastas" };

  return { success: true, data: null, message: "Projektas ištrintas" };
});
