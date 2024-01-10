import { projectSchema } from "../models/projectSchema";

export default defineEventHandler(async () => {
  const data = await projectSchema.find();

  if (!data)
    return { success: false, data: null, message: "Projektai nerasti" };

  return { success: true, data, message: "done" };
});
