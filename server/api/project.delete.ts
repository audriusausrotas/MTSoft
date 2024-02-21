import { projectSchema } from "~/server/models/projectSchema";

export default defineEventHandler(async (event) => {
  const { _id } = await readBody(event);
  console.log("trina", _id);
  const data = await projectSchema.findOneAndDelete({ _id });
  console.log(data);
  if (!data)
    return { success: false, data: null, message: "Projektas nerastas" };

  return { success: true, data: null, message: "Projektas ištrintas" };
});
